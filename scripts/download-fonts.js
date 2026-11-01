import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fontsDir = path.join(__dirname, '..', 'fonts', 'variants');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fontFamilies = [
  'Plus+Jakarta+Sans:wght@400;500;600;700',
  'Playfair+Display:wght@400;600;700',
  'Cormorant+Garamond:wght@400;600;700',
  'Outfit:wght@400;500;600;700',
  'Syne:wght@600;700;800',
  'DM+Sans:wght@400;500;700',
  'Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700',
  'Cinzel:wght@500;600;700'
];

async function run() {
  const cssUrl = `https://fonts.googleapis.com/css2?${fontFamilies.map(f => `family=${f}`).join('&')}&display=swap`;
  console.log('Fetching Google Fonts CSS:', cssUrl);

  const res = await fetch(cssUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch CSS: ${res.statusText}`);
  }

  let css = await res.text();
  console.log('Downloaded CSS length:', css.length);

  // Find all font URLs
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^\)]+)\)/g;
  let match;
  const urls = [];
  while ((match = urlRegex.exec(css)) !== null) {
    urls.push(match[1]);
  }

  console.log(`Found ${urls.length} font woff2 files. Downloading...`);

  let index = 1;
  const urlToLocalMap = new Map();

  for (const fontUrl of urls) {
    if (urlToLocalMap.has(fontUrl)) continue;

    // determine a clean filename
    const urlObj = new URL(fontUrl);
    const basename = path.basename(urlObj.pathname);
    const cleanBasename = `gf_${index}_${basename}`;
    const localPath = path.join(fontsDir, cleanBasename);

    console.log(`[${index}/${urls.length}] Downloading: ${cleanBasename}`);
    const fontRes = await fetch(fontUrl);
    const buffer = Buffer.from(await fontRes.arrayBuffer());
    fs.writeFileSync(localPath, buffer);

    urlToLocalMap.set(fontUrl, `./fonts/variants/${cleanBasename}`);
    index++;
  }

  // Replace all URLs in CSS
  let localCss = css;
  for (const [remoteUrl, localRelPath] of urlToLocalMap.entries()) {
    localCss = localCss.replaceAll(remoteUrl, localRelPath);
  }

  const outputCssPath = path.join(__dirname, '..', 'fonts', 'variants.css');
  fs.writeFileSync(outputCssPath, localCss, 'utf-8');
  console.log('Saved variants fonts CSS to:', outputCssPath);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
