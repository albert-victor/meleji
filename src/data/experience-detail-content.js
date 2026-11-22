import food1 from '../assets/images/safari-activities/swahili-food/swahili-food_class.jpg';
import food2 from '../assets/images/safari-activities/swahili-food/swahili_food_class2.jpg';
import expFood from '../assets/images/optimized/expFood-1600.webp';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import intro from '../assets/images/optimized/intro-1600.webp';
import fieldImg from '../assets/images/accommodation/I_the_field.jpg';
import waterfallImg from '../assets/images/sticky-sections/waterfalls_1.jpg';
import momentsImg from '../assets/images/moments/moments.jpg';
import momentField from '../assets/images/moments/in_the_Field.jpg';
import culturalTourHero from '../assets/images/safari-activities/local_markets1.jpg';
import culturalTourStreet from '../assets/images/safari-activities/city_tours/local_markets2.jpg';
import foundationCommunity from '../assets/images/Meleji-Foundation/main_6.jpg';
import momentBanner from '../assets/images/moments/c1b2d090-2feb-4c12-9423-6315de68c646.jpg';
import { COFFEE_HOMESTAY, EXPERIENCE_CULTURE, FOOD_PRICING, FOUNDATION_PRICING, formatUsd } from './pricing.js';

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
    body: 'Follow cherries from pulping through drying – stages vary with weather and batch size.',
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
    body: `Sit down to taste the coffee you helped prepare. ${formatUsd(COFFEE_HOMESTAY.perPerson)} per person – total depends on guest count, confirmed on enquiry.`,
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
  { name: 'Maharage (beans)', description: 'Slow-cooked beans seasoned with local spices – a staple on many plates.' },
  { name: 'Mboga (greens)', description: 'Seasonal vegetables prepared simply alongside rice or ugali.' },
  { name: 'Ugali or rice', description: 'Starch options depending on what the kitchen prepares that day.' },
  { name: 'Chapati', description: 'Flatbread when flour is available and hosts have time to prepare it.' },
  { name: 'Grilled options', description: 'Sometimes offered when ingredients allow – confirm when you book.' },
];

export const FOOD_PRICING_NOTES = [
  `${formatUsd(FOOD_PRICING.plate)} – one served meal (per plate, not per ingredient).`,
  `${formatUsd(FOOD_PRICING.fullDay)} – lunch and dinner on the same day (package – confirm serving style with hosts).`,
  'Menus shift with market availability. Share dietary needs when you enquire.',
];

export const CULTURE_DETAIL = {
  images: [
    { src: culturalTourHero, alt: 'Stalls and spice rows on a guided Arusha market morning' },
    { src: culturalTourStreet, alt: 'Walking Arusha streets with a local guide' },
    { src: momentField, alt: 'Hosts and guests together near Arusha' },
    { src: foundationCommunity, alt: 'Approved foundation visit when pre-arranged' },
  ],
  panels: [
    {
      title: 'Community-led introductions',
      body: 'Visits are arranged when local hosts have time and when introductions respect household privacy.',
    },
    {
      title: 'Foundation visits',
      body: 'Time at Meleji Children Foundation follows safeguarding guidance on the foundation pages – never unannounced.',
    },
    {
      title: 'Timing and pace',
      body: 'Half-day or single-activity visits suit most guests. The team shares what is realistic before you confirm.',
    },
  ],
  pricingTiers: [
    {
      label: 'Foundation campus day',
      amount: EXPERIENCE_CULTURE.foundationVisitFrom,
      unit: 'per person',
      note: 'Volunteer-day guide rate when you join an approved foundation activity.',
    },
    {
      label: 'Host-led community visit',
      amount: null,
      unit: 'quoted on enquiry',
      note: 'Depends on introductions available, transport, and group size.',
    },
    {
      label: 'Child sponsorship (optional)',
      amount: FOUNDATION_PRICING.childSponsorFrom,
      unit: 'per month',
      note: 'Private sponsorship – separate from a single visit; team explains reporting.',
    },
  ],
  details: [
    'Introductory meeting with Meleji hosts before any community visit',
    'Safeguarding rules for foundation time (pre-booked only)',
    'Respect for photography and privacy requests from local families',
    'Whatsapp confirmation of date, meeting point, and dress code',
  ],
};

export const FOOD_PRICING_TIERS = [
  { label: 'Per plate', amount: FOOD_PRICING.plate, unit: 'one served meal' },
  { label: 'Lunch + dinner', amount: FOOD_PRICING.fullDay, unit: 'same day at the homestay' },
];

export const COFFEE_PRICING_TIERS = [
  {
    label: 'Homestay coffee journey',
    amount: COFFEE_HOMESTAY.perPerson,
    unit: 'per person',
    note: 'Multiply by each participant in your enquiry.',
  },
];

export const NATURE_DETAIL = {
  images: [
    { src: waterfallImg, alt: 'Forest waterfall outing with a guide' },
    { src: fieldImg, alt: 'Trails and open ground near the homestay' },
    { src: momentField, alt: 'Guests walking with hosts in the Arusha countryside' },
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
    {
      title: 'Fitness and timing',
      body: 'Routes range from gentle walks to steeper waterfall approaches. Share mobility needs when you enquire.',
    },
  ],
  pricingTiers: [
    {
      label: 'Half-day guided outing',
      amount: null,
      unit: 'quoted on enquiry',
      note: 'Guide, timing, and meet point confirmed before you depart.',
    },
    {
      label: 'Waterfall walk add-on',
      amount: null,
      unit: 'quoted on enquiry',
      note: 'Seasonal access; may pair with a homestay stay or safari free day.',
    },
  ],
  details: [
    'Licensed or known local guide assigned by the Meleji team',
    'Safety briefing and realistic pace for your group',
    'Packed water recommendation; lunch optional on longer routes',
    'Transport from the homestay quoted separately when needed',
  ],
};
