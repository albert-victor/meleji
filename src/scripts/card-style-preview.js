import { liveDestinations } from '../data/published/destinations.js';
import { liveSafariPackages } from '../data/published/packages.js';
import {
  renderPremiumPackageCardPreview,
  renderPremiumDestinationCardPreview,
} from '../components/cards/preview-premium-card.js';

function pickPackages() {
  const slugs = [
    'day-trip-to-materuni-waterfalls-and-coffee-tour',
    '3-days-to-ngorongoro-crater-tarangire-lake-manyara-national-parks',
    'day-trip-to-lake-natron',
  ];
  return slugs
    .map((slug) => liveSafariPackages.find((p) => p.slug === slug))
    .filter(Boolean);
}

function pickDestinations() {
  const slugs = ['ngorongoro-crater', 'serengeti-national-park', 'arusha-national-park'];
  return slugs
    .map((slug) => liveDestinations.find((d) => d.slug === slug))
    .filter(Boolean);
}

export function initCardStylePreview() {
  const pkgRoot = document.querySelector('[data-csp-packages]');
  const destRoot = document.querySelector('[data-csp-destinations]');
  if (pkgRoot) {
    pkgRoot.innerHTML = pickPackages().map(renderPremiumPackageCardPreview).join('');
  }
  if (destRoot) {
    destRoot.innerHTML = pickDestinations().map(renderPremiumDestinationCardPreview).join('');
  }
}
