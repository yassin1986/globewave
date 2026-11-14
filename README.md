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

## Live news, weather and radio test

This isolated test branch includes official YouTube embeds for France 24 English, French and Arabic, BBC News, and Al Jazeera English. The English/French/Arabic/Al Jazeera video IDs were verified against YouTube's public oEmbed title/author response; France 24's official English live page identifies its live YouTube programme. Embedding uses YouTube's own player; viewers may encounter territory, sign-in, bot-check, embed-setting or availability limits. Al Jazeera prompted a sign-in/bot-check in the owner's test. This is not a rebroadcast or a guarantee that every viewer can watch.

A live weather lookup uses Visual Crossing's no-key HTTPS Timeline API directly from the browser, defaults to the clearly labeled sample city Casablanca, allows manual city search, and shows a nearby attribution link. The provider documents free commercial use with attribution, but limits anonymous use and may change thresholds; observe its current terms/fair-use limits.

The in-page radio controls remain deliberately disabled: no working official station embed with terms expressly permitting use on this third-party site was verified. Radio France's official Open API FAQ (https://developers.radiofrance.fr/doc/en/faq) says it does not authorize use of the Open API for a live-radio or podcast-streaming application; it separately describes embedding Radio France's own `playerUrl` player, which does not by itself establish permission for this GlobeWave aggregation use. A currently tested Franceinfo example player URL (https://embed.radiofrance.fr/franceinfo/player?id_station=2) returned an error saying its URL or station ID was invalid. To enable radio, obtain either a working official station embed whose published rules permit embedding on GlobeWave, or written station permission/licence for free in-page live playback on this site, covering the intended countries and any commercial/ad-supported use if ads are added later. A listening page, bare audio/stream URL, or community-submitted directory entry is not permission.

The RSS/metadata feeds are not republished here; terms vary and BBC specifically requires a business licence/permission for commercial use of its metadata/RSS. The in-page live news embeds supply news content without copying stories or headlines.
