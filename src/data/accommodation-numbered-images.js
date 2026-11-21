/**
 * Numbered accommodation photography (files 1–13; filenames vary – see content-status).
 */
import acc1 from '../assets/images/accommodation/acc1.jpg';
import acc2 from '../assets/images/accommodation/accomodataion2.jpg';
import acc3 from '../assets/images/accommodation/accomodaton3.jpg';
import acc4 from '../assets/images/accommodation/accomodation4.jpg';
import acc5 from '../assets/images/accommodation/accomodation5.jpg';
import acc6 from '../assets/images/accommodation/accomodation6.jpg';
import acc7 from '../assets/images/accommodation/accomodation13.jpg';
import guestBathroom from '../assets/images/accommodation/guest-bathroom-tiled.jpg';
import acc8 from '../assets/images/accommodation/accomodation8.jpg';
import acc9 from '../assets/images/accommodation/accomodat9.jpg';
import acc10 from '../assets/images/accommodation/accomodati10.jpg';
import acc11 from '../assets/images/accommodation/accomodation11.jpg';
import acc12 from '../assets/images/accommodation/accomodation12.jpg';
import acc13 from '../assets/images/accommodation/accomodation13.jpg';

/** @type {import('./types.js').DestinationGalleryImage[]} */
export const ACCOMMODATION_PHOTOS_01_13 = [
  { src: acc1, alt: 'Guest room at Meleji Homestays' },
  { src: acc2, alt: 'Sleeping space at Meleji Homestays' },
  { src: acc3, alt: 'Homestay room interior' },
  { src: acc4, alt: 'Accommodation at Meleji Homestays' },
  { src: acc5, alt: 'Guest bedding and timber details' },
  {
    src: acc6,
    alt: 'Standard private room with double bed, sofa, and seating area at Meleji Homestays',
  },
  {
    src: acc7,
    alt: 'Standard private room – bed and timber details at Meleji Homestays',
  },
  { src: acc8, alt: 'Deluxe-style guest room' },
  { src: acc9, alt: 'Comfortable homestay room' },
  { src: acc10, alt: 'Guest accommodation – rest area' },
  { src: acc11, alt: 'Room view at Meleji Homestays' },
  { src: acc12, alt: 'Homestay sleeping quarters' },
  { src: acc13, alt: 'Guest room at the homestay' },
];

/** Bathroom photography – house gallery only, not room card heroes. */
export const GUEST_BATHROOM_PHOTO = {
  src: guestBathroom,
  alt: 'Tiled guest bathroom at Meleji Homestays',
};