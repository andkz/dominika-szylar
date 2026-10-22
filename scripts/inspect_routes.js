import fs from 'node:fs';

const routes = [
  '/',
  '/o-mnie',
  '/kontakt',
  '/efekty',
  '/blog',
  '/blog/jak-zaczac-cwiczac-silowo',
  '/blog/trening-poporodowy-kiedy-zaczac',
  '/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi',
  '/404',
  '/testing-sht'
];

async function inspect() {
  for (const route of routes) {
    const url = `https://dominikaszylar.framer.media${route}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(`=== ROUTE: ${route} (${res.status}) ===`);
      const formMatch = text.match(/<form[^>]*>/gi);
      console.log('Forms:', formMatch ? formMatch.length : 0);
      const accordions = text.match(/data-framer-name=["'](Closed|Open|FAQ|Accordion)["']/gi);
      console.log('Accordion matches:', accordions ? accordions.length : 0);
      const menu = text.match(/data-framer-name=["'][^"']*(menu|nav|hamburger)[^"']*["']/gi);
      console.log('Menu matches:', menu ? Array.from(new Set(menu)) : 'none');
    } catch (e) {
      console.error(`Error fetching ${route}:`, e.message);
    }
  }
}

inspect();
