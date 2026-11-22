# Bot wydarzeń godej.pl

Bot raz na dobę czyta oficjalne strony instytucji kultury i zapisuje
nadchodzące wydarzenia do pliku `wydarzenia.json`. Zakładka „Wydarzenia”
na stronie wyświetla ten plik.

## Uruchomienie (jednorazowo)

1. Załóż konto na github.com i utwórz nowe repozytorium, np. `godej-pl`.
2. Wgraj do niego CAŁĄ zawartość folderu strony, razem z ukrytym folderem
   `.github` (w nim jest harmonogram bota).
3. Na Netlify wybierz **Add new site → Import an existing project → GitHub**
   i wskaż to repozytorium. Od teraz każda zmiana w repozytorium
   (także ta zrobiona przez bota) sama publikuje stronę.
4. W repozytorium wejdź w **Actions**, wybierz „Bot wydarzeń” i kliknij
   **Run workflow**, żeby uruchomić bota pierwszy raz.
5. Otwórz log uruchomienia. Przy każdym źródle zobaczysz, ile wydarzeń
   znalazł bot i 3 przykładowe wpisy.

Potem bot działa sam codziennie około 5:17 rano.

## Gdy źródło pokazuje 0 wydarzeń albo dziwne tytuły

Otwórz `bot/zrodla.json` i przy tym źródle wpisz `wzorLinku`, czyli
fragment adresu, który mają linki do pojedynczych wydarzeń na tej stronie.
Przykład dla Opery Śląskiej: `/spektakle/event/`.

## Dodanie instytucji

W `bot/zrodla.json` uzupełnij `adres` (oficjalna strona z repertuarem
albo kalendarz `.ics`) i ustaw `"wlaczony": true`.

## Test na własnym komputerze (wymaga Node.js 18+)

    node bot/zbierz-wydarzenia.mjs --test
