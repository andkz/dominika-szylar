import fs from 'node:fs';

async function testMobileMenu() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const menuIndex = home.indexOf('data-framer-name="Menu Icon"');
  if (menuIndex !== -1) {
    console.log('Mobile menu snippet:');
    console.log(home.slice(menuIndex - 200, menuIndex + 1200));
  }
}

testMobileMenu();
