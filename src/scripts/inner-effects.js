/** Scroll reveal for inner pages (same pattern as homepage). */
export function initInnerEffects() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-collage]').forEach((el) => {
      el.classList.add('is-visible', 'is-alive');
    });
    return;
  }

  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible', 'is-alive');
        reveal.unobserve(entry.target);
      }),
    { threshold: 0.12 },
  );

  document.querySelectorAll('[data-reveal], [data-collage]').forEach((el) => reveal.observe(el));

  if (document.querySelector('.inner-page--foundation')) {
    import('./foundation-page.js').then((m) => m.initFoundationPage());
  }
}
