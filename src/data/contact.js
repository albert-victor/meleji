/** Contact details transcribed from the existing official main_logo.jpg. */
export const CONTACT = {
  email: 'melejihouse@gmail.com',
  phone: '+255756344075',
  phoneLabel: '+255 756 344 075',
  location: 'Arusha, Tanzania',
  whatsappUrl: 'https://wa.me/255756344075',
};

/**
 * @param {string} message
 */
export function buildWhatsAppHref(message) {
  return `${CONTACT.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
