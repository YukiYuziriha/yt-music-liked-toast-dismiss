(() => {
  const TOAST_SELECTOR = 'tp-yt-paper-toast#toast';
  const TEXT_SELECTOR = 'yt-formatted-string#text';
  const CLOSE_SELECTOR = 'yt-icon-button#close-button button';
  const TARGET_TEXT = 'Saved to liked music';

  const matchesTargetToast = (toast) => {
    if (!toast) {
      return false;
    }

    const textNode = toast.querySelector(TEXT_SELECTOR);
    const text = textNode ? textNode.textContent.trim() : '';
    return text === TARGET_TEXT;
  };

  const dismissToast = (toast) => {
    if (!matchesTargetToast(toast)) {
      return false;
    }

    const closeButton = toast.querySelector(CLOSE_SELECTOR);
    if (!closeButton) {
      return false;
    }

    closeButton.click();
    return true;
  };

  const attemptDismiss = () => {
    const toast = document.querySelector(TOAST_SELECTOR);
    return dismissToast(toast);
  };

  const start = () => {
    const root = document.documentElement || document.body;
    if (!root) {
      return;
    }

    const observer = new MutationObserver(() => {
      attemptDismiss();
    });

    observer.observe(root, { childList: true, subtree: true });

    setInterval(attemptDismiss, 500);
    attemptDismiss();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
