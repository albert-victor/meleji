import moments from '../assets/images/moments/moments.jpg';
import waterfall from '../assets/images/optimized/waterfall-1600.webp';
import landscape from '../assets/images/optimized/landscape-1600.webp';
import intro from '../assets/images/optimized/intro-1600.webp';
import hero from '../assets/images/optimized/hero-1920.webp';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import expFood from '../assets/images/optimized/expFood-1600.webp';
import foundationMain from '../assets/images/Meleji-Foundation/main_1.jpg';
import {
  getDestinationBySlug,
  getPackageBySlug,
  getSafariActivityBySlug,
} from './published/lookup.js';

/** Landing page only — injected via footer variant `home`. */
export const HOME_VISIT_CTA = {
  eyebrow: 'Plan your visit',
  title: 'Ready to hold your dates?',
  body: "Tell us what you'd like to experience.<br />We'll help you plan it.",
  image: moments,
  imageAlt: '',
  primary: { label: 'Book Your Stay', href: '/pages/booking/' },
};

const SKIP_PAGES = new Set(['not-found']);

/**
 * @returns {import('../components/page-visit-cta.js').renderPageVisitCta extends Function ? Parameters<typeof import('../components/page-visit-cta.js').renderPageVisitCta>[0] : never} | null
 */
export function resolvePageVisitCta(page, slug = '') {
  if (!page || SKIP_PAGES.has(page)) return null;

  if (page === 'package-detail' && slug) {
    const pkg = getPackageBySlug(slug);
    if (!pkg) return null;
    return {
      eyebrow: 'Safari enquiry',
      title: `Plan this ${pkg.duration ? `${pkg.duration} ` : ''}route`,
      body: `Tell us your dates and how many travellers. We will adapt <em>${pkg.name}</em> around your stay in Arusha.`,
      image: pkg.landscapeSrc || pkg.imageSrc,
      imageAlt: pkg.imageAlt || pkg.name,
      primary: { label: 'Send safari enquiry', href: '#package-enquiry' },
    };
  }

  if (page === 'destination-detail' && slug) {
    const dest = getDestinationBySlug(slug);
    if (!dest) return null;
    return {
      eyebrow: 'Explore this region',
      title: `Safari ideas for ${dest.name}`,
      body: 'Share how much time you have. The team can outline day trips or longer routes that include this destination.',
      image: dest.landscapeSrc || dest.imageSrc || landscape,
      imageAlt: dest.imageAlt || dest.name,
      primary: { label: 'Tailor your safari', href: `/pages/safaris/custom/?destination=${slug}` },
    };
  }

  if (page === 'safari-activity-detail' && slug) {
    const act = getSafariActivityBySlug(slug);
    if (!act) return null;
    return {
      eyebrow: 'Book this experience',
      title: act.title,
      body: 'Mention this activity in your enquiry. We will fit it around your accommodation and other travel plans.',
      image: act.landscapeSrc || act.imageSrc,
      imageAlt: act.imageAlt || act.title,
      primary: { label: 'Activity enquiry', href: act.enquiryHref || `/pages/safaris/custom/?activity=${slug}` },
    };
  }

  const defaults = {
    accommodation: {
      eyebrow: 'Stay in Arusha',
      title: 'Choose a room for your dates',
      body: 'Shared or private rooms with meals and local hosts. Send an enquiry and the team will confirm rates.',
      image: intro,
      imageAlt: 'Outdoor seating at Meleji Homestays',
      primary: { label: 'Booking enquiry', href: '/pages/booking/' },
    },
    'room-detail': {
      eyebrow: 'Hold your room',
      title: slug === 'deluxe-rooms' ? 'Reserve a deluxe room' : 'Reserve a shared room',
      body: 'Include your dates and guest count. The homestay team replies with availability and nightly rates.',
      image: slug === 'deluxe-rooms' ? hero : intro,
      imageAlt: 'Room at Meleji Homestays',
      primary: { label: 'Book this room type', href: '/pages/booking/' },
    },
    safaris: {
      eyebrow: 'Safaris & tours',
      title: 'Build your Tanzania route',
      body: 'Day trips, national parks, and multi-day itineraries with guides who know the region.',
      image: landscape,
      imageAlt: 'Landscape in northern Tanzania',
      primary: { label: 'Custom safari enquiry', href: '/pages/safaris/custom/' },
    },
    destinations: {
      eyebrow: 'Where to go',
      title: 'Pick a destination',
      body: 'From Arusha National Park to the Serengeti — start with a place, then shape the days around your stay.',
      image: landscape,
      imageAlt: 'Tanzania landscape',
      primary: { label: 'Browse destinations', href: '/pages/safaris/destinations/' },
    },
    packages: {
      eyebrow: 'Safari packages',
      title: 'Find a ready-made itinerary',
      body: 'Imported route ideas you can adapt with Meleji drivers and lodging around your homestay nights.',
      image: waterfall,
      imageAlt: 'Forest waterfall near Arusha',
      primary: { label: 'View all packages', href: '/pages/safaris/packages/' },
    },
    'safari-activities': {
      eyebrow: 'Activities',
      title: 'Add experiences to your stay',
      body: 'Coffee tours, game drives, culture visits, and forest walks — layered onto accommodation or safari days.',
      image: expCoffee,
      imageAlt: 'Coffee experience in Tanzania',
      primary: { label: 'Explore activities', href: '/pages/safaris/activities/' },
    },
    'safari-custom': {
      eyebrow: 'Your route',
      title: 'Tell us what you hope to see',
      body: 'No fixed package required. Describe your dates, budget, and must-see places.',
      image: landscape,
      imageAlt: 'Safari landscape',
      primary: { label: 'Start safari enquiry', href: '#safari-custom-form' },
    },
    experiences: {
      eyebrow: 'Local life',
      title: 'Experiences at Meleji',
      body: 'Swahili food, coffee, culture, and nature outings arranged with hosts in Arusha.',
      image: expFood,
      imageAlt: 'Meal shared at the homestay',
      primary: { label: 'See all experiences', href: '/pages/experiences/' },
    },
    'experience-detail': {
      eyebrow: 'Local experiences',
      title: 'Add this to your stay',
      body: 'Mention the experience when you book accommodation or plan a safari with the team.',
      image: slug === 'coffee' ? expCoffee : slug === 'swahili-food' ? expFood : intro,
      imageAlt: 'Experience at Meleji',
      primary: { label: 'Book your stay', href: '/pages/booking/' },
    },
    foundation: {
      eyebrow: 'Meleji Children Foundation',
      title: 'Learn about community work',
      body: 'Visits and volunteering are arranged with safeguarding and scheduling agreed in advance.',
      image: foundationMain,
      imageAlt: 'Meleji Children Foundation programme',
      primary: { label: 'Foundation overview', href: '/pages/foundation/' },
    },
    'foundation-volunteer': {
      eyebrow: 'Volunteer',
      title: 'Discuss skills and time',
      body: 'Educational volunteering is coordinated with foundation staff — not drop-in visits.',
      image: foundationMain,
      imageAlt: 'Foundation community programmes',
      primary: { label: 'Volunteer enquiry', href: '#foundation-form' },
    },
    'foundation-impact': {
      eyebrow: 'Community impact',
      title: 'Partner or donate with purpose',
      body: 'Speak with the foundation team about current priorities and transparent reporting.',
      image: foundationMain,
      imageAlt: 'Foundation outreach',
      primary: { label: 'Contact the foundation', href: '/pages/contact/' },
    },
    about: {
      eyebrow: 'Our story',
      title: 'Stay, explore, give back',
      body: 'Homestays, safaris, and foundation work under one team in Arusha.',
      image: hero,
      imageAlt: 'Meleji Homestays hospitality',
      primary: { label: 'Book your stay', href: '/pages/booking/' },
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Start with a conversation',
      body: 'Email, phone, or WhatsApp — we reply with next steps for stays, safaris, or foundation visits.',
      image: intro,
      imageAlt: 'Welcome at Meleji',
      primary: { label: 'Send a message', href: '#contact-form' },
    },
    gallery: {
      eyebrow: 'See the homestay',
      title: 'Picture your stay',
      body: 'When you are ready, send dates and room preference for a booking enquiry.',
      image: expFood,
      imageAlt: 'Guests at Meleji Homestays',
      primary: { label: 'Booking enquiry', href: '/pages/booking/' },
    },
    booking: {
      eyebrow: 'Almost there',
      title: 'Send your stay enquiry',
      body: 'Complete the form above. The team confirms availability, rates, and payment steps.',
      image: intro,
      imageAlt: 'Meleji Homestays',
      primary: { label: 'Back to accommodation', href: '/pages/accommodation/' },
    },
    'package-template': {
      eyebrow: 'Safari packages',
      title: 'Enquire about this sample route',
      body: 'Package pages use this layout while content is prepared.',
      image: landscape,
      imageAlt: 'Safari route',
      primary: { label: 'Safari enquiry', href: '/pages/safaris/custom/' },
    },
  };

  return defaults[page] ?? null;
}
