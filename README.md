# YouTube Music Liked Pop-up Dismiss

Small Chrome extension that auto-dismisses the "Saved to liked music" pop-up message on YouTube Music.

![YouTube Music pop-up auto-dismiss screenshot](./pictures/mini%20screen.png)

## What it does
- Watches for the YouTube Music pop-up container.
- Verifies the message text matches "Saved to liked music".
- Clicks the close (X) button immediately.

## Install (local)
1. Get the files (pick one):
   - Git: `git clone https://github.com/YukiYuziriha/yt-music-liked-toast-dismiss.git`
   - Or download the ZIP from GitHub and unzip it.
2. You should now have a folder named `yt-music-liked-toast-dismiss`.
3. Open Chrome and go to `chrome://extensions`.
4. Turn on "Developer mode" (top right).
5. Click "Load unpacked".
6. Select the `yt-music-liked-toast-dismiss` folder (the one that contains `manifest.json`).

## How it works
The content script uses a `MutationObserver` to detect when the pop-up appears, then clicks the close button only if the message text is an exact match.

## Permissions
- `https://music.youtube.com/*` (content script match only)

## Files
- `manifest.json` Chrome extension manifest (MV3)
- `content.js` Toast detection and dismissal logic

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

## Privacy
This extension does not collect, store, or transmit any user data.
