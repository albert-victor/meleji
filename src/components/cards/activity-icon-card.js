import { escapeHtml } from '../../utils/html.js';

/**
 * @param {import('../../data/types.js').ActivityIconItem} item
 * @param {{ className?: string, href?: string }} [options]
 */
export function renderActivityIconCard(item, options = {}) {
  const extra = options.className ? ` ${options.className}` : '';
  const icon = escapeHtml(item.icon);
  const desc = item.description
    ? `<p class="m-card__text">${escapeHtml(item.description)}</p>`
    : '';

  const inner = `
    <div class="m-card__icon" aria-hidden="true">
      <i class="fa-solid ${icon}"></i>
    </div>
    <h3 class="m-card__title">${escapeHtml(item.label)}</h3>
    ${desc}`;

  if (options.href) {
    return `
      <a class="m-card m-card--activity${extra}" href="${escapeHtml(options.href)}">
        <div class="m-card__body m-card__body--center">${inner}</div>
      </a>`;
  }

  return `
    <div class="m-card m-card--activity m-card--static${extra}">
      <div class="m-card__body m-card__body--center">${inner}</div>
    </div>`;
}
