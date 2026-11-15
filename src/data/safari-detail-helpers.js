import { liveDestinations } from './published/destinations.js';
import { liveSafariPackages } from './published/packages.js';
import { liveSafariActivities } from './published/safari-activities.js';
import {
  getEditorialRouteFit,
  getNearbySlugsForDestination,
} from './destination-relations.js';

export { getEditorialRouteFit } from './destination-relations.js';

/**
 * @param {string} destinationSlug
 */
export function getPackagesForDestination(destinationSlug) {
  return liveSafariPackages.filter((pkg) => pkg.destinationSlugs?.includes(destinationSlug));
}

/**
 * @param {string} destinationSlug
 * @param {number} [limit]
 */
export function getNearbyDestinations(destinationSlug, limit = 4) {
  const slugs = getNearbySlugsForDestination(destinationSlug);
  const picks = slugs
    .map((s) => liveDestinations.find((d) => d.slug === s))
    .filter(Boolean);
  if (picks.length >= limit) return picks.slice(0, limit);
  const fillers = liveDestinations
    .filter((d) => d.slug !== destinationSlug && !slugs.includes(d.slug))
    .slice(0, limit - picks.length);
  return [...picks, ...fillers].slice(0, limit);
}

/**
 * “You may also like” — mix of nearby and same-region destinations.
 * @param {string} destinationSlug
 * @param {string} [region]
 * @param {number} [limit]
 */
export function getAlsoLikeDestinations(destinationSlug, region = '', limit = 3) {
  const nearby = getNearbyDestinations(destinationSlug, limit + 2).filter((d) => d.slug !== destinationSlug);
  const regionPicks = liveDestinations.filter(
    (d) => d.slug !== destinationSlug && region && d.region?.includes(region.split(',')[0]?.trim() ?? ''),
  );
  const merged = [...nearby];
  for (const dest of regionPicks) {
    if (merged.length >= limit) break;
    if (!merged.some((d) => d.slug === dest.slug)) merged.push(dest);
  }
  return merged.slice(0, limit);
}

/**
 * @param {import('./types.js').DestinationItem} dest
 */
export function getLinkedSafariActivities(dest) {
  const labels = dest.activities ?? [];
  const slugs = [...new Set(labels.map(activitySlugFromLabel).filter(Boolean))];
  return slugs
    .map((slug) => liveSafariActivities.find((a) => a.slug === slug))
    .filter(Boolean);
}

/**
 * @param {import('./types.js').SafariPackageItem} pkg
 * @param {number} [limit]
 */
export function getSimilarPackages(pkg, limit = 3) {
  const destSet = new Set(pkg.destinationSlugs ?? []);
  const scored = liveSafariPackages
    .filter((other) => other.slug !== pkg.slug)
    .map((other) => {
      const overlap = (other.destinationSlugs ?? []).filter((s) => destSet.has(s)).length;
      return { other, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || a.other.name.localeCompare(b.other.name));
  if (scored.length) return scored.slice(0, limit).map(({ other }) => other);
  return liveSafariPackages.filter((other) => other.slug !== pkg.slug).slice(0, limit);
}

/**
 * @param {import('./types.js').SafariPackageItem} pkg
 */
export function getDestinationsForPackage(pkg) {
  return (pkg.destinationSlugs ?? [])
    .map((slug) => liveDestinations.find((d) => d.slug === slug))
    .filter(Boolean);
}

/**
 * @param {import('./types.js').SafariPackageItem} pkg
 */
export function getPackageRouteFit(pkg) {
  const scores = (pkg.destinationSlugs ?? []).map(getEditorialRouteFit);
  if (!scores.length) return 4;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}
