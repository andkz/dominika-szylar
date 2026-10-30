# Dominika Szylar | Fizjoterapia — Migracja 1:1

### 🔗 Szybkie linki (Live Sites):
- 🚀 **Netlify (Produkcja + Netlify Forms + CMS):** [https://dominika-szylar.netlify.app](https://dominika-szylar.netlify.app)
- 🌐 **GitHub Pages:** [https://andkz.github.io/dominika-szylar](https://andkz.github.io/dominika-szylar)
- 🛠️ **Panel CMS (/admin):** [https://dominika-szylar.netlify.app/admin/](https://dominika-szylar.netlify.app/admin/)
- 🎨 **Oryginalny Framer:** [https://dominikaszylar.framer.media](https://dominikaszylar.framer.media/)

---

Strona internetowa [dominikaszylar.framer.media](https://dominikaszylar.framer.media/) przeniesiona w standardzie 1:1 z Framera do w pełni niezależnego, statycznego kodu HTML/CSS/Vanilla JS zgodnie ze skillem `framer-migration`.

## Kluczowe cechy wdrożenia

1. **Zero CDN Dependencies (Local-First)**:
   - Wszystkie obrazy, ikony i favikony zostały pobrane lokalnie do katalogu `/images`.
   - Wszystkie fonty (Geist, Inter, Satoshi, Fragment Mono) we wszystkich wagach zostały pobrane lokalnie do katalogu `/fonts`.
   - Żaden zasób nie odpytuje zewnętrznych serwerów Framer (`framerusercontent.com`, `events.framer.com`).

2. **Wierność wizualna 1:1**:
   - Zachowano oryginalne style Framera (`.framer-...`), tokeny projektowe i reguły `@media` dla wszystkich breakpointów: Desktop (>1200px), Tablet (810px–1199px) i Mobile (<809px).

3. **Odwzorowane interakcje (Vanilla JS)**:
   - **Akordeony / FAQ**: Płynne otwieranie i zamykanie pytań i odpowiedzi na stronie głównej z animacją wysokości i widoczności.
   - **Mobilne menu**: Hamburger z animacją ikony i pełnoekranową nawigacją na urządzeniach mobilnych i tabletach.
   - **Karuzela opinii**: Płynne przewijanie kart opinii z dynamiczną obsługą przycisków Poprzedni / Następny.

4. **Obsługa formularza kontaktowego**:
   - Formularz na podstronie `/kontakt` zintegrowany z **Netlify Forms** (`data-netlify="true"`, ochrona honeypot).
   - Dynamiczny feedback po wysłaniu wiadomości bez przeładowania strony.

5. **Struktura podstron**:
   - `/` — Strona główna
   - `/o-mnie` — O Dominice
   - `/efekty` — Efekty terapii
   - `/kontakt` — Kontakt z formularzem
   - `/blog` — Spis artykułów
   - `/blog/jak-zaczac-cwiczac-silowo` — Artykuł 1
   - `/blog/trening-poporodowy-kiedy-zaczac` — Artykuł 2
   - `/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi` — Artykuł 3
   - `/404` — Strona błędu

## Uruchomienie lokalne

```bash
# Uruchomienie serwera podglądu (np. npx serve)
npx serve .
```

Otwórz w przeglądarce pod adresem wskazanym przez `serve` (np. `http://localhost:3000`).

## Wdrożenie na Netlify

Projekt zawiera gotowy plik `netlify.toml` z nagłówkami bezpieczeństwa i długim czasem buforowania dla statycznych fontów i obrazów:

```bash
npx netlify deploy --prod --dir=.
```
