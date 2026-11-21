import logoUrl from '../assets/images/brand/new_logo.png';

const STYLE_DURATIONS = {
  n1: 3200,
  n2: 3800,
  n3: 3300,
  n4: 3400,
  n5: 2600,
  n6: 3300,
};

function setLogos(root) {
  root.querySelectorAll('[data-load-logo], [data-load-logo-fs]').forEach((img) => {
    img.src = logoUrl;
    img.alt = '';
  });
}

function replayLoader(loader) {
  if (!loader) return;
  loader.classList.remove('is-playing', 'is-done');
  void loader.offsetWidth;
  loader.classList.add('is-playing');

  const key = loader.dataset.loader;
  const ms = STYLE_DURATIONS[key] || 3000;

  window.setTimeout(() => {
    loader.classList.remove('is-playing');
    loader.classList.add('is-done');
  }, ms);
}

function playFullscreen(id) {
  const overlay = document.querySelector(`[data-loader-fs="${id}"]`);
  if (!overlay) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  overlay.hidden = false;
  overlay.inert = false;
  overlay.removeAttribute('aria-hidden');
  document.body.classList.add('is-load-screen');

  overlay.classList.remove('is-playing', 'is-done');
  void overlay.offsetWidth;
  overlay.classList.add('is-playing');

  const finish = () => {
    overlay.classList.remove('is-playing');
    overlay.classList.add('is-done');
    document.body.classList.remove('is-load-screen');
    window.setTimeout(() => {
      if (!overlay.classList.contains('is-playing')) {
        overlay.hidden = true;
        overlay.inert = true;
        overlay.setAttribute('aria-hidden', 'true');
        overlay.classList.remove('is-done');
      }
    }, reduced ? 50 : 850);
  };

  if (reduced) {
    finish();
    return;
  }

  window.setTimeout(finish, STYLE_DURATIONS[id] || 3200);
}

export function initLoadingPreview() {
  const root = document.querySelector('[data-loading-preview]');
  if (!root) return;

  setLogos(document);

  root.querySelectorAll('[data-loader]').forEach((loader) => replayLoader(loader));

  root.querySelectorAll('[data-replay]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.replay;
      const card = root.querySelector(`[data-preview-style="${id}"]`);
      const loader = card?.querySelector('[data-loader]');
      if (loader) {
        loader.classList.remove('is-done');
        replayLoader(loader);
      }
    });
  });

  root.querySelectorAll('[data-play-fullscreen]').forEach((btn) => {
    btn.addEventListener('click', () => playFullscreen(btn.dataset.playFullscreen));
  });
}