import fs from 'node:fs';

async function testHoverAndTransitions() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const hovers = home.match(/:hover[^{]*\{[^}]*\}/gi) || [];
  console.log('Hover rules count:', hovers.length);
  hovers.slice(0, 5).forEach(h => console.log(' ', h));

  const transitions = home.match(/transition:[^;}]+/gi) || [];
  console.log('Transition properties count:', transitions.length);
  transitions.slice(0, 5).forEach(t => console.log(' ', t));
}

testHoverAndTransitions();
