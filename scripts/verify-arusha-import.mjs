import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const manifest = JSON.parse(
  readFileSync(join(root, 'src/data/imported/arusha-destinations.manifest.json'), 'utf8'),
);

const REQUIRED = ['materuni-waterfalls', 'kikuletwa-hot-springs', 'lake-chala', 'lake-eyasi'];
let ok = true;

for (const slug of REQUIRED) {
  if (!manifest.destinations.find((d) => d.slug === slug)) {
    console.error(`MISSING required slug: ${slug}`);
    ok = false;
  }
}

for (const d of manifest.destinations) {
  const imgDir = join(root, 'src/assets/images/destinations', d.slug);
  const files = existsSync(imgDir) ? readdirSync(imgDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)) : [];
  const page = join(root, 'pages/safaris/destinations', d.slug, 'index.html');

  if (d.imageCount < 5) {
    console.error(`${d.slug}: expected ≥5 images, got ${d.imageCount}`);
    ok = false;
  }
  if (files.length < 5) {
    console.error(`${d.slug}: only ${files.length} image files on disk`);
    ok = false;
  }
  if (d.paragraphCount < 1) {
    console.error(`${d.slug}: no overview paragraphs imported`);
    ok = false;
  }
  if (!existsSync(page)) {
    console.error(`${d.slug}: missing page ${page}`);
    ok = false;
  }
}

console.log(`Checked ${manifest.destinations.length} destinations.`);
if (ok) {
  console.log('All import checks passed.');
  process.exit(0);
}
process.exit(1);
