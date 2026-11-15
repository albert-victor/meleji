import food1 from '../assets/images/safari-activities/swahili-food/swahili-food_class.jpg';
import food2 from '../assets/images/safari-activities/swahili-food/swahili_food_class2.jpg';
import expFood from '../assets/images/optimized/expFood-1600.webp';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import intro from '../assets/images/optimized/intro-1600.webp';
import fieldImg from '../assets/images/accommodation/I_the_field.jpg';
import waterfallImg from '../assets/images/sticky-sections/waterfalls_1.jpg';
import { COFFEE_HOMESTAY, FOOD_PRICING } from './pricing.js';

/** @type {{ step: number, title: string, body: string, image?: { src: string, alt: string } }[]} */
export const COFFEE_JOURNEY_STEPS = [
  {
    step: 1,
    title: 'Introduction to coffee growing',
    body: 'Mgei explains how coffee fits into the homestay setting and what you will see during the session.',
    image: { src: expCoffee, alt: 'Coffee session with hosts at Meleji Homestays' },
  },
  {
    step: 2,
    title: 'Plants and cultivation',
    body: 'Walk through how seedlings are cared for, shade, and seasonal tasks that farmers watch throughout the year.',
    image: { src: fieldImg, alt: 'Outdoor grounds at Meleji Homestays' },
  },
  {
    step: 3,
    title: 'Cherries and harvest',
    body: 'See how ripe cherries are selected and why timing matters before processing begins.',
    image: { src: intro, alt: 'Homestay courtyard and seating in Arusha' },
  },
  {
    step: 4,
    title: 'Processing and drying',
    body: 'Follow cherries from pulping through drying — stages vary with weather and batch size.',
  },
  {
    step: 5,
    title: 'Roasting',
    body: 'Watch beans change colour and aroma as they roast, with Mgei explaining heat and timing.',
    image: { src: expCoffee, alt: 'Roasted coffee at Meleji Homestays' },
  },
  {
    step: 6,
    title: 'Grinding and brewing',
    body: 'Grind freshly roasted beans and brew using methods available at the homestay.',
  },
  {
    step: 7,
    title: 'Tasting your cup',
    body: `Sit down to taste the coffee you helped prepare. USD ${COFFEE_HOMESTAY.perPerson} per person — total depends on guest count, confirmed on enquiry.`,
    image: { src: expCoffee, alt: 'Coffee tasting at the homestay' },
  },
];

export const FOOD_EXPERIENCE_IMAGES = [
  { src: food1, alt: 'Guests learning to prepare Swahili dishes' },
  { src: food2, alt: 'Shared cooking session with hosts' },
  { src: expFood, alt: 'Home-cooked meal at Meleji Homestays' },
];

/** @type {{ name: string, description: string }[]} */
export const FOOD_DISH_NOTES = [
  { name: 'Maharage (beans)', description: 'Slow-cooked beans seasoned with local spices — a staple on many plates.' },
  { name: 'Mboga (greens)', description: 'Seasonal vegetables prepared simply alongside rice or ugali.' },
  { name: 'Ugali or rice', description: 'Starch options depending on what the kitchen prepares that day.' },
  { name: 'Chapati', description: 'Flatbread when flour is available and hosts have time to prepare it.' },
  { name: 'Grilled options', description: 'Sometimes offered when ingredients allow — confirm when you book.' },
];

export const FOOD_PRICING_NOTES = [
  `USD ${FOOD_PRICING.plate} — one served meal (per plate, not per ingredient).`,
  `USD ${FOOD_PRICING.fullDay} — lunch and dinner on the same day (package — confirm serving style with hosts).`,
  'Menus shift with market availability. Share dietary needs when you enquire.',
];

export const CULTURE_DETAIL = {
  images: [
    { src: fieldImg, alt: 'Guests with a local host in the field' },
    { src: food2, alt: 'Community meal time' },
  ],
  panels: [
    {
      title: 'Community-led introductions',
      body: 'Visits are arranged when local hosts have time and when introductions respect household privacy.',
    },
    {
      title: 'Foundation visits',
      body: 'Time at Meleji Children Foundation follows safeguarding guidance on the foundation pages — never unannounced.',
    },
  ],
};

export const NATURE_DETAIL = {
  images: [
    { src: waterfallImg, alt: 'Forest waterfall outing' },
    { src: fieldImg, alt: 'Trails near Arusha with guides' },
  ],
  panels: [
    {
      title: 'Trails and waterfalls',
      body: 'Half-day outings can include waterfall walks with guides who know the terrain and seasonal conditions.',
    },
    {
      title: 'What to bring',
      body: 'Sturdy shoes, rain layer, and water. Routes may change if paths are wet or river levels are high.',
    },
  ],
};
