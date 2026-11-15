import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '../styles/main.css';
import { mountSiteChrome } from '../components/site-chrome.js';
import { renderFooter } from '../components/footer.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  const skip = document.querySelector('.skip-link');
  if (skip && document.activeElement === skip && !skip.matches(':focus-visible')) {
    skip.blur();
  }

  if (document.body.dataset.chrome !== 'off') {
    const isHome = document.body.classList.contains('page--home');
    const attr = document.body.dataset.footer || 'compact';
    const footerVariant = isHome ? 'home' : attr === 'full' ? 'main' : 'compact';
    mountSiteChrome({ footer: footerVariant });
  }

  initNavigation();

  const compactPreview = document.querySelector('[data-footer-compact-preview]');
  if (compactPreview) {
    compactPreview.innerHTML = renderFooter('compact');
  }

  if (document.body.classList.contains('page--home')) {
    import('./home.js').then((module) => module.initHome());
  }

  if (document.body.classList.contains('page--cards-journey-demo')) {
    import('./cards-journey-demo.js').then((module) => module.initCardsJourneyDemo());
  }

  if (document.body.classList.contains('page--card-style-preview')) {
    import('./card-style-preview.js').then((module) => module.initCardStylePreview());
  }

  if (document.body.dataset.page) {
    import('../inner-pages/mount.js').then(async (module) => {
      module.mountInnerPage();
      const { insertContextualVisitCta } = await import('../inner-pages/insert-visit-cta.js');
      insertContextualVisitCta();
    });
  }
});
