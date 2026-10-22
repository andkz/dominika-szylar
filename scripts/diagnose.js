import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

console.log('=== CHECKING SRCSETS ===');
const srcsets = html.match(/srcset="[^"]*"/gi) || [];
console.log('srcsets count:', srcsets.length);
srcsets.forEach((s, i) => console.log(`  ${i}:`, s.slice(0, 150)));

console.log('=== CHECKING SRCS ===');
const srcs = html.match(/src="[^"]*"/gi) || [];
console.log('srcs count:', srcs.length);
srcs.forEach((s, i) => console.log(`  ${i}:`, s));

console.log('=== CHECKING BACKGROUND-IMAGE URLS ===');
const bgUrls = html.match(/background(?:-image)?:\s*url\([^)]+\)/gi) || [];
console.log('bgUrls count:', bgUrls.length);
bgUrls.forEach((u, i) => console.log(`  ${i}:`, u));

console.log('=== CHECKING BROKEN OR LEFTOVER ATTRIBUTES ===');
// Check any 'undefined' or 'null' or weird tokens
console.log('Contains undefined:', html.includes('undefined'));
console.log('Contains null:', html.includes('null'));
