/**
 * Priced room cards for the accommodation overview and home stay carousel.
 * Five layouts (shared, deluxe, and standard bed rooms) – guide rates in `pricing.js`.
 * Full detail pages remain `shared-rooms` and `deluxe-rooms` only.
 */
import { publishedRooms } from './rooms.js';
import { STAY_PRICING } from '../pricing.js';
import { ACCOMMODATION_PHOTOS_01_13 } from '../accommodation-numbered-images.js';

const sharedBedPhoto = ACCOMMODATION_PHOTOS_01_13[2]; // room interior / bed
const standardDoublePhoto = ACCOMMODATION_PHOTOS_01_13[4]; // bedding
/** Wide-angle hero – acc6 @ 1280px (not the 237px PNG screenshot). */
const standardPrivatePhoto = ACCOMMODATION_PHOTOS_01_13[5];

/** @type {import('../types.js').AccommodationItem[]} */
const standardRoomCards = [
  {
    id: 'standard-guest',
    status: 'published',
    title: 'Standard guest room',
    slug: 'standard-guest-room',
    description: 'A standard layout with a single bed – suited to solo guests who prefer a regular bed over bunks.',
    imageSrc: sharedBedPhoto.src,
    imageAlt: sharedBedPhoto.alt,
    occupancy: '1 guest',
    priceNote: `From USD ${STAY_PRICING.shared.single} per night`,
    priceFrom: STAY_PRICING.shared.single,
    priceUnit: 'per night · single',
    priceSubline: `Double occupancy from $${STAY_PRICING.shared.double} per night when available`,
    pricing: STAY_PRICING.shared,
    ratingStars: 4,
    roomKicker: 'Standard stay',
    services: [
      { icon: 'fa-bed', label: 'Single bed' },
      { icon: 'fa-shower', label: 'Bathroom on enquiry' },
      { icon: 'fa-wifi', label: 'Guest Wi‑Fi' },
      { icon: 'fa-mug-hot', label: 'Meals on request' },
    ],
    href: '/pages/accommodation/shared-rooms/',
    bookingHref: '/pages/booking/?room=standard-guest-room&occupancy=single',
  },
  {
    id: 'standard-double',
    status: 'published',
    title: 'Standard double room',
    slug: 'standard-double-room',
    description: 'Standard room with a double bed for couples or two guests travelling together.',
    imageSrc: standardDoublePhoto.src,
    imageAlt: standardDoublePhoto.alt,
    occupancy: '2 guests (couple or pair)',
    priceNote: `From USD ${STAY_PRICING.shared.double} per night`,
    priceFrom: STAY_PRICING.shared.double,
    priceUnit: 'per night · double',
    priceSubline: `Solo use from $${STAY_PRICING.shared.single} per night when a single is available`,
    pricing: STAY_PRICING.shared,
    ratingStars: 4,
    roomKicker: 'Standard stay',
    services: [
      { icon: 'fa-bed', label: 'Double bed' },
      { icon: 'fa-heart', label: 'Couples welcome' },
      { icon: 'fa-wifi', label: 'Guest Wi‑Fi' },
      { icon: 'fa-mug-hot', label: 'Meals on request' },
    ],
    href: '/pages/accommodation/shared-rooms/',
    bookingHref: '/pages/booking/?room=standard-double-room&occupancy=double',
  },
  {
    id: 'standard-private',
    status: 'published',
    title: 'Standard private room',
    slug: 'standard-private-room',
    description: 'Private standard room with a dedicated sleeping area – more quiet than shared bunk setups.',
    imageSrc: standardPrivatePhoto.src,
    imageAlt: standardPrivatePhoto.alt,
    occupancy: '1–2 guests (private)',
    priceNote: `USD ${STAY_PRICING.deluxe.night} per night`,
    priceFrom: STAY_PRICING.deluxe.night,
    priceUnit: 'per night · private',
    pricing: STAY_PRICING.deluxe,
    ratingStars: 4,
    roomKicker: 'Private standard',
    services: [
      { icon: 'fa-bed', label: 'Private sleeping area' },
      { icon: 'fa-door-closed', label: 'More privacy' },
      { icon: 'fa-wifi', label: 'Guest Wi‑Fi' },
      { icon: 'fa-mug-hot', label: 'Meals on request' },
    ],
    href: '/pages/accommodation/deluxe-rooms/',
    bookingHref: '/pages/booking/?room=standard-private-room&occupancy=double',
  },
];

export const accommodationRoomCards = [...publishedRooms, ...standardRoomCards];