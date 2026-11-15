import foodImg from '../../assets/images/optimized/expFood-1600.webp';
import coffeeImg from '../../assets/images/optimized/expCoffee-1600.webp';
import { ARUSHA_CITY_IMAGES, ARUSHA_MARKET_IMAGES } from '../arusha-city-market-images.js';
import natureImg from '../../assets/images/optimized/waterfall-1600.webp';
import waterfallImg from '../../assets/images/sticky-sections/waterfalls_1.jpg';
import { COFFEE_HOMESTAY, FOOD_PRICING } from '../pricing.js';

export const publishedExperiences = [
  {
    id: 'swahili-food',
    status: 'published',
    title: 'Swahili food',
    slug: 'swahili-food',
    summary: `Host-cooked plates from USD ${FOOD_PRICING.plate}; lunch and dinner USD ${FOOD_PRICING.fullDay}.`,
    longDescription:
      'Swahili dishes meet everyday local favourites at the homestay: maharage (beans), mboga mboga (greens), chapati, rice, grilled meats when available, and seasonal produce from nearby markets. Book per plate or a full day of lunch and dinner with the hosts.',
    imageSrc: foodImg,
    imageAlt: 'Guests sharing a meal at Meleji',
    landscapeSrc: foodImg,
    inclusions: [
      `USD ${FOOD_PRICING.plate} per plate — one served meal`,
      `USD ${FOOD_PRICING.fullDay} — lunch and dinner same day`,
      'Couples and small groups welcome — note party size when booking',
      'Dietary needs shared in advance',
      'Confirmed by WhatsApp or phone with the team',
    ],
    href: '/pages/experiences/swahili-food/',
    enquiryHref: '/pages/booking/?experience=swahili-food',
  },
  {
    id: 'coffee',
    status: 'published',
    title: 'Coffee experience',
    slug: 'coffee',
    summary: `With Mgei — from seedling to cup, USD ${COFFEE_HOMESTAY.perPerson} per person.`,
    longDescription:
      'Mgei walks you through coffee at the homestay: how it is grown, harvested, dried, and roasted, ending with your own cup to taste. Allow a relaxed morning or afternoon. Solo guests and couples book separately (two guests = two tickets).',
    imageSrc: coffeeImg,
    imageAlt: 'Coffee served in a Meleji cup',
    landscapeSrc: coffeeImg,
    inclusions: [
      `USD ${COFFEE_HOMESTAY.perPerson} per person`,
      'Single or couple booking',
      'Hosted at the homestay — timing confirmed on enquiry',
      'Materuni day trips booked separately under safaris',
    ],
    href: '/pages/experiences/coffee/',
    enquiryHref: '/pages/booking/?experience=coffee',
  },
  {
    id: 'culture',
    status: 'published',
    title: 'Cultural visits',
    slug: 'culture',
    summary: 'Community-led activities where available.',
    longDescription:
      'When appropriate introductions can be made, guests may join visits led by local hosts. Activities respect community time and privacy. Foundation-linked visits follow separate guidance on the foundation pages.',
    imageSrc: ARUSHA_CITY_IMAGES.primary,
    imageAlt: 'Arusha city streets on a guided cultural visit',
    landscapeSrc: ARUSHA_MARKET_IMAGES.primary,
    inclusions: [
      'Options depend on dates and local calendars',
      'Activities arranged with local hosts',
      'Foundation campus visits coordinated with the foundation team',
    ],
    href: '/pages/experiences/culture/',
    enquiryHref: '/pages/booking/?experience=culture',
  },
  {
    id: 'nature',
    status: 'published',
    title: 'Nature & hiking',
    slug: 'nature',
    summary: 'Trails and waterfalls with local guides.',
    longDescription:
      'Shorter walks and waterfall outings can be organised with guides who know the terrain. Difficulty, timing, and what to bring are explained before you set out.',
    imageSrc: natureImg,
    imageAlt: 'Waterfall surrounded by forest',
    landscapeSrc: waterfallImg,
    inclusions: [
      'Guide allocation confirmed on enquiry',
      'Fitness and footwear discussed in advance',
      'Weather may change route choices',
    ],
    href: '/pages/experiences/nature/',
    enquiryHref: '/pages/booking/?experience=nature',
  },
];
