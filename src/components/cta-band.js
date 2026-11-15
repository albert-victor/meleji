import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';

/**
 * @param {{ title: string, text: string, primary: { label: string, href: string }, secondary?: { label: string, href: string } }} props
 */
export function renderCtaBand(props) {
  const secondary = props.secondary
    ? renderButton({
        label: props.secondary.label,
        href: props.secondary.href,
        variant: 'secondary',
        slide: false,
      })
    : '';

  return `
    <section class="cta-band" aria-labelledby="cta-band-title">
      <div class="container cta-band__inner">
        <div>
          <h2 class="cta-band__title" id="cta-band-title">${escapeHtml(props.title)}</h2>
          <p class="cta-band__text">${escapeHtml(props.text)}</p>
        </div>
        <div class="cta-band__actions">
          ${renderButton({ label: props.primary.label, href: props.primary.href, variant: 'primary' })}
          ${secondary}
        </div>
      </div>
    </section>`;
}
