import { escapeHtml } from '../utils/html.js';

/**
 * @param {{
 *   id: string,
 *   name: string,
 *   label: string,
 *   options: { value: string, label: string, selected?: boolean }[],
 *   required?: boolean,
 *   placeholder?: string,
 *   compact?: boolean,
 * }} props
 */
export function renderCustomSelect(props) {
  const placeholder = props.placeholder ?? 'Choose…';
  const selected = props.options.find((o) => o.selected);
  const display = selected?.value ? selected.label : placeholder;
  const req = props.required ? ' required' : '';
  const compact = props.compact ? ' custom-select--compact' : '';

  const list = props.options
    .map(
      (opt) => `
        <li role="option" class="custom-select__option${opt.selected ? ' is-selected' : ''}" data-value="${escapeHtml(opt.value)}" tabindex="-1">${escapeHtml(opt.label)}</li>`,
    )
    .join('');

  return `
    <div class="form-field form-field--custom-select${compact ? ' form-field--compact' : ''}" data-custom-select>
      <label id="${escapeHtml(props.id)}-label" for="${escapeHtml(props.id)}-trigger">${escapeHtml(props.label)}</label>
      <input type="hidden"${props.name ? ` name="${escapeHtml(props.name)}"` : ''} id="${escapeHtml(props.id)}" value="${escapeHtml(selected?.value ?? '')}"${req} data-custom-select-value />
      <button type="button" class="custom-select__trigger" id="${escapeHtml(props.id)}-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="${escapeHtml(props.id)}-label ${escapeHtml(props.id)}-display">
        <span class="custom-select__display" id="${escapeHtml(props.id)}-display">${escapeHtml(display)}</span>
        <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
      </button>
      <ul class="custom-select__list" role="listbox" aria-labelledby="${escapeHtml(props.id)}-label" hidden>
        ${list}
      </ul>
    </div>`;
}

/**
 * Branded month calendar popover (not the native OS date picker).
 * @param {{ id: string, name: string, label: string, required?: boolean }} props
 */
export function renderCalendarField(props) {
  const req = props.required ? ' required' : '';
  return `
    <div class="form-field form-field--calendar" data-calendar-field>
      <label id="${escapeHtml(props.id)}-label" for="${escapeHtml(props.id)}-trigger">${escapeHtml(props.label)}</label>
      <input type="hidden" name="${escapeHtml(props.name)}" id="${escapeHtml(props.id)}" value=""${req} data-calendar-value />
      <button type="button" class="calendar-field__trigger" id="${escapeHtml(props.id)}-trigger" aria-haspopup="dialog" aria-expanded="false" aria-labelledby="${escapeHtml(props.id)}-label ${escapeHtml(props.id)}-display">
        <i class="fa-solid fa-calendar-days" aria-hidden="true"></i>
        <span class="calendar-field__display" id="${escapeHtml(props.id)}-display">Pick a date</span>
      </button>
      <div class="calendar-popover" data-calendar-popover hidden role="dialog" aria-modal="true" aria-label="${escapeHtml(props.label)}">
        <div class="calendar-popover__bar">
          <button type="button" class="calendar-popover__shift" data-calendar-prev aria-label="Previous month">←</button>
          <span class="calendar-popover__month" data-calendar-month-label></span>
          <button type="button" class="calendar-popover__shift" data-calendar-next aria-label="Next month">→</button>
        </div>
        <ul class="calendar-popover__weekdays" aria-hidden="true">
          <li>Mon</li><li>Tue</li><li>Wed</li><li>Thu</li><li>Fri</li><li>Sat</li><li>Sun</li>
        </ul>
        <div class="calendar-popover__grid" data-calendar-grid role="grid"></div>
      </div>
    </div>`;
}

/** @deprecated Use renderCalendarField */
export const renderCustomDate = renderCalendarField;