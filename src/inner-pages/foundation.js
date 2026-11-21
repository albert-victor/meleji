import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderCtaBand } from '../components/cta-band.js';
import { FOUNDATION_HREFS } from '../data/contact.js';
import { renderButton } from '../components/button.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderFoundationRail } from '../components/foundation-chrome.js';
import { renderFoundationLandingHero } from '../components/foundation-landing-hero.js';
import { renderEditorialSplit } from '../components/editorial-split.js';
import {
  FOUNDATION_GALLERY,
  storyPorch,
  eduCircle,
  eduMeal,
  careIndoor,
  visitWelcome,
  communityEvening,
} from '../data/foundation-images.js';
import { FOUNDATION_PRICING } from '../data/pricing.js';
import {
  FOUNDATION_SCOPE,
  FOUNDATION_SPONSOR_PATHWAYS,
  FOUNDATION_WOMEN_SKILLS,
} from '../data/foundation-programmes.js';
import { escapeHtml } from '../utils/html.js';
import { CARD_PHOTO_SHADE } from '../components/cards/shared.js';
import { mountInner, renderGallery } from './shared.js';

/**
 * @param {{
 *   title: string,
 *   text: string,
 *   image?: { src: string, alt: string },
 *   icon: string,
 *   href: string,
 *   price?: { amount: number, prefix?: string, note?: string },
 * }} card
 */
function renderFoundationActionCard(card) {
  const media = card.image
    ? `<figure class="foundation-action__media foundation-photo-wash">
        <img src="${card.image.src}" alt="${escapeHtml(card.image.alt)}" width="640" height="400" loading="lazy" decoding="async" />
      </figure>`
    : `<figure class="foundation-action__media foundation-action__media--icon" aria-hidden="true">
        <span class="foundation-action__icon"><i class="fa-solid fa-${escapeHtml(card.icon)}" aria-hidden="true"></i></span>
      </figure>`;

  const priceHtml = card.price
    ? `<p class="foundation-action__price" aria-label="${escapeHtml(card.price.prefix ?? 'From')} ${card.price.amount} US dollars${card.price.note ? `, ${card.price.note}` : ''}">
        <span class="foundation-action__price-prefix">${escapeHtml(card.price.prefix ?? 'from')}</span>
        <span class="foundation-action__price-figure" aria-hidden="true"><span class="foundation-action__price-currency">$</span><span class="foundation-action__price-amount">${card.price.amount}</span></span>${card.price.note ? `<span class="foundation-action__price-sep" aria-hidden="true">·</span><span class="foundation-action__price-note">${escapeHtml(card.price.note)}</span>` : ''}
      </p>`
    : '';

  return `
    <a class="foundation-action" href="${escapeHtml(card.href)}" data-reveal>
      ${media}
      <div class="foundation-action__body">
        <h3 class="foundation-action__title">${escapeHtml(card.title)}</h3>
        ${priceHtml}
        <p class="foundation-action__text">${escapeHtml(card.text)}</p>
        <span class="foundation-action__link">Learn how to take part <span aria-hidden="true">→</span></span>
      </div>
    </a>`;
}

/**
 * @param {import('../data/foundation-programmes.js').FOUNDATION_SPONSOR_PATHWAYS[number]} card
 */
function renderFoundationSponsorCard(card, options = {}) {
  const enquiryHref = options.enquiryAnchor ?? card.anchor;
  const tone = card.tone ?? 'child';

  const visual = card.imageSrc
    ? `<figure class="foundation-sponsor-card__visual meleji-card-photo">
        <img src="${escapeHtml(card.imageSrc)}" alt="${escapeHtml(card.imageAlt ?? '')}" width="640" height="400" loading="lazy" decoding="async" />
        ${CARD_PHOTO_SHADE}
        <span class="foundation-sponsor-card__visual-icon" aria-hidden="true"><i class="fa-solid fa-${escapeHtml(card.icon)}"></i></span>
      </figure>`
    : `<div class="foundation-sponsor-card__visual foundation-sponsor-card__visual--tone" aria-hidden="true">
        <i class="fa-solid fa-${escapeHtml(card.icon)}"></i>
      </div>`;

  const priceChip = card.price
    ? `<span class="foundation-sponsor-card__price" aria-label="From ${card.price.amount} US dollars${card.price.note ? ` ${card.price.note}` : ''}">
        <span class="foundation-sponsor-card__price-label">from</span>
        <span class="foundation-sponsor-card__price-value"><span>$</span>${card.price.amount}</span>
        ${card.price.note ? `<span class="foundation-sponsor-card__price-unit">${escapeHtml(card.price.note)}</span>` : ''}
      </span>`
    : '';

  const articleAttrs =
    tone === 'child'
      ? 'id="sponsor-a-child" class="foundation-sponsor-card foundation-sponsor-card--child foundation-anchor-target"'
      : `class="foundation-sponsor-card foundation-sponsor-card--${escapeHtml(tone)}"`;

  return `
    <article ${articleAttrs} data-reveal>
      ${visual}
      <div class="foundation-sponsor-card__body">
        <p class="foundation-sponsor-card__eyebrow">Sponsor</p>
        <h3 class="foundation-sponsor-card__title">${escapeHtml(card.title)}</h3>
        <p class="foundation-sponsor-card__text">${escapeHtml(card.text)}</p>
        <div class="foundation-sponsor-card__foot">
          ${priceChip}
          <a class="foundation-sponsor-card__cta btn btn--primary" href="${escapeHtml(enquiryHref)}">${escapeHtml(card.ctaLabel)}</a>
        </div>
      </div>
    </article>`;
}

function renderFoundationCtaBand() {
  return `
    <section class="foundation-cta-band" aria-labelledby="foundation-final-cta">
      <div class="container foundation-cta-band__inner">
        <div>
          <h2 class="foundation-cta-band__title" id="foundation-final-cta">Be Part of the Meleji Story</h2>
          <p class="foundation-cta-band__text">
            Sponsorship, skilled volunteering, teaching, and organisational partnerships all begin with a conversation. The foundation team will help match your goals to current needs.
          </p>
        </div>
        <div class="foundation-cta-band__actions">
          ${renderButton({ label: 'Support our work', href: FOUNDATION_HREFS.form, variant: 'primary' })}
          ${renderButton({ label: 'Contact the team', href: '/pages/contact/', variant: 'ghost' })}
        </div>
      </div>
    </section>`;
}

export function renderFoundationOverview() {
  const actionCards = [
    {
      title: 'Volunteer your time',
      text: 'Scheduled days on site – activities, play, and practical help alongside the team.',
      image: { src: communityEvening, alt: 'Volunteers and children gathered together in the evening' },
      icon: 'hand-holding-heart',
      href: FOUNDATION_HREFS.form,
      price: { amount: FOUNDATION_PRICING.volunteerFrom, note: 'guide · enquiry' },
    },
    {
      title: 'Teach or mentor',
      text: 'Reading, homework, tailoring tips, or business coaching – booked with coordinators.',
      image: { src: visitWelcome, alt: 'Visitors welcomed with children at Meleji House' },
      icon: 'chalkboard-user',
      href: FOUNDATION_HREFS.form,
      price: { amount: FOUNDATION_PRICING.teachFrom, note: 'per session · from' },
    },
    {
      title: 'Partner with us',
      text: 'Schools, NGOs, companies, and diaspora groups – budgets and dates aligned with leadership.',
      icon: 'people-group',
      href: FOUNDATION_HREFS.form,
    },
  ];

  mountInner(`
    <div class="inner-page inner-page--foundation">
      ${renderFoundationRail()}
      ${renderFoundationLandingHero({
        eyebrow: 'Meleji Children Foundation',
        title: 'Care, skills, and second chances in Arusha',
        lead: `Daily care for 40+ children, women's tailoring programmes, and private sponsorship – start with one conversation.`,
        actions: [
          { label: 'Support the foundation', href: FOUNDATION_HREFS.form },
          { label: 'Sponsor a child', href: FOUNDATION_HREFS.sponsorChild, variant: 'secondary', slide: false },
        ],
      })}

      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Meleji Children Foundation' },
      ])}

      <section class="inner-section container foundation-section">
        ${renderEditorialSplit({
          eyebrow: 'Our story',
          title: 'Rooted in the neighbourhood',
          body: [
            'Meleji Children Foundation grew alongside Meleji Homestays. Guests who wanted to understand local life asked how to help without turning childhood into a spectacle. The answer on the ground is supervised routines, schooling support, and – just as importantly – pathways for women who are rebuilding after abandonment or years of scarce income.',
            'Workshops teach tailoring, salon bench skills, and small crafts that can feed a household. None of it works on empty stomachs, so sponsors often pair teaching with meals and materials. Visits, private child sponsorship, and funded sessions are arranged in advance so expectations stay clear.',
          ],
          image: { src: storyPorch, alt: 'Children and guests sharing time on the foundation veranda', width: 1400, height: 1050 },
          action: { label: 'Explore how to help', href: FOUNDATION_HREFS.form },
        })}
      </section>

      <section class="inner-section container foundation-section foundation-section--band" aria-labelledby="foundation-children">
        <div class="detail-section__head" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Children and education</p>
            <h2 class="detail-section__title" id="foundation-children">Daily care built around learning</h2>
            <p class="detail-section__lead text-muted">
              ${escapeHtml(FOUNDATION_SCOPE.childrenCountNote)} Private sponsors back one child or several – with photos and term updates from the coordinator.
            </p>
          </div>
        </div>
        <div class="foundation-duo" data-reveal>
          <figure class="foundation-duo__figure foundation-photo-wash">
            <img src="${eduCircle}" alt="Circle time with young children indoors" width="1200" height="900" loading="lazy" decoding="async" />
          </figure>
          <figure class="foundation-duo__figure foundation-photo-wash">
            <img src="${careIndoor}" alt="Caregiver with young children in a supervised indoor space" width="900" height="1200" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div class="foundation-story" data-reveal>
          <p>
            Mornings and afternoons combine rest, play, and structured learning. Private sponsors receive photos, school milestones, and a clear picture of how funds are used – one child or more, from about USD ${FOUNDATION_PRICING.childSponsorFrom} per month upward.
          </p>
        </div>
      </section>

      <section class="inner-section container foundation-section foundation-section--women" aria-labelledby="foundation-women">
        <div class="foundation-women-spotlight" data-reveal>
          <div class="foundation-women-spotlight__visual foundation-women-spotlight__visual--tone" aria-hidden="true">
            <i class="fa-solid fa-scissors"></i>
          </div>
          <div class="foundation-women-spotlight__copy">
            <p class="editorial-split__eyebrow">Women’s programmes</p>
            <h2 class="detail-section__title" id="foundation-women">Tailoring, crafts, and income skills</h2>
            <p class="text-muted">
              Alongside childcare, the foundation welcomes women rebuilding after hardship – cherehani tailoring, garments, handmade goods, and salon bench skills that translate into real income.
            </p>
            <div class="foundation-women-skills" aria-label="Skills offered">
              ${FOUNDATION_WOMEN_SKILLS.map(
                (item) =>
                  `<span class="foundation-women-skills__chip"><i class="fa-solid ${escapeHtml(item.icon)}" aria-hidden="true"></i>${escapeHtml(item.label)}</span>`,
              ).join('')}
            </div>
            ${renderButton({ label: 'Sponsor women’s training', href: FOUNDATION_HREFS.form, variant: 'primary' })}
            <p class="text-muted text-small">On-site workshop photography will be added when available from the foundation team.</p>
          </div>
        </div>
      </section>

      <section class="inner-section container foundation-section">
        <div class="foundation-impact-badge" data-reveal data-collage aria-label="Foundation programme scope">
          <div class="foundation-impact-badge__glow" aria-hidden="true"></div>
          <div class="foundation-impact-badge__inner">
            <article class="foundation-impact-badge__cell">
              <p class="foundation-impact-badge__value">${escapeHtml(FOUNDATION_SCOPE.childrenCountLabel)}</p>
              <p class="foundation-impact-badge__label">Children and young people at the centre today</p>
            </article>
            <article class="foundation-impact-badge__cell">
              <p class="foundation-impact-badge__value">Daily</p>
              <p class="foundation-impact-badge__label">Care, meals, and supervised routines on site</p>
            </article>
            <article class="foundation-impact-badge__cell">
              <p class="foundation-impact-badge__value">Skills</p>
              <p class="foundation-impact-badge__label">Women’s training alongside education programmes</p>
            </article>
          </div>
        </div>
      </section>

      <section class="inner-section container foundation-section" aria-labelledby="foundation-sponsor-paths">
        <div class="detail-section__head" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Sponsor &amp; support</p>
            <h2 class="detail-section__title" id="foundation-sponsor-paths">Choose how you want to help</h2>
            <p class="detail-section__lead text-muted">Four quick ways to give – pick one and send a short enquiry. Guide rates only; the team confirms details the same week when possible.</p>
          </div>
        </div>
        <div class="foundation-sponsor-grid">
          ${FOUNDATION_SPONSOR_PATHWAYS.map((card) => renderFoundationSponsorCard(card)).join('')}
        </div>
      </section>

      <section class="inner-section container foundation-section" aria-labelledby="foundation-actions">
        <div class="detail-section__head" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Get involved</p>
            <h2 class="detail-section__title" id="foundation-actions">Visit, teach, partner</h2>
            <p class="detail-section__lead text-muted">On-site roles for travellers and organisations already planning dates.</p>
          </div>
        </div>
        <div class="foundation-actions">
          ${actionCards.map((card) => renderFoundationActionCard(card)).join('')}
        </div>
      </section>

      <section class="inner-section container foundation-section foundation-section--band" aria-labelledby="foundation-partners">
        <div class="page-split" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Partnerships</p>
            <h2 class="detail-section__title" id="foundation-partners">Sponsorships and organisational collaboration</h2>
            <p class="text-muted">
              Institutions, companies, faith groups, and diaspora networks can sponsor meals, term fees, uniforms, salon tools, or an entire skills cohort. Private child sponsors receive coordinator-led reporting; organisations receive summaries suited to their finance teams.
            </p>
            <p class="text-muted">
              Share your goals, preferred duration, and any compliance requirements when you enquire. The leadership team will outline what is realistic for more than forty children on site and the women’s workshops running in parallel.
            </p>
          </div>
          <aside class="info-panel">
            <h3>Typical partnership topics</h3>
            <ul class="amenity-list">
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Private child sponsorship with updates</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Training-day meals and ingredients</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Salon bench tools and fabrics</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Volunteer groups with fixed dates</span></li>
            </ul>
            ${renderButton({ label: 'Discuss sponsorship', href: FOUNDATION_HREFS.form, variant: 'primary' })}
          </aside>
        </div>
      </section>

      <section class="inner-section container foundation-section foundation-section--band">
        <h2 class="detail-section__title" data-reveal>Moments from the foundation</h2>
        <p class="foundation-gallery-note" data-reveal>Photography from the Meleji Children Foundation archive – used with care for dignity and privacy.</p>
        ${renderGallery(FOUNDATION_GALLERY)}
      </section>

      ${renderFoundationCtaBand()}
    </div>`);
}

export function renderFoundationVolunteer() {
  const target = FOUNDATION_HREFS.form;
  mountInner(`
    <div class="inner-page inner-page--foundation">
      ${renderFoundationRail()}
      <section class="inner-section container foundation-section foundation-volunteer-redirect" aria-live="polite">
        <p class="text-muted">Opening the foundation enquiry form on the main foundation page…</p>
        <p><a class="btn btn--primary" href="${escapeHtml(target)}">Continue to foundation enquiry</a></p>
      </section>
    </div>`);
  window.location.replace(target);
}

export function renderFoundationImpact() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Foundation', href: '/pages/foundation/' },
        { label: 'Community impact' },
      ])}
      ${renderPageHero({
        imageKey: 'foundationImpact',
        eyebrow: 'Foundation',
        title: 'Community impact',
        lead: 'Programmes, partnerships, and honest reporting – shared directly with visitors and sponsors when you enquire.',
      })}
      <section class="inner-section container foundation-section">
        ${renderEditorialSplit({
          title: 'What we can share today',
          body: [
            `Impact is shared honestly when you enquire. The centre supports ${FOUNDATION_SCOPE.childrenCountLabel} children with daily care and education-focused routines, plus women's tailoring and craft workshops for participants rebuilding after hardship.`,
            'Sponsors receive photos and progress updates. Programme gifts are reported in plain language – no inflated statistics on this site.',
          ],
          image: { src: eduMeal, alt: 'Children sharing a meal on the foundation veranda' },
          action: { label: 'Support our work', href: FOUNDATION_HREFS.form },
        })}
      </section>
      ${renderCtaBand({
        title: 'Talk with the foundation team',
        text: 'Clarify goals, budget, and timing before you travel.',
        primary: { label: 'Get involved', href: FOUNDATION_HREFS.form },
        secondary: { label: 'Foundation home', href: '/pages/foundation/' },
      })}
    </div>`);
}
