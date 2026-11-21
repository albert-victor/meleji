import { normalizeBookingRoomParam } from '../data/booking-room-options.js';

/**
 * @param {{ room?: string, occupancy?: string, experience?: string }} [params]
 */
export function buildBookingHref(params = {}) {
  const q = new URLSearchParams();
  if (params.room) {
    const room = normalizeBookingRoomParam(params.room);
    if (room) q.set('room', room);
  }
  if (params.occupancy) q.set('occupancy', params.occupancy);
  if (params.experience) q.set('experience', params.experience);
  const query = q.toString();
  return query ? `/pages/booking/?${query}` : '/pages/booking/';
}