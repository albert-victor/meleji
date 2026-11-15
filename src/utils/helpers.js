export function setFooterYear(selector) {
  const el = document.querySelector(selector);
  if (el) el.textContent = String(new Date().getFullYear());
}
