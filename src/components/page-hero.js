import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';
import { INNER_PAGE_HERO_IMAGES } from '../data/page-hero-images.js';
import propertyHero from '../assets/images/optimized/hero-1920.webp';

const HERO_LEAD_MAX = 132;

/**
 * @param {string} text
 */
function clampHeroLead(text) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= HERO_LEAD_MAX) return clean;
  const slice = clean.slice(0, HERO_LEAD_MAX);
  const lastSpace = slice.lastIndexOf(' ');
  const trimmed = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trimEnd();
  return `${trimmed}…`;
}

/**
 * @param {{
 *   variant?: 'standard' | 'landscape' | 'room' | 'foundation',
 *   imageKey?: keyof typeof INNER_PAGE_HERO_IMAGES,
 *   eyebrow?: string,
 *   title: string,
 *   lead?: string,
 *   imageSrc?: string,
 *   imageAlt?: string,
 *   actions?: { label: string, href: string, variant?: string, slide?: boolean }[],
 *   className?: string,
 *   scrollCue?: boolean,
 * }} props
 */
export function renderPageHero(props) {
  const preset = props.imageKey ? INNER_PAGE_HERO_IMAGES[props.imageKey] : undefined;
  const imageSrc = props.imageSrc ?? preset?.src;
  const imageAlt = props.imageAlt ?? preset?.alt ?? '';

  let variant = props.variant;
  if (!variant) {
    variant = imageSrc ? 'landscape' : 'standard';
  }

  const eyebrow = props.eyebrow
    ? `<p class="page-hero__eyebrow">${escapeHtml(props.eyebrow)}</p>`
    : '';
  const lead = props.lead
    ? `<p class="page-hero__lead">${escapeHtml(clampHeroLead(props.lead))}</p>`
    : '';

  const actions = props.actions?.length
    ? `<div class="page-hero__actions">${props.actions
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

  const extraClass = props.className ? ` ${escapeHtml(props.className)}` : '';
  const scrollCue =
    props.scrollCue !== false && variant === 'landscape' && imageSrc
      ? `<p class="page-hero__scroll" aria-hidden="true"><span>Scroll</span></p>`
      : '';

  const media = imageSrc
    ? `
      <div class="page-hero__media" data-reveal>
        <img src="${imageSrc}" alt="${escapeHtml(imageAlt)}" width="1920" height="1080" decoding="async" fetchpriority="high" />
      </div>`
    : '';

  if (variant === 'landscape' && imageSrc) {
    return `
      <header class="page-hero page-hero--landscape page-hero--cinematic${extraClass}">
        ${media}
        <div class="page-hero__shade" aria-hidden="true"></div>
        <div class="page-hero__content container" data-reveal style="--reveal-delay: 1">
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
        ${scrollCue}
      </header>`;
  }

  if (variant === 'room' && imageSrc) {
    return `
      <header class="page-hero page-hero--room${extraClass}">
        <div class="page-hero__room-copy" data-reveal>
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
        <div class="page-hero__room-media" data-reveal style="--reveal-delay: 1">
          <img src="${imageSrc}" alt="${escapeHtml(imageAlt)}" width="1200" height="900" decoding="async" />
        </div>
      </header>`;
  }

  if (variant === 'foundation') {
    return `
      <header class="page-hero page-hero--foundation${extraClass}">
        <div class="container page-hero__foundation-inner" data-reveal>
          ${eyebrow}
          <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
      </header>`;
  }

  const fallbackImage = imageSrc ?? propertyHero;
  return `
    <header class="page-hero page-hero--landscape page-hero--cinematic${extraClass}">
      <div class="page-hero__media">
        <img src="${fallbackImage}" alt="${escapeHtml(imageAlt || 'Meleji Homestays')}" width="1920" height="1080" decoding="async" fetchpriority="high" />
      </div>
      <div class="page-hero__shade" aria-hidden="true"></div>
      <div class="page-hero__content container" data-reveal>
        ${eyebrow}
        <h1 class="page-hero__title">${escapeHtml(props.title)}</h1>
        ${lead}
        ${actions}
      </div>
      ${scrollCue}
    </header>`;
}