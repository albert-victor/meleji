let detachKeys = null;

export function initNavigation() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-site-menu]');
  const overlay = document.querySelector('[data-menu-overlay]');

  if (!toggle || !menu || !overlay) return;

  const label = toggle.querySelector('.visually-hidden');
  menu.inert = true;

  const focusSelector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getMenuFocusable = () =>
    [...menu.querySelectorAll(focusSelector)].filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );

  const setToggleLabel = (open) => {
    if (label) label.textContent = open ? 'Close menu' : 'Open menu';
  };

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
    setToggleLabel(true);
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menu.inert = false;
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('is-visible'));
    document.body.classList.add('is-menu-open');

    const firstLink = menu.querySelector('[data-menu-link]');
    if (firstLink) firstLink.focus();

    const onKeydown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getMenuFocusable();
      if (!items.length) return;

      /* Cycle through menu links and the morphing hamburger/X */
      const ring = [...items, toggle];
      const current = document.activeElement;
      const index = ring.indexOf(current);

      if (event.shiftKey) {
        if (current === ring[0] || index === -1) {
          event.preventDefault();
          ring[ring.length - 1].focus();
        } else if (current === toggle) {
          event.preventDefault();
          ring[ring.length - 2].focus();
        }
      } else if (current === toggle || index === ring.length - 2) {
        event.preventDefault();
        if (current === toggle) ring[0].focus();
        else toggle.focus();
      }
    };

    document.addEventListener('keydown', onKeydown);
    detachKeys = () => document.removeEventListener('keydown', onKeydown);
  };

  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    setToggleLabel(false);
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menu.inert = true;
    overlay.classList.remove('is-visible');
    document.body.classList.remove('is-menu-open');
    if (detachKeys) {
      detachKeys();
      detachKeys = null;
    }
    window.setTimeout(() => {
      if (toggle.getAttribute('aria-expanded') === 'false') overlay.hidden = true;
    }, 520);
    toggle.focus();
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  menu.querySelectorAll('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });
}
