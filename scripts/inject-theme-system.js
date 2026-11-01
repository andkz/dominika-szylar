import fs from 'fs';
import path from 'path';

const filesToInject = [
  'index.html',
  'o-mnie/index.html',
  'efekty/index.html',
  'kontakt/index.html',
  'blog/index.html',
  'blog/jak-zaczac-cwiczac-silowo/index.html',
  'blog/trening-poporodowy-kiedy-zaczac/index.html',
  'blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html'
];

for (const relPath of filesToInject) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Compute relative path to root
  const depth = relPath.split('/').length - 1;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  const cssTag = `<link rel="stylesheet" href="${prefix}css/themes.css">`;
  const jsTag = `<script src="${prefix}js/theme-switcher.js" defer></script>`;

  // Only inject if not already present
  if (!content.includes('css/themes.css')) {
    if (content.includes('</head>')) {
      content = content.replace('</head>', `    ${cssTag}\n    ${jsTag}\n</head>`);
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Injected theme system into ${relPath}`);
    } else {
      console.warn(`Could not find </head> in ${relPath}`);
    }
  } else {
    console.log(`Already injected in ${relPath}`);
  }
}
