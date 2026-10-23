const testStrings = [
  'href="./kontakt"',
  'href="../kontakt"',
  'href="/kontakt"',
  'href="./o-mnie"',
  'href="../o-mnie"',
  'href="/o-mnie"',
  'href="./"',
  'href="../"',
  'href="/"',
  'href="./blog/jak-zaczac-cwiczac-silowo"',
  'href="../blog/jak-zaczac-cwiczac-silowo"'
];

function normalize(html, prefix) {
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?kontakt(?:\/)?(?:index\.html)?"/g, `href="${prefix}kontakt/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?o-mnie(?:\/)?(?:index\.html)?"/g, `href="${prefix}o-mnie/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?efekty(?:\/)?(?:index\.html)?"/g, `href="${prefix}efekty/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?blog(?:\/)?(?:index\.html)?"/g, `href="${prefix}blog/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?blog\/jak-zaczac-cwiczac-silowo(?:\/)?(?:index\.html)?"/g, `href="${prefix}blog/jak-zaczac-cwiczac-silowo/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?blog\/trening-poporodowy-kiedy-zaczac(?:\/)?(?:index\.html)?"/g, `href="${prefix}blog/trening-poporodowy-kiedy-zaczac/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?blog\/twoje-nogi-tez-zasluguja-na-chwile-ulgi(?:\/)?(?:index\.html)?"/g, `href="${prefix}blog/twoje-nogi-tez-zasluguja-na-chwile-ulgi/index.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)?404(?:\/)?(?:index\.html)?"/g, `href="${prefix}404.html"`);
  html = html.replace(/href="(?:\.\.\/|\.\/|\/)"/g, `href="${prefix}index.html"`);
  return html;
}

testStrings.forEach(s => console.log(s, '->', normalize(s, '../../')));
