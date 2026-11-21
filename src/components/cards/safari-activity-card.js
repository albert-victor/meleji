import { ARUSHA_URBAN_PHOTO_SLUGS } from '../../data/arusha-city-market-images.js';
import { escapeHtml } from '../../utils/html.js';
import { scrollRevealAttrs } from '../../utils/reveal-attrs.js';
import { renderCardMedia } from './shared.js';

/**
 * @param {import('../../data/types.js').SafariActivityItem} item
 * @param {{ className?: string, linkToPackages?: boolean }} [options]
 */
export function renderSafariActivityCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const icon = item.icon ? `<i class="fa-solid ${escapeHtml(item.icon)}" aria-hidden="true"></i>` : '';

  const packagesAnchor = item.slug ? `#packages-for-${item.slug}` : item.href;
  const href = options.linkToPackages ? packagesAnchor : item.href;
  const softPhoto = item.slug && ARUSHA_URBAN_PHOTO_SLUGS.has(item.slug) ? ' m-card--photo-soft' : '';

  return `
    <a class="m-card m-card--activity m-card--activity-compact${softPhoto}${extra}" ${scrollRevealAttrs(options)} href="${href}"${
      options.linkToPackages && item.slug ? ` data-activity-filter="${escapeHtml(item.slug)}"` : ''
    }>
      ${renderCardMedia({ imageSrc: item.imageSrc, imageAlt: item.imageAlt, aspect: 'wide' })}
      <div class="m-card__body">
        <h3 class="m-card__title m-card__title--with-icon">${icon}<span>${escapeHtml(item.title)}</span></h3>
      </div>
    </a>`;
}
