import { publishedRooms } from './rooms.js';
import { publishedDestinations } from './destinations.js';
import { publishedExperiences } from './experiences.js';
import { publishedSafariPackages } from './packages.js';
import { publishedSafariActivities } from './safari-activities.js';
import { packageDetailTemplate } from './package-template.js';

export function getRoomBySlug(slug) {
  return publishedRooms.find((room) => room.slug === slug && room.status === 'published');
}

export function getDestinationBySlug(slug) {
  return publishedDestinations.find((dest) => dest.slug === slug);
}

export function getExperienceBySlug(slug) {
  return publishedExperiences.find((exp) => exp.slug === slug && exp.status === 'published');
}

export function getPackageBySlug(slug) {
  return publishedSafariPackages.find((pkg) => pkg.slug === slug && pkg.status === 'published');
}

export function getSafariActivityBySlug(slug) {
  return publishedSafariActivities.find((item) => item.slug === slug && item.status === 'published');
}

export function getPackageTemplate() {
  return packageDetailTemplate;
}
