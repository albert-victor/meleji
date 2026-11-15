import { liveDestinations } from '../data/published/destinations.js';
import { liveSafariActivities } from '../data/published/safari-activities.js';
import { liveSafariPackages } from '../data/published/packages.js';
import { getPackagesForActivity } from '../data/activity-package-links.js';
import {
  renderDestinationCard,
  renderSafariActivityCard,
  renderSafariPackageCard,
  renderCardGrid,
} from '../components/cards/index.js';

function mountGrids() {
  const destRoot = document.querySelector('[data-cjd-destinations]');
  const actRoot = document.querySelector('[data-cjd-activities]');
  if (!destRoot || !actRoot) return;

  const destinations = liveDestinations.slice(0, 6);
  const activities = liveSafariActivities.slice(0, 6);

  destRoot.innerHTML = renderCardGrid(destinations, renderDestinationCard, {
    columns: 3,
    ariaLabel: 'Destinations demo',
  });
  actRoot.innerHTML = renderCardGrid(activities, (item) => renderSafariActivityCard(item, { linkToPackages: true }), {
    columns: 3,
    ariaLabel: 'Activities demo',
  });
}

function showPackagesForActivity(activity) {
  const panel = document.getElementById('packages-for-selection');
  const pkgRoot = document.querySelector('[data-cjd-packages]');
  const focus = document.querySelector('[data-cjd-pkg-focus]');
  const count = document.querySelector('[data-cjd-pkg-count]');
  if (!panel || !pkgRoot || !focus || !count) return;

  const matches = getPackagesForActivity(activity, liveSafariPackages);

  focus.textContent = activity.title;
  count.textContent =
    matches.length > 0
      ? `${matches.length} package${matches.length === 1 ? '' : 's'} linked to this activity (heuristic match).`
      : 'No imported package matched — try another activity or enquire for a custom route.';

  pkgRoot.innerHTML =
    matches.length > 0
      ? renderCardGrid(matches, renderSafariPackageCard, { columns: 2, ariaLabel: 'Packages for activity' })
      : `<p class="cjd-block__hint">Use <a href="/pages/safaris/custom/?activity=${encodeURIComponent(activity.slug)}">safari enquiry</a> for a tailor-made plan.</p>`;

  panel.hidden = false;
  panel.classList.add('is-active');
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function bindActivityClicks() {
  document.querySelectorAll('[data-activity-filter]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const slug = link.dataset.activityFilter;
      const activity = liveSafariActivities.find((a) => a.slug === slug);
      if (!activity) return;

      document.querySelectorAll('.m-card.is-activity-active').forEach((el) => el.classList.remove('is-activity-active'));
      link.classList.add('is-activity-active');

      showPackagesForActivity(activity);
    });
  });
}

export function initCardsJourneyDemo() {
  mountGrids();
  bindActivityClicks();
}
