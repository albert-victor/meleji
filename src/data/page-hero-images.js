import propertyHero from '../assets/images/optimized/hero-1920.webp';
import { CINEMATIC_HERO_IMAGES } from './cinematic-hero-images.js';
import expHero from '../assets/images/moments/in_the_Field.jpg';
import heroEducation from '../assets/images/Meleji-Foundation/5b57b738-426c-4262-b033-2cd83052b120.jpg';
import galleryMoment from '../assets/images/moments/moments.jpg';
import roomDeluxe from '../assets/images/optimized/roomDeluxe-1600.webp';

/** Default full-bleed heroes for static inner pages (content-specific where possible). */
export const INNER_PAGE_HERO_IMAGES = {
  about: {
    src: propertyHero,
    alt: 'Outdoor seating at Meleji Homestays in Arusha',
  },
  contact: {
    src: expHero,
    alt: 'Guests with hosts in the Arusha region',
  },
  gallery: {
    src: galleryMoment,
    alt: 'Homestay and travel moments from the Meleji archive',
  },
  booking: {
    src: roomDeluxe,
    alt: 'Deluxe guest room at Meleji Homestays',
  },
  foundation: {
    src: heroEducation,
    alt: 'Young people during learning time at Meleji Children Foundation',
  },
  foundationVolunteer: {
    src: heroEducation,
    alt: 'Volunteers with children at the foundation',
  },
  foundationImpact: {
    src: heroEducation,
    alt: 'Foundation programme in session',
  },
  safaris: CINEMATIC_HERO_IMAGES.safaris,
  accommodation: CINEMATIC_HERO_IMAGES.accommodation,
  experiences: {
    src: expHero,
    alt: 'Local experience in the field near Arusha',
  },
};