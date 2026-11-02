# Co.Solutions website

Static site published by GitHub Pages at <https://cosolutionshq.github.io/>. Plain HTML, CSS and one small script. No build step, no trackers, no cookies, no third-party requests.

## Files

| Path | What it is |
|---|---|
| `index.html` | The landing page |
| `privacy.html` | Privacy page |
| `404.html` | Not-found page. At `/demo/` it shows a holding message until the product tour is published there. |
| `assets/site.js` | The only script: WhatsApp links, mobile menu, product tabs, brand switcher |
| `assets/fonts/` | Self-hosted fonts (Archivo, Instrument Serif, Geist, IBM Plex Mono) with their OFL licences |
| `assets/screens/` | Original product screenshots |
| `assets/screens/web/` | Cropped, resized WebP versions used by the page |
| `assets/brand/` | Logo, symbol, social sharing image and brand tokens |
| `assets/fictional-brands/` | Marks of the fictional agencies used in the white-label demo |

## Set the WhatsApp number

Every "Request a demo" button opens WhatsApp with a prefilled message. Set the number once in `assets/site.js`:

```js
whatsapp: "201012345678",   // digits only, with the country code
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Moving to a custom domain

Links and assets are relative, so the pages work on any domain. Absolute URLs are only used where the standards require them. Update these when the domain changes:

- `index.html` and `privacy.html`: `canonical`, `og:url`, `og:image`, `twitter:image`
- `index.html`: the JSON-LD block
- `robots.txt` and `sitemap.xml`

Then add the domain under Settings → Pages (GitHub creates the `CNAME` file).
