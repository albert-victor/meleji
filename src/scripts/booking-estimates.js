import { COFFEE_HOMESTAY, FOOD_PRICING, STAY_PRICING } from '../data/pricing.js';

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

    let nightly = 0;
    let label = '';
    if (room.value === 'deluxe-rooms') {
      nightly = STAY_PRICING.deluxe.night;
      label = `Deluxe room – USD ${nightly} per night (room rate, not per guest).`;
    } else if (room.value === 'shared-rooms') {
      if (occupancy?.value === 'double') {
        nightly = STAY_PRICING.shared.double;
        label = `Shared double – USD ${nightly} per night (one room/couple).`;
      } else if (occupancy?.value === 'single') {
        nightly = STAY_PRICING.shared.single;
        label = `Shared single – USD ${nightly} per night (one bed).`;
      } else {
        updateEstimate(form, '', '');
        return;
      }
    }

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

/** @param {ParentNode} [root] */
export function initBookingEstimates(root = document) {
  root.querySelectorAll('[data-enquiry-form]').forEach((form) => {
    const mode = form.dataset.bookingMode;
    if (mode === 'stay') bindStayEstimate(form);
    if (mode === 'coffee') bindCoffeeEstimate(form);
    if (mode === 'food') bindFoodEstimate(form);
  });
}
