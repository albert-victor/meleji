(function () {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  var ENTRY_LOGO = '/brand/meleji-entry-logo.png';

  var navEntry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  var navIntent = sessionStorage.getItem('meleji:nav') === '1';
  var isReload = navEntry && navEntry.type === 'reload';
  var isBackForward = navEntry && navEntry.type === 'back_forward';

  if (navIntent || isReload) {
    document.documentElement.classList.add('meleji-entry-pending');
    if (navIntent) sessionStorage.removeItem('meleji:nav');
  }

  if (isBackForward) {
    document.documentElement.classList.remove('meleji-entry-pending');
  }

  function whenLogoReady(img, done) {
    if (!img) {
      done();
      return;
    }
    var finish = function () {
      img.classList.add('is-ready');
      done();
    };
    var decode = function () {
      if (img.decode) {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };
    if (img.complete && img.naturalWidth > 0) {
      decode();
      return;
    }
    img.addEventListener(
      'load',
      function () {
        decode();
      },
      { once: true },
    );
    img.addEventListener(
      'error',
      function () {
        finish();
      },
      { once: true },
    );
    if (!img.getAttribute('src')) {
      img.src = ENTRY_LOGO;
    }
  }

  function activateEntryShell() {
    if (!document.documentElement.classList.contains('meleji-entry-pending')) return;
    if (document.body && document.body.classList.contains('page--loading-preview')) {
      document.documentElement.classList.remove('meleji-entry-pending');
      return;
    }

    var el = document.getElementById('site-entry');
    if (!el) return;

    el.hidden = false;
    el.removeAttribute('aria-hidden');
    el.classList.add('is-active');

    var img = el.querySelector('.site-entry__logo');
    if (img && !img.getAttribute('src')) {
      img.src = ENTRY_LOGO;
    }

    whenLogoReady(img, function () {
      el.classList.add('is-logo-ready');
    });
  }

  function markInnerPending() {
    if (document.body && document.body.dataset.page) {
      document.documentElement.classList.add('meleji-inner-pending');
    }
    activateEntryShell();
  }

  if (document.body) markInnerPending();
  else document.addEventListener('DOMContentLoaded', markInnerPending, { once: true });
})();