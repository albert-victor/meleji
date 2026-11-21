/** Site-wide scroll reveal – elegant popup scale (see docs/scroll-reveal-rollback.md). */

export const REVEAL_SELECTORS =
  '[data-reveal], [data-outdoors-slide], [data-experience-safari], [data-foundation-collage]';

const LANDING_SELECTORS =
  '.page-hero [data-reveal], .detail-hero [data-reveal], .home-hero [data-reveal], .intro-collage[data-reveal], .home-story__stage[data-reveal], .foundation-landing-hero [data-reveal]';

let revealObserver = null;
const observed = new WeakSet();

function markVisible(el) {
  el.classList.add('is-visible', 'is-alive');
}

function markHidden(el) {
  el.classList.remove('is-visible', 'is-alive');
}

export function scheduleReveal(el) {
  if (!el?.isConnected) return;
  if (el.classList.contains('is-visible')) return;
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (!el.isConnected) return;
      markVisible(el);
    });
  });
}

function isInRevealViewport(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.bottom > vh * 0.04 && rect.top < vh * 0.96;
}

/**
 * Reveal anything already on screen (landing / above the fold) after mount.
 * @param {ParentNode} [root]
 */
export function flushVisibleReveals(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scope = root instanceof Document ? root : root;
  scope.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
    if (isInRevealViewport(el)) scheduleReveal(el);
  });
}

/** Re-run visible reveals after site-entry unlock (content was hidden during first pass). */
export function refreshRevealsAfterSiteEntry(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scope = root instanceof Document ? root : root;
  scope.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
    if (!isInRevealViewport(el)) return;
    if (el.classList.contains('is-visible')) {
      markHidden(el);
      void el.offsetWidth;
    }
    scheduleReveal(el);
  });
}

/**
 * Stagger popup for hero / landing stacks when a page opens.
 * @param {ParentNode} [root]
 */
export function revealLandingStack(root = document) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const scope = root instanceof Document ? root : root;
  const nodes = scope.querySelectorAll(LANDING_SELECTORS);
  nodes.forEach((el, index) => {
    el.style.setProperty('--reveal-delay', String(Math.min(index, 5)));
    window.setTimeout(() => scheduleReveal(el), 50 + index * 90);
  });
}

export function initScrollRevealObserver() {
  document.documentElement.classList.add('reveal-ready');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll(REVEAL_SELECTORS).forEach(markVisible);
    return null;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.06) {
            scheduleReveal(el);
            return;
          }
          if (!entry.isIntersecting || entry.intersectionRatio < 0.02) {
            markHidden(el);
          }
        });
      },
      {
        root: null,
        rootMargin: '6% 0px -4% 0px',
        threshold: [0, 0.02, 0.06, 0.12, 0.2, 0.35],
      },
    );
  }

  observeRevealTargets(document);
  return revealObserver;
}

/**
 * @param {ParentNode} root
 * @returns {Element[]}
 */
function collectRevealTargets(root) {
  if (!root) return [];
  /** @type {Element[]} */
  const nodes = [];
  if (root instanceof Element && root.matches(REVEAL_SELECTORS)) {
    nodes.push(root);
  }
  root.querySelectorAll(REVEAL_SELECTORS).forEach((el) => nodes.push(el));
  return nodes;
}

/**
 * Observe new [data-reveal] nodes (e.g. after carousels mount on the homepage).
 * Includes `root` when it matches – `querySelectorAll` does not return the root element.
 * @param {ParentNode} [root]
 */
export function observeRevealTargets(root = document) {
  if (!root) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  collectRevealTargets(root).forEach((el) => {
    if (reduced) {
      markVisible(el);
      return;
    }
    if (!revealObserver) {
      if (isInRevealViewport(el)) scheduleReveal(el);
      return;
    }
    if (observed.has(el)) return;
    observed.add(el);
    revealObserver.observe(el);
    if (isInRevealViewport(el)) scheduleReveal(el);
  });
}