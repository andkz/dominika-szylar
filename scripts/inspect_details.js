import fs from 'node:fs';

async function test() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const matches = home.match(/<div class="[^"]*ssr-variant[^"]*"[^>]*>/gi) || [];
  console.log('ssr-variant open tags:', matches.length);
  for (let i = 0; i < Math.min(5, matches.length); i++) {
    console.log(`ssr-variant tag ${i}:`, matches[i]);
  }
}
test();
