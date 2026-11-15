import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';
import { renderFoundationHeroCollage } from './editorial-split.js';

/**
 * @param {{ gallery?: { src: string, alt: string }[], imageSrc: string, landscapeSrc?: string, imageAlt?: string }} entity
 * @returns {{ src: string, alt: string, width?: number, height?: number }[]}
 */
export function collageImagesFromEntity(entity) {
  const fallback = {
    src: entity.landscapeSrc ?? entity.imageSrc,
    alt: entity.imageAlt ?? '',
    width: 1400,
    height: 900,
  };
  const gallery = entity.gallery ?? [];
  const picks = [gallery[0] ?? fallback, gallery[1] ?? gallery[0] ?? fallback, gallery[2] ?? gallery[1] ?? fallback];
  return picks.filter((img, index) => index === 0 || img.src !== picks[0].src);
}

/**
 * @param {{
 *   eyebrow?: string,
 *   title: string,
 *   lead?: string,
 *   images: { src: string, alt: string, width?: number, height?: number }[],
 *   actions?: { label: string, href: string, variant?: string, slide?: boolean }[],
 *   className?: string,
 * }} props
 */
export function renderDetailEditorialHero(props) {
  const eyebrow = props.eyebrow
    ? `<p class="foundation-hero__eyebrow">${escapeHtml(props.eyebrow)}</p>`
    : '';
  const lead = props.lead ? `<p class="foundation-hero__lead">${escapeHtml(props.lead)}</p>` : '';
  const extra = props.className ? ` ${props.className}` : '';

  const actions = props.actions?.length
    ? `<div class="foundation-hero__actions">${props.actions
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

  return `
    <header class="foundation-hero detail-editorial-hero${extra}">
      <div class="container foundation-hero__grid">
        <div class="foundation-hero__copy" data-reveal>
          ${eyebrow}
          <h1 class="foundation-hero__title">${escapeHtml(props.title)}</h1>
          ${lead}
          ${actions}
        </div>
        ${renderFoundationHeroCollage(props.images)}
      </div>
    </header>`;
}
