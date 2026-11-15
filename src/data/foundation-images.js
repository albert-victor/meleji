import heroEducation from '../assets/images/Meleji-Foundation/5b57b738-426c-4262-b033-2cd83052b120.jpg';
import heroVolunteer from '../assets/images/Meleji-Foundation/96376705-0cc1-42c4-9d7a-046acd73aa41.jpg';
import heroPlay from '../assets/images/Meleji-Foundation/sticky_section.jpg';
import storyPorch from '../assets/images/Meleji-Foundation/main_1.jpg';
import eduCircle from '../assets/images/Meleji-Foundation/1afd2168-ca04-4197-baf9-b18dc6fe624f.jpg';
import eduMeal from '../assets/images/Meleji-Foundation/76dcc7d7-61b9-44a9-aba7-618e5c9d5d68.jpg';
import careIndoor from '../assets/images/Meleji-Foundation/ab72fbb7-8009-4bb4-b76d-54d4537fdbea.jpg';
import volunteerBubbles from '../assets/images/Meleji-Foundation/61a7b1dd-0f31-4e0f-a46b-2770d79b71ae.jpg';
import visitWelcome from '../assets/images/Meleji-Foundation/main_4.jpg';
import communityEvening from '../assets/images/Meleji-Foundation/216fb9ba-4a5a-4a5a-97d3-3e0d5038f354.jpg';
import visitReturn from '../assets/images/Meleji-Foundation/main2.jpg';

/** @type {{ src: string, alt: string, width?: number, height?: number }[]} */
export const FOUNDATION_HERO_COLLAGE = [
  {
    src: heroEducation,
    alt: 'Young learners seated together during a drink and snack time on the foundation veranda',
    width: 1200,
    height: 900,
  },
  {
    src: heroVolunteer,
    alt: 'Volunteer at an outdoor chalkboard with young children at the foundation',
    width: 900,
    height: 1200,
  },
  {
    src: heroPlay,
    alt: 'Children playing with bubbles on a shaded foundation veranda',
    width: 900,
    height: 1200,
  },
];

export const FOUNDATION_GALLERY = [
  { src: storyPorch, alt: 'Children and volunteers sharing time on the foundation veranda' },
  { src: eduCircle, alt: 'Circle time with young children indoors' },
  { src: volunteerBubbles, alt: 'Volunteer blowing bubbles with toddlers on the porch' },
  { src: visitWelcome, alt: 'Visitors welcomed at Meleji House with local children' },
  { src: communityEvening, alt: 'Children gathered together indoors in the evening' },
  { src: visitReturn, alt: 'Children greeting a returning visitor at the foundation steps' },
];

export {
  storyPorch,
  eduCircle,
  eduMeal,
  careIndoor,
  visitWelcome,
  visitReturn,
  communityEvening,
};
