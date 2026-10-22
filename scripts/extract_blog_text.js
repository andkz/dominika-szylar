import fs from 'node:fs';

const posts = [
  { slug: 'jak-zaczac-cwiczac-silowo', file: 'blog/jak-zaczac-cwiczac-silowo/index.html' },
  { slug: 'trening-poporodowy-kiedy-zaczac', file: 'blog/trening-poporodowy-kiedy-zaczac/index.html' },
  { slug: 'twoje-nogi-tez-zasluguja-na-chwile-ulgi', file: 'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html' }
];

for (const p of posts) {
  const content = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\' + p.file, 'utf8');
  const title = content.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  const desc = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || '';
  console.log(`=== ${p.slug} ===`);
  console.log('Title:', title);
  console.log('Desc:', desc);
}
