/**
 * DEV ONLY – used on /pages/dev/cards/ for component QA.
 * Must never be imported by production pages (/, inner routes).
 */
import deluxeImg from '../../assets/images/accommodation/Deluxe_1.jpg';
import waterfallImg from '../../assets/images/sticky-sections/waterfalls_1.jpg';
import fieldImg from '../../assets/images/moments/in_the_Field.jpg';

export const FIXTURE_NOTICE =
  'Development fixtures for card QA. Labels prefixed [DEV] are not business content.';

export const fixtureAccommodation = [
  {
    id: 'dev-shared',
    status: 'fixture',
    title: '[DEV] Shared room card',
    slug: 'dev-shared',
    description: 'Layout test copy only.',
    imageSrc: deluxeImg,
    imageAlt: 'Development placeholder photography',
    occupancy: 'Fixture',
    priceNote: 'Not a real rate',
    href: '/pages/dev/cards/',
  },
];

export const fixtureDestinations = [
  {
    id: 'dev-dest',
    status: 'fixture',
    name: '[DEV] Sample destination',
    slug: 'dev-destination',
    region: 'Fixture region',
    summary: 'Card spacing and image ratio test.',
    imageSrc: waterfallImg,
    imageAlt: 'Fixture landscape',
    href: '/pages/dev/cards/',
  },
];

export const fixturePackages = [
  {
    id: 'dev-pkg',
    status: 'fixture',
    name: '[DEV] Sample package shell',
    slug: 'dev-package',
    destinationSlugs: ['dev-destination'],
    durationLabel: null,
    summary: 'Package card without fabricated itinerary.',
    imageSrc: fieldImg,
    imageAlt: 'Fixture field scene',
    enquiryHref: '/pages/booking/',
    availabilityNote: 'Enquiry only – fixture',
  },
];

export const fixtureExperiences = fixtureAccommodation.map((r, i) => ({
  id: `dev-exp-${i}`,
  status: 'fixture',
  title: '[DEV] Experience card',
  slug: 'dev-experience',
  summary: 'Experience card component test.',
  imageSrc: r.imageSrc,
  imageAlt: 'Fixture image',
  href: '/pages/dev/cards/',
}));

export const fixtureActivities = [
  { id: 'dev-icon', label: '[DEV] Icon tile', icon: 'fa-plane', description: 'Icon card test' },
];

export const fixtureCommunity = [
  {
    id: 'dev-community',
    status: 'fixture',
    title: '[DEV] Programme card',
    summary: 'Community programme layout test.',
    imageSrc: deluxeImg,
    imageAlt: 'Fixture',
    href: '/pages/dev/cards/',
  },
];
