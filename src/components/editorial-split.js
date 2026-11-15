import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';

/**
 * @param {{
 *   eyebrow?: string,
 *   title: string,
 *   body?: string | string[],
 *   image: { src: string, alt: string, width?: number, height?: number },
 *   reverse?: boolean,
 *   className?: string,
 *   action?: { label: string, href: string },
 * }} props
 */
export function renderEditorialSplit(props) {
  const paragraphs = Array.isArray(props.body) ? props.body : props.body ? [props.body] : [];
  const bodyHtml = paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  const eyebrow = props.eyebrow
    ? `<p class="editorial-split__eyebrow">${escapeHtml(props.eyebrow)}</p>`
    : '';
  const action = props.action
    ? `<div class="editorial-split__action">${renderButton({
        label: props.action.label,
        href: props.action.href,
        variant: 'text',
      })}</div>`
    : '';
  const reverseClass = props.reverse ? ' editorial-split--reverse' : '';
  const extra = props.className ? ` ${props.className}` : '';

  return `
    <section class="editorial-split${reverseClass}${extra}" data-reveal>
      <div class="editorial-split__copy">
        ${eyebrow}
        <h2 class="editorial-split__title">${escapeHtml(props.title)}</h2>
        <div class="editorial-split__body">${bodyHtml}</div>
        ${action}
      </div>
      <figure class="editorial-split__media">
        <img
          src="${props.image.src}"
          alt="${escapeHtml(props.image.alt)}"
          width="${props.image.width ?? 1200}"
          height="${props.image.height ?? 900}"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </section>`;
}

/**
 * @param {{ src: string, alt: string, width?: number, height?: number }[]} images
 */
export function renderFoundationHeroCollage(images) {
  const [main, inset, accent] = images;
  if (!main) return '';

  const insetHtml = inset
    ? `<img
        class="foundation-hero__collage-inset"
        src="${inset.src}"
        alt="${escapeHtml(inset.alt)}"
        width="${inset.width ?? 640}"
        height="${inset.height ?? 800}"
        loading="eager"
        decoding="async"
      />`
    : '';

  const accentHtml = accent
    ? `<img
        class="foundation-hero__collage-accent"
        src="${accent.src}"
        alt="${escapeHtml(accent.alt)}"
        width="${accent.width ?? 480}"
        height="${accent.height ?? 640}"
        loading="eager"
        decoding="async"
      />`
    : '';

  return `
    <div class="foundation-hero__collage collage-live" data-reveal data-collage>
      <span class="foundation-photo-wash foundation-photo-wash--hero-main">
        <img
          class="foundation-hero__collage-main"
          src="${main.src}"
          alt="${escapeHtml(main.alt)}"
          width="${main.width ?? 1400}"
          height="${main.height ?? 900}"
          loading="eager"
          decoding="async"
        />
      </span>
      ${inset ? `<span class="foundation-photo-wash foundation-photo-wash--inset">${insetHtml}</span>` : ''}
      ${accent ? `<span class="foundation-photo-wash foundation-photo-wash--accent">${accentHtml}</span>` : ''}
    </div>`;
}
