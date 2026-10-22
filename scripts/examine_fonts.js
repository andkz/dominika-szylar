import fs from 'node:fs';

async function examineFonts() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  
  // Extract all font-family names declared
  const families = new Set();
  const fontFaces = home.match(/@font-face\s*\{[^}]+\}/gi) || [];
  console.log('Total @font-face rules in home:', fontFaces.length);
  for (const ff of fontFaces) {
    const fam = ff.match(/font-family:\s*['"]?([^'";}]+)['"]?/i);
    if (fam) families.add(fam[1]);
  }
  console.log('Font families in home:', Array.from(families));

  // Also check computed font-family usage in CSS rules
  const usedFamilies = new Set();
  const ffMatches = home.match(/font-family:[^;}]+/gi) || [];
  ffMatches.forEach(m => usedFamilies.add(m));
  console.log('Sample used font-family properties:', Array.from(usedFamilies).slice(0, 10));
}

examineFonts();
