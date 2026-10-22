import fs from 'node:fs';

async function inspectMainProper() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const mainStart = home.indexOf('<div id="main"');
  console.log('mainStart index:', mainStart);
  
  // Find where scripts start after main
  const scriptStart = home.indexOf('<script', mainStart);
  console.log('scriptStart after main index:', scriptStart);
  
  const mainToScript = home.slice(mainStart, scriptStart);
  console.log('Length of main block:', mainToScript.length);
  
  // Check if __framer-badge-container is present
  console.log('Has badge container:', home.includes('__framer-badge-container'));
  
  // Check ssr-variant occurrences inside main
  const ssrVariants = mainToScript.match(/class=["'][^"']*ssr-variant[^"']*["']/gi);
  console.log('ssr-variant occurrences in main:', ssrVariants ? ssrVariants.length : 0);

  // Check data-framer-name inside main
  const framerNames = mainToScript.match(/data-framer-name=["'][^"']+["']/gi);
  console.log('data-framer-name occurrences:', framerNames ? framerNames.length : 0);
  console.log('Unique data-framer-names:', Array.from(new Set(framerNames)).slice(0, 20));
}

inspectMainProper();
