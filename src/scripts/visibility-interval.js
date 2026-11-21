/**
 * Run setInterval only while `root` is near or in the viewport – cuts idle CPU/GPU work.
 * @param {Element} root
 * @param {() => void} callback
 * @param {number} ms
 * @returns {() => void} cleanup
 */
export function bindVisibleInterval(root, callback, ms) {
  if (!root || ms < 1) return () => {};

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timerId = null;

  const stop = () => {
    if (timerId != null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const start = () => {
    if (reduced.matches || document.hidden) return;
    stop();
    timerId = window.setInterval(callback, ms);
  };

  const onVisibility = () => {
    if (document.hidden) stop();
    else start();
  };

  if (!('IntersectionObserver' in window)) {
    start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.some((e) => e.isIntersecting);
      if (visible) start();
      else stop();
    },
    { root: null, rootMargin: '120px 0px', threshold: 0.02 }
  );

  io.observe(root);
  document.addEventListener('visibilitychange', onVisibility);
  if (typeof reduced.addEventListener === 'function') {
    reduced.addEventListener('change', () => {
      if (reduced.matches) stop();
    });
  }

  return () => {
    stop();
    io.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}