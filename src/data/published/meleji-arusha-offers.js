/**
 * Meleji-hosted Arusha city experiences (not Tanzania Tourism import).
 * Pricing: confirm on enquiry only.
 */
import { ARUSHA_CITY_IMAGES, ARUSHA_MARKET_IMAGES } from '../arusha-city-market-images.js';

const { primary: city01, secondary: city02, gallery: cityGallery } = ARUSHA_CITY_IMAGES;
const { primary: market01, secondary: market02, gallery: marketGallery } = ARUSHA_MARKET_IMAGES;
const pkgCity01 = city01;
const pkgCity02 = city02;
const pkgCity03 = cityGallery[2].src;
const pkgMarket01 = market01;
const pkgMarket02 = market02;
const pkgMarket03 = marketGallery[2].src;

/** @type {import('../types.js').SafariActivityItem[]} */
export const melejiArushaActivities = [
  {
    id: 'city-tours',
    status: 'published',
    title: 'Arusha city tours',
    slug: 'city-tours',
    icon: 'fa-building-columns',
    summary:
      'A paced walk through downtown Arusha — landmarks, neighbourhood cafés, and the everyday rhythm of the city between safari days.',
    longDescription:
      'Arusha is where many safaris begin, yet the city itself rewards a slower look. With a local guide, you can trace how the centre fits together: civic landmarks, tucked-away coffee houses, craft stalls, and the views that frame Mount Meru on clear mornings. Routes are adjusted for heat, foot traffic, and what you want to photograph or learn about.',
    context: [
      'Typical stops include the Clock Tower area, central streets where ministries and small businesses sit side by side, and independent cafés where Arushans pause between errands. Your guide explains how the city grew as a northern hub and how visitors can move respectfully through busy quarters.',
      'City tours suit guests staying at Meleji who want an urban counterpoint to wildlife days. They can be half-day or tailored shorter — timing, language, and transport from the homestay are confirmed when you enquire.',
      'This is a walking and light-vehicle outline, not a fixed shuttle product. Price is on request: the team quotes for your group size, guide, and any entrance or parking fees that apply on the day.',
    ],
    highlights: [
      'Price on request — confirmed by WhatsApp or email before you travel',
      'Clock Tower, central streets, and neighbourhood coffee stops',
      'Guide-led pacing suited to photography and questions',
      'Can be combined with a homestay stay or safari planning chat',
    ],
    relatedActivities: ['Local markets tours', 'Coffee experiences', 'Cultural Visits'],
    itinerarySample: [
      {
        day: 1,
        title: 'Sample half-day (enquiry outline)',
        body: 'Meet your guide near central Arusha. Visit the Clock Tower and surrounding civic quarter, continue on foot through trading streets, pause at a local coffee spot, and finish with time for questions or souvenir browsing. Return to Meleji or your next appointment — exact length agreed on enquiry.',
      },
    ],
    imageSrc: city01,
    landscapeSrc: city02,
    imageAlt: 'Streets and skyline around Arusha city centre',
    gallery: cityGallery,
    href: '/pages/safaris/activities/city-tours/',
    enquiryHref: '/pages/safaris/custom/?activity=city-tours',
    sourceNote:
      'Meleji-hosted city experience — routes and pricing confirmed with the team; not a third-party fixed product.',
  },
  {
    id: 'local-markets-tours',
    status: 'published',
    title: 'Local markets tours',
    slug: 'local-markets-tours',
    icon: 'fa-basket-shopping',
    summary:
      'Central Market and neighbourhood stalls — spices, produce, and the busy, social energy of Arusha’s trading floors.',
    longDescription:
      'Arusha’s markets are where residents buy beans, rice, cloth, and the spices that define Tanzanian kitchens. A guided visit helps you read the layout, greet stallholders politely, and sample colours and aromas without feeling rushed. It is separate from a city landmarks tour so you can focus on food culture, bargaining etiquette, and the crowd experience on its own terms.',
    context: [
      'Guides introduce common spices and staples — cardamom, cloves, cinnamon, dried chilli, and seasonal fruit — and explain how households shop in bulk versus daily portions. You see how stalls are organised, where tailors and household goods sit alongside produce, and how to stay aware in lively aisles.',
      'Tours are paced for curiosity, not shopping pressure. If you want to buy spices or gifts, your guide can advise on fair weights and packing for travel. Photography follows local customs; some vendors prefer a quiet word before you raise a camera.',
      'Price on request. Group size, market hours, and transport from Meleji are quoted on enquiry. Pair this with a city tour on another morning if you want both urban landmarks and market depth.',
    ],
    highlights: [
      'Price on request — no online checkout',
      'Spices, grains, and seasonal produce with context',
      'Guide support for etiquette, safety, and bargaining basics',
      'Standalone package — not bundled into the city tour by default',
    ],
    relatedActivities: ['Arusha city tours', 'Swahili food', 'Coffee experiences'],
    itinerarySample: [
      {
        day: 1,
        title: 'Sample market morning',
        body: 'Travel with your guide to Central Market or a nearby trading hall. Walk produce and spice rows, compare stall layouts, and pause where the team recommends for calm conversation. Optional stop for fresh juice or roasted nuts. Return with packing tips if you purchased spices — duration agreed on enquiry.',
      },
    ],
    imageSrc: market01,
    landscapeSrc: market02,
    imageAlt: 'Vendors and shoppers at a lively food market',
    gallery: marketGallery.slice(0, 3),
    href: '/pages/safaris/activities/local-markets-tours/',
    enquiryHref: '/pages/safaris/custom/?activity=local-markets-tours',
    sourceNote:
      'Meleji-hosted market visit — timing follows market hours; confirmed with the team on enquiry.',
  },
];

/** @type {import('../types.js').SafariPackageItem[]} */
export const melejiArushaPackages = [
  {
    id: 'arusha-city-tour',
    status: 'published',
    name: 'Arusha city tour',
    slug: 'arusha-city-tour',
    destinationSlugs: [],
    durationLabel: 'Half day',
    safariType: 'City & culture',
    tailorMade: 'Yes',
    region: 'Arusha city',
    summary:
      'Landmarks, neighbourhood streets, and coffee stops with a guide who knows the centre on foot.',
    longDescription:
      'Spend a morning or afternoon understanding Arusha beyond the safari brochure. Your guide connects the Clock Tower quarter, working streets, and relaxed café pauses into one coherent walk. Ideal between travel days or before you head to the parks.',
    context: [
      'The outline below is a sample — final timing, pick-up from Meleji, and languages follow your enquiry.',
      'This package covers urban sightseeing only. Market-focused visits are booked separately as the Local markets tour.',
      'Price on request for guide, transport if needed, and any same-day fees.',
    ],
    activities: ['Arusha city tours', 'Cultural Visits', 'Coffee experiences'],
    itinerary: [
      {
        day: 1,
        title: 'Arusha centre — landmarks & cafés',
        body: 'Pick-up agreed with Meleji. Guided walk through the Clock Tower area and central streets, coffee or snack stop at a trusted local spot, free time for photos or light shopping, and return. Route flexes with weather and events in town.',
      },
    ],
    imageSrc: pkgCity01,
    landscapeSrc: pkgCity02,
    imageAlt: 'Arusha city streets on a guided tour',
    gallery: cityGallery,
    href: '/pages/safaris/packages/arusha-city-tour/',
    enquiryHref: '/pages/safaris/custom/?package=arusha-city-tour',
    availabilityNote: 'Price on request — the Meleji team confirms guide, transport, and timing on enquiry.',
    sourceNote: 'Meleji city tour outline — not a fixed third-party rate.',
  },
  {
    id: 'arusha-local-markets-tour',
    status: 'published',
    name: 'Arusha local markets tour',
    slug: 'arusha-local-markets-tour',
    destinationSlugs: [],
    durationLabel: 'Half day',
    safariType: 'Markets & food culture',
    tailorMade: 'Yes',
    region: 'Arusha city',
    summary:
      'Central Market spice rows, produce, and the social bustle of Arusha trading life — with a guide beside you.',
    longDescription:
      'A dedicated market half-day for guests who want sensory detail: aroma of spices, stacked grains, tailors calling prices, and the easy chatter between neighbours. Your guide helps you navigate crowds, ask questions, and buy thoughtfully if you choose.',
    context: [
      'Market tours run when stalls are active — usually morning. The team confirms the day and meeting point on enquiry.',
      'This product is separate from the Arusha city tour so you are not rushing landmarks and spices into one overloaded schedule.',
      'Price on request; includes guide coordination. Purchases at stalls are yours to settle directly with vendors.',
    ],
    activities: ['Local markets tours', 'Swahili food', 'Cultural Visits'],
    itinerary: [
      {
        day: 1,
        title: 'Markets & spices',
        body: 'Meet your guide and enter Central Market (or an equivalent trading floor). Walk spice and produce lanes with commentary on staples used in Tanzanian homes. Optional tasting stops where appropriate. Wrap with packing advice for travellers buying spices to take home.',
      },
    ],
    imageSrc: pkgMarket01,
    landscapeSrc: pkgMarket02,
    imageAlt: 'Fresh produce and activity at a Tanzanian market',
    gallery: marketGallery.slice(0, 3),
    href: '/pages/safaris/packages/arusha-local-markets-tour/',
    enquiryHref: '/pages/safaris/custom/?package=arusha-local-markets-tour',
    availabilityNote: 'Price on request — confirmed with Meleji before you travel.',
    sourceNote: 'Meleji market visit outline — respects vendor privacy and market rules.',
  },
];
