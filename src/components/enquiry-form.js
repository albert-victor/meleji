import { CONTACT, buildWhatsAppHref } from '../data/contact.js';
import { COFFEE_HOMESTAY, FOOD_PRICING, FOUNDATION_PRICING, STAY_PRICING } from '../data/pricing.js';
import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';
import { renderPriceEstimateBlock } from '../scripts/booking-estimates.js';

/**
 * @param {string} id
 * @param {Record<string, string>} [prefill]
 */
function renderStayFields(id, prefill = {}) {
  const room = prefill.room ?? '';
  return `
    <div class="form-field">
      <label for="${id}-room">Room type (required)</label>
      <select id="${id}-room" name="room" required>
        <option value="">Select room…</option>
        <option value="shared-rooms"${room === 'shared-rooms' ? ' selected' : ''}>Shared — USD ${STAY_PRICING.shared.single} single / USD ${STAY_PRICING.shared.double} double</option>
        <option value="deluxe-rooms"${room === 'deluxe-rooms' ? ' selected' : ''}>Deluxe — USD ${STAY_PRICING.deluxe.night} per night</option>
      </select>
    </div>
    <div class="form-field">
      <label for="${id}-occupancy">Bed / couple (required)</label>
      <select id="${id}-occupancy" name="occupancy" required>
        <option value="">Select…</option>
        <option value="single">Single guest / single bed</option>
        <option value="double">Couple / double</option>
      </select>
    </div>
    <div class="form-field">
      <label for="${id}-rooms">Rooms or beds</label>
      <input id="${id}-rooms" name="rooms" type="number" min="1" max="10" inputmode="numeric" value="1" />
    </div>
    <div class="form-field">
      <label for="${id}-adults">Adults</label>
      <input id="${id}-adults" name="adults" type="number" min="1" max="20" inputmode="numeric" value="1" />
    </div>
    <div class="form-field">
      <label for="${id}-children">Children</label>
      <input id="${id}-children" name="children" type="number" min="0" max="20" inputmode="numeric" value="0" />
    </div>`;
}

/**
 * @param {string} id
 * @param {string} [experienceSlug]
 */
function renderExperienceFields(id, experienceSlug = '') {
  if (experienceSlug === 'swahili-food') {
    return `
      <div class="form-field form-field--full">
        <label for="${id}-meal-plan">Meal booking (required)</label>
        <select id="${id}-meal-plan" name="meal_plan" required>
          <option value="">Select plan…</option>
          <option value="plate-usd-${FOOD_PRICING.plate}">Per plate — USD ${FOOD_PRICING.plate}</option>
          <option value="full-day-usd-${FOOD_PRICING.fullDay}">Lunch + dinner — USD ${FOOD_PRICING.fullDay}</option>
        </select>
      </div>
      <div class="form-field">
        <label for="${id}-food-guests">Number of guests (required)</label>
        <input id="${id}-food-guests" name="food_guests" type="number" min="1" max="20" inputmode="numeric" value="1" required />
      </div>
      <div class="form-field">
        <label for="${id}-meal-date">Preferred meal date</label>
        <input id="${id}-meal-date" name="meal_date" type="date" />
      </div>
      <div class="form-field form-field--full">
        <label for="${id}-dietary">Dietary requirements</label>
        <textarea id="${id}-dietary" name="dietary" rows="2" placeholder="Allergies, vegetarian needs, or foods to avoid."></textarea>
      </div>`;
  }
  if (experienceSlug === 'coffee') {
  const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1)
      .map(
        (n) =>
          `<option value="${n}">${n} guest${n === 1 ? '' : 's'} — USD ${COFFEE_HOMESTAY.perPerson * n}</option>`,
      )
      .join('');
    return `
      <div class="form-field form-field--full">
        <p class="form-field__hint text-small text-muted">Homestay coffee with Mgei — full journey from bean to cup. USD ${COFFEE_HOMESTAY.perPerson} per person.</p>
      </div>
      <div class="form-field">
        <label for="${id}-coffee-guests">Participants (required)</label>
        <select id="${id}-coffee-guests" name="coffee_guests" required>
          <option value="">Select…</option>
          ${guestOptions}
        </select>
      </div>
      <div class="form-field">
        <label for="${id}-coffee-date">Preferred date</label>
        <input id="${id}-coffee-date" name="experience_date" type="date" />
      </div>`;
  }
  return '';
}

function renderSafariPackageFields(id) {
  return `
    <div class="form-field">
      <label for="${id}-departure">Preferred departure (required)</label>
      <input id="${id}-departure" name="departure" type="date" required />
    </div>
    <div class="form-field">
      <label for="${id}-travellers">Number of travellers (required)</label>
      <input id="${id}-travellers" name="travellers" type="number" min="1" max="30" inputmode="numeric" required />
    </div>
    <div class="form-field">
      <label for="${id}-safari-style">Private or shared</label>
      <select id="${id}-safari-style" name="safari_style">
        <option value="">Discuss with team</option>
        <option value="private">Private vehicle / guide</option>
        <option value="shared">Shared departure if available</option>
      </select>
    </div>
    <div class="form-field form-field--full">
      <label for="${id}-accommodation-pref">Accommodation preference</label>
      <input id="${id}-accommodation-pref" name="accommodation_pref" type="text" placeholder="Mid-range lodge, camping, budget — optional" />
    </div>`;
}

function renderFoundationFields(id) {
  return `
    <div class="form-field form-field--full">
      <label for="${id}-involvement">How you would like to help (required)</label>
      <select id="${id}-involvement" name="involvement" required>
        <option value="">Select…</option>
        <option value="volunteer-usd-${FOUNDATION_PRICING.volunteerFrom}">Volunteer time (from USD ${FOUNDATION_PRICING.volunteerFrom})</option>
        <option value="teach-usd-${FOUNDATION_PRICING.teachFrom}">Teach / mentor (from USD ${FOUNDATION_PRICING.teachFrom})</option>
        <option value="sponsor">Sponsor or material support</option>
        <option value="partner">Partner organisation</option>
        <option value="visit">Visit and learn first</option>
      </select>
    </div>`;
}

/**
 * @param {{
 *   id: string,
 *   topic?: string,
 *   heading?: string,
 *   intro?: string,
 *   hiddenFields?: Record<string, string>,
 *   experienceSlug?: string,
 *   bookingMode?: 'stay' | 'experience' | 'foundation' | 'coffee' | 'food' | 'safari-package',
 *   prefill?: Record<string, string>,
 *   formClass?: string,
 * }} options
 */
export function renderEnquiryForm(options) {
  const id = escapeHtml(options.id);
  const topic = options.topic || 'booking';
  const hidden = Object.entries(options.hiddenFields || {})
    .map(([key, value]) => `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(value)}" />`)
    .join('');

  const bookingFields =
    topic === 'booking' || options.bookingMode === 'stay'
      ? `<div class="form-field"><label for="${id}-arrival">Arrival (required)</label><input id="${id}-arrival" name="arrival" type="date" required /></div><div class="form-field"><label for="${id}-departure">Departure (required)</label><input id="${id}-departure" name="departure" type="date" required /></div><div class="form-field"><label for="${id}-guests">Number of guests</label><input id="${id}-guests" name="guests" type="number" min="1" max="100" inputmode="numeric" /></div>${renderStayFields(id, options.prefill)}`
      : '';

  const experienceFields =
    options.bookingMode === 'experience' || options.bookingMode === 'coffee' || options.bookingMode === 'food'
      ? renderExperienceFields(id, options.experienceSlug)
      : '';

  const safariPackageFields = options.bookingMode === 'safari-package' ? renderSafariPackageFields(id) : '';

  const safariFields =
    topic === 'safari' && options.bookingMode !== 'safari-package'
      ? `<div class="form-field form-field--full"><label for="${id}-destinations">Places you would like to visit</label><input id="${id}-destinations" name="destinations" type="text" /></div>`
      : '';

  const showEstimate =
    options.bookingMode === 'stay' ||
    options.bookingMode === 'coffee' ||
    options.bookingMode === 'food';

  const volunteerFields =
    topic === 'volunteer' || options.bookingMode === 'foundation'
      ? `${renderFoundationFields(id)}<div class="form-field form-field--full"><label for="${id}-skills">Skills, budget, or availability</label><textarea id="${id}-skills" name="contribution" rows="3" placeholder="Tell us what you can offer or what you hope to support."></textarea></div>`
      : '';

  const phoneRequired =
    options.bookingMode === 'stay' ||
    options.bookingMode === 'experience' ||
    options.bookingMode === 'coffee' ||
    options.bookingMode === 'food' ||
    options.bookingMode === 'safari-package'
      ? ' required'
      : '';

  const bookingModeAttr = options.bookingMode ? ` data-booking-mode="${escapeHtml(options.bookingMode)}"` : '';
  const formExtra = options.formClass ? ` ${escapeHtml(options.formClass)}` : '';

  return `<section class="enquiry-form${formExtra}" aria-labelledby="${id}-title"><h2 class="enquiry-form__title" id="${id}-title">${escapeHtml(options.heading || 'Start a conversation')}</h2><p class="enquiry-form__intro">${escapeHtml(options.intro || 'Tell us a little about your plans. We will help you work out the details.')}</p><form class="enquiry-form__form" id="${id}" data-enquiry-form data-topic="${escapeHtml(topic)}"${bookingModeAttr}>
    ${hidden}<div class="enquiry-form__grid"><div class="form-field"><label for="${id}-name">Your name (required)</label><input id="${id}-name" name="name" autocomplete="name" required /></div><div class="form-field"><label for="${id}-email">Email (required)</label><input id="${id}-email" name="email" type="email" autocomplete="email" required /></div><div class="form-field"><label for="${id}-phone">Phone / WhatsApp${phoneRequired ? ' (required)' : ''}</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel"${phoneRequired} /></div>${bookingFields}${experienceFields}${safariPackageFields}${safariFields}${volunteerFields}<div class="form-field form-field--full"><label for="${id}-message">Your plans or questions (required)</label><textarea id="${id}-message" name="message" rows="5" required></textarea></div></div>
    ${showEstimate ? renderPriceEstimateBlock() : ''}
    <p class="enquiry-form__intro">Prepare an email, or continue on WhatsApp with the same details. Final confirmation is by phone or WhatsApp with the team.</p>
    <div class="enquiry-form__actions">
      ${renderButton({ label: 'Prepare email enquiry', type: 'submit', icon: 'envelope' })}
    </div>
    <p class="enquiry-form__status" data-form-status role="status" aria-live="polite"></p>
    <div class="enquiry-form__followup" hidden data-enquiry-followup>
      <a class="btn btn--secondary" data-email-link hidden>Open email app →</a>
      <a class="btn btn--primary" data-whatsapp-link hidden target="_blank" rel="noopener noreferrer">Continue on WhatsApp</a>
    </div>
  </form></section>`;
}

function formatEnquiryBody(form) {
  return [...new FormData(form)]
    .filter(([, value]) => String(value).trim())
    .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
    .join('\n\n');
}

export function initEnquiryForms(root = document) {
  root.querySelectorAll('[data-enquiry-form]').forEach((form) => {
    const departure = form.elements.namedItem('departure');
    const arrival = form.elements.namedItem('arrival');
    const followup = form.querySelector('[data-enquiry-followup]');
    const resetPrepared = () => {
      if (followup) followup.hidden = true;
      form.querySelector('[data-email-link]').hidden = true;
      const wa = form.querySelector('[data-whatsapp-link]');
      if (wa) wa.hidden = true;
      form.querySelector('[data-form-status]').textContent = '';
    };

    form.addEventListener('input', () => {
      resetPrepared();
      if (departure && arrival && 'min' in departure && 'setCustomValidity' in departure) {
        departure.min = arrival.value;
        departure.setCustomValidity(
          departure.value && arrival.value && departure.value <= arrival.value
            ? 'Departure must be after arrival.'
            : '',
        );
      }
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const bodyText = formatEnquiryBody(form);
      const subject = `Meleji ${form.dataset.topic} enquiry`;
      const emailLink = form.querySelector('[data-email-link]');
      emailLink.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      emailLink.hidden = false;

      const waLink = form.querySelector('[data-whatsapp-link]');
      if (waLink) {
        waLink.href = buildWhatsAppHref(`Hello Meleji,\n\n${bodyText}`);
        waLink.hidden = false;
      }

      if (followup) followup.hidden = false;
      form.querySelector('[data-form-status]').textContent =
        'Your enquiry is ready. Send by email or open WhatsApp — nothing has been sent yet.';
      emailLink.focus();
    });
  });
}
