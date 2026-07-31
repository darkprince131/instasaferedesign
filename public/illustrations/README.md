# Illustrations

Theme-aware illustration assets for the `.iz` design system. Illustrations arrive
two ways — **inlined SVG** (hand-recreated, recolors with the theme) and
**raster PNG pairs** (one file per theme). Both render through components in
`components/illustrations/`.

Everything here is served from `/illustrations/...` and consumed by:

- `components/illustrations/Illustration.tsx` — inlines an SVG (server component)
- `components/illustrations/ThemedImage.tsx` — swaps a PNG pair per theme (pure CSS)

---

## 1. SVG (hand-recreated, theme-aware)

Preferred format. The SVG is **inlined into the document** by `<Illustration>`, so
its CSS variables resolve against the live `.iz` theme and flip on the paper ⇄ dark
toggle with no JS.

### Filename

```
{img-id}_{slug}.svg
e.g.  img-026_two-floor-plans.svg
```

Layered variants (for staged reveals / animation) use `_L1`–`_L5` suffixes plus a
`_composite.svg` that stacks them:

```
img-026_two-floor-plans_L1.svg
img-026_two-floor-plans_L2.svg
...
img-026_two-floor-plans_composite.svg
```

### Rules for the root `<svg>`

- **No `width` / `height` attributes** — `viewBox` only, so the illustration scales
  to its container.
- **No hardcoded colors.** Use the tokens below for every stroke / fill / text.
- **Transparent background** — never paint a page-colored rect behind the art.
- Line work is mono-weight: `stroke-width="1.5"`, `fill="none"`, precise arcs and
  straight lines (patent-drawing feel). Subject centered within the inner ~80%.
- Exactly **one** orange focal element per illustration.

### Color tokens

These are defined inside the `.iz` scope in `components/home2/home2.css` and flip
with the theme automatically:

| Token             | Use                                            | Maps to (per theme)     |
| ----------------- | ---------------------------------------------- | ----------------------- |
| `var(--il-ink)`   | all line work                                  | `--tx` (text/ink)       |
| `var(--il-accent)`| THE one orange element                         | `--orange`              |
| `var(--il-chip)`  | monospace chip / ghost label text              | `--tx-mute`             |
| `var(--il-faint)` | grid / haze / hairline scaffolding             | `--line-strong`         |

Monospace text should also reference `var(--mono)` for its `font-family`.

### Usage

```tsx
import { Illustration } from "@/components/illustrations/Illustration";

<Illustration src="img-089_empty-state-ledger.svg" alt="An empty ledger awaiting its first event" />
```

`src` is just the filename inside this folder. The file is read from disk and cached
at build time; a missing file throws a clear error.

---

## 2. Raster PNG pairs (theme-swapped)

When an illustration can't be hand-recreated as SVG, export **two PNGs** — one per
theme — and let CSS show the right one.

### Filenames

```
{img-id}_{slug}_dark.png
{img-id}_{slug}_paper.png
e.g.  img-054_two-corridors_dark.png
      img-054_two-corridors_paper.png
```

- `_dark.png` — line work light, transparent background (sits on the dark canvas).
- `_paper.png` — line work dark, transparent background (sits on the warm off-white).
- Still one orange focal element; still transparent background.

### Usage

```tsx
import { ThemedImage } from "@/components/illustrations/ThemedImage";

<ThemedImage base="img-054_two-corridors" alt="Two corridors, one gated" />
```

`base` is the shared stem (no `_dark` / `_paper`, no extension). Both `<img>` tags
render; `.iz[data-theme="dark"] .il-paper` and `.iz[data-theme="paper"] .il-dark`
(in `home2.css`) hide the wrong one — no JS, no hydration flash.

---

## Sample

`img-089_empty-state-ledger.svg` is a reference implementation of the SVG path —
open it to see the token usage. It renders in the Component Lab under the
**Illustrations** section (`/components#illustrations`).
