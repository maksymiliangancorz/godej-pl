// =====================================================================
//  BOT WYDARZEŃ godej.pl
//  Raz na dobę czyta OFICJALNE strony instytucji kultury (lista w
//  zrodla.json) i zapisuje nadchodzące wydarzenia do wydarzenia.json.
//  Zakładka „Wydarzenia” na stronie wyświetla ten plik.
//
//  Obsługiwane źródła:
//   - strona z repertuarem (HTML): bot szuka dat i linków do wydarzeń,
//     a jeśli strona ma dane schema.org/Event, korzysta z nich
//   - kalendarz .ics
//
//  Uruchomienie:  node bot/zbierz-wydarzenia.mjs
//  Tryb testowy (nic nie zapisuje, tylko pokazuje wynik):
//                 node bot/zbierz-wydarzenia.mjs --test
//  Wymaga Node.js 18+ (bez dodatkowych pakietów).
// =====================================================================
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const KATALOG = path.dirname(fileURLToPath(import.meta.url));
const PLIK_USTAWIEN = path.join(KATALOG, 'zrodla.json');
const PLIK_WYNIKOWY = path.join(KATALOG, '..', 'wydarzenia.json');
const USER_AGENT = 'godej.pl-bot-wydarzen/1.0 (raz na dobe)';  // tylko znaki ASCII

// ---------------------------------------------------------------- daty
export const dzisISO = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Warsaw' });
function dodajDni(iso, dni) { const d = new Date(iso + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + dni); return d.toISOString().slice(0, 10); }
function kolejneMiesiace(ile) {
  const [r, m] = dzisISO().split('-').map(Number);
  return Array.from({ length: ile }, (_, i) => { const d = new Date(Date.UTC(r, m - 1 + i, 1)); return d.toISOString().slice(0, 7); });
}

const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const RE_DATA_SLOWNA = new RegExp(`\\b(\\d{1,2})\\s+(${MIESIACE.join('|')})\\s+(\\d{4})`, 'gi');
const RE_DATA_LICZBOWA = /\b(\d{1,2})\.(\d{1,2})\.(\d{4})\b/g;
const RE_GODZINA = /\b([01]?\d|2[0-3])[:.]([0-5]\d)\b/;
const dwa = n => String(n).padStart(2, '0');

// ---------------------------------------------------------- HTML -> tekst
function odkoduj(t) {
  return t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}
const czysc = t => odkoduj(t.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

// Zamienia HTML na ciągły tekst i zapamiętuje, gdzie w tym tekście są linki
export function rozbierzHTML(html, adresBazowy) {
  html = html.replace(/<(script|style|noscript|svg|head)\b[\s\S]*?<\/\1>/gi, ' ');
  let tekst = ''; const linki = [];
  const re = /<a\b[^>]*?href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>|<[^>]+>|([^<]+)/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[1] !== undefined) {
      const t = czysc(m[2]); const start = tekst.length;
      tekst += ' ' + t + ' ';
      let href; try { href = new URL(odkoduj(m[1]), adresBazowy).href; } catch { continue; }
      linki.push({ href, tekst: t, start, koniec: tekst.length });
    } else if (m[3] !== undefined) {
      tekst += odkoduj(m[3]).replace(/\s+/g, ' ');
    } else if (/^<(br|\/?(p|div|li|tr|td|h\d|section|article))\b/i.test(m[0])) {
      tekst += ' | ';
    }
  }
  return { tekst, linki };
}

// --------------------------------------------- schema.org/Event (JSON-LD)
export function zJsonLD(html, zrodlo) {
  const wynik = [];
  const bloki = html.match(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi) || [];
  const przejdz = o => {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) return o.forEach(przejdz);
    const typ = [].concat(o['@type'] || []).join(' ');
    if (/Event\b/.test(typ) && o.name && o.startDate) {
      const sd = String(o.startDate);
      wynik.push({
        tytul: czysc(String(o.name)), data: sd.slice(0, 10), godzina: /T(\d{2}:\d{2})/.exec(sd)?.[1] || '',
        miejsce: czysc(String(o.location?.name || zrodlo.miejsce || '')), miasto: zrodlo.miasto || '',
        link: o.url || o['@id'] || '', zrodlo: zrodlo.nazwa,
      });
    }
    Object.values(o).forEach(v => typeof v === 'object' && przejdz(v));
  };
  for (const b of bloki) { try { przejdz(JSON.parse(b.replace(/^<script[^>]*>|<\/script>$/gi, ''))); } catch {} }
  return wynik;
}

// ------------------------------- strona z repertuarem: daty + najbliższy link
export function zRepertuaru(html, adres, zrodlo) {
  const { tekst, linki } = rozbierzHTML(html, adres);
  const host = new URL(adres).host;
  const linkiWydarzen = linki.filter(l => {
    if (zrodlo.wzorLinku) return l.href.includes(zrodlo.wzorLinku);
    // bez wzoru: linki z tej samej domeny, z sensownym tekstem, inne niż sama strona repertuaru
    try { const u = new URL(l.href); return u.host === host && l.tekst.length > 3 && u.pathname.split('/').filter(Boolean).length >= 2 && l.href !== adres; } catch { return false; }
  });
  if (!linkiWydarzen.length) return [];

  // Tytuł dla każdego adresu: najdłuższy tekst spośród linków o tym samym adresie
  const tytulDla = {};
  for (const l of linkiWydarzen) if (l.tekst && (!tytulDla[l.href] || l.tekst.length > tytulDla[l.href].length)) tytulDla[l.href] = l.tekst;

  const daty = [];
  for (const m of tekst.matchAll(RE_DATA_SLOWNA)) daty.push({ d: +m[1], mies: MIESIACE.indexOf(m[2].toLowerCase()) + 1, r: +m[3], start: m.index, koniec: m.index + m[0].length });
  for (const m of tekst.matchAll(RE_DATA_LICZBOWA)) if (+m[2] >= 1 && +m[2] <= 12) daty.push({ d: +m[1], mies: +m[2], r: +m[3], start: m.index, koniec: m.index + m[0].length });

  // Na jednych stronach data stoi PRZED tytułem, na innych PO nim.
  // Sprawdzamy oba warianty i wybieramy ten, który daje więcej trafień.
  const dopasuj = kierunek => daty.map(dt => {
    let najblizszy = null, odl = Infinity;
    for (const l of linkiWydarzen) {
      const o = kierunek === 'po' ? (l.start >= dt.koniec ? l.start - dt.koniec : Infinity)
                                  : (l.koniec <= dt.start ? dt.start - l.koniec : Infinity);
      if (o < odl) { odl = o; najblizszy = l; }
    }
    return najblizszy && odl <= 400 ? { dt, l: najblizszy, odl } : null;
  }).filter(Boolean);
  const ocena = pary => [new Set(pary.map(p => p.l.href + '|' + p.dt.start)).size, -pary.reduce((s, p) => s + p.odl, 0)];
  const [a, b] = [dopasuj('po'), dopasuj('przed')];
  const [oa, ob] = [ocena(a), ocena(b)];
  const pary = oa[0] > ob[0] || (oa[0] === ob[0] && oa[1] >= ob[1]) ? a : b;

  const wynik = [];
  for (const { dt, l } of pary) {
    const tytul = tytulDla[l.href] || decodeURIComponent(l.href.split('/').filter(Boolean).pop() || '').replace(/[-_]/g, ' ');
    if (!tytul) continue;
    const godz = RE_GODZINA.exec(tekst.slice(dt.koniec, dt.koniec + 120));
    wynik.push({
      tytul: tytul.slice(0, 140), data: `${dt.r}-${dwa(dt.mies)}-${dwa(dt.d)}`, godzina: godz ? `${dwa(godz[1])}:${godz[2]}` : '',
      miejsce: zrodlo.miejsce || '', miasto: zrodlo.miasto || '', link: l.href, zrodlo: zrodlo.nazwa,
    });
  }
  return wynik;
}

// ------------------------------------------------------------- kalendarz .ics
function dataICal(w) {
  const m = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})\d{2}(Z)?)?/.exec(w || ''); if (!m) return null;
  const [, r, mi, d, g, min, utc] = m;
  if (g && utc) { const pl = new Date(Date.UTC(+r, +mi - 1, +d, +g, +min)).toLocaleString('sv-SE', { timeZone: 'Europe/Warsaw' }); return { data: pl.slice(0, 10), godzina: pl.slice(11, 16) }; }
  return { data: `${r}-${mi}-${d}`, godzina: g ? `${g}:${min}` : '' };
}
export function zICal(tekst, zrodlo) {
  const linie = tekst.replace(/\r\n/g, '\n').replace(/\n[ \t]/g, '').split('\n');
  const odEsc = s => s.replace(/\\n/gi, ' ').replace(/\\([,;\\])/g, '$1').trim();
  const wynik = []; let ev = null;
  for (const linia of linie) {
    if (linia === 'BEGIN:VEVENT') { ev = {}; continue; }
    if (linia === 'END:VEVENT') {
      const d = dataICal(ev?.DTSTART);
      if (ev?.SUMMARY && d) wynik.push({ tytul: odEsc(ev.SUMMARY), ...d, miejsce: odEsc(ev.LOCATION || zrodlo.miejsce || ''), miasto: zrodlo.miasto || '', link: (ev.URL || '').trim(), zrodlo: zrodlo.nazwa });
      ev = null; continue;
    }
    if (!ev) continue;
    const i = linia.indexOf(':'); if (i < 0) continue;
    const k = linia.slice(0, i).split(';')[0].toUpperCase(); if (!(k in ev)) ev[k] = linia.slice(i + 1);
  }
  return wynik;
}

// ------------------------------------------------------- pobranie źródła
async function pobierz(adres) {
  const odp = await fetch(adres, { headers: { 'User-Agent': USER_AGENT, 'Accept-Language': 'pl' } });
  if (!odp.ok) throw new Error(`HTTP ${odp.status} (${adres})`);
  return odp.text();
}
export async function czytajZrodlo(z) {
  const adresy = z.adres.includes('{RRRR-MM}') ? kolejneMiesiace(z.miesiace || 2).map(m => z.adres.replace('{RRRR-MM}', m)) : [z.adres];
  const wynik = [];
  for (const a of adresy) {
    const tresc = await pobierz(a);
    if (/\.ics(\?|$)/i.test(a) || tresc.startsWith('BEGIN:VCALENDAR')) { wynik.push(...zICal(tresc, z)); continue; }
    const ld = zJsonLD(tresc, z);
    wynik.push(...(ld.length ? ld : zRepertuaru(tresc, a, z)));
  }
  return wynik;
}

// ------------------------------------------------------------ porządkowanie
export function uporzadkuj(lista, ust) {
  const od = dzisISO(), doDnia = dodajDni(od, ust.ileDniDoPrzodu);
  const widziane = new Set();
  return lista
    .filter(e => e.tytul && /^\d{4}-\d{2}-\d{2}$/.test(e.data) && e.data >= od && e.data <= doDnia)
    .map(e => ({ ...e, link: /^https?:\/\//i.test(e.link) ? e.link : '' }))   // tylko bezpieczne linki
    .filter(e => { const k = `${e.zrodlo}|${e.tytul}|${e.data}|${e.godzina}`.toLowerCase(); if (widziane.has(k)) return false; widziane.add(k); return true; })
    .sort((a, b) => (a.data + a.godzina).localeCompare(b.data + b.godzina))
    .slice(0, ust.maksWydarzen);
}

// --------------------------------------------------------------- start
export async function main() {
  const test = process.argv.includes('--test');
  const ust = JSON.parse(await readFile(PLIK_USTAWIEN, 'utf8'));
  const zebrane = []; let udane = 0;
  for (const z of ust.zrodla.filter(z => z.wlaczony && z.adres)) {
    try {
      const w = await czytajZrodlo(z);
      zebrane.push(...w); udane++;
      console.log(`✔ ${z.nazwa}: znaleziono ${w.length}`);
      w.slice(0, 3).forEach(e => console.log(`     ${e.data} ${e.godzina}  ${e.tytul}  ${e.link}`));
      if (!w.length) console.log(`     (0 wydarzeń – sprawdź adres albo ustaw "wzorLinku" w zrodla.json)`);
    } catch (e) { console.warn(`✘ ${z.nazwa}: ${e.message}`); }
  }
  if (!udane) { console.error('Żadne źródło nie zadziałało – plik wydarzenia.json NIE został zmieniony.'); process.exit(1); }

  const wydarzenia = uporzadkuj(zebrane, ust);
  console.log(`Razem po uporządkowaniu: ${wydarzenia.length}`);
  if (test) { console.log('Tryb testowy – nic nie zapisano.'); return; }
  await writeFile(PLIK_WYNIKOWY, JSON.stringify({ zaktualizowano: new Date().toISOString(), wydarzenia }, null, 2) + '\n');
  console.log('Zapisano wydarzenia.json');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
