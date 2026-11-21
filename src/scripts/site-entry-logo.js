/** Static path (public/) so the boot script can decode before the JS bundle loads. */
export const SITE_ENTRY_LOGO_SRC = '/brand/meleji-entry-logo.png';

/**
 * @param {HTMLImageElement | null | undefined} img
 */
export function whenSiteEntryLogoReady(img) {
  return new Promise((resolve) => {
    if (!img) {
      resolve();
      return;
    }

    const finish = () => {
      img.classList.add('is-ready');
      resolve();
    };

    const decode = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(finish).catch(finish);
      } else {
        finish();
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      decode();
      return;
    }

    img.addEventListener(
      'load',
      () => {
        decode();
      },
      { once: true },
    );

    img.addEventListener(
      'error',
      () => {
        finish();
      },
      { once: true },
    );

    if (!img.getAttribute('src')) {
      img.src = SITE_ENTRY_LOGO_SRC;
    }
  });
}