import { CONTACT, FOUNDATION_HREFS } from '../data/contact.js';
import { escapeHtml } from '../utils/html.js';

const RAIL_LINKS = [
  { label: 'Sponsor a child', href: FOUNDATION_HREFS.sponsorChild, tone: 'sponsor' },
  { label: 'Volunteer with us', href: FOUNDATION_HREFS.form, tone: 'volunteer' },
  { label: 'Partner with us', href: FOUNDATION_HREFS.form, tone: 'partner' },
];

const RAIL_CONTACTS = [
  { label: CONTACT.foundationEmail, href: `mailto:${CONTACT.foundationEmail}`, tone: 'email' },
  { label: CONTACT.phoneLabel, href: `tel:${CONTACT.phone}`, tone: 'phone' },
  { label: 'WhatsApp', href: CONTACT.whatsappUrl, tone: 'whatsapp', external: true },
];

/**
 * Colored slim bar under site header on foundation routes.
 */
export function renderFoundationRail() {
  const items = [
    ...RAIL_LINKS.map(
      (item) =>
        `<a class="foundation-rail__link foundation-rail__link--${escapeHtml(item.tone)}" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>`,
    ),
    ...RAIL_CONTACTS.map(
      (item) =>
        `<a class="foundation-rail__link foundation-rail__link--${escapeHtml(item.tone)}" href="${escapeHtml(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(item.label)}</a>`,
    ),
  ];

  const chunk = items
    .map(
      (link, index) =>
        `${link}${index < items.length - 1 ? '<span class="foundation-rail__sep" aria-hidden="true">·</span>' : ''}`,
    )
    .join('');

  return `
    <div class="foundation-rail" data-foundation-rail role="navigation" aria-label="Foundation quick links">
      <div class="foundation-rail__viewport">
        <div class="foundation-rail__track" aria-hidden="false">
          <span class="foundation-rail__chunk">${chunk}</span>
          <span class="foundation-rail__chunk" aria-hidden="true">${chunk}</span>
        </div>
      </div>
    </div>`;
}

/** @deprecated use renderFoundationRail */
export function renderFoundationTicker() {
  return renderFoundationRail();
}