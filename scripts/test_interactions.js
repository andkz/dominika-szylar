import fs from 'node:fs';

async function testInteractions() {
  const home = await (await fetch('https://dominikaszylar.framer.media/')).text();
  const kontakt = await (await fetch('https://dominikaszylar.framer.media/kontakt')).text();

  console.log('=== ACCORDION ANALYSIS ===');
  // Find all elements with data-framer-name="Closed" or "Open"
  const closedMatches = home.match(/<div[^>]*data-framer-name=["'](Closed|Open)["'][^>]*>/gi) || [];
  console.log('Closed/Open items found:', closedMatches.length);
  closedMatches.forEach((m, idx) => {
    console.log(`Accordion ${idx}:`, m);
  });

  console.log('=== MOBILE MENU ANALYSIS ===');
  // Find menu icons or nav triggers
  const menuMatches = home.match(/<[^>]*data-framer-name=["'][^"']*(?:menu|hamburger|nav)[^"']*["'][^>]*>/gi) || [];
  console.log('Menu matches found:', menuMatches.length);
  menuMatches.forEach((m, idx) => {
    console.log(`Menu element ${idx}:`, m);
  });

  console.log('=== FORM IN KONTAKT ANALYSIS ===');
  const formMatch = kontakt.match(/<form[^>]*>[\s\S]*?<\/form>/i);
  if (formMatch) {
    const formHtml = formMatch[0];
    const inputs = formHtml.match(/<input[^>]*>|<textarea[^>]*>|<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    console.log('Form elements:');
    inputs.forEach(inp => console.log('  ', inp));
  }
}

testInteractions();
