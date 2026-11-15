import {
  HOME_IMAGES,
  HOME_IMAGE_SETS,
  HERO_SLIDES,
  OUTDOORS_ACTIVITY_SLIDES,
  EXPERIENCE_SAFARI_SLIDES_A,
  EXPERIENCE_SAFARI_SLIDES_B,
  FOUNDATION_COLLAGE_SLIDES,
} from '../data/home-images.js';

function hydrateHomeImages() {
  document.querySelectorAll('[data-home-img]').forEach((img) => {
    const key = img.dataset.homeImg;
    const src = HOME_IMAGES[key];
    if (!src) return;
    if (HOME_IMAGE_SETS[key]) {
      img.srcset = HOME_IMAGE_SETS[key];
      if (img.closest('.home-hero__slides')) {
        img.sizes = '(max-width: 899px) 100vw, 58vw';
      } else {
        img.sizes = img.closest('.story-scene__backdrop, .story-scene, .home-hero') ? '100vw' : '(max-width: 600px) 90vw, 50vw';
      }
    } else {
      img.removeAttribute('srcset');
    }
    img.src = src;
  });
}

function initHeaderScrollState() {
  const header = document.querySelector('[data-site-header]');
  if (!header || !document.body.classList.contains('page--home')) return;

  header.classList.remove('is-transparent');
  header.classList.add('is-hero-bar');
}

function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal], [data-collage], [data-outdoors-slide], [data-experience-safari], [data-foundation-collage]').forEach((el) => {
      el.classList.add('is-visible', 'is-alive');
    });
    return null;
  }

  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible', 'is-alive');
        reveal.unobserve(entry.target);
      }),
    { threshold: 0.14 }
  );

  document.querySelectorAll('[data-reveal], [data-collage], [data-outdoors-slide], [data-experience-safari], [data-foundation-collage]').forEach((el) =>
    reveal.observe(el)
  );
  return reduced;
}

function initHeroSlides() {
  const root = document.querySelector('[data-hero-slides]');
  const heroRoot = document.querySelector('[data-hero-root]');
  if (!root) return;

  const slides = [...root.querySelectorAll('.home-hero__photo[data-hero-index]')];
  const tabs = [...document.querySelectorAll('[data-hero-tabs] [data-hero-go]')];
  const floatShared = document.querySelector('[data-hero-float-img="shared"]');
  const floatOutdoor = document.querySelector('[data-hero-float-img="outdoor"]');
  if (!slides.length) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = slides.findIndex((img) => img.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer = null;
  let paused = false;
  const INTERVAL = 6200;

  const syncFloats = (slideIndex) => {
    const def = HERO_SLIDES[slideIndex];
    if (!def) return;
    const apply = (img, key, alt) => {
      if (!img || !key) return;
      if (img.dataset.heroFloatKey === key) return;
      const src = HOME_IMAGES[key];
      if (!src) return;
      const card = img.closest('.home-hero__float');
      card?.classList.add('is-img-changing');
      const settle = () => {
        card?.classList.remove('is-img-changing');
        img.removeEventListener('load', settle);
        img.removeEventListener('error', settle);
      };
      img.addEventListener('load', settle);
      img.addEventListener('error', settle);
      img.dataset.heroFloatKey = key;
      if (HOME_IMAGE_SETS[key]) {
        img.srcset = HOME_IMAGE_SETS[key];
        img.sizes = '(max-width: 899px) 44vw, 220px';
      } else {
        img.removeAttribute('srcset');
      }
      img.src = src;
      if (alt) img.alt = alt;
      window.setTimeout(settle, 900);
    };
    apply(floatShared, def.floatShared, def.floatSharedAlt);
    apply(floatOutdoor, def.floatOutdoor, def.floatOutdoorAlt);
  };

  const stage = document.querySelector('[data-hero-stage]');

  const setSlide = (next, { initial = false } = {}) => {
    index = (next + slides.length) % slides.length;
    if (!initial) {
      stage?.classList.add('is-hero-turn');
      window.setTimeout(() => stage?.classList.remove('is-hero-turn'), 1100);
    }
    slides.forEach((img, i) => {
      const active = i === index;
      img.classList.toggle('is-active', active);
      img.setAttribute('aria-hidden', active ? 'false' : 'true');
    });
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', selected ? 'true' : 'false');
      tab.tabIndex = selected ? 0 : -1;
    });
    syncFloats(index);
  };

  const stopAuto = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    if (reduced.matches || paused) return;
    timer = window.setInterval(() => setSlide(index + 1), INTERVAL);
  };

  const pause = () => {
    paused = true;
    stopAuto();
  };

  const resume = () => {
    paused = false;
    startAuto();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const go = Number(tab.dataset.heroGo);
      if (!Number.isNaN(go)) {
        setSlide(go);
        pause();
        window.setTimeout(resume, INTERVAL * 1.4);
      }
    });
  });

  heroRoot?.addEventListener('mouseenter', pause);
  heroRoot?.addEventListener('mouseleave', resume);
  heroRoot?.addEventListener('focusin', pause);
  heroRoot?.addEventListener('focusout', (event) => {
    if (heroRoot.contains(event.relatedTarget)) return;
    resume();
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) stopAuto();
    else startAuto();
  });

  setSlide(index, { initial: true });
  startAuto();
}

function initHeroEntrance() {
  const root = document.querySelector('[data-hero-root]');
  if (!root) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const run = () => {
    root.classList.add('is-hero-ready');
    if (reduced.matches) root.classList.add('is-hero-ready--static');
  };

  if (reduced.matches) {
    run();
    return;
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(run);
  });

}

function mountRotatingStage(stage, slideDefs) {
  if (!stage) return [];
  return slideDefs.map((slide) => {
    const img = document.createElement('img');
    img.src = HOME_IMAGES[slide.key];
    img.alt = slide.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1200;
    img.height = 900;
    stage.appendChild(img);
    return img;
  });
}

function initRotatingCollage(root, stageSelector, slideDefs, intervalMs = 4200, reducedQuery) {
  const stage = root?.querySelector(stageSelector);
  const imgs = mountRotatingStage(stage, slideDefs);
  if (!imgs.length) return;
  let index = 0;
  imgs[0].classList.add('is-active');

  if (reducedQuery?.matches) return;

  window.setInterval(() => {
    if (!root.classList.contains('is-alive') && !root.classList.contains('is-visible')) return;
    imgs[index].classList.remove('is-active');
    index = (index + 1) % imgs.length;
    imgs[index].classList.add('is-active');
  }, intervalMs);
}

function initExperienceSafariRotators(reducedQuery) {
  document.querySelectorAll('[data-experience-safari]').forEach((root) => {
    const set = root.dataset.experienceSafari === 'b' ? EXPERIENCE_SAFARI_SLIDES_B : EXPERIENCE_SAFARI_SLIDES_A;
    initRotatingCollage(root, '[data-exp-safari-stage]', set, 3800, reducedQuery);

    const inset = root.querySelector('[data-exp-safari-inset]');
    if (!inset) return;
    const insetSlides = set.filter((_, i) => i % 2 === 1);
    let insetIndex = 0;
    inset.src = HOME_IMAGES[insetSlides[0]?.key ?? set[1]?.key ?? set[0].key];
    inset.alt = insetSlides[0]?.alt ?? set[1]?.alt ?? set[0].alt;

    if (reducedQuery?.matches) return;

    window.setInterval(() => {
      if (!root.classList.contains('is-alive') && !root.classList.contains('is-visible')) return;
      insetIndex = (insetIndex + 1) % insetSlides.length;
      const slide = insetSlides[insetIndex];
      inset.src = HOME_IMAGES[slide.key];
      inset.alt = slide.alt;
    }, 3800);
  });
}

function initFoundationCollage(reducedQuery) {
  const root = document.querySelector('[data-foundation-collage]');
  if (!root) return;

  initRotatingCollage(root, '[data-foundation-stage]', FOUNDATION_COLLAGE_SLIDES, 4500, reducedQuery);

  const inset = root.querySelector('[data-foundation-inset]');
  if (!inset) return;
  let insetIndex = 1;
  const pickInset = (i) => FOUNDATION_COLLAGE_SLIDES[i % FOUNDATION_COLLAGE_SLIDES.length];
  const firstInset = pickInset(insetIndex);
  inset.src = HOME_IMAGES[firstInset.key];
  inset.alt = firstInset.alt;

  if (reducedQuery?.matches) return;

  window.setInterval(() => {
    if (!root.classList.contains('is-alive') && !root.classList.contains('is-visible')) return;
    insetIndex = (insetIndex + 2) % FOUNDATION_COLLAGE_SLIDES.length;
    const slide = pickInset(insetIndex);
    inset.src = HOME_IMAGES[slide.key];
    inset.alt = slide.alt;
  }, 4500);
}

function initOutdoorsAutoslide(reducedQuery) {
  const root = document.querySelector('[data-outdoors-slide]');
  const stage = root?.querySelector('[data-outdoors-main]');
  const inset = root.querySelector('[data-outdoors-inset]');
  const caption = root?.querySelector('[data-outdoors-caption]');
  const links = [...document.querySelectorAll('[data-outdoors-link]')];
  if (!root || !stage || !OUTDOORS_ACTIVITY_SLIDES.length) return;

  const slides = OUTDOORS_ACTIVITY_SLIDES.map((slide) => {
    const img = document.createElement('img');
    img.src = HOME_IMAGES[slide.key];
    img.alt = slide.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 1200;
    img.height = 1600;
    stage.appendChild(img);
    return img;
  });

  let index = 0;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    const slide = OUTDOORS_ACTIVITY_SLIDES[index];
    slides.forEach((img, i) => img.classList.toggle('is-active', i === index));
    if (inset && slide.insetKey) {
      inset.src = HOME_IMAGES[slide.insetKey];
      inset.alt = slide.alt;
    }
    if (caption) caption.textContent = slide.caption;
    links.forEach((link, i) => {
      const active = i === index;
      link.classList.toggle('is-active', active);
      link.setAttribute('aria-current', active ? 'true' : 'false');
    });
  };

  show(0);
  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      const go = Number(link.dataset.outdoorsIndex);
      if (Number.isNaN(go)) return;
      show(go);
    });
    link.addEventListener('mouseenter', () => {
      const go = Number(link.dataset.outdoorsIndex);
      if (!Number.isNaN(go)) show(go);
    });
  });

  if (reducedQuery?.matches) return;

  window.setInterval(() => {
    if (!root.classList.contains('is-alive') && !root.classList.contains('is-visible')) return;
    show(index + 1);
  }, 4600);
}

const HOME_STAY_CARD_IDS = ['stay-01', 'stay-05', 'stay-08', 'stay-10'];

function initHomeStayCards() {
  const mount = document.querySelector('[data-home-stay-carousel]');
  if (!mount) return;
  Promise.all([
    import('../data/published/accommodation-catalog.js'),
    import('../components/cards/accommodation-card.js'),
    import('./home-top-picks.js'),
  ]).then(([catalog, card, carousel]) => {
    const picks = HOME_STAY_CARD_IDS.map((id) => catalog.accommodationCatalog.find((r) => r.id === id)).filter(
      Boolean,
    );
    const slides = picks
      .map((room) => `<div class="home-top-carousel__slide" role="listitem">${card.renderAccommodationCard(room)}</div>`)
      .join('');
    carousel.mountCarousel(mount, slides, 'home-top-carousel--stay');
    carousel.initPeriodicCarousel(mount);
  });
}

export function initHome() {
  hydrateHomeImages();
  initHeaderScrollState();
  initHomeStayCards();
  import('./home-top-picks.js').then((m) => m.initHomeTopPicks());
  const reduced = initReveal();
  initHeroSlides();
  initHeroEntrance();
  initOutdoorsAutoslide(reduced);
  initExperienceSafariRotators(reduced);
  initFoundationCollage(reduced);

  const root = document.querySelector('[data-story]');
  if (!root) return;

  const scenes = [...root.querySelectorAll('[data-story-scene]')];
  const buttons = [...root.querySelectorAll('[data-story-select]')];
  const desktop = window.matchMedia('(min-width: 900px)');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let ticking = false;
  let enhanced = false;
  let carousel = false;

  function setScene(index) {
    active = Math.max(0, Math.min(scenes.length - 1, index));
    const layered = enhanced || carousel;
    scenes.forEach((scene, i) => {
      scene.classList.toggle('is-active', i === active);
      scene.inert = layered && i !== active;
      if (layered && i !== active) scene.setAttribute('aria-hidden', 'true');
      else scene.removeAttribute('aria-hidden');
    });
    buttons.forEach((button, i) => {
      if (i === active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    const count = root.querySelector('[data-story-count]');
    if (count) count.textContent = `0${active + 1} / 04`;
  }

  function syncScroll() {
    ticking = false;
    if (!enhanced) return;
    const top = root.getBoundingClientRect().top;
    const stage = root.querySelector('.home-story__stage');
    const header = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = root.offsetHeight - stage.offsetHeight;
    setScene(Math.floor(Math.max(0, Math.min(0.9999, (header - top) / Math.max(travel, 1))) * scenes.length));
  }

  function configure() {
    enhanced = desktop.matches && !motion.matches;
    carousel = !motion.matches && !enhanced;
    root.classList.toggle('is-enhanced', enhanced);
    root.classList.toggle('is-story-carousel', carousel);
    setScene(active);
    syncScroll();
  }

  function go(index) {
    const target = (index + scenes.length) % scenes.length;
    if (carousel) {
      setScene(target);
      return;
    }
    if (!enhanced) {
      scenes[target].scrollIntoView({ behavior: 'auto' });
      return;
    }
    const stage = root.querySelector('.home-story__stage');
    const header = parseFloat(getComputedStyle(stage).top) || 0;
    const travel = root.offsetHeight - stage.offsetHeight;
    const y = window.scrollY + root.getBoundingClientRect().top - header + travel * ((target + 0.12) / scenes.length);
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  buttons.forEach((button, i) => button.addEventListener('click', () => go(i)));
  root.querySelector('[data-story-prev]')?.addEventListener('click', () => go(active - 1));
  root.querySelector('[data-story-next]')?.addEventListener('click', () => go(active + 1));
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking && enhanced) {
        ticking = true;
        requestAnimationFrame(syncScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener('resize', configure);
  desktop.addEventListener('change', configure);
  motion.addEventListener('change', configure);
  configure();
}
