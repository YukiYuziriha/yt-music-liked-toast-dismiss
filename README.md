# YouTube Music Liked Toast Dismiss

Small Chrome extension that auto-dismisses the persistent "Saved to liked music" toast on YouTube Music.

## What it does
- Watches for the YouTube Music toast container.
- Verifies the toast text matches "Saved to liked music".
- Clicks the toast close (X) button immediately.

## Install (local)
1. Open Chrome and go to `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this folder.

## How it works
The content script uses a `MutationObserver` to detect when the toast appears, then clicks the close button only if the toast text is an exact match.

## Permissions
- `https://music.youtube.com/*` (content script match only)

## Files
- `manifest.json` Chrome extension manifest (MV3)
- `content.js` Toast detection and dismissal logic

## Privacy
This extension does not collect, store, or transmit any user data.
