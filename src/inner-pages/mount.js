import { renderAccommodationOverview, renderRoomDetail } from './accommodation.js';
import {
  renderSafarisOverview,
  renderDestinationsIndex,
  renderDestinationDetail,
  renderPackagesIndex,
  renderPackageDetail,
  renderPackageDetailTemplate,
  renderSafariCustom,
} from './safaris.js';
import { renderSafariActivitiesIndex, renderSafariActivityDetail } from './safari-activities.js';
import { renderExperiencesOverview, renderExperienceDetail } from './experiences.js';
import {
  renderFoundationOverview,
  renderFoundationVolunteer,
  renderFoundationImpact,
} from './foundation.js';
import { renderBooking, renderGalleryPage } from './general.js';
import { renderAbout } from './about.js';
import { renderContact } from './contact.js';
import { renderNotFound } from './not-found.js';

const handlers = {
  accommodation: () => renderAccommodationOverview(),
  'room-detail': ({ slug }) => renderRoomDetail(slug),
  safaris: () => renderSafarisOverview(),
  destinations: () => renderDestinationsIndex(),
  'destination-detail': ({ slug }) => renderDestinationDetail(slug),
  packages: () => renderPackagesIndex(),
  'package-detail': ({ slug }) => renderPackageDetail(slug),
  'package-template': () => renderPackageDetailTemplate(),
  'safari-activities': () => renderSafariActivitiesIndex(),
  'safari-activity-detail': ({ slug }) => renderSafariActivityDetail(slug),
  'safari-custom': () => renderSafariCustom(),
  experiences: () => renderExperiencesOverview(),
  'experience-detail': ({ slug }) => renderExperienceDetail(slug),
  foundation: () => renderFoundationOverview(),
  'foundation-volunteer': () => renderFoundationVolunteer(),
  'foundation-impact': () => renderFoundationImpact(),
  about: () => renderAbout(),
  contact: () => renderContact(),
  booking: () => renderBooking(),
  gallery: () => renderGalleryPage(),
  'not-found': () => renderNotFound(),
};

export function mountInnerPage() {
  const page = document.body.dataset.page;
  if (!page || !handlers[page]) return;

  const slug = document.body.dataset.slug;
  try {
    handlers[page]({ slug });
  } catch (err) {
    console.error(`[mountInnerPage] Failed to render page "${page}"`, err);
    const root = document.querySelector('[data-inner-mount]');
    if (root && !root.innerHTML.trim()) {
      root.innerHTML = `
        <p class="inner-section container text-muted" role="status">
          This page could not load. Please refresh or return to the
          <a href="/">home page</a>. If the problem continues, contact the team.
        </p>`;
    }
  }
}
