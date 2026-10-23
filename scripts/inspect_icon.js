import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');
const bodyIdx = html.indexOf('<body');
const accIdx = html.indexOf('framer-181xy7y-container', bodyIdx);
console.log(html.slice(accIdx - 50, accIdx + 1200));
