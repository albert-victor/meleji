/** Scroll reveal for inner pages (same pattern as homepage). */
import {
  flushVisibleReveals,
  initScrollRevealObserver,
  observeRevealTargets,
  revealLandingStack,
} from './reveal-observer.js';

export function initInnerEffects(root = document) {
  initScrollRevealObserver();
  observeRevealTargets(document);
  observeRevealTargets(document.querySelector('.site-footer'));
  observeRevealTargets(document.querySelector('.visit-cta'));
  if (root !== document) {
    observeRevealTargets(root);
    revealLandingStack(root);
    if (!document.documentElement.classList.contains('meleji-entry-pending')) {
      flushVisibleReveals(root);
    }
  } else {
    revealLandingStack(document);
    if (!document.documentElement.classList.contains('meleji-entry-pending')) {
      flushVisibleReveals(document);
    }
  }

  if (document.querySelector('.inner-page--foundation')) {
    import('./foundation-page.js').then((m) => m.initFoundationPage());
  }
}