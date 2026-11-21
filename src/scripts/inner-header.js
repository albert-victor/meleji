/** Transparent fixed header over cinematic hero; solid cream bar after scroll. */
export function initCinematicHeaderScroll() {
  const header = document.querySelector('[data-site-header]');
  if (!header || !document.body.classList.contains('page--cinematic-hero')) return;

  const hero = document.querySelector('.page-hero--cinematic, .page-hero--landscape');
  if (!hero) return;

  header.classList.add('is-cinematic-dock');

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealAt = () => Math.min(hero.offsetHeight * 0.12, 120);

  let ticking = false;

  const apply = () => {
    const scrolled = window.scrollY > revealAt();
    header.classList.toggle('is-scrolled', scrolled);
    header.classList.toggle('is-over-hero', !scrolled);
    ticking = false;
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    if (reduced) {
      apply();
    } else {
      window.requestAnimationFrame(apply);
    }
  };

  apply();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}