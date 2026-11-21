/** Stay cards – thumbnail rail swaps hero image without navigating. */
export function initAccommodationCards(root = document) {
  root.querySelectorAll('[data-stay-gallery]').forEach((gallery) => {
    const hero = gallery.querySelector('[data-stay-hero]');
    const thumbs = [...gallery.querySelectorAll('[data-stay-thumb]')];
    if (!hero || !thumbs.length) return;

    const setActive = (button) => {
      const src = button.dataset.staySrc;
      const alt = button.dataset.stayAlt;
      if (!src) return;
      hero.src = src;
      if (alt) hero.alt = alt;
      thumbs.forEach((t) => t.setAttribute('aria-selected', t === button ? 'true' : 'false'));
    };

    thumbs.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActive(button);
      });
      button.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          setActive(button);
        }
      });
    });
  });
}