// =====================================================================
//  LEKCJA 2: Rodzina
//  Słowa i zapis są ROBOCZE – do sprawdzenia przez native speakera.
//
//  Jak edytować (bez programowania):
//   - zmieniaj tylko tekst między apostrofami '...'
//   - nagranie: wrzuć plik mp3 do folderu nagrania/ i wpisz np. 'nagrania/01-witej.mp3'
//   - puste '' = brak (np. brak nagrania albo wariantu gwarowego)
//   - gotowa: false ukrywa lekcję na liście („W przygotowaniu”)
// =====================================================================
DODAJ_LEKCJE({
  nr: 2,
  tytul: 'Rodzina',
  tytulSl: 'Familijo',
  gotowa: true,

  // 1. SŁOWA (8–10): sl = po śląsku, pl = tłumaczenie, obraz = emoji, gwara = wariant gwarowy
  slowa: [
    { sl: 'familijo', pl: 'rodzina', obraz: '👨‍👩‍👧', gwara: '', nagranie: '' },
    { sl: 'bajtel', pl: 'dziecko', obraz: '👶', gwara: '', nagranie: '' },
    { sl: 'starka', pl: 'babcia', obraz: '👵', gwara: '', nagranie: '' },
    { sl: 'starzik', pl: 'dziadek', obraz: '👴', gwara: '', nagranie: '' },
    { sl: 'fater', pl: 'ojciec, tata', obraz: '👨', gwara: '', nagranie: '' },
    { sl: 'mamulka', pl: 'mama (czule)', obraz: '👩', gwara: '', nagranie: '' },
    { sl: 'ujek', pl: 'wujek', obraz: '🧔', gwara: '', nagranie: '' },
    { sl: 'synek', pl: 'chłopiec, syn', obraz: '👦', gwara: '', nagranie: '' },
    { sl: 'dziołszka', pl: 'dziewczynka', obraz: '👧', gwara: '', nagranie: '' },
    { sl: 'bild', pl: 'zdjęcie, obraz', obraz: '🖼️', gwara: '', nagranie: '' },
  ],

  // 2. DIALOG (4–6 kwestii)
  dialog: [
    { kto: 'Hanka', sl: 'To je twoja familijo na tym bildzie?', pl: 'To twoja rodzina na tym zdjęciu?', nagranie: '' },
    { kto: 'Zefel', sl: 'Ja, to je mŏj fater i mamulka.', pl: 'Tak, to mój tata i mama.', nagranie: '' },
    { kto: 'Hanka', sl: 'A fto je tyn bajtel?', pl: 'A kto to jest to dziecko?', nagranie: '' },
    { kto: 'Zefel', sl: 'To je mŏj brat, a tukej je starka.', pl: 'To mój brat, a tutaj babcia.', nagranie: '' },
    { kto: 'Hanka', sl: 'Gryfnŏ familijo!', pl: 'Ładna rodzina!', nagranie: '' },
  ],

  // Zdania do ćwiczenia „ułóż zdanie” (słowa oddzielone spacjami)
  zdania: [
    { sl: 'To je mŏj fater.', pl: 'To mój tata.' },
    { sl: 'A tukej je starka.', pl: 'A tutaj jest babcia.' },
  ],

  // 4. CIEKAWOSTKA (jedno zdanie o kulturze)
  ciekawostka: 'Na Śląsku babcię często nazywa się „starką”, a dziadka „starzikiem”. Brzmi to ciepło i czule, a nie jak przytyk do wieku.',
});
