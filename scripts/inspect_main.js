import fs from 'node:fs';

async function inspectMainChildren() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const mainMatch = home.match(/<div id=["']main["'][^>]*>([\s\S]*?)<\/div>\s*<div id="__framer-badge-container"/i);
  if (mainMatch) {
    const mainContent = mainMatch[1];
    console.log('Main content length:', mainContent.length);
    // Find top-level children of main
    const topChildren = mainContent.match(/<div class="[^"]+"[^>]*>/gi) || [];
    console.log('Top div tags count:', topChildren.length);
    console.log('Top div tags sample (first 5):', topChildren.slice(0, 5));
  } else {
    console.log('No badge container found, checking end of main');
    const mainMatch2 = home.match(/<div id=["']main["'][^>]*>([\s\S]*?)<\/div>/i);
    console.log('Main length:', mainMatch2 ? mainMatch2[1].length : 0);
  }
}

inspectMainChildren();
