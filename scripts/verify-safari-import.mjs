import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'src/data/imported/safari-content.manifest.json'), 'utf8'));

const REQUIRED_ACTIVITIES = [
  'coffee',
  'waterfalls',
  'swahili-food',
  'social-impact',
  'hadzabe-tours',
  'great-migration',
];

let ok = true;

if (manifest.packages.length !== 20) {
  console.error(`Expected 20 packages, got ${manifest.packages.length}`);
  ok = false;
}

for (const slug of REQUIRED_ACTIVITIES) {
  if (!manifest.activities.find((a) => a.slug === slug)) {
    console.error(`Missing activity: ${slug}`);
    ok = false;
  }
}

for (const p of manifest.packages) {
  if (p.imageCount < 2) {
    console.error(`${p.slug}: needs ≥2 images`);
    ok = false;
  }
  if (p.itineraryDays < 1) {
    console.error(`${p.slug}: missing itinerary`);
    ok = false;
  }
  const page = join(root, 'pages/safaris/packages', p.slug, 'index.html');
  if (!existsSync(page)) console.error(`Missing page ${page}`), (ok = false);
}

for (const a of manifest.activities) {
  if (a.imageCount < 2 || a.paragraphCount < 1) {
    console.error(`${a.slug}: incomplete content`);
    ok = false;
  }
  const page = join(root, 'pages/safaris/activities', a.slug, 'index.html');
  if (!existsSync(page)) console.error(`Missing activity page ${page}`), (ok = false);
}

console.log(`Packages: ${manifest.packages.length}, activities: ${manifest.activities.length}`);
if (ok) {
  console.log('Safari import checks passed.');
  process.exit(0);
}
process.exit(1);
