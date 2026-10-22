import fs from 'node:fs';

async function checkOpacityElements() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  
  const matches = home.match(/<[^>]+style="[^"]*opacity:\s*0(?:\.001)?[^"]*"[^>]*>/gi) || [];
  console.log('Opacity 0 or 0.001 elements count:', matches.length);
  matches.forEach((m, idx) => {
    console.log(`Element ${idx}:`, m.slice(0, 150));
  });
}

checkOpacityElements();
