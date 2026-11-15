import { renderPageVisitCta } from '../components/page-visit-cta.js';
import { resolvePageVisitCta } from '../data/page-visit-cta.js';

/** Inserts a contextual photo CTA before the site footer (never on homepage). */
export function insertContextualVisitCta() {
  if (document.body.classList.contains('page--home')) return;

  const page = document.body.dataset.page;
  const slug = document.body.dataset.slug || '';
  const config = resolvePageVisitCta(page, slug);
  if (!config) return;

  const footer = document.querySelector('.site-footer');
  if (!footer || document.querySelector('.visit-cta--page')) return;

  const wrap = document.createElement('div');
  wrap.innerHTML = renderPageVisitCta(config);
  const section = wrap.firstElementChild;
  if (section) footer.before(section);
}
