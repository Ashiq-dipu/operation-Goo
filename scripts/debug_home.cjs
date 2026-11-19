const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
console.log('HTML Length:', html.length);

const links = html.match(/<link[^>]+>/gi) || [];
console.log('\n--- Link tags ---');
links.forEach(l => console.log(l));

const scripts = html.match(/<script[^>]+src=[^>]+>/gi) || [];
console.log('\n--- External Script tags ---');
scripts.forEach(s => console.log(s));

// Check if there are inline styles or scripts
const inlineStyles = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
console.log('\n--- Inline style tags count:', inlineStyles.length);

// Check if all referenced local files exist
links.forEach(l => {
  const m = l.match(/href=["']([^"']+)["']/i);
  if (m && !m[1].startsWith('http') && !m[1].startsWith('//') && !m[1].startsWith('data:')) {
    const file = m[1].split('?')[0];
    console.log(`CSS file '${file}': exists =`, fs.existsSync(file));
  }
});

scripts.forEach(s => {
  const m = s.match(/src=["']([^"']+)["']/i);
  if (m && !m[1].startsWith('http') && !m[1].startsWith('//')) {
    const file = m[1].split('?')[0];
    console.log(`JS file '${file}': exists =`, fs.existsSync(file));
  }
});
