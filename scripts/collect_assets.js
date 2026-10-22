import fs from 'node:fs';

const pages = [
  { path: '/', file: 'index.html' },
  { path: '/o-mnie', file: 'o-mnie/index.html' },
  { path: '/kontakt', file: 'kontakt/index.html' },
  { path: '/efekty', file: 'efekty/index.html' },
  { path: '/blog', file: 'blog/index.html' },
  { path: '/blog/jak-zaczac-cwiczac-silowo', file: 'blog/jak-zaczac-cwiczac-silowo/index.html' },
  { path: '/blog/trening-poporodowy-kiedy-zaczac', file: 'blog/trening-poporodowy-kiedy-zaczac/index.html' },
  { path: '/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi', file: 'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html' },
  { path: '/404', file: '404.html' }
];

async function collectAllAssets() {
  const assetUrls = new Set();
  const fontUrls = new Set();
  const htmlMap = {};

  for (const p of pages) {
    const url = `https://dominikaszylar.framer.media${p.path}`;
    const res = await fetch(url);
    const html = await res.text();
    htmlMap[p.path] = html;

    // Framer usercontent images
    const images = html.match(/https:\/\/framerusercontent\.com\/images\/[^\s"'()><?#]+/gi) || [];
    images.forEach(u => assetUrls.add(u));

    // Framer usercontent icons / favicons
    const icons = html.match(/https:\/\/framerusercontent\.com\/sites\/icons\/[^\s"'()><?#]+/gi) || [];
    icons.forEach(u => assetUrls.add(u));

    // Framer usercontent assets / fonts
    const assets = html.match(/https:\/\/framerusercontent\.com\/assets\/[^\s"'()><?#]+/gi) || [];
    assets.forEach(u => {
      if (u.match(/\.(woff2?|ttf|otf|eot)/i)) {
        fontUrls.add(u);
      } else {
        assetUrls.add(u);
      }
    });

    // Google fonts / gstatic
    const gfonts = html.match(/https:\/\/fonts\.gstatic\.com\/[^\s"'()><?#]+/gi) || [];
    gfonts.forEach(u => fontUrls.add(u));
  }

  console.log(`Found ${pages.length} pages.`);
  console.log(`Total unique images/assets: ${assetUrls.size}`);
  console.log(`Total unique fonts: ${fontUrls.size}`);
  console.log('Sample images:', Array.from(assetUrls).slice(0, 5));
  console.log('Sample fonts:', Array.from(fontUrls));
}

collectAllAssets().catch(console.error);
