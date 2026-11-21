import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import '@fortawesome/fontawesome-free/css/brands.min.css';
import '../styles/main.css';
import { mountSiteChrome } from '../components/site-chrome.js';
import { renderFooter } from '../components/footer.js';
import { initNavigation } from './navigation.js';
import { dismissSiteEntry, initSiteEntryNav, showSiteEntryIfNeeded } from './site-entry.js';

initSiteEntryNav();

if (document.readyState !== 'loading') {
  showSiteEntryIfNeeded();
} else {
  document.addEventListener('DOMContentLoaded', () => showSiteEntryIfNeeded(), { once: true });
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  showSiteEntryIfNeeded();

  const skip = document.querySelector('.skip-link');
  if (skip && document.activeElement === skip && !skip.matches(':focus-visible')) {
    skip.blur();
  }

  const bootTasks = [];

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
    bootTasks.push(import('./home.js').then((module) => module.initHome()));
  }

  if (document.body.classList.contains('page--cards-journey-demo')) {
    bootTasks.push(import('./cards-journey-demo.js').then((module) => module.initCardsJourneyDemo()));
  }

  if (document.body.classList.contains('page--card-style-preview')) {
    bootTasks.push(import('./card-style-preview.js').then((module) => module.initCardStylePreview()));
  }

  if (document.body.classList.contains('page--loading-preview')) {
    bootTasks.push(import('./loading-preview.js').then((module) => module.initLoadingPreview()));
  }

  if (document.body.classList.contains('page--scroll-demo') && document.body.dataset.scrollVariant) {
    bootTasks.push(import('./scroll-demo.js').then((module) => module.initScrollDemo()));
  }

  if (document.body.dataset.page) {
    bootTasks.push(
      import('../inner-pages/mount.js')
        .then(async (module) => {
          module.mountInnerPage();
          const { insertContextualVisitCta } = await import('../inner-pages/insert-visit-cta.js');
          insertContextualVisitCta();
        })
        .catch((err) => {
          console.error('[main] Inner page module failed to load', err);
          const root = document.querySelector('[data-inner-mount]');
          if (root && !root.innerHTML.trim()) {
            root.innerHTML = `
            <p class="inner-section container text-muted" role="status">
              This page could not load. Please refresh or return to the
              <a href="/">home page</a>.
            </p>`;
          }
        }),
    );
  }

  Promise.all(bootTasks).then(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.body.classList.add('is-page-ready');
        dismissSiteEntry();
        window.scrollTo(0, 0);
        import('./reveal-observer.js').then(({ observeRevealTargets, refreshRevealsAfterSiteEntry, flushVisibleReveals }) => {
          const inner = document.querySelector('[data-inner-mount]') || document;
          observeRevealTargets(document);
          observeRevealTargets(inner);
          refreshRevealsAfterSiteEntry(document);
          flushVisibleReveals(inner);
        });
      });
    });
  });
});