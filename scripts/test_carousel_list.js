import fs from 'node:fs';

async function checkCarouselList() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const carouselIdx = home.indexOf('class="framer--carousel');
  if (carouselIdx !== -1) {
    console.log('Carousel full excerpt:');
    console.log(home.slice(carouselIdx - 100, carouselIdx + 1000));
  }
}

checkCarouselList();
