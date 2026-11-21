import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderEnquiryForm } from '../components/enquiry-form.js';
import { renderButton } from '../components/button.js';
import { CONTACT, buildWhatsAppHref } from '../data/contact.js';
import { buildContactHref } from '../utils/contact-routes.js';
import { escapeHtml } from '../utils/html.js';
import { stayPrefillFromSearchParams } from '../data/booking-room-options.js';
import { mountInner } from './shared.js';

const FORM_SHELL = {
  minimal: true,
  bookingLayout: true,
  formClass: 'enquiry-form--contact-panel',
};

/**
 * @param {string} title
 * @param {string} intro
 * @param {string[]} [points]
 */
function renderPanelHead(title, intro, points = []) {
  const list =
    points.length > 0
      ? `<ul class="contact-panel__points">${points.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : '';
  return `<div class="contact-panel__head">
    <h3 class="contact-panel__title">${escapeHtml(title)}</h3>
    <p class="contact-panel__intro">${escapeHtml(intro)}</p>
    ${list}
  </div>`;
}

function renderContactChannels() {
  return `
    <div class="contact-channel-grid" data-reveal>
      <article class="contact-channel">
        <span class="contact-channel__icon" aria-hidden="true"><i class="fa-solid fa-envelope"></i></span>
        <h3>Email</h3>
        <p><a href="mailto:${CONTACT.email}">${escapeHtml(CONTACT.email)}</a></p>
      </article>
      <article class="contact-channel">
        <span class="contact-channel__icon" aria-hidden="true"><i class="fa-solid fa-phone"></i></span>
        <h3>Phone</h3>
        <p><a href="tel:${CONTACT.phone}">${escapeHtml(CONTACT.phoneLabel)}</a></p>
      </article>
      <article class="contact-channel">
        <span class="contact-channel__icon" aria-hidden="true"><i class="fa-solid fa-location-dot"></i></span>
        <h3>Location</h3>
        <p>${escapeHtml(CONTACT.location)}</p>
        <p class="contact-channel__hint text-small text-muted">Near Arusha city – stays, airport transfers, and safari starts are arranged in reply.</p>
      </article>
      <article class="contact-channel contact-channel--accent">
        <span class="contact-channel__icon" aria-hidden="true"><i class="fa-brands fa-whatsapp"></i></span>
        <h3>WhatsApp</h3>
        <p class="text-small text-muted">Fastest for dates, room checks, and safari timing.</p>
        <p class="contact-channel__action">${renderButton({ label: 'Open chat', href: buildWhatsAppHref('Hello Meleji – I would like to plan a visit.'), variant: 'primary', className: 'btn--pattern-overlay' })}</p>
      </article>
    </div>`;
}

function renderContactSteps() {
  return `
    <aside class="contact-hub__steps" data-reveal aria-labelledby="contact-steps-title">
      <h3 id="contact-steps-title" class="contact-hub__steps-title">How enquiries work</h3>
      <ol class="contact-hub__steps-list">
        <li><strong>Fill the form</strong> with dates, room type, or parks you have in mind.</li>
        <li><strong>Send yourself</strong> via email or WhatsApp – nothing leaves the site automatically.</li>
        <li><strong>Confirm with the team</strong> by phone or WhatsApp for rates, availability, and pickup.</li>
      </ol>
      <p class="contact-hub__steps-note text-small text-muted">Share a tab link from your browser to come back to the same enquiry type.</p>
    </aside>`;
}

function renderIntentLink(intent, label) {
  const href = buildContactHref({ intent: intent === 'message' ? undefined : intent });
  return `<a class="contact-enquiry__tab" href="${href}" data-contact-tab="${escapeHtml(intent)}">${escapeHtml(label)}</a>`;
}

function renderFormCard(formHtml) {
  return `<div class="contact-hub__form-card">${formHtml}</div>`;
}

function renderContactEnquiryBand() {
  const shared = { ...FORM_SHELL };
  const stayPrefill =
    typeof window !== 'undefined' ? stayPrefillFromSearchParams(new URLSearchParams(window.location.search)) : {};

  return `
    <div class="contact-hub__enquiry-band">
      <div class="container contact-hub__enquiry-inner" data-contact-hub>
        <header class="contact-hub__enquiry-header" data-reveal>
          <p class="contact-hub__eyebrow">Enquiry form</p>
          <h2 id="contact-enquiry-title" class="contact-hub__enquiry-title">Send your plans</h2>
          <p class="contact-hub__enquiry-lead">Pick what you are writing about. Fields change slightly for homestay, safari, or foundation – guide prices stay on the product pages until we confirm totals in reply.</p>
        </header>
        <nav class="contact-enquiry__nav" aria-label="Enquiry type">
          ${renderIntentLink('message', 'General')}
          ${renderIntentLink('stay', 'Homestay')}
          ${renderIntentLink('safari', 'Safari')}
          ${renderIntentLink('foundation', 'Foundation')}
        </nav>
        <div class="contact-enquiry__stage">
          <div id="contact-panel-message" class="contact-enquiry__panel" data-contact-panel="message" role="region" aria-labelledby="contact-enquiry-title" tabindex="-1">
            ${renderPanelHead(
              'General message',
              'Questions that do not fit a single booking – routes, group size, combining stay and safari, or foundation visits.',
              ['Stays, meals, coffee homestay, or safari add-ons', 'We reply by email or WhatsApp with clear next steps'],
            )}
            ${renderFormCard(
              renderEnquiryForm({
                id: 'contact-message-form',
                topic: 'contact',
                heading: 'General message',
                ...shared,
              }),
            )}
          </div>
          <div id="contact-panel-stay" class="contact-enquiry__panel" data-contact-panel="stay" role="region" aria-label="Homestay enquiry" hidden tabindex="-1">
            ${renderPanelHead(
              'Homestay booking',
              'Arrival and departure, then pick one of the five room layouts from the stay cards. Occupancy affects shared-tier guide rates.',
              ['Shared bunks, standard beds, and deluxe private rooms', 'Children counts help us prepare meals and bedding'],
            )}
            ${renderFormCard(
              renderEnquiryForm({
                id: 'contact-stay-form',
                topic: 'booking',
                heading: 'Homestay enquiry',
                bookingMode: 'stay',
                prefill: stayPrefill,
                ...shared,
              }),
            )}
          </div>
          <div id="contact-panel-safari" class="contact-enquiry__panel" data-contact-panel="safari" role="region" aria-label="Safari enquiry" hidden tabindex="-1">
            ${renderPanelHead(
              'Safari enquiry',
              'Preferred departure, traveller count, and whether you want a private vehicle. Itineraries and park fees are confirmed after you reach out.',
              ['Link from a package or destination page fills hidden fields when available', 'Accommodation style is optional – we can suggest lodges or camping'],
            )}
            ${renderFormCard(
              renderEnquiryForm({
                id: 'contact-safari-form',
                topic: 'safari',
                heading: 'Safari enquiry',
                bookingMode: 'safari-package',
                hiddenFields: { destination: '', package: '', activity: '' },
                ...shared,
              }),
            )}
          </div>
          <div id="contact-panel-foundation" class="contact-enquiry__panel" data-contact-panel="foundation" role="region" aria-label="Foundation enquiry" hidden tabindex="-1">
            ${renderPanelHead(
              'Foundation & volunteering',
              'Teaching, sponsorship, programme support, or a first visit to understand the work. Safeguarding and any costs are confirmed directly with coordinators.',
              ['Volunteer days and teaching blocks have guide rates in the form', 'Tell us skills, availability, or sponsorship interest in the text area'],
            )}
            ${renderFormCard(
              renderEnquiryForm({
                id: 'contact-foundation-form',
                topic: 'volunteer',
                heading: 'Foundation enquiry',
                bookingMode: 'foundation',
                ...shared,
              }),
            )}
          </div>
        </div>
      </div>
    </div>`;
}

export function renderContact() {
  mountInner(`
    <div class="inner-page inner-page--contact">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Contact us' },
      ])}
      ${renderPageHero({
        imageKey: 'contact',
        eyebrow: 'Contact us',
        title: 'Talk to the house',
        lead: 'One team for homestay nights, Arusha-area safaris, and foundation visits. Details and the enquiry form are on this page.',
        actions: [
          { label: 'WhatsApp', href: buildWhatsAppHref('Hello Meleji – I would like to plan a visit.'), variant: 'primary' },
          { label: 'Our story', href: '/pages/about/', variant: 'secondary', slide: false },
        ],
        className: 'page-hero--contact',
      })}
      <section class="contact-hub" aria-labelledby="contact-details-title">
        <div class="container contact-hub__reach">
          <header class="contact-hub__reach-header" data-reveal>
            <p class="contact-hub__eyebrow">Reach us</p>
            <h2 id="contact-details-title" class="contact-hub__title">Contact details</h2>
            <p class="contact-hub__lead">Use email or phone for a direct line. WhatsApp suits quick date checks. When you are ready to book, scroll to the form below.</p>
          </header>
          <a class="contact-hub__skip" href="#contact-enquiry-title">Skip to enquiry form</a>
          <div class="contact-hub__details-layout">
            ${renderContactChannels()}
            ${renderContactSteps()}
          </div>
        </div>
      </section>
      ${renderContactEnquiryBand()}
    </div>`);
}