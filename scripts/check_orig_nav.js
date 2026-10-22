import fs from 'node:fs';

async function checkOriginalNav() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const navs = home.match(/<nav[\s\S]*?<\/nav>/gi) || [];
  console.log('Original navs count:', navs.length);
  console.log('Original Nav 0 length:', navs[0].length);
  console.log('Original Nav 1 length:', navs[1].length);
  console.log('--- Original Nav 1 full: ---');
  console.log(navs[1]);
}

checkOriginalNav();
