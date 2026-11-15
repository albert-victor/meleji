/** Foundation inner page — booking shell reveal and field focus polish. */
export function initFoundationPage() {
  const shell = document.querySelector('[data-foundation-booking]');
  if (!shell) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches) {
    shell.classList.add('is-ready');
    return;
  }

  const show = () => {
    shell.classList.add('is-ready');
    observer.disconnect();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) show();
    },
    { threshold: 0.2 },
  );

  observer.observe(shell);

  shell.querySelectorAll('.form-field input, .form-field textarea, .form-field select').forEach((el) => {
    el.addEventListener('focus', () => shell.classList.add('is-engaged'));
    el.addEventListener('blur', () => {
      if (!shell.contains(document.activeElement)) shell.classList.remove('is-engaged');
    });
  });
}
