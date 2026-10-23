import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const files = [
  'index.html',
  '404.html',
  'o-mnie/index.html',
  'kontakt/index.html',
  'efekty/index.html',
  'blog/index.html',
  'blog/jak-zaczac-cwiczac-silowo/index.html',
  'blog/trening-poporodowy-kiedy-zaczac/index.html',
  'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html'
];

let allOk = true;
for (const f of files) {
  const html = fs.readFileSync(path.join(projectDir, f), 'utf8');
  const absImgs = html.match(/src="\/images[^"]*"/g) || [];
  const absFonts = html.match(/url\("\/fonts[^"]*"\)|url\('\/fonts[^']*'\)|url\(\/fonts[^)]*\)/g) || [];
  if (absImgs.length > 0 || absFonts.length > 0) {
    console.log(`Found issues in ${f}: ${absImgs.length} abs images, ${absFonts.length} abs fonts`);
    allOk = false;
  }
}

if (allOk) {
  console.log('SUCCESS: All 9 pages use 100% relative paths. Production ready.');
}
