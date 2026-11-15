export const FONT_LINK =
  'https://fonts.googleapis.com/css2?family=Italiana&family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap';

/** Hides skip link + closed menu before bundled CSS loads (avoids FOUC / faux second navbar). */
export const PAGE_HEAD_CRITICAL_CSS = `<style>
.skip-link{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.site-menu:not(.is-open){position:fixed;inset:0;visibility:hidden;opacity:0;pointer-events:none;transform:translate3d(-18%,0,0);z-index:var(--z-menu,200)}
.menu-overlay[hidden]{display:none!important}
</style>`;

/**
 * @param {{
 *   title: string,
 *   description: string,
 *   page: string,
 *   slug?: string,
 *   footer?: 'full' | 'compact',
 *   robots?: string,
 * }} options
 */
export function buildInnerPageHtml(options) {
  const footer = options.footer ?? 'full';
  const slugAttr = options.slug ? ` data-slug="${options.slug}"` : '';
  const robots = options.robots
    ? `    <meta name="robots" content="${options.robots}" />\n`
    : '';

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
${robots}    <meta name="description" content="${options.description.replace(/"/g, '&quot;')}" />
    <title>${options.title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${FONT_LINK}" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/main.css" />
${PAGE_HEAD_CRITICAL_CSS}
  </head>
  <body class="page" data-page="${options.page}" data-footer="${footer}"${slugAttr}>
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <main id="main-content" class="page__main">
      <div data-inner-mount></div>
    </main>
    <script type="module" src="/src/scripts/main.js"></script>
  </body>
</html>
`;
}
