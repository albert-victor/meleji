import homestaysLogo from '../assets/images/brand/new_logo.png';
import safariLogo from '../assets/images/brand/meleji safaris.jpg';
import foundationLogo from '../assets/images/brand/c21b277f-e281-400e-b10a-13b146006eea.jpg';
import { CONTACT } from '../data/contact.js';
import { footerSocial } from '../data/nav-menu.js';
import { renderPageVisitCta } from './page-visit-cta.js';
import { HOME_VISIT_CTA } from '../data/page-visit-cta.js';

function renderFooterSocialLinks() {
  return footerSocial
    .map((item) => {
      const external = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${item.href}" class="footer-social__link footer-social__link--${item.brand}" aria-label="${item.label}"${external}><i class="${item.icon}" aria-hidden="true"></i></a>`;
    })
    .join('');
}

function renderMainFooter(year) {
  const ecosystem = `
    <section class="footer-ecosystem" aria-label="Meleji ecosystem" data-reveal>
      <p class="footer-ecosystem__eyebrow">The Meleji ecosystem</p>
      <p class="footer-ecosystem__lead">One team in Arusha – a homestay base, northern Tanzania safaris, and work through the children&apos;s foundation.</p>
      <div class="footer-ecosystem__row">
        <a class="footer-ecosystem__unit" href="/">
          <img class="footer-ecosystem__mark" src="${homestaysLogo}" alt="" width="40" height="40" loading="lazy" decoding="async" data-photo-wash="off" />
          <span class="footer-ecosystem__name">Homestays</span>
        </a>
        <a class="footer-ecosystem__unit" href="/pages/safaris/">
          <img class="footer-ecosystem__mark" src="${safariLogo}" alt="" width="40" height="40" loading="lazy" decoding="async" data-photo-wash="off" />
          <span class="footer-ecosystem__name">Safaris</span>
        </a>
        <a class="footer-ecosystem__unit" href="/pages/foundation/">
          <img class="footer-ecosystem__mark" src="${foundationLogo}" alt="" width="40" height="40" loading="lazy" decoding="async" data-photo-wash="off" />
          <span class="footer-ecosystem__name">Foundation</span>
        </a>
      </div>
    </section>`;

  return `<footer class="site-footer site-footer--main">
      <div class="container footer-shell">
        <div class="footer-top">
          <div class="footer-top__copy">
            <p class="footer-top__eyebrow">Meleji · Arusha, Tanzania</p>
          </div>
          <div class="footer-top__social">
            <p class="footer-top__social-label">Follow</p>
            <div class="footer-social footer-social--modern" aria-label="Social media">${renderFooterSocialLinks()}</div>
          </div>
        </div>
        ${ecosystem}
        <div class="footer-grid" data-reveal style="--reveal-delay: 1">
          <nav aria-label="Footer accommodation"><h2>Stay</h2><a href="/pages/accommodation/shared-rooms/">Shared rooms</a><a href="/pages/accommodation/deluxe-rooms/">Deluxe rooms</a><a href="/pages/accommodation/">All accommodation</a><a href="/pages/booking/">Booking enquiry</a></nav>
          <nav aria-label="Footer experiences"><h2>Explore</h2><a href="/pages/safaris/">Safaris &amp; tours</a><a href="/pages/safaris/destinations/">Destinations</a><a href="/pages/experiences/">Local experiences</a><a href="/pages/safaris/custom/">Custom safari</a></nav>
          <nav aria-label="Footer our story"><h2>Our Story</h2><a href="/pages/about/">About Meleji</a><a href="/pages/foundation/">Our foundation</a><a href="/pages/contact/?intent=foundation">Volunteer with us</a><a href="/pages/foundation/impact/">Community</a></nav>
          <div class="footer-contact"><h2>Get in touch</h2><p><i class="fa-regular fa-envelope" aria-hidden="true"></i><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p><p><i class="fa-brands fa-whatsapp" aria-hidden="true"></i><a href="https://wa.me/255756344075" target="_blank" rel="noopener noreferrer">${CONTACT.phoneLabel}</a></p><p class="footer-contact__place"><i class="fa-solid fa-location-dot" aria-hidden="true"></i>${CONTACT.location}</p><a class="footer-contact__cta" href="/pages/contact/">Contact the team <span aria-hidden="true">→</span></a></div>
        </div>
      </div>
      <div class="footer-bottom"><div class="container footer-bottom__inner"><p>© ${year} Meleji Homestays</p><a href="#main-content" class="footer-bottom__top" aria-label="Back to top"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a></div></div>
    </footer>`;
}

function renderCompactFooter(year) {
  return `<footer class="site-footer site-footer--compact">
      <div class="container footer-compact-bar">
        <p class="footer-compact-bar__brand">Meleji · Arusha, Tanzania</p>
        <div class="footer-social footer-social--modern" aria-label="Follow Meleji">${renderFooterSocialLinks()}</div>
        <p class="footer-compact-bar__copy">© ${year} Meleji Homestays</p>
        <a class="footer-compact-bar__top" href="#main-content" aria-label="Back to top"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></a>
      </div>
    </footer>`;
}

/**
 * @param {'home' | 'main' | 'compact'} variant
 */
export function renderFooter(variant = 'compact') {
  const year = new Date().getFullYear();
  if (variant === 'home') {
    return `${renderPageVisitCta(HOME_VISIT_CTA)}${renderMainFooter(year)}`;
  }
  if (variant === 'main') {
    return renderMainFooter(year);
  }
  return renderCompactFooter(year);
}