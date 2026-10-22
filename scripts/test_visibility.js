import fs from 'node:fs';

async function testVisibility() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  
  // Check inline opacity 0
  const opacities = home.match(/style="[^"]*opacity:\s*0[^"]*"/gi) || [];
  console.log('Inline opacity: 0 count:', opacities.length);
  opacities.forEach(o => console.log(' ', o));

  // Check inline visibility hidden
  const vis = home.match(/style="[^"]*visibility:\s*hidden[^"]*"/gi) || [];
  console.log('Inline visibility: hidden count:', vis.length);

  // Check data-framer-appear-animation
  const appear = home.match(/data-framer-appear-animation[^\s>]*/gi) || [];
  console.log('data-framer-appear-animation count:', appear.length);
}

testVisibility();
