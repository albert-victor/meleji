import { liveDestinations } from '../data/published/destinations.js';
import { liveSafariPackages } from '../data/published/packages.js';
import { renderDestinationCard } from '../components/cards/destination-card.js';
import { renderSafariPackageCard } from '../components/cards/package-card.js';

const CAROUSEL_INTERVAL_MS = 5000;
const HOME_PACKAGE_COUNT = 10;

const TOP_DESTINATION_SLUGS = [
  'tarangire-national-park',
  'ngorongoro-crater',
  'mount-kilimanjaro-national-park',
  'serengeti-national-park',
  'lake-manyara-national-park',
  'arusha-national-park',
];

const PRIORITY_PACKAGE_SLUGS = [
  '5-days-tarangire-serengeti-ngorongoro-lake-manyara-safari',
  '3-days-to-ngorongoro-crater-tarangire-lake-manyara-national-parks',
  'day-trip-to-tarangire-national-park',
  '4-days-to-serengeti-national-park-and-ngorongoro-crater',
  'day-trip-to-materuni-waterfalls-and-coffee-tour',
  'arusha-city-tour',
  '6-days-tarangire-serengeti-and-ngorongoro-crater-safari',
  'day-trip-to-lake-manyara-national-park',
  '4-days-kilimanjaro-trek-via-machame-route',
  '2-days-to-lake-manyara-national-park-ngorongoro-crater',
];

function pickBySlugs(list, slugs) {
  return slugs.map((slug) => list.find((item) => item.slug === slug)).filter(Boolean);
}

function pickHomePackages() {
  const picked = pickBySlugs(liveSafariPackages, PRIORITY_PACKAGE_SLUGS);
  const used = new Set(picked.map((p) => p.slug));
  if (picked.length < HOME_PACKAGE_COUNT) {
    const rest = liveSafariPackages.filter((p) => !used.has(p.slug));
    for (const pkg of rest) {
      if (picked.length >= HOME_PACKAGE_COUNT) break;
      picked.push(pkg);
      used.add(pkg.slug);
    }
  }
  return picked.slice(0, HOME_PACKAGE_COUNT);
}

function wrapCarouselSlide(html) {
  return `<div class="home-top-carousel__slide" role="listitem">${html}</div>`;
}

export function mountCarousel(root, slidesHtml, modifierClass = '') {
  if (!root || !slidesHtml) return;
  const slideCount = (slidesHtml.match(/home-top-carousel__slide/g) || []).length;
  root.className = `home-top-carousel ${modifierClass}`.trim();
  root.dataset.slideCount = String(slideCount);
  root.innerHTML = `
    <div class="home-top-carousel__shell">
      <button type="button" class="home-top-carousel__nav home-top-carousel__nav--prev" aria-label="Previous cards">
        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <div class="home-top-carousel__viewport">
        <div class="home-top-carousel__track" role="list">${slidesHtml}</div>
      </div>
      <button type="button" class="home-top-carousel__nav home-top-carousel__nav--next" aria-label="Next cards">
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
    <div class="home-top-carousel__status">
      <div class="home-top-carousel__dots" role="tablist" aria-label="Carousel slides"></div>
    </div>`;
}

function visibleSlideCount(viewport) {
  const w = viewport.clientWidth;
  if (w < 480) return 1;
  if (w < 900) return 2;
  return 3;
}

export function initPeriodicCarousel(carouselRoot) {
  const viewport = carouselRoot.querySelector('.home-top-carousel__viewport');
  const track = carouselRoot.querySelector('.home-top-carousel__track');
  const dotsRoot = carouselRoot.querySelector('.home-top-carousel__dots');
  const prevBtn = carouselRoot.querySelector('.home-top-carousel__nav--prev');
  const nextBtn = carouselRoot.querySelector('.home-top-carousel__nav--next');
  if (!viewport || !track) return;

  const slides = [...track.children];
  if (slides.length <= 1) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let timerId = null;

  const maxIndex = () => {
    const visible = visibleSlideCount(viewport);
    return Math.max(0, slides.length - visible);
  };

  const renderDots = () => {
    if (!dotsRoot) return;
    const cap = maxIndex() + 1;
    dotsRoot.innerHTML = Array.from({ length: cap }, (_, i) => {
      const active = i === index ? ' is-active' : '';
      return `<button type="button" class="home-top-carousel__dot${active}" role="tab" aria-selected="${i === index ? 'true' : 'false'}" aria-label="Show slide ${i + 1} of ${cap}" data-dot-index="${i}"></button>`;
    }).join('');
    dotsRoot.querySelectorAll('[data-dot-index]').forEach((btn) => {
      btn.addEventListener('click', () => {
        index = Number(btn.getAttribute('data-dot-index')) || 0;
        apply();
        renderDots();
        resume();
      });
    });
  };

  const apply = () => {
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const step = slideWidth + gap;
    track.style.transform = `translate3d(${-index * step}px, 0, 0)`;
    carouselRoot.classList.add('home-top-carousel--live');
    carouselRoot.dataset.carouselIndex = String(index);
  };

  const advance = (delta = 1) => {
    const cap = maxIndex();
    if (delta > 0) {
      index = index >= cap ? 0 : index + 1;
    } else {
      index = index <= 0 ? cap : index - 1;
    }
    apply();
    renderDots();
  };

  const pause = () => {
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  };

  const resume = () => {
    if (reducedMotion) return;
    pause();
    timerId = window.setInterval(() => advance(1), CAROUSEL_INTERVAL_MS);
  };

  const onResize = () => {
    const cap = maxIndex();
    if (index > cap) index = 0;
    apply();
    renderDots();
  };

  apply();
  renderDots();
  resume();

  prevBtn?.addEventListener('click', () => {
    advance(-1);
    resume();
  });
  nextBtn?.addEventListener('click', () => {
    advance(1);
    resume();
  });

  carouselRoot.addEventListener('mouseenter', pause);
  carouselRoot.addEventListener('mouseleave', resume);
  carouselRoot.addEventListener('focusin', pause);
  carouselRoot.addEventListener('focusout', (event) => {
    if (!carouselRoot.contains(event.relatedTarget)) resume();
  });

  window.addEventListener('resize', onResize, { passive: true });
}

export function initHomeTopPicks() {
  const destMount = document.querySelector('[data-home-top-destinations]');
  const pkgMount = document.querySelector('[data-home-top-packages]');
  if (!destMount && !pkgMount) return;

  const destinations = pickBySlugs(liveDestinations, TOP_DESTINATION_SLUGS);
  const packages = pickHomePackages();

  if (destMount && destinations.length) {
    const slides = destinations
      .map((d, i) => wrapCarouselSlide(renderDestinationCard(d, { compact: true, index: i })))
      .join('');
    mountCarousel(destMount, slides, 'home-top-carousel--dest');
    initPeriodicCarousel(destMount);
  }

  if (pkgMount && packages.length) {
    const slides = packages
      .map((p, i) => wrapCarouselSlide(renderSafariPackageCard(p, { index: i })))
      .join('');
    mountCarousel(pkgMount, slides, 'home-top-carousel--packages');
    initPeriodicCarousel(pkgMount);
  }
}