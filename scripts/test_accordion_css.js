import fs from 'node:fs';

async function testAccordionCSS() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const matches = home.match(/\.framer-[^{]*czg96[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for czg96 in CSS:');
  matches.forEach(m => console.log(' ', m));

  // Also search for classes starting with framer-4eoZp
  const rules = home.match(/\.framer-4eoZp[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for framer-4eoZp:');
  rules.forEach(m => console.log(' ', m));

  // Find other variants of this component
  const compStyles = home.match(/\.framer-pdzzun[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for framer-pdzzun:');
  compStyles.forEach(m => console.log(' ', m));
}

testAccordionCSS();
