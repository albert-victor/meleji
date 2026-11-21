import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';

/**
 * Full-width photo CTA (homepage waterfall style) – one block per page context.
 * @param {{ eyebrow: string, title: string, body: string, image: string, imageAlt?: string, primary: { label: string, href: string } }} props
 */
export function renderPageVisitCta(props) {
  const alt = props.imageAlt ? escapeHtml(props.imageAlt) : '';
  return `<section class="visit-cta visit-cta--page" aria-labelledby="page-visit-cta-title">
  <img src="${props.image}" alt="${alt}" width="1600" height="1067" loading="lazy" decoding="async" />
  <div class="visit-cta__content container" data-reveal>
    <p class="visit-cta__eyebrow">${escapeHtml(props.eyebrow)}</p>
    <h2 id="page-visit-cta-title">${escapeHtml(props.title)}</h2>
    <p>${props.body.includes('<') ? props.body : escapeHtml(props.body)}</p>
    ${renderButton({ label: props.primary.label, href: props.primary.href, shape: 'round', icon: 'arrow-right' })}
  </div>
</section>`;
}
