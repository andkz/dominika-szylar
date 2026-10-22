import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const fontsDir = path.join(projectDir, 'fonts');

async function downloadExtraFont() {
  const satoshiUrl = 'https://framerusercontent.com/third-party-assets/fontshare/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2';
  const localName = 'satoshi_7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2';
  const localPath = path.join(fontsDir, localName);

  if (!fs.existsSync(localPath)) {
    const res = await fetch(satoshiUrl);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(localPath, buf);
    console.log(`Downloaded satoshi font: ${localName} (${(buf.length / 1024).toFixed(1)} KB)`);
  }

  const fontMapPath = path.join(projectDir, 'font_map.json');
  const fontMap = JSON.parse(fs.readFileSync(fontMapPath, 'utf8'));
  fontMap[satoshiUrl] = `/fonts/${localName}`;
  fs.writeFileSync(fontMapPath, JSON.stringify(fontMap, null, 2));
  console.log('Updated font_map.json');
}

downloadExtraFont().catch(console.error);
