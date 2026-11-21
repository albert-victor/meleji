const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function closeAllSelects(except) {
  document.querySelectorAll('[data-custom-select]').forEach((root) => {
    if (except && root === except) return;
    const list = root.querySelector('.custom-select__list');
    const trigger = root.querySelector('.custom-select__trigger');
    if (list) list.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-open');
  });
}

function closeAllCalendars(except) {
  document.querySelectorAll('[data-calendar-field]').forEach((root) => {
    if (except && root === except) return;
    const pop = root.querySelector('[data-calendar-popover]');
    const trigger = root.querySelector('.calendar-field__trigger');
    if (pop) pop.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-open');
  });
}

function formatIsoDisplay(iso) {
  if (!iso) return 'Pick a date';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return 'Pick a date';
  return `${d} ${MONTH_LABELS[m - 1]?.slice(0, 3) ?? m} ${y}`;
}

function isoFromParts(year, monthIndex, day) {
  const mm = String(monthIndex + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

function initCustomSelect(root) {
  const hidden = root.querySelector('[data-custom-select-value]');
  const trigger = root.querySelector('.custom-select__trigger');
  const list = root.querySelector('.custom-select__list');
  const display = root.querySelector('.custom-select__display');
  if (!hidden || !trigger || !list || !display) return;

  const selectValue = (value, label) => {
    hidden.value = value;
    display.textContent = label;
    list.querySelectorAll('.custom-select__option').forEach((opt) => {
      opt.classList.toggle('is-selected', opt.dataset.value === value);
    });
    closeAllSelects();
    hidden.dispatchEvent(new Event('input', { bubbles: true }));
  };

  trigger.addEventListener('click', () => {
    closeAllCalendars();
    const open = root.classList.toggle('is-open');
    list.hidden = !open;
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) closeAllSelects(root);
  });

  list.querySelectorAll('.custom-select__option').forEach((opt) => {
    opt.addEventListener('click', () => selectValue(opt.dataset.value ?? '', opt.textContent?.trim() ?? ''));
    opt.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectValue(opt.dataset.value ?? '', opt.textContent?.trim() ?? '');
      }
    });
  });
}

function initCalendarField(root) {
  const hidden = root.querySelector('[data-calendar-value]');
  const trigger = root.querySelector('.calendar-field__trigger');
  const display = root.querySelector('.calendar-field__display');
  const popover = root.querySelector('[data-calendar-popover]');
  const grid = root.querySelector('[data-calendar-grid]');
  const monthLabel = root.querySelector('[data-calendar-month-label]');
  const prev = root.querySelector('[data-calendar-prev]');
  const next = root.querySelector('[data-calendar-next]');
  if (!hidden || !trigger || !display || !popover || !grid || !monthLabel || !prev || !next) return;

  const today = new Date();
  let viewYear = today.getFullYear();
  let viewMonth = today.getMonth();

  const renderMonth = () => {
    monthLabel.textContent = `${MONTH_LABELS[viewMonth]} ${viewYear}`;
    grid.innerHTML = '';
    const first = new Date(viewYear, viewMonth, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    for (let i = 0; i < startOffset; i += 1) {
      const pad = document.createElement('span');
      pad.className = 'calendar-popover__pad';
      pad.setAttribute('aria-hidden', 'true');
      grid.appendChild(pad);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const iso = isoFromParts(viewYear, viewMonth, day);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar-popover__day';
      btn.textContent = String(day);
      btn.setAttribute('role', 'gridcell');
      btn.dataset.iso = iso;
      if (iso === hidden.value) btn.classList.add('is-selected');
      const cellDate = new Date(viewYear, viewMonth, day);
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      if (cellDate < startOfToday) {
        btn.disabled = true;
        btn.classList.add('is-past');
      }
      btn.addEventListener('click', () => {
        hidden.value = iso;
        display.textContent = formatIsoDisplay(iso);
        hidden.dispatchEvent(new Event('input', { bubbles: true }));
        closeAllCalendars();
      });
      grid.appendChild(btn);
    }
  };

  const openPopover = () => {
    closeAllSelects();
    if (hidden.value) {
      const [y, m] = hidden.value.split('-').map(Number);
      if (y && m) {
        viewYear = y;
        viewMonth = m - 1;
      }
    }
    renderMonth();
    popover.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    root.classList.add('is-open');
  };

  trigger.addEventListener('click', () => {
    if (root.classList.contains('is-open')) {
      closeAllCalendars();
      return;
    }
    openPopover();
  });

  prev.addEventListener('click', () => {
    viewMonth -= 1;
    if (viewMonth < 0) {
      viewMonth = 11;
      viewYear -= 1;
    }
    renderMonth();
  });

  next.addEventListener('click', () => {
    viewMonth += 1;
    if (viewMonth > 11) {
      viewMonth = 0;
      viewYear += 1;
    }
    renderMonth();
  });

  if (hidden.value) {
    display.textContent = formatIsoDisplay(hidden.value);
  }
}

export function initFormControls(scope = document) {
  scope.querySelectorAll('[data-custom-select]').forEach(initCustomSelect);
  scope.querySelectorAll('[data-calendar-field]').forEach(initCalendarField);

  if (!document.documentElement.dataset.melejiFormControlsBound) {
    document.documentElement.dataset.melejiFormControlsBound = 'true';
    document.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('[data-custom-select]')) return;
      if (event.target.closest('[data-calendar-field]')) return;
      closeAllSelects();
      closeAllCalendars();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeAllSelects();
        closeAllCalendars();
      }
    });
  }
}