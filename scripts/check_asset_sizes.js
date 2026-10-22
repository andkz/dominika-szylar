import fs from 'node:fs';

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

async function checkAssetSizes() {
  const allImages = new Set();
  const allFonts = new Set();
  const otherAssets = new Set();

  for (const page of pages) {
    const res = await fetch(`https://dominikaszylar.framer.media${page}`);
    const html = await res.text();
    
    const framerImages = html.match(/https:\/\/framerusercontent\.com\/images\/[^\s"'()><?#]+/gi) || [];
    framerImages.forEach(u => allImages.add(u));

    const framerIcons = html.match(/https:\/\/framerusercontent\.com\/sites\/icons\/[^\s"'()><?#]+/gi) || [];
    framerIcons.forEach(u => allImages.add(u));

    const framerAssets = html.match(/https:\/\/framerusercontent\.com\/assets\/[^\s"'()><?#]+/gi) || [];
    framerAssets.forEach(u => {
      if (u.match(/\.(woff2?|ttf|otf)/i)) allFonts.add(u);
      else otherAssets.add(u);
    });

    const gfonts = html.match(/https:\/\/fonts\.gstatic\.com\/[^\s"'()><?#]+/gi) || [];
    gfonts.forEach(u => allFonts.add(u));
  }

  console.log(`Unique images: ${allImages.size}`);
  console.log(`Unique fonts: ${allFonts.size}`);
  console.log(`Other assets: ${otherAssets.size}`);
  console.log('List of images:');
  for (const img of allImages) console.log('  ', img);
  console.log('List of other assets:');
  for (const a of otherAssets) console.log('  ', a);
}

checkAssetSizes();
