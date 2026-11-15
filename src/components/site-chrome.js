import { renderSiteHeader } from './header.js';
import { renderMenuPanel } from './menu-panel.js';
import { renderFooter } from './footer.js';

export function mountSiteChrome(options = {}) {
  const { footer = 'full', chromeRoot = document.body } = options;
  if (chromeRoot.querySelector('[data-site-header]')) return;

  const skip = chromeRoot.querySelector('.skip-link');
  const main = chromeRoot.querySelector('.page__main, main');

  const headerWrap = document.createElement('div');
  headerWrap.innerHTML = renderSiteHeader() + renderMenuPanel();
  const header = headerWrap.querySelector('[data-site-header]');
  const menu = headerWrap.querySelector('[data-site-menu]');
  const overlay = headerWrap.querySelector('[data-menu-overlay]');

  if (skip && skip.nextSibling) {
    chromeRoot.insertBefore(header, skip.nextSibling);
    chromeRoot.insertBefore(overlay, main);
    chromeRoot.insertBefore(menu, main);
  } else if (main) {
    chromeRoot.insertBefore(header, main);
    chromeRoot.insertBefore(overlay, main);
    chromeRoot.insertBefore(menu, main);
  } else {
    chromeRoot.prepend(header);
    chromeRoot.append(overlay, menu);
  }

  const footerMount = chromeRoot.querySelector('[data-site-footer]');
  const footerHtml = renderFooter(footer);
  if (footerMount) {
    footerMount.innerHTML = footerHtml;
  } else {
    const footerEl = document.createElement('div');
    footerEl.innerHTML = footerHtml;
    chromeRoot.append(...footerEl.children);
  }

  chromeRoot.classList.add('page--with-chrome');
}
