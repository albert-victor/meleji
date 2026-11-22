import foodImg from '../../assets/images/optimized/expFood-1600.webp';
import coffeeImg from '../../assets/images/optimized/expCoffee-1600.webp';
import culturalTourHero from '../../assets/images/safari-activities/local_markets1.jpg';
import culturalTourInset from '../../assets/images/moments/in_the_Field.jpg';
import natureImg from '../../assets/images/optimized/waterfall-1600.webp';
import waterfallImg from '../../assets/images/sticky-sections/waterfalls_1.jpg';
import { COFFEE_HOMESTAY, FOOD_PRICING, formatUsd } from '../pricing.js';
import {
  COFFEE_PRICING_TIERS,
  CULTURE_DETAIL,
  FOOD_PRICING_TIERS,
  NATURE_DETAIL,
} from '../experience-detail-content.js';
import { experiencePriceSummary } from '../../components/experience-pricing.js';

export const publishedExperiences = [
  {
    id: 'swahili-food',
    status: 'published',
    title: 'Swahili food',
    slug: 'swahili-food',
    summary: 'Host-cooked plates and full-day dining with the family.',
    priceSummary: experiencePriceSummary(FOOD_PRICING_TIERS),
    longDescription:
      'Swahili dishes meet everyday local favourites at the homestay: maharage (beans), mboga mboga (greens), chapati, rice, grilled meats when available, and seasonal produce from nearby markets. Book per plate or a full day of lunch and dinner with the hosts.',
    imageSrc: foodImg,
    imageAlt: 'Guests sharing a meal at Meleji',
    landscapeSrc: foodImg,
    pricingTiers: FOOD_PRICING_TIERS,
    inclusions: [
      `${formatUsd(FOOD_PRICING.plate)} per plate – one served meal`,
      `${formatUsd(FOOD_PRICING.fullDay)} – lunch and dinner same day`,
      'Couples and small groups welcome – note party size when booking',
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
    summary: 'With Mgei – seedling to cup at the homestay.',
    priceSummary: experiencePriceSummary(COFFEE_PRICING_TIERS),
    longDescription:
      'Mgei walks you through coffee at the homestay: how it is grown, harvested, dried, and roasted, ending with your own cup to taste. Allow a relaxed morning or afternoon. Solo guests and couples book separately (two guests = two tickets).',
    imageSrc: coffeeImg,
    imageAlt: 'Coffee served in a Meleji cup',
    landscapeSrc: coffeeImg,
    pricingTiers: COFFEE_PRICING_TIERS,
    inclusions: [
      `${formatUsd(COFFEE_HOMESTAY.perPerson)} per person`,
      'Single or couple booking',
      'Hosted at the homestay – timing confirmed on enquiry',
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
    summary: 'Pre-arranged host and foundation introductions.',
    priceSummary: experiencePriceSummary(CULTURE_DETAIL.pricingTiers),
    longDescription:
      'When appropriate introductions can be made, guests may join visits led by local hosts and approved foundation activities. Every visit is pre-arranged so communities can prepare and safeguarding rules are respected.',
    imageSrc: culturalTourHero,
    imageAlt: 'Guided morning at Arusha market with a local host',
    landscapeSrc: culturalTourInset,
    cardImagePosition: 'center 35%',
    pricingTiers: CULTURE_DETAIL.pricingTiers,
    inclusions: CULTURE_DETAIL.details,
    href: '/pages/experiences/culture/',
    enquiryHref: '/pages/booking/?experience=culture',
  },
  {
    id: 'nature',
    status: 'published',
    title: 'Nature & hiking',
    slug: 'nature',
    summary: 'Trails and waterfall walks with local guides.',
    priceSummary: experiencePriceSummary(NATURE_DETAIL.pricingTiers),
    longDescription:
      'Shorter walks and waterfall outings can be organised with guides who know the terrain. Difficulty, timing, transport, and what to bring are explained before you set out.',
    imageSrc: natureImg,
    imageAlt: 'Waterfall surrounded by forest',
    landscapeSrc: waterfallImg,
    pricingTiers: NATURE_DETAIL.pricingTiers,
    inclusions: NATURE_DETAIL.details,
    href: '/pages/experiences/nature/',
    enquiryHref: '/pages/booking/?experience=nature',
  },
];