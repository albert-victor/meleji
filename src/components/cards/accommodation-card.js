import { escapeHtml } from '../../utils/html.js';

/**
 * @param {import('../../data/types.js').AccommodationItem} item
 */
function renderStayStars(count = 5) {
  return `<span class="stay-card__stars" aria-hidden="true">${Array.from({ length: count })
    .map(() => `<i class="fa-solid fa-star" aria-hidden="true"></i>`)
    .join('')}</span>`;
}

/**
 * @param {{ icon: string, label: string }[]} services
 */
function renderStayServices(services = []) {
  if (!services.length) return '';
  return `<ul class="stay-card__services">${services
    .map(
      (service) => `
      <li class="stay-card__service">
        <i class="fa-solid ${escapeHtml(service.icon)}" aria-hidden="true"></i>
        <span>${escapeHtml(service.label)}</span>
      </li>`,
    )
    .join('')}</ul>`;
}

/**
 * @param {import('../../data/types.js').AccommodationItem} item
 * @param {{ className?: string }} [options]
 */
export function renderAccommodationCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const heroSrc = item.imageSrc;
  const heroAlt = item.imageAlt ?? item.title;

  const priceAmount = item.priceFrom ?? item.pricing?.single ?? item.pricing?.night ?? '';
  const priceUnit = item.priceUnit ? `<span class="stay-card__price-unit">${escapeHtml(item.priceUnit)}</span>` : '';
  const priceSub = item.priceSubline
    ? `<p class="stay-card__price-sub">${escapeHtml(item.priceSubline)}</p>`
    : '';

  const avail = item.availabilityBadge
    ? `<span class="stay-card__avail">${escapeHtml(item.availabilityBadge)}</span>`
    : '';

  return `
    <article class="stay-card stay-card--luxury m-card m-card--accommodation${extra}">
      <a class="stay-card__surface" href="${escapeHtml(item.bookingHref ?? item.href)}" aria-label="Book ${escapeHtml(item.title)}"></a>
      <div class="stay-card__media m-card__media m-card__media--wide m-card__media--room-photo" data-collage>
        <img
          class="stay-card__hero"
          src="${escapeHtml(heroSrc)}"
          alt="${escapeHtml(heroAlt)}"
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
        />
        <span class="stay-card__price-badge" aria-label="From ${priceAmount} US dollars ${item.priceUnit ?? 'per night'}">
          <span class="stay-card__price-from">from</span>
          <span class="stay-card__price-mark" aria-hidden="true">
            <span class="stay-card__price-currency">$</span><span class="stay-card__price-amount">${priceAmount}</span>
          </span>
          ${priceUnit}
        </span>
        ${avail}
      </div>
      <div class="stay-card__body m-card__body">
        ${renderStayStars(item.ratingStars ?? 4)}
        <p class="stay-card__kicker">${escapeHtml(item.roomKicker ?? 'Homestay stay')}</p>
        <h3 class="stay-card__title m-card__title">${escapeHtml(item.title)}</h3>
        <p class="stay-card__text m-card__text">${escapeHtml(item.description)}</p>
        ${renderStayServices(item.services)}
        ${item.occupancy ? `<p class="stay-card__meta m-card__meta">${escapeHtml(item.occupancy)}</p>` : ''}
        ${priceSub}
        <span class="stay-card__cta">Book room <span aria-hidden="true">→</span></span>
      </div>
    </article>`;
}