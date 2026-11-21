import { CONTACT, buildWhatsAppHref } from '../data/contact.js';
import { getBookingRoomSelectOptions } from '../data/booking-room-options.js';
import { COFFEE_HOMESTAY, FOOD_PRICING, FOUNDATION_PRICING } from '../data/pricing.js';
import { escapeHtml } from '../utils/html.js';
import { renderButton } from './button.js';
import { renderCalendarField, renderCustomSelect } from './form-controls.js';
import { renderPriceEstimateBlock } from '../scripts/booking-estimates.js';

/**
 * @param {string} id
 * @param {Record<string, string>} [prefill]
 */
function renderStayFields(id, prefill = {}, bookingLayout = false) {
  const room = prefill.room ?? '';
  const occupancy = prefill.occupancy ?? '';
  const roomSelect = renderCustomSelect({
    id: `${id}-room`,
    name: 'room',
    label: 'Room type (required)',
    required: true,
    options: getBookingRoomSelectOptions(room),
  });
  const occupancySelect = renderCustomSelect({
    id: `${id}-occupancy`,
    name: 'occupancy',
    label: 'Bed / couple (required)',
    required: true,
    options: [
      { value: 'single', label: 'Single guest / single bed', selected: occupancy === 'single' },
      { value: 'double', label: 'Couple / double', selected: occupancy === 'double' },
    ],
  });
  const roomsField = `<div class="form-field"><label for="${id}-rooms">Rooms or beds</label><input id="${id}-rooms" name="rooms" type="number" min="1" max="10" inputmode="numeric" value="1" /></div>`;
  const adultsField = `<div class="form-field"><label for="${id}-adults">Adults</label><input id="${id}-adults" name="adults" type="number" min="1" max="20" inputmode="numeric" value="1" /></div>`;
  const childrenField = `<div class="form-field"><label for="${id}-children">Children</label><input id="${id}-children" name="children" type="number" min="0" max="20" inputmode="numeric" value="0" /></div>`;

  if (bookingLayout) {
    const roomsFull = `<div class="form-field form-field--full"><label for="${id}-rooms">Rooms or beds</label><input id="${id}-rooms" name="rooms" type="number" min="1" max="10" inputmode="numeric" value="1" /></div>`;
    return `${formRow(roomSelect, occupancySelect)}${formRow(adultsField, childrenField)}${roomsFull}`;
  }

  return `${roomSelect}${occupancySelect}${roomsField}${adultsField}${childrenField}`;
}

/**
 * @param {string} id
 * @param {string} [experienceSlug]
 */
function renderExperienceFields(id, experienceSlug = '') {
  if (experienceSlug === 'swahili-food') {
    return `
      ${renderCustomSelect({
        id: `${id}-meal-plan`,
        name: 'meal_plan',
        label: 'Meal booking (required)',
        required: true,
        options: [
          { value: `plate-usd-${FOOD_PRICING.plate}`, label: `Per plate – $${FOOD_PRICING.plate}` },
          { value: `full-day-usd-${FOOD_PRICING.fullDay}`, label: `Lunch + dinner – $${FOOD_PRICING.fullDay}` },
        ],
      })}
      <div class="form-field">
        <label for="${id}-food-guests">Number of guests (required)</label>
        <input id="${id}-food-guests" name="food_guests" type="number" min="1" max="20" inputmode="numeric" value="1" required />
      </div>
      ${renderCalendarField({ id: `${id}-meal-date`, name: 'meal_date', label: 'Preferred meal date' })}
      <div class="form-field form-field--full">
        <label for="${id}-dietary">Dietary requirements</label>
        <textarea id="${id}-dietary" name="dietary" rows="2" placeholder="Allergies, vegetarian needs, or foods to avoid."></textarea>
      </div>`;
  }
  if (experienceSlug === 'coffee') {
    const guestOptions = Array.from({ length: 12 }, (_, i) => i + 1).map((n) => ({
      value: String(n),
      label: `${n} guest${n === 1 ? '' : 's'} – $${COFFEE_HOMESTAY.perPerson * n}`,
    }));
    return `
      <div class="form-field form-field--full">
        <p class="form-field__hint text-small text-muted">Homestay coffee with Mgei – full journey from bean to cup. $${COFFEE_HOMESTAY.perPerson} per person.</p>
      </div>
      ${renderCustomSelect({
        id: `${id}-coffee-guests`,
        name: 'coffee_guests',
        label: 'Participants (required)',
        required: true,
        options: guestOptions,
      })}
      ${renderCalendarField({ id: `${id}-coffee-date`, name: 'experience_date', label: 'Preferred date' })}`;
  }
  return '';
}

function renderSafariPackageFields(id) {
  return `
    ${renderCalendarField({ id: `${id}-departure`, name: 'departure', label: 'Preferred departure (required)', required: true })}
    <div class="form-field">
      <label for="${id}-travellers">Number of travellers (required)</label>
      <input id="${id}-travellers" name="travellers" type="number" min="1" max="30" inputmode="numeric" required />
    </div>
    ${renderCustomSelect({
      id: `${id}-safari-style`,
      name: 'safari_style',
      label: 'Private or shared',
      placeholder: 'Discuss with team',
      options: [
        { value: 'private', label: 'Private vehicle / guide' },
        { value: 'shared', label: 'Shared departure if available' },
      ],
    })}
    <div class="form-field form-field--full">
      <label for="${id}-accommodation-pref">Accommodation preference</label>
      <input id="${id}-accommodation-pref" name="accommodation_pref" type="text" placeholder="Mid-range lodge, camping, budget – optional" />
    </div>`;
}

function renderFoundationFields(id) {
  return renderCustomSelect({
    id: `${id}-involvement`,
    name: 'involvement',
    label: 'How you would like to help (required)',
    required: true,
    options: [
      { value: `volunteer-usd-${FOUNDATION_PRICING.volunteerFrom}`, label: `Volunteer time (from USD ${FOUNDATION_PRICING.volunteerFrom})` },
      { value: `teach-usd-${FOUNDATION_PRICING.teachFrom}`, label: `Teach / mentor (from USD ${FOUNDATION_PRICING.teachFrom})` },
      { value: `child-sponsor-usd-${FOUNDATION_PRICING.childSponsorFrom}`, label: `Private child sponsorship (from USD ${FOUNDATION_PRICING.childSponsorFrom}/month)` },
      { value: `programme-usd-${FOUNDATION_PRICING.programmeSupportFrom}`, label: `Fund meals / materials (from USD ${FOUNDATION_PRICING.programmeSupportFrom})` },
      { value: 'women-skills', label: 'Women’s skills workshop support' },
      { value: 'sponsor', label: 'Other sponsor or material support' },
      { value: 'partner', label: 'Partner organisation' },
      { value: 'visit', label: 'Visit and learn first' },
    ],
  });
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
 *   minimal?: boolean,
 *   bookingLayout?: boolean,
 * }} options
 */
function formRow(...fields) {
  return `<div class="enquiry-form__row">${fields.filter(Boolean).join('')}</div>`;
}

export function renderEnquiryForm(options) {
  const id = escapeHtml(options.id);
  const topic = options.topic || 'booking';
  const hidden = Object.entries(options.hiddenFields || {})
    .map(([key, value]) => `<input type="hidden" name="${escapeHtml(key)}" value="${escapeHtml(value)}" />`)
    .join('');

  const phoneRequired =
    options.bookingMode === 'stay' ||
    options.bookingMode === 'experience' ||
    options.bookingMode === 'coffee' ||
    options.bookingMode === 'food' ||
    options.bookingMode === 'safari-package'
      ? ' required'
      : '';

  const nameField = `<div class="form-field form-field--full"><label for="${id}-name">Full name (required)</label><input id="${id}-name" name="name" autocomplete="name" required placeholder="Your full name" /></div>`;
  const emailField = `<div class="form-field"><label for="${id}-email">Email (required)</label><input id="${id}-email" name="email" type="email" autocomplete="email" required placeholder="you@email.com" /></div>`;
  const phoneField = `<div class="form-field"><label for="${id}-phone">Phone / WhatsApp${phoneRequired ? ' (required)' : ''}</label><input id="${id}-phone" name="phone" type="tel" autocomplete="tel"${phoneRequired} placeholder="+255 …" /></div>`;

  const contactBlock = options.bookingLayout
    ? `${nameField}${formRow(emailField, phoneField)}`
    : `${nameField}${emailField}${phoneField}`;

  const stayFields = renderStayFields(id, options.prefill, Boolean(options.bookingLayout));
  const bookingFields =
    topic === 'booking' || options.bookingMode === 'stay'
      ? options.bookingLayout
        ? `${formRow(
            renderCalendarField({ id: `${id}-arrival`, name: 'arrival', label: 'Arrival (required)', required: true }),
            renderCalendarField({ id: `${id}-departure`, name: 'departure', label: 'Departure (required)', required: true }),
          )}<div class="form-field form-field--full"><label for="${id}-guests">Number of guests</label><input id="${id}-guests" name="guests" type="number" min="1" max="100" inputmode="numeric" value="1" /></div>${stayFields}`
        : `${renderCalendarField({ id: `${id}-arrival`, name: 'arrival', label: 'Arrival (required)', required: true })}${renderCalendarField({ id: `${id}-departure`, name: 'departure', label: 'Departure (required)', required: true })}<div class="form-field"><label for="${id}-guests">Number of guests</label><input id="${id}-guests" name="guests" type="number" min="1" max="100" inputmode="numeric" /></div>${stayFields}`
      : '';

  const experienceFields =
    options.bookingMode === 'experience' || options.bookingMode === 'coffee' || options.bookingMode === 'food'
      ? renderExperienceFields(id, options.experienceSlug)
      : '';

  const safariPackageFields =
    options.bookingMode === 'safari-package'
      ? options.bookingLayout
        ? `${formRow(
            renderCalendarField({ id: `${id}-departure`, name: 'departure', label: 'Preferred departure (required)', required: true }),
            `<div class="form-field"><label for="${id}-travellers">Travellers (required)</label><input id="${id}-travellers" name="travellers" type="number" min="1" max="30" inputmode="numeric" required value="2" /></div>`,
          )}${renderCustomSelect({
            id: `${id}-safari-style`,
            name: 'safari_style',
            label: 'Private or shared',
            placeholder: 'Discuss with team',
            options: [
              { value: 'private', label: 'Private vehicle / guide' },
              { value: 'shared', label: 'Shared departure if available' },
            ],
          })}<div class="form-field form-field--full"><label for="${id}-accommodation-pref">Accommodation preference</label><input id="${id}-accommodation-pref" name="accommodation_pref" type="text" placeholder="Mid-range lodge, camping, budget – optional" /></div>`
        : renderSafariPackageFields(id)
      : '';

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

  const bookingModeAttr = options.bookingMode ? ` data-booking-mode="${escapeHtml(options.bookingMode)}"` : '';
  const layoutClass = options.bookingLayout ? ' enquiry-form--booking-layout' : '';
  const formExtra = `${layoutClass}${options.formClass ? ` ${escapeHtml(options.formClass)}` : ''}`;

  const messageField = `<div class="form-field form-field--full"><label for="${id}-message">Your plans or questions (required)</label><textarea id="${id}-message" name="message" rows="4" required placeholder="Dates, interests, room type, or safari parks…"></textarea></div>`;

  const headBlock = options.minimal
    ? `<h2 class="visually-hidden" id="${id}-title">${escapeHtml(options.heading || 'Enquiry')}</h2>`
    : `<h2 class="enquiry-form__title" id="${id}-title">${escapeHtml(options.heading || 'Start a conversation')}</h2>`;
  const introBlock = options.minimal
    ? ''
    : `<p class="enquiry-form__intro">${escapeHtml(options.intro || 'Tell us a little about your plans. We will help you work out the details.')}</p>`;

  const gridClass = options.bookingLayout ? ' enquiry-form__grid--stacked' : '';

  return `<section class="enquiry-form${formExtra}" aria-labelledby="${id}-title">${headBlock}${introBlock}<form class="enquiry-form__form" id="${id}" data-enquiry-form data-topic="${escapeHtml(topic)}"${bookingModeAttr}>
    ${hidden}<div class="enquiry-form__grid${gridClass}">${contactBlock}${bookingFields}${experienceFields}${safariPackageFields}${safariFields}${volunteerFields}${messageField}</div>
    ${showEstimate ? renderPriceEstimateBlock() : ''}
    <p class="enquiry-form__footnote">Prepare an email, or continue on WhatsApp with the same details. Final confirmation is by phone or WhatsApp with the team.</p>
    <div class="enquiry-form__actions">
      ${renderButton({ label: 'Send enquiry', type: 'submit', icon: 'envelope', className: 'btn--pattern-overlay enquiry-form__submit' })}
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
    .filter(([key, value]) => String(value).trim() && !key.includes('__'))
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
      form.closest('.enquiry-form')?.classList.remove('is-prepared');
      if (departure && arrival && 'setCustomValidity' in departure) {
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
      const foundationMode =
        form.dataset.bookingMode === 'foundation' ||
        form.dataset.topic === 'volunteer';
      const to = foundationMode ? CONTACT.foundationEmail : CONTACT.email;
      emailLink.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      emailLink.hidden = false;

      const waLink = form.querySelector('[data-whatsapp-link]');
      if (waLink) {
        waLink.href = buildWhatsAppHref(`Hello Meleji,\n\n${bodyText}`);
        waLink.hidden = false;
      }

      if (followup) followup.hidden = false;
      const shell = form.closest('.enquiry-form');
      shell?.classList.add('is-prepared');
      form.querySelector('[data-form-status]').innerHTML =
        '<strong class="enquiry-form__success">Your enquiry is ready.</strong> Send by email or open WhatsApp – nothing has been sent automatically.';
      emailLink.focus();
    });
  });
}
