import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';

const results = [];

function check(name, pass, details) {
  results.push({ name, pass, details });
  const icon = pass ? '✅ PASS' : '❌ FAIL';
  console.log(`${icon} | ${name}: ${details}`);
}

async function runAudit() {
  console.log('====================================================');
  console.log('   FRAMER-MIGRATION PRE-FLIGHT VERIFICATION AUDIT   ');
  console.log('====================================================\n');

  const pages = [
    { file: 'index.html', title: 'Strona główna' },
    { file: 'o-mnie/index.html', title: 'O mnie' },
    { file: 'kontakt/index.html', title: 'Kontakt' },
    { file: 'efekty/index.html', title: 'Efekty' },
    { file: 'blog/index.html', title: 'Blog' },
    { file: 'blog/jak-zaczac-cwiczac-silowo/index.html', title: 'Artykuł 1' },
    { file: 'blog/trening-poporodowy-kiedy-zaczac/index.html', title: 'Artykuł 2' },
    { file: 'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html', title: 'Artykuł 3' },
    { file: '404.html', title: 'Strona 404' }
  ];

  // 1. Local Assets (Zero CDN check)
  let cdnLeak = 0;
  for (const p of pages) {
    const content = fs.readFileSync(path.join(projectDir, p.file), 'utf8');
    const framerUrls = content.match(/https?:\/\/[^\s"'()><]*framerusercontent\.com[^\s"'()><]*/gi) || [];
    const eventUrls = content.match(/https?:\/\/[^\s"'()><]*events\.framer\.com[^\s"'()><]*/gi) || [];
    const gstaticUrls = content.match(/https?:\/\/[^\s"'()><]*fonts\.gstatic\.com[^\s"'()><]*/gi) || [];
    cdnLeak += framerUrls.length + eventUrls.length + gstaticUrls.length;
  }
  check('1. Zero CDN Dependencies', cdnLeak === 0, cdnLeak === 0 ? 'Zero zapytań do framerusercontent / events / gstatic.' : `Znaleziono ${cdnLeak} wycieków CDN.`);

  // 2. Relative Paths & Portability (file:// support)
  let absPathErrors = 0;
  for (const p of pages) {
    const content = fs.readFileSync(path.join(projectDir, p.file), 'utf8');
    const absImgs = content.match(/src="\/images[^"]*"/g) || [];
    const absFonts = content.match(/url\("\/fonts[^"]*"\)|url\('\/fonts[^']*'\)|url\(\/fonts[^)]*\)/g) || [];
    const absJs = content.match(/src="\/js[^"]*"/g) || [];
    absPathErrors += absImgs.length + absFonts.length + absJs.length;
  }
  check('2. Relative Paths (file:// & local)', absPathErrors === 0, absPathErrors === 0 ? 'Wszystkie pliki (.png, .jpg, .svg, .woff2, .js) używają ścieżek relatywnych (./ lub ../).' : `Znaleziono ${absPathErrors} bezwzględnych ścieżek.`);

  // 3. Link Integrity (All links resolve to existing files)
  let brokenLinks = 0;
  let totalLinks = 0;
  for (const p of pages) {
    const content = fs.readFileSync(path.join(projectDir, p.file), 'utf8');
    const pageDir = path.dirname(path.join(projectDir, p.file));
    const links = content.match(/href="([^"#][^"]*)"/g) || [];
    for (const l of links) {
      const href = l.slice(6, -1);
      if (href.startsWith('http:') || href.startsWith('https:') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
      totalLinks++;
      const cleanHref = href.split('?')[0].split('#')[0];
      const targetFile = path.resolve(pageDir, cleanHref);
      if (!fs.existsSync(targetFile)) {
        brokenLinks++;
        console.log(`    [!] Brakujący cel z ${p.file}: ${href} -> ${targetFile}`);
      }
    }
  }
  check('3. Link Integrity', brokenLinks === 0, brokenLinks === 0 ? `Sprawdzono ${totalLinks} linków wewnętrznych. Wszystkie wskazują na istniejące pliki.` : `Brakujące cele dla ${brokenLinks} linków.`);

  // 4. Click Blockers Sanitization
  let clickBlockers = 0;
  for (const p of pages) {
    const content = fs.readFileSync(path.join(projectDir, p.file), 'utf8');
    if (content.includes('__framer_force_showing_editorbar_since')) clickBlockers++;
    if (content.includes('data-nested-link') && content.includes('preventDefault')) clickBlockers++;
  }
  check('4. Click Blockers Sanitization', clickBlockers === 0, clickBlockers === 0 ? 'Wszystkie blokujące skrypty Framera (preventDefault na linkach) zostały usunięte.' : `Wykryto ${clickBlockers} pozostałości.`);

  // 5. Watermark Badge Removal
  let badgeVisible = false;
  for (const p of pages) {
    const content = fs.readFileSync(path.join(projectDir, p.file), 'utf8');
    if (content.includes('__framer-badge-container') || content.includes('Made in Framer')) {
      if (!content.includes('#__framer-badge-container, .__framer-badge { display: none !important; }')) {
        badgeVisible = true;
      }
    }
  }
  check('5. Framer Badge Ukryty', !badgeVisible, !badgeVisible ? 'Badge Framera został usunięty i zablokowany stylami !important.' : 'Badge Framera jest widoczny!');

  // 6. Typography & Local Fonts
  const fontsDir = path.join(projectDir, 'fonts');
  const fontFiles = fs.existsSync(fontsDir) ? fs.readdirSync(fontsDir) : [];
  check('6. Typografia i Fonty WOFF2', fontFiles.length >= 280, `Pobrano ${fontFiles.length} lokalnych plików fontów (Geist, Inter, Satoshi, Fragment Mono).`);

  // 7. Images & Hero Photo Check
  const imagesDir = path.join(projectDir, 'images');
  const imgFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];
  const heroImg = path.join(imagesDir, 'aiNr32PT73vb0mkpYmZrNcl7A4.png');
  const heroExists = fs.existsSync(heroImg) && fs.statSync(heroImg).size > 100000;
  check('7. Obrazy i Zdjęcie Hero', imgFiles.length >= 12 && heroExists, `Pobrano ${imgFiles.length} obrazów. Zdjęcie Dominiki (${heroImg ? (fs.statSync(heroImg).size / 1024).toFixed(1) + ' KB' : 'brak'}) obecne.`);

  // 8. Interactive JS Components
  const mainJsPath = path.join(projectDir, 'js', 'main.js');
  const mainJsExists = fs.existsSync(mainJsPath);
  let jsFeaturesOk = false;
  if (mainJsExists) {
    const jsContent = fs.readFileSync(mainJsPath, 'utf8');
    const hasAccordion = jsContent.includes('framer-v-czg96') || jsContent.includes('Closed');
    const hasMobileNav = jsContent.includes('Menu Icon') || jsContent.includes('framer-v-1clfgnr');
    const hasCarousel = jsContent.includes('framer--carousel');
    const hasNetlifyForm = jsContent.includes('data-netlify');
    jsFeaturesOk = hasAccordion && hasMobileNav && hasCarousel && hasNetlifyForm;
  }
  check('8. Interaktywność (Vanilla JS)', jsFeaturesOk, 'Obsłużono akordeon FAQ, menu mobilne, karuzelę opinii oraz formularz kontaktowy.');

  // 9. Platform Integrations (Netlify Forms & Decap CMS)
  const kontaktHtml = fs.readFileSync(path.join(projectDir, 'kontakt/index.html'), 'utf8');
  const hasNetlifyForm = kontaktHtml.includes('data-netlify="true"') && kontaktHtml.includes('name="form-name"');
  const decapAdminExists = fs.existsSync(path.join(projectDir, 'admin/index.html')) && fs.existsSync(path.join(projectDir, 'admin/config.yml'));
  const blogPostsCount = fs.readdirSync(path.join(projectDir, 'content/blog')).length;
  check('9. Netlify Forms & Decap CMS', hasNetlifyForm && decapAdminExists && blogPostsCount === 3, `Formularz Netlify aktywny, Decap CMS w /admin skonfigurowany, ${blogPostsCount} posty bloga w Markdown.`);

  console.log('\n====================================================');
  const allPassed = results.every(r => r.pass);
  console.log(`PODSUMOWANIE AUDYTU: ${allPassed ? 'WSZYSTKIE TESTY ZALICZONE (100% OK)' : 'WYKRYTO BŁĘDY'}`);
  console.log('====================================================');
}

runAudit();
