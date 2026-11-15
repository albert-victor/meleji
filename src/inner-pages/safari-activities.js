import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderCtaBand } from '../components/cta-band.js';
import { renderEnquiryForm } from '../components/enquiry-form.js';
import {
  renderDetailSection,
  renderEditorialRouteFit,
  renderThingsToDoChips,
} from '../components/detail-section.js';
import {
  renderSafariActivityCard,
  renderSafariPackageCard,
  renderSafariPackagesPendingCard,
  renderCardGrid,
} from '../components/cards/index.js';
import { getPackagesForActivity } from '../data/activity-package-links.js';
import { activitySlugFromLabel } from '../data/destination-relations.js';
import { liveSafariActivities } from '../data/published/safari-activities.js';
import { liveSafariPackages } from '../data/published/packages.js';
import { getSafariActivityBySlug } from '../data/published/lookup.js';
import { escapeHtml } from '../utils/html.js';
import safariHero from '../assets/images/optimized/landscape-1600.webp';
import { mountInner, renderGallery, renderAmenityList, renderItinerary } from './shared.js';
import { renderMissingContent } from './not-found.js';

export function renderSafariActivitiesIndex() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Activities' },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        eyebrow: 'Northern Tanzania',
        title: 'Safari activities',
        lead: 'Arusha city walks, market mornings, coffee, migration seasons, Hadzabe visits, waterfalls, and game drives — mix urban days with bush routes on enquiry.',
        imageSrc: safariHero,
        imageAlt: 'Wide landscape in northern Tanzania',
        actions: [{ label: 'Tailor-made enquiry', href: '/pages/safaris/custom/' }],
      })}
      <section class="inner-section container">
        ${renderCardGrid(liveSafariActivities, renderSafariActivityCard, {
          columns: 3,
          ariaLabel: 'Safari activities',
        })}
      </section>
      ${renderCtaBand({
        title: 'Combine activities with your stay',
        text: 'Mention what interests you when you send a safari enquiry.',
        primary: { label: 'Safari enquiry', href: '/pages/safaris/custom/' },
        secondary: { label: 'Homestay coffee', href: '/pages/experiences/coffee/' },
      })}
    </div>`);
}

function relatedActivityCards(slug) {
  const current = liveSafariActivities.find((a) => a.slug === slug);
  const labels = current?.relatedActivities ?? [];
  const slugs = labels.map(activitySlugFromLabel).filter(Boolean);
  const related = slugs
    .map((s) => liveSafariActivities.find((a) => a.slug === s && a.slug !== slug))
    .filter(Boolean)
    .slice(0, 3);
  if (!related.length) {
    return liveSafariActivities.filter((a) => a.slug !== slug).slice(0, 3);
  }
  return related;
}

export function renderSafariActivityDetail(slug) {
  const activity = getSafariActivityBySlug(slug);
  if (!activity) {
    renderMissingContent();
    return;
  }

  const context = (activity.context ?? []).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  const sampleItinerary = renderItinerary(activity.itinerarySample);
  const highlights =
    activity.highlights?.length > 0
      ? `<h3>With Meleji</h3>${renderAmenityList(activity.highlights)}`
      : '';

  const homestayCoffeeLink =
    slug === 'coffee'
      ? `<p class="text-muted text-small" style="margin-top: var(--space-4)"><a href="/pages/experiences/coffee/">Homestay coffee with Mgei</a> is booked separately at the property (USD 30 per person).</p>`
      : '';

  const relatedLabels = activity.relatedActivities ?? [];
  const labelHrefs = Object.fromEntries(
    relatedLabels
      .map((label) => {
        const s = activitySlugFromLabel(label);
        const item = s ? liveSafariActivities.find((a) => a.slug === s) : null;
        return item ? [label, item.href] : null;
      })
      .filter(Boolean),
  );
  const thingsBlock = renderThingsToDoChips(relatedLabels, labelHrefs);

  const packages = getPackagesForActivity(activity, liveSafariPackages);
  const alsoLike = relatedActivityCards(slug);

  const packageSection =
    packages.length > 0
      ? renderDetailSection({
          title: 'Tours featuring this activity',
          body: 'Sample itineraries that include this theme. Safari pricing is confirmed on enquiry.',
          band: true,
          children: renderCardGrid(packages, renderSafariPackageCard, {
            columns: 3,
            ariaLabel: `Packages for ${activity.title}`,
          }),
        })
      : renderDetailSection({
          title: 'Tours featuring this activity',
          body: 'Ask the team to attach this activity to a day trip or longer safari.',
          band: true,
          children: renderCardGrid([{ id: 'pending' }], () => renderSafariPackagesPendingCard(), {
            columns: 1,
            ariaLabel: 'Safari planning',
          }),
        });

  const relatedSection = renderDetailSection({
    title: 'You may also like',
    body: 'Other activity themes guests often combine on northern routes.',
    children: renderCardGrid(alsoLike, renderSafariActivityCard, {
      columns: 3,
      ariaLabel: 'Related safari activities',
    }),
  });

  const sourceBlock = activity.sourceNote
    ? `<p class="text-muted text-small" style="margin-top: var(--space-6)">${escapeHtml(activity.sourceNote)}${
        activity.sourceUrl
          ? ` <a href="${escapeHtml(activity.sourceUrl)}" rel="noopener noreferrer" target="_blank">View source</a>`
          : ''
      }</p>`
    : '';

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Activities', href: '/pages/safaris/activities/' },
        { label: activity.title },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        eyebrow: 'Safari activity',
        title: activity.title,
        lead: activity.summary,
        imageSrc: activity.landscapeSrc ?? activity.imageSrc,
        imageAlt: activity.imageAlt,
        actions: [
          { label: 'Enquire', href: activity.enquiryHref },
          { label: 'Book your stay', href: '/pages/booking/', variant: 'secondary' },
        ],
      })}
      <section class="inner-section container page-split">
        <div>
          <h2>About this activity</h2>
          ${context || `<p class="text-muted">${escapeHtml(activity.longDescription)}</p>`}
          ${homestayCoffeeLink}
          ${sampleItinerary ? `<h2 style="margin-top: var(--space-8)">Sample day outline</h2>${sampleItinerary}` : ''}
          ${sourceBlock}
        </div>
        <aside class="info-panel page-split__aside">
          ${renderEditorialRouteFit(4, 'Activity fit')}
          ${highlights}
          ${thingsBlock ? `<h3 style="margin-top: var(--space-6)">Often paired with</h3>${thingsBlock}` : ''}
          ${renderEnquiryForm({
            id: `safari-activity-${activity.slug}`,
            topic: 'safari',
            heading: 'Activity enquiry',
            intro: 'Include travel dates and whether you already have accommodation with Meleji.',
            hiddenFields: { activity: activity.slug },
          })}
        </aside>
      </section>
      ${
        activity.gallery?.length
          ? `<section class="inner-section container"><h2>Photos</h2>${renderGallery(activity.gallery)}</section>`
          : ''
      }
      ${packageSection}
      ${relatedSection}
      ${renderCtaBand({
        title: 'Add this to your stay',
        text: 'Pair safari days with a room and meals at Meleji.',
        primary: { label: 'Safari enquiry', href: activity.enquiryHref },
        secondary: { label: 'Stay booking', href: '/pages/booking/' },
      })}
    </div>`);
}
