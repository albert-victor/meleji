import { escapeHtml } from '../../utils/html.js';

/**
 * @template T
 * @param {T[]} items
 * @param {(item: T, options?: { index?: number; reveal?: boolean }) => string} renderItem
 * @param {{ columns?: 2 | 3 | 4 | 'auto', className?: string, ariaLabel?: string, scrollReveal?: boolean }} [options]
 */
export function renderCardGrid(items, renderItem, options = {}) {
  const cols = options.columns ?? 'auto';
  const colClass = cols === 'auto' ? '' : ` card-grid--${cols}`;
  const extra = options.className ? ` ${options.className}` : '';
  const label = options.ariaLabel ? ` aria-label="${escapeHtml(options.ariaLabel)}"` : '';
  const scrollReveal = options.scrollReveal !== false;

  const cards = items
    .map((item, index) => {
      if (scrollReveal) {
        return renderItem(item, { index, reveal: true });
      }
      return renderItem(item);
    })
    .join('');

  return `<div class="card-grid${colClass}${extra}"${label}>${cards}</div>`;
}