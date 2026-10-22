import fs from 'node:fs';

async function checkScripts() {
  const res = await fetch('https://dominikaszylar.framer.media/');
  const html = await res.text();

  const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  console.log('Script count in home:', scripts.length);
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    const src = s.match(/src=["']([^"']+)["']/i);
    const type = s.match(/type=["']([^"']+)["']/i);
    console.log(`Script ${i}: src=${src ? src[1] : 'inline'}, type=${type ? type[1] : 'none'}`);
    if (!src) {
      console.log('  Excerpt:', s.slice(0, 150).replace(/\n/g, ' '));
    }
  }
}

checkScripts();
