/** Foundation landing hero – 3-slide rotation. */
export function initFoundationLandingHero() {
  const root = document.querySelector('[data-foundation-hero-slides]');
  if (!root) return;

  const slides = [...root.querySelectorAll('[data-foundation-hero-slide]')];
  const dots = [...document.querySelectorAll('[data-foundation-hero-go]')];
  if (!slides.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer = null;
  const INTERVAL = 5800;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const n = Number.parseInt(dot.dataset.foundationHeroGo ?? '0', 10);
      show(n);
      if (timer) window.clearInterval(timer);
      if (!reduced.matches) timer = window.setInterval(() => show(index + 1), INTERVAL);
    });
  });

  if (reduced.matches) return;

  timer = window.setInterval(() => show(index + 1), INTERVAL);

  root.addEventListener('mouseenter', () => {
    if (timer) window.clearInterval(timer);
  });
  root.addEventListener('mouseleave', () => {
    timer = window.setInterval(() => show(index + 1), INTERVAL);
  });
}

/** Foundation inner page – booking shell reveal and field focus polish. */
export function initFoundationPage() {
  initFoundationLandingHero();

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
