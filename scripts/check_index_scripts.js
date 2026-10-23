import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
console.log('Scripts count in index.html:', scripts.length);
scripts.forEach((s, idx) => {
  console.log(`Script ${idx}:`, s.slice(0, 200).replace(/\n/g, ' '));
});
