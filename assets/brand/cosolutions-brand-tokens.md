# Co.Solutions brand tokens (v1.0)

**Direction:** *Overlap × Ledger Teal.* The logo's dot is two overlapping squares, one for us and one for the agency. The overlap, where the solution happens, is the accent colour. The dot over the *i* in "Solutions" is a square in that same colour.

**Logo:** only the full-colour logo exists. There are no black, white or reversed versions. The logo always sits on a light ground (`surface` or `bg`). App icon, avatar and favicons are the colour symbol on `bg` (light).

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
| `accent-on-dark` | `#5FC4C9` | Accent on ink/dark backgrounds | on ink 8.1:1 |

There is no separate `positive` token: positive uses `accent`. Everything passes WCAG AA for normal text.

### Optional dark set
`bg #0F1A1D` · `surface #17262A` · `ink #E8EFEF` · `muted #9DB0B3` · `line #26383D` · `accent #5FC4C9` · `leak #F08A5D`. Checks: ink/bg 15.2, muted/surface 6.9, accent/surface 7.6, ink on accent 8.6, and leak/surface 6.3, all at or above AA. On dark, a button is `accent` with `#0F1A1D` text.

```css
:root{
  --bg:#F3F6F6; --surface:#FFFFFF; --ink:#132024; --muted:#5A6A6E; --line:#D9E1E2;
  --accent:#0B6970; --tint:#9BD5D2; --leak:#B4532A; --accent-on-dark:#5FC4C9;
}
```

## 2. Typography (all Google Fonts, OFL)

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

## 3. Rules

- **The dot:** in the logo, the dot is always the overlap mark and never a plain period. In running text, type "Co.Solutions" with a normal dot.
- **Overlap colour = i-dot colour:** both are always Ledger Teal `accent`.
- **Logo grounds:** `surface` or `bg` only. Never on tint, accent, ink or photos (give it a light panel instead).
- **Accent word:** use at most **one** word per headline, set in Instrument Serif Italic and coloured `accent`. Pick the word that carries the promise, e.g. "Is your agency *profitable?*"
- **Accent budget:** teal does one job per screen (main button, key word, mark). Everything else uses ink, muted and line, so the white-label client colours in the product stay the hero.
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

## 4. Colour names
Ink `#132024` · Ledger Teal `#0B6970` · Shallow Teal `#9BD5D2` · Mist `#F3F6F6` · Paper `#FFFFFF` · Slate `#5A6A6E` · Rule `#D9E1E2` · Leak `#B4532A` · Signal Teal `#5FC4C9` (accent word on Ink only).

## 5. Files in this repository

| Path | Contents |
|---|---|
| `assets/brand/cosolutions-logo-color.svg` | Full-colour wordmark (outlined, needs no font) |
| `assets/brand/cosolutions-symbol-color.svg` | Colour symbol |
| `assets/brand/cosolutions-og-1200x630.png` | Social sharing image |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon-180.png` | Favicons |
