import { escapeHtml } from '../../utils/html.js';
import { renderCardMedia } from './shared.js';

/**
 * @param {import('../../data/types.js').ExperienceItem} item
 * @param {{ className?: string }} [options]
 */
export function renderExperienceCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const softPhoto = item.slug === 'culture' ? ' m-card--photo-soft' : '';

  return `
    <a class="m-card m-card--experience${softPhoto}${extra}" href="${escapeHtml(item.href)}">
      ${renderCardMedia({ imageSrc: item.imageSrc, imageAlt: item.imageAlt })}
      <div class="m-card__body">
        <h3 class="m-card__title">${escapeHtml(item.title)}</h3>
        <p class="m-card__text">${escapeHtml(item.summary)}</p>
      </div>
    </a>`;
}
