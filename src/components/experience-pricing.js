import { formatUsd } from '../data/pricing.js';
import { escapeHtml } from '../utils/html.js';

/**
 * @typedef {{ label: string, amount?: number | null, unit?: string, note?: string }} ExperiencePriceTier
 */

/**
 * Editorial USD row for experience detail pages.
 * @param {ExperiencePriceTier} tier
 */
function renderPriceRow(tier) {
  const hasAmount = tier.amount != null && Number.isFinite(tier.amount);
  const amountBlock = hasAmount
    ? `<span class="experience-pricing__value">${escapeHtml(formatUsd(tier.amount))}</span>`
    : `<span class="experience-pricing__on-request">On request</span>`;

  const unit = tier.unit ? `<span class="experience-pricing__unit">${escapeHtml(tier.unit)}</span>` : '';
  const note = tier.note ? `<p class="experience-pricing__note text-muted text-small">${escapeHtml(tier.note)}</p>` : '';

  return `
    <div class="experience-pricing__row">
      <p class="experience-pricing__label">${escapeHtml(tier.label)}</p>
      <div class="experience-pricing__amount">${amountBlock}${unit}</div>
      ${note}
    </div>`;
}

/**
 * @param {ExperiencePriceTier[]} tiers
 * @param {{ compact?: boolean }} [options]
 */
export function renderExperiencePricingList(tiers, options = {}) {
  if (!tiers?.length) return '';
  const compact = options.compact ? ' experience-pricing--compact' : '';
  return `
    <div class="experience-pricing${compact}" role="list" aria-label="Guide prices in US dollars">
      ${tiers.map((tier) => renderPriceRow(tier)).join('')}
      <p class="experience-pricing__disclaimer text-muted text-small">Prices in US dollars ($). The team confirms totals before you travel.</p>
    </div>`;
}

/**
 * Short card summary from the first priced tier.
 * @param {ExperiencePriceTier[]} tiers
 */
export function experiencePriceSummary(tiers) {
  const priced = tiers?.find((t) => t.amount != null && Number.isFinite(t.amount));
  if (priced) {
    const unit = priced.unit ? ` ${priced.unit}` : '';
    return `From ${formatUsd(priced.amount)}${unit}.`;
  }
  const first = tiers?.[0];
  return first ? `${first.label} – on request.` : '';
}