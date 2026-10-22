import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

const navs = html.match(/<nav[\s\S]*?<\/nav>/gi) || [];
console.log('Total nav tags:', navs.length);
navs.forEach((nav, idx) => {
  console.log(`=== NAV ${idx} ===`);
  console.log(nav);
});
