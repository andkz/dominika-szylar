import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const fontsDir = path.join(projectDir, 'fonts');
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

const pages = [
  '/',
  '/o-mnie',
  '/kontakt',
  '/efekty',
  '/blog',
  '/blog/jak-zaczac-cwiczac-silowo',
  '/blog/trening-poporodowy-kiedy-zaczac',
  '/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi',
  '/404'
];

async function downloadFonts() {
  const fonts = new Set();
  for (const page of pages) {
    const res = await fetch(`https://dominikaszylar.framer.media${page}`);
    const html = await res.text();
    const fontMatches = html.match(/https:\/\/(?:fonts\.gstatic\.com|framerusercontent\.com\/assets)\/[^\s"'()><?#]+\.(?:woff2?|ttf|otf)/gi) || [];
    fontMatches.forEach(u => fonts.add(u));
  }

  const fontList = Array.from(fonts);
  console.log(`Starting download of ${fontList.length} fonts...`);

  const fontMap = {};
  const concurrency = 20;
  let idx = 0;
  let downloaded = 0;
  let failed = 0;

  async function worker() {
    while (idx < fontList.length) {
      const myIdx = idx++;
      const fontUrl = fontList[myIdx];
      try {
        const urlObj = new URL(fontUrl);
        const baseName = path.basename(urlObj.pathname);
        const ext = path.extname(urlObj.pathname) || '.woff2';
        // Prefix with domain part to avoid name collisions if any
        const safePrefix = urlObj.hostname.includes('gstatic') ? 'gstatic_' : 'framer_';
        const localName = `${safePrefix}${baseName}`;
        const localPath = path.join(fontsDir, localName);

        if (!fs.existsSync(localPath)) {
          const res = await fetch(fontUrl);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(localPath, buf);
        }
        fontMap[fontUrl] = `/fonts/${localName}`;
        downloaded++;
      } catch (e) {
        console.error(`Font download error ${fontUrl}:`, e.message);
        failed++;
      }
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  console.log(`Font downloads finished: ${downloaded} success, ${failed} failed.`);
  fs.writeFileSync(path.join(projectDir, 'font_map.json'), JSON.stringify(fontMap, null, 2));
}

downloadFonts().catch(console.error);
