import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderCtaBand } from '../components/cta-band.js';
import { renderEnquiryForm } from '../components/enquiry-form.js';
import { renderButton } from '../components/button.js';
import { renderEditorialSplit, renderFoundationHeroCollage } from '../components/editorial-split.js';
import {
  FOUNDATION_GALLERY,
  FOUNDATION_HERO_COLLAGE,
  storyPorch,
  eduCircle,
  eduMeal,
  careIndoor,
  visitWelcome,
  communityEvening,
} from '../data/foundation-images.js';
import { FOUNDATION_PRICING } from '../data/pricing.js';
import { escapeHtml } from '../utils/html.js';
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
          ${renderButton({ label: 'Support our work', href: '/pages/foundation/volunteer/', variant: 'primary' })}
          ${renderButton({ label: 'Contact the team', href: '/pages/contact/', variant: 'ghost' })}
        </div>
      </div>
    </section>`;
}

export function renderFoundationOverview() {
  const volunteerHref = '/pages/foundation/volunteer/';

  const actionCards = [
    {
      title: 'Volunteer your time',
      text: 'Share practical help on site when activities are scheduled. Arrangements are confirmed in advance with safeguarding in place.',
      image: { src: communityEvening, alt: 'Volunteers and children gathered together in the evening' },
      icon: 'hand-holding-heart',
      href: volunteerHref,
      price: { amount: FOUNDATION_PRICING.volunteerFrom, note: 'guide · confirmed on enquiry' },
    },
    {
      title: 'Teach or mentor',
      text: 'Informal lessons, reading time, or skills sessions suited to the age group — agreed directly with coordinators.',
      image: { src: visitWelcome, alt: 'Visitors welcomed with children at Meleji House' },
      icon: 'chalkboard-user',
      href: volunteerHref,
      price: { amount: FOUNDATION_PRICING.teachFrom, note: 'per session · guide rate' },
    },
    {
      title: 'Support education and supplies',
      text: 'Contribute toward school materials, meals, clothing, and daily essentials discussed directly with the coordinators.',
      image: { src: eduMeal, alt: 'Children during a shared meal on the veranda' },
      icon: 'book-open',
      href: volunteerHref,
    },
    {
      title: 'Sponsor programmes',
      text: 'Individuals and families can discuss recurring support for care, schooling, or skills training with clear expectations.',
      icon: 'seedling',
      href: volunteerHref,
    },
    {
      title: 'Partner with the foundation',
      text: 'Schools, NGOs, and companies can explore longer collaborations, budgets, and programme goals with the leadership team.',
      icon: 'people-group',
      href: volunteerHref,
    },
  ];

  mountInner(`
    <div class="inner-page inner-page--foundation">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Meleji Children Foundation' },
      ])}

      <header class="foundation-hero">
        <div class="container foundation-hero__grid">
          <div class="foundation-hero__copy" data-reveal>
            <p class="foundation-hero__eyebrow">Meleji Children Foundation</p>
            <h1 class="foundation-hero__title">Care, schooling, and community in Arusha</h1>
            <p class="foundation-hero__lead">
              The foundation supports around 40 children and young people facing difficult family circumstances – including poverty and unstable home environments – with shelter, education, and daily assistance. Women in linked programmes build practical skills for self-reliance.
            </p>
            <div class="foundation-hero__actions">
              ${renderButton({ label: 'Support the foundation', href: volunteerHref, variant: 'primary' })}
              ${renderButton({ label: 'Plan a visit', href: '#plan-visit', variant: 'secondary', slide: false })}
            </div>
          </div>
          ${renderFoundationHeroCollage(FOUNDATION_HERO_COLLAGE)}
        </div>
      </header>

      <section class="inner-section container foundation-section">
        ${renderEditorialSplit({
          eyebrow: 'Our story',
          title: 'Rooted in the neighbourhood',
          body: [
            'Meleji Children Foundation grew alongside Meleji Homestays – guests who wanted to understand local life often asked how they could contribute responsibly. The foundation coordinates that care on the ground: supervised routines, schooling support, and relationships with families in the wider community.',
            'This is not a one-day photo stop. Visits, teaching, and donations are structured so children are respected and adults know what to expect before they travel.',
          ],
          image: { src: storyPorch, alt: 'Children and guests sharing time on the foundation veranda', width: 1400, height: 1050 },
          action: { label: 'Explore how to help', href: volunteerHref },
        })}
      </section>

      <section class="inner-section container foundation-section foundation-section--band" aria-labelledby="foundation-children">
        <div class="detail-section__head" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Children and education</p>
            <h2 class="detail-section__title" id="foundation-children">Daily care built around learning</h2>
            <p class="detail-section__lead text-muted">
              Young learners receive meals, supervision, and school-related support. Programmes adjust with term times and what families need most.
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
            Mornings and afternoons combine rest, play, and structured learning. Older children receive help with homework where possible. Supplies – pens, books, uniform pieces, and meals – are ongoing needs sponsors can discuss with the team.
          </p>
          <p class="text-muted text-small">
            Photographs of children are shown only with permission for public use. Identifying details about individual circumstances are not shared online.
          </p>
        </div>
      </section>

      <section class="inner-section container foundation-section foundation-section--women" aria-labelledby="foundation-women">
        <div class="page-split" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Women’s programmes</p>
            <h2 class="detail-section__title" id="foundation-women">Empowering women through practical skills</h2>
            <p class="text-muted">
              Tailoring, hairdressing, and other income-generating skills help women in difficult economic circumstances support their households. Training runs alongside the children’s programme and connects to local market realities.
            </p>
            <p class="text-muted">
              Guests and partners interested in skills mentoring or equipment donations should speak with the foundation leadership so sessions match current participants and workshop capacity.
            </p>
            <p class="text-muted text-small">
              Dedicated photography from skills workshops was not yet available in project assets at build time – confirm with the team before publishing training imagery.
            </p>
          </div>
        <aside class="info-panel">
          <h3>Programme focus</h3>
          <ul class="amenity-list">
            <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Tailoring and garment basics</span></li>
            <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Hairdressing and salon skills</span></li>
            <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Small-business habits and saving</span></li>
          </ul>
        </aside>
        </div>
      </section>

      <section class="inner-section container foundation-section">
        <div class="foundation-impact-badge" data-reveal data-collage aria-label="Foundation programme scope">
          <div class="foundation-impact-badge__glow" aria-hidden="true"></div>
          <div class="foundation-impact-badge__inner">
            <article class="foundation-impact-badge__cell">
              <p class="foundation-impact-badge__value">~40</p>
              <p class="foundation-impact-badge__label">Children and young people receiving structured support</p>
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

      <section class="inner-section container foundation-section" aria-labelledby="foundation-actions">
        <div class="detail-section__head" data-reveal>
          <div>
            <p class="editorial-split__eyebrow">Get involved</p>
            <h2 class="detail-section__title" id="foundation-actions">Ways to make a difference</h2>
            <p class="detail-section__lead text-muted">Each path starts with a plan – budgets, dates, and safeguarding are confirmed before you commit.</p>
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
              Institutions, companies, faith groups, and diaspora networks can sponsor meals, term fees, uniforms, or equipment. Programme budgets and reporting expectations are agreed directly with the foundation leadership – not through an automated checkout.
            </p>
            <p class="text-muted">
              Share your organisation’s goals, preferred duration, and any compliance requirements when you enquire. The team will outline what is realistic for the current cohort and facilities.
            </p>
          </div>
          <aside class="info-panel">
            <h3>Typical partnership topics</h3>
            <ul class="amenity-list">
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Recurring child sponsorship</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>School-term material drives</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Skills workshop equipment</span></li>
              <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Volunteer groups with fixed dates</span></li>
            </ul>
            ${renderButton({ label: 'Discuss sponsorship', href: volunteerHref, variant: 'primary' })}
          </aside>
        </div>
      </section>

      <section class="inner-section container foundation-section foundation-section--visit" id="plan-visit" aria-labelledby="foundation-visit">
        <div class="foundation-visit-section">
          <div class="foundation-visit__intro" data-reveal>
            <div class="foundation-visit__copy">
              <p class="editorial-split__eyebrow">Plan your visit</p>
              <h2 class="detail-section__title" id="foundation-visit">Arrange participation in advance</h2>
              <p class="text-muted">
                Community visits, teaching slots, and volunteering days are scheduled with the foundation coordinators. Activities involving children require notice, appropriate supervision, and safeguarding procedures agreed before you arrive.
              </p>
              <p class="text-muted">
                Where applicable, guide rates for volunteer-related activities and guest accommodation for participants are confirmed with the team before you commit — not through an automated checkout.
              </p>
              <p class="text-muted">
                Use the enquiry form below to share dates, skills, group size, and budget. You will receive a reply by email or WhatsApp with next steps.
              </p>
            </div>
            <figure class="foundation-visit__thumb foundation-photo-wash">
              <img src="${visitWelcome}" alt="Foundation visitors with children at Meleji House" width="900" height="1200" loading="lazy" decoding="async" />
            </figure>
          </div>
          <div class="foundation-booking-shell" data-foundation-booking data-reveal>
            ${renderEnquiryForm({
              id: 'foundation-visit-form',
              topic: 'volunteer',
              heading: 'Foundation visit enquiry',
              intro: 'Tell us how you hope to participate. The team confirms availability, safeguarding, and any costs.',
              bookingMode: 'foundation',
              formClass: 'enquiry-form--foundation-compact',
            })}
          </div>
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
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Foundation', href: '/pages/foundation/' },
        { label: 'Get involved' },
      ])}
      <header class="foundation-hero">
        <div class="container foundation-hero__copy" data-reveal>
          <p class="foundation-hero__eyebrow">Get involved</p>
          <h1 class="foundation-hero__title">Partner, sponsor, or volunteer</h1>
          <p class="foundation-hero__lead">
            Tell us what you hope to offer – time from USD ${FOUNDATION_PRICING.volunteerFrom}, teaching from USD ${FOUNDATION_PRICING.teachFrom}, donations, or organisational partnership. The team will explain current needs and safeguarding steps.
          </p>
          <div class="foundation-hero__actions">
            ${renderButton({ label: 'Foundation overview', href: '/pages/foundation/', variant: 'secondary', slide: false })}
          </div>
        </div>
      </header>
      <section class="inner-section container container--narrow">
        ${renderEnquiryForm({
          id: 'foundation-form',
          topic: 'volunteer',
          heading: 'Foundation enquiry',
          intro: 'Share involvement type, dates, and budget. The foundation team replies by email or WhatsApp.',
          bookingMode: 'foundation',
        })}
      </section>
    </div>`);
}

export function renderFoundationImpact() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Foundation', href: '/pages/foundation/' },
        { label: 'Community impact' },
      ])}
      <section class="inner-section container foundation-section">
        ${renderEditorialSplit({
          title: 'Community impact',
          body: [
            'Impact is shared honestly: the team can describe current numbers, programmes, and how visits are structured when you enquire. The foundation supports approximately 40 children and young people with daily care and education-focused routines.',
            'Women’s skills programmes run in parallel so households can stabilise. No review scores or unverified statistics are shown on this site.',
          ],
          image: { src: eduMeal, alt: 'Children sharing a meal on the foundation veranda' },
          action: { label: 'Support our work', href: '/pages/foundation/volunteer/' },
        })}
      </section>
      ${renderCtaBand({
        title: 'Talk with the foundation team',
        text: 'Clarify goals, budget, and timing before you travel.',
        primary: { label: 'Get involved', href: '/pages/foundation/volunteer/' },
        secondary: { label: 'Foundation home', href: '/pages/foundation/' },
      })}
    </div>`);
}
