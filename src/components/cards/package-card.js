import { ARUSHA_URBAN_PHOTO_SLUGS } from '../../data/arusha-city-market-images.js';
import { escapeHtml } from '../../utils/html.js';
import {
  formatPackageDurationBadge,
  packageCardCtaLabel,
  packageCardCtaVariant,
  packageCategoryLabel,
  packageEditorialTagline,
  packagePrimaryActivityLine,
  renderCardHeartIcon,
  renderPackagePriceBlock,
} from './card-premium-shared.js';

const PKG_WAVE = `
  <div class="csp-card__wave csp-card__wave--package" aria-hidden="true">
    <svg viewBox="0 0 400 22" preserveAspectRatio="none" focusable="false"><path d="M0 12 Q100 4 200 12 T400 12 V22 H0 Z" fill="var(--csp-surface)"/></svg>
  </div>`;

function packageCtaButtonClass(variant) {
  if (variant === 'olive') return 'csp-btn csp-btn--olive csp-btn--card';
  if (variant === 'outline') return 'csp-btn csp-btn--outline csp-btn--card';
  return 'csp-btn csp-btn--primary csp-btn--card';
}

/**
 * Safari package card — vertical editorial layout for all grids and carousels.
 * @param {import('../../data/types.js').SafariPackageItem} item
 * @param {{ className?: string; index?: number }} [options]
 */
export function renderSafariPackageCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const duration = formatPackageDurationBadge(item);
  const tagline = packageEditorialTagline(item);
  const category = packageCategoryLabel(item);
  const detailHref = item.href ?? `/pages/safaris/packages/${item.slug}/`;
  const softPhoto = item.slug && ARUSHA_URBAN_PHOTO_SLUGS.has(item.slug) ? ' csp-card--photo-soft m-card--photo-soft' : '';
  const ctaVariant = packageCardCtaVariant(item, options.index);
  const ctaLabel = packageCardCtaLabel(item, options.index);
  const activityLine = packagePrimaryActivityLine(item);
  const activityBlock = activityLine
    ? `<p class="csp-card__activity-hint"><span class="csp-card__activity-dot" aria-hidden="true"></span>${escapeHtml(activityLine)}</p>`
    : '';

  return `
    <article class="csp-card csp-card--package m-card m-card--package m-card--static${softPhoto}${extra}" id="package-${escapeHtml(item.slug)}">
      <div class="csp-card__media csp-card__media--package m-card__media">
        <img
          class="csp-card__hero"
          src="${escapeHtml(item.imageSrc)}"
          alt="${escapeHtml(item.imageAlt)}"
          loading="lazy"
          decoding="async"
          width="640"
          height="400"
        />
        <span class="csp-card__badge csp-card__badge--category" title="${escapeHtml(category)}">${escapeHtml(category)}</span>
        ${renderCardHeartIcon()}
        ${PKG_WAVE}
      </div>
      <div class="csp-card__body csp-card__body--package m-card__body">
        <p class="csp-card__tagline"><em>${escapeHtml(tagline)}</em></p>
        <h3 class="csp-card__title csp-card__title--package m-card__title">${escapeHtml(item.name)}</h3>
        ${
          duration
            ? `<p class="csp-card__duration-line"><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${escapeHtml(duration)}</p>`
            : ''
        }
        ${renderPackagePriceBlock(item)}
        ${activityBlock}
        <div class="csp-card__actions m-card__actions">
          <a class="${packageCtaButtonClass(ctaVariant)}" href="${escapeHtml(detailHref)}">
            ${escapeHtml(ctaLabel)} <i class="fa-solid fa-arrow-right csp-btn__arrow" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>`;
}

/** Empty-state shell when no packages are published. */
export function renderSafariPackagesPendingCard({ href = '/pages/booking/', className = '' } = {}) {
  const extra = className ? ` ${className}` : '';
  return `
    <article class="csp-card csp-card--package m-card m-card--package m-card--static m-card--pending${extra}">
      <div class="csp-card__media pattern-panel pattern-panel--mesh" role="img" aria-label="Safari planning">
        <span class="visually-hidden">Safari planning</span>
        ${PKG_WAVE}
      </div>
      <div class="csp-card__body csp-card__body--package m-card__body">
        <h3 class="csp-card__title m-card__title">Safari packages</h3>
        <p class="csp-card__excerpt">Tell us your dates and the places you hope to see.</p>
        <div class="csp-card__actions m-card__actions">
          <a class="csp-btn csp-btn--primary csp-btn--card" href="${escapeHtml(href)}">Plan your safari</a>
        </div>
      </div>
    </article>`;
}