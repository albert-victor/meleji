import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';

/**
 * @param {{
 *   variant?: 'standard' | 'landscape' | 'room' | 'foundation',
 *   eyebrow?: string,
 *   title: string,
 *   lead?: string,
 *   imageSrc?: string,
 *   imageAlt?: string,
 *   actions?: { label: string, href: string, variant?: string }[],
 * }} props
 */
export function renderPageHero(props) {
  const variant = props.variant ?? 'standard';
  const eyebrow = props.eyebrow
    ? `<p class="page-hero__eyebrow">${escapeHtml(props.eyebrow)}</p>`
    : '';
  const lead = props.lead ? `<p class="page-hero__lead">${escapeHtml(props.lead)}</p>` : '';

  const actions = props.actions?.length
    ? `<div class="page-hero__actions">${props.actions
        .map((action) =>
          renderButton({
            label: action.label,
            href: action.href,
            variant: action.variant ?? 'primary',
            slide: action.variant !== 'secondary',
          }),
        )
        .join('')}</div>`
    : '';

  const media = props.imageSrc
    ? `
      <div class="page-hero__media">
        <img src="${props.imageSrc}" alt="${escapeHtml(props.imageAlt ?? '')}" width="1600" height="900" decoding="async" />
      </div>`
    : '';

  if (variant === 'landscape' && props.imageSrc) {
    return `
      <header class="page-hero page-hero--landscape">
        ${media}
        <div class="page-hero__shade" aria-hidden="true"></div>
        <div class="page-hero__content container">
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
      </header>`;
  }

  if (variant === 'room' && props.imageSrc) {
    return `
      <header class="page-hero page-hero--room">
        <div class="page-hero__room-copy">
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
        <div class="page-hero__room-media">
          <img src="${props.imageSrc}" alt="${escapeHtml(props.imageAlt ?? '')}" width="1200" height="900" decoding="async" />
        </div>
      </header>`;
  }

  if (variant === 'foundation') {
    return `
      <header class="page-hero page-hero--foundation">
        <div class="container page-hero__foundation-inner">
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
      </header>`;
  }

  return `
    <header class="page-hero page-hero--standard container">
      ${eyebrow}
      <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
      ${lead}
      ${actions}
    </header>`;
}
