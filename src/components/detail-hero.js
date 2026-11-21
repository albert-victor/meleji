import { renderPageHero } from './page-hero.js';

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
 * Cinematic inner-page hero – full-bleed image with brand overlay (replaces editorial collage header).
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
  const primary = props.images?.[0];

  return renderPageHero({
    variant: 'landscape',
    eyebrow: props.eyebrow,
    title: props.title,
    lead: props.lead,
    imageSrc: primary?.src,
    imageAlt: primary?.alt ?? '',
    actions: props.actions,
    className: ['detail-page-hero', props.className].filter(Boolean).join(' '),
  });
}