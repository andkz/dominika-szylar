import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');
const accIdx = html.indexOf('data-framer-name="Closed"');
const snippet = html.slice(accIdx, accIdx + 1200);
console.log(snippet);
