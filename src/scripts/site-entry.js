import { SITE_ENTRY_LOGO_SRC, whenSiteEntryLogoReady } from './site-entry-logo.js';

const NAV_KEY = 'meleji:nav';
const MIN_VISIBLE_MS = 920;

let overlayEl = null;
let shown = false;
let shownAt = 0;
let logoReadyPromise = null;

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isPreviewPage() {
  return document.body.classList.contains('page--loading-preview');
}

function shouldShowEntry() {
  if (prefersReducedMotion() || isPreviewPage()) return false;
  return document.documentElement.classList.contains('meleji-entry-pending');
}

function ensureOverlay() {
  if (overlayEl) return overlayEl;

  overlayEl = document.getElementById('site-entry');
  if (!overlayEl) {
    overlayEl = document.createElement('div');
    overlayEl.id = 'site-entry';
    overlayEl.className = 'site-entry';
    overlayEl.setAttribute('role', 'status');
    overlayEl.setAttribute('aria-live', 'polite');
    overlayEl.setAttribute('aria-label', 'Loading Meleji Homestays');
    overlayEl.innerHTML = `
      <div class="site-entry__cream"></div>
      <div class="site-entry__stack">
        <div class="site-entry__logo-wrap">
          <img class="site-entry__logo" src="${SITE_ENTRY_LOGO_SRC}" alt="" width="512" height="512" decoding="async" fetchpriority="high" loading="eager" />
        </div>
        <div class="site-entry__dots" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>`;
    document.body.prepend(overlayEl);
  }

  const img = overlayEl.querySelector('.site-entry__logo');
  if (img && !img.getAttribute('src')) {
    img.src = SITE_ENTRY_LOGO_SRC;
  }

  return overlayEl;
}

function ensureLogoReady() {
  if (!logoReadyPromise) {
    const el = ensureOverlay();
    const img = el.querySelector('.site-entry__logo');
    if (img && !img.getAttribute('src')) img.src = SITE_ENTRY_LOGO_SRC;
    logoReadyPromise = whenSiteEntryLogoReady(img);
  }
  return logoReadyPromise;
}

export function showSiteEntryIfNeeded() {
  if (shown) return;

  if (!shouldShowEntry()) {
    releasePageShell();
    return;
  }

  if (!document.body) return;

  shown = true;
  shownAt = performance.now();

  const el = ensureOverlay();
  el.hidden = false;
  el.removeAttribute('aria-hidden');
  el.classList.remove('is-leaving');
  el.classList.add('is-active');

  document.documentElement.classList.add('meleji-entry-active');
  document.body.classList.add('is-site-entry');
  window.scrollTo(0, 0);

  ensureLogoReady().then(() => {
    if (!overlayEl) return;
    overlayEl.classList.add('is-logo-ready');
  });
}

export function dismissSiteEntry() {
  if (!shown) {
    releasePageShell();
    return;
  }

  const reduced = prefersReducedMotion();
  const elapsed = performance.now() - shownAt;
  const delay = reduced ? 0 : Math.max(0, MIN_VISIBLE_MS - elapsed);

  const runDismiss = () => {
    if (!overlayEl) {
      releasePageShell();
      shown = false;
      return;
    }

    const finish = () => {
      overlayEl.classList.remove('is-active', 'is-leaving', 'is-logo-ready');
      overlayEl.hidden = true;
      overlayEl.setAttribute('aria-hidden', 'true');
      const img = overlayEl.querySelector('.site-entry__logo');
      img?.classList.remove('is-ready');
      document.body.classList.remove('is-site-entry');
      releasePageShell();
      shown = false;
      window.scrollTo(0, 0);
    };

    if (reduced) {
      finish();
      return;
    }

    overlayEl.classList.add('is-leaving');
    window.setTimeout(finish, 460);
  };

  ensureLogoReady().finally(() => {
    window.setTimeout(runDismiss, delay);
  });
}

function releasePageShell() {
  document.documentElement.classList.remove('meleji-entry-pending', 'meleji-entry-active', 'meleji-inner-pending');
  document.body.classList.remove('is-site-entry');
}

function isSamePageHash(href) {
  try {
    const url = new URL(href, window.location.href);
    return (
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      Boolean(url.hash)
    );
  } catch {
    return false;
  }
}

function shouldMarkNav(a) {
  if (a.hasAttribute('download')) return false;
  if (a.target === '_blank' || a.target === '_top') return false;
  const href = a.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
    return false;
  }
  if (isSamePageHash(href)) return false;

  try {
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin) return false;
    if (url.pathname === window.location.pathname && !url.hash && url.search === window.location.search) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function initSiteEntryNav() {
  if (prefersReducedMotion()) return;

  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const a = event.target.closest('a[href]');
      if (!a || !shouldMarkNav(a)) return;
      sessionStorage.setItem(NAV_KEY, '1');
    },
    true,
  );

  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      sessionStorage.removeItem(NAV_KEY);
      releasePageShell();
      if (overlayEl) {
        overlayEl.classList.remove('is-active', 'is-leaving', 'is-logo-ready');
        overlayEl.hidden = true;
        overlayEl.querySelector('.site-entry__logo')?.classList.remove('is-ready');
      }
      shown = false;
      logoReadyPromise = null;
      window.scrollTo(0, 0);
    }
  });
}