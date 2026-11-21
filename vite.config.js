import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

function walkHtmlInputs(dir, acc) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walkHtmlInputs(full, acc);
    } else if (name === 'index.html') {
      const rel = relative(rootDir, full).replace(/\\/g, '/');
      const key = rel
        .replace(/\.html$/, '')
        .replace(/\//g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '_');
      acc[key || 'page'] = resolve(rootDir, rel);
    }
  }
}

function collectPageInputs() {
  const inputs = { main: resolve(rootDir, 'index.html') };

  const pagesDir = join(rootDir, 'pages');
  if (existsSync(pagesDir)) {
    walkHtmlInputs(pagesDir, inputs);
  }

  const notFound = resolve(rootDir, '404.html');
  if (existsSync(notFound)) {
    inputs.notFound = notFound;
  }

  return inputs;
}

const MELEJI_ENTRY_SHELL = `<div id="site-entry" class="site-entry" hidden aria-hidden="true">
  <div class="site-entry__cream"></div>
  <div class="site-entry__stack">
    <div class="site-entry__logo-wrap"><img class="site-entry__logo" src="/brand/meleji-entry-logo.png" alt="" width="512" height="512" decoding="async" fetchpriority="high" loading="eager" /></div>
    <div class="site-entry__dots" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
  </div>
</div>`;

const MELEJI_ENTRY_CRITICAL = `
html.meleji-entry-pending,html.meleji-entry-pending body{overflow:hidden;background:#faf6f0}
html.meleji-entry-pending body>:not(#site-entry):not(script){visibility:hidden!important}
html.meleji-entry-pending #site-entry.site-entry.is-active{display:flex!important;position:fixed;inset:0;z-index:600;align-items:center;justify-content:center;opacity:1!important;visibility:visible!important;background:#faf6f0}
html.meleji-entry-pending .site-entry__stack{display:flex;flex-direction:column;align-items:center;gap:1.1rem}
html.meleji-entry-pending .site-entry__logo-wrap{display:flex;align-items:center;justify-content:center;overflow:visible;min-width:calc(clamp(4.5rem,24vw,7.25rem) * 1.12);min-height:calc(clamp(4.5rem,24vw,7.25rem) * 1.12)}
html.meleji-entry-pending .site-entry__logo{width:clamp(4.5rem,24vw,7.25rem);height:auto;max-width:min(92vw,7.25rem);object-fit:contain;opacity:0;visibility:hidden}
html.meleji-entry-pending #site-entry.is-logo-ready .site-entry__logo.is-ready{visibility:visible;opacity:1}
html.meleji-entry-pending .site-entry__dots{display:inline-flex;gap:.62rem;align-items:center}
html.meleji-entry-pending .site-entry__dots span{display:block;width:.66rem;height:.66rem;border-radius:50%;animation:meleji-entry-pulse .95s ease-in-out infinite}
html.meleji-entry-pending .site-entry__dots span:nth-child(1){animation-delay:.28s;background:#f8e08a}
html.meleji-entry-pending .site-entry__dots span:nth-child(2){animation-delay:.47s;background:#e8a317}
html.meleji-entry-pending .site-entry__dots span:nth-child(3){animation-delay:.66s;background:#e07020}
html.meleji-entry-pending .site-entry__dots span:nth-child(4){animation-delay:.85s;background:#c54e22}
html.meleji-entry-pending .site-entry__dots span:nth-child(5){animation-delay:1.04s;background:#9cb648}
@keyframes meleji-entry-pulse{0%,100%{opacity:.38;transform:scale(.9)}50%{opacity:1;transform:scale(1.06)}}
`.replace(/\s+/g, ' ');

function injectSiteBoot() {
  return {
    name: 'meleji-inject-site-boot',
    transformIndexHtml(html) {
      let out = html;
      if (!out.includes('meleji-entry-critical')) {
        out = out.replace(
          /<head([^>]*)>/i,
          `<head$1>\n  <link rel="preload" href="/brand/meleji-entry-logo.png" as="image" type="image/png" />\n  <style id="meleji-entry-critical">${MELEJI_ENTRY_CRITICAL}</style>\n  <script src="/meleji-boot.js"></script>`,
        );
      }
      if (!out.includes('id="site-entry"')) {
        out = out.replace(/<body([^>]*)>/i, `<body$1>\n${MELEJI_ENTRY_SHELL}\n`);
      }
      return out;
    },
  };
}

export default defineConfig({
  root: rootDir,
  publicDir: 'public',
  plugins: [injectSiteBoot()],
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: collectPageInputs(),
    },
  },
});
