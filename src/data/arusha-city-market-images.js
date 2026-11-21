/**
 * Arusha city tours & local markets – safari-activities folder photography.
 * Shared across activities, packages, homepage, and gallery.
 */
import cityPrimary from '../assets/images/safari-activities/city_tours/city_tours.jpg';
import citySecondary from '../assets/images/safari-activities/city_tours/city_tour1.jpg';
import market1 from '../assets/images/safari-activities/local_markets1.jpg';
import market2 from '../assets/images/safari-activities/city_tours/local_markets2.jpg';
import market3 from '../assets/images/safari-activities/city_tours/local_markets3.jpg';
import market4 from '../assets/images/safari-activities/city_tours/local_markets4.jpg';
import market5 from '../assets/images/safari-activities/city_tours/local_markets5.jpg';

/** Slugs that use softer hover/drift (lower-resolution source files). */
export const ARUSHA_URBAN_PHOTO_SLUGS = new Set([
  'city-tours',
  'local-markets-tours',
  'arusha-city-tour',
  'arusha-local-markets-tour',
]);

export const ARUSHA_CITY_MARKET_HOME = {
  actCity1: cityPrimary,
  actCity2: citySecondary,
  actCity3: citySecondary,
  actMarket1: market1,
  actMarket2: market2,
  actMarket3: market3,
};

export const ARUSHA_CITY_IMAGES = {
  primary: cityPrimary,
  secondary: citySecondary,
  gallery: [
    { src: cityPrimary, alt: 'Downtown streets and everyday life in Arusha' },
    { src: citySecondary, alt: 'Arusha cityscape and neighbourhood views' },
    { src: cityPrimary, alt: 'Guided walk through central Arusha' },
  ],
};

export const ARUSHA_MARKET_IMAGES = {
  primary: market1,
  secondary: market2,
  gallery: [
    { src: market1, alt: 'Colourful produce and shoppers at a local market' },
    { src: market2, alt: 'Spice and grain stalls in Arusha' },
    { src: market3, alt: 'Busy aisles at the trading market' },
    { src: market4, alt: 'Fresh ingredients and vendors at market stalls' },
    { src: market5, alt: 'Market atmosphere in Arusha' },
  ],
};