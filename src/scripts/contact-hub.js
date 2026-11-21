import { stayPrefillFromSearchParams } from '../data/booking-room-options.js';
import { buildContactHref, normalizeContactIntent } from '../utils/contact-routes.js';

const INTENTS = ['message', 'stay', 'safari', 'foundation'];

function intentFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('intent');
  if (raw) return normalizeContactIntent(raw);
  if (params.get('destination') || params.get('package') || params.get('activity')) return 'safari';
  if (params.get('room') || params.get('experience')) return 'stay';
  return 'message';
}

function contextParams() {
  const params = new URLSearchParams(window.location.search);
  /** @type {Record<string, string>} */
  const ctx = {};
  ['room', 'experience', 'destination', 'package', 'activity'].forEach((key) => {
    const v = params.get(key);
    if (v) ctx[key] = v;
  });
  return ctx;
}

export function initContactHub(root = document) {
  const hub = root.querySelector('[data-contact-hub]');
  if (!hub) return;

  const tabs = hub.querySelectorAll('[data-contact-tab]');
  const panels = hub.querySelectorAll('[data-contact-panel]');

  const activate = (key) => {
    const safe = INTENTS.includes(key) ? key : 'message';
    tabs.forEach((tab) => {
      const on = tab.dataset.contactTab === safe;
      tab.classList.toggle('is-active', on);
      if (tab instanceof HTMLAnchorElement) {
        tab.setAttribute('aria-current', on ? 'page' : 'false');
      } else {
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
      }
    });
    panels.forEach((panel) => {
      const on = panel.dataset.contactPanel === safe;
      panel.hidden = !on;
    });
    const target = hub.querySelector(`#contact-panel-${safe}`);
    if (target && hub.contains(document.activeElement) && document.activeElement?.closest('[data-contact-tab]')) {
      target.focus({ preventScroll: true });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', (event) => {
      const intent = tab.dataset.contactTab ?? 'message';
      const href = buildContactHref({ intent, ...contextParams() });
      if (tab instanceof HTMLAnchorElement) {
        tab.setAttribute('href', href);
      }
      event.preventDefault();
      const url = new URL(href, window.location.origin);
      history.pushState(null, '', `${url.pathname}${url.search}`);
      activate(intent);
    });
  });

  window.addEventListener('popstate', () => activate(intentFromUrl()));

  activate(intentFromUrl());

  const presetSelect = (panel, name, value) => {
    const hidden = hub.querySelector(`[data-contact-panel="${panel}"] [name="${name}"]`);
    if (!(hidden instanceof HTMLInputElement) || !value) return;
    hidden.value = value;
    const selectRoot = hidden.closest('[data-custom-select]');
    const option = selectRoot?.querySelector(`[data-value="${CSS.escape(value)}"]`);
    if (selectRoot && option) {
      selectRoot.querySelectorAll('.custom-select__option').forEach((el) => {
        el.classList.toggle('is-selected', el === option);
      });
      const display = selectRoot.querySelector('.custom-select__display');
      if (display) display.textContent = option.textContent?.trim() ?? '';
    }
  };

  const params = new URLSearchParams(window.location.search);
  const stayPrefill = stayPrefillFromSearchParams(params);
  if (stayPrefill.room) presetSelect('stay', 'room', stayPrefill.room);
  if (stayPrefill.occupancy) presetSelect('stay', 'occupancy', stayPrefill.occupancy);
  const stayForm = hub.querySelector('[data-contact-panel="stay"] form[data-enquiry-form]');
  if (stayForm && (stayPrefill.room || stayPrefill.occupancy)) {
    stayForm.dispatchEvent(new Event('change', { bubbles: true }));
  }
  if (params.get('experience')) {
    const stayForm = hub.querySelector('[data-contact-panel="stay"] form');
    if (stayForm) {
      let hidden = stayForm.querySelector('input[name="experience"]');
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = 'experience';
        stayForm.prepend(hidden);
      }
      hidden.value = params.get('experience');
    }
  }
  ['destination', 'package', 'activity'].forEach((key) => {
    const value = params.get(key);
    if (!value) return;
    const field = hub.querySelector(`[data-contact-panel="safari"] [name="${key}"]`);
    if (field instanceof HTMLInputElement) field.value = value;
  });
}