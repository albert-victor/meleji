/**
 * Homestay room choices for booking + contact stay forms (aligned with accommodation cards).
 */
import { STAY_PRICING } from './pricing.js';
import { accommodationRoomCards } from './published/accommodation-catalog.js';

/**
 * @typedef {'shared-tier' | 'fixed'} BookingRoomRateKind
 * @typedef {{
 *   value: string,
 *   title: string,
 *   label: string,
 *   rateKind: BookingRoomRateKind,
 *   defaultOccupancy?: 'single' | 'double',
 * }} BookingRoomOption
 */

/** Maps legacy `layout` query values and old slugs. */
const ROOM_PARAM_ALIASES = {
  'standard-guest': 'standard-guest-room',
  'standard-double': 'standard-double-room',
  'standard-private': 'standard-private-room',
};

/**
 * @param {string | null | undefined} raw
 * @returns {string | undefined}
 */
export function normalizeBookingRoomParam(raw) {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  return ROOM_PARAM_ALIASES[trimmed] ?? trimmed;
}

/**
 * @returns {BookingRoomOption[]}
 */
export function getBookingRoomOptions() {
  return accommodationRoomCards.map((card) => {
    const isSharedTier =
      card.slug === 'shared-rooms' ||
      card.slug === 'standard-guest-room' ||
      card.slug === 'standard-double-room';

    let defaultOccupancy = 'double';
    if (card.slug === 'shared-rooms' || card.slug === 'standard-guest-room') {
      defaultOccupancy = 'single';
    }
    if (card.slug === 'standard-double-room') {
      defaultOccupancy = 'double';
    }

    return {
      value: card.slug,
      title: card.title,
      label: `${card.title} – ${card.priceNote.replace(/^From /i, '')}`,
      rateKind: isSharedTier ? 'shared-tier' : 'fixed',
      defaultOccupancy,
    };
  });
}

/**
 * @param {string} value
 */
export function getBookingRoomOption(value) {
  const key = normalizeBookingRoomParam(value) ?? value;
  return getBookingRoomOptions().find((item) => item.value === key);
}

/**
 * @param {string} [selected]
 */
export function getBookingRoomSelectOptions(selected = '') {
  const normalized = normalizeBookingRoomParam(selected) ?? selected;
  return getBookingRoomOptions().map((item) => ({
    value: item.value,
    label: item.label,
    selected: item.value === normalized,
  }));
}

/**
 * @param {string | null | undefined} roomValue
 * @param {string | null | undefined} occupancy
 */
export function getStayNightlyQuote(roomValue, occupancy) {
  const option = getBookingRoomOption(roomValue ?? '');
  if (!option) return null;

  if (option.rateKind === 'fixed') {
    const nightly = STAY_PRICING.deluxe.night;
    return {
      nightly,
      label: `${option.title} – USD ${nightly} per night (room rate).`,
    };
  }

  if (occupancy === 'double') {
    return {
      nightly: STAY_PRICING.shared.double,
      label: `${option.title} – USD ${STAY_PRICING.shared.double} per night (double / couple).`,
    };
  }
  if (occupancy === 'single') {
    return {
      nightly: STAY_PRICING.shared.single,
      label: `${option.title} – USD ${STAY_PRICING.shared.single} per night (single bed).`,
    };
  }
  return null;
}

/**
 * @param {URLSearchParams} params
 */
export function stayPrefillFromSearchParams(params) {
  const layout = params.get('layout');
  let resolved = normalizeBookingRoomParam(params.get('room'));
  if (layout) {
    const fromLayout = normalizeBookingRoomParam(layout);
    if (fromLayout) resolved = fromLayout;
  }
  /** @type {Record<string, string>} */
  const prefill = {};
  if (resolved) prefill.room = resolved;
  const occupancy = params.get('occupancy');
  if (occupancy) {
    prefill.occupancy = occupancy;
  } else if (resolved) {
    const option = getBookingRoomOption(resolved);
    if (option?.defaultOccupancy) prefill.occupancy = option.defaultOccupancy;
  }
  return prefill;
}