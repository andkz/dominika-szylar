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

async function checkExternalDomains() {
  const domains = new Set();
  for (const page of pages) {
    const res = await fetch(`https://dominikaszylar.framer.media${page}`);
    const html = await res.text();
    const urls = html.match(/https?:\/\/[^\s"'()><,]+/gi) || [];
    urls.forEach(u => {
      try {
        const parsed = new URL(u);
        domains.add(parsed.hostname);
      } catch (e) {}
    });
  }
  console.log('All unique external hostnames across all pages:');
  for (const d of domains) {
    console.log('  ', d);
  }
}

checkExternalDomains();
