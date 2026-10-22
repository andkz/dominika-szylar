import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

const framer = html.match(/https:\/\/[^\s"'()><]*framerusercontent\.com[^\s"'()><]*/gi) || [];
console.log('All framerusercontent URLs in index.html:');
Array.from(new Set(framer)).forEach(u => console.log(' ', u));

const gstatic = html.match(/https:\/\/[^\s"'()><]*fonts\.gstatic\.com[^\s"'()><]*/gi) || [];
console.log('All fonts.gstatic URLs in index.html:');
Array.from(new Set(gstatic)).forEach(u => console.log(' ', u));
