# GlobeWave live-player prototype

This is a separate, unpublished prototype that replaces the old directory-first landing experience with a player-first page. It includes English, French and Arabic variants and one official source: Al Jazeera English Live.

## Player and source

The Al Jazeera official live page was opened during preparation and its visible DOM contained an iframe titled “🔴 Al Jazeera English | Live” using YouTube video ID `gCNeDWCI0vo`. The page showed the official live player surface and schedule. The prototype loads the official YouTube embedded player only after the visitor clicks, with autoplay off, a privacy-enhanced YouTube host, an official-channel fallback link, and a referrer policy that preserves the origin needed by YouTube's embedded player.

YouTube's official help says videos/playlists can be embedded by using the Share → Embed code, that the embed must run in a webpage context, and that playback can be blocked by age restriction or other availability limits. Source: https://support.google.com/youtube/answer/171780?hl=en .

The actual player was not confirmed playing in the test browser: direct top-level navigation to the embed URL returned YouTube Error 153 because an embedded player requires an HTTP Referer; loading Al Jazeera's own page revealed its iframe but the video viewport was blank in the test browser. Therefore this is a real official embed integration, not a verified successful playback claim. Test on the eventual HTTPS deployment before enabling broader promotion.

## Rights and boundaries

- The player uses the broadcaster's official YouTube player; it does not copy a stream URL, strip ads, download, record, proxy or rebroadcast video.
- YouTube's general embedding instructions do not establish permission to bypass a video owner's embed setting, geographical controls or platform terms. The embed remains subject to the broadcaster's current setting and YouTube availability.
- No unofficial IPTV playlist, direct HLS URL, or user-submitted stream has been included.
- Other channels should be added only after their official player is embeddable or written streaming permission is obtained. DW's official terms prohibit full-length content on advertising-funded services without authorization, so DW is deliberately excluded from this ad-compatible prototype.
- This is a temporary public HTTPS test page explicitly requested by the owner; the old directory-first site remains unpublished. It contains only this one-channel player test, not the full website. Disable this test deployment after playback checking is complete.

## Files

- `index.html`: English player-first page
- `fr/index.html`: French page
- `ar/index.html`: Arabic page
- `assets/player.js`, `assets/player.css`: lazy embed and responsive styling

No automatic source discovery, availability monitoring, live weather/news integration, ads, or app package is implemented.
