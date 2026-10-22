import fs from 'node:fs';

const posts = [
  'blog/jak-zaczac-cwiczac-silowo/index.html',
  'blog/trening-poporodowy-kiedy-zaczac/index.html',
  'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html'
];

for (const p of posts) {
  const content = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\' + p, 'utf8');
  console.log(`=== POST: ${p} ===`);
  const title = content.match(/<title>([^<]*)<\/title>/);
  console.log('Title:', title ? title[1] : 'none');
  const h1 = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log('H1:', h1 ? h1[1].replace(/<[^>]+>/g, '').trim() : 'none');
  const imgs = content.match(/<img[^>]+>/gi) || [];
  console.log('Images count:', imgs.length);
  imgs.forEach(img => console.log('  ', img.slice(0, 100)));
}
