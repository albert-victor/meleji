/**
 * Replace Unicode em dash (U+2014) with en dash (U+2013) in text sources.
 * UTF-8 safe: read/write with explicit encoding; skip unknown/binary extensions.
 *
 * Usage: node scripts/normalize-dashes.mjs [--dry-run]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DRY = process.argv.includes('--dry-run');

const SCAN_ROOTS = ['src', 'pages', 'docs', 'scripts'];
const ROOT_FILES = ['index.html'];
const EXT_OK = new Set(['.js', '.mjs', '.html', '.md', '.css', '.json']);

const EM = '\u2014';
const EN = '\u2013';

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
      walk(full, out);
      continue;
    }
    const dot = name.lastIndexOf('.');
    const ext = dot >= 0 ? name.slice(dot) : '';
    if (!EXT_OK.has(ext)) continue;
    out.push(full);
  }
}

function normalizeContent(text) {
  let next = text.split(EM).join(EN);
  next = next.replaceAll('&ndash;', '&ndash;');
  next = next.replaceAll('&#8211;', '&#8211;');
  return next;
}

const files = [];
for (const root of SCAN_ROOTS) {
  walk(join(ROOT, root), files);
}
for (const f of ROOT_FILES) {
  const full = join(ROOT, f);
  try {
    statSync(full);
    files.push(full);
  } catch {
    /* missing */
  }
}

let touched = 0;
let replacements = 0;

for (const full of files) {
  const raw = readFileSync(full, 'utf8');
  if (!raw.includes(EM) && !raw.includes('&ndash;') && !raw.includes('&#8211;')) continue;

  const beforeEm = (raw.match(/\u2014/g) || []).length;
  const beforeEnt =
    (raw.match(/&ndash;/g) || []).length + (raw.match(/&#8211;/g) || []).length;
  const next = normalizeContent(raw);
  const afterEm = (next.match(/\u2014/g) || []).length;

  const fileReplacements = beforeEm + beforeEnt - afterEm;
  if (next === raw) continue;

  replacements += fileReplacements;
  touched += 1;
  const rel = relative(ROOT, full);
  console.log(`${DRY ? '[dry-run] ' : ''}${rel} (${fileReplacements} em → en)`);

  if (!DRY) {
    writeFileSync(full, next, { encoding: 'utf8' });
  }
}

console.log(`\nDone. Files ${touched}, em-dash replacements ~${replacements}. ${DRY ? 'No files written.' : 'Written as UTF-8.'}`);