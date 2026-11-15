import { renderButton } from '../components/button.js';
import { mountInner } from './shared.js';

export function renderNotFound() {
  mountInner(`
    <div class="container not-found">
      <p class="not-found__code">404</p>
      <h1 class="page-hero__title">This page is not available</h1>
      <p class="page-hero__lead">The link may be outdated or the page has moved.</p>
      <div class="page-hero__actions">
        ${renderButton({ label: 'Back to home', href: '/' })}
        ${renderButton({ label: 'Contact', href: '/pages/contact/', variant: 'secondary', slide: false })}
      </div>
    </div>`);
}

export function renderMissingContent() {
  mountInner(`
    <div class="container not-found">
      <h1 class="page-hero__title">Content not found</h1>
      <p class="page-hero__lead">This entry is not published or the link is incorrect.</p>
      <div class="page-hero__actions">
        ${renderButton({ label: 'Back to home', href: '/' })}
      </div>
    </div>`);
}
