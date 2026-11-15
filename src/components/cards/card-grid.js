import { escapeHtml } from '../../utils/html.js';

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T) => string} renderItem
 * @param {{ columns?: 2 | 3 | 4 | 'auto', className?: string, ariaLabel?: string }} [options]
 */
export function renderCardGrid(items, renderItem, options = {}) {
  const cols = options.columns ?? 'auto';
  const colClass = cols === 'auto' ? '' : ` card-grid--${cols}`;
  const extra = options.className ? ` ${options.className}` : '';
  const label = options.ariaLabel ? ` aria-label="${escapeHtml(options.ariaLabel)}"` : '';

  const cards = items.map((item) => renderItem(item)).join('');

  return `<div class="card-grid${colClass}${extra}"${label}>${cards}</div>`;
}
