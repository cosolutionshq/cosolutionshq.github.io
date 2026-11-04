# Co.Solutions website

Static site published by GitHub Pages at <https://cosolutionshq.github.io/>. Plain HTML, CSS and one small script. No build step, no trackers, no cookies, no third-party requests.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page |
| `privacy.html` | Privacy page |
| `404.html` | Not-found page |
| `assets/tokens.css` | Design tokens: colour, type, spacing, radius, elevation, motion |
| `assets/site.css` | Layout and components, using only the tokens |
| `assets/site.js` | The only script: WhatsApp links, header, phone menu, accordions, brand switcher, reveal |
| `assets/fonts/` | Self-hosted fonts (Archivo, Instrument Serif, Geist, IBM Plex Mono) with their OFL licences |
| `assets/screens/web/` | Product screenshots as WebP |
| `assets/brand/` | Logo, symbol, social sharing image and brand tokens |
| `assets/fictional-brands/` | Marks of the fictional agencies |
| `docs/DESIGN.md` | The design system, components and layouts |

## Design tokens

Every section uses the tokens in `assets/tokens.css`. Change a value there and it changes everywhere:

- **Spacing:** `--space-1` to `--space-10`, plus `--section-y`, `--head-gap` and `--card-pad`
- **Type:** `--text-display`, `--text-h2`, `--text-h3`, `--text-lead`, `--text-body`, `--text-small`, `--text-eyebrow`
- **Colour:** `--bg`, `--surface`, `--surface-raised`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-contrast`, `--focus`
- **Shape:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--shadow-1`, `--shadow-2`

`docs/DESIGN.md` explains how they are used.

## Change the WhatsApp number

Two places, so the links work with or without JavaScript:

1. `CONFIG.whatsapp` in `assets/site.js` (digits only, with the country code).
2. The `https://wa.me/...` links in `index.html` and `privacy.html`: find and replace the number.

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
