import fs from 'node:fs';

async function testNav0() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const navMatches = home.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  console.log('Nav 0 full HTML:');
  console.log(navMatches[0]);
}

testNav0();
