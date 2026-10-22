import fs from 'node:fs';

async function checkCarousel() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const btnIdx = home.indexOf('aria-label="Previous"');
  if (btnIdx !== -1) {
    console.log('Carousel container snippet:');
    console.log(home.slice(btnIdx - 500, btnIdx + 1500));
  }
}

checkCarousel();
