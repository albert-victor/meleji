/**
 * One-off import: 15 Northern / Arusha circuit destinations from tanzaniatourism.com
 * Run: node scripts/import-arusha-destinations.mjs
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildInnerPageHtml } from '../src/utils/page-html.js';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const assetsRoot = join(root, 'src', 'assets', 'images', 'destinations');
const dataPath = join(root, 'src', 'data', 'published', 'arusha-destinations.js');
const manifestPath = join(root, 'src', 'data', 'imported', 'arusha-destinations.manifest.json');
const pagesRoot = join(root, 'pages', 'safaris', 'destinations');

const BASE = 'https://www.tanzaniatourism.com';

/** @type {{ slug: string, url: string, displayName?: string }[]} */
const PICKS = [
  { slug: 'arusha-national-park', url: `${BASE}/destination/arusha-national-park` },
  { slug: 'mount-meru', url: `${BASE}/destination/mount-meru` },
  { slug: 'ngorongoro-crater', url: `${BASE}/destination/ngorongoro-crater` },
  { slug: 'ngorongoro-conservation-area', url: `${BASE}/destination/ngorongoro-conservation-area` },
  { slug: 'lake-manyara-national-park', url: `${BASE}/destination/lake-manyara-national-park` },
  { slug: 'tarangire-national-park', url: `${BASE}/destination/tarangire-national-park` },
  { slug: 'serengeti-national-park', url: `${BASE}/destination/serengeti-national-park` },
  { slug: 'lake-eyasi', url: `${BASE}/destination/lake-eyasi`, displayName: 'Lake Eyasi & Hadzabe' },
  { slug: 'olduvai-gorge', url: `${BASE}/destination/olduvai-gorge` },
  { slug: 'lake-natron', url: `${BASE}/destination/lake-natron` },
  { slug: 'ngurdoto-crater', url: `${BASE}/destination/ngurdoto-crater` },
  { slug: 'materuni-waterfalls', url: `${BASE}/destination/materuni-waterfalls` },
  {
    slug: 'kikuletwa-hot-springs',
    url: `${BASE}/destination/rundugai-hot-springs`,
    displayName: 'Kikuletwa Hot Springs (Maji Moto)',
  },
  { slug: 'lake-chala', url: `${BASE}/destination/lake-chala` },
  { slug: 'mount-kilimanjaro-national-park', url: `${BASE}/destination/mount-kilimanjaro-national-park` },
];

function decodeHtml(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, '–')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripHtml(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function extractOverviewParagraphs(html) {
  const overviewMatch = html.match(
    /id="overview"[\s\S]*?class="[^"]*ee-body[^"]*">([\s\S]*?)<\/div>\s*<div class="accordion__button">/i,
  );
  if (!overviewMatch) {
    const fallback = html.match(/id="overview"[\s\S]*?class="[^"]*ee-body[^"]*">([\s\S]*?)<\/div>/i);
    if (!fallback) return [];
    return extractParagraphsFromBody(fallback[1]);
  }
  return extractParagraphsFromBody(overviewMatch[1]);
}

function extractParagraphsFromBody(bodyHtml) {
  const parts = [];
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(bodyHtml))) {
    const text = stripHtml(m[1]);
    if (text.length > 40) parts.push(text);
  }
  if (parts.length === 0) {
    const plain = stripHtml(bodyHtml);
    if (plain.length > 40) parts.push(plain);
  }
  return parts;
}

function extractActivities(html) {
  const section = html.match(/id="experiences"[\s\S]*?<\/section>/i);
  if (!section) return [];
  const acts = [];
  const re = /<h4 class="text-dark-1 text-15[^"]*">([^<]+)<\/h4>/gi;
  let m;
  while ((m = re.exec(section[0]))) {
    const label = decodeHtml(m[1].trim());
    if (label && !acts.includes(label)) acts.push(label);
  }
  return acts;
}

function extractMetaFacts(html) {
  const facts = { category: '', size: '', regionLabel: 'Northern Circuit, Arusha' };
  const block = html.match(/<div class="d-flex ds-inl items-center text-15 text-light-1">([\s\S]*?)<\/div>/i);
  if (!block) return facts;

  const text = stripHtml(block[1]).replace(/\s+/g, ' ').trim();
  const regionMatch = text.match(/(Northern Circuit[^]*?)$/i);
  if (regionMatch) facts.regionLabel = regionMatch[1].trim();

  const beforeRegion = regionMatch ? text.slice(0, regionMatch.index).trim() : text;

  const sizePatterns = [
    /[\d.,]+\s*km²\s*\([^)]+\)/i,
    /[\d.,]+\s*km²/i,
    /[\d.,]+\s*km long and [\d.,]+\s*m deep/i,
    /[\d.,]+\s*m\s*↓/i,
    /[\d.,]+\s*m\b/i,
  ];
  for (const re of sizePatterns) {
    const m = beforeRegion.match(re);
    if (m) {
      facts.size = m[0].trim();
      break;
    }
  }

  let categoryPart = beforeRegion;
  if (facts.size) categoryPart = categoryPart.replace(facts.size, '').trim();
  facts.category = categoryPart.replace(/\s+/g, ' ').trim();
  return facts;
}

function extractTitle(html) {
  const h3 = html.match(/<h3 class="text-25[^"]*">([^<]+)<\/h3>/);
  if (h3) return decodeHtml(h3[1].trim());
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1) return decodeHtml(h1[1].trim());
  return '';
}

function extractMetaDescription(html) {
  const m = html.match(/<meta name=['"]description['"] content=['"]([^'"]+)['"]/i);
  return m ? decodeHtml(m[1].trim()) : '';
}

function extractOgImage(html) {
  const m = html.match(/<meta property="og:image" content="([^"]+)"/i);
  return m ? m[1] : '';
}

function extractGalleryUrls(html) {
  const urls = new Set();
  const re = /href="(https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi;
  let m;
  while ((m = re.exec(html))) {
    urls.add(m[1]);
  }
  const og = extractOgImage(html);
  if (og) urls.add(og);
  return [...urls];
}

function titleFromImageUrl(url) {
  const base = url.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'destination';
  return decodeHtml(base.replace(/_/g, ' '));
}

async function downloadImage(url, destFile) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(destFile, buf);
}

function summaryFrom(paragraphs, meta, max = 220) {
  const base = paragraphs[0] ?? meta ?? '';
  if (base.length <= max) return base;
  return `${base.slice(0, max - 1).trim()}…`;
}

function jsString(s) {
  return JSON.stringify(s);
}

const PAGE_TEMPLATE = (slug, name) =>
  buildInnerPageHtml({
    title: `${name} | Meleji Homestays`,
    description: `${name} – Northern Tanzania destination guide.`,
    page: 'destination-detail',
    slug,
    footer: 'compact',
  });

async function main() {
  const manifest = { importedAt: new Date().toISOString(), destinations: [] };
  const jsRecords = [];

  for (const pick of PICKS) {
    console.log(`Fetching ${pick.slug}…`);
    const res = await fetch(pick.url);
    if (!res.ok) throw new Error(`Failed ${pick.url}: ${res.status}`);
    const html = await res.text();

    const name = pick.displayName ?? extractTitle(html) ?? pick.slug;
    const meta = extractMetaDescription(html);
    const paragraphs = extractOverviewParagraphs(html);
    const activities = extractActivities(html);
    const facts = extractMetaFacts(html);
    const galleryUrls = extractGalleryUrls(html).slice(0, 6);

    const slugDir = join(assetsRoot, pick.slug);
    await mkdir(slugDir, { recursive: true });

    /** @type {{ file: string, alt: string, importPath: string }[]} */
    const images = [];
    let i = 0;
    for (const url of galleryUrls) {
      i += 1;
      const ext = url.match(/\.(jpe?g|png|webp)$/i)?.[1]?.replace('jpeg', 'jpg') ?? 'jpg';
      const fileName = `${String(i).padStart(2, '0')}.${ext}`;
      const destFile = join(slugDir, fileName);
      try {
        if (!existsSync(destFile)) await downloadImage(url, destFile);
        images.push({
          file: fileName,
          alt: `${name} – ${titleFromImageUrl(url)}`,
          importPath: `../../assets/images/destinations/${pick.slug}/${fileName}`,
        });
      } catch (err) {
        console.warn(`  Image skip: ${url} (${err.message})`);
      }
    }

    if (images.length === 0) {
      throw new Error(`No images saved for ${pick.slug}`);
    }

    const summary = summaryFrom(paragraphs, meta);
    const longDescription = paragraphs.length ? paragraphs.join('\n\n') : meta;
    const context = paragraphs.length ? paragraphs : [longDescription];

    manifest.destinations.push({
      slug: pick.slug,
      name,
      imageCount: images.length,
      activityCount: activities.length,
      paragraphCount: paragraphs.length,
      category: facts.category,
      size: facts.size,
    });

    const importLines = images.map((img, idx) => {
      const varName = `${pick.slug.replace(/-/g, '_')}_${idx + 1}`;
      return { varName, ...img };
    });

    const galleryJs = importLines
      .map(
        (img) =>
          `      { src: ${img.varName}, alt: ${jsString(img.alt)} },`,
      )
      .join('\n');

    const imports = importLines
      .map((img) => `import ${img.varName} from '${img.importPath}';`)
      .join('\n');

    const activitiesJs =
      activities.length > 0
        ? `    activities: [\n${activities.map((a) => `      ${jsString(a)},`).join('\n')}\n    ],`
        : '';

    const record = `
  {
    id: ${jsString(pick.slug)},
    status: 'published',
    name: ${jsString(name)},
    slug: ${jsString(pick.slug)},
    region: ${jsString(facts.regionLabel || 'Northern Circuit, Arusha')},
    category: ${jsString(facts.category)},
    sizeLabel: ${jsString(facts.size)},
    summary: ${jsString(summary)},
    longDescription: ${jsString(longDescription)},
    context: [
${context.map((p) => `      ${jsString(p)},`).join('\n')}
    ],
${activitiesJs}
    imageSrc: ${importLines[0].varName},
    landscapeSrc: ${importLines[Math.min(1, importLines.length - 1)].varName},
    imageAlt: ${jsString(images[0].alt)},
    gallery: [
${galleryJs}
    ],
    href: ${jsString(`/pages/safaris/destinations/${pick.slug}/`)},
  },`;

    jsRecords.push({ imports, record, slug: pick.slug, name });

    const pageDir = join(pagesRoot, pick.slug);
    await mkdir(pageDir, { recursive: true });
    const safeName = name.replace(/"/g, '&quot;');
    await writeFile(join(pageDir, 'index.html'), PAGE_TEMPLATE(pick.slug, safeName), 'utf8');
  }

  await mkdir(dirname(manifestPath), { recursive: true });
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

  const fileBody = `/**
 * Arusha / Northern Circuit destinations – imported from Tanzania Tourism.
 * Generated by scripts/import-arusha-destinations.mjs – re-run script to refresh.
 */
${jsRecords.map((r) => r.imports).join('\n')}

export const arushaDestinations = [${jsRecords.map((r) => r.record).join('')}
];
`;

  await writeFile(dataPath, fileBody, 'utf8');
  console.log(`\nWrote ${jsRecords.length} destinations → ${dataPath}`);
  console.log(`Manifest → ${manifestPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
