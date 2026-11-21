/**
 * Approved full-bleed inner-page heroes – optimized WebP or large originals only.
 * Do not use landscape-1600 or low-res numbered room stills for landing heroes.
 */
import accommodationLanding from '../assets/images/optimized/hero-1920.webp';
import safariLanding from '../assets/images/destinations/serengeti-national-park/01.jpg';
import roomDeluxeLanding from '../assets/images/optimized/roomDeluxe-1600.webp';

export const CINEMATIC_HERO_IMAGES = {
  accommodation: {
    src: accommodationLanding,
    alt: 'Meleji Homestays – guesthouse exterior and courtyard in Arusha',
  },
  accommodationDeluxe: {
    src: roomDeluxeLanding,
    alt: 'Deluxe room interior at Meleji Homestays',
  },
  safaris: {
    src: safariLanding,
    alt: 'Serengeti plains at golden hour, northern Tanzania',
  },
};