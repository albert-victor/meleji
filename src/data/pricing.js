/** Approved guide rates ($) – confirmed on enquiry before payment. */

/** @param {number} amount */
export function formatUsd(amount) {
  return `$${amount}`;
}
export const STAY_PRICING = {
  shared: { single: 15, double: 30, currency: 'USD', unit: 'per night' },
  deluxe: { night: 40, currency: 'USD', unit: 'per night' },
};

export const FOOD_PRICING = {
  plate: 10,
  fullDay: 20,
  currency: 'USD',
};

export const COFFEE_HOMESTAY = {
  perPerson: 30,
  currency: 'USD',
};

export const FOUNDATION_PRICING = {
  volunteerFrom: 10,
  teachFrom: 10,
  /** Private child sponsorship – monthly guide; team confirms match and reporting rhythm. */
  childSponsorFrom: 30,
  /** Programme top-ups (training meals, materials, funded sessions) – discussed on enquiry. */
  programmeSupportFrom: 100,
  currency: 'USD',
};

/** Guide tiers for local experience pages – totals confirmed on enquiry. */
export const EXPERIENCE_CULTURE = {
  foundationVisitFrom: FOUNDATION_PRICING.volunteerFrom,
  currency: 'USD',
};

/** Nature outings – no fixed public rate; team quotes transport and guide. */
export const EXPERIENCE_NATURE = {
  currency: 'USD',
};
