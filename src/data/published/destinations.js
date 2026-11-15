import { arushaDestinations } from './arusha-destinations.js';
import safariImg from '../../assets/images/sticky-sections/9fb65259-cb55-42f6-95b3-310ab1cec6a2.jpg';
import northImg from '../../assets/images/moments/lake duluti.jpg';
import ruahaWide from '../../assets/images/sticky-sections/2f4903d6-3b6e-4ec3-b2d8-d5ecdc2b7f3b.jpg';
import northWide from '../../assets/images/moments/lake duluti.jpg';

/**
 * Destinations (regions/areas) — separate from safari packages.
 * Arusha / Northern Circuit entries imported from Tanzania Tourism (see arusha-destinations.js).
 * Draft entries keep detail URLs for template QA only (noindex, not linked from indexes).
 */
export const publishedDestinations = [
  ...arushaDestinations,
  {
    id: 'ruaha',
    status: 'draft',
    name: 'Ruaha',
    slug: 'ruaha',
    region: 'Southern Tanzania',
    summary: 'Wildlife circuits discussed on enquiry.',
    context: [
      'Ruaha is often considered for longer southern circuits. Meleji discusses routing, season, and lodge choices directly with guests rather than listing fixed packages here.',
    ],
    imageSrc: safariImg,
    landscapeSrc: ruahaWide,
    imageAlt: 'Open landscape in southern Tanzania',
    href: '/pages/safaris/destinations/ruaha/',
  },
  {
    id: 'moshi',
    status: 'draft',
    name: 'Moshi & foothills',
    slug: 'moshi',
    region: 'Northern Tanzania',
    summary: 'Northern bases and hikes discussed on enquiry.',
    context: [
      'The Kilimanjaro foothills and lakes near Moshi are common bases for hiking and northern safari combinations. Specific day plans are built around your dates.',
    ],
    imageSrc: northImg,
    landscapeSrc: northWide,
    imageAlt: 'Lake and hills in northern Tanzania',
    href: '/pages/safaris/destinations/moshi/',
  },
];

/** Safe list for production UI (excludes draft until approved). */
export const liveDestinations = publishedDestinations.filter((d) => d.status === 'published');
