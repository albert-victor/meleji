/** Site-wide contact – phone unchanged; emails per channel (Nov 2026). */
export const CONTACT = {
  email: 'info@melejiexperience.com',
  foundationEmail: 'foundation@melejiexperience.com',
  phone: '+255756344075',
  phoneLabel: '+255 756 344 075',
  location: 'Arusha, Tanzania',
  whatsappUrl: 'https://wa.me/255756344075',
};

/** Hash targets on the foundation overview page. */
export const FOUNDATION_ANCHORS = {
  sponsorChild: '#sponsor-a-child',
};

/** Full routes (any page → foundation section). */
export const FOUNDATION_HREFS = {
  form: '/pages/contact/?intent=foundation',
  sponsorChild: `/pages/foundation/${FOUNDATION_ANCHORS.sponsorChild}`,
};

/**
 * @param {string} message
 */
export function buildWhatsAppHref(message) {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
