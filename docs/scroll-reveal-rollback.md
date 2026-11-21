# Scroll reveal – elegant scale (global)

**Implemented:** site-wide `data-reveal` uses elegant popup scale via `@keyframes reveal-elegant-scale`. Elements **re-animate** when leaving and re-entering the viewport (observer no longer unobserves). `flushVisibleReveals` + `revealLandingStack` run on home/inner mount for above-the-fold popup.

## Files touched

| Step | File | Change |
|------|------|--------|
| 1 | `src/styles/animations.css` | Global elegant scale; CSS vars on `:root` |
| 2 | `src/scripts/reveal-observer.js` | Shared `IntersectionObserver` |
| 3 | `src/scripts/home.js` | Uses reveal-observer; re-observe after carousels |
| 4 | `src/scripts/inner-effects.js` | Uses reveal-observer (dropped bare `[data-collage]`) |
| 5 | `src/utils/reveal-attrs.js` | `data-reveal` + stagger on cards |
| 6 | `src/components/cards/*.js` | Listing cards marked `data-reveal` |
| 7 | `src/components/cards/card-grid.js` | Passes `index` + `reveal: true` by default |
| 8 | `src/styles/foundation-page.css` | Booking shell matches scale reveal |
| 9 | `src/styles/components/accommodation-cards.css` | Avoid double animation on stay cards |
| 10 | `index.html` | FAQ + room note + experience stagger |
| 11 | `scripts/smoke.mjs` | Build + basic checks |

## Roll back quickly

1. Restore previous `src/styles/animations.css` (`fade-up` keyframes + `animation` on `.is-visible`).
2. Revert `home.js` / `inner-effects.js` to inline `initReveal` with `[data-collage]` in selectors.
3. Delete `reveal-observer.js` and card `scrollRevealAttrs` if reverting card stagger.
4. Run `npm run build` and `npm run smoke`.

## Tune without rollback

Edit on `:root` in `animations.css`:

- `--reveal-scale-from` – how strong the scale (default `0.965`)
- `--reveal-translate-y` – vertical offset before reveal
- `--reveal-duration` – animation length
- `--reveal-stagger-step` – delay per `--reveal-delay` step on cards/listings