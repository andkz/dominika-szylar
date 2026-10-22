import fs from 'node:fs';

async function testAccordionDOM() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const accMatch = home.match(/<div class="[^"]*framer-4eoZp[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  if (accMatch) {
    console.log(accMatch[0].slice(0, 1000));
  }
}

testAccordionDOM();
