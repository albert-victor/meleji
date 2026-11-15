export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * @param {HTMLElement} container
 * @param {(event: KeyboardEvent) => void} onKeydown
 * @returns {() => void} detach
 */
export function bindFocusTrap(container, onKeydown) {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const getFocusable = () =>
    [...container.querySelectorAll(selector)].filter(
      (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
    );

  const handleKeydown = (event) => {
    if (event.key === 'Escape') {
      onKeydown(event);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = getFocusable();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  container.addEventListener('keydown', handleKeydown);
  return () => container.removeEventListener('keydown', handleKeydown);
}
