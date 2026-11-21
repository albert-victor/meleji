import { getStayNightlyQuote, stayPrefillFromSearchParams } from '../data/booking-room-options.js';
import { COFFEE_HOMESTAY, FOOD_PRICING } from '../data/pricing.js';

function parseDate(value) {
  if (!value) return null;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function nightsBetween(arrival, departure) {
  const start = parseDate(arrival);
  const end = parseDate(departure);
  if (!start || !end || end <= start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

function updateEstimate(form, value, note) {
  const box = form.querySelector('[data-price-estimate]');
  if (!box) return;
  const valueEl = box.querySelector('[data-price-estimate-value]');
  const noteEl = box.querySelector('[data-price-estimate-note]');
  if (valueEl) valueEl.textContent = value;
  if (noteEl) noteEl.textContent = note;
  box.hidden = !value;
}

function bindStayEstimate(form) {
  const arrival = form.elements.namedItem('arrival');
  const departure = form.elements.namedItem('departure');
  const room = form.elements.namedItem('room');
  const occupancy = form.elements.namedItem('occupancy');

  const recalc = () => {
    const nightCount = nightsBetween(arrival?.value, departure?.value);
    if (!nightCount || !room?.value) {
      updateEstimate(form, '', '');
      return;
    }

    const quote = getStayNightlyQuote(room.value, occupancy?.value);
    if (!quote) {
      updateEstimate(form, '', '');
      return;
    }
    const { nightly, label } = quote;

    const total = nightly * nightCount;
    updateEstimate(
      form,
      `USD ${total} guide total (${nightCount} night${nightCount === 1 ? '' : 's'})`,
      `${label} Subject to availability – team confirms before payment.`,
    );
  };

  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
}

function bindCoffeeEstimate(form) {
  const guests = form.elements.namedItem('coffee_guests');
  const recalc = () => {
    const count = Number(guests?.value);
    if (!count || count < 1) {
      updateEstimate(form, '', '');
      return;
    }
    const total = count * COFFEE_HOMESTAY.perPerson;
    updateEstimate(
      form,
      `USD ${total} estimated (${count} guest${count === 1 ? '' : 's'} × USD ${COFFEE_HOMESTAY.perPerson})`,
      'Homestay coffee with Mgei – final headcount confirmed on WhatsApp.',
    );
  };
  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
}

function bindFoodEstimate(form) {
  const plan = form.elements.namedItem('meal_plan');
  const guests = form.elements.namedItem('food_guests');
  const recalc = () => {
    const count = Number(guests?.value) || 1;
    const planValue = plan?.value ?? '';
    let perBooking = 0;
    let label = '';
    if (planValue.includes(String(FOOD_PRICING.plate))) {
      perBooking = FOOD_PRICING.plate * count;
      label = `Per-plate meals for ${count} guest${count === 1 ? '' : 's'}.`;
    } else if (planValue.includes(String(FOOD_PRICING.fullDay))) {
      perBooking = FOOD_PRICING.fullDay * count;
      label = `Lunch + dinner package per guest (${count} guest${count === 1 ? '' : 's'}). Confirm package rules with hosts.`;
    } else {
      updateEstimate(form, '', '');
      return;
    }
    updateEstimate(form, `USD ${perBooking} estimated`, `${label} Menus vary – confirmed before serving.`);
  };
  form.addEventListener('input', recalc);
  form.addEventListener('change', recalc);
}

export function renderPriceEstimateBlock() {
  return `
    <div class="price-estimate" data-price-estimate hidden>
      <p class="price-estimate__label">Estimated total</p>
      <p class="price-estimate__value" data-price-estimate-value></p>
      <p class="price-estimate__note" data-price-estimate-note></p>
    </div>`;
}

function applyStayPrefillFromUrl(form) {
  if (form.dataset.bookingMode !== 'stay') return;
  const prefill = stayPrefillFromSearchParams(new URLSearchParams(window.location.search));
  const room = form.elements.namedItem('room');
  const occ = form.elements.namedItem('occupancy');
  if (room instanceof HTMLInputElement && prefill.room && !room.value) {
    room.value = prefill.room;
  }
  if (occ instanceof HTMLInputElement && prefill.occupancy && !occ.value) {
    occ.value = prefill.occupancy;
  }
}

function syncCustomSelectFromHidden(form, name) {
  const hidden = form.elements.namedItem(name);
  if (!(hidden instanceof HTMLInputElement) || !hidden.value) return;
  const selectRoot = hidden.closest('[data-custom-select]');
  const option = selectRoot?.querySelector(`[data-value="${CSS.escape(hidden.value)}"]`);
  if (!selectRoot || !option) return;
  selectRoot.querySelectorAll('.custom-select__option').forEach((el) => {
    el.classList.toggle('is-selected', el === option);
  });
  const display = selectRoot.querySelector('.custom-select__display');
  if (display) display.textContent = option.textContent?.trim() ?? '';
}

/** @param {ParentNode} [root] */
export function initBookingEstimates(root = document) {
  root.querySelectorAll('[data-enquiry-form]').forEach((form) => {
    const mode = form.dataset.bookingMode;
    if (mode === 'stay') {
      applyStayPrefillFromUrl(form);
      syncCustomSelectFromHidden(form, 'room');
      syncCustomSelectFromHidden(form, 'occupancy');
      bindStayEstimate(form);
      form.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (mode === 'coffee') bindCoffeeEstimate(form);
    if (mode === 'food') bindFoodEstimate(form);
  });
}
