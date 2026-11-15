import { escapeHtml } from '../utils/html.js';
import { renderThingsToDoChips } from './detail-section.js';

/**
 * @param {{ region?: string, activities?: string[] }} dest
 * @param {Record<string, string>} activityHrefs
 */
export function renderDestinationEditorialSections(dest, activityHrefs = {}) {
  const regionNote = dest.region
    ? `${dest.region} – distances and park fees vary. The Meleji team outlines realistic day plans from Arusha or Moshi.`
    : 'Northern Tanzania routes depend on season, road time, and park rules. Ask the team what fits your dates.';

  const chips =
    dest.activities?.length > 0
      ? renderThingsToDoChips(dest.activities, activityHrefs)
      : '<p class="text-muted">Mention this destination when you send a safari enquiry.</p>';

  return `
    <section class="inner-section container detail-section-stack" aria-labelledby="dest-why">
      <div data-reveal>
        <p class="editorial-split__eyebrow">Why visit</p>
        <h2 class="detail-section__title" id="dest-why">What draws travellers here</h2>
        <p class="text-muted">${escapeHtml(dest.summary)}</p>
      </div>
      <div class="detail-highlight-grid">
        <article class="detail-highlight">
          <h3>Highlights</h3>
          <div>${chips}</div>
        </article>
        <article class="detail-highlight">
          <h3>Planning with Meleji</h3>
          <p class="text-muted">${escapeHtml(regionNote)}</p>
          <p class="text-muted text-small">Imported reference copy may describe general park features. Meleji confirms what is offered on your trip.</p>
        </article>
        <article class="detail-highlight">
          <h3>Best time to travel</h3>
          <p class="text-muted">Dry months often suit wildlife viewing; green season brings lush scenery and fewer crowds. Month-by-month advice is shared when you enquire – we do not publish fixed safari prices online.</p>
        </article>
        <article class="detail-highlight">
          <h3>Travel information</h3>
          <p class="text-muted">Park fees, guide regulations, and driving times change. Pack layers, sun protection, and patience for unpaved roads. Pair wildlife days with homestay nights to balance pace.</p>
        </article>
      </div>
    </section>`;
}

export function renderPackageInfoPanels() {
  return `
    <div class="detail-highlight-grid" data-reveal>
      <article class="detail-highlight">
        <h3>What is typically included</h3>
        <ul class="amenity-list">
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Route planning discussion with the Meleji team</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Driver-guide allocation – confirmed on enquiry</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Park entries where applicable – subject to live fee schedules</span></li>
        </ul>
      </article>
      <article class="detail-highlight">
        <h3>Usually arranged separately</h3>
        <ul class="amenity-list">
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>International flights and visas</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Travel insurance</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Personal tips, drinks, and souvenirs</span></li>
          <li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Optional lodge upgrades beyond your quote</span></li>
        </ul>
      </article>
      <article class="detail-highlight">
        <h3>Accommodation &amp; transport</h3>
        <p class="text-muted text-small">Lodges, camps, and vehicle type are discussed when you share comfort level and budget. Itinerary text is a reference – lodges named in imports are not guaranteed.</p>
      </article>
      <article class="detail-highlight">
        <h3>Important travel notes</h3>
        <p class="text-muted text-small">Wildlife sightings are never guaranteed. Timing may shift for weather, park closures, or road conditions. Final confirmations happen by email or WhatsApp.</p>
      </article>
    </div>`;
}
