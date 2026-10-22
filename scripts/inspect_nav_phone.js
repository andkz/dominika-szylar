import fs from 'node:fs';

const html = fs.readFileSync('C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar\\index.html', 'utf8');

const phoneNavIdx = html.indexOf('data-framer-name="Phone"');
if (phoneNavIdx !== -1) {
  console.log('Phone Nav snippet:');
  console.log(html.slice(phoneNavIdx, phoneNavIdx + 2000));
} else {
  console.log('Not found');
}
