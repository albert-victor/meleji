/**
 * Editorial planning links between destinations, activities, and routes from Arusha.
 * Drive times and prices are confirmed on enquiry – no fixed durations here.
 */

/** @type {Record<string, string[]>} */
export const nearbyDestinationSlugs = {
  'arusha-national-park': ['ngurdoto-crater', 'mount-meru', 'lake-manyara-national-park', 'tarangire-national-park'],
  'ngurdoto-crater': ['arusha-national-park', 'mount-meru', 'lake-manyara-national-park'],
  'mount-meru': ['arusha-national-park', 'ngurdoto-crater', 'materuni-waterfalls'],
  'lake-manyara-national-park': ['ngorongoro-crater', 'tarangire-national-park', 'arusha-national-park'],
  'tarangire-national-park': ['lake-manyara-national-park', 'ngorongoro-crater', 'serengeti-national-park'],
  'ngorongoro-crater': ['ngorongoro-conservation-area', 'lake-manyara-national-park', 'serengeti-national-park'],
  'ngorongoro-conservation-area': ['ngorongoro-crater', 'olduvai-gorge', 'serengeti-national-park'],
  'serengeti-national-park': ['ngorongoro-crater', 'tarangire-national-park', 'olduvai-gorge'],
  'olduvai-gorge': ['ngorongoro-conservation-area', 'serengeti-national-park', 'lake-eyasi'],
  'lake-eyasi': ['lake-manyara-national-park', 'ngorongoro-crater', 'olduvai-gorge'],
  'lake-natron': ['mount-kilimanjaro-national-park', 'serengeti-national-park', 'ngorongoro-conservation-area'],
  'materuni-waterfalls': ['mount-meru', 'kikuletwa-hot-springs', 'mount-kilimanjaro-national-park'],
  'kikuletwa-hot-springs': ['materuni-waterfalls', 'lake-chala', 'mount-kilimanjaro-national-park'],
  'lake-chala': ['kikuletwa-hot-springs', 'mount-kilimanjaro-national-park', 'tarangire-national-park'],
  'mount-kilimanjaro-national-park': ['materuni-waterfalls', 'mount-meru', 'lake-chala'],
};

/**
 * Meleji team route-fit score (1–5) for planning – not guest review data.
 * @type {Record<string, number>}
 */
export const editorialRouteFit = {
  'serengeti-national-park': 5,
  'ngorongoro-crater': 5,
  'ngorongoro-conservation-area': 5,
  'tarangire-national-park': 5,
  'lake-manyara-national-park': 5,
  'arusha-national-park': 4,
  'mount-meru': 4,
  'mount-kilimanjaro-national-park': 5,
  'lake-eyasi': 4,
  'olduvai-gorge': 4,
  'materuni-waterfalls': 4,
  'kikuletwa-hot-springs': 4,
  'lake-chala': 4,
  'lake-natron': 3,
  'ngurdoto-crater': 3,
};

/** Map Tanzania Tourism activity labels to safari activity page slugs. */
const activityLabelMatchers = [
  { pattern: /local markets|markets tour/i, slug: 'local-markets-tours' },
  { pattern: /city tour|arusha city/i, slug: 'city-tours' },
  { pattern: /balloon/i, slug: 'balloon-safari' },
  { pattern: /migration/i, slug: 'great-migration' },
  { pattern: /game drive/i, slug: 'game-drives' },
  { pattern: /walk|hike/i, slug: 'walking-safaris' },
  { pattern: /cultural|hadzabe|tribe/i, slug: 'hadzabe-tours' },
  { pattern: /coffee/i, slug: 'coffee' },
  { pattern: /waterfall/i, slug: 'waterfalls' },
  { pattern: /food|culinary/i, slug: 'swahili-food' },
  { pattern: /community|impact/i, slug: 'social-impact' },
];

/**
 * @param {string} label
 * @returns {string | null}
 */
export function activitySlugFromLabel(label) {
  const hit = activityLabelMatchers.find((m) => m.pattern.test(label));
  return hit?.slug ?? null;
}

/**
 * @param {string} slug
 * @returns {string[]}
 */
export function getNearbySlugsForDestination(slug) {
  return nearbyDestinationSlugs[slug] ?? [];
}

/**
 * @param {string} slug
 * @returns {number}
 */
export function getEditorialRouteFit(slug) {
  return editorialRouteFit[slug] ?? 4;
}
