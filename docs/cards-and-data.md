# Phase 04 – Cards and data

## Card components (`src/components/cards/`)

| Renderer | Use |
| -------- | --- |
| `renderAccommodationCard` | Rooms / stays |
| `renderDestinationCard` | Safari destinations (regions) |
| `renderSafariPackageCard` | Bookable packages (enquiry CTA) |
| `renderSafariPackagesPendingCard` | Empty-state when no packages are live |
| `renderExperienceCard` | Local experiences |
| `renderActivityIconCard` | Font Awesome icon tiles |
| `renderCommunityProgrammeCard` | Foundation / community |
| `renderCardGrid` | Responsive grid wrapper |

Shared image rules live in `src/styles/components/cards.css`: `aspect-ratio: 4/3`, `object-fit: cover`, hover scale `1.035`, `overflow: hidden`. Legacy homepage classes `.media-card` alias `.m-card`.

## Data layout

| Path | Purpose |
| ---- | ------- |
| `src/data/types.js` | JSDoc field shapes |
| `src/data/published/*.js` | Approved production records (`status: 'published'`) |
| `src/data/fixtures/card-fixtures.js` | **Dev only** – `[DEV]` labels, import only from dev tooling |

**Destinations** (`published/destinations.js`) and **safari packages** (`published/packages.js`) are separate datasets. Packages array is empty until official content is imported.

Draft destinations remain in the published file but are excluded from `liveDestinations` until `status` becomes `published`.

## Review page

- URL: `/pages/dev/cards/`
- `noindex` meta, fixture banner, dashed outline on fixture cards
- Not linked from public navigation

## Production pages

Use `src/data/published/` and `filterLiveContent()` / `live*` exports only. Do not import `src/data/fixtures/` outside dev scripts.
