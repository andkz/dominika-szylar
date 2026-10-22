import fs from 'node:fs';

async function testNavCSS() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const matches = home.match(/\.framer-[^{]*8lkanp[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for 8lkanp in CSS:');
  matches.forEach(m => console.log(' ', m));

  const navVariants = home.match(/\.framer-e91Ap[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for framer-e91Ap:');
  navVariants.forEach(m => console.log(' ', m));

  // Also check classes containing framer-14br5d7 (Menu Icon)
  const menuIconVariants = home.match(/\.framer-qPyl3[^{]*\{[^}]*\}/gi) || [];
  console.log('Matches for framer-qPyl3:');
  menuIconVariants.forEach(m => console.log(' ', m));
}

testNavCSS();
