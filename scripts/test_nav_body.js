import fs from 'node:fs';

async function testNavBody() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const phoneNavIdx = home.indexOf('data-framer-name="Phone"');
  if (phoneNavIdx !== -1) {
    const navTag = home.slice(phoneNavIdx - 20, phoneNavIdx + 3000);
    console.log(navTag);
  }
}

testNavBody();
