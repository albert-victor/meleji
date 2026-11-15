export const BASE = 'https://www.tanzaniatourism.com';

export function decodeHtml(s) {
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

export function stripHtml(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

export function extractParagraphsFromBody(bodyHtml) {
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

export function extractOverviewParagraphs(html) {
  const overviewMatch = html.match(
    /id="overview"[\s\S]*?class="[^"]*ee-body[^"]*">([\s\S]*?)<\/div>\s*(?:<div class="accordion__button">|<\/div>\s*<\/div>)/i,
  );
  if (!overviewMatch) {
    const fallback = html.match(/id="overview"[\s\S]*?class="[^"]*ee-body[^"]*">([\s\S]*?)<\/div>/i);
    if (!fallback) return [];
    return extractParagraphsFromBody(fallback[1]);
  }
  return extractParagraphsFromBody(overviewMatch[1]);
}

export function extractPackageActivities(html) {
  const acts = [];
  const block = html.match(
    /<h3 class="text-22 fw-500 mt-30">\s*Activities\s*<\/h3>([\s\S]*?)<div class="border-top-light mt-40/i,
  );
  if (block) {
    const re = /class="text-15 ml-10">([^<]+)</gi;
    let m;
    while ((m = re.exec(block[1]))) {
      const label = decodeHtml(m[1].trim());
      if (label && !acts.includes(label)) acts.push(label);
    }
  }
  const legacy = html.match(/id="experiences"[\s\S]*?<\/section>/i);
  if (legacy) {
    const re = /<h4 class="text-dark-1 text-15[^"]*">([^<]+)<\/h4>/gi;
    let m;
    while ((m = re.exec(legacy[0]))) {
      const label = decodeHtml(m[1].trim());
      if (label && !acts.includes(label)) acts.push(label);
    }
  }
  return acts;
}

export function extractTourSnapshot(html) {
  const snap = { duration: '', safariType: '', tailorMade: '', region: 'Northern Circuit' };
  const duration = html.match(/Duration:\s*<br>\s*([^<]+)/i);
  if (duration) snap.duration = decodeHtml(duration[1].trim());
  const type = html.match(/Safari Type\s*<br>\s*([^<]+)/i);
  if (type) snap.safariType = decodeHtml(type[1].trim());
  const tailor = html.match(/Can be Tailor-made:\s*<br>\s*([^<]+)/i);
  if (tailor) snap.tailorMade = decodeHtml(tailor[1].trim());
  const circuit = html.match(/Northern Circuit[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i);
  if (circuit) snap.region = 'Northern Circuit';
  return snap;
}

export function extractItineraryDays(html) {
  const days = [];
  if (!html.includes('id="itinerary"')) return days;
  const section = html.match(/id="itinerary"[\s\S]*?(?=<div class="col-xl-4">|<section class="layout-pb)/i);
  if (!section) return days;

  const chunks = section[0].split(/accordion__item/);
  for (const chunk of chunks) {
    const dayNum = chunk.match(/>\s*Day\s*(\d+)\s*</i);
    const title = chunk.match(/text-18 lh-15 fw-500">([^<]+)</);
  const bodyMatch = chunk.match(/class="[^"]*ee-body[^"]*">([\s\S]*?)<\/div>/i);
    if (!dayNum || !title) continue;
    const body = bodyMatch ? extractParagraphsFromBody(bodyMatch[1]).join('\n\n') : '';
    days.push({
      day: Number(dayNum[1]),
      title: decodeHtml(title[1].trim()),
      body: body || stripHtml(bodyMatch?.[1] ?? ''),
    });
  }
  return days.sort((a, b) => a.day - b.day);
}

export function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  if (h1) return decodeHtml(h1[1].trim());
  const t = html.match(/<title>([^<|]+)/);
  return t ? decodeHtml(t[1].trim()) : '';
}

export function extractMetaDescription(html) {
  const m = html.match(/<meta name=['"]description['"] content=['"]([^'"]+)['"]/i);
  return m ? decodeHtml(m[1].trim()) : '';
}

export function extractGalleryUrls(html, max = 6) {
  const urls = new Set();
  const re = /href="(https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"]+\.(?:jpg|jpeg|png|webp))"/gi;
  let m;
  while ((m = re.exec(html))) urls.add(m[1]);
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i);
  if (og) urls.add(og[1]);
  return [...urls].slice(0, max);
}

export function titleFromImageUrl(url) {
  const base = url.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'photo';
  return decodeHtml(base.replace(/_/g, ' '));
}

export function summaryFrom(paragraphs, meta, max = 200) {
  const base = paragraphs[0] ?? meta ?? '';
  if (base.length <= max) return base;
  return `${base.slice(0, max - 1).trim()}…`;
}

export function jsString(s) {
  return JSON.stringify(s);
}

export function slugFromSafariUrl(url) {
  return url.replace(/\/$/, '').split('/').pop();
}

export async function downloadImage(url, destFile) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const { writeFile } = await import('node:fs/promises');
  await writeFile(destFile, buf);
}

export function mapDestinationSlugs(text) {
  const slugs = [];
  const rules = [
    [/serengeti/i, 'serengeti-national-park'],
    [/ngorongoro/i, 'ngorongoro-crater'],
    [/manyara/i, 'lake-manyara-national-park'],
    [/tarangire/i, 'tarangire-national-park'],
    [/arusha national/i, 'arusha-national-park'],
    [/kilimanjaro/i, 'mount-kilimanjaro-national-park'],
    [/materuni|chemka|kikuletwa|rundugai|majimoto/i, 'materuni-waterfalls'],
    [/lake chala|chala/i, 'lake-chala'],
    [/lake eyasi|hadzabe|hadza/i, 'lake-eyasi'],
    [/lake natron/i, 'lake-natron'],
    [/meru/i, 'mount-meru'],
  ];
  for (const [re, slug] of rules) {
    if (re.test(text) && !slugs.includes(slug)) slugs.push(slug);
  }
  return slugs;
}
