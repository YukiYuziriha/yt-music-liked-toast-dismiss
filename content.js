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

  const matchesTargetToast = (toast) => {
    if (!toast) {
      return false;
    }

    const textNode = queryDeep(toast, TEXT_SELECTOR);
    const text = textNode ? textNode.textContent.trim() : '';
    return text === TARGET_TEXT;
  };

  const dismissToast = (toast) => {
    if (!matchesTargetToast(toast)) {
      return false;
    }

    const closeButton = queryDeep(toast, CLOSE_SELECTOR);
    if (!closeButton) {
      return false;
    }

    closeButton.click();
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
