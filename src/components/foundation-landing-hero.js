import { FOUNDATION_HERO_COLLAGE } from '../data/foundation-images.js';
import { renderButton } from './button.js';
import { escapeHtml } from '../utils/html.js';

/**
 * Foundation landing – 3-photo slideshow, lighter overlay.
 * @param {{
 *   eyebrow?: string,
 *   title: string,
 *   lead?: string,
 *   actions?: { label: string, href: string, variant?: string, slide?: boolean }[],
 * }} props
 */
export function renderFoundationLandingHero(props) {
  const slides = FOUNDATION_HERO_COLLAGE.map(
    (img, index) => `
      <img
        class="foundation-landing-hero__slide${index === 0 ? ' is-active' : ''}"
        data-foundation-hero-slide
        data-foundation-hero-index="${index}"
        src="${escapeHtml(img.src)}"
        alt="${escapeHtml(img.alt)}"
        width="${img.width ?? 1200}"
        height="${img.height ?? 900}"
        decoding="${index === 0 ? 'async' : 'async'}"
        loading="${index === 0 ? 'eager' : 'lazy'}"
        ${index === 0 ? 'fetchpriority="high"' : ''}
      />`,
  ).join('');

  const eyebrow = props.eyebrow
    ? `<p class="foundation-landing-hero__eyebrow">${escapeHtml(props.eyebrow)}</p>`
    : '';
  const lead = props.lead ? `<p class="foundation-landing-hero__lead">${escapeHtml(props.lead)}</p>` : '';

  const actions = props.actions?.length
    ? `<div class="foundation-landing-hero__actions">${props.actions
        .map((action) =>
          renderButton({
            label: action.label,
            href: action.href,
            variant: action.variant ?? 'primary',
            slide: action.slide ?? action.variant !== 'secondary',
          }),
        )
        .join('')}</div>`
    : '';

  const dots = FOUNDATION_HERO_COLLAGE.map(
    (_, index) =>
      `<button type="button" class="foundation-landing-hero__dot${index === 0 ? ' is-active' : ''}" data-foundation-hero-go="${index}" aria-label="Show slide ${index + 1} of ${FOUNDATION_HERO_COLLAGE.length}"></button>`,
  ).join('');

  return `
    <header class="foundation-landing-hero" data-foundation-landing-hero>
      <div class="foundation-landing-hero__slides" data-foundation-hero-slides>
        ${slides}
      </div>
      <div class="foundation-landing-hero__shade" aria-hidden="true"></div>
      <div class="foundation-landing-hero__content container" data-reveal>
        ${eyebrow}
        <h1 class="foundation-landing-hero__title">${escapeHtml(props.title)}</h1>
        ${lead}
        ${actions}
      </div>
      <div class="foundation-landing-hero__dots" role="tablist" aria-label="Hero slides">
        ${dots}
      </div>
    </header>`;
}