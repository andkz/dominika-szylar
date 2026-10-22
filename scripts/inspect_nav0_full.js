import fs from 'node:fs';

async function inspectOriginalNav0() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const nav0 = home.match(/<nav[^>]*data-framer-name="Desktop"[^>]*>[\s\S]*?<\/nav>/i)[0];
  
  // Find where Links Wrap starts and where nav ends
  const linksWrapStart = nav0.indexOf('<div class="framer-1b6shkl"');
  console.log('Links Wrap start:', linksWrapStart);
  const linksToEnd = nav0.slice(linksWrapStart);
  console.log('From Links Wrap to end of Desktop Nav:');
  console.log(linksToEnd);
}

inspectOriginalNav0();
