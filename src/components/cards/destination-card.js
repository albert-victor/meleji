import { escapeHtml } from '../../utils/html.js';
import {
  destinationCardCtaLabel,
  destinationCardCtaVariant,
  destinationCardSubtitle,
  destinationPolaroidSrc,
  renderCardHeartIcon,
  renderDestinationMediaTags,
  renderDestinationPhotoHint,
} from './card-premium-shared.js';

const DEST_WAVE = `
  <div class="csp-card__wave csp-card__wave--dest" aria-hidden="true">
    <svg viewBox="0 0 400 24" preserveAspectRatio="none" focusable="false"><path d="M0 14 C120 6 280 20 400 10 V24 H0 Z" fill="var(--csp-surface)"/></svg>
  </div>`;

/**
 * @param {import('../../data/types.js').DestinationItem} item
 * @param {{ className?: string; compact?: boolean; index?: number }} [options]
 */
export function renderDestinationCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const compact = options.compact ? ' csp-card--compact' : '';
  const subtitle = destinationCardSubtitle(item);
  const polaroidSrc = destinationPolaroidSrc(item);
  const photoHint = polaroidSrc && polaroidSrc !== item.imageSrc ? polaroidSrc : '';
  const ctaVariant = destinationCardCtaVariant(item, options.index);
  const ctaLabel = destinationCardCtaLabel(item, options.index);
  const btnClass =
    ctaVariant === 'alt'
      ? 'csp-btn csp-btn--ghost csp-btn--card csp-btn--dest-alt'
      : 'csp-btn csp-btn--primary csp-btn--card';

  return `
    <article class="csp-card csp-card--destination csp-card--destination-rich m-card m-card--destination m-card--static${compact}${extra}">
      <div class="csp-card__media csp-card__media--dest m-card__media">
        <img
          class="csp-card__hero"
          src="${escapeHtml(item.imageSrc)}"
          alt="${escapeHtml(item.imageAlt)}"
          loading="lazy"
          decoding="async"
          width="640"
          height="400"
        />
        ${renderDestinationPhotoHint(photoHint)}
        ${renderDestinationMediaTags(item)}
        ${renderCardHeartIcon()}
        ${DEST_WAVE}
      </div>
      <div class="csp-card__body csp-card__body--dest csp-card__body--dest-minimal m-card__body">
        <p class="csp-card__dest-subtitle"><em>${escapeHtml(subtitle)}</em></p>
        <h3 class="csp-card__title m-card__title">${escapeHtml(item.name)}</h3>
        <div class="csp-card__actions m-card__actions">
          <a class="${btnClass}" href="${escapeHtml(item.href)}">
            ${escapeHtml(ctaLabel)} <i class="fa-solid fa-arrow-right csp-btn__arrow" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </article>`;
}