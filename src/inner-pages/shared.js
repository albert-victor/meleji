import { initEnquiryForms } from '../components/enquiry-form.js';
import { initInnerEffects } from '../scripts/inner-effects.js';
import { initBookingEstimates } from '../scripts/booking-estimates.js';
import { escapeHtml } from '../utils/html.js';

export function mountInner(html) {
  const root = document.querySelector('[data-inner-mount]');
  if (!root) return;
  root.innerHTML = html;
  initEnquiryForms(root);
  initBookingEstimates(root);
  initInnerEffects();
  import('../scripts/accommodation-cards.js').then((m) => m.initAccommodationCards(root));
  document.body.classList.add('page--inner', 'page--with-chrome');
}

export function renderGallery(items) {
  return `
    <div class="gallery-grid">
      ${items
        .map(
          (item) => `
        <figure class="gallery-grid__item">
          <img src="${item.src}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async" width="640" height="480" />
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
