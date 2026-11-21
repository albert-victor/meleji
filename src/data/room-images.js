/**
 * Room photography – verified subjects in docs/content-status.md.
 */
import { ACCOMMODATION_PHOTOS_01_13 } from './accommodation-numbered-images.js';
import sharedBunks from '../assets/images/accommodation/acc1.jpg';
import sharedAlt from '../assets/images/accommodation/29cfe7ec-9023-43de-bf45-658e1df8a9a3.jpg';
import deluxe1 from '../assets/images/accommodation/Deluxe_1.jpg';
import deluxe2 from '../assets/images/accommodation/Deluxe_2.jpg';
import deluxe3 from '../assets/images/accommodation/Deluxe_3.jpg';
import deluxeWebp from '../assets/images/optimized/roomDeluxe-1600.webp';
import deluxeWebpSm from '../assets/images/optimized/roomDeluxe-800.webp';
import sharedWebp from '../assets/images/optimized/roomShared-1600.webp';
import sharedWebpSm from '../assets/images/optimized/roomShared-800.webp';
import deluxeHero from '../assets/images/Meleji-Foundation/hero-image-1.png';
import homestayExterior from '../assets/images/optimized/hero-1920.webp';

export const SHARED_ROOM_GALLERY = [
  { src: sharedWebp, alt: 'Shared bunk-style room at Meleji Homestays' },
  { src: sharedBunks, alt: 'Wooden bunk beds in the shared room' },
  ...ACCOMMODATION_PHOTOS_01_13.slice(0, 5),
  { src: sharedWebpSm, alt: 'Sleeping area in the shared room' },
  { src: sharedAlt, alt: 'Guest accommodation interior at the homestay' },
  { src: homestayExterior, alt: 'Meleji Homestays exterior near the rooms' },
];

export const DELUXE_ROOM_GALLERY = [
  { src: deluxeWebp, alt: 'Deluxe private room with warm timber details' },
  { src: deluxe1, alt: 'Deluxe room alternate angle' },
  { src: deluxe2, alt: 'Private deluxe room interior' },
  { src: deluxe3, alt: 'Deluxe room sleeping area' },
  ...ACCOMMODATION_PHOTOS_01_13.slice(5),
  { src: deluxeWebpSm, alt: 'Comfortable deluxe room layout' },
  { src: deluxeHero, alt: 'Deluxe room at Meleji Homestays' },
];

export { ACCOMMODATION_PHOTOS_01_13 };