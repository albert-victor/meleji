/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageDurationTag(item) {
  if (item.durationLabel) {
    const match = item.durationLabel.match(/^(\d+)\s*Days?/i);
    if (match) return `${match[1]} days`;
    if (/day trip/i.test(item.durationLabel)) return 'Day trip';
  }
  const fromName = item.name.match(/^(\d+)\s+Days?/i);
  if (fromName) return `${fromName[1]} days`;
  if (/day trip/i.test(item.name)) return 'Day trip';
  return '';
}

/**
 * Short route title without leading "N Days to".
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packageShortTitle(item) {
  const stripped = item.name.replace(/^\d+\s+Days?\s+to\s+/i, '').replace(/^Day Trip to\s+/i, 'Day trip · ');
  const strippedHike = item.name.replace(/^Day Hike\s+/i, 'Day hike · ');
  if (stripped !== item.name) return stripped;
  if (strippedHike !== item.name) return strippedHike;
  return item.name;
}

/**
 * @param {import('../../data/types.js').SafariPackageItem} item
 */
export function packagePrimaryActivity(item) {
  return item.activities?.[0] ?? '';
}
