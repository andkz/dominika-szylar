import fs from 'node:fs';

async function inspectSSRVariants() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  
  // Check media queries
  const mediaQueries = home.match(/@media[^{]+\{/gi) || [];
  console.log('Media queries found:', Array.from(new Set(mediaQueries)));

  // Check ssr-variant in CSS
  const ssrRules = home.match(/\.ssr-variant[^{]*\{[^}]+\}/gi) || [];
  console.log('SSR variant CSS rules sample:', ssrRules.slice(0, 10));

  // Check body classes
  const bodyTag = home.match(/<body[^>]*>/i);
  console.log('Body tag:', bodyTag ? bodyTag[0] : 'none');

  // Check main container
  const mainTag = home.match(/<div id=["']main["'][^>]*>/i);
  console.log('Main tag:', mainTag ? mainTag[0] : 'none');
}

inspectSSRVariants();
