import { importedSafariActivities } from './imported-safari-activities.js';
import { melejiArushaActivities } from './meleji-arusha-offers.js';

export const publishedSafariActivities = [...melejiArushaActivities, ...importedSafariActivities];

export const liveSafariActivities = publishedSafariActivities.filter((a) => a.status === 'published');
