# Co.Solutions website

Static site published by GitHub Pages at <https://cosolutionshq.github.io/>. Plain HTML, CSS and one small script. No build step, no trackers, no cookies, no third-party requests.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page |
| `privacy.html` | Privacy page |
| `404.html` | Not-found page |
| `assets/landing.css` | The one stylesheet: tokens (colour, type, space, motion) at the top, then each section |
| `assets/site.js` | The only script: WhatsApp links, header, phone menu and sticky bar, FAQ, the hero card's cycle, count-ups and chart draws, brand switcher |
| `assets/fonts/` | Self-hosted fonts with their OFL licences: Archivo, Instrument Serif, Geist, IBM Plex Mono; Outfit and Plus Jakarta Sans only for the two fictional agencies in the white label demo |
| `assets/screens/web/` | Product screenshots as WebP |
| `assets/brand/` | Logo, symbol, social sharing image and brand tokens |
| `assets/fictional-brands/` | Marks of the fictional agencies |
| `docs/DESIGN.md` | Round 1 design notes; round 2 follows the design board "Co.Solutions - Landing Round 2" |

## Figures and motion

Every figure on the page is the interactive tour's (sample agency, October 2026 against September, tour captured
11 November 2026). When the tour is rebuilt, check the figures in `index.html` against it.

The HTML carries the final value of every number and chart, so no-JS, print, reduced motion and screen readers get the
final state. `site.js` marks cards that start below the fold, zeroes them, and plays them once when 35% is in view:
numbers count up (`data-count`), bars grow, heat cells fade in. Motion tokens are at the top of `landing.css`.

## Change the WhatsApp number

Two places, so the links work with or without JavaScript:

1. `CONFIG.whatsapp` in `assets/site.js` (digits only, with the country code).
2. The `https://wa.me/...` links in `index.html` and `privacy.html`: find and replace the number, so links work without JavaScript too.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The `demo/` links only work on the live site, because the tour is published from its own repository.

## Moving to a custom domain

Links and assets are relative, so the pages work on any domain. `404.html` uses root-relative links, because it can be served at any depth. Absolute URLs are only used where the standards require them. Update these when the domain changes:

- `index.html` and `privacy.html`: `canonical`, `og:url`, `og:image`, `twitter:image`
- `index.html`: the JSON-LD block
- `robots.txt` and `sitemap.xml`

Then add the domain under Settings → Pages (GitHub creates the `CNAME` file).
