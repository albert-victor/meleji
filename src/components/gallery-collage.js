import { escapeHtml } from '../utils/html.js';
import { CARD_PHOTO_SHADE } from './cards/shared.js';

/**
 * @param {{ eyebrow: string, title: string, lead?: string, tiles: { src: string, alt: string, slot: string }[] }} section
 * @param {number} index
 */
export function renderGalleryCollageSection(section, index) {
  const lead = section.lead ? `<p class="gallery-mosaic-section__lead text-muted">${escapeHtml(section.lead)}</p>` : '';

  const urbanClass = section.eyebrow === 'Arusha' ? ' gallery-mosaic-section--urban' : '';

  const media =
    section.layout === 'grid'
      ? `<div class="gallery-grid gallery-grid--dense" data-reveal>
        ${section.tiles
          .map(
            (tile, tileIndex) => `
        <figure class="gallery-grid__item gallery-grid__item--dense meleji-card-photo" data-reveal style="--reveal-delay: ${tileIndex % 9}">
          <img src="${tile.src}" alt="${escapeHtml(tile.alt)}" width="400" height="400" loading="lazy" decoding="async" />
          ${CARD_PHOTO_SHADE}
        </figure>`,
          )
          .join('')}
      </div>`
      : `<div class="gallery-mosaic" data-gallery-mosaic data-collage data-reveal>
        ${section.tiles
          .map(
            (tile, tileIndex) => `
        <figure
          class="gallery-mosaic__tile meleji-card-photo gallery-mosaic__tile--${escapeHtml(tile.slot)}"
          style="--tile-i: ${tileIndex}"
        >
          <img
            src="${tile.src}"
            alt="${escapeHtml(tile.alt)}"
            width="900"
            height="700"
            loading="lazy"
            decoding="async"
          />
          ${CARD_PHOTO_SHADE}
        </figure>`,
          )
          .join('')}
      </div>`;

  return `
    <section class="gallery-mosaic-section${urbanClass} inner-section container" aria-labelledby="gallery-section-${index}">
      <header class="gallery-mosaic-section__head" data-reveal>
        <p class="editorial-split__eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2 class="detail-section__title" id="gallery-section-${index}">${escapeHtml(section.title)}</h2>
        ${lead}
      </header>
      ${media}
    </section>`;
}

/**
 * @param {typeof import('../data/gallery-sections.js').GALLERY_SECTIONS} sections
 */
export function renderGalleryCollagePage(sections) {
  return sections.map((section, index) => renderGalleryCollageSection(section, index)).join('');
}
