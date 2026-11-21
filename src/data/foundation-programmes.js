import { FOUNDATION_HREFS } from './contact.js';
import { FOUNDATION_PRICING } from './pricing.js';

export const FOUNDATION_SCOPE = {
  childrenCountLabel: '40+',
  childrenCountNote:
    'More than forty children receive daily care, meals, and schooling support at the centre.',
};

/**
 * @typedef {'child' | 'women' | 'meals' | 'teach'} SponsorTone
 */

/** @type {{ tone: SponsorTone, icon: string, title: string, text: string, imageSrc?: string, imageAlt?: string, price?: { amount: number, note?: string }, ctaLabel: string, anchor: string }[]} */
export const FOUNDATION_SPONSOR_PATHWAYS = [
  {
    tone: 'child',
    icon: 'child',
    title: 'Private child sponsorship',
    text: 'Choose a child to encourage. Schooling, meals, and materials – with photos and progress updates from your coordinator.',
    price: { amount: FOUNDATION_PRICING.childSponsorFrom, note: '/ month' },
    ctaLabel: 'Sponsor a child',
    anchor: FOUNDATION_HREFS.form,
  },
  {
    tone: 'women',
    icon: 'scissors',
    title: 'Women’s skills sponsorship',
    text: 'Fund tailoring, crafts, and salon bench training so women can earn with dignity.',
    ctaLabel: 'Support women’s training',
    anchor: FOUNDATION_HREFS.form,
  },
  {
    tone: 'meals',
    icon: 'bowl-food',
    title: 'Meals & materials',
    text: 'Keep workshops fueled – ingredients, fabric, and classroom supplies for training days.',
    price: { amount: FOUNDATION_PRICING.programmeSupportFrom, note: 'top-up · from' },
    ctaLabel: 'Fund a training week',
    anchor: FOUNDATION_HREFS.form,
  },
  {
    tone: 'teach',
    icon: 'chalkboard-user',
    title: 'Teach or fund a session',
    text: 'Lead a class on site or pay a local facilitator – one session or a full week.',
    price: { amount: FOUNDATION_PRICING.teachFrom, note: '/ session · from' },
    ctaLabel: 'Plan a session',
    anchor: FOUNDATION_HREFS.form,
  },
];

export const FOUNDATION_WOMEN_SKILLS = [
  { icon: 'fa-scissors', label: 'Tailoring & cherehani' },
  { icon: 'fa-shirt', label: 'Garments & alterations' },
  { icon: 'fa-hands', label: 'Handmade market goods' },
  { icon: 'fa-wallet', label: 'Income & saving basics' },
];