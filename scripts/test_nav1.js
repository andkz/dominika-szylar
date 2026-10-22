import fs from 'node:fs';

async function testNav1() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const navMatches = home.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  console.log('Nav 1 full HTML:');
  console.log(navMatches[1]);
}

testNav1();
