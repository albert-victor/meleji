import { importedSafariPackages } from './imported-safari-packages.js';
import { melejiArushaPackages } from './meleji-arusha-offers.js';

/**
 * Safari packages — separate dataset from destinations.
 * Imported itineraries are reference content; Meleji confirms routes on enquiry.
 */
export const publishedSafariPackages = [...melejiArushaPackages, ...importedSafariPackages];

export const liveSafariPackages = publishedSafariPackages.filter((p) => p.status === 'published');
