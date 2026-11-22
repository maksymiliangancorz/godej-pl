// =====================================================================
//  LEKCJA 3: Dom
//  Słowa i zapis są ROBOCZE – do sprawdzenia przez native speakera.
//
//  Jak edytować (bez programowania):
//   - zmieniaj tylko tekst między apostrofami '...'
//   - nagranie: wrzuć plik mp3 do folderu nagrania/ i wpisz np. 'nagrania/01-witej.mp3'
//   - puste '' = brak (np. brak nagrania albo wariantu gwarowego)
//   - gotowa: false ukrywa lekcję na liście („W przygotowaniu”)
// =====================================================================
DODAJ_LEKCJE({
  nr: 3,
  tytul: 'Dom',
  tytulSl: 'Chałpa',
  gotowa: true,

  // 1. SŁOWA (8–10): sl = po śląsku, pl = tłumaczenie, obraz = emoji, gwara = wariant gwarowy
  slowa: [
    { sl: 'chałpa', pl: 'dom, chata', obraz: '🏠', gwara: '', nagranie: '' },
    { sl: 'izba', pl: 'pokój', obraz: '🛏️', gwara: '', nagranie: '' },
    { sl: 'szolka', pl: 'filiżanka', obraz: '☕', gwara: '', nagranie: '' },
    { sl: 'byfyj', pl: 'kredens', obraz: '🗄️', gwara: '', nagranie: '' },
    { sl: 'ryczka', pl: 'mały stołek', obraz: '🪑', gwara: '', nagranie: '' },
    { sl: 'gardina', pl: 'firanka', obraz: '🪟', gwara: '', nagranie: '' },
    { sl: 'hasiok', pl: 'śmietnik', obraz: '🗑️', gwara: '', nagranie: '' },
    { sl: 'laczki', pl: 'kapcie', obraz: '🩴', gwara: '', nagranie: '' },
    { sl: 'kachle', pl: 'piec kaflowy', obraz: '🔥', gwara: '', nagranie: '' },
    { sl: 'kibel', pl: 'wiadro', obraz: '🪣', gwara: '', nagranie: '' },
  ],

  // 2. DIALOG (4–6 kwestii)
  dialog: [
    { kto: 'Hanka', sl: 'Wlyź do izby, siednij se na ryczce.', pl: 'Wejdź do pokoju, usiądź sobie na stołeczku.', nagranie: '' },
    { kto: 'Zefel', sl: 'Ale gryfnŏ chałpa!', pl: 'Ale ładny dom!', nagranie: '' },
    { kto: 'Hanka', sl: 'Chcesz szolka kafeju?', pl: 'Chcesz filiżankę kawy?', nagranie: '' },
    { kto: 'Zefel', sl: 'Ja, dziynkuja.', pl: 'Tak, dziękuję.', nagranie: '' },
    { kto: 'Hanka', sl: 'Laczki mŏsz pod byfyjym.', pl: 'Kapcie masz pod kredensem.', nagranie: '' },
  ],

  // Zdania do ćwiczenia „ułóż zdanie” (słowa oddzielone spacjami)
  zdania: [
    { sl: 'Wlyź do izby.', pl: 'Wejdź do pokoju.' },
    { sl: 'Ale gryfnŏ chałpa!', pl: 'Ale ładny dom!' },
  ],

  // ĆWICZENIE „POKOJE”: opis pokoju z luką i 3 słowa do wyboru
  // pokoj = nazwa, obraz = emoji, opis = zdanie z ___ w miejscu przedmiotu,
  // odpowiedz = dobre słowo, zle = dwa słowa, które tu nie pasują
  pokoje: [
    { pokoj: 'Kuchnia', obraz: '🍳', opis: 'W kuchni stoi ___, a w nim odświętne szolki i talerze.', odpowiedz: 'byfyj', zle: ['laczki', 'gardina'] },
    { pokoj: 'Kuchnia', obraz: '🍳', opis: 'Na stole czeka ___ gorącego kafeju.', odpowiedz: 'szolka', zle: ['kibel', 'ryczka'] },
    { pokoj: 'Kuchnia', obraz: '🍳', opis: 'Pod zlewem stoi ___ z wodą do mycia podłogi.', odpowiedz: 'kibel', zle: ['gardina', 'kachle'] },
    { pokoj: 'Izba', obraz: '🛋️', opis: 'W izbie zimą grzeją ___.', odpowiedz: 'kachle', zle: ['hasiok', 'szolka'] },
    { pokoj: 'Izba', obraz: '🛋️', opis: 'W oknie wisi biała ___.', odpowiedz: 'gardina', zle: ['byfyj', 'laczki'] },
    { pokoj: 'Izba', obraz: '🛋️', opis: 'Przy piecu stoi niska ___, na której siada starka.', odpowiedz: 'ryczka', zle: ['kibel', 'gardina'] },
    { pokoj: 'Sień', obraz: '🚪', opis: 'Przy drzwiach stoją ___, żeby nie chodzić w butach po chałpie.', odpowiedz: 'laczki', zle: ['szolka', 'kachle'] },
    { pokoj: 'Podwórko', obraz: '🌳', opis: 'Na podwórku stoi ___, do którego wyrzucasz śmieci.', odpowiedz: 'hasiok', zle: ['ryczka', 'laczki'] },
  ],

  // 4. CIEKAWOSTKA (jedno zdanie o kulturze)
  ciekawostka: 'W tradycyjnych śląskich familokach, czyli domach robotniczych przy kopalniach, w izbie często stał piec kaflowy i byfyj z odświętną zastawą.',
});
