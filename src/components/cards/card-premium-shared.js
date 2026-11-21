import { escapeHtml } from '../../utils/html.js';
import { packageDurationTag } from './package-display.js';

/**
 * @param {import('../../data/types.js').DestinationItem} item
 * @returns {string[]}
 */
export function destinationImageTags(item) {
  const tags = [];
  const cat = `${item.category ?? ''} ${item.name}`;
  const slug = item.slug ?? '';

  if (/national park|crater|conservation|serengeti|tarangire|manyara/i.test(cat)) {
    tags.push('Safari tours');
  } else if (/waterfall|springs|lake-chala|materuni|meru|kikuletwa/i.test(slug)) {
    tags.push('Day trips');
  } else if (/eyasi|hadzabe|olduvai/i.test(slug)) {
    tags.push('Culture');
  } else {
    tags.push('Arusha region');
  }

  if (item.activities?.some((a) => /game|wildlife|migration/i.test(a))) {
    tags.push('Wildlife');
  } else if (item.activities?.some((a) => /walk|hike|waterfall/i.test(a))) {
    tags.push('Outdoors');
  } else if (tags[0] === 'Day trips') {
    tags.push('Local tours');
  } else if (tags[0] === 'Culture') {
    tags.push('Community');
  }

  return [...new Set(tags)].slice(0, 2);
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationCardSubheading(item) {
  if (item.category) return item.category;
  const part = item.region?.split(',')[0]?.trim();
  return part || 'Northern Tanzania';
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
const DESTINATION_CHIP_ICONS = {
  'Safari tours': 'fa-binoculars',
  Wildlife: 'fa-paw',
  'Day trips': 'fa-sun',
  Outdoors: 'fa-person-hiking',
  Culture: 'fa-users',
  'Local tours': 'fa-route',
  Community: 'fa-hand-holding-heart',
  Photography: 'fa-camera',
};

/**
 * Editorial one-liner (reference-style kicker) – not a factual claim beyond region/park type.
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationEditorialKicker(item) {
  const slug = item.slug ?? '';
  const kickers = {
    'tarangire-national-park': 'The Land of Giants',
    'ngorongoro-crater': 'A World Within a Crater',
    'mount-kilimanjaro-national-park': 'Beyond the Horizon',
    'serengeti-national-park': 'Where the Wild Begins',
    'lake-manyara-national-park': 'Forest, Lake, and Sky',
    'arusha-national-park': 'Meru at Your Doorstep',
    'ngorongoro-conservation-area': 'Highlands and Heritage',
    'materuni-waterfalls': 'Where Nature Flows',
    'lake-chala': 'The Hidden Blue Escape',
    'lake-natron': 'The Land of Flames',
    'lake-eyasi': 'Valley of Culture',
    'olduvai-gorge': 'Cradle of Humankind',
    'kikuletwa-hot-springs': 'Warm Springs Retreat',
    'mount-meru': 'Skyline Above Arusha',
  };
  if (kickers[slug]) return kickers[slug];
  if (item.category) return item.category;
  return destinationCardSubheading(item);
}

/**
 * Short category label on destination imagery.
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationCategoryLabel(item) {
  if (item.category?.trim()) return item.category.trim();
  const n = `${item.name} ${item.slug}`.toLowerCase();
  if (/national park/.test(n)) return 'National Park';
  if (/crater|conservation area/.test(n)) return 'Crater & Wildlife';
  if (/kilimanjaro|meru/.test(n)) return 'Mountain Adventure';
  if (/waterfall|hot spring|lake chala|lake natron|lake duluti|chemka/.test(n)) return 'Natural Wonder';
  if (/olduvai|eyasi|hadzabe/.test(n)) return 'Cultural Escape';
  return 'Northern Tanzania';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageCategoryLabel(item) {
  const type = item.safariType?.trim();
  if (type && !/^adventure/i.test(type) && type.length <= 22 && !/,/.test(type)) return type;
  const name = item.name.toLowerCase();
  const duration = `${item.durationLabel ?? ''}`.toLowerCase();
  if (/city tour|market|coffee|swahili|cultural/.test(name)) return 'Cultural Journey';
  if (/day trip|day hike|half day|full day/.test(name) || /day trip/.test(duration)) return 'Day Safari';
  if (/kilimanjaro|meru|trek|hike|waterfall/.test(name)) return 'Nature Escape';
  if (item.region && /northern/i.test(item.region)) return 'Northern Circuit';
  return 'Wildlife Safari';
}

/**
 * One-line italic tagline for package cards (tone matched per route where possible).
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageEditorialTagline(item) {
  const slug = item.slug ?? '';
  const bySlug = {
    '5-days-tarangire-serengeti-ngorongoro-lake-manyara-safari': 'Into Tanzania\'s wilderness',
    '4-days-to-serengeti-national-park-and-ngorongoro-crater': 'Where the wild begins',
    '3-days-to-ngorongoro-crater-tarangire-lake-manyara-national-parks': 'A journey through the northern circuit',
    '6-days-tarangire-serengeti-and-ngorongoro-crater-safari': 'Beyond the horizon',
    'day-trip-to-tarangire-national-park': 'The land of giants',
    'day-trip-to-ngorongoro-crater': 'A world within a crater',
    'arusha-city-tour': 'Arusha at street level',
    'arusha-local-markets-tour': 'Markets, colour, and everyday rhythm',
    'day-trip-to-materuni-waterfalls-and-coffee-tour': 'Where nature flows',
  };
  if (bySlug[slug]) return bySlug[slug];
  if (/kilimanjaro|meru|trek|hike/i.test(item.name)) return 'Steps toward the summit';
  if (/day trip|day hike/i.test(item.name)) return 'A focused day in the north';
  if (item.destinationSlugs?.length > 2) return 'A journey through the northern circuit';
  return 'Curated days with the Meleji team';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packagePriceLine(item) {
  if (item.availabilityNote && /\$|USD|TZS|price/i.test(item.availabilityNote)) {
    return item.availabilityNote.trim();
  }
  return 'Price on request';
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationPolaroidSrc(item) {
  return item.gallery?.[1]?.src ?? item.landscapeSrc ?? item.gallery?.[0]?.src ?? item.imageSrc;
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationPolaroidAlt(item) {
  return item.gallery?.[1]?.alt ?? item.imageAlt;
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationFeatureChips(item) {
  const tags = destinationImageTags(item);
  const chips = [...tags];
  if (/national park|serengeti|tarangire|manyara/i.test(`${item.name} ${item.slug}`) && !chips.includes('Photography')) {
    chips.push('Photography');
  }
  return chips.slice(0, 3).map((label) => ({
    label,
    icon: DESTINATION_CHIP_ICONS[label] ?? 'fa-location-dot',
  }));
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 * @returns {string[]}
 */
export function destinationMediaTagLabels(item) {
  const fromActivities = (item.activities ?? []).slice(0, 3).filter(Boolean);
  if (fromActivities.length) return fromActivities;
  return destinationFeatureChips(item).map((c) => c.label);
}

/** Stacked activity pills overlaid on the destination image. */
export function destinationCardSubtitle(item) {
  if (item.category?.trim()) return item.category.trim();
  return destinationCategoryLabel(item);
}

/** One primary activity pill on the image (upper stack). */
export function renderDestinationMediaTags(item) {
  const labels = destinationMediaTagLabels(item).slice(0, 1);
  if (!labels.length) return '';
  return `<div class="csp-card__media-tags" aria-label="Highlight">${labels
    .map((label) => `<span>${escapeHtml(label)}</span>`)
    .join('')}</div>`;
}

/** Tiny thumb hint that more photos exist on the detail page. */
export function renderDestinationPhotoHint(thumbSrc) {
  if (!thumbSrc) return '';
  return `
    <span class="csp-card__photo-hint" title="More photos on destination page" aria-hidden="true">
      <img src="${escapeHtml(thumbSrc)}" alt="" width="40" height="54" loading="lazy" decoding="async" />
      <span class="csp-card__photo-hint-mark">+</span>
    </span>`;
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 * @param {number} [index]
 */
export function destinationCardCtaVariant(item, index = 0) {
  const n = index || [...(item.slug ?? '')].reduce((a, c) => a + c.charCodeAt(0), 0);
  return n % 2 === 1 ? 'alt' : 'primary';
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 * @param {number} [index]
 */
export function destinationCardCtaLabel(item, index = 0) {
  const variant = destinationCardCtaVariant(item, index);
  if (variant === 'alt') return 'Discover more';
  if (/waterfall|lake chala|materuni/i.test(item.slug ?? '')) return 'Plan your visit';
  return 'Explore destination';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 * @param {number} [index]
 */
export function packageCardCtaLabel(item, index = 0) {
  const name = item.name.toLowerCase();
  if (/trek|hike|kilimanjaro|meru|machame|marangu/i.test(name)) return 'View your trek';
  if (/city tour|market/i.test(name)) return 'View city tour';
  const n = index || [...(item.slug ?? '')].reduce((a, c) => a + c.charCodeAt(0), 0);
  const labels = ['View itinerary', 'View package', 'Explore route'];
  return labels[n % labels.length];
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 * @param {number} [index]
 */
export function packageCardCtaVariant(item, index = 0) {
  const n = index || [...(item.slug ?? '')].reduce((a, c) => a + c.charCodeAt(0), 0);
  return n % 3 === 1 ? 'olive' : n % 3 === 2 ? 'outline' : 'primary';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packagePrimaryActivityLine(item) {
  const act = item.activities?.[0];
  if (act) return act;
  const day = item.itinerary?.[0]?.title;
  if (day) return day;
  return '';
}

/**
 * Price row for cards – request pricing unless a verified amount is already published.
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
const PACKAGE_PROMO_SLUGS = new Set([
  '5-days-tarangire-serengeti-ngorongoro-lake-manyara-safari',
  '3-days-to-ngorongoro-crater-tarangire-lake-manyara-national-parks',
  'day-trip-to-tarangire-national-park',
  'day-trip-to-materuni-waterfalls-and-coffee-tour',
  'arusha-city-tour',
]);

export function packageShowsEnquiryPromo(item) {
  return PACKAGE_PROMO_SLUGS.has(item.slug ?? '');
}

/**
 * Price row for cards – request pricing unless a verified amount is already published.
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function renderPackagePriceBlock(item) {
  const verified =
    item.availabilityNote && /\$|USD|TZS/i.test(item.availabilityNote)
      ? item.availabilityNote.trim()
      : null;
  if (verified) {
    return `<p class="csp-card__price-row"><span class="csp-card__price-mark" aria-hidden="true">$</span><span class="csp-card__price-text">${escapeHtml(verified)}</span></p>`;
  }
  const promo = packageShowsEnquiryPromo(item)
    ? `<span class="csp-card__offer-tag">Seasonal enquiry rate</span>`
    : '';
  return `
    <p class="csp-card__price-row">
      <span class="csp-card__price-mark" aria-hidden="true">$</span>
      <span class="csp-card__price-text">Price on request</span>
    </p>${promo}`;
}

const CARD_HEART_MARKUP = `<span class="csp-card__fav-icon" aria-hidden="true"><i class="fa-solid fa-heart" aria-hidden="true"></i></span>`;

/** Decorative heart (no persistence until a real favourites flow exists). */
export function renderCardHeartIcon() {
  return CARD_HEART_MARKUP;
}

/**
 * @param {{ src: string, alt?: string }[]} images
 */
export function renderCardGalleryRail(images) {
  if (!images || images.length < 2) return '';
  return `
    <div class="csp-card__gallery-rail" role="tablist" aria-label="Preview photos">
      ${images
        .slice(0, 3)
        .map(
          (img, index) => `
        <button
          type="button"
          class="csp-card__gallery-thumb"
          role="tab"
          aria-selected="${index === 0 ? 'true' : 'false'}"
          data-csp-thumb
          data-src="${escapeHtml(img.src)}"
          data-alt="${escapeHtml(img.alt ?? '')}"
        >
          <img src="${escapeHtml(img.src)}" alt="" width="72" height="54" loading="lazy" decoding="async" />
        </button>`,
        )
        .join('')}
    </div>`;
}

/**
 * @param {import('../../data/types.js').DestinationItem} item
 */
export function destinationGalleryImages(item) {
  const images = [{ src: item.imageSrc, alt: item.imageAlt }];
  for (const g of item.gallery ?? []) {
    if (g.src && g.src !== item.imageSrc) images.push({ src: g.src, alt: g.alt });
    if (images.length >= 3) break;
  }
  return images;
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageGalleryImages(item) {
  const images = [{ src: item.imageSrc, alt: item.imageAlt }];
  for (const g of item.gallery ?? []) {
    if (g.src && g.src !== item.imageSrc) images.push({ src: g.src, alt: g.alt });
    if (images.length >= 3) break;
  }
  return images;
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageImageChipLabels(item) {
  const chips = [];
  if (item.region) {
    const short = item.region.replace(/Northern Circuit/i, 'Northern Tanzania').split(',')[0].trim();
    if (short) chips.push(short);
  }
  for (const act of item.activities ?? []) {
    if (chips.length >= 2) break;
    if (!chips.includes(act)) chips.push(act);
  }
  return chips.slice(0, 2);
}

export function renderDestinationImageTags(item) {
  const tags = destinationImageTags(item);
  if (!tags.length) return '';
  return `<div class="csp-card__tags">${tags.map((t) => `<span class="csp-card__tag">${escapeHtml(t)}</span>`).join('')}</div>`;
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function formatPackageDurationBadge(item) {
  if (item.durationLabel) {
    const nights = item.durationLabel.match(/(\d+)\s*Night/i);
    const days = item.durationLabel.match(/(\d+)\s*Day/i);
    if (days && nights) {
      const n = nights[1];
      const nightLabel = n === '1' ? 'Night' : 'Nights';
      return `${days[1]} Days / ${n} ${nightLabel}`;
    }
    if (/day trip/i.test(item.durationLabel)) return 'Full Day';
    if (/half day/i.test(item.durationLabel)) return 'Half Day';
    return item.durationLabel;
  }
  const tag = packageDurationTag(item);
  return tag || '';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageCardSubheading(item) {
  if (item.region) return `Routes rooted in ${item.region.replace(/Northern Circuit/i, 'the northern circuit')}.`;
  return 'Meaningful days arranged with the Meleji team.';
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageFavBadgeLabel(item) {
  if (item.safariType && !/adventure/i.test(item.safariType)) return item.safariType;
  if (/day trip|day hike/i.test(item.name)) return 'A day-trip favourite';
  return 'A safari favourite';
}
