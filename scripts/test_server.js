import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'C:\\Users\\kamil\\.gemini\\antigravity\\scratch\\dominikaszylar';
const port = 8089;

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
  console.log(`Test server running at http://localhost:${port}`);

  // Test routes
  const testRoutes = [
    '/',
    '/o-mnie',
    '/kontakt',
    '/efekty',
    '/blog',
    '/blog/jak-zaczac-cwiczac-silowo',
    '/blog/trening-poporodowy-kiedy-zaczac',
    '/blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi',
    '/404',
    '/js/main.js'
  ];

  let errors = 0;
  for (const r of testRoutes) {
    const res = await fetch(`http://localhost:${port}${r}`);
    console.log(`Route ${r}: HTTP ${res.status}`);
    if (r !== '/404' && res.status !== 200) errors++;
  }

  console.log(`Route testing complete. Errors: ${errors}`);
  server.close(() => process.exit(0));
});
