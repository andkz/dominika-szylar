import fs from 'node:fs';

async function checkBreakpointsCSS() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  
  const bpHashes = ['72rtr7', '1j3i7qj', 'gsths5', '1yfaq4n', 'vagbr0', 'f69agx'];
  for (const h of bpHashes) {
    const regex = new RegExp(`\\.framer-${h}[^{]*\\{[^}]*\\}`, 'gi');
    const matches = home.match(regex);
    console.log(`Breakpoint hash ${h}: matches = ${matches ? matches.length : 0}`);
    if (matches) {
      console.log(`  Sample:`, matches[0]);
    }
  }
}

checkBreakpointsCSS();
