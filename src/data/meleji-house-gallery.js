/**
 * Homestay spaces shown without room pricing (bathrooms, kitchen, outdoors, commons).
 */
import { ACCOMMODATION_PHOTOS_01_13, GUEST_BATHROOM_PHOTO } from './accommodation-numbered-images.js';
import { HOME_IMAGES } from './home-images.js';
import deluxe1 from '../assets/images/accommodation/Deluxe_1.jpg';
import sharedAlt from '../assets/images/accommodation/29cfe7ec-9023-43de-bf45-658e1df8a9a3.jpg';
import homestayExterior from '../assets/images/optimized/intro-1600.webp';

/** @type {{ src: string, alt: string }[]} */
export const MELEJI_HOUSE_GALLERY = [
  { src: homestayExterior, alt: 'Outdoor seating and garden area at Meleji Homestays' },
  ...ACCOMMODATION_PHOTOS_01_13.map((photo, index) => ({
    src: photo.src,
    alt:
      index < 5
        ? photo.alt
        : `Interior and shared spaces at Meleji Homestays (${index + 1})`,
  })),
  GUEST_BATHROOM_PHOTO,
  { src: sharedAlt, alt: 'Guest common area at the homestay' },
  { src: deluxe1, alt: 'Timber details in guest accommodation' },
  { src: HOME_IMAGES.expCoffee, alt: 'Coffee served at Meleji Homestays' },
  { src: HOME_IMAGES.expFood, alt: 'Meals shared with hosts' },
  { src: HOME_IMAGES.intro, alt: 'Courtyard and chairs outside the rooms' },
];