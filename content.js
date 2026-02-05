(() => {
  const TOAST_SELECTOR = 'tp-yt-paper-toast';
  const TEXT_SELECTOR = 'yt-formatted-string#text';
  const CLOSE_SELECTOR = 'button[aria-label="Dismiss"], yt-icon-button#close-button, yt-icon-button#close-button button';
  const TARGET_TEXT = 'Saved to liked music';

  const queryAllDeep = (root, selector) => {
    const results = [];
    if (!root) {
      return results;
    }

    if (root.querySelectorAll) {
      results.push(...root.querySelectorAll(selector));
    }

    const treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let node = treeWalker.currentNode;
    while (node) {
      if (node.shadowRoot) {
        results.push(...queryAllDeep(node.shadowRoot, selector));
      }
      node = treeWalker.nextNode();
    }

    return results;
  };

  const queryDeep = (root, selector) => queryAllDeep(root, selector)[0] || null;

  const isElementVisible = (element) => {
    if (!element) {
      return false;
    }

    if (element.getClientRects().length === 0) {
      return false;
    }

    const style = window.getComputedStyle(element);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }

    return true;
  };

  const isToastOpen = (toast) => {
    if (!toast) {
      return false;
    }

    if (!toast.classList.contains('paper-toast-open')) {
      return false;
    }

    return isElementVisible(toast);
  };

  const matchesTargetToast = (toast) => {
    if (!toast) {
      return false;
    }

    if (!isToastOpen(toast)) {
      return false;
    }

    const textNode = queryDeep(toast, TEXT_SELECTOR);
    const text = textNode ? textNode.textContent.trim() : '';
    return text === TARGET_TEXT;
  };

  const lastDismissedAt = new WeakMap();

  const canDismissAgain = (toast) => {
    const last = lastDismissedAt.get(toast) || 0;
    return Date.now() - last > 1000;
  };

  const dismissToast = (toast) => {
    if (!matchesTargetToast(toast)) {
      return false;
    }

    if (!canDismissAgain(toast)) {
      return false;
    }

    const closeButton = queryDeep(toast, CLOSE_SELECTOR);
    if (!closeButton) {
      return false;
    }

    if (!isElementVisible(closeButton)) {
      return false;
    }

    closeButton.click();
    lastDismissedAt.set(toast, Date.now());
    return true;
  };

  const attemptDismiss = () => {
    const toasts = queryAllDeep(document, TOAST_SELECTOR);
    let dismissed = false;
    toasts.forEach((toast) => {
      dismissed = dismissToast(toast) || dismissed;
    });
    return dismissed;
  };

  const start = () => {
    const root = document.documentElement || document.body;
    if (!root) {
      return;
    }

    const observer = new MutationObserver(() => {
      attemptDismiss();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-hidden']
    });

    setInterval(attemptDismiss, 1500);
    attemptDismiss();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
