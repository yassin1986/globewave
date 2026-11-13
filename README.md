# GlobeWave

A deployable static, multilingual directory of official global television, radio, news and weather sources. It links visitors to each provider’s own website; it does not embed or rebroadcast streams.

## Deploy (free GitHub Pages)

This build is configured for `https://yassin1986.github.io/globewave/`. Create a public GitHub repository named `globewave`, commit this folder’s contents to its root, then in **Settings → Pages** select **Deploy from a branch**, branch `main`, folder `/ (root)`. GitHub Pages will publish the site at that URL. Do not add a paid plan or domain. If the chosen repository name/account changes, update canonical, hreflang, Open Graph, sitemap, and asset URLs in the HTML/XML before publishing.

## SEO / indexability

- Every locale page includes crawlable source names and explanatory text in initial HTML (no client-only rendering), descriptive title and description, self-canonical, `hreflang` links for English/French/Arabic plus `x-default`, Open Graph tags, robots directive and WebSite JSON-LD.
- `robots.txt` allows crawling and points to `sitemap.xml`; the sitemap lists the root and three localized routes.
- `assets/site.js` only enhances search and category filtering; content remains present without JavaScript. CSS is responsive, uses visible focus indicators, a skip link, accessible labels and reduced-motion handling.
- Check after deployment: open `/robots.txt`, `/sitemap.xml`, and each locale URL; verify mobile and keyboard access; add the public site property in Google Search Console, verify domain/property ownership, submit `/sitemap.xml`, then use URL Inspection / Request indexing. Indexing and rankings are controlled by search engines; no ranking position is guaranteed.

## Content and safety

Directory entries point only to identified official broadcaster/public-service pages. A badge identifies a source page, not a verified currently playing stream. Playback, regional access and programme rights remain with each provider. The site does not perform synchronization, stream availability polling, or rebroadcast. Review source links periodically by human check before calling any player live.

The included sources are a curated starter set spanning Europe, Asia, the Middle East, Africa, and global weather services; this is not exhaustive. No ad network is connected.
