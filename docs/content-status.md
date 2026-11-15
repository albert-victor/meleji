# Meleji Homestays – content and asset status

## Visual reconstruction, 8 November 2026

The homepage now uses the actual project photography, a four-stage story, editorial service compositions, room previews, local outings, foundation section, FAQ and the shared booking CTA/footer. Existing Vite multi-page routing and vanilla JavaScript remain.

## Verified image subjects

The source photographs were reviewed visually. The old food image was a waterfall, coffee was a bedroom, shared-room preview was a communal space, and safari hero showed a visitor holding a flag. Public mappings have been corrected.

- Hero slideshow (homepage): `Meleji-Foundation/hero-image-1.png` and `hero-image-2.png` (slides 01–02). Story section “Stay” still uses optimized `hero-1920.webp` until a confirmed alternate is chosen. Confirm accurate alt text for hero-image-2 when available.
- Numbered accommodation gallery (Nov 2026): `src/assets/images/accommodation/` files mapped in `src/data/accommodation-numbered-images.js` — acc1.jpg, accomodataion2.jpg, accomodaton3.jpg, accomodation4–8.jpg, accomodat9.jpg, accomodati10.jpg, accomodation11–13.jpg (and duplicate spelling acomodation12.jpg unused). Used for ten stay cards, accommodation hero collage, and gallery homestay sections.
- Shared room: actual bunk beds, 2b07c8ba-0916-4464-ba5c-7158c9761b0a.jpg.
- Deluxe room cards: optimized roomDeluxe derivatives from Deluxe_2.jpg; gallery uses Deluxe_1–3 plus hero-image-1.png.
- Shared room gallery: bunk bed photo 2b07c8ba-0916-4464-ba5c-7158c9761b0a.jpg plus optimized shared room WebP.
- Stay card service icons (Nov 2026): Wi‑Fi shown on room cards — confirm with hosts before treating as a guaranteed amenity.
- Gold stars on stay cards are decorative hospitality styling only, not a review score or rating count.
- Food: guests at a shared meal, 8c983124-6451-4c8d-a135-0ec6d446decd.jpg.
- Coffee: branded coffee cup, 7dc8d0da-873f-49fa-b5a8-2c1ed1851db7.jpg.
- Landscape: lake and mountain, 47954a28-774a-43cd-9511-3566c7e53f69.jpg. No claim that this represents a specific safari park.
- Nature: waterfall, 692e940a-3c6a-4bf1-9727-b7d188c4a31a.jpg.
- Foundation / volunteer collage: uses existing moments photography (field outing, banner group) plus the organization logo badge. Official kindergarten or children’s programme photography was not supplied; none was invented or stock-substituted.

Originals remain intact. Responsive WebP derivatives, their actual dimensions and their source mapping are in src/assets/images/optimized/manifest.json. Hero sizes are 800 and 1920 pixels. No upscaling. The previous provisional stock-resort hero is no longer used on the homepage.

## Business information

Contact email and phone were transcribed from the existing official main_logo.jpg: melejihouse@gmail.com, +255 756 344 075. Reference mockup contacts were not used. Social profile URLs and legal-policy text were not supplied, so no fabricated social or policy links were added. The full-screen menu social row shows WhatsApp (`wa.me` from the verified phone), Instagram, Facebook, YouTube, Booking.com (`fa-solid fa-hotel` — Font Awesome Free has no Booking.com brand glyph), email and phone. Instagram, Facebook and YouTube currently route to `/pages/contact/` until official profile URLs are confirmed. Booking.com icon routes to `/pages/booking/` until an official Booking.com property URL is supplied. “Partner with us” routes to Contact until a dedicated partner page exists. Gallery page: `/pages/gallery/` uses existing site photography only.

Site chrome logo uses `src/assets/images/brand/new_logo.png` with background removed to a transparent PNG (no rectangular plate). The older JPEG `main_logo.jpg` remains in assets for archive/reference only.

Typography (provisional, 2026): Libre Bodoni 400 for headings, Lexend for body/UI/details, Italiana as signature accent on cards and editorial flourishes.

## Enquiries

All enquiry forms validate required fields and prepare a mailto link with the visitor's entered details. The visitor reviews and sends through their email app. Nothing is submitted to a backend, and entered details are retained. Arrival/departure order is validated. No online payment or instant reservation is claimed.

## Remaining content dependencies

**Safari packages & activities (8 Nov 2026):** Twenty northern safari packages and nine activity guides imported from [Tanzania Tourism](https://www.tanzaniatourism.com/safaris) (overview, day-by-day itinerary, activities, three images each). Activities index: `/pages/safaris/activities/`. Re-import: `node scripts/import-safari-content.mjs`; verify: `node scripts/verify-safari-import.mjs`. These are reference itineraries — Meleji confirms routing and pricing on enquiry only.

**Northern destination import (8 Nov 2026):** Fifteen Arusha / Northern Circuit destinations were imported from [Tanzania Tourism](https://www.tanzaniatourism.com/destinations/region/arusha) (overview copy, activities list, six images each, stored under `src/assets/images/destinations/`). Includes Materuni, Kikuletwa/Maji Moto, Lake Chala, and Lake Eyasi & Hadzabe. Re-import: `node scripts/import-arusha-destinations.mjs`; verify: `node scripts/verify-arusha-import.mjs`. Meleji still discusses routing and bookings on enquiry — imported pages are reference content, not fixed packages or prices.

**Destination & package detail layout (10 Nov 2026):** Each destination page now includes overview, enquiry panel, things to do (linked to activity pages where matched), tours/packages grid, nearby destinations from Arusha, “you may also like,” gallery, and bottom CTA. Package pages add itinerary fit stars, pricing-on-enquiry note, destination cards, nearby, similar packages, and CTA. Editorial star rows are labelled “Meleji team planning guide” — not guest review scores.

**Stay & experience pricing (10 Nov 2026):** Guide rates in `src/data/pricing.js` — shared USD 15 single / 30 double; deluxe USD 40; food USD 10 plate / 20 lunch+dinner; homestay coffee USD 30 per person; foundation volunteer/teach from USD 10. Booking forms include room, occupancy, meal/coffee options, phone required on stay/experience, email + WhatsApp hand-off.

**Foundation copy (10 Nov 2026):** Homepage and `/pages/foundation/` describe ~40 supported children, partners/sponsors, women’s skills training; CTA “Get involved” replaces volunteering-only messaging.

**Foundation page redesign (11 Nov 2026):** `/pages/foundation/` uses photography from `src/assets/images/Meleji-Foundation/` (hero collage, editorial sections, action cards, gallery). Women’s skills training section is text-led until confirmed tailoring/workshop photography is supplied. Volunteer accommodation from ~USD 10 remains subject to team confirmation.

**Inner detail editorial pass (11 Nov 2026):** Destination and safari package pages use gallery-based hero collages, editorial overview splits, planning highlight grids, and photo itinerary timelines. Local experiences (coffee journey, food collage, culture/nature panels) and accommodation room pages use the same hero pattern. Stay/coffee/food enquiry forms show live USD guide estimates; safari package enquiries collect departure, travellers, and style (inquiry only).

**Arusha city & markets (12 Nov 2026):** Two Meleji-hosted offers — `city-tours` activity + `arusha-city-tour` package; `local-markets-tours` activity + `arusha-local-markets-tour` package. Copy and routing in `src/data/published/meleji-arusha-offers.js`. **Price on request** everywhere (no USD posted). Gallery uses homestay/food photography until client supplies Arusha Clock Tower and Central Market shots.

Official safari packages, rates, and approved foundation photography remain business content inputs. Draft Ruaha/Moshi destination templates remain noindex. A real safari/wildlife photo and a high-resolution exterior panorama would extend the available visual range. The official logo remains the supplied JPEG; a transparent original would improve its presentation further.
