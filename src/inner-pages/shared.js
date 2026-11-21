import { initEnquiryForms } from '../components/enquiry-form.js';
import { initInnerEffects } from '../scripts/inner-effects.js';
import { initBookingEstimates } from '../scripts/booking-estimates.js';
import { initFormControls } from '../scripts/form-controls.js';
import { initContactHub } from '../scripts/contact-hub.js';
import { escapeHtml } from '../utils/html.js';
import { CARD_PHOTO_SHADE } from '../components/cards/shared.js';

function applyInnerPageBodyClasses(root) {
  document.body.classList.add('page--inner', 'page--with-chrome');

  if (root.querySelector('[data-foundation-rail]')) {
    document.body.classList.add('page--foundation-rail');
  }
  if (document.body.dataset.page === 'foundation') {
    document.body.classList.add('page--foundation-compact-header');
  }
  if (root.querySelector('.foundation-landing-hero, .page-hero--cinematic, .page-hero--landscape')) {
    document.body.classList.add('page--cinematic-hero');
    import('../scripts/inner-header.js').then((m) => m.initCinematicHeaderScroll());
  }
}

export function mountInner(html) {
  const root = document.querySelector('[data-inner-mount]');
  if (!root) return;
  root.innerHTML = html;
  applyInnerPageBodyClasses(root);

  try {
    initEnquiryForms(root);
    initFormControls(root);
    initContactHub(root);
    initBookingEstimates(root);
    initInnerEffects(root);
  } catch (err) {
    console.error('[mountInner] Page inits failed after mount', err);
  }

  import('../scripts/accommodation-cards.js').then((m) => m.initAccommodationCards(root));
}

export function renderGallery(items) {
  return `
    <div class="gallery-grid">
      ${items
        .map(
          (item, index) => `
        <figure class="gallery-grid__item meleji-card-photo" data-reveal style="--reveal-delay: ${index % 9}">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async" width="640" height="480" />
          ${CARD_PHOTO_SHADE}
        </figure>`,
        )
        .join('')}
    </div>`;
}

export function renderAmenityList(items) {
  return `
    <ul class="amenity-list">
      ${items
        .map(
          (text) =>
            `<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>${escapeHtml(text)}</span></li>`,
        )
        .join('')}
    </ul>`;
}

export function draftBanner(text) {
  return `<p class="draft-banner" role="status"><strong>Draft page.</strong> ${escapeHtml(text)}</p>`;
}

/**
 * @param {import('../data/types.js').ItineraryDay[]} days
 */
export function renderItinerary(days) {
  if (!days?.length) return '';
  return `
    <ol class="itinerary-list">
      ${days
        .map(
          (day) => `
        <li class="itinerary-list__item">
          <p class="itinerary-list__day">Day ${day.day}</p>
          <h3 class="itinerary-list__title">${escapeHtml(day.title)}</h3>
          <p class="text-muted">${escapeHtml(day.body)}</p>
        </li>`,
        )
        .join('')}
    </ol>`;
}

/**
 * @param {import('../data/types.js').ItineraryDay[]} days
 * @param {{ src: string, alt: string }[]} [gallery]
 */
export function renderItineraryTimeline(days, gallery = []) {
  if (!days?.length) return '';
  return `
    <ol class="itinerary-timeline" data-reveal>
      ${days
        .map((day, index) => {
          const image = gallery.length ? gallery[(day.day - 1) % gallery.length] : null;
          const reverse = index % 2 === 1 ? ' itinerary-timeline__item--reverse' : '';
          const media = image
            ? `<figure class="itinerary-timeline__media">
            <img src="${image.src}" alt="${escapeHtml(image.alt)}" width="800" height="600" loading="lazy" decoding="async" />
          </figure>`
            : '';
          return `
        <li class="itinerary-timeline__item${reverse}">
          <div class="itinerary-timeline__copy">
            <p class="itinerary-timeline__day">Day ${day.day}</p>
            <h3 class="itinerary-timeline__title">${escapeHtml(day.title)}</h3>
            <p class="itinerary-timeline__body">${escapeHtml(day.body)}</p>
          </div>
          ${media}
        </li>`;
        })
        .join('')}
    </ol>`;
}
