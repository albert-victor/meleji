import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderButton } from '../components/button.js';
import { renderEnquiryForm } from '../components/enquiry-form.js';
import { renderGalleryCollagePage } from '../components/gallery-collage.js';
import { GALLERY_SECTIONS } from '../data/gallery-sections.js';
import { stayPrefillFromSearchParams } from '../data/booking-room-options.js';
import { mountInner } from './shared.js';

export function renderGalleryPage() {
  mountInner(`
    <div class="inner-page inner-page--gallery">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Gallery' },
      ])}
      ${renderPageHero({
        imageKey: 'gallery',
        eyebrow: 'Look around',
        title: 'Gallery',
        lead: 'Homestay rooms, local experiences, foundation life, and safari landscapes – curated as living collages from the Meleji archive.',
      })}
      ${renderGalleryCollagePage(GALLERY_SECTIONS)}
      <section class="inner-section container">
        <p class="text-muted">Ready to plan a stay? ${renderButton({ label: 'Book your stay', href: '/pages/booking/', slide: false })}</p>
      </section>
    </div>`);
}

export function renderBooking() {
  const params = new URLSearchParams(window.location.search);
  const experienceSlug = params.get('experience') ?? '';
  const isExperience = Boolean(experienceSlug);
  const title = isExperience ? 'Book an experience' : 'Book your stay';
  const lead = isExperience
    ? 'Meals and homestay coffee are confirmed with hosts by phone or WhatsApp after you send this form.'
    : 'Share dates, room type, and single or couple occupancy. Guide rates are on the room pages – final total confirmed in reply.';

  const prefill = stayPrefillFromSearchParams(params);
  const bookingForm = isExperience
    ? renderEnquiryForm({
        id: 'booking-experience-form',
        topic: 'booking',
        heading: title,
        bookingMode: experienceSlug === 'coffee' ? 'coffee' : experienceSlug === 'swahili-food' ? 'food' : 'experience',
        experienceSlug,
        bookingLayout: true,
        formClass: 'enquiry-form--booking-card',
        prefill,
      })
    : renderEnquiryForm({
        id: 'booking-stay-form',
        topic: 'booking',
        heading: title,
        bookingMode: 'stay',
        bookingLayout: true,
        formClass: 'enquiry-form--booking-card',
        prefill,
      });

  mountInner(`
    <div class="inner-page inner-page--booking">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Booking enquiry' },
      ])}
      ${renderPageHero({
        imageKey: 'booking',
        eyebrow: 'Enquiry',
        title,
        lead,
      })}
      <section class="contact-enquiry contact-enquiry--page" aria-labelledby="booking-form-title">
        <div class="container contact-enquiry__layout">
          <div class="contact-enquiry__stage" id="bookingForm">
            ${bookingForm}
          </div>
          <p class="booking-page__alt text-muted text-small" data-reveal>Prefer the full contact hub? ${renderButton({ label: 'Contact us', href: '/pages/contact/?intent=stay', variant: 'secondary', slide: false })}</p>
        </div>
      </section>
    </div>`);
}
