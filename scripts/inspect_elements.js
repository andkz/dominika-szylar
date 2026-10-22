import fs from 'node:fs';

async function examine() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const kontakt = await (await fetch('https://dominikaszylar.framer.media/kontakt')).text();

  // Check form in kontakt
  const formTag = kontakt.match(/<form[\s\S]*?<\/form>/i);
  console.log('--- FORM TAG IN KONTAKT ---');
  if (formTag) {
    console.log(formTag[0].slice(0, 500) + '...');
  }

  // Check accordions in home
  console.log('--- ACCORDIONS IN HOME ---');
  const accordionMatches = home.match(/<div[^>]*data-framer-name=["'](Closed|Open)["'][^>]*>[\s\S]*?<\/div>/gi);
  if (accordionMatches) {
    console.log('Found accordion tags count:', accordionMatches.length);
    console.log('Sample accordion outer HTML:', accordionMatches[0].slice(0, 300));
  }

  // Check font sources in home
  const fonts = home.match(/url\([^)]+\)/gi) || [];
  const fontUrls = fonts.filter(u => u.includes('.woff') || u.includes('.woff2') || u.includes('.ttf') || u.includes('fonts.gstatic.com'));
  console.log('--- FONT URLS ---', Array.from(new Set(fontUrls)).slice(0, 10));

  // Check images
  const imgUrls = home.match(/https:\/\/framerusercontent\.com\/images\/[^\s"'()><]+/gi) || [];
  console.log('--- IMAGES COUNT ---', new Set(imgUrls).size);
}

examine();
