const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Ensure <html has data-theme="kaszmir-piasek"
  content = content.replace(/<html(?![^>]*data-theme)([^>]*)>/i, '<html$1 data-theme="kaszmir-piasek">');

  // 2. Ensure head contains synchronous early theme script
  const earlyScript = '<script>(function(){try{var t=localStorage.getItem("ds_theme")||(new URLSearchParams(location.search).get("theme"))||"kaszmir-piasek";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();</script>';
  if (!content.includes('localStorage.getItem("ds_theme")')) {
    content = content.replace(/<head>/i, '<head>\n\t' + earlyScript);
  }

  // 3. Replace inline hardcoded white backgrounds on section wrappers
  // INDIBA
  content = content.replace(
    /style="background-color:var\(--token-eb1c2ac0-df61-44fa-bf47-8b8b7fb5abe3,\s*rgb\(255,\s*255,\s*255\)\);width:100%"/g,
    'style="background-color:var(--ds-color-1);width:100%"'
  );

  // Above footer
  content = content.replace(
    /style="background-color:var\(--token-80553515-7ab0-44ac-b981-96d7680674fd,\s*rgb\(255,\s*255,\s*255\)\);width:100%"/g,
    'style="background-color:var(--ds-color-1);width:100%"'
  );

  // Footer
  content = content.replace(
    /style="--border-bottom-width:0px;--border-color:rgb\(238,\s*238,\s*238\);--border-left-width:0px;--border-right-width:0px;--border-style:solid;--border-top-width:1px;background-color:var\(--token-80553515-7ab0-44ac-b981-96d7680674fd,\s*rgb\(255,\s*255,\s*255\)\);width:100%"/g,
    'style="--border-bottom-width:0px;--border-color:var(--ds-card-border);--border-left-width:0px;--border-right-width:0px;--border-style:solid;--border-top-width:1px;background-color:var(--ds-color-2);width:100%"'
  );

  // General body background token default
  content = content.replace(
    /:root\s*body\s*{\s*background:\s*var\(--token-80553515-7ab0-44ac-b981-96d7680674fd,\s*rgb\(255,\s*255,\s*255\)\);\s*}/g,
    ':root body { background: var(--ds-color-1); }'
  );
  content = content.replace(
    /html\s*body\s*{\s*background:\s*rgb\(255,\s*255,\s*255\);\s*}/g,
    'html body { background: var(--ds-color-1); }'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Processed:', filePath);
}

// Process index.html
processHtmlFile('index.html');

// Process all subpages
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git') continue;
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (f.endsWith('.html') && fullPath !== path.resolve('index.html')) {
      processHtmlFile(fullPath);
    }
  }
}
walkDir('.');
console.log('All HTML files sanitized and synchronized.');
