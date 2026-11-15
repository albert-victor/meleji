import { renderBreadcrumb } from '../components/breadcrumb.js';
import { renderCtaBand } from '../components/cta-band.js';
import { renderDetailEditorialHero, collageImagesFromEntity } from '../components/detail-hero.js';
import { renderExperienceCard, renderCardGrid } from '../components/cards/index.js';
import { publishedExperiences } from '../data/published/experiences.js';
import { getExperienceBySlug } from '../data/published/lookup.js';
import expHero from '../assets/images/moments/in_the_Field.jpg';
import { mountInner } from './shared.js';
import { renderMissingContent } from './not-found.js';
import { renderRichExperienceDetail } from './experience-detail-layout.js';

export function renderExperiencesOverview() {
  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Local experiences' },
      ])}
      ${renderDetailEditorialHero({
        eyebrow: 'Around the homestay',
        title: 'Local experiences',
        lead: 'Food, coffee with Mgei, culture, and outdoor time — booked with the hosts and confirmed on WhatsApp.',
        images: collageImagesFromEntity({
          gallery: publishedExperiences.slice(0, 3).map((exp) => ({ src: exp.imageSrc, alt: exp.imageAlt })),
          imageSrc: expHero,
          imageAlt: 'Guests in the field near Meleji',
        }),
        actions: [
          { label: 'Book your stay', href: '/pages/booking/' },
          { label: 'Contact', href: '/pages/contact/', variant: 'secondary', slide: false },
        ],
      })}
      <section class="inner-section container">
        ${renderCardGrid(publishedExperiences, renderExperienceCard, {
          columns: 2,
          ariaLabel: 'Experiences',
        })}
      </section>
      ${renderCtaBand({
        title: 'Add experiences to a stay',
        text: 'Mention meals and activities when you send a booking enquiry.',
        primary: { label: 'Booking enquiry', href: '/pages/booking/' },
      })}
    </div>`);
}

export function renderExperienceDetail(slug) {
  const experience = getExperienceBySlug(slug);
  if (!experience) {
    renderMissingContent();
    return;
  }

  mountInner(`
    <div class="inner-page">
      ${renderBreadcrumb([
        { label: 'Home', href: '/' },
        { label: 'Experiences', href: '/pages/experiences/' },
        { label: experience.title },
      ])}
      ${renderRichExperienceDetail(experience)}
    </div>`);
}

