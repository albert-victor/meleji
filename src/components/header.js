import { primaryNav } from '../data/nav-menu.js';
import { renderButton } from './button.js';
import logoUrl from '../assets/images/brand/new_logo.png';

export function renderSiteHeader() {
  const path = window.location.pathname;
  return `<header class="site-header" data-site-header><div class="container site-header__bar">
    <a class="site-header__brand" href="/" aria-label="Meleji Homestays home"><img class="site-header__logo" src="${logoUrl}" alt="" width="160" height="160" decoding="async" /><span class="site-header__lockup" aria-hidden="true"><span class="site-header__name">Meleji</span><span class="site-header__descriptor">Homestays</span></span></a>
    <div class="site-header__cluster"><nav class="site-header__nav" aria-label="Primary"><ul>${primaryNav
      .map(
        (item) =>
          `<li><a href="${item.href}"${path.startsWith(item.href) ? ' aria-current="page"' : ''}>${item.label}</a></li>`
      )
      .join('')}</ul></nav>
    <div class="site-header__actions">${renderButton({
      label: 'Plan Your Visit',
      href: '/pages/contact/',
      variant: 'primary',
      size: 'sm',
      shape: 'round',
      className: 'site-header__cta',
    })}<button class="nav-toggle nav-toggle--dock" type="button" aria-expanded="false" aria-controls="site-menu" data-nav-toggle><span class="visually-hidden">Open menu</span><span class="nav-toggle__bars" aria-hidden="true"><span class="nav-toggle__bar"></span><span class="nav-toggle__bar"></span><span class="nav-toggle__bar"></span></span></button></div></div>
  </div></header>`;
}
