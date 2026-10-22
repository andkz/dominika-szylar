import fs from 'node:fs';

async function testNav() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const navMatches = home.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  console.log('Nav tags count:', navMatches.length);
  navMatches.forEach((nav, idx) => {
    console.log(`Nav ${idx} length: ${nav.length}`);
    console.log(`Nav ${idx} excerpt:`, nav.slice(0, 400));
  });
}

testNav();
