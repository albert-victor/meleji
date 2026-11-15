import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderEnquiryForm } from '../components/enquiry-form.js';
import { renderButton } from '../components/button.js';
import propertyHero from '../assets/images/optimized/hero-1920.webp';
import { CONTACT } from '../data/contact.js';
import { renderGalleryCollagePage } from '../components/gallery-collage.js';
import { GALLERY_SECTIONS } from '../data/gallery-sections.js';
import { mountInner } from './shared.js';

export function renderGalleryPage() {
  mountInner(`
    <div class="inner-page inner-page--gallery">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Gallery' },
      ])}
      ${renderPageHero({
        variant: 'standard',
        eyebrow: 'Look around',
        title: 'Gallery',
        lead: 'Homestay rooms, local experiences, foundation life, and safari landscapes — curated as living collages from the Meleji archive.',
      })}
      ${renderGalleryCollagePage(GALLERY_SECTIONS)}
      <section class="inner-section container">
        <p class="text-muted">Ready to plan a stay? ${renderButton({ label: 'Book your stay', href: '/pages/booking/', slide: false })}</p>
      </section>
    </div>`);
}

export function renderAbout() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'About Meleji' },
      ])}
      ${renderPageHero({
        variant: 'standard',
        eyebrow: 'Our story',
        title: 'Your place in Arusha',
        lead: 'A Tanzanian homestay team pairing accommodation, safaris, and local experiences for travellers who want a direct connection.',
      })}
      <section class="inner-section container page-split">
        <div>
          <p class="foundation-story">Meleji Homestays grew from hosting guests in a family setting and helping them plan time in Tanzania. Safaris and foundation work run alongside stays — coordinated by people who live in the region.</p>
          <p class="foundation-story">A stay can be as quiet or as active as you like. Spend time at the homestay, share a meal, and speak with the team about the places you hope to explore.</p>
        </div>
        <figure class="page-hero__room-media">
          <img src="${propertyHero}" alt="Homestay hospitality" width="1000" height="750" loading="lazy" decoding="async" />
        </figure>
      </section>
    </div>`);
}

export function renderContact() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Contact' },
      ])}
      ${renderPageHero({
        variant: 'standard',
        title: 'Contact',
        lead: 'Talk to us about a room, a safari, a local experience or time with the foundation. Your plans can start with a simple conversation.',
      })}
      <section class="inner-section container">
        <div class="contact-cards">
          <article class="contact-card">
            <h3>Enquiries</h3>
            <p class="text-muted"><a href="mailto:${CONTACT.email}">${CONTACT.email}</a><br /><a href="tel:${CONTACT.phone}">${CONTACT.phoneLabel}</a><br />${CONTACT.location}</p>
          </article>
          <article class="contact-card">
            <h3>Booking</h3>
            <p class="text-muted">${renderButton({ label: 'Book your stay', href: '/pages/booking/', slide: false })}</p>
          </article>
          <article class="contact-card">
            <h3>Safaris</h3>
            <p class="text-muted">${renderButton({ label: 'Tailor-made safari', href: '/pages/safaris/custom/', variant: 'secondary', slide: false })}</p>
          </article>
        </div>
      </section>
      <section class="inner-section container container--narrow">
        ${renderEnquiryForm({
          id: 'contact-form',
          topic: 'contact',
          heading: 'Message the team',
        })}
      </section>
    </div>`);
}

export function renderBooking() {
  const params = new URLSearchParams(window.location.search);
  const hidden = {};
  const prefill = {};
  if (params.get('room')) {
    hidden.room = params.get('room');
    prefill.room = params.get('room');
  }
  if (params.get('experience')) hidden.experience = params.get('experience');

  const experienceSlug = params.get('experience') ?? '';
  const isFood = experienceSlug === 'swahili-food';
  const isCoffee = experienceSlug === 'coffee';
  const isExperience = Boolean(experienceSlug);
  const bookingMode = isFood ? 'food' : isCoffee ? 'coffee' : isExperience ? 'experience' : 'stay';
  const title = isExperience ? 'Book an experience' : 'Book your stay';
  const lead = isExperience
    ? 'Meals and homestay coffee are confirmed with hosts by phone or WhatsApp after you send this form.'
    : 'Share dates, room type, and single or couple occupancy. Guide rates are on the room pages — final total confirmed in reply.';

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Booking enquiry' },
      ])}
      ${renderPageHero({
        variant: 'standard',
        title,
        lead,
      })}
      <section class="inner-section container container--narrow">
        ${renderEnquiryForm({
          id: 'booking-form',
          topic: 'booking',
          heading: isExperience ? 'Experience booking' : 'Stay booking',
          intro: 'Required fields mirror what hosts need on Booking.com-style enquiries: dates, room or meal choice, and a reachable phone number.',
          bookingMode,
          experienceSlug,
          prefill,
          hiddenFields: hidden,
        })}
      </section>
    </div>`);
}
