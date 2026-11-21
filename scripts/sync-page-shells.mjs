/**
 * Ensures inner pages include main.css + critical head CSS (skip link / menu FOUC).
 * Rewrites shells that match the standard data-inner-mount pattern.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildInnerPageHtml } from '../src/utils/page-html.js';

const root = fileURLToPath(new URL('..', import.meta.url));

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (name === 'index.html') acc.push(full);
  }
  return acc;
}

function metaContent(html, name) {
  const m = html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, 'i'));
  return m?.[1] ?? '';
}

function titleText(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m?.[1] ?? 'Meleji Homestays';
}

function bodyAttr(html, attr) {
  const m = html.match(new RegExp(`data-${attr.replace(/_/g, '-')}="([^"]*)"`, 'i'));
  return m?.[1];
}

const pagesDir = join(root, 'pages');
if (!statSync(pagesDir).isDirectory()) {
  console.error('No pages/ directory');
  process.exit(1);
}

let updated = 0;
let skipped = 0;

for (const file of walk(pagesDir)) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('data-inner-mount')) {
    skipped += 1;
    continue;
  }

  const page = bodyAttr(html, 'page');
  if (!page) {
    skipped += 1;
    continue;
  }

  const hasShell =
    html.includes('/src/styles/main.css') && html.includes('.skip-link{position:absolute');
  if (hasShell) {
    skipped += 1;
    continue;
  }

  const opts = {
    title: titleText(html),
    description: metaContent(html, 'description') || 'Meleji Homestays',
    page,
    footer: bodyAttr(html, 'footer') === 'compact' ? 'compact' : 'full',
    slug: bodyAttr(html, 'slug'),
    robots: metaContent(html, 'robots') || undefined,
  };

  writeFileSync(file, buildInnerPageHtml(opts), 'utf8');
  updated += 1;
  console.log(`Updated ${relative(root, file)}`);
}

const notFound = join(root, '404.html');
if (statSync(notFound).isFile()) {
  const html = readFileSync(notFound, 'utf8');
  if (!html.includes('/src/styles/main.css')) {
    writeFileSync(
      notFound,
      buildInnerPageHtml({
        title: titleText(html),
        description: metaContent(html, 'description'),
        page: 'not-found',
        footer: 'compact',
      }),
      'utf8',
    );
    updated += 1;
    console.log('Updated 404.html');
  }
}

console.log(`Done. ${updated} updated, ${skipped} unchanged or skipped.`);