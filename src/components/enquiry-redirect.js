import { escapeHtml } from '../utils/html.js';
import { buildBookingHref } from '../utils/booking-routes.js';
import { buildContactHref } from '../utils/contact-routes.js';
import { getBookingRoomOption } from '../data/booking-room-options.js';
import { renderButton } from './button.js';

/**
 * Compact panel replacing inline enquiry forms on detail pages.
 * @param {{
 *   heading: string,
 *   intro: string,
 *   intent: string,
 *   context?: Record<string, string>,
 *   buttonLabel?: string,
 *   useBookingPage?: boolean,
 * }} props
 */
export function renderEnquiryRedirectPanel(props) {
  const href =
    props.useBookingPage !== false && props.intent === 'stay' && props.context?.room
      ? buildBookingHref({
          room: props.context.room,
          occupancy: getBookingRoomOption(props.context.room)?.defaultOccupancy,
        })
      : buildContactHref({ intent: props.intent, ...props.context });
  return `
    <aside class="enquiry-redirect" data-reveal>
      <h3 class="enquiry-redirect__title">${escapeHtml(props.heading)}</h3>
      <p class="enquiry-redirect__intro text-muted">${escapeHtml(props.intro)}</p>
      ${renderButton({
        label: props.buttonLabel ?? 'Send an enquiry',
        href,
        variant: 'primary',
        className: 'btn--pattern-overlay',
      })}
    </aside>`;
}