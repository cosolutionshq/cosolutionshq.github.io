# Design system and layout

The landing page is built on one set of tokens (`assets/tokens.css`) and one set of components (`assets/site.css`). Colours and typefaces come from `assets/brand/cosolutions-brand-tokens.md`.

## Audit of the previous design

| Complaint | What the old page did |
|---|---|
| No real UI design | Screenshots with black caption strips and dark floating callouts, on a visible grid-paper background, with nothing tying them together. |
| Crude spacing | Section padding, heading gaps and card gaps each set their own values. One section overrode its padding inline, and the Why section ran 1,551 px at 1440. |
| No type system | H2s changed size by section. "Can you answer these" was far larger than the other H2s. Serif accent word in every heading. |
| Questions broken | Five links jumped to a separate tab block lower on the page, so the same question appeared twice. |
| Weak responsiveness | Sticky bottom bar covered the content on phones. The comparison table and Gantt timeline were desktop layouts squeezed down. |
| Not professional | Seven nav items, a progress bar, square buttons, heavy dark blocks, three competing dark sections. |

## Tokens

### Layout

- Container 1200 px, text measure 720 px, gutters `clamp(20px, 5vw, 48px)`.
- Grid: 4 columns (gap 16), 8 from 768 (gap 20), 12 from 1024 (gap 24).
- Breakpoints, mobile first: 480, 768, 1024, 1280, 1536.

### Spacing

`--space-1` to `--space-10`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.

- Section padding `--section-y`: `clamp(64px, 9vw, 128px)` on every standard section. The final CTA adds 24 px on purpose.
- Heading block to content `--head-gap`: 32 px on phone, 48 px from 768.
- Heading to lead: 16 px.
- Card padding `--card-pad`: 24 px on phone, 32 px from 768.

### Type

All fluid between 360 and 1440 px.

| Token | Use | Size | Line height | Weight | Tracking |
|---|---|---|---|---|---|
| `--text-display` | Hero H1 only | 40 to 72 | 1.05 | Archivo Condensed 800 | -0.02em |
| `--text-h2` | Section titles | 30 to 48 | 1.1 | Archivo Condensed 800 | -0.015em |
| `--text-h3` | Item titles | 20 to 24 | 1.25 | Geist 600 | -0.01em |
| `--text-lead` | Subheads | 18 to 21 | 1.5 | Geist 400 | 0 |
| `--text-body` | Body | 16 to 17 | 1.6 | Geist 400 | 0 |
| `--text-small` | Captions, labels | 13 to 14 | 1.45 | Geist 500 | 0.01em |
| `--text-eyebrow` | Section kicker | 13 | 1.2 | IBM Plex Mono 500, uppercase | 0.08em |

The eyebrow stays at 13 px rather than 12, because nothing on the page goes below 13.

Rules: one H1. Every section title is an H2, left-aligned, in the order eyebrow, H2, lead. Only the hero and final CTA are centred. Item titles are H3. The serif accent word appears three times: "profitable?" in the hero, "brand." and "numbers." in section titles.

### Colour

Semantic tokens: `--bg`, `--surface`, `--surface-raised`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-contrast`, `--focus`. Inside `.on-dark` the same names map to the brand's dark set, so components need no dark variants.

Section tones: Mist and white alternate. Ink appears twice, on the idea diagram and the final CTA. The logo appears only on light grounds, so the footer is white.

### Radius, elevation, motion

- Radius: 8 (buttons, controls), 12 (cards), 20 (screenshot frames).
- Shadows: `--shadow-1` for cards, `--shadow-2` for frames. Both tinted with ink.
- Motion: 180 ms for hover and the brand crossfade, 260 ms for accordions, 300 ms for the first-scroll reveal. All off under `prefers-reduced-motion`.

## Components

| Component | Notes |
|---|---|
| Button | Primary, secondary, and `.link-arrow` for tertiary. 52 px on phone, 48 px from 768. Radius 8. |
| Screenshot frame | `.frame`: three-dot bar, image, "Sample data · fictional agency" caption inside the bottom edge. |
| Card | `.card`: icon, H3, body. |
| Accordion | `.acc`: button inside an H3, `aria-expanded`, `aria-controls`, panel with `role="region"`. Height animates with `grid-template-rows`. **One item open per group**, questions and FAQ alike. First question open by default; all FAQ items closed. Without JavaScript all panels are open. |
| Chip | `.chip`: week labels in the timeline. |
| Section header | `.section-head`: eyebrow, H2, lead. |
| Segmented control | `.seg`: `role="radiogroup"`, arrow keys, roving tabindex. |

Icons are one 24 px stroke set with square caps, in the sprite at the bottom of `index.html`. The WhatsApp glyph is the one filled icon.

## Layout by section

| Section | Desktop (1024+) | Tablet (768 to 1023) | Phone (under 768) |
|---|---|---|---|
| Header | Logo, four links, Request a demo. 64 px. Solid with hairline and blur after 8 px of scroll. | Same | Logo, compact Demo button, menu. 56 px. Modal sheet with focus trap, Escape, tap outside and scroll lock. |
| Hero | Centred text over a full-width Pulse frame, with one card overlapping its top right. The frame starts above the fold at 1440×900. | Same | Text and buttons first, then the phone screenshot with the card below it. |
| Questions | Accordion. Open item: text 5/12, screenshot 7/12. | Text, then screenshot, full width | Same, with the phone screenshots |
| Idea | Four tiles joined by connectors to one database bar on the dark band. | Same | Tiles 2×2, one connector to the bar |
| White label | Control and benefits 5/12. Dashboard frame with sign-in frame overlapping, 7/12. | Stacked | Stacked, two frames |
| Why | Cards 2×2, Not locked in strip, comparison table with the Co.Solutions column highlighted. | Same | One column; the table becomes stacked rows with labels |
| Security | Four across | 2×2 | One column |
| How it works | Horizontal timeline of five steps, operations pack strip, terms box | Vertical timeline | Vertical timeline |
| FAQ | Heading and Ask on WhatsApp in the left column, list on the right | Heading, list, ask | Heading, list, ask |
| Final CTA | Centred on the dark band, three call steps in a row | Same | Steps stacked |
| Footer | Logo and line on the left, links on the right, copyright below | Same | Stacked |

## Decisions

- **Hero layout: stacked and centred.** Two columns would limit the screenshot to about 690 px. Stacked gives it the full 1200 px, and the headline stays on two lines.
- **One persistent phone CTA: the header.** It is always on screen. The old bottom bar covered content and repeated the same action.
- **Panel screenshots are tighter crops.** The full-width shots would be too small to read at 7/12 width, so `*-panel-*.webp` show about 800 px of the screen at close to full size. The tour shows the rest.
