import { escapeHtml } from '../../utils/html.js';
import { scrollRevealAttrs } from '../../utils/reveal-attrs.js';
import { renderCardMedia } from './shared.js';

/**
 * @param {import('../../data/types.js').CommunityProgrammeItem} item
 * @param {{ className?: string }} [options]
 */
export function renderCommunityProgrammeCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';

  return `
    <a class="m-card m-card--community${extra}" ${scrollRevealAttrs(options)} href="${escapeHtml(item.href)}">
      ${renderCardMedia({ imageSrc: item.imageSrc, imageAlt: item.imageAlt, aspect: 'logo' })}
      <div class="m-card__body">
        <h3 class="m-card__title">${escapeHtml(item.title)}</h3>
        <p class="m-card__text">${escapeHtml(item.summary)}</p>
      </div>
    </a>`;
}
