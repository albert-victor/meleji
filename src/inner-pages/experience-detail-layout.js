import { renderDetailEditorialHero, collageImagesFromEntity } from '../components/detail-hero.js';
import { renderEnquiryRedirectPanel } from '../components/enquiry-redirect.js';
import { buildContactHref } from '../utils/contact-routes.js';
import { renderEditorialSplit } from '../components/editorial-split.js';
import { renderExperienceCard, renderCardGrid } from '../components/cards/index.js';
import { publishedExperiences } from '../data/published/experiences.js';
import {
  COFFEE_JOURNEY_STEPS,
  CULTURE_DETAIL,
  FOOD_DISH_NOTES,
  FOOD_EXPERIENCE_IMAGES,
  FOOD_PRICING_NOTES,
  NATURE_DETAIL,
} from '../data/experience-detail-content.js';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import intro from '../assets/images/optimized/intro-1600.webp';
import fieldImg from '../assets/images/accommodation/I_the_field.jpg';
import { renderExperiencePricingList } from '../components/experience-pricing.js';
import { escapeHtml } from '../utils/html.js';
import { renderAmenityList } from './shared.js';

function renderCoffeeJourney() {
  return `
    <section class="inner-section container" aria-labelledby="coffee-journey">
      <div class="detail-section__head" data-reveal>
        <p class="editorial-split__eyebrow">With Mgei</p>
        <h2 class="detail-section__title" id="coffee-journey">From plant to cup</h2>
        <p class="detail-section__lead text-muted">Seven relaxed stages at the homestay – timing flexes with season and batch size.</p>
      </div>
      <div class="experience-journey">
        ${COFFEE_JOURNEY_STEPS.map(
          (step) => `
          <article class="experience-journey__step" data-reveal>
            <p class="experience-journey__num">${String(step.step).padStart(2, '0')}</p>
            <div class="experience-journey__copy">
              <h3>${escapeHtml(step.title)}</h3>
              <p class="text-muted">${escapeHtml(step.body)}</p>
            </div>
            ${
              step.image
                ? `<figure class="experience-journey__media">
                <img src="${step.image.src}" alt="${escapeHtml(step.image.alt)}" width="640" height="480" loading="lazy" decoding="async" />
              </figure>`
                : ''
            }
          </article>`,
        ).join('')}
      </div>
    </section>`;
}

function renderFoodCollage() {
  return `
    <div class="food-collage" data-reveal>
      ${FOOD_EXPERIENCE_IMAGES.map(
        (img) => `
        <figure class="food-collage__item">
          <img src="${img.src}" alt="${escapeHtml(img.alt)}" width="800" height="600" loading="lazy" decoding="async" />
        </figure>`,
      ).join('')}
    </div>`;
}

function renderDishGrid() {
  return `
    <h3 class="detail-section__title">What you might taste</h3>
    <div class="detail-highlight-grid" data-reveal>
      ${FOOD_DISH_NOTES.map(
        (dish) => `
        <article class="detail-highlight">
          <h3>${escapeHtml(dish.name)}</h3>
          <p class="text-muted text-small">${escapeHtml(dish.description)}</p>
        </article>`,
      ).join('')}
    </div>`;
}

function renderExperienceForm(experience) {
  return renderEnquiryRedirectPanel({
    heading: `Enquire – ${experience.title}`,
    intro: 'This prepares an email or WhatsApp message on the contact page. The team confirms menus, timing, and final totals.',
    intent: 'stay',
    context: { experience: experience.slug },
    buttonLabel: 'Send enquiry',
  });
}

/**
 * Shared split: details + USD guide pricing + enquiry.
 * @param {import('../data/types.js').ExperienceItem & { pricingTiers?: import('../components/experience-pricing.js').ExperiencePriceTier[] }} experience
 * @param {{ detailsTitle?: string }} [options]
 */
function renderExperienceDetailsSplit(experience, options = {}) {
  const title = options.detailsTitle ?? 'What is included';
  const tiers = experience.pricingTiers ?? [];
  return `
    <section class="inner-section container page-split" id="experience-booking">
      <div>
        <h2>${escapeHtml(title)}</h2>
        ${renderAmenityList(experience.inclusions ?? [])}
      </div>
      <aside class="info-panel page-split__aside">
        <p class="info-panel__label">Guide prices</p>
        ${renderExperiencePricingList(tiers)}
        ${renderExperienceForm(experience)}
      </aside>
    </section>`;
}

function renderRelatedExperiences(slug) {
  const related = publishedExperiences.filter((item) => item.slug !== slug).slice(0, 3);
  return `
    <section class="inner-section container related-strip" aria-labelledby="related-experiences">
      <h2 class="detail-section__title" id="related-experiences">You may also like</h2>
      ${renderCardGrid(related, renderExperienceCard, { columns: 3, ariaLabel: 'Related experiences' })}
    </section>`;
}

/**
 * @param {import('../data/types.js').ExperienceItem} experience
 */
export function renderCoffeeExperiencePage(experience) {
  return `
    ${renderDetailEditorialHero({
      eyebrow: 'Homestay experience',
      title: experience.title,
      lead: experience.longDescription,
      images: collageImagesFromEntity({
        gallery: [
          { src: expCoffee, alt: 'Coffee served at Meleji Homestays' },
          { src: intro, alt: 'Outdoor seating at the homestay' },
          { src: fieldImg, alt: 'Homestay grounds in Arusha' },
        ],
        imageSrc: experience.imageSrc,
        imageAlt: experience.imageAlt,
      }),
      actions: [
        { label: 'Book coffee experience', href: buildContactHref({ intent: 'stay', experience: experience.slug }) },
        { label: 'Book your stay', href: '/pages/booking/', variant: 'secondary', slide: false },
      ],
    })}
    ${renderCoffeeJourney()}
    ${renderExperienceDetailsSplit(experience)}
    <section class="inner-section container">
      <p class="text-muted text-small">Materuni and other day-trip coffee tours are listed separately under safaris.</p>
    </section>
    ${renderRelatedExperiences(experience.slug)}`;
}

export function renderFoodExperiencePage(experience) {
  return `
    ${renderDetailEditorialHero({
      eyebrow: 'Eat with hosts',
      title: experience.title,
      lead: experience.longDescription,
      images: collageImagesFromEntity({
        gallery: FOOD_EXPERIENCE_IMAGES,
        imageSrc: experience.imageSrc,
        imageAlt: experience.imageAlt,
      }),
      actions: [
        { label: 'Book a meal', href: buildContactHref({ intent: 'stay', experience: experience.slug }) },
        { label: 'All experiences', href: '/pages/experiences/', variant: 'secondary', slide: false },
      ],
    })}
    <section class="inner-section container foundation-section">
      ${renderFoodCollage()}
      <p class="foundation-gallery-note">Menus follow market availability. Hosts confirm dishes when you enquire.</p>
    </section>
    <section class="inner-section container inner-section--band">
      ${renderDishGrid()}
      <div class="foundation-story" data-reveal>
        ${renderAmenityList(FOOD_PRICING_NOTES)}
      </div>
    </section>
    ${renderExperienceDetailsSplit(experience, { detailsTitle: 'Booking notes' })}
    ${renderRelatedExperiences(experience.slug)}`;
}

function renderPanelExperiencePage(experience, detail) {
  return `
    ${renderDetailEditorialHero({
      eyebrow: 'Local life',
      title: experience.title,
      lead: experience.longDescription,
      images: collageImagesFromEntity({
        gallery: detail.images,
        imageSrc: experience.landscapeSrc ?? experience.imageSrc,
        imageAlt: experience.imageAlt,
      }),
      actions: [{ label: 'Send an enquiry', href: buildContactHref({ intent: 'stay', experience: experience.slug }) }],
    })}
    <section class="inner-section container detail-highlight-grid">
      ${detail.panels
        .map(
          (panel) => `
        <article class="detail-highlight" data-reveal>
          <h3>${escapeHtml(panel.title)}</h3>
          <p class="text-muted">${escapeHtml(panel.body)}</p>
        </article>`,
        )
        .join('')}
    </section>
    ${
      detail.images.length
        ? `<section class="inner-section container">${renderEditorialSplit({
            title: 'Host-led time',
            body: experience.longDescription,
            image: detail.images[0],
            reverse: true,
          })}</section>`
        : ''
    }
    ${renderExperienceDetailsSplit({ ...experience, pricingTiers: detail.pricingTiers, inclusions: detail.details ?? experience.inclusions })}
    ${renderRelatedExperiences(experience.slug)}`;
}

/**
 * @param {import('../data/types.js').ExperienceItem} experience
 */
export function renderRichExperienceDetail(experience) {
  if (experience.slug === 'coffee') return renderCoffeeExperiencePage(experience);
  if (experience.slug === 'swahili-food') return renderFoodExperiencePage(experience);
  if (experience.slug === 'culture') return renderPanelExperiencePage(experience, CULTURE_DETAIL);
  if (experience.slug === 'nature') return renderPanelExperiencePage(experience, NATURE_DETAIL);
  return '';
}
