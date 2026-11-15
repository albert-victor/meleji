import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildInnerPageHtml } from '../src/utils/page-html.js';

const root = fileURLToPath(new URL('..', import.meta.url));

/** @type {Parameters<typeof buildInnerPageHtml>[0][]} */
const entries = [
  {
    path: 'pages/safaris/activities/city-tours/index.html',
    title: 'Arusha city tours | Meleji Homestays',
    description: 'Guided Arusha city tour — Clock Tower, streets, and local coffee stops. Price on request.',
    page: 'safari-activity-detail',
    slug: 'city-tours',
    footer: 'compact',
  },
  {
    path: 'pages/safaris/activities/local-markets-tours/index.html',
    title: 'Local markets tours | Meleji Homestays',
    description: 'Arusha Central Market and spice stalls with a guide. Price on request.',
    page: 'safari-activity-detail',
    slug: 'local-markets-tours',
    footer: 'compact',
  },
  {
    path: 'pages/safaris/packages/arusha-city-tour/index.html',
    title: 'Arusha city tour | Meleji Homestays',
    description: 'Half-day Arusha city package — landmarks and cafés with Meleji. Price on request.',
    page: 'package-detail',
    slug: 'arusha-city-tour',
    footer: 'compact',
  },
  {
    path: 'pages/safaris/packages/arusha-local-markets-tour/index.html',
    title: 'Arusha local markets tour | Meleji Homestays',
    description: 'Half-day Arusha markets package — spices and produce with a guide. Price on request.',
    page: 'package-detail',
    slug: 'arusha-local-markets-tour',
    footer: 'compact',
  },
];

for (const entry of entries) {
  const target = join(root, entry.path);
  mkdirSync(dirname(target), { recursive: true });
  const { path: _path, ...opts } = entry;
  writeFileSync(target, buildInnerPageHtml(opts), 'utf8');
  console.log('Wrote', entry.path);
}
