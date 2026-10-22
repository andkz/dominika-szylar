import fs from 'node:fs';

async function testNavInner() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const navIdx = home.indexOf('framer-v-8lkanp');
  if (navIdx !== -1) {
    const navTag = home.slice(navIdx - 50, navIdx + 3000);
    console.log(navTag);
  }
}

testNavInner();
