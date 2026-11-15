import { menuAside, menuMinor, menuPrimary, menuSocial } from '../data/nav-menu.js';

function isCurrentPath(href) {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const target = href.replace(/\/$/, '') || '/';
  if (target === '/') return path === '/' || path === '';
  return path === target || path.startsWith(`${target}/`);
}

function padIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function renderPrimaryLink(item, index) {
  const current = isCurrentPath(item.href);
  return `
    <li class="site-menu__item" style="--menu-i: ${index}">
      <a
        class="site-menu__link${current ? ' is-active' : ''}"
        href="${item.href}"
        data-menu-link
        ${current ? 'aria-current="page"' : ''}
      >
        <span class="site-menu__index" aria-hidden="true">${padIndex(index)}</span>
        <span class="site-menu__label">
          ${item.label}
          <span class="site-menu__mark" aria-hidden="true"></span>
        </span>
      </a>
    </li>`;
}

function renderMinorLink(item, index) {
  const current = isCurrentPath(item.href);
  return `
    <li style="--menu-minor-i: ${index}">
      <a
        class="site-menu__minor-link${current ? ' is-active' : ''}"
        href="${item.href}"
        data-menu-link
        ${current ? 'aria-current="page"' : ''}
      >${item.label}</a>
    </li>`;
}

function renderSocial(item) {
  const external = item.external
    ? ' target="_blank" rel="noopener noreferrer"'
    : '';
  return `
    <a
      class="site-menu__social-link site-menu__social-link--${item.brand}"
      href="${item.href}"
      aria-label="${item.label}"
      data-menu-link
      ${external}
    >
      <i class="${item.icon}" aria-hidden="true"></i>
    </a>`;
}

export function renderMenuPanel() {
  const primary = menuPrimary.map(renderPrimaryLink).join('');
  const minor = menuMinor.map(renderMinorLink).join('');
  const social = menuSocial.map(renderSocial).join('');

  return `
    <div class="menu-overlay" data-menu-overlay hidden></div>
    <aside
      id="site-menu"
      class="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden="true"
      data-site-menu
    >
      <div class="site-menu__glow" aria-hidden="true"></div>
      <div class="site-menu__inner">
        <div class="site-menu__main">
          <p class="site-menu__kicker">Meleji ecosystem</p>
          <nav class="site-menu__nav" aria-label="Primary destinations">
            <ul class="site-menu__list">${primary}</ul>
          </nav>
        </div>
        <div class="site-menu__side">
          <p class="site-menu__side-label">${menuAside.eyebrow}</p>
          <nav class="site-menu__minor" aria-label="More from Meleji">
            <ul class="site-menu__minor-list">${minor}</ul>
          </nav>
          <p class="site-menu__tagline">${menuAside.tagline}</p>
        </div>
      </div>
      <div class="site-menu__foot">
        <div class="site-menu__social" aria-label="Contact Meleji">
          ${social}
        </div>
        <p class="site-menu__foot-note">Arusha, Tanzania</p>
      </div>
    </aside>`;
}
