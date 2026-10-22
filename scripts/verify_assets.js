import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';

const files = [
  'index.html',
  '404.html',
  'o-mnie/index.html',
  'kontakt/index.html',
  'efekty/index.html',
  'blog/index.html',
  'blog/jak-zaczac-cwiczac-silowo/index.html',
  'blog/trening-poporodowy-kiedy-zaczac/index.html',
  'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html'
];

let totalIssues = 0;

for (const f of files) {
  const filePath = path.join(projectDir, f);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check framerusercontent
  const framerMatches = content.match(/https?:\/\/[^\s"'()><]*framerusercontent\.com[^\s"'()><]*/gi) || [];
  // Check events.framer
  const eventMatches = content.match(/https?:\/\/[^\s"'()><]*events\.framer\.com[^\s"'()><]*/gi) || [];
  // Check fonts.gstatic
  const gstaticMatches = content.match(/https?:\/\/[^\s"'()><]*fonts\.gstatic\.com[^\s"'()><]*/gi) || [];

  console.log(`Checking ${f}:`);
  if (framerMatches.length > 0) {
    console.log(`  WARNING: Found ${framerMatches.length} framerusercontent URLs!`);
    console.log(`    Sample:`, framerMatches.slice(0, 3));
    totalIssues += framerMatches.length;
  } else {
    console.log(`  framerusercontent: 0 (OK)`);
  }

  if (eventMatches.length > 0) {
    console.log(`  WARNING: Found ${eventMatches.length} events.framer URLs!`);
    totalIssues += eventMatches.length;
  } else {
    console.log(`  events.framer: 0 (OK)`);
  }

  if (gstaticMatches.length > 0) {
    console.log(`  WARNING: Found ${gstaticMatches.length} fonts.gstatic URLs!`);
    console.log(`    Sample:`, gstaticMatches.slice(0, 3));
    totalIssues += gstaticMatches.length;
  } else {
    console.log(`  fonts.gstatic: 0 (OK)`);
  }
}

console.log(`\nVerification finished. Total remote asset issues: ${totalIssues}`);
