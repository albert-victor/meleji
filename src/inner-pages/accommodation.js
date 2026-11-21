import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderCtaBand } from '../components/cta-band.js';
import { renderEnquiryRedirectPanel } from '../components/enquiry-redirect.js';
import { renderEditorialRouteFit } from '../components/detail-section.js';
import { renderDetailEditorialHero, collageImagesFromEntity } from '../components/detail-hero.js';
import { renderEditorialSplit } from '../components/editorial-split.js';
import { renderAccommodationCard, renderCardGrid } from '../components/cards/index.js';
import { publishedRooms } from '../data/published/rooms.js';
import { accommodationRoomCards } from '../data/published/accommodation-catalog.js';
import { MELEJI_HOUSE_GALLERY } from '../data/meleji-house-gallery.js';
import { CARD_PHOTO_SHADE } from '../components/cards/shared.js';
import { publishedExperiences } from '../data/published/experiences.js';
import { getRoomBySlug } from '../data/published/lookup.js';
import { STAY_PRICING } from '../data/pricing.js';
import { CONTACT } from '../data/contact.js';
import { escapeHtml } from '../utils/html.js';
import propertyHero from '../assets/images/optimized/hero-1920.webp';
import { CINEMATIC_HERO_IMAGES } from '../data/cinematic-hero-images.js';
import { mountInner, renderGallery, renderAmenityList } from './shared.js';
import { renderMissingContent } from './not-found.js';

function renderHomestayHouseGallery() {
  const tiles = MELEJI_HOUSE_GALLERY.map(
    (photo, index) => `
      <figure class="gallery-grid__item gallery-grid__item--dense meleji-card-photo" data-reveal style="--reveal-delay: ${index % 9}">
        <img src="${photo.src}" alt="${escapeHtml(photo.alt)}" width="480" height="480" loading="lazy" decoding="async" />
        ${CARD_PHOTO_SHADE}
      </figure>`,
  ).join('');

  return `
    <section class="inner-section inner-section--band accommodation-house" aria-labelledby="house-gallery-title">
      <div class="container">
        <div data-reveal>
          <p class="editorial-split__eyebrow">Around Meleji</p>
          <h2 id="house-gallery-title" class="detail-section__title">The house &amp; daily life</h2>
          <p class="text-muted">
            Bathrooms, kitchen, outdoor seating, and communal corners – shown here without room rates. Book shared or deluxe rooms above.
          </p>
        </div>
        <div class="gallery-grid gallery-grid--dense accommodation-house__grid">
          ${tiles}
        </div>
      </div>
    </section>`;
}

export function renderAccommodationOverview() {
  const stayHero = CINEMATIC_HERO_IMAGES.accommodation;

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Accommodation' },
      ])}
      ${renderDetailEditorialHero({
        eyebrow: 'Stay',
        title: 'Rooms at Meleji Homestays',
        lead: 'Homestay rooms in Arusha – shared bunks, standard beds, and deluxe private rooms. The team confirms rates and availability on WhatsApp or email.',
        images: [{ src: stayHero.src, alt: stayHero.alt, width: 1920, height: 1440 }],
        actions: [
          { label: 'Book your stay', href: '/pages/booking/' },
          { label: 'Contact', href: '/pages/contact/', variant: 'secondary', slide: false },
        ],
      })}
      <section class="inner-section container" aria-labelledby="rooms-title">
        <h2 id="rooms-title" class="detail-section__title">Rooms &amp; guide rates</h2>
        <p class="text-muted">Five sleeping layouts with guide pricing – shared bunks, standard beds, and deluxe private rooms. The team confirms which room is free when you enquire.</p>
        ${renderCardGrid(accommodationRoomCards, renderAccommodationCard, {
          columns: 2,
          className: 'card-grid--stay-catalog',
          ariaLabel: 'Homestay room types',
        })}
      </section>
      ${renderHomestayHouseGallery()}
      <section class="inner-section inner-section--band">
        <div class="container">
          ${renderEditorialSplit({
            eyebrow: 'Booking',
            title: 'How reservations work',
            body: [
              'Choose room type, occupancy, and dates. The team replies with availability and a confirmed total – similar to a homestay enquiry, not instant online payment.',
              `Call or WhatsApp ${CONTACT.phoneLabel} after you send the form if you are travelling soon.`,
            ],
            image: { src: propertyHero, alt: 'Meleji Homestays exterior' },
            reverse: true,
          })}
        </div>
      </section>
      <section class="inner-section container">
        <h2 class="detail-section__title">Add meals &amp; experiences</h2>
        <p class="text-muted">Optional coffee, Swahili food, and outings can be mentioned in your stay enquiry.</p>
        <div class="foundation-actions accommodation-experiences" style="margin-top: var(--space-6)">
          ${publishedExperiences
            .slice(0, 3)
            .map(
              (exp) => `
            <a class="foundation-action" href="${escapeHtml(exp.href)}">
              <figure class="foundation-action__media">
                <img src="${exp.imageSrc}" alt="${escapeHtml(exp.imageAlt)}" width="640" height="480" loading="lazy" decoding="async"${
                  exp.cardImagePosition ? ` style="object-position: ${escapeHtml(exp.cardImagePosition)}"` : ''
                } />
              </figure>
              <div class="foundation-action__body">
                <h3 class="foundation-action__title">${escapeHtml(exp.title)}</h3>
                <p class="foundation-action__text">${escapeHtml(exp.summary)}</p>
              </div>
            </a>`,
            )
            .join('')}
        </div>
      </section>
      ${renderCtaBand({
        title: 'Ready to reserve?',
        text: 'Tell us your dates, room preference, and whether you are solo or a couple.',
        primary: { label: 'Booking enquiry', href: '/pages/booking/' },
        secondary: { label: 'Contact', href: '/pages/contact/' },
      })}
    </div>`);
}

export function renderRoomDetail(slug) {
  const room = getRoomBySlug(slug);
  if (!room) {
    renderMissingContent();
    return;
  }

  const related = publishedRooms.filter((item) => item.slug !== slug);

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Accommodation', href: '/pages/accommodation/' },
        { label: room.title },
      ])}
      ${renderDetailEditorialHero({
        eyebrow: 'Room',
        title: room.title,
        lead: room.longDescription,
        images: collageImagesFromEntity({
          gallery: room.gallery,
          imageSrc: room.imageSrc,
          imageAlt: room.imageAlt,
        }),
        actions: [
          { label: 'Book this room', href: '#room-booking' },
          { label: 'All rooms', href: '/pages/accommodation/', variant: 'secondary', slide: false },
        ],
      })}
      <section class="inner-section container page-split">
        <div>
          <h2 class="detail-section__title">Gallery</h2>
          ${renderGallery(room.gallery)}
        </div>
        <aside class="info-panel page-split__aside">
          ${renderEditorialRouteFit(room.slug === 'deluxe-rooms' ? 5 : 4, 'Homestay comfort')}
          <p class="info-panel__label">Guide rate</p>
          <p class="info-panel__price">${escapeHtml(room.priceNote)}</p>
          <p><strong>${escapeHtml(room.occupancy)}</strong></p>
          <h3>Good to know</h3>
          ${renderAmenityList(room.amenities)}
          <p class="text-muted text-small">Rates are per night per room or bed – not multiplied per guest unless noted.</p>
        </aside>
      </section>
      <section class="inner-section container container--narrow" id="room-booking">
        ${renderEnquiryRedirectPanel({
          heading: 'Book this room',
          intro: 'Opens the booking form with this room type and guide rate – add dates and send by email or WhatsApp.',
          intent: 'stay',
          context: { room: room.slug },
          buttonLabel: 'Book this room',
          useBookingPage: true,
        })}
        <p class="text-muted text-small">Optional: mention coffee or meal experiences in your message.</p>
      </section>
      ${
        related.length
          ? `<section class="inner-section container related-strip">
        <h2 class="detail-section__title">Related room options</h2>
        ${renderCardGrid(related, renderAccommodationCard, { columns: 2, ariaLabel: 'Other rooms' })}
      </section>`
          : ''
      }
    </div>`);
}
