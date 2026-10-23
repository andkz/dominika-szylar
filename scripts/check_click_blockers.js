import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

const onClicks = html.match(/on[a-z]+=["'][^"']*["']/gi) || [];
console.log('Inline on* event handlers in HTML:', onClicks.length);
onClicks.forEach(o => console.log(' ', o));

const inlineScripts = html.match(/<script(?![^>]*src=)[^>]*>[\s\S]*?<\/script>/gi) || [];
console.log('Total inline script tags:', inlineScripts.length);
inlineScripts.forEach((s, i) => {
  console.log(`Inline script ${i}:`, s.slice(0, 100).replace(/\n/g, ' '));
});
