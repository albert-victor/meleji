import { HOME_IMAGES } from './home-images.js';
import { FOUNDATION_GALLERY } from './foundation-images.js';
import { MELEJI_HOUSE_GALLERY } from './meleji-house-gallery.js';

/**
 * Mosaic gallery sections – `layout: 'grid'` uses compact tiles; default is collage mosaic.
 * @type {{ eyebrow: string, title: string, lead?: string, layout?: 'grid', tiles: { src: string, alt: string, slot?: string }[] }[]}
 */
export const GALLERY_SECTIONS = [
  {
    eyebrow: 'Homestay',
    title: 'Rooms, bathrooms & shared spaces',
    lead: 'Sleeping areas plus kitchen, bath, and corners guests use every day.',
    layout: 'grid',
    tiles: MELEJI_HOUSE_GALLERY.map((photo) => ({
      src: photo.src,
      alt: photo.alt,
      slot: 'a',
    })),
  },
  {
    eyebrow: 'Experiences',
    title: 'Coffee, food, and time outdoors',
    lead: 'Local classes and outings guests often pair with a stay in Arusha.',
    layout: 'grid',
    tiles: [
      { src: HOME_IMAGES.expCoffee, alt: 'Coffee experience at Meleji Homestays' },
      { src: HOME_IMAGES.expFood, alt: 'Guests sharing a Swahili meal' },
      { src: HOME_IMAGES.actCoffee1, alt: 'Coffee beans at the homestay' },
      { src: HOME_IMAGES.actCoffee2, alt: 'Coffee beans and roasting setup' },
      { src: HOME_IMAGES.actCoffee3, alt: 'Coffee preparation with hosts' },
      { src: HOME_IMAGES.actSwahili1, alt: 'Swahili food class in the kitchen' },
      { src: HOME_IMAGES.actSwahili2, alt: 'Cooking with local hosts' },
      { src: HOME_IMAGES.actSwahili3, alt: 'Swahili food experience' },
      { src: HOME_IMAGES.actWaterfalls1, alt: 'Waterfall excursion near Arusha' },
      { src: HOME_IMAGES.actWaterfalls2, alt: 'Forest walk near waterfalls' },
      { src: HOME_IMAGES.actGame1, alt: 'Wildlife on a game drive' },
      { src: HOME_IMAGES.actGame2, alt: 'Game drive landscape' },
      { src: HOME_IMAGES.actWalking1, alt: 'Walking safari in bush landscape' },
      { src: HOME_IMAGES.actWalking2, alt: 'Guided walk in the bush' },
      { src: HOME_IMAGES.moments, alt: 'Moments with guests at Meleji' },
      { src: HOME_IMAGES.momentField, alt: 'Guests on a guided field outing' },
    ],
  },
  {
    eyebrow: 'Arusha',
    title: 'City tours & local markets',
    lead: 'Urban mornings and market aisles – guided with Meleji in Arusha.',
    layout: 'grid',
    tiles: [
      { src: HOME_IMAGES.actCity1, alt: 'Streets and skyline around Arusha' },
      { src: HOME_IMAGES.actCity2, alt: 'Neighbourhood views on a city tour' },
      { src: HOME_IMAGES.actCity3, alt: 'Coffee stop in Arusha' },
      { src: HOME_IMAGES.actMarket1, alt: 'Colour and movement at Central Market' },
      { src: HOME_IMAGES.actMarket2, alt: 'Spices and staples at local stalls' },
      { src: HOME_IMAGES.actMarket3, alt: 'Guided market morning in Arusha' },
      { src: HOME_IMAGES.momentLake, alt: 'Lake outing near Arusha' },
      { src: HOME_IMAGES.actCity2, alt: 'Arusha cityscape on a guided tour' },
    ].filter((t) => t.src),
  },
  {
    eyebrow: 'Foundation',
    title: 'Meleji Children Foundation',
    lead: 'Care, learning, and community moments – shared with dignity.',
    layout: 'grid',
    tiles: [
      { src: FOUNDATION_GALLERY[0]?.src, alt: FOUNDATION_GALLERY[0]?.alt ?? 'Foundation programme' },
      { src: FOUNDATION_GALLERY[1]?.src, alt: FOUNDATION_GALLERY[1]?.alt ?? 'Foundation activities' },
      { src: FOUNDATION_GALLERY[2]?.src, alt: FOUNDATION_GALLERY[2]?.alt ?? 'Foundation on site' },
      { src: FOUNDATION_GALLERY[3]?.src, alt: FOUNDATION_GALLERY[3]?.alt ?? 'Community learning' },
      { src: HOME_IMAGES.foundationMain, alt: 'Meleji Children Foundation community programmes' },
      { src: HOME_IMAGES.foundationMain2, alt: 'Foundation archive photography' },
      { src: HOME_IMAGES.foundationMain3, alt: 'Children at the foundation' },
      { src: HOME_IMAGES.foundationMain4, alt: 'Foundation daily care' },
      { src: HOME_IMAGES.foundationMain5, alt: 'Foundation programme on site' },
      { src: HOME_IMAGES.foundationMain6, alt: 'Foundation community' },
    ].filter((t) => t.src),
  },
  {
    eyebrow: 'Safaris & landscapes',
    title: 'Horizons from Arusha',
    lead: 'Park trips, lakes, and the landscapes that frame longer itineraries.',
    layout: 'grid',
    tiles: [
      { src: HOME_IMAGES.landscape, alt: 'Lake and mountain view near Arusha' },
      { src: HOME_IMAGES.storyKilimanjaro, alt: 'Mount Kilimanjaro scenery' },
      { src: HOME_IMAGES.waterfall, alt: 'Waterfall near Arusha' },
      { src: HOME_IMAGES.actMigration1, alt: 'Great Migration wildlife scene' },
      { src: HOME_IMAGES.actMigration2, alt: 'Migration route landscape' },
      { src: HOME_IMAGES.actMigration3, alt: 'Savannah wildlife' },
      { src: HOME_IMAGES.actBalloon1, alt: 'Balloon safari at dawn' },
      { src: HOME_IMAGES.actBalloon2, alt: 'Balloon over the plains' },
      { src: HOME_IMAGES.actHadzabe1, alt: 'Cultural visit with Hadzabe community' },
      { src: HOME_IMAGES.actHadzabe2, alt: 'Lake Eyasi region' },
      { src: HOME_IMAGES.momentBanner, alt: 'Safari day from Arusha' },
      { src: HOME_IMAGES.momentBirds, alt: 'Birdlife on safari' },
      { src: HOME_IMAGES.momentFalls, alt: 'Waterfall day trip' },
      { src: HOME_IMAGES.momentLake, alt: 'Time by the lake' },
    ].filter((t) => t.src),
  },
];