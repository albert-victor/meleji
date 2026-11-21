import { escapeHtml } from '../../utils/html.js';

/** @param {import('../../data/types.js').ContentStatus} status */
export function isPublishedOrFixture(status) {
  return status === 'published' || status === 'fixture';
}

export function filterLiveContent(items) {
  return items.filter((item) => item.status === 'published');
}

/** Visible gold cinematic wash over card photos (paired with .meleji-card-photo). */
export const CARD_PHOTO_SHADE = '<span class="meleji-card-photo__shade" aria-hidden="true"></span>';

/**
 * @param {{ imageSrc?: string, imageAlt: string, pattern?: string, aspect?: string }} media
 */
export function renderCardMedia(media) {
  const aspectClass = media.aspect ? ` m-card__media--${media.aspect}` : '';
  if (media.pattern) {
    return `
      <div class="m-card__media${aspectClass} pattern-panel pattern-panel--${escapeHtml(media.pattern)}" role="img" aria-label="${escapeHtml(media.imageAlt)}">
        <span class="visually-hidden">${escapeHtml(media.imageAlt)}</span>
      </div>`;
  }

  return `
    <div class="m-card__media meleji-card-photo${aspectClass}">
      <img
        src="${media.imageSrc}"
        alt="${escapeHtml(media.imageAlt)}"
        loading="lazy"
        decoding="async"
        width="960"
        height="720"
      />
      ${CARD_PHOTO_SHADE}
    </div>`;
}
