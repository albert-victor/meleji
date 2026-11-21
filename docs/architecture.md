# Meleji Homestays – Architecture

## Stack

| Layer        | Choice                                      |
| ------------ | --------------------------------------------- |
| Markup       | Semantic HTML5                                |
| Styles       | Modular CSS (`src/styles/`) + design tokens   |
| Scripts      | Vanilla JavaScript (ES modules)               |
| Tooling      | Vite 6                                        |
| Icons        | Font Awesome Free (`@fortawesome/fontawesome-free`) |
| Hosting      | Static files (cPanel and similar)             |

No client-side framework. Dependencies stay minimal.

## npm scripts

| Script           | Command        | Purpose                    |
| ---------------- | -------------- | -------------------------- |
| `npm run dev`    | `vite`         | Local dev server + HMR     |
| `npm run build`  | `vite build`   | Output to `dist/`          |
| `npm run preview`| `vite preview` | Serve `dist/` locally      |

**Local preview URL (development):** `http://localhost:5173/` (default Vite port).

## Multi-page routing (static hosting)

Vite is configured as a **multi-page app (MPA)**. Each public URL must have:

1. An HTML file (e.g. `index.html` or `pages/contact/index.html`).
2. A matching entry in `vite.config.js` → `build.rollupOptions.input`.

At build time, Vite emits those HTML files and hashed assets into `dist/` with correct relative paths. There is no client-side router and no Node.js on the server.

**Adding a page later:**

```js
// vite.config.js – rollupOptions.input
main: resolve(rootDir, 'index.html'),
contact: resolve(rootDir, 'pages/contact/index.html'),
```

Each new page should load the same stylesheet entry:  
`<script type="module" src="/src/scripts/main.js"></script>`  
(or a page-specific module that imports shared CSS).

## Page layout convention

Every document should follow this structure:

```html
<body class="page">
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <!-- Optional: global header (shared component, later phase) -->
  <main id="main-content" class="page__main" tabindex="-1">
  <div class="container">…</div>
  </main>
  <!-- Optional: footer -->
  <script type="module" src="/src/scripts/main.js"></script>
</body>
```

Layout classes live in `src/styles/layout.css` (`.page`, `.page__main`, `.container`).

## Directory structure

```
meleji-homestays/
├── index.html                 # Root entry (system check page in Phase 01)
├── package.json
├── vite.config.js
├── public/                    # Copied verbatim into dist/
│   └── favicon/
├── pages/                     # Future HTML entries (empty until next phases)
├── src/
│   ├── assets/
│   │   ├── images/            # Photography and brand files
│   │   ├── icons/
│   │   └── patterns/
│   ├── styles/                # tokens → main.css bundle
│   ├── scripts/
│   │   ├── main.js            # Global CSS + icon CSS imports
│   │   └── navigation.js      # Stub for header/menu phase
│   ├── components/            # Shared UI (later)
│   ├── data/                  # Content models (later)
│   └── utils/
├── docs/
└── .cursor/rules/
```

**Asset paths in code:** use root-absolute paths for files in `public/` (e.g. `/favicon/favicon.svg`). For images under `src/assets/`, import from JS/CSS so Vite resolves URLs, or place deploy-ready binaries in `public/` when direct URLs are preferred.

## JavaScript entry points

| File                    | Role                                      |
| ----------------------- | ----------------------------------------- |
| `src/scripts/main.js`   | Primary entry: FA + `main.css`            |
| `src/scripts/navigation.js` | Reserved for header / side panel     |

Additional modules (`animations.js`, `booking.js`) will be added when those features are built.

## Deploying to cPanel

1. On your machine: `npm install` then `npm run build`.
2. Open the hosting **File Manager** or connect via FTP/SFTP.
3. Upload **everything inside** `dist/` (not the `dist` folder name itself) into the site document root (`public_html` or the domain folder).
4. Confirm `index.html` sits at the web root so `https://yourdomain.com/` loads the site.
5. Nested pages appear as folders, e.g. `dist/pages/contact/index.html` → `public_html/pages/contact/index.html` (URL: `/pages/contact/` if directory indexes are enabled).
6. No Node process is required. Only Apache/nginx static file serving.
7. Optional: add `.htaccess` later for clean URLs or HTTPS redirects; not required for Phase 01.

To verify locally before upload: `npm run preview` (default `http://localhost:4173/`).

## Inner pages (Phase 05)

- HTML shells live under `pages/**/index.html` plus root `404.html`.
- `vite.config.js` auto-registers every `index.html` under `pages/` and `404.html`.
- Body attributes: `data-page` (renderer key), optional `data-slug`, `data-footer` (`full` | `compact`).
- Content mounts via `src/inner-pages/mount.js` into `[data-inner-mount]`.
- Regenerate shells after changing metadata: `node scripts/generate-inner-pages.mjs`.
