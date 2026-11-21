import { execSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

console.log('Smoke: build…');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

const distIndex = join(root, 'dist', 'index.html');
if (!existsSync(distIndex)) fail('dist/index.html missing');
ok('dist/index.html');

const indexSrc = readFileSync(join(root, 'index.html'), 'utf8');
if (!indexSrc.includes('data-reveal')) fail('homepage missing data-reveal markers');

const assetsDir = join(root, 'dist', 'assets');
const cssFiles = readdirSync(assetsDir).filter((f) => f.endsWith('.css'));
const hasRevealToken = cssFiles.some((f) => readFileSync(join(assetsDir, f), 'utf8').includes('--reveal-scale-from'));
if (!hasRevealToken) fail('elegant scale tokens not in production CSS');
ok('elegant scale tokens in bundle');

const distHome = readFileSync(distIndex, 'utf8');
if (!distHome.includes('page--home')) fail('homepage body class not in dist');

const samplePages = [
  'pages/safaris/destinations/index.html',
  'pages/safaris/packages/index.html',
  'pages/accommodation/index.html',
];
for (const rel of samplePages) {
  const p = join(root, 'dist', rel);
  if (!existsSync(p)) fail(`missing dist/${rel}`);
}
ok('sample inner pages built');

console.log('\nSmoke passed.');