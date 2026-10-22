import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const res = await fetch('https://dominikaszylar.framer.media/');
  const html = await res.text();
  console.log('HTML length:', html.length);
  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  console.log('Title:', titleMatch ? titleMatch[1] : 'none');
  
  const styles = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  console.log('Style tags count:', styles.length);

  const assets = html.match(/https:\/\/framerusercontent\.com\/[^\s"'()><]+/gi) || [];
  console.log('Assets found count:', assets.length);
  const uniqueAssets = Array.from(new Set(assets));
  console.log('Unique assets count:', uniqueAssets.length);
  console.log('Asset sample (first 5):', uniqueAssets.slice(0, 5));
}

main().catch(console.error);
