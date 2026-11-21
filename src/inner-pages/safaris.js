import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderPageHero } from '../components/page-hero.js';
import { renderCtaBand } from '../components/cta-band.js';
import { renderEnquiryRedirectPanel } from '../components/enquiry-redirect.js';
import { buildContactHref } from '../utils/contact-routes.js';
import {
  renderDetailSection,
  renderEditorialRouteFit,
  renderThingsToDoChips,
} from '../components/detail-section.js';
import {
  renderDestinationCard,
  renderSafariPackageCard,
  renderSafariPackagesPendingCard,
  renderSafariActivityCard,
  renderCardGrid,
} from '../components/cards/index.js';
import { activitySlugFromLabel } from '../data/destination-relations.js';
import {
  getRelatedDestinations,
  getDestinationsForPackage,
  getEditorialRouteFit,
  getLinkedSafariActivities,
  getNearbyDestinations,
  getPackagesForDestination,
  getSuggestedPackagesForDestination,
  getPackageRouteFit,
  getSimilarPackages,
} from '../data/safari-detail-helpers.js';
import { liveDestinations } from '../data/published/destinations.js';
import { liveSafariPackages } from '../data/published/packages.js';
import { liveSafariActivities } from '../data/published/safari-activities.js';
import { getDestinationBySlug, getPackageBySlug, getPackageTemplate } from '../data/published/lookup.js';
import { publishedDestinations } from '../data/published/destinations.js';
import { escapeHtml } from '../utils/html.js';
import { CINEMATIC_HERO_IMAGES } from '../data/cinematic-hero-images.js';
import { renderDetailEditorialHero, collageImagesFromEntity } from '../components/detail-hero.js';
import { renderDestinationEditorialSections, renderPackageInfoPanels } from '../components/detail-planning.js';
import { renderEditorialSplit } from '../components/editorial-split.js';
import { mountInner, draftBanner, renderGallery, renderAmenityList, renderItineraryTimeline } from './shared.js';
import { renderMissingContent } from './not-found.js';

/** @param {string[]} activityLabels */
function activityLabelHrefs(activityLabels) {
  /** @type {Record<string, string>} */
  const map = {};
  for (const label of activityLabels ?? []) {
    const slug = activitySlugFromLabel(label);
    if (!slug) continue;
    const activity = liveSafariActivities.find((a) => a.slug === slug);
    if (activity) map[label] = activity.href;
  }
  return map;
}

export function renderSafarisOverview() {
  const destinationGrid =
    liveDestinations.length > 0
      ? renderCardGrid(liveDestinations, renderDestinationCard, {
          columns: 3,
          ariaLabel: 'Safari destinations',
        })
      : `<p class="text-muted">Tell us which regions interest you. We will help you explore the options for your dates.</p>`;

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris & tours' },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        imageSrc: CINEMATIC_HERO_IMAGES.safaris.src,
        imageAlt: CINEMATIC_HERO_IMAGES.safaris.alt,
        eyebrow: 'Explore',
        title: 'Safaris & tours',
        lead: 'Wildlife, landscapes, and a route shaped around your dates – planned with the Meleji team in Arusha.',
        actions: [
          { label: 'Tailor-made enquiry', href: '/pages/safaris/custom/' },
          { label: 'Contact', href: '/pages/contact/', variant: 'secondary' },
        ],
      })}
      <section class="inner-section container">
        <div class="link-grid link-grid--2">
          <a class="link-tile" href="/pages/safaris/destinations/">
            <h2 class="link-tile__title">Destinations</h2>
            <p class="link-tile__text">Regional context and geography.</p>
          </a>
          <a class="link-tile" href="/pages/safaris/packages/">
            <h2 class="link-tile__title">Safari packages</h2>
            <p class="link-tile__text">City, market, and wildlife itineraries – pricing on request.</p>
          </a>
          <a class="link-tile" href="/pages/safaris/activities/">
            <h2 class="link-tile__title">Safari activities</h2>
            <p class="link-tile__text">City tours, markets, coffee, migration, Hadzabe, and more.</p>
          </a>
          <a class="link-tile" href="/pages/safaris/custom/">
            <h2 class="link-tile__title">Tailor-made safari</h2>
            <p class="link-tile__text">Dates, parks, and pace to suit you.</p>
          </a>
        </div>
      </section>
      <section class="inner-section inner-section--band">
        <div class="container landscape-stack">
          <figure class="landscape-stack__figure">
            <img src="${CINEMATIC_HERO_IMAGES.safaris.src}" alt="${escapeHtml(CINEMATIC_HERO_IMAGES.safaris.alt)}" width="1600" height="686" loading="lazy" decoding="async" />
          </figure>
          <div>
            <h2>How planning works</h2>
            <p class="text-muted">You share timing, comfort level, and must-see places. The team proposes a practical outline and connects you with drivers and camps .</p>
          </div>
          ${destinationGrid}
        </div>
      </section>
      ${renderCtaBand({
        title: 'Start a safari conversation',
        text: 'No obligation – outline your trip and the team will respond with options.',
        primary: { label: 'Safari enquiry', href: '/pages/safaris/custom/' },
        secondary: { label: 'Book stay + safari', href: '/pages/booking/' },
      })}
    </div>`);
}

export function renderDestinationsIndex() {
  const grid =
    liveDestinations.length > 0
      ? renderCardGrid(liveDestinations, renderDestinationCard, { columns: 3, ariaLabel: 'Destinations' })
      : `<p class="text-muted">Ask about Ruaha, northern circuits and the regions you would like to explore. The team will help you consider travel time, interests and your preferred pace.</p>`;

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Destinations' },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        eyebrow: 'Geography',
        title: 'Destinations',
        lead: 'Northern parks, craters, lakes and day trips from Arusha – with room to build a route around your dates.',
        imageSrc: CINEMATIC_HERO_IMAGES.safaris.src,
        imageAlt: CINEMATIC_HERO_IMAGES.safaris.alt,
        actions: [{ label: 'Plan a route', href: '/pages/safaris/custom/' }],
      })}
      <section class="inner-section container">${grid}</section>
    </div>`);
}

export function renderDestinationDetail(slug) {
  const dest = getDestinationBySlug(slug);
  if (!dest) {
    renderMissingContent();
    return;
  }

  const isDraft = dest.status !== 'published';
  const banner = isDraft
    ? draftBanner('Not linked from navigation. Approve content before publishing.')
    : '';

  const bodyParagraphs = dest.context?.length ? dest.context : dest.longDescription ? [dest.longDescription] : [];
  const context = bodyParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');

  const metaLines = [
    dest.category ? `Type: ${dest.category}` : null,
    dest.sizeLabel ? `Scale: ${dest.sizeLabel}` : null,
    dest.region ? `Region: ${dest.region}` : null,
  ].filter(Boolean);

  const routeFit = getEditorialRouteFit(dest.slug);
  const directPackages = getPackagesForDestination(dest.slug);
  const packages = directPackages.length > 0 ? directPackages : getSuggestedPackagesForDestination(dest.slug);
  const relatedDestinations = getRelatedDestinations(dest.slug, dest.region, 3);
  const linkedActivities = getLinkedSafariActivities(dest);
  const thingsChips = renderThingsToDoChips(dest.activities ?? [], activityLabelHrefs(dest.activities));

  const packagesSectionBody = directPackages.length
    ? 'Sample routes that include this destination. The team confirms pricing, lodges, and timing on enquiry.'
    : packages.length
      ? `Routes that pair well with this stop on the northern circuit. The team can add ${dest.name} when you send dates and group size.`
      : 'Share your dates and the team will outline a day or multi-day route from Arusha.';

  const packagesSectionChildren = packages.length
    ? renderCardGrid(packages, renderSafariPackageCard, {
        columns: 3,
        ariaLabel: `Safari packages for ${dest.name}`,
      })
    : `<div class="detail-packages-cta">
        <p class="text-muted">Mention ${escapeHtml(dest.name)} on your enquiry and we will suggest pacing and lodges.</p>
        <div class="detail-packages-cta__actions">
          <a class="csp-btn csp-btn--primary" href="/pages/safaris/custom/">Tailor-made safari</a>
          <a class="csp-btn csp-btn--outline" href="/pages/safaris/packages/">All packages</a>
        </div>
      </div>`;

  const packageSection = renderDetailSection({
    title: 'Tours & packages',
    body: packagesSectionBody,
    band: true,
    children: packagesSectionChildren,
  });

  const activitySection = renderDetailSection({
    title: 'Activities at this destination',
    body: linkedActivities.length
      ? 'Ways to explore with a local guide. Combine with your stay at Meleji or a longer northern circuit.'
      : dest.activities?.length
        ? 'Common themes for this area. The team confirms what fits your dates.'
        : 'Ask the team what fits your dates and comfort level.',
    children:
      linkedActivities.length > 0
        ? renderCardGrid(linkedActivities, renderSafariActivityCard, {
            columns: 3,
            ariaLabel: `Activities at ${dest.name}`,
          })
        : thingsChips || `<p class="text-muted">Mention this destination when you send a safari enquiry.</p>`,
  });

  const relatedSection =
    relatedDestinations.length > 0
      ? renderDetailSection({
          title: 'Related destinations',
          body: 'Places often paired with this stop on the same trip from Arusha.',
          band: true,
          children: renderCardGrid(relatedDestinations, renderDestinationCard, {
            columns: 3,
            ariaLabel: 'Related destinations',
          }),
        })
      : '';

  const galleryItems =
    dest.gallery?.length > 0
      ? dest.gallery
      : dest.imageSrc
        ? [{ src: dest.imageSrc, alt: dest.imageAlt ?? dest.name }]
        : [];

  const galleryBlock =
    galleryItems.length > 0
      ? `<section class="inner-section container destination-gallery" aria-labelledby="destination-gallery-title">
          <h2 class="detail-section__title" id="destination-gallery-title">Gallery</h2>
          ${renderGallery(galleryItems)}
        </section>`
      : '';

  const factsPanel = `
    <aside class="info-panel page-split__aside">
      ${renderEditorialRouteFit(routeFit)}
      ${metaLines.length ? `<h3>At a glance</h3>${renderAmenityList(metaLines)}` : ''}
      ${renderEnquiryRedirectPanel({
        heading: 'Destination enquiry',
        intro: 'Include travel dates and whether you already have a room at Meleji.',
        intent: 'safari',
        context: { destination: dest.slug },
        buttonLabel: 'Enquire about this region',
      })}
    </aside>`;

  const aboutBlock =
    bodyParagraphs.length > 0
      ? `<div data-reveal class="destination-about"><h2 class="detail-section__title">About ${escapeHtml(dest.name)}</h2>${context}</div>`
      : `<div data-reveal class="destination-about"><h2 class="detail-section__title">About ${escapeHtml(dest.name)}</h2><p class="text-muted">${escapeHtml(dest.summary)}</p></div>`;

  const detailsBlock = `
      ${galleryBlock}
      <section class="inner-section container destination-details" aria-labelledby="destination-details-title">
        <span class="visually-hidden" id="destination-details-title">${escapeHtml(dest.name)} details</span>
        ${aboutBlock}
        ${renderDestinationEditorialSections(dest, activityLabelHrefs(dest.activities), {
          skipSummaryRepeat: bodyParagraphs.length > 0,
        })}
      </section>
      <section class="inner-section container page-split" id="destination-enquiry">
        ${factsPanel}
      </section>`;

  mountInner(`
    <div class="inner-page">
      ${banner}
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Destinations', href: '/pages/safaris/destinations/' },
        { label: dest.name },
      ])}
      ${renderDetailEditorialHero({
        eyebrow: dest.region,
        title: dest.name,
        lead: dest.summary,
        images: collageImagesFromEntity(dest),
        actions: [
          { label: 'Enquire about this region', href: '#destination-enquiry' },
          { label: 'Book your stay', href: '/pages/booking/', variant: 'secondary', slide: false },
        ],
      })}
      ${detailsBlock}
      ${activitySection}
      ${packageSection}
      ${relatedSection}
      ${renderCtaBand({
        title: 'Plan this destination with Meleji',
        text: 'Stay at the homestay, then build safari days around your budget and pace.',
        primary: { label: 'Safari enquiry', href: '/pages/safaris/custom/' },
        secondary: { label: 'Contact the team', href: '/pages/contact/' },
      })}
    </div>`);
}

export function renderPackagesIndex() {
  const grid =
    liveSafariPackages.length > 0
      ? renderCardGrid(liveSafariPackages, renderSafariPackageCard, { columns: 3, ariaLabel: 'Safari packages' })
      : renderCardGrid([{ id: 'pending' }], () => renderSafariPackagesPendingCard(), {
          columns: 3,
          ariaLabel: 'Safari packages status',
        });

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Packages' },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        title: 'Safari packages',
        lead: 'Reference itineraries for northern Tanzania – share your dates and the team will adapt routing, lodges, and pace with you.',
        imageSrc: CINEMATIC_HERO_IMAGES.safaris.src,
        imageAlt: CINEMATIC_HERO_IMAGES.safaris.alt,
        actions: [{ label: 'Tailor-made enquiry', href: '/pages/safaris/custom/' }],
      })}
      <section class="inner-section container">${grid}</section>
      ${renderCtaBand({
        title: 'Need a custom route?',
        text: 'Packages are starting points. Mention group size, comfort level, and must-see wildlife.',
        primary: { label: 'Custom safari', href: '/pages/safaris/custom/' },
        secondary: { label: 'All destinations', href: '/pages/safaris/destinations/' },
      })}
    </div>`);
}

export function renderPackageDetail(slug) {
  const pkg = getPackageBySlug(slug);
  if (!pkg) {
    renderMissingContent();
    return;
  }

  const context = (pkg.context ?? [pkg.summary]).map((p) => `<p>${escapeHtml(p)}</p>`).join('');
  const metaLines = [
    pkg.durationLabel ? `Duration: ${pkg.durationLabel}` : null,
    pkg.safariType ? `Safari type: ${pkg.safariType}` : null,
    pkg.tailorMade ? `Tailor-made: ${pkg.tailorMade}` : null,
    pkg.region ? `Region: ${pkg.region}` : null,
  ].filter(Boolean);

  const destLinks = (pkg.destinationSlugs ?? [])
    .map((ds) => publishedDestinations.find((d) => d.slug === ds))
    .filter(Boolean)
    .map(
      (d) =>
        `<li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><a href="${escapeHtml(d.href)}">${escapeHtml(d.name)}</a></li>`,
    )
    .join('');

  const routeFit = getPackageRouteFit(pkg);
  const packageDestinations = getDestinationsForPackage(pkg);
  const similar = getSimilarPackages(pkg, 3);
  const primarySlug = pkg.destinationSlugs?.[0];
  const nearby = primarySlug ? getNearbyDestinations(primarySlug, 3) : [];

  const thingsLabels = [...new Set([...(pkg.activities ?? []), ...packageDestinations.flatMap((d) => d.activities ?? [])])];
  const thingsBlock = renderThingsToDoChips(thingsLabels, activityLabelHrefs(thingsLabels));

  const destSection =
    packageDestinations.length > 0
      ? renderDetailSection({
          title: 'Destinations on this route',
          body: 'Places covered in this sample itinerary. Tap through for context before you enquire.',
          band: true,
          children: renderCardGrid(packageDestinations, renderDestinationCard, {
            columns: 3,
            ariaLabel: 'Destinations on package',
          }),
        })
      : '';

  const nearbySection =
    nearby.length > 0
      ? renderDetailSection({
          title: 'Nearby from Arusha',
          body: 'Guests often add one of these if schedule and park fees allow.',
          children: renderCardGrid(nearby, renderDestinationCard, {
            columns: 3,
            ariaLabel: 'Nearby destinations',
          }),
        })
      : '';

  const similarSection =
    similar.length > 0
      ? renderDetailSection({
          title: 'You may also like',
          body: 'Packages that overlap on parks or day-trip themes.',
          band: true,
          children: renderCardGrid(similar, renderSafariPackageCard, {
            columns: 3,
            ariaLabel: 'Similar safari packages',
          }),
        })
      : '';

  const thingsSection = renderDetailSection({
    title: 'Things to do',
    body: 'Activity themes included or commonly paired with this route.',
    children: thingsBlock || `<p class="text-muted">The team will list inclusions when they reply to your enquiry.</p>`,
  });

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Packages', href: '/pages/safaris/packages/' },
        { label: pkg.name },
      ])}
      ${renderDetailEditorialHero({
        eyebrow: pkg.durationLabel ?? 'Safari package',
        title: pkg.name,
        lead: pkg.summary,
        images: collageImagesFromEntity(pkg),
        actions: [
          { label: 'Request a custom quote', href: '#package-enquiry' },
          { label: 'All packages', href: '/pages/safaris/packages/', variant: 'secondary', slide: false },
        ],
      })}
      <section class="inner-section container page-split">
        <div>
          <h2>Overview</h2>
          ${context}
          <p class="text-muted"><strong>${escapeHtml(pkg.availabilityNote ?? 'Rates and availability are confirmed on enquiry with the Meleji team.')}</strong></p>
        </div>
        <aside class="info-panel page-split__aside">
          ${renderEditorialRouteFit(routeFit, 'Itinerary fit')}
          <p class="info-panel__label">Pricing</p>
          <p class="text-muted text-small">Request a custom quote – safari totals depend on season, group size, and lodge level.</p>
          <h3>Tour snapshot</h3>
          ${renderAmenityList(metaLines)}
          ${
            destLinks
              ? `<h3 style="margin-top: var(--space-6)">Destination links</h3><ul class="amenity-list amenity-list--links">${destLinks}</ul>`
              : ''
          }
        </aside>
      </section>
      <section class="inner-section container inner-section--band" aria-labelledby="package-itinerary">
        <h2 class="detail-section__title" id="package-itinerary">Day-by-day itinerary</h2>
        <p class="text-muted">Sample day-by-day outline – Meleji adapts pacing, lodges, and pick-up points with you.</p>
        ${renderItineraryTimeline(pkg.itinerary ?? [], pkg.gallery ?? [])}
      </section>
      <section class="inner-section container">
        ${renderPackageInfoPanels()}
      </section>
      ${
        pkg.gallery?.length
          ? `<section class="inner-section container"><h2>Photos</h2>${renderGallery(pkg.gallery)}</section>`
          : ''
      }
      ${thingsSection}
      ${destSection}
      ${nearbySection}
      ${similarSection}
      <section class="inner-section container container--narrow" id="package-enquiry">
        ${renderEnquiryRedirectPanel({
          heading: 'Safari inquiry',
          intro: 'Share departure date, travellers, and accommodation preference on the contact page. This is an inquiry – not a confirmed booking.',
          intent: 'safari',
          context: { package: pkg.slug },
          buttonLabel: 'Send package enquiry',
        })}
      </section>
      ${renderCtaBand({
        title: 'Reserve this route',
        text: 'Pair your safari with a room at Meleji. The team coordinates drivers and timing with your stay.',
        primary: { label: 'Package enquiry', href: buildContactHref({ intent: 'safari', package: pkg.slug }) },
        secondary: { label: 'Book your stay', href: '/pages/booking/' },
      })}
    </div>`);
}

export function renderPackageDetailTemplate() {
  const pkg = getPackageTemplate();
  mountInner(`
    <div class="inner-page">
      ${draftBanner('Package detail layout only – not a bookable product.')}
      <h1 class="container">Safari package template</h1>
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Packages', href: '/pages/safaris/packages/' },
        { label: 'Template' },
      ])}
      <section class="inner-section container">
        ${renderCardGrid([pkg], (item) => renderSafariPackageCard(item), { columns: 1, ariaLabel: 'Package template' })}
      </section>
      <section class="inner-section container">
        <h2>Fields reserved for import</h2>
        <ul class="amenity-list">
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Duration and day-by-day outline</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Inclusions &amp; exclusions</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Destination references (separate dataset)</span></li>
        </ul>
      </section>
    </div>`);
}

export function renderSafariCustom() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Safaris', href: '/pages/safaris/' },
        { label: 'Tailor-made safari' },
      ])}
      ${renderPageHero({
        variant: 'landscape',
        title: 'Tailor-made safari',
        lead: 'Share dates, group size, comfort level, and parks you hope to see. The team drafts a route for discussion – not an instant quote online.',
        imageSrc: CINEMATIC_HERO_IMAGES.safaris.src,
        imageAlt: CINEMATIC_HERO_IMAGES.safaris.alt,
      })}
      <section class="inner-section container container--narrow">
        ${renderEnquiryRedirectPanel({
          heading: 'Safari outline',
          intro: 'Tell us where you would like to go and how you like to travel – the contact page collects dates, parks, and group size.',
          intent: 'safari',
          buttonLabel: 'Start safari enquiry',
        })}
      </section>
    </div>`);
}
