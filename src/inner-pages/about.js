import { renderBreadcrumb } from '../components/breadcrumb.js';
import { CARD_PHOTO_SHADE } from '../components/cards/shared.js';
import { renderButton } from '../components/button.js';
import { renderEditorialSplit } from '../components/editorial-split.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderCtaBand } from '../components/cta-band.js';
import hero from '../assets/images/optimized/hero-1920.webp';
import intro from '../assets/images/optimized/intro-1600.webp';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import expFood from '../assets/images/optimized/expFood-1600.webp';
import landscape from '../assets/images/optimized/landscape-1600.webp';
import storyStayScene from '../assets/images/sticky-sections/experience_4.jpg';
import storyKilimanjaro from '../assets/images/destinations/mount-kilimanjaro-national-park/01.jpg';
import { storyPorch } from '../data/foundation-images.js';
import momentBanner from '../assets/images/moments/c1b2d090-2feb-4c12-9423-6315de68c646.jpg';
import momentField from '../assets/images/moments/in_the_Field.jpg';
import eduCircle from '../assets/images/Meleji-Foundation/5b57b738-426c-4262-b033-2cd83052b120.jpg';
import { escapeHtml } from '../utils/html.js';
import { mountInner } from './shared.js';

const STORY_CHAPTERS = [
  {
    num: '01',
    eyebrow: 'Stay',
    title: 'Make yourself',
    titleEm: 'at home',
    paragraphs: [
      'Meleji Homestays is a place to land in Arusha before or after a safari. Shared and deluxe rooms, meals on request, and hosts who answer questions in plain language.',
      'Rates are quoted clearly on the room pages. The team confirms availability by phone or WhatsApp – not through an instant checkout online.',
    ],
    bullets: ['Shared and deluxe rooms', 'Meals and homestay coffee', 'Planning help for the days ahead'],
    image: { src: storyStayScene, alt: 'Outdoor seating at Meleji Homestays' },
    href: '/pages/accommodation/',
    linkLabel: 'View accommodation',
  },
  {
    num: '02',
    eyebrow: 'Explore',
    title: 'Safaris shaped',
    titleEm: 'with you',
    paragraphs: [
      'Northern parks, crater days, and shorter waterfall outings are discussed with drivers and coordinators who work from Arusha. Imported package pages on this site are reference routes – timing, lodges, and final pricing are agreed in conversation.',
      'You can keep a room at the homestay and build safari days around it, or plan a longer loop north. The team helps weigh travel time against what you most want to see.',
    ],
    bullets: ['Day trips and multi-day routes', 'Private or shared style where available', 'Pairing safari days with your stay'],
    image: { src: storyKilimanjaro, alt: 'Northern Tanzania landscape' },
    href: '/pages/safaris/',
    linkLabel: 'Explore safaris',
  },
  {
    num: '03',
    eyebrow: 'Experience',
    title: 'Coffee, food,',
    titleEm: 'local rhythm',
    paragraphs: [
      'At the house you can share Swahili dishes, follow coffee from cup to bean with Mgei, or book Arusha city and market walks with a host.',
      'These are small-group, host-led activities – not bus tours. Menus and timing are confirmed when you enquire.',
    ],
    bullets: ['Swahili food at the homestay', 'Coffee journey on site', 'City tours and market mornings'],
    image: { src: expFood, alt: 'Guests sharing a meal with hosts' },
    href: '/pages/experiences/',
    linkLabel: 'Local experiences',
  },
  {
    num: '04',
    eyebrow: 'Give back',
    title: 'Foundation',
    titleEm: 'alongside the homestay',
    paragraphs: [
      'Meleji Children Foundation runs daily care, schooling support, and women’s skills training in the same neighbourhood. Guests who want to help go through coordinators first – visits, sponsorship, and volunteering are scheduled, not improvised.',
      'Private child sponsorship and funded workshop days are discussed on the contact page. Safeguarding steps are agreed before anyone works with children.',
    ],
    bullets: ['Supervised visits by arrangement', 'Child sponsorship from enquiry', 'Women’s tailoring and skills workshops'],
    image: {
      src: storyPorch,
      alt: 'Foundation veranda and supervised time with children at Meleji Children Foundation',
    },
    href: '/pages/foundation/',
    linkLabel: 'Meet the foundation',
  },
];

/**
 * Editorial split bands – copy sits on solid surface; photos never carry text overlays.
 * @param {typeof STORY_CHAPTERS[number]} chapter
 * @param {number} index
 */
function renderStoryBand(chapter, index) {
  const reverse = index % 2 === 1 ? ' about-story-band--reverse' : '';
  const alt = index % 2 === 1 ? ' about-story-band--alt' : '';
  const titleHtml = chapter.titleEm
    ? `${escapeHtml(chapter.title)} <em>${escapeHtml(chapter.titleEm)}</em>`
    : escapeHtml(chapter.title);

  return `
    <article class="about-story-band${reverse}${alt}" data-reveal>
      <div class="container about-story-band__grid">
        <div class="about-story-band__copy">
          <p class="about-story-band__num" aria-hidden="true">${escapeHtml(chapter.num)}</p>
          <p class="editorial-split__eyebrow">${escapeHtml(chapter.eyebrow)}</p>
          <h2 class="about-story-band__title">${titleHtml}</h2>
          ${chapter.paragraphs.map((p) => `<p class="about-story-band__text">${escapeHtml(p)}</p>`).join('')}
          ${chapter.bullets?.length ? `<ul class="about-story-band__list">${chapter.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          ${renderButton({ label: chapter.linkLabel, href: chapter.href, variant: 'primary', className: 'btn--pattern-overlay' })}
        </div>
        <figure class="about-story-band__media meleji-card-photo">
          <img src="${chapter.image.src}" alt="${escapeHtml(chapter.image.alt)}" width="1200" height="900" loading="lazy" decoding="async" />
          ${CARD_PHOTO_SHADE}
        </figure>
      </div>
    </article>`;
}

export function renderAbout() {
  mountInner(`
    <div class="inner-page inner-page--about">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Our story' },
      ])}
      ${renderPageHero({
        imageKey: 'about',
        eyebrow: 'Our story',
        title: 'Homestay, safari, and community in one place',
        lead: 'Meleji grew from hosting guests in a family setting and helping them plan time in Tanzania. The same team still coordinates rooms, routes, local days out, and foundation partnerships from Arusha.',
        actions: [
          { label: 'Plan your visit', href: '/pages/contact/' },
          { label: 'Book a room', href: '/pages/booking/', variant: 'secondary', slide: false },
        ],
        className: 'page-hero--about',
      })}

      <section class="about-intro inner-section">
        <div class="container about-intro__grid" data-reveal>
          <div class="about-intro__lead">
            <p class="editorial-split__eyebrow">Who we are</p>
            <h2 class="about-intro__title">A house in Arusha,<br />a team that <em>plans with you</em></h2>
          </div>
          <div class="about-intro__body">
            <p>Meleji Homestays is not a hotel brand copied from a brochure. It is accommodation run by people who live here, with safaris and local experiences arranged in the same conversations as your room booking.</p>
            <p>Travellers arrive tired from flights, curious about wildlife, or ready to volunteer for a few days. The rhythm is simple: settle in, say what you hope to do, and let the team suggest a realistic order for crater days, coffee mornings, and rest.</p>
            <p>Children’s programmes and women’s skills training sit beside the guest house under Meleji Children Foundation. That work is separate from room rates, and it is introduced carefully to guests who ask how they can contribute.</p>
            ${renderButton({ label: 'Contact the house', href: '/pages/contact/', variant: 'text' })}
          </div>
        </div>
      </section>

      <section class="inner-section container about-opening">
        ${renderEditorialSplit({
          eyebrow: 'Arusha',
          title: 'Your place to land',
          body: [
            'Put your bags down, have coffee, and talk through what you hope to see. A stay can be a short pause between flights or the first week of a longer northern route.',
            'Hosts help with practical details: which park fits your dates, whether a city tour works on a free afternoon, and how foundation visits are scheduled if you want to learn on site.',
          ],
          image: { src: intro, alt: 'Outdoor chairs and table at Meleji Homestays', width: 1200, height: 900 },
          className: 'editorial-split--about-wide',
        })}
      </section>

      <section class="about-pillars" aria-labelledby="about-pillars-title">
        <div class="container about-pillars__head" data-reveal>
          <p class="editorial-split__eyebrow">Four threads</p>
          <h2 id="about-pillars-title" class="about-pillars__title">How a Meleji trip <em>comes together</em></h2>
          <p class="about-pillars__lead text-muted">Each chapter matches what guests book in practice. Copy and photography sit side by side – text never covers faces or figures in the image.</p>
        </div>
        <div class="about-pillars__stack">
          ${STORY_CHAPTERS.map((chapter, index) => renderStoryBand(chapter, index)).join('')}
        </div>
      </section>

      <section class="about-team inner-section" aria-labelledby="about-team-title">
        <div class="container about-team__grid">
          <figure class="about-team__visual meleji-card-photo" data-reveal>
            <img src="${momentField}" alt="Guests with hosts during a field outing" width="1200" height="900" loading="lazy" decoding="async" />
            ${CARD_PHOTO_SHADE}
          </figure>
          <div class="about-team__copy" data-reveal>
            <p class="editorial-split__eyebrow">How we work</p>
            <h2 id="about-team-title" class="about-team__title">One conversation,<br />several moving parts</h2>
            <p>Drivers, room preparation, meal timing, and foundation visits are coordinated by the same small team. You are not passed between unrelated call centres.</p>
            <p>When you send an enquiry on the contact page, you can mention safaris, food, coffee, or volunteering in the same message. The reply usually covers what is possible in your window and what needs more notice.</p>
            <ul class="about-team__list">
              <li><i class="fa-solid fa-bed" aria-hidden="true"></i><span>Rooms and guide rates confirmed in reply</span></li>
              <li><i class="fa-solid fa-binoculars" aria-hidden="true"></i><span>Safari routes discussed before anything is quoted as final</span></li>
              <li><i class="fa-solid fa-hand-holding-heart" aria-hidden="true"></i><span>Foundation involvement booked with safeguarding steps</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="about-quote-band inner-section" data-reveal>
        <div class="container about-quote-band__grid">
          <figure class="about-quote-band__media meleji-card-photo">
            <img src="${landscape}" alt="Lake and mountain view in northern Tanzania" width="1200" height="900" loading="lazy" decoding="async" />
            ${CARD_PHOTO_SHADE}
          </figure>
          <blockquote class="about-quote">
            <p>“Travel here works when expectations are clear – rest at the house, add safari days when you are ready, and treat foundation time as a planned visit, not a photo stop.”</p>
            <footer>– Meleji hosting team, Arusha</footer>
          </blockquote>
        </div>
      </section>

      <section class="about-mosaic inner-section container" aria-labelledby="about-mosaic-title">
        <div class="about-mosaic__head" data-reveal>
          <h2 id="about-mosaic-title" class="detail-section__title">Photographs from the house</h2>
          <p class="text-muted">Moments from stays, outings, food, coffee, and foundation life – drawn from the same archive used across the site.</p>
        </div>
        <div class="about-mosaic__grid" data-reveal>
          <figure class="about-mosaic__tile about-mosaic__tile--tall">
            <img src="${hero}" alt="Homestay exterior and seating in Arusha" width="1000" height="750" loading="lazy" decoding="async" />
          </figure>
          <figure class="about-mosaic__tile">
            <img src="${expCoffee}" alt="Coffee served in a Meleji Homestays cup" width="900" height="675" loading="lazy" decoding="async" />
          </figure>
          <figure class="about-mosaic__tile">
            <img src="${eduCircle}" alt="Learning time with young children at the foundation" width="900" height="675" loading="lazy" decoding="async" />
          </figure>
          <figure class="about-mosaic__tile about-mosaic__tile--wide">
            <img src="${momentBanner}" alt="Group gathered with hosts on a Meleji outing" width="1200" height="675" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      ${renderCtaBand({
        title: 'Ready to talk?',
        text: 'Share dates, interests, and who is travelling. The team replies by email or WhatsApp with next steps.',
        primary: { label: 'Contact us', href: '/pages/contact/' },
        secondary: { label: 'Safari overview', href: '/pages/safaris/' },
      })}
    </div>`);
}