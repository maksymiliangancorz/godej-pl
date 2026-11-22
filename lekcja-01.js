// =====================================================================
//  LEKCJA 1: Przywitanie i przedstawianie się
//  Słowa i zapis są ROBOCZE – do sprawdzenia przez native speakera.
//
//  Jak edytować (bez programowania):
//   - zmieniaj tylko tekst między apostrofami '...'
//   - nagranie: wrzuć plik mp3 do folderu nagrania/ i wpisz np. 'nagrania/01-witej.mp3'
//   - puste '' = brak (np. brak nagrania albo wariantu gwarowego)
//   - gotowa: false ukrywa lekcję na liście („W przygotowaniu”)
// =====================================================================
DODAJ_LEKCJE({
  nr: 1,
  tytul: 'Przywitanie i przedstawianie się',
  tytulSl: 'Witej!',
  gotowa: true,

  // 1. SŁOWA (8–10): sl = po śląsku, pl = tłumaczenie, obraz = emoji, gwara = wariant gwarowy
  slowa: [
    { sl: 'witej', pl: 'cześć, witaj', obraz: '👋', gwara: '', nagranie: '' },
    { sl: 'pyrsk', pl: 'cześć (na powitanie i pożegnanie)', obraz: '✊', gwara: '', nagranie: '' },
    { sl: 'dobry dziyń', pl: 'dzień dobry', obraz: '☀️', gwara: '', nagranie: '' },
    { sl: 'dziynkuja', pl: 'dziękuję', obraz: '🙏', gwara: '', nagranie: '' },
    { sl: 'jak sie mŏsz?', pl: 'jak się masz?', obraz: '🙂', gwara: '', nagranie: '' },
    { sl: 'jŏ', pl: 'ja', obraz: '🙋', gwara: 'jo', nagranie: '' },
    { sl: 'mianować sie', pl: 'nazywać się', obraz: '🏷️', gwara: '', nagranie: '' },
    { sl: 'tyż', pl: 'też', obraz: '➕', gwara: '', nagranie: '' },
    { sl: 'dziołcha', pl: 'dziewczyna', obraz: '👧', gwara: 'dziołszka (zdrobniale)', nagranie: '' },
    { sl: 'karlus', pl: 'chłopak', obraz: '👦', gwara: '', nagranie: '' },
  ],

  // 2. DIALOG (4–6 kwestii)
  dialog: [
    { kto: 'Hanka', sl: 'Witej! Jak sie mŏsz?', pl: 'Cześć! Jak się masz?', nagranie: '' },
    { kto: 'Zefel', sl: 'Dobrze, dziynkuja. A ty?', pl: 'Dobrze, dziękuję. A ty?', nagranie: '' },
    { kto: 'Hanka', sl: 'Tyż dobrze. Jak sie mianujesz?', pl: 'Też dobrze. Jak się nazywasz?', nagranie: '' },
    { kto: 'Zefel', sl: 'Jŏ je Zefel. A ty?', pl: 'Jestem Józek. A ty?', nagranie: '' },
    { kto: 'Hanka', sl: 'Jŏ je Hanka. Pyrsk!', pl: 'Jestem Hanka. Cześć!', nagranie: '' },
  ],

  // Zdania do ćwiczenia „ułóż zdanie” (słowa oddzielone spacjami)
  zdania: [
    { sl: 'Witej, jak sie mŏsz?', pl: 'Cześć, jak się masz?' },
    { sl: 'Jŏ je Zefel, a ty?', pl: 'Jestem Józek, a ty?' },
  ],

  // 4. CIEKAWOSTKA (jedno zdanie o kulturze)
  ciekawostka: '„Pyrsk” to typowo śląskie pozdrowienie. Można go użyć zarówno na powitanie, jak i na pożegnanie.',
});
