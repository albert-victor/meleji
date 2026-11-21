import { HOME_IMAGES } from '../data/home-images.js';

const DEMOS = {
  picked: {
    label: 'Your picks',
    slug: 'scroll-picked',
    description: 'Fade left kwa copy · Elegant scale kwenye listings.',
  },
  'fade-up': {
    label: 'Fade + up',
    slug: 'scroll-fade-up',
    description: 'Opacity + slide juu kidogo (landing-style).',
  },
  'fade-in': {
    label: 'Fade in',
    slug: 'scroll-fade-in',
    description: 'Opacity tu – hakuna hoja, elegant na polepole.',
  },
  'fade-left': {
    label: 'Fade + left',
    slug: 'scroll-fade-left',
    description: 'Inaingia kutoka kushoto (intensity juu).',
  },
  'fade-right': {
    label: 'Fade + right',
    slug: 'scroll-fade-right',
    description: 'Inaingia kutoka kulia.',
  },
  'fade-down': {
    label: 'Fade + down',
    slug: 'scroll-fade-down',
    description: 'Inashuka kidogo kutoka juu.',
  },
  'fade-soft': {
    label: 'Fade + blur',
    slug: 'scroll-fade-soft',
    description: 'Fade laini na blur ndogo inayopotea.',
  },
  popup: {
    label: 'Elegant scale',
    slug: 'scroll-popup',
    description: 'Listings-style scale – polepole, intensity juu.',
  },
};

const LISTINGS = [
  {
    img: 'landscape',
    eyebrow: 'Destination',
    title: 'Serengeti National Park',
    text: 'Open plains and migration routes with room nights in Arusha.',
    foot: 'Safari packages',
  },
  {
    img: 'waterfall',
    eyebrow: 'Day trip',
    title: 'Materuni Waterfalls',
    text: 'Forest walk, coffee on the way back to town.',
    foot: 'Enquire dates',
  },
  {
    img: 'actGame1',
    eyebrow: 'Activity',
    title: 'Game drives',
    text: 'Morning and afternoon drives when parks fit your stay.',
    foot: 'View activities',
  },
  {
    img: 'actCoffee1',
    eyebrow: 'Experience',
    title: 'Coffee plantation',
    text: 'From cherry to cup with hosts outside the city.',
    foot: 'Half-day tour',
  },
  {
    img: 'momentLake',
    eyebrow: 'Destination',
    title: 'Lake Duluti',
    text: 'Calm water and canoe mornings close to Arusha.',
    foot: 'Day trip',
  },
  {
    img: 'actMigration1',
    eyebrow: 'Seasonal',
    title: 'Great migration',
    text: 'Routes and timing when herds are on the move.',
    foot: 'Plan route',
  },
];

function variantFromBody() {
  const key = document.body.dataset.scrollVariant;
  return DEMOS[key] ? key : 'fade-up';
}

function revealAttrs(variant, role, delay) {
  const style = `style="--reveal-delay: ${delay}"`;
  if (variant === 'picked') {
    const mode = role === 'listing' ? 'scale' : 'left';
    return `data-scroll-reveal data-scroll-reveal-mode="${mode}" ${style}`;
  }
  if (variant === 'fade-left') {
    return `data-scroll-reveal data-scroll-reveal-mode="left" ${style}`;
  }
  if (variant === 'popup') {
    return `data-scroll-reveal data-scroll-reveal-mode="scale" ${style}`;
  }
  return `data-scroll-reveal ${style}`;
}

function renderListings(variant) {
  return LISTINGS.map(
    (item, index) => `
      <article class="scroll-demo-listing" ${revealAttrs(variant, 'listing', index)}>
        <div class="scroll-demo-listing__media">
          <img data-scroll-demo-img="${item.img}" alt="" width="1200" height="900" loading="lazy" decoding="async" />
        </div>
        <div class="scroll-demo-listing__body">
          <p class="scroll-demo-listing__eyebrow">${item.eyebrow}</p>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
          <div class="scroll-demo-listing__foot">
            <span>${item.foot}</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </article>
    `
  ).join('');
}

function hydrateImages() {
  document.querySelectorAll('[data-scroll-demo-img]').forEach((img) => {
    const key = img.dataset.scrollDemoImg;
    const src = HOME_IMAGES[key];
    if (src) img.src = src;
  });
}

function mountLayout() {
  const root = document.querySelector('[data-scroll-demo-mount]');
  if (!root) return;

  const variant = variantFromBody();
  const info = DEMOS[variant];
  const isLarge = document.body.classList.contains('page--scroll-demo--large');
  const sizeNote = isLarge ? ' · <span class="scroll-demo-banner__choice">Large preview</span>' : '';

  const links = Object.entries(DEMOS)
    .map(([key, demo]) => {
      const current = key === variant ? ' aria-current="page"' : '';
      return `<li><a href="/pages/demos/${demo.slug}/"${current}>${demo.label}</a></li>`;
    })
    .join('');

  const listingsHtml = renderListings(variant);

  root.innerHTML = `
    <div class="scroll-demo-banner">
      <div class="container scroll-demo-banner__inner">
        <span class="scroll-demo-banner__tag"><i class="fa-solid fa-flask" aria-hidden="true"></i> Scroll demo</span>
        <p><strong>${info.label}</strong> – ${info.description}${sizeNote}</p>
        <nav aria-label="Switch scroll demo style">
          <ul class="scroll-demo-switcher">${links}</ul>
        </nav>
      </div>
    </div>

    <section class="scroll-demo-hero" aria-labelledby="scroll-demo-hero-title">
      <div class="container scroll-demo-hero__grid">
        <div>
          <p class="scroll-demo-hero__eyebrow">Meleji Homestays · Demo layout</p>
          <h1 id="scroll-demo-hero-title">Scroll chini – hasa <em>listings</em></h1>
          <p class="scroll-demo-hero__lead">Ukurasa huu umeongezewa ukubwa na nguvu ya animation ili uone wazi tofauti kati ya copy na kadi za safari/destination.</p>
        </div>
        <div class="scroll-demo-hero__media" aria-hidden="true">
          <img data-scroll-demo-img="intro" alt="" width="1080" height="810" decoding="async" />
        </div>
      </div>
    </section>

    <section class="scroll-demo-section container scroll-demo-split" aria-labelledby="scroll-demo-intro">
      <div class="scroll-demo-split__img" ${revealAttrs(variant, 'editorial', 0)}>
        <img data-scroll-demo-img="expCoffee" alt="Coffee at Meleji Homestays" width="1080" height="810" loading="lazy" decoding="async" />
      </div>
      <div ${revealAttrs(variant, 'editorial', 1)}>
        <p class="scroll-demo-hero__eyebrow">About Meleji</p>
        <h2 id="scroll-demo-intro">Your place in Arusha</h2>
        <p>Put your bags down. Have a cup of coffee. Take a moment to settle in.</p>
        <p>Meleji brings together comfortable rooms, local food and a personal way to explore Tanzania.</p>
      </div>
    </section>

    <section class="scroll-demo-section scroll-demo-section--alt" aria-labelledby="scroll-demo-listings-title">
      <div class="container">
        <div class="scroll-demo-section__head scroll-demo-section__head--listing" ${revealAttrs(variant, 'editorial', 0)}>
          <p class="scroll-demo-hero__eyebrow">Listings</p>
          <h2 id="scroll-demo-listings-title">Safari &amp; destinations grid</h2>
          <p class="scroll-demo-hero__lead" style="max-width: 52ch; margin-top: var(--space-3);">Kadi sita – stagger kubwa ili uone animation kwenye kila listing. ${
            variant === 'picked'
              ? 'Hapa: <strong>elegant scale</strong>. Copy juu: <strong>fade left</strong>.'
              : variant === 'popup'
                ? 'Zote zinaingia kwa <strong>elegant scale</strong>.'
                : variant === 'fade-left'
                  ? 'Zote zinaingia kwa <strong>fade left</strong>.'
                  : 'Scroll polepole ili kila kadi iingie moja baada ya nyingine.'
          }</p>
        </div>
        <div class="scroll-demo-listings">
          ${listingsHtml}
        </div>
      </div>
    </section>

    <section class="scroll-demo-section container" aria-labelledby="scroll-demo-cards-title">
      <div class="scroll-demo-section__head" ${revealAttrs(variant, 'editorial', 0)}>
        <p class="scroll-demo-hero__eyebrow">Experiences</p>
        <h2 id="scroll-demo-cards-title">Supporting cards</h2>
      </div>
      <div class="scroll-demo-cards">
        <article class="scroll-demo-card" ${revealAttrs(variant, 'editorial', 0)}>
          <i class="fa-solid fa-mug-hot" aria-hidden="true"></i>
          <h3>Coffee</h3>
          <p>From the homestay cup to plantation walks in the hills.</p>
        </article>
        <article class="scroll-demo-card" ${revealAttrs(variant, 'editorial', 1)}>
          <i class="fa-solid fa-binoculars" aria-hidden="true"></i>
          <h3>Safaris</h3>
          <p>Routes when you are ready to leave town for parks and crater.</p>
        </article>
        <article class="scroll-demo-card" ${revealAttrs(variant, 'editorial', 2)}>
          <i class="fa-solid fa-hand-holding-heart" aria-hidden="true"></i>
          <h3>Community</h3>
          <p>Learn about the foundation and ways to give back while you stay.</p>
        </article>
      </div>
    </section>

    <section class="scroll-demo-section scroll-demo-section--alt container scroll-demo-split" aria-labelledby="scroll-demo-rooms">
      <div ${revealAttrs(variant, 'editorial', 0)}>
        <p class="scroll-demo-hero__eyebrow">Stay</p>
        <h2 id="scroll-demo-rooms">Find your room</h2>
        <p>Comfortable accommodation in Arusha – shared and private options for different budgets.</p>
      </div>
      <div class="scroll-demo-split__img" ${revealAttrs(variant, 'editorial', 1)}>
        <img data-scroll-demo-img="roomDeluxe" alt="Deluxe room at Meleji Homestays" width="1280" height="960" loading="lazy" decoding="async" />
      </div>
    </section>

    <div class="scroll-demo-cta" ${revealAttrs(variant, 'editorial', 0)}>
      <h2>Book your stay</h2>
      <p>CTA kubwa – scroll hadi hapa uone animation kwenye kipande kirefu.</p>
      <a class="btn btn--primary btn--round" href="/pages/booking/"><span class="btn__clip"><span class="btn__label">Book Your Stay</span></span></a>
    </div>

    <p class="scroll-demo-note container">
      Ukurasa: <code>/pages/demos/${info.slug}/</code> · Intensity: <code>${document.body.classList.contains('page--scroll-demo--intense') ? 'high' : 'default'}</code>
    </p>
  `;
}

function initScrollReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const targets = () => document.querySelectorAll('[data-scroll-reveal]');

  if (reduced.matches || !('IntersectionObserver' in window)) {
    targets().forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const intense = document.body.classList.contains('page--scroll-demo--intense');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    intense
      ? { root: null, rootMargin: '0px 0px -14% 0px', threshold: 0.05 }
      : { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );

  targets().forEach((el) => observer.observe(el));
}

export function initScrollDemo() {
  mountLayout();
  hydrateImages();
  initScrollReveal();
}