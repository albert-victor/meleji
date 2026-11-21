/**
 * Markup helper for scroll reveal (elegant scale).
 * @param {{ index?: number, reveal?: boolean }} [options]
 */
export function scrollRevealAttrs(options = {}) {
  if (options.reveal === false) return '';
  const reveal = options.reveal === true || options.index != null;
  if (!reveal) return '';
  if (options.index == null) return 'data-reveal';
  const delay = Number(options.index) % 9;
  return `data-reveal style="--reveal-delay: ${delay}"`;
}