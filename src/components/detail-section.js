import { escapeHtml } from '../utils/html.js';

/**
 * @param {{ title: string, text?: string, link?: { label: string, href: string } }} props
 */
export function renderDetailSectionHeading({ title, text, link }) {
  const copy = text ? `<p class="detail-section__lead text-muted">${escapeHtml(text)}</p>` : '';
  const action = link
    ? `<a class="detail-section__link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`
    : '';
  return `
    <div class="detail-section__head">
      <div class="detail-section__titles">
        <h2 class="detail-section__title">${escapeHtml(title)}</h2>
        ${copy}
      </div>
      ${action}
    </div>`;
}

/**
 * Editorial route-fit stars (not customer reviews).
 * @param {number} score 1–5
 * @param {string} [label]
 */
export function renderEditorialRouteFit(score, label = 'Northern route fit') {
  const clamped = Math.min(5, Math.max(1, Math.round(score)));
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < clamped;
    const className = filled
      ? 'editorial-stars__star editorial-stars__star--on'
      : 'editorial-stars__star editorial-stars__star--off';
    return `<i class="fa-solid fa-star ${className}" aria-hidden="true"></i>`;
  }).join('');
  return `
    <div class="editorial-stars" role="img" aria-label="${escapeHtml(label)}: ${clamped} of 5 for trip planning">
      <span class="editorial-stars__label">${escapeHtml(label)}</span>
      <span class="editorial-stars__row">${stars}</span>
      <span class="editorial-stars__note text-small text-muted">Meleji team planning guide, not guest ratings</span>
    </div>`;
}

/**
 * @param {string[]} labels
 * @param {Record<string, string>} [labelToHref] slug or path per label key
 */
export function renderThingsToDoChips(labels, labelToHref = {}) {
  if (!labels?.length) return '';
  const items = labels
    .map((label) => {
      const href = labelToHref[label];
      if (href) {
        return `<li><a class="things-to-do__chip" href="${escapeHtml(href)}">${escapeHtml(label)}</a></li>`;
      }
      return `<li><span class="things-to-do__chip things-to-do__chip--plain">${escapeHtml(label)}</span></li>`;
    })
    .join('');
  return `<ul class="things-to-do" aria-label="Things to do">${items}</ul>`;
}

/**
 * @param {{ title: string, body: string, children?: string, band?: boolean }} props
 */
export function renderDetailSection({ title, body, children = '', band = false }) {
  const bandClass = band ? ' inner-section--band' : '';
  return `
    <section class="inner-section${bandClass}">
      <div class="container detail-section">
        ${renderDetailSectionHeading({ title, text: body })}
        ${children}
      </div>
    </section>`;
}
