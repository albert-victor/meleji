import { CONTACT, FOUNDATION_HREFS } from './contact.js';

/**
 * Full site map for the hamburger panel. Routes are registered in vite as pages are added.
 */
export const primaryNav = [
  { label: 'Explore', href: '/pages/accommodation/' },
  { label: 'Our Story', href: '/pages/about/' },
  { label: 'Contact Us', href: '/pages/contact/' },
];

/** Italic links in the full-screen menu – specific Meleji ecosystem labels. */
export const menuPrimary = [
  { label: 'Home', href: '/' },
  { label: 'Accommodation', href: '/pages/accommodation/' },
  { label: 'Safaris & Tours', href: '/pages/safaris/' },
  { label: 'Local Experiences', href: '/pages/experiences/' },
  { label: 'Meleji Foundation', href: '/pages/foundation/' },
  { label: 'Book Your Stay', href: '/pages/booking/' },
];

/** Side column – quieter routes with hospitality-led labels. */
export const menuMinor = [
  { label: 'Shared rooms', href: '/pages/accommodation/shared-rooms/' },
  { label: 'Deluxe rooms', href: '/pages/accommodation/deluxe-rooms/' },
  { label: 'Safari packages', href: '/pages/safaris/packages/' },
  { label: 'Destinations', href: '/pages/safaris/destinations/' },
  { label: 'Gallery', href: '/pages/gallery/' },
  { label: 'Volunteer with us', href: FOUNDATION_HREFS.form },
  { label: 'Partner with us', href: FOUNDATION_HREFS.form },
  { label: 'About Meleji', href: '/pages/about/' },
  { label: 'Contact the house', href: '/pages/contact/' },
];

export const menuAside = {
  eyebrow: 'Further in',
  tagline: 'Rest, routes and community in Arusha.',
};

/**
 * Social / contact row. WhatsApp, email and phone use verified details.
 * Instagram, Facebook and YouTube point to Contact until official profile URLs are supplied.
 */
export const menuSocial = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/255756344075',
    icon: 'fa-brands fa-whatsapp',
    brand: 'whatsapp',
    external: true,
  },
  {
    label: 'Instagram',
    href: '/pages/contact/',
    icon: 'fa-brands fa-instagram',
    brand: 'instagram',
  },
  {
    label: 'Facebook',
    href: '/pages/contact/',
    icon: 'fa-brands fa-facebook-f',
    brand: 'facebook',
  },
  {
    label: 'YouTube',
    href: '/pages/contact/',
    icon: 'fa-brands fa-youtube',
    brand: 'youtube',
  },
  {
    label: 'Booking.com',
    href: '/pages/booking/',
    icon: 'fa-solid fa-hotel',
    brand: 'booking',
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: 'fa-solid fa-envelope',
    brand: 'email',
  },
  {
    label: 'Call',
    href: 'tel:+255756344075',
    icon: 'fa-solid fa-phone',
    brand: 'phone',
  },
];

/** Footer icon row – social brands only (contact stays in the Get in touch column). */
export const footerSocial = menuSocial.filter((item) =>
  ['whatsapp', 'instagram', 'facebook', 'youtube'].includes(item.brand),
);

/** Compact hamburger rails – kept for any legacy references. */
export const menuRails = [
  { label: 'Home', href: '/', type: 'link' },
  {
    label: 'Stay',
    type: 'disclosure',
    href: '/pages/accommodation/',
    children: [
      { label: 'Shared Rooms', href: '/pages/accommodation/shared-rooms/' },
      { label: 'Deluxe Rooms', href: '/pages/accommodation/deluxe-rooms/' },
      { label: 'All accommodation', href: '/pages/accommodation/' },
    ],
  },
  {
    label: 'Explore',
    type: 'disclosure',
    href: '/pages/safaris/',
    children: [
      { label: 'Safari packages', href: '/pages/safaris/packages/' },
      { label: 'Destinations', href: '/pages/safaris/destinations/' },
      { label: 'Tailor-made safari', href: '/pages/safaris/custom/' },
      { label: 'Local experiences', href: '/pages/experiences/' },
    ],
  },
  {
    label: 'Our Story',
    type: 'disclosure',
    href: '/pages/about/',
    children: [
      { label: 'About Meleji', href: '/pages/about/' },
      { label: 'Meleji Children Foundation', href: '/pages/foundation/' },
      { label: 'Volunteer with us', href: FOUNDATION_HREFS.form },
      { label: 'Contact', href: '/pages/contact/' },
    ],
  },
];

export const menuSections = [
  {
    label: 'Home',
    href: '/',
    type: 'link',
  },
  {
    label: 'Accommodation',
    type: 'group',
    children: [
      { label: 'Shared Rooms', href: '/pages/accommodation/shared-rooms/' },
      { label: 'Deluxe Rooms', href: '/pages/accommodation/deluxe-rooms/' },
      { label: 'All rooms', href: '/pages/accommodation/' },
    ],
  },
  {
    label: 'Safaris & Tours',
    type: 'group',
    children: [
      { label: 'Destinations', href: '/pages/safaris/destinations/' },
      { label: 'Safari Packages', href: '/pages/safaris/packages/' },
      { label: 'Tailor-Made Safari', href: '/pages/safaris/custom/' },
    ],
  },
  {
    label: 'Local Experiences',
    type: 'group',
    children: [
      { label: 'Swahili Food', href: '/pages/experiences/swahili-food/' },
      { label: 'Coffee Experience', href: '/pages/experiences/coffee/' },
      { label: 'Cultural Experiences', href: '/pages/experiences/culture/' },
      { label: 'Nature & Hiking', href: '/pages/experiences/nature/' },
    ],
  },
  {
    label: 'Meleji Children Foundation',
    type: 'group',
    children: [
      { label: 'Our Mission', href: '/pages/foundation/' },
      { label: 'Volunteer With Us', href: FOUNDATION_HREFS.form },
      { label: 'Community Impact', href: '/pages/foundation/impact/' },
    ],
  },
  { label: 'About Meleji', href: '/pages/about/', type: 'link' },
  { label: 'Contact', href: '/pages/contact/', type: 'link' },
];
