/**
 * Import 20 safari packages + 9 safari activities from tanzaniatourism.com
 * Run: node scripts/import-safari-content.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BASE,
  decodeHtml,
  downloadImage,
  extractGalleryUrls,
  extractItineraryDays,
  extractMetaDescription,
  extractOverviewParagraphs,
  extractPackageActivities,
  extractTitle,
  extractTourSnapshot,
  jsString,
  mapDestinationSlugs,
  slugFromSafariUrl,
  summaryFrom,
  titleFromImageUrl,
  stripHtml,
  extractParagraphsFromBody,
} from './tanzania-tourism-shared.mjs';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const pkgAssets = join(root, 'src', 'assets', 'images', 'safari-packages');
const actAssets = join(root, 'src', 'assets', 'images', 'safari-activities');
const pkgDataPath = join(root, 'src', 'data', 'published', 'imported-safari-packages.js');
const actDataPath = join(root, 'src', 'data', 'published', 'imported-safari-activities.js');
const manifestPath = join(root, 'src', 'data', 'imported', 'safari-content.manifest.json');
const pkgPages = join(root, 'pages', 'safaris', 'packages');
const actPages = join(root, 'pages', 'safaris', 'activities');

/** @type {{ url: string, slug?: string }[]} */
const PACKAGE_URLS = [
  { url: `${BASE}/safari/3-days-to-ngorongoro-crater-tarangire-lake-manyara-national-parks` },
  { url: `${BASE}/safari/2-days-to-lake-manyara-national-park-ngorongoro-crater` },
  { url: `${BASE}/safari/4-days-to-serengeti-national-park-and-ngorongoro-crater` },
  { url: `${BASE}/safari/5-days-serengeti-and-ngorongoro-crater-safari` },
  { url: `${BASE}/safari/5-days-tarangire-serengeti-ngorongoro-lake-manyara-safari` },
  { url: `${BASE}/safari/6-days-ngorongoro-crater-serengeti-and-lake-manyara-safari` },
  { url: `${BASE}/safari/6-days-tarangire-serengeti-and-ngorongoro-crater-safari` },
  { url: `${BASE}/safari/7-days-manyara-serengeti-ngorongoro-crater-and-tarangire-safari` },
  { url: `${BASE}/safari/day-trip-to-arusha-national-park` },
  { url: `${BASE}/safari/day-trip-to-lake-manyara-national-park` },
  { url: `${BASE}/safari/day-trip-to-materuni-waterfalls-and-coffee-tour` },
  { url: `${BASE}/safari/day-trip-to-lake-chala` },
  { url: `${BASE}/safari/day-trip-to-chemka-hot-springs` },
  { url: `${BASE}/safari/day-trip-to-lake-duluti` },
  { url: `${BASE}/safari/day-trip-to-lake-natron` },
  { url: `${BASE}/safari/3-days-safari-to-serengeti-and-ngorongoro-crater` },
  { url: `${BASE}/safari/4-days-kilimanjaro-trek-via-machame-route` },
  { url: `${BASE}/safari/day-hike-mount-kilimanjaro-via-marangu-route` },
  { url: `${BASE}/safari/day-trip-to-mount-meru-waterfalls-hike` },
  { url: `${BASE}/safari/day-trip-to-tarangire-national-park` },
];

/**
 * Activities: flagship safari or destination source per theme.
 * @type {{ slug: string, name: string, icon: string, url: string, kind: 'safari'|'destination' }}[]
 */
const ACTIVITY_PICKS = [
  { slug: 'coffee', name: 'Coffee experiences', icon: 'fa-mug-hot', url: `${BASE}/safari/day-trip-to-materuni-waterfalls-and-coffee-tour`, kind: 'safari' },
  { slug: 'waterfalls', name: 'Waterfalls & forest walks', icon: 'fa-person-hiking', url: `${BASE}/safari/day-trip-to-mount-meru-waterfalls-hike`, kind: 'safari' },
  {
    slug: 'swahili-food',
    name: 'Swahili food & village meals',
    icon: 'fa-utensils',
    url: `${BASE}/safari/5-days-tarangire-serengeti-ngorongoro-lake-manyara-safari`,
    kind: 'safari',
  },
  {
    slug: 'social-impact',
    name: 'Social impact & cultural tourism',
    icon: 'fa-hand-holding-heart',
    url: `${BASE}/safari/day-trip-to-lake-duluti`,
    kind: 'safari',
  },
  {
    slug: 'hadzabe-tours',
    name: 'Hadzabe cultural tours',
    icon: 'fa-people-group',
    url: `${BASE}/destination/lake-eyasi`,
    kind: 'destination',
  },
  {
    slug: 'great-migration',
    name: 'Great Migration safaris',
    icon: 'fa-binoculars',
    url: `${BASE}/safari/7-days-manyara-serengeti-ngorongoro-crater-and-tarangire-safari`,
    kind: 'safari',
  },
  { slug: 'game-drives', name: 'Game drives & wildlife', icon: 'fa-binoculars', url: `${BASE}/safari/day-trip-to-tarangire-national-park`, kind: 'safari' },
  { slug: 'walking-safaris', name: 'Walking & hiking safaris', icon: 'fa-person-hiking', url: `${BASE}/safari/day-trip-to-arusha-national-park`, kind: 'safari' },
  { slug: 'balloon-safari', name: 'Balloon & aerial safaris', icon: 'fa-plane', url: `${BASE}/safari/5-days-serengeti-and-ngorongoro-crater-safari`, kind: 'safari' },
];

const PAGE_BODY = (dataPage, slug, title, footer = 'compact') => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${title.replace(/"/g, '&quot;')} – Northern Tanzania." />
    <title>${title.replace(/</g, '')} | Meleji Homestays</title>
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body class="page" data-page="${dataPage}" data-footer="${footer}" data-slug="${slug}">
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <main id="main-content" class="page__main" tabindex="-1">
      <div data-inner-mount></div>
    </main>
    <script type="module" src="/src/scripts/main.js"></script>
  </body>
</html>
`;

async function saveImages(urls, slug, assetsDir, imageCount = 3) {
  await mkdir(join(assetsDir, slug), { recursive: true });
  const images = [];
  let i = 0;
  for (const url of urls.slice(0, imageCount)) {
    i += 1;
    const ext = url.match(/\.(jpe?g|png|webp)$/i)?.[1]?.replace('jpeg', 'jpg') ?? 'jpg';
    const fileName = `${String(i).padStart(2, '0')}.${ext}`;
    const destFile = join(assetsDir, slug, fileName);
    try {
      if (!existsSync(destFile)) await downloadImage(url, destFile);
      images.push({
        fileName,
        alt: titleFromImageUrl(url),
        importPath: assetsDir === pkgAssets
          ? `../../assets/images/safari-packages/${slug}/${fileName}`
          : `../../assets/images/safari-activities/${slug}/${fileName}`,
      });
    } catch (err) {
      console.warn(`  image skip ${slug}: ${err.message}`);
    }
  }
  return images;
}

function parseDestinationPage(html, nameOverride) {
  const title = nameOverride ?? extractTitle(html);
  const meta = extractMetaDescription(html);
  const paragraphs = extractOverviewParagraphs(html);
  const activities = extractPackageActivities(html);
  const galleryUrls = extractGalleryUrls(html, 3);
  return { title, meta, paragraphs, activities, galleryUrls, snapshot: { duration: '', safariType: 'Tourist Attractions', tailorMade: 'Yes', region: 'Northern Circuit' } };
}

function parseSafariPage(html) {
  const title = extractTitle(html);
  const meta = extractMetaDescription(html);
  const paragraphs = extractOverviewParagraphs(html);
  const activities = extractPackageActivities(html);
  const itinerary = extractItineraryDays(html);
  const snapshot = extractTourSnapshot(html);
  const galleryUrls = extractGalleryUrls(html, 3);
  return { title, meta, paragraphs, activities, itinerary, snapshot, galleryUrls };
}

function varName(slug, idx) {
  const safe = slug.replace(/-/g, '_').replace(/^(\d)/, 'd$1');
  return `img_${safe}_${idx}`;
}

async function importPackages(manifest) {
  const records = [];

  for (const pick of PACKAGE_URLS) {
    const slug = pick.slug ?? slugFromSafariUrl(pick.url);
    console.log(`Package: ${slug}`);
    const res = await fetch(pick.url);
    if (!res.ok) throw new Error(`${pick.url} → ${res.status}`);
    const html = await res.text();
    const parsed = parseSafariPage(html);
    const images = await saveImages(parsed.galleryUrls, slug, pkgAssets, 3);
    if (images.length === 0) throw new Error(`No images for package ${slug}`);

    const summary = summaryFrom(parsed.paragraphs, parsed.meta);
    const longDescription = parsed.paragraphs.join('\n\n') || parsed.meta;
    const durationLabel = parsed.snapshot.duration || null;
    const destinationSlugs = mapDestinationSlugs(`${parsed.title} ${longDescription} ${parsed.itinerary.map((d) => d.title).join(' ')}`);

    const rowImports = [];
    const imgImports = images.map((img, idx) => {
      const v = varName(slug, idx + 1);
      rowImports.push(`import ${v} from '${img.importPath}';`);
      return { v, ...img };
    });

    const itineraryJs = parsed.itinerary.length
      ? `itinerary: [\n${parsed.itinerary
          .map(
            (day) =>
              `      { day: ${day.day}, title: ${jsString(day.title)}, body: ${jsString(day.body)} },`,
          )
          .join('\n')}\n    ],`
      : `itinerary: [{ day: 1, title: ${jsString('Overview')}, body: ${jsString(longDescription)} }],`;

    const galleryJs = imgImports.map((img) => `      { src: ${img.v}, alt: ${jsString(`${parsed.title} – ${img.alt}`)} },`).join('\n');

    records.push({
      imports: rowImports,
      record: `
  {
    id: ${jsString(slug)},
    status: 'published',
    name: ${jsString(parsed.title)},
    slug: ${jsString(slug)},
    destinationSlugs: [${destinationSlugs.map((s) => jsString(s)).join(', ')}],
    durationLabel: ${durationLabel ? jsString(durationLabel) : 'null'},
    safariType: ${jsString(parsed.snapshot.safariType)},
    tailorMade: ${jsString(parsed.snapshot.tailorMade)},
    region: ${jsString(parsed.snapshot.region)},
    summary: ${jsString(summary)},
    longDescription: ${jsString(longDescription)},
    context: [\n${parsed.paragraphs.map((p) => `      ${jsString(p)},`).join('\n')}\n    ],
    activities: [\n${parsed.activities.map((a) => `      ${jsString(a)},`).join('\n')}\n    ],
    ${itineraryJs}
    imageSrc: ${imgImports[0].v},
    landscapeSrc: ${imgImports[Math.min(1, imgImports.length - 1)].v},
    imageAlt: ${jsString(`${parsed.title} – ${imgImports[0].alt}`)},
    gallery: [\n${galleryJs}\n    ],
    href: ${jsString(`/pages/safaris/packages/${slug}/`)},
    enquiryHref: ${jsString(`/pages/safaris/custom/?package=${slug}`)},
    availabilityNote: 'Itinerary reference – confirm dates and routing with Meleji on enquiry.',
  },`,
    });

    manifest.packages.push({
      slug,
      name: parsed.title,
      imageCount: images.length,
      itineraryDays: Math.max(parsed.itinerary.length, 1),
      activityCount: parsed.activities.length,
      paragraphCount: parsed.paragraphs.length,
    });

    await mkdir(join(pkgPages, slug), { recursive: true });
    await writeFile(join(pkgPages, slug, 'index.html'), PAGE_BODY('package-detail', slug, parsed.title), 'utf8');
  }

  const uniqueImports = [...new Set(records.flatMap((r) => r.imports))].join('\n');
  const body = `/**
 * Safari packages – imported from Tanzania Tourism.
 * Regenerate: node scripts/import-safari-content.mjs
 */
${uniqueImports}

export const importedSafariPackages = [${records.map((r) => r.record).join('')}
];
`;

  await writeFile(pkgDataPath, body, 'utf8');
}

async function importActivities(manifest) {
  const records = [];

  for (const pick of ACTIVITY_PICKS) {
    console.log(`Activity: ${pick.slug}`);
    const res = await fetch(pick.url);
    if (!res.ok) throw new Error(`${pick.url} → ${res.status}`);
    const html = await res.text();

    const parsed =
      pick.kind === 'destination'
        ? parseDestinationPage(html, pick.name)
        : { ...parseSafariPage(html), title: pick.name };

    if (pick.kind === 'safari' && pick.name) parsed.title = pick.name;

    const images = await saveImages(parsed.galleryUrls, pick.slug, actAssets, 3);
    if (images.length === 0) throw new Error(`No images for activity ${pick.slug}`);

    const summary = summaryFrom(parsed.paragraphs, parsed.meta);
    const longDescription = parsed.paragraphs.join('\n\n') || parsed.meta;
    const highlights =
      pick.slug === 'swahili-food'
        ? [
            'Village and market visits where local cooks prepare seasonal dishes.',
            'Meals may be arranged with hosts when you book your stay at Meleji – confirm dietary needs on enquiry.',
          ]
        : pick.slug === 'social-impact'
          ? [
              'Community-led introductions where appropriate and with local consent.',
              'Supports local guides and small enterprises around Arusha and nearby lakes.',
            ]
          : [];

    const rowImports = [];
    const imgImports = images.map((img, idx) => {
      const v = varName(pick.slug, idx + 1);
      rowImports.push(`import ${v} from '${img.importPath}';`);
      return { v, ...img };
    });

    const itinerary = parsed.itinerary?.length
      ? parsed.itinerary
      : [{ day: 1, title: 'Typical experience', body: longDescription }];

    records.push({
      imports: rowImports,
      record: `
  {
    id: ${jsString(pick.slug)},
    status: 'published',
    title: ${jsString(parsed.title)},
    slug: ${jsString(pick.slug)},
    icon: ${jsString(pick.icon)},
    summary: ${jsString(summary)},
    longDescription: ${jsString(longDescription)},
    context: [\n${parsed.paragraphs.map((p) => `      ${jsString(p)},`).join('\n')}\n    ],
    highlights: [\n${highlights.map((h) => `      ${jsString(h)},`).join('\n')}\n    ],
    relatedActivities: [\n${parsed.activities.map((a) => `      ${jsString(a)},`).join('\n')}\n    ],
    itinerarySample: [\n${itinerary
      .slice(0, 4)
      .map((day) => `      { day: ${day.day}, title: ${jsString(day.title)}, body: ${jsString(day.body)} },`)
      .join('\n')}\n    ],
    imageSrc: ${imgImports[0].v},
    landscapeSrc: ${imgImports[Math.min(1, imgImports.length - 1)].v},
    imageAlt: ${jsString(`${parsed.title} – ${imgImports[0].alt}`)},
    gallery: [\n${imgImports.map((img) => `      { src: ${img.v}, alt: ${jsString(`${parsed.title} – ${img.alt}`)} },`).join('\n')}\n    ],
    href: ${jsString(`/pages/safaris/activities/${pick.slug}/`)},
    enquiryHref: ${jsString(`/pages/safaris/custom/?activity=${pick.slug}`)},
  },`,
    });

    manifest.activities.push({
      slug: pick.slug,
      title: parsed.title,
      imageCount: images.length,
      paragraphCount: parsed.paragraphs.length,
    });

    await mkdir(join(actPages, pick.slug), { recursive: true });
    await writeFile(join(actPages, pick.slug, 'index.html'), PAGE_BODY('safari-activity-detail', pick.slug, parsed.title), 'utf8');
  }

  const uniqueImports = [...new Set(records.flatMap((r) => r.imports))].join('\n');
  const body = `/**
 * Safari activities – imported from Tanzania Tourism.
 * Regenerate: node scripts/import-safari-content.mjs
 */
${uniqueImports}

export const importedSafariActivities = [${records.map((r) => r.record).join('')}
];
`;

  await writeFile(actDataPath, body, 'utf8');
}

async function main() {
  const manifest = { importedAt: new Date().toISOString(), packages: [], activities: [] };
  await mkdir(pkgAssets, { recursive: true });
  await mkdir(actAssets, { recursive: true });
  await mkdir(join(actPages), { recursive: true });

  await writeFile(join(actPages, 'index.html'), PAGE_BODY('safari-activities', '', 'Safari activities', 'full'), 'utf8');

  await importPackages(manifest);
  await importActivities(manifest);

  await mkdir(dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`\n${manifest.packages.length} packages, ${manifest.activities.length} activities imported.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
