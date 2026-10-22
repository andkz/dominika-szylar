import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const port = 8091;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let parsedUrl = new URL(req.url, `http://localhost:${port}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  let filePath = path.join(projectDir, pathname);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(projectDir, '404.html');
    res.statusCode = 404;
  } else {
    res.statusCode = 200;
  }

  const ext = path.extname(filePath).toLowerCase();
  res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const outLocal = path.join(projectDir, 'screenshot_local.png');
  const outRemote = path.join(projectDir, 'screenshot_remote.png');

  try {
    console.log('Capturing local screenshot...');
    execSync(`"${edgePath}" --headless --disable-gpu --window-size=1440,1200 --screenshot="${outLocal}" http://localhost:${port}/`);
    console.log('Local screenshot saved to', outLocal);

    console.log('Capturing remote screenshot...');
    execSync(`"${edgePath}" --headless --disable-gpu --window-size=1440,1200 --screenshot="${outRemote}" https://dominikaszylar.framer.media/`);
    console.log('Remote screenshot saved to', outRemote);
  } catch (e) {
    console.error('Screenshot error:', e.message);
  }

  server.close(() => process.exit(0));
});
