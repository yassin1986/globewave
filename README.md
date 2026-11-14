# GlobeWave custom player test

This is the temporary player-test branch, not the deleted directory website. The English, French and Arabic pages now use a GlobeWave-styled HTML5 video player with responsive play/pause, volume, live seeking, fullscreen, native HLS support and hls.js fallback.

## Playback / rights status

No direct HLS stream URL has been supplied or authorized for this website, so the player intentionally has no media source and cannot yet play live TV. `assets/player.js` contains an empty `STREAM_URL` placeholder. Only configure it after the broadcaster supplies or explicitly authorizes a direct HTTPS `.m3u8` URL for GlobeWave, and confirm the permission covers the countries and embedding conditions. Never fill it from IPTV-org, Radio Browser, scraped page requests or another user-submitted directory.

The official Al Jazeera live-page link remains available as a fallback: https://www.aljazeera.com/video/live. Its official page/YouTube player does not provide permission for this custom HLS player to use an extracted stream URL. The earlier YouTube embed was replaced in the primary player because it triggered a sign-in/bot verification screen on the owner's phone.

## Technical behavior

- If an authorized stream is configured, Safari/browser-native HLS is used when available; otherwise the page lazily loads the pinned hls.js 1.5.18 library from jsDelivr.
- The player has a custom responsive interface and native video element, not a YouTube iframe.
- This static GitHub Pages test does not proxy or rebroadcast media and has no automatic channel checking.
- Public routes: `/globewave/`, `/globewave/fr/`, `/globewave/ar/`. Pages remain marked `noindex,nofollow` because this is a test.
