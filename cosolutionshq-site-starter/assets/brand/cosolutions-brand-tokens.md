# Co.Solutions — brand tokens (v1.0, updated 12 Oct 2026)

Owner: Kerollos. Built in the identity chat from `claude/cosolutions-brand-brief.md`. This is the hand-off for the landing-page chat: build the site from this file.

**Locked direction:** *Overlap × Ledger Teal.* The logo's dot is two overlapping squares, one for us and one for the agency. The overlap, where the solution happens, is the accent colour. The dot over the *i* in "Solutions" is a square in that same colour.

Full reference: `Co.Solutions-Brand-Guidelines-v1.0.pdf` (38 pages) in the brand folder.

**Logo decision (12 Oct):** only the full-colour logo exists. No black, white or reversed versions. The logo always sits on a light ground (`surface` or `bg`). App icon, avatar and favicons are the colour symbol on `bg` (light).

## 1. Colour tokens (light, default)

| Token | HEX | Role | Contrast check |
|---|---|---|---|
| `bg` | `#F3F6F6` | Page background | ink on bg 15.3:1 |
| `surface` | `#FFFFFF` | Cards, panels, inputs | ink on surface 16.7:1 |
| `ink` | `#132024` | Text, logo, dark sections | — |
| `muted` | `#5A6A6E` | Secondary text, labels | on bg 5.2:1 · on surface 5.6:1 |
| `line` | `#D9E1E2` | Borders, dividers | non-text |
| `accent` | `#0B6970` | Primary button, links, headline key word, logo overlap | white on accent 6.4:1 · accent on bg 5.9:1 |
| `tint` | `#9BD5D2` | Second logo square, soft fills/highlights. **Never text.** | ink on tint 10.2:1 |
| `leak` | `#B4532A` | Warnings, negative numbers | on surface 5.0:1 · on bg 4.6:1 |
| `accent-on-dark` | `#5FC4C9` | Accent on ink/dark backgrounds, overlap in reversed logo | on ink 8.1:1 |

There is no separate `positive` token: positive uses `accent`. Everything passes WCAG AA for normal text.

### Optional dark set
`bg #0F1A1D` · `surface #17262A` · `ink #E8EFEF` · `muted #9DB0B3` · `line #26383D` · `accent #5FC4C9` · `leak #F08A5D`. Checks: ink/bg 15.2, muted/surface 6.9, accent/surface 7.6, ink on accent 8.6, and leak/surface 6.3, all at or above AA. On dark, a button is `accent` with `#0F1A1D` text.

```css
:root{
  --bg:#F3F6F6; --surface:#FFFFFF; --ink:#132024; --muted:#5A6A6E; --line:#D9E1E2;
  --accent:#0B6970; --tint:#9BD5D2; --leak:#B4532A; --accent-on-dark:#5FC4C9;
}
```

## 2. Typography (all Google Fonts, OFL; self-host)

| Use | Google Fonts name | Settings / weights |
|---|---|---|
| Display (headlines, logo) | **Archivo** | `font-stretch: 75%` (wdth 75), weight **800** |
| Accent word | **Instrument Serif** | Italic 400 |
| Body & UI | **Geist** | 400 / 500 / 600 |
| Figures, numbers, tables | **IBM Plex Mono** | 400 / 500 |
| Arabic (later) | **IBM Plex Sans Arabic** | 400 / 600 / 700 |

```
https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75,800&family=Instrument+Serif:ital@1&family=Geist:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap
```
(Arabic later: `family=IBM+Plex+Sans+Arabic:wght@400;600;700`)

## 3. Rules

- **The dot:** in the logo, the dot is always the overlap mark and never a plain period. In running text, type "Co.Solutions" with a normal dot. "HQ" never appears outside the domain.
- **Overlap colour = i-dot colour:** both are always Ledger Teal `accent`.
- **Logo grounds:** `surface` or `bg` only. Never on tint, accent, ink or photos (give it a light panel instead).
- **Accent word:** use at most **one** word per headline, set in Instrument Serif Italic and coloured `accent`. Pick the word that carries the promise, e.g. "Is your agency *profitable?*"
- **Accent budget:** teal does one job per screen (main button, key word, mark). Everything else uses ink, muted and line, so the white-label client colours in the product demo stay the hero.
- **Clear space:** keep one square of the mark (its height) clear on every side.
- **Minimum size:**
  - Wordmark: at least 96 px wide on screen, 25 mm in print.
  - Symbol: 24 px and up.
  - Below 24 px, use only the pixel-snapped favicon files.
- **Never:**
  - Don't recolour, rotate, separate or resize one square.
  - No gradients or shadows on the logo, and no busy photos behind it.
  - Never use `leak` as a brand colour.
  - Never write "CO Solutions", "Cosolutions" or "Co Solutions".
  - Never use any Crée font, colour or logo.

## 4. Colour names (used in the guidelines)
Ink `#132024` · Ledger Teal `#0B6970` · Shallow Teal `#9BD5D2` · Mist `#F3F6F6` · Paper `#FFFFFF` · Slate `#5A6A6E` · Rule `#D9E1E2` · Leak `#B4532A` · Signal Teal `#5FC4C9` (accent word on Ink only).

## 5. Files

Saved on the owner's computer at `C:\Users\HP\Documents\claude work\cree-erp\_COSOLUTIONS-BRAND\`. The wordmark is outlined from Archivo (wdth 75 / wght 800), so it needs no font to render.

| Folder | Contents |
|---|---|
| `Co.Solutions-Brand-Guidelines-v1.0.pdf` | The full brand guidelines |
| `logo/` | `cosolutions-logo-color.svg`, `@2x.png` (1200 px), `@4x.png` (2400 px) |
| `symbol/` | `cosolutions-symbol-color.svg`, `cosolutions-symbol-color-512.png` |
| `icons/` | `cosolutions-app-icon.svg` + `-512/-192.png`, `apple-touch-icon-180.png`, `cosolutions-avatar.svg` + `-1024.png`, `favicon-32.svg` (use as `favicon.svg`), `favicon-32.png`, `favicon-16.png` |
| `print/` | Business card front/back (85×55 mm, 3 mm bleed), A4 letterhead blank + sample (PDF) |
| `social/` | LinkedIn company cover 1128×191, founder banner 1584×396, post templates (question, number, carousel cover) 1080×1350, video-call background 1920×1080 |
| `slides/` | Title, section, content, closing masters 1920×1080 |
| `web/` | `cosolutions-og-1200x630.png`, `email-signature-for-gmail.html`, signature preview |
| `graphics/` | `cosolutions-pattern-ledger-grid.svg`, pillar icons (`icon-work-time`, `icon-clients-pipeline`, `icon-finance`, `icon-insights`) |
| `fonts/` | Archivo and Geist variable fonts + OFL licences |
| `_archive-v0/` | Yesterday's first exports, incl. retired black/white/reversed versions. Do not use. |

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml"> <!-- = icons/favicon-32.svg -->
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta property="og:image" content="/cosolutions-og-1200x630.png">
```

Out of scope for v1: brand book, patterns, illustration style, stationery, social templates.
