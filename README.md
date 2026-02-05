# YouTube Music Liked Pop-up Dismiss

Small Chrome extension that auto-dismisses the "Saved to liked music" pop-up message on YouTube Music.

## What it does
- Watches for the YouTube Music pop-up container.
- Verifies the message text matches "Saved to liked music".
- Clicks the close (X) button immediately.

## Prerequisites
- Git

## Clone the repo
Windows (PowerShell):
```powershell
git clone https://github.com/YukiYuziriha/yt-music-liked-toast-dismiss.git
cd yt-music-liked-toast-dismiss
```

macOS / Linux (Terminal):
```bash
git clone https://github.com/YukiYuziriha/yt-music-liked-toast-dismiss.git
cd yt-music-liked-toast-dismiss
```

## Install (local)
1. Open Chrome and go to `chrome://extensions`.
2. Enable "Developer mode".
3. Click "Load unpacked" and select this folder.

## How it works
The content script uses a `MutationObserver` to detect when the pop-up appears, then clicks the close button only if the message text is an exact match.

## Permissions
- `https://music.youtube.com/*` (content script match only)

## Files
- `manifest.json` Chrome extension manifest (MV3)
- `content.js` Toast detection and dismissal logic

## Privacy
This extension does not collect, store, or transmit any user data.
