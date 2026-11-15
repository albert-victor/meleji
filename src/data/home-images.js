/** Visually checked photography; originals and derivative dimensions recorded in optimized/manifest.json. */
import hero from '../assets/images/optimized/hero-1920.webp';
import heroSmall from '../assets/images/optimized/hero-800.webp';
import heroSection1 from '../assets/images/Meleji-Foundation/hero-image-1.png';
import heroSection2 from '../assets/images/Meleji-Foundation/hero-image-2.png';
import intro from '../assets/images/optimized/intro-1600.webp';
import introSmall from '../assets/images/optimized/intro-800.webp';
import roomShared from '../assets/images/optimized/roomShared-1600.webp';
import roomSharedSmall from '../assets/images/optimized/roomShared-800.webp';
import roomDeluxe from '../assets/images/optimized/roomDeluxe-1600.webp';
import roomDeluxeSmall from '../assets/images/optimized/roomDeluxe-800.webp';
import landscape from '../assets/images/optimized/landscape-1600.webp';
import landscapeSmall from '../assets/images/optimized/landscape-800.webp';
import waterfall from '../assets/images/optimized/waterfall-1600.webp';
import waterfallSmall from '../assets/images/optimized/waterfall-800.webp';
import expFood from '../assets/images/optimized/expFood-1600.webp';
import expFoodSmall from '../assets/images/optimized/expFood-800.webp';
import expCoffee from '../assets/images/optimized/expCoffee-1600.webp';
import expCoffeeSmall from '../assets/images/optimized/expCoffee-800.webp';
import foundation from '../assets/images/brand/c21b277f-e281-400e-b10a-13b146006eea.jpg';
import moments from '../assets/images/moments/moments.jpg';
import momentField from '../assets/images/moments/in_the_Field.jpg';
import momentLake from '../assets/images/moments/lake duluti.jpg';
import momentBanner from '../assets/images/moments/c1b2d090-2feb-4c12-9423-6315de68c646.jpg';
import momentBirds from '../assets/images/moments/b876aa2f-2a96-4e7e-afd8-9c5ae5710a8d.jpg';
import momentFalls from '../assets/images/moments/692e940a-3c6a-4bf1-9727-b7d188c4a31a.jpg';
import storyKilimanjaro from '../assets/images/destinations/mount-kilimanjaro-national-park/01.jpg';
import foundationMain from '../assets/images/Meleji-Foundation/main_1.jpg';
import foundationMain2 from '../assets/images/Meleji-Foundation/main2.jpg';
import foundationMain3 from '../assets/images/Meleji-Foundation/main_3.jpg';
import foundationMain4 from '../assets/images/Meleji-Foundation/main_4.jpg';
import foundationMain5 from '../assets/images/Meleji-Foundation/main_5.jpg';
import foundationMain6 from '../assets/images/Meleji-Foundation/main_6.jpg';
import storyStayScene from '../assets/images/sticky-sections/experience_4.jpg';
import actCoffee1 from '../assets/images/safari-activities/coffee/01.jpg';
import actCoffee2 from '../assets/images/safari-activities/coffee/02.jpg';
import actCoffee3 from '../assets/images/safari-activities/coffee/03.jpg';
import actSwahili1 from '../assets/images/safari-activities/swahili-food/swahili-food_class.jpg';
import actSwahili2 from '../assets/images/safari-activities/swahili-food/swahili_food_class2.jpg';
import actSwahili3 from '../assets/images/safari-activities/swahili-food/01.jpg';
import actWaterfalls1 from '../assets/images/safari-activities/waterfalls/01.jpg';
import actWaterfalls2 from '../assets/images/safari-activities/waterfalls/02.jpg';
import actGame1 from '../assets/images/safari-activities/game-drives/01.jpg';
import actGame2 from '../assets/images/safari-activities/game-drives/02.jpg';
import actGame3 from '../assets/images/safari-activities/game-drives/03.jpg';
import actMigration1 from '../assets/images/safari-activities/great-migration/01.jpg';
import actMigration2 from '../assets/images/safari-activities/great-migration/02.jpg';
import actMigration3 from '../assets/images/safari-activities/great-migration/03.jpg';
import actWalking1 from '../assets/images/safari-activities/walking-safaris/01.jpg';
import actWalking2 from '../assets/images/safari-activities/walking-safaris/02.jpg';
import actBalloon1 from '../assets/images/safari-activities/balloon-safari/01.jpg';
import actBalloon2 from '../assets/images/safari-activities/balloon-safari/02.jpg';
import actHadzabe1 from '../assets/images/safari-activities/hadzabe-tours/01.jpg';
import actHadzabe2 from '../assets/images/safari-activities/hadzabe-tours/02.jpg';
import { ARUSHA_CITY_MARKET_HOME } from './arusha-city-market-images.js';

/** Story carousel scene keys (Stay → Explore → Experience → Give Back). */
export const STORY_SCENE_IMAGES = [
  { key: 'storyStayScene', alt: 'Outdoor area and seating at Meleji Homestays' },
  { key: 'storyKilimanjaro', alt: 'Mount Kilimanjaro National Park — Mount Kilimanjaro Tanzania' },
  { key: 'expFood', alt: 'Guests sharing a meal at Meleji' },
  { key: 'foundationMain', alt: 'Meleji Children Foundation community programmes' },
];

export const HOME_IMAGES = {
  hero,
  heroSection1,
  heroSection2,
  intro,
  roomShared,
  roomDeluxe,
  landscape,
  waterfall,
  expFood,
  expCoffee,
  foundation,
  moments,
  momentField,
  momentLake,
  momentBanner,
  momentBirds,
  momentFalls,
  storyKilimanjaro,
  foundationMain,
  foundationMain2,
  foundationMain3,
  foundationMain4,
  foundationMain5,
  foundationMain6,
  storyStayScene,
  actCoffee1,
  actCoffee2,
  actCoffee3,
  actSwahili1,
  actSwahili2,
  actSwahili3,
  actWaterfalls1,
  actWaterfalls2,
  actGame1,
  actGame2,
  actGame3,
  actMigration1,
  actMigration2,
  actMigration3,
  actWalking1,
  actWalking2,
  actBalloon1,
  actBalloon2,
  actHadzabe1,
  actHadzabe2,
  ...ARUSHA_CITY_MARKET_HOME,
};

export const HOME_IMAGE_SETS = {
  hero: `${heroSmall} 800w, ${hero} 1920w`,
  intro: `${introSmall} 800w, ${intro} 1080w`,
  roomShared: `${roomSharedSmall} 800w, ${roomShared} 1170w`,
  roomDeluxe: `${roomDeluxeSmall} 800w, ${roomDeluxe} 1280w`,
  landscape: `${landscapeSmall} 800w, ${landscape} 1080w`,
  waterfall: `${waterfallSmall} 800w, ${waterfall} 810w`,
  expFood: `${expFoodSmall} 800w, ${expFood} 1600w`,
  expCoffee: `${expCoffeeSmall} 800w, ${expCoffee} 1080w`,
};

/** Homepage hero carousel — main slide + floating inset keys per slide. */
export const HERO_SLIDES = [
  {
    key: 'heroSection1',
    alt: 'Deluxe room at Meleji Homestays with warm timber, brick walls and mosquito net',
    floatShared: 'roomShared',
    floatOutdoor: 'intro',
    floatSharedAlt: 'Shared bunk room at Meleji Homestays',
    floatOutdoorAlt: 'Outdoor seating and garden area at Meleji Homestays',
  },
  {
    key: 'heroSection2',
    alt: 'Comfortable guest room at Meleji Homestays in Arusha',
    floatShared: 'roomDeluxe',
    floatOutdoor: 'storyStayScene',
    floatSharedAlt: 'Deluxe room at Meleji Homestays',
    floatOutdoorAlt: 'Courtyard seating at Meleji Homestays',
  },
  {
    key: 'roomDeluxe',
    alt: 'Deluxe room interior at Meleji Homestays',
    floatShared: 'roomShared',
    floatOutdoor: 'expCoffee',
    floatSharedAlt: 'Shared accommodation at Meleji Homestays',
    floatOutdoorAlt: 'Coffee on the homestay veranda',
  },
];

/** Follow Your Curiosity — package activities with matching photography. */
export const OUTDOORS_ACTIVITY_SLIDES = [
  {
    href: '/pages/safaris/activities/coffee/',
    label: 'Coffee experiences',
    caption: 'From bean to cup.',
    key: 'actCoffee1',
    insetKey: 'actCoffee2',
    alt: 'Coffee tour and tasting near Materuni waterfalls',
  },
  {
    href: '/pages/experiences/swahili-food/',
    label: 'Swahili food experiences',
    caption: 'Cook and share a meal.',
    key: 'actSwahili1',
    insetKey: 'actSwahili2',
    alt: 'Swahili food class with local hosts',
  },
  {
    href: '/pages/safaris/activities/waterfalls/',
    label: 'Waterfalls & forest walks',
    caption: 'Fresh air and green trails.',
    key: 'actWaterfalls1',
    insetKey: 'actWaterfalls2',
    alt: 'Forest waterfall walk in the Arusha region',
  },
  {
    href: '/pages/safaris/activities/game-drives/',
    label: 'Game drives',
    caption: 'Wildlife on the open plain.',
    key: 'actGame1',
    insetKey: 'actGame2',
    alt: 'Safari game drive in Tanzania',
  },
  {
    href: '/pages/safaris/activities/great-migration/',
    label: 'Great migration routes',
    caption: 'Seasonal movement on the savannah.',
    key: 'actMigration1',
    insetKey: 'actMigration2',
    alt: 'Wildebeest migration on the Serengeti plains',
  },
];

/** Rotating wildlife imagery for homepage experience collages. */
export const EXPERIENCE_SAFARI_SLIDES_A = [
  { key: 'actGame1', alt: 'Elephants on a game drive safari' },
  { key: 'actGame2', alt: 'Wildlife viewing in Tanzania' },
  { key: 'actGame3', alt: 'Animals on the savannah' },
  { key: 'actMigration1', alt: 'Great migration herds' },
  { key: 'actMigration2', alt: 'Wildebeest crossing open grassland' },
  { key: 'actWalking1', alt: 'Walking safari in bush landscape' },
  { key: 'actWalking2', alt: 'Guided walk near wildlife habitat' },
];

export const EXPERIENCE_SAFARI_SLIDES_B = [
  { key: 'actMigration3', alt: 'Migration scenes on the plains' },
  { key: 'actBalloon1', alt: 'Hot-air balloon over the savannah at dawn' },
  { key: 'actBalloon2', alt: 'Balloon safari over Tanzania' },
  { key: 'actHadzabe1', alt: 'Cultural visit with Hadzabe community' },
  { key: 'actHadzabe2', alt: 'Lake Eyasi cultural experience' },
  { key: 'landscape', alt: 'Lake and forest vista in northern Tanzania' },
  { key: 'momentBirds', alt: 'Birdlife near forest and water' },
];

export const FOUNDATION_COLLAGE_SLIDES = [
  { key: 'foundationMain', alt: 'Meleji Children Foundation programme' },
  { key: 'foundationMain2', alt: 'Foundation community gathering' },
  { key: 'foundationMain3', alt: 'Children learning with foundation support' },
  { key: 'foundationMain4', alt: 'Foundation outreach in Arusha' },
  { key: 'foundationMain5', alt: 'Educational activities with young learners' },
  { key: 'foundationMain6', alt: 'Community time with Meleji Children Foundation' },
];
