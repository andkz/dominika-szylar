import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const imagesDir = path.join(projectDir, 'images');
const fontsDir = path.join(projectDir, 'fonts');

if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });
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

async function downloadAssets() {
  const images = new Set();
  const fonts = new Set();

  for (const page of pages) {
    const res = await fetch(`https://dominikaszylar.framer.media${page}`);
    const html = await res.text();

    const imgMatches = html.match(/https:\/\/(?:framerusercontent\.com\/(?:images|sites\/icons)\/[^\s"'()><?#]+)/gi) || [];
    imgMatches.forEach(u => images.add(u));

    const fontMatches = html.match(/https:\/\/(?:fonts\.gstatic\.com|framerusercontent\.com\/assets)\/[^\s"'()><?#]+\.(?:woff2?|ttf|otf)/gi) || [];
    fontMatches.forEach(u => fonts.add(u));
  }

  console.log(`Downloading ${images.size} images...`);
  const imageMap = {};

  for (const imgUrl of images) {
    try {
      const urlObj = new URL(imgUrl);
      const ext = path.extname(urlObj.pathname) || '.png';
      const baseName = path.basename(urlObj.pathname);
      const localName = baseName.includes('.') ? baseName : `${baseName}${ext}`;
      const localPath = path.join(imagesDir, localName);

      if (!fs.existsSync(localPath)) {
        const res = await fetch(imgUrl);
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(localPath, buffer);
        console.log(`  Downloaded image: ${localName} (${(buffer.length / 1024).toFixed(1)} KB)`);
      } else {
        console.log(`  Existing image: ${localName}`);
      }
      imageMap[imgUrl] = `/images/${localName}`;
    } catch (e) {
      console.error(`  Failed image: ${imgUrl}`, e.message);
    }
  }

  console.log(`Total fonts found: ${fonts.size}`);
  fs.writeFileSync(path.join(projectDir, 'image_map.json'), JSON.stringify(imageMap, null, 2));
}

downloadAssets().catch(console.error);
