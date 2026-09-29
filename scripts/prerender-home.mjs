import fs from 'node:fs';
const { render } = await import('../.ssr/entry-server.js');
const template = fs.readFileSync('dist/index.html', 'utf8');
if (!template.includes('<div id="root"></div>')) throw new Error('Expected a fresh client build');
const body = render();
if ((body.match(/<h1\b/g) || []).length !== 1) throw new Error('Homepage must render exactly one H1');
fs.writeFileSync('dist/index.html', template.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`));
console.log('Homepage rendered as crawlable HTML.');
