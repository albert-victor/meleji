import { escapeHtml } from '../utils/html.js';

/**
 * CTA system:
 * - primary: pill + circle arrow (moves on hover)
 * - ghost: outline → brand fill on hover
 * - text: underline link with strong arrow indicator
 */
export function renderButton({
  label,
  href = null,
  variant = 'primary',
  size = '',
  className = '',
  slide = false,
  shape = 'round',
  type = 'button',
  ariaCurrent = null,
  icon = null,
  trailingIcon = 'arrow-right',
} = {}) {
  const sizeClass = size ? ` btn--${size}` : '';
  const shapeClass = shape ? ` btn--${shape}` : '';
  const slideClass = slide ? ' btn--slide' : '';
  const classes = `btn btn--${variant}${sizeClass}${slideClass}${shapeClass} ${className}`.trim();

  const safeLabel = escapeHtml(label);
  const leadIcon = icon
    ? `<i class="btn__icon btn__icon--lead fa-solid fa-${escapeHtml(icon)}" aria-hidden="true"></i>`
    : '';

  let visual;
  if (variant === 'primary') {
    visual = `<span class="btn__clip" aria-hidden="true"><span class="btn__label">${leadIcon}${safeLabel}</span><span class="btn__circle" aria-hidden="true"><i class="fa-solid fa-arrow-right"></i></span></span>`;
  } else if (variant === 'text') {
    visual = `<span class="btn__clip" aria-hidden="true"><span class="btn__label">${leadIcon}${safeLabel}</span><i class="btn__arrow fa-solid fa-${escapeHtml(trailingIcon || 'arrow-up-right')}" aria-hidden="true"></i></span>`;
  } else if (slide) {
    const iconMarkup = leadIcon;
    visual = `<span class="btn__clip" aria-hidden="true"><span class="btn__stack"><span class="btn__label">${iconMarkup}${safeLabel}</span><span class="btn__label">${iconMarkup}${safeLabel}</span></span></span>`;
  } else {
    const trail =
      trailingIcon !== false
        ? `<i class="btn__icon btn__icon--trail fa-solid fa-${escapeHtml(trailingIcon || 'arrow-right')}" aria-hidden="true"></i>`
        : '';
    visual = `<span class="btn__clip" aria-hidden="true"><span class="btn__label">${leadIcon}${safeLabel}${trail}</span></span>`;
  }

  const current = ariaCurrent ? ` aria-current="${ariaCurrent}"` : '';

  if (href) {
    return `<a class="${classes}" href="${href}" aria-label="${safeLabel}"${current}>${visual}</a>`;
  }

  return `<button class="${classes}" type="${type}" aria-label="${safeLabel}">${visual}</button>`;
}
