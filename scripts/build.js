import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const imagesDir = path.join(projectDir, 'images');
const fontsDir = path.join(projectDir, 'fonts');
const jsDir = path.join(projectDir, 'js');
const adminDir = path.join(projectDir, 'admin');
const contentBlogDir = path.join(projectDir, 'content', 'blog');

if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir, { recursive: true });
if (!fs.existsSync(adminDir)) fs.mkdirSync(adminDir, { recursive: true });
if (!fs.existsSync(contentBlogDir)) fs.mkdirSync(contentBlogDir, { recursive: true });

const imageMap = JSON.parse(fs.readFileSync(path.join(projectDir, 'scripts', 'image_map.json'), 'utf8'));
const fontMap = JSON.parse(fs.readFileSync(path.join(projectDir, 'scripts', 'font_map.json'), 'utf8'));

// Decap CMS setup
const decapIndex = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager | Dominika Szylar</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(adminDir, 'index.html'), decapIndex, 'utf8');

const decapConfig = `backend:
  name: git-gateway
  branch: main

media_folder: "images"
public_folder: "/images"

collections:
  - name: "blog"
    label: "Artykuły Blogowe"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Tytuł", name: "title", widget: "string" }
      - { label: "Autor", name: "author", widget: "string", default: "Oliwia Andreasik" }
      - { label: "Data", name: "date", widget: "datetime" }
      - { label: "Kategoria", name: "category", widget: "string" }
      - { label: "Okładka", name: "image", widget: "image" }
      - { label: "Treść", name: "body", widget: "markdown" }
`;
fs.writeFileSync(path.join(adminDir, 'config.yml'), decapConfig, 'utf8');

// Blog Markdown files
fs.writeFileSync(path.join(contentBlogDir, 'jak-zaczac-cwiczac-silowo.md'), `---
title: "Jak zacząć ćwiczyć siłowo, jeśli nigdy nie byłaś na siłowni"
author: "Oliwia Andreasik"
date: 2026-03-05
category: "Trening"
image: "/images/s1CLvCv4IwolBpAPN6ZpbEeZ7Uo.jpg"
---

Wiele kobiet omija siłownię z jednego powodu: boją się, że zrobią coś nie tak. Że wszyscy będą patrzeć. Że nie wiedzą, jak używać sprzętu. Że to nie dla nich.

To rozumiem. Sama przez to przechodziłam. Ale chcę Ci powiedzieć jedną rzecz: trening siłowy to jedno z najlepszych narzędzi, jakie możesz dać swojemu ciału. Niezależnie od wieku, wagi i punktu startowego.

### Od czego zacząć
Zacznij od podstawowych wzorców ruchowych, nie od maszyn. Przysiady, martwy ciąg, wyciskanie, wiosłowanie. Każde z tych ćwiczeń możesz wykonywać z minimalnym obciążeniem albo z samym ciałem na początku.
Nie musisz od razu ćwiczyć 5 razy w tygodniu. Trzy razy to więcej niż wystarczy na start. Regularność jest ważniejsza niż częstotliwość.

### Czego nie robić
Nie zaczynaj od filmiku z YouTube i masy różnych ćwiczeń naraz. To prosta droga do kontuzji i zniechęcenia.
`, 'utf8');

fs.writeFileSync(path.join(contentBlogDir, 'trening-poporodowy-kiedy-zaczac.md'), `---
title: "Trening poporodowy: kiedy zacząć i jak to zrobić bezpiecznie"
author: "Oliwia Andreasik"
date: 2026-02-20
category: "Połóg i powrót do formy"
image: "/images/EcbN5IpvAwAgLgouDrCsqn1i5E8.jpg"
---

Ciało po porodzie potrzebuje czasu, szacunku i mądrego podejścia. Kiedy jest właściwy moment na powrót do aktywności fizycznej i jak zrobić to bezpiecznie?

### Pierwsze tygodnie połogu
W pierwszych 6 tygodniach skup się na regeneracji, odpoczynku, nawykach toaletowych oraz łagodnej pracy oddechowej. Twoje mięśnie dna miednicy i kresa biała potrzebują czasu na zagojenie.

### Konsultacja uroginekologiczna
Zanim wrócisz do klasycznych treningów fitness czy biegania, umów się na wizytę u fizjoterapeutki uroginekologicznej po zakończeniu połogu (około 6-8 tygodnia). Specjalistka oceni stan mięśni dna miednicy, ewentualne rozejście mięśni prostych brzucha (DRA) oraz bliznę po cesarskim cięciu lub nacięciu krocza.
`, 'utf8');

fs.writeFileSync(path.join(contentBlogDir, 'twoje-nogi-tez-zasluguja-na-chwile-ulgi.md'), `---
title: "Twoje nogi też zasługują na chwilę ulgi"
author: "Oliwia Andreasik"
date: 2026-01-15
category: "Zdrowie i regeneracja"
image: "/images/HrYryckxFSwJUlUuLYPM6dhQJFE.jpg"
---

Uczucie ciężkich nóg, obrzęki pod koniec dnia i bolesność to częste objawy zaburzeń krążenia żylno-limfatycznego, szczególnie w ciąży i po całym dniu pracy stojącej lub siedzącej.

### Proste sposoby na ulgę
1. **Unoszenie nóg**: odpoczynek z nogami uniesionymi powyżej poziomu bioder przez 15 minut dziennie.
2. **Ćwiczenia pompy mięśniowej**: krążenia stóp, zginanie i prostowanie palców, naprzemienne stawanie na palcach i piętach.
3. **Masaż i drenaż limfatyczny**: profesjonalna fizjoterapia wspierająca odpływ chłonki.
`, 'utf8');

// Updated Main Client JS with exact skill patterns
const mainJsContent = `
document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Link Cloning (Ensures 100% valid DOM and identical links)
  const desktopNav = document.querySelector('nav[data-framer-name="Desktop"]');
  const phoneNav = document.querySelector('nav[data-framer-name="Phone"]');
  
  if (desktopNav && phoneNav) {
    const desktopLinks = desktopNav.querySelector('.framer-1b6shkl');
    const desktopButton = desktopNav.querySelector('.framer-28cdx0');
    const phoneContainer = phoneNav.querySelector('.framer-1rmhckj');
    
    if (phoneContainer && desktopLinks && desktopButton && !phoneContainer.querySelector('.framer-1b6shkl')) {
      const clonedLinks = desktopLinks.cloneNode(true);
      const clonedButton = desktopButton.cloneNode(true);
      phoneContainer.appendChild(clonedLinks);
      phoneContainer.appendChild(clonedButton);
    }
  }

  // 2. Mobile Menu Toggle
  const menuButtons = document.querySelectorAll('[data-framer-name="Menu Icon"], [data-framer-name="Menu"]');
  
  menuButtons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!phoneNav) return;
      
      const isOpen = phoneNav.classList.contains('framer-v-1clfgnr');
      if (isOpen) {
        phoneNav.classList.remove('framer-v-1clfgnr');
        phoneNav.classList.add('framer-v-8lkanp');
        btn.classList.remove('framer-v-sgx2z6');
        btn.classList.add('framer-v-14br5d7');
      } else {
        phoneNav.classList.remove('framer-v-8lkanp');
        phoneNav.classList.add('framer-v-1clfgnr');
        btn.classList.remove('framer-v-14br5d7');
        btn.classList.add('framer-v-sgx2z6');
      }
    });
  });

  if (phoneNav) {
    phoneNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        phoneNav.classList.remove('framer-v-1clfgnr');
        phoneNav.classList.add('framer-v-8lkanp');
        menuButtons.forEach(btn => {
          btn.classList.remove('framer-v-sgx2z6');
          btn.classList.add('framer-v-14br5d7');
        });
      });
    });
  }

  // 3. Universal Framer Accordion Handler
  document.querySelectorAll('[data-framer-name="Closed"], [data-framer-name="Open"]').forEach(item => {
    item.style.cursor = 'pointer';
    const answer = item.querySelector('[data-framer-name="Answer"]');
    const icon = item.querySelector('svg, [data-framer-name*="Icon"], [data-framer-name*="Arrow"]');
    const variantClass = Array.from(item.classList).find(cls => cls.startsWith('framer-v-'));

    item.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      
      const isCurrentlyClosed = item.classList.contains('framer-v-czg96') || item.getAttribute('data-framer-name') === 'Closed';
      
      if (isCurrentlyClosed) {
        item.classList.remove('framer-v-czg96');
        item.setAttribute('data-framer-name', 'Open');
        if (answer) {
          answer.style.opacity = '1';
          answer.style.height = 'auto';
        }
        if (icon) {
          icon.style.transition = 'transform 0.25s ease';
          icon.style.transform = 'rotate(180deg)';
        }
      } else {
        item.classList.add('framer-v-czg96');
        item.setAttribute('data-framer-name', 'Closed');
        if (answer) {
          answer.style.opacity = '0';
          answer.style.height = '1px';
        }
        if (icon) {
          icon.style.transition = 'transform 0.25s ease';
          icon.style.transform = 'rotate(0deg)';
        }
      }
    });
  });

  // 4. Carousel Handler
  document.querySelectorAll('.framer--carousel-controls').forEach(controls => {
    const carousel = controls.previousElementSibling || controls.parentElement.querySelector('.framer--carousel');
    if (!carousel) return;
    const prevBtn = controls.querySelector('button[aria-label="Previous"]');
    const nextBtn = controls.querySelector('button[aria-label="Next"]');
    
    function updateControls() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (prevBtn) {
        const canPrev = carousel.scrollLeft > 10;
        prevBtn.style.opacity = canPrev ? '1' : '0';
        prevBtn.style.pointerEvents = canPrev ? 'auto' : 'none';
        prevBtn.style.cursor = canPrev ? 'pointer' : 'default';
      }
      if (nextBtn) {
        const canNext = carousel.scrollLeft < maxScroll - 10;
        nextBtn.style.opacity = canNext ? '1' : '0';
        nextBtn.style.pointerEvents = canNext ? 'auto' : 'none';
        nextBtn.style.cursor = canNext ? 'pointer' : 'default';
      }
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        carousel.scrollBy({ left: -360, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        carousel.scrollBy({ left: 360, behavior: 'smooth' });
      });
    }
    carousel.addEventListener('scroll', updateControls);
    updateControls();
  });

  // 5. Netlify Form Ajax Submission
  const contactForm = document.querySelector('form[data-netlify="true"]');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn ? submitBtn.querySelector('p') : null;
      const originalText = submitText ? submitText.textContent : 'Wyślij wiadomość';
      if (submitText) submitText.textContent = 'Wysyłanie...';
      if (submitBtn) submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
        if (response.ok) {
          contactForm.innerHTML = \`
            <div style="padding: 40px 20px; text-align: center; background: #fafafa; border-radius: 12px; border: 1px solid #e5e5e5;">
              <h3 style="font-size: 22px; margin-bottom: 12px; color: #111;">Wiadomość została wysłana!</h3>
              <p style="font-size: 16px; color: #666; line-height: 1.5;">Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe.</p>
            </div>
          \`;
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        alert('Wystąpił problem podczas wysyłania wiadomości. Spróbuj ponownie.');
        if (submitText) submitText.textContent = originalText;
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});
`;

fs.writeFileSync(path.join(jsDir, 'main.js'), mainJsContent, 'utf8');

const pages = [
  { path: '/', file: 'index.html' },
  { path: '/o-mnie', file: 'o-mnie/index.html' },
  { path: '/kontakt', file: 'kontakt/index.html' },
  { path: '/efekty', file: 'efekty/index.html' },
  { path: '/blog', file: 'blog/index.html' },
  { path: '/blog/jak-zaczac-cwiczac-silowo', file: 'blog/jak-zaczac-cwiczac-silowo/index.html' },
  { path: '/blog/trening-poporodowy-kiedy-zaczac', file: 'blog/trening-poporodowy-kiedy-zaczac/index.html' },
  { path: '/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi', file: 'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html' },
  { path: '/404', file: '404.html' },
  { path: '/testing-sht', file: 'testing-sht/index.html' }
];

async function build() {
  for (const page of pages) {
    const url = `https://dominikaszylar.framer.media${page.path}`;
    console.log(`Processing ${page.path} -> ${page.file}...`);
    const res = await fetch(url);
    let html = await res.text();

    // 1. Strip Framer telemetry & editorbar scripts
    html = html.replace(/<script[^>]*events\.framer\.com[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script[^>]*__framer_force_showing_editorbar_since[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script[^>]*data-framer-appear-animation[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script[^>]*script_main[\s\S]*?<\/script>/gi, '');
    html = html.replace(/<link\s+rel="modulepreload"[^>]*>/gi, '');
    html = html.replace(/<meta\s+name="framer-search-index[^"]*"[^>]*>/gi, '');
    html = html.replace(/<link\s+href="https:\/\/fonts\.gstatic\.com"[^>]*>/gi, '');

    // 2. Strip Framer badge
    html = html.replace(/<div\s+id="__framer-badge-container"[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi, '');
    html = html.replace(/<a\s+class="[^"]*__framer-badge[^"]*"[\s\S]*?<\/a>/gi, '');

    // 3. Inject Watermark hide style and smooth transitions in <head>
    const injectedHeadStyles = `
    <style>
      #__framer-badge-container, .__framer-badge { display: none !important; }
      html { scroll-behavior: smooth; }
      .framer-e91Ap.framer-v-1clfgnr { z-index: 9999 !important; background-color: #ffffff !important; }
      .framer-e91Ap.framer-v-1clfgnr .framer-1b6shkl { display: flex !important; }
      .framer-e91Ap.framer-v-1clfgnr .framer-28cdx0 { display: flex !important; }
      .hidden { display: none !important; }
    </style>
    <script src="/js/main.js" defer></script>
    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    `;
    html = html.replace('</head>', `${injectedHeadStyles}\n</head>`);

    // 4. Replace font URLs
    for (const [remoteFont, localFont] of Object.entries(fontMap)) {
      html = html.split(remoteFont).join(localFont);
    }

    // 5. Replace image URLs
    for (const [remoteImg, localImg] of Object.entries(imageMap)) {
      html = html.split(remoteImg).join(localImg);
    }

    // 6. Clean query strings from local image URLs in src and srcset
    // e.g. /images/foo.png?scale-down-to=512&amp;width=1018 -> /images/foo.png
    html = html.replace(/(\/images\/[a-zA-Z0-9_\-\.]+)\?[^"\s>,]+/g, '$1');

    // 7. Normalize internal links
    html = html.replace(/href="\.\/o-mnie"/g, 'href="/o-mnie"');
    html = html.replace(/href="\.\/kontakt"/g, 'href="/kontakt"');
    html = html.replace(/href="\.\/efekty"/g, 'href="/efekty"');
    html = html.replace(/href="\.\/blog"/g, 'href="/blog"');
    html = html.replace(/href="\.\/blog\//g, 'href="/blog/');
    html = html.replace(/href="\.\/"/g, 'href="/"');
    html = html.replace(/href="https:\/\/dominikaszylar\.framer\.media\/([^\"]*)"/g, 'href="/$1"');
    html = html.replace(/href="https:\/\/dominikaszylar\.framer\.media"/g, 'href="/"');

    // 8. Netlify forms hookup on form if present
    if (html.includes('<form')) {
      html = html.replace(/<form\s+class="([^"]+)">/i, (match, cls) => {
        return `<form name="contact" method="POST" action="/kontakt?success=true" data-netlify="true" data-netlify-honeypot="bot-field" class="${cls}">\n` +
          `  <input type="hidden" name="form-name" value="contact" />\n` +
          `  <p class="hidden"><label>Don't fill: <input name="bot-field" /></label></p>`;
      });
      html = html.replace(/placeholder="Wpisz imię"\s+class="([^"]+)"\s+value/g, 'name="imie" placeholder="Wpisz imię" class="$1" value');
      html = html.replace(/placeholder="Wpisz nazwisko"\s+class="([^"]+)"\s+value/g, 'name="nazwisko" placeholder="Wpisz nazwisko" class="$1" value');
      html = html.replace(/placeholder="Wpisz swój email"\s+class="([^"]+)"\s+value/g, 'name="email" placeholder="Wpisz swój email" class="$1" value');
      html = html.replace(/<textarea\s+name="Email"\s+placeholder="Opisz krótko/g, '<textarea name="wiadomosc" placeholder="Opisz krótko');
    }

    // Write file
    const targetPath = path.join(projectDir, page.file);
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log(`  Saved ${targetPath} (${(html.length / 1024).toFixed(1)} KB)`);
  }

  console.log('Build completed successfully.');
}

build().catch(console.error);
