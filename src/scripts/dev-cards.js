import '../styles/main.css';
import { mountSiteChrome } from '../components/site-chrome.js';
import { initNavigation } from './navigation.js';
import {
  renderAccommodationCard,
  renderDestinationCard,
  renderSafariPackageCard,
  renderSafariPackagesPendingCard,
  renderExperienceCard,
  renderActivityIconCard,
  renderCommunityProgrammeCard,
  renderCardGrid,
} from '../components/cards/index.js';
import { publishedRooms } from '../data/published/rooms.js';
import { publishedExperiences } from '../data/published/experiences.js';
import { publishedActivities } from '../data/published/activities.js';
import { publishedCommunityProgrammes } from '../data/published/community-programmes.js';
import { liveSafariPackages } from '../data/published/packages.js';
import { liveDestinations } from '../data/published/destinations.js';
import {
  FIXTURE_NOTICE,
  fixtureAccommodation,
  fixtureDestinations,
  fixturePackages,
  fixtureExperiences,
  fixtureActivities,
  fixtureCommunity,
} from '../data/fixtures/card-fixtures.js';

function fixtureClass(item) {
  return item.status === 'fixture' ? 'm-card--fixture' : '';
}

function renderPublishedPreview() {
  const parts = [];

  parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Accommodation</h3>');
  parts.push(
    renderCardGrid(publishedRooms, (item) =>
      renderAccommodationCard(item, { className: fixtureClass(item) }),
    { columns: 2, ariaLabel: 'Published accommodation cards' },
    ),
  );

  parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Experiences</h3>');
  parts.push(
    renderCardGrid(publishedExperiences, (item) =>
      renderExperienceCard(item, { className: fixtureClass(item) }),
    { columns: 4, ariaLabel: 'Published experience cards' },
    ),
  );

  parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Activity icons</h3>');
  parts.push(
    renderCardGrid(
      publishedActivities,
      (item) => renderActivityIconCard(item, { className: fixtureClass(item) }),
      { columns: 3, ariaLabel: 'Activity icon cards' },
    ),
  );

  parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Community</h3>');
  parts.push(
    renderCardGrid(publishedCommunityProgrammes, (item) =>
      renderCommunityProgrammeCard(item, { className: fixtureClass(item) }),
    { columns: 2, ariaLabel: 'Community programme cards' },
    ),
  );

  parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Safari packages</h3>');
  if (liveSafariPackages.length) {
    parts.push(
      renderCardGrid(liveSafariPackages, (item) =>
        renderSafariPackageCard(item, { className: fixtureClass(item) }),
      { columns: 2, ariaLabel: 'Safari package cards' },
      ),
    );
  } else {
    parts.push(
      renderCardGrid([{ id: 'pending' }], () => renderSafariPackagesPendingCard(), {
        columns: 2,
        ariaLabel: 'Safari packages pending',
      }),
    );
  }

  if (liveDestinations.length) {
    parts.push('<h3 class="section-head__title" style="margin-top:var(--space-8)">Destinations</h3>');
    parts.push(
      renderCardGrid(liveDestinations, (item) =>
        renderDestinationCard(item, { className: fixtureClass(item) }),
      { columns: 3, ariaLabel: 'Destination cards' },
      ),
    );
  }

  return parts.join('');
}

function renderFixturePreview() {
  return [
    '<h3 class="section-head__title" style="margin-top:var(--space-6)">Accommodation</h3>',
    renderCardGrid(fixtureAccommodation, (item) =>
      renderAccommodationCard(item, { className: 'm-card--fixture' }),
    { columns: 2 },
    ),
    '<h3 class="section-head__title" style="margin-top:var(--space-8)">Destinations</h3>',
    renderCardGrid(fixtureDestinations, (item) =>
      renderDestinationCard(item, { className: 'm-card--fixture' }),
    { columns: 2 },
    ),
    '<h3 class="section-head__title" style="margin-top:var(--space-8)">Safari packages</h3>',
    renderCardGrid(fixturePackages, (item) =>
      renderSafariPackageCard(item, { className: 'm-card--fixture' }),
    { columns: 2 },
    ),
    '<h3 class="section-head__title" style="margin-top:var(--space-8)">Experiences</h3>',
    renderCardGrid(fixtureExperiences, (item) =>
      renderExperienceCard(item, { className: 'm-card--fixture' }),
    { columns: 2 },
    ),
    '<h3 class="section-head__title" style="margin-top:var(--space-8)">Activity icons</h3>',
    renderCardGrid(fixtureActivities, (item) =>
      renderActivityIconCard(item, { className: 'm-card--fixture' }),
    { columns: 3 },
    ),
    '<h3 class="section-head__title" style="margin-top:var(--space-8)">Community</h3>',
    renderCardGrid(fixtureCommunity, (item) =>
      renderCommunityProgrammeCard(item, { className: 'm-card--fixture' }),
    { columns: 2 },
    ),
  ].join('');
}

document.addEventListener('DOMContentLoaded', () => {
  mountSiteChrome({ footer: document.body.dataset.footer || 'compact' });
  initNavigation();

  const notice = document.querySelector('[data-dev-notice]');
  if (notice) notice.textContent = FIXTURE_NOTICE;

  const publishedMount = document.querySelector('[data-card-mount="published"]');
  const fixtureMount = document.querySelector('[data-card-mount="fixtures"]');

  if (publishedMount) publishedMount.innerHTML = renderPublishedPreview();
  if (fixtureMount) fixtureMount.innerHTML = renderFixturePreview();
});
