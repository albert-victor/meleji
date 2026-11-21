import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildInnerPageHtml } from '../src/utils/page-html.js';

const root = fileURLToPath(new URL('..', import.meta.url));

/** @type {import('../src/utils/page-html.js').buildInnerPageHtml extends Function ? Parameters<typeof buildInnerPageHtml>[0][] : never} */
const pages = [
  {
    path: 'pages/accommodation/index.html',
    title: 'Stay | Meleji Homestays',
    description: 'Shared and deluxe rooms at Meleji Homestays. Rates confirmed on enquiry.',
    page: 'accommodation',
    footer: 'full',
  },
  {
    path: 'pages/accommodation/shared-rooms/index.html',
    title: 'Shared rooms | Meleji Homestays',
    description: 'Shared accommodation for solo guests and pairs at Meleji Homestays.',
    page: 'room-detail',
    slug: 'shared-rooms',
    footer: 'compact',
  },
  {
    path: 'pages/accommodation/deluxe-rooms/index.html',
    title: 'Deluxe rooms | Meleji Homestays',
    description: 'Private deluxe rooms at Meleji Homestays.',
    page: 'room-detail',
    slug: 'deluxe-rooms',
    footer: 'compact',
  },
  {
    path: 'pages/safaris/index.html',
    title: 'Safaris & tours | Meleji Homestays',
    description: 'Safari planning and tours arranged with Meleji Homestays.',
    page: 'safaris',
    footer: 'full',
  },
  {
    path: 'pages/safaris/destinations/index.html',
    title: 'Destinations | Meleji Homestays',
    description: 'Safari destinations and regional context.',
    page: 'destinations',
    footer: 'full',
  },
  {
    path: 'pages/safaris/destinations/ruaha/index.html',
    title: 'Ruaha (draft) | Meleji Homestays',
    description: 'Draft destination page – not in navigation.',
    page: 'destination-detail',
    slug: 'ruaha',
    footer: 'compact',
    robots: 'noindex, nofollow',
  },
  {
    path: 'pages/safaris/destinations/moshi/index.html',
    title: 'Moshi & foothills (draft) | Meleji Homestays',
    description: 'Draft destination page – not in navigation.',
    page: 'destination-detail',
    slug: 'moshi',
    footer: 'compact',
    robots: 'noindex, nofollow',
  },
  {
    path: 'pages/safaris/packages/index.html',
    title: 'Safari packages | Meleji Homestays',
    description: 'Safari packages when published. Enquire meanwhile.',
    page: 'packages',
    footer: 'full',
  },
  {
    path: 'pages/safaris/packages/detail-template/index.html',
    title: 'Package template | Meleji Homestays',
    description: 'Layout template only.',
    page: 'package-template',
    footer: 'compact',
    robots: 'noindex, nofollow',
  },
  {
    path: 'pages/safaris/custom/index.html',
    title: 'Tailor-made safari | Meleji Homestays',
    description: 'Custom safari enquiry with Meleji Homestays.',
    page: 'safari-custom',
    footer: 'compact',
  },
  {
    path: 'pages/experiences/index.html',
    title: 'Local experiences | Meleji Homestays',
    description: 'Food, coffee, culture, and nature near Meleji Homestays.',
    page: 'experiences',
    footer: 'full',
  },
  {
    path: 'pages/experiences/swahili-food/index.html',
    title: 'Swahili food | Meleji Homestays',
    description: 'Swahili meals with hosts at Meleji Homestays.',
    page: 'experience-detail',
    slug: 'swahili-food',
    footer: 'compact',
  },
  {
    path: 'pages/experiences/coffee/index.html',
    title: 'Coffee experience | Meleji Homestays',
    description: 'Coffee from farm context to cup.',
    page: 'experience-detail',
    slug: 'coffee',
    footer: 'compact',
  },
  {
    path: 'pages/experiences/culture/index.html',
    title: 'Cultural visits | Meleji Homestays',
    description: 'Community-led cultural experiences.',
    page: 'experience-detail',
    slug: 'culture',
    footer: 'compact',
  },
  {
    path: 'pages/experiences/nature/index.html',
    title: 'Nature & hiking | Meleji Homestays',
    description: 'Trails and waterfalls with local guides.',
    page: 'experience-detail',
    slug: 'nature',
    footer: 'compact',
  },
  {
    path: 'pages/foundation/index.html',
    title: 'Meleji Children Foundation | Meleji Homestays',
    description: 'Foundation mission and volunteering information.',
    page: 'foundation',
    footer: 'full',
  },
  {
    path: 'pages/foundation/volunteer/index.html',
    title: 'Get involved | Meleji Children Foundation',
    description: 'Partner, sponsor, volunteer, or teach with the foundation team.',
    page: 'foundation-volunteer',
    footer: 'compact',
  },
  {
    path: 'pages/foundation/impact/index.html',
    title: 'Community impact | Meleji Children Foundation',
    description: 'How impact is communicated responsibly.',
    page: 'foundation-impact',
    footer: 'full',
  },
  {
    path: 'pages/about/index.html',
    title: 'About Meleji | Meleji Homestays',
    description: 'The story behind Meleji Homestays.',
    page: 'about',
    footer: 'full',
  },
  {
    path: 'pages/contact/index.html',
    title: 'Contact | Meleji Homestays',
    description: 'Contact Meleji Homestays.',
    page: 'contact',
    footer: 'full',
  },
  {
    path: 'pages/booking/index.html',
    title: 'Book your stay | Meleji Homestays',
    description: 'Accommodation booking enquiry.',
    page: 'booking',
    footer: 'compact',
  },
];

for (const entry of pages) {
  const target = join(root, entry.path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, buildInnerPageHtml(entry), 'utf8');
  process.stdout.write(`Wrote ${entry.path}\n`);
}

const notFoundPath = join(root, '404.html');
writeFileSync(
  notFoundPath,
  buildInnerPageHtml({
    title: 'Page not found | Meleji Homestays',
    description: 'The requested page could not be found.',
    page: 'not-found',
    footer: 'compact',
  }),
  'utf8',
);
process.stdout.write('Wrote 404.html\n');
