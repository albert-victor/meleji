/** @type {Record<string, string>} */
export const CONTACT_INTENT_ALIASES = {
  general: 'message',
  homestay: 'stay',
  house: 'stay',
  booking: 'stay',
};

const VALID_INTENTS = ['message', 'stay', 'safari', 'foundation'];

/**
 * @param {string | null | undefined} raw
 */
export function normalizeContactIntent(raw) {
  if (!raw) return 'message';
  const lower = raw.toLowerCase();
  const mapped = CONTACT_INTENT_ALIASES[lower] ?? lower;
  return VALID_INTENTS.includes(mapped) ? mapped : 'message';
}

/**
 * @param {Record<string, string>} [params]
 */
export function buildContactHref(params = {}) {
  const q = new URLSearchParams();
  const intent = params.intent ? normalizeContactIntent(params.intent) : '';
  Object.entries(params).forEach(([key, value]) => {
    if (!value) return;
    if (key === 'intent') {
      const normalized = normalizeContactIntent(value);
      if (normalized !== 'message') q.set('intent', normalized);
      return;
    }
    q.set(key, value);
  });
  const query = q.toString();
  return query ? `/pages/contact/?${query}` : '/pages/contact/';
}