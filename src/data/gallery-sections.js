import { HOME_IMAGES } from './home-images.js';
import { FOUNDATION_GALLERY } from './foundation-images.js';
import { ACCOMMODATION_PHOTOS_01_13 } from './accommodation-numbered-images.js';

/**
 * Mosaic gallery sections — each tile has a layout slot (a–f) for CSS grid placement.
 * @type {{ eyebrow: string, title: string, lead?: string, tiles: { src: string, alt: string, slot: string }[] }[]}
 */
export const GALLERY_SECTIONS = [
  {
    eyebrow: 'Homestay',
    title: 'Rooms, meals, and quiet evenings',
    lead: 'Spaces where guests rest, share food, and plan the week ahead.',
    tiles: ACCOMMODATION_PHOTOS_01_13.slice(0, 6).map((photo, index) => ({
      src: photo.src,
      alt: photo.alt,
      slot: String.fromCharCode(97 + index),
    })),
  },
  {
    eyebrow: 'Homestay',
    title: 'More room photography',
    lead: 'Additional views from the numbered accommodation gallery (7–13).',
    layout: 'grid',
    tiles: ACCOMMODATION_PHOTOS_01_13.slice(6).map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      slot: 'a',
    })),
  },
  {
    eyebrow: 'Experiences',
    title: 'Coffee, food, and time outdoors',
    lead: 'Local classes and outings guests often pair with a stay in Arusha.',
    tiles: [
      { src: HOME_IMAGES.expCoffee, alt: 'Coffee experience at Meleji Homestays', slot: 'a' },
      { src: HOME_IMAGES.expFood, alt: 'Guests sharing a Swahili meal', slot: 'b' },
      { src: HOME_IMAGES.actCoffee2, alt: 'Coffee beans and roasting setup', slot: 'c' },
      { src: HOME_IMAGES.actSwahili1, alt: 'Swahili food class in the kitchen', slot: 'd' },
      { src: HOME_IMAGES.actWaterfalls1, alt: 'Waterfall excursion near Arusha', slot: 'e' },
      { src: HOME_IMAGES.actGame2, alt: 'Wildlife on a game drive', slot: 'f' },
    ],
  },
  {
    eyebrow: 'Arusha',
    title: 'City tours & local markets',
    lead: 'Urban mornings and market aisles — guided with Meleji in Arusha.',
    tiles: [
      { src: HOME_IMAGES.actCity1, alt: 'Streets and skyline around Arusha', slot: 'a' },
      { src: HOME_IMAGES.actMarket1, alt: 'Colour and movement at Central Market', slot: 'b' },
      { src: HOME_IMAGES.actCity2, alt: 'Neighbourhood views on a city tour', slot: 'c' },
      { src: HOME_IMAGES.actMarket2, alt: 'Spices and staples at local stalls', slot: 'd' },
      { src: HOME_IMAGES.actMarket3, alt: 'Guided market morning in Arusha', slot: 'e' },
    ],
  },
  {
    eyebrow: 'Foundation',
    title: 'Meleji Children Foundation',
    lead: 'Care, learning, and community moments — shared with dignity.',
    tiles: [
      { src: FOUNDATION_GALLERY[0].src, alt: FOUNDATION_GALLERY[0].alt, slot: 'a' },
      { src: FOUNDATION_GALLERY[2].src, alt: FOUNDATION_GALLERY[2].alt, slot: 'b' },
      { src: HOME_IMAGES.foundationMain3, alt: 'Children at the foundation', slot: 'c' },
      { src: FOUNDATION_GALLERY[3].src, alt: FOUNDATION_GALLERY[3].alt, slot: 'd' },
      { src: HOME_IMAGES.foundationMain5, alt: 'Foundation programme on site', slot: 'e' },
    ],
  },
  {
    eyebrow: 'Safaris & landscapes',
    title: 'Horizons from Arusha',
    lead: 'Park trips, lakes, and the landscapes that frame longer itineraries.',
    tiles: [
      { src: HOME_IMAGES.landscape, alt: 'Lake and mountain view near Arusha', slot: 'a' },
      { src: HOME_IMAGES.storyKilimanjaro, alt: 'Mount Kilimanjaro scenery', slot: 'b' },
      { src: HOME_IMAGES.actMigration2, alt: 'Great Migration wildlife scene', slot: 'c' },
      { src: HOME_IMAGES.momentLake, alt: 'Time by the lake', slot: 'd' },
      { src: HOME_IMAGES.actWalking1, alt: 'Walking safari in bush landscape', slot: 'e' },
      { src: HOME_IMAGES.momentField, alt: 'Guests on a guided field outing', slot: 'f' },
    ],
  },
];
