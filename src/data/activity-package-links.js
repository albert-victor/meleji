/**
 * Match safari packages to activity cards for browse / demo flows.
 * Package `activities` values are free-text labels from import – matching is heuristic.
 */

/** @type {Record<string, (pkg: import('./types.js').SafariPackageItem) => boolean>} */
const matchers = {
  'city-tours': (p) => /arusha-city-tour/i.test(`${p.slug} ${p.name}`),
  'local-markets-tours': (p) => /arusha-local-markets/i.test(`${p.slug} ${p.name}`),
  coffee: (p) => /coffee|materuni/i.test(`${p.slug} ${p.name}`),
  waterfalls: (p) => /waterfall|meru-waterfalls/i.test(`${p.slug} ${p.name}`),
  'swahili-food': (p) => /food|cuisine/i.test(`${p.slug} ${p.name} ${(p.activities ?? []).join(' ')}`),
  'game-drives': (p) => (p.activities ?? []).some((a) => /game drive/i.test(a)),
  'walking-safaris': (p) =>
    (p.activities ?? []).some((a) => /walking/i.test(a)) || /hike|trek/i.test(`${p.slug} ${p.name}`),
  'great-migration': (p) => /serengeti/i.test(`${p.slug} ${p.name}`),
  'balloon-safari': (p) => /balloon/i.test(`${p.slug} ${p.name}`),
  'hadzabe-tours': (p) => /eyasi|hadzabe|cultural/i.test(`${p.slug} ${p.name} ${(p.activities ?? []).join(' ')}`),
  'social-impact': (p) => /community|foundation|impact/i.test(`${p.slug} ${p.name}`),
};

/**
 * @param {import('./types.js').SafariActivityItem} activity
 * @param {import('./types.js').SafariPackageItem[]} packages
 */
export function getPackagesForActivity(activity, packages) {
  const match = matchers[activity.id];
  if (match) return packages.filter(match);
  const needle = activity.title.split(/\s+/)[0].toLowerCase();
  return packages.filter(
    (p) =>
      (p.activities ?? []).some((a) => a.toLowerCase().includes(needle)) ||
      p.name.toLowerCase().includes(needle)
  );
}
