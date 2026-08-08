# The three-outcomes rule

Every page ends with an outcomes strip. This is the rule for building them.
It is binding — if a page needs to break it, change this file first.

Source: `IzOutcomes_Spec_v3.md` (2026-08-08), plus the variation rule below.

**Superseded 2026-08-08 (later same day):** spec v3's separate ledger-style
shell is withdrawn. There is **ONE component** — `IzOutcomes`, lab 00ar, at
`components/izpages/pro/IzOutcomes.tsx` — with its glow heading, drawn
connector and left/right variant. Only the ILLUSTRATION changes per page.
Columns keep their icons (v3 removed them; the ZTNA reference has them).
**Always exactly three outcomes.** A reference image showing four means one
of them is the heading in disguise — usually the first. Fold it in, don't
add a column.

---

## 1 · The rule that matters most: vary the artifact

**Every reference we hold is a flowchart. Boxes joined by arrows.** If all
21 outcomes sections use that shape, the site reads as one diagram repeated
with different captions, and the reader stops looking at any of them.

Sazabi — the visual reference — never does this. Across four consecutive
sections it uses a scattered label constellation, concentric orbit rings, a
chat transcript, and floating chart panels. Same design language throughout:
same type, same accent, same dark plate, same hairline grammar. Completely
different *kinds of picture*.

So:

- **One artifact per section. ALWAYS.** Never build the per-column mini
  illustrations a reference shows next to each outcome — the columns carry an
  icon and nothing else. If a reference gives outcome 03 its own little log
  graphic, **fold that content into the main illustration** so the claim still
  has something to point at (that is exactly why the SSO artwork carries a
  session log). One picture per section, every time.
- **The artifact depicts the noun the three outcomes share.** Not the
  process, the noun. `/single-sign-on` shares "the list", so it gets a
  ledger. `/device-posture-check` shares "the machine", so it gets gauges.
- **Seven of the twelve artifact types have no connecting lines at all.
  Favour those.** Lines are what make a picture read as a flowchart.
- **Never repeat an artifact type within a cluster.** Repeats across
  clusters are fine, but flip the composition and change what it says —
  `/vpn-alternative` and `/third-party-access` both use the timeline, so one
  runs forward to a migration and the other runs to an expiry.
- **The side alternates** down a page (`side="left" | "right"`). Composition
  variety now comes from the illustration itself, not from four slot
  positions — the shell has one layout.

## 2 · The twelve artifact types

| ID | Artifact | Depicts | Lines? |
|---|---|---|---|
| T1 | Ledger plate | removal, revocation | no |
| T2 | Concentric rings | many inputs → one decision | yes |
| T3 | Action tiles | in-session control, DLP | no |
| T4 | Boundary plate | containment, blast radius | no |
| T5 | Label constellation | breadth, an estate, surfaces | faint |
| T6 | Matrix | entitlement, scope, coverage | no |
| T7 | Expiry timeline | time-bound access, migration | yes |
| T8 | Instrument cluster | measurement, posture, thresholds | no |
| T9 | Stamp / record | proof, attribution, audit | no |
| T10 | Cross-section | architecture, depth | yes |
| T11 | Terminal transcript | a decision happening | no |
| T12 | Wire map | geography, residency | no |

Per-page assignments live in `IzOutcomes_Spec_v3.md` §3.

## 3 · Anatomy

```
[ ILLUSTRATION ]        [ tag ]
                        [ GLOW HEADING ]        lines before `accentFrom`
                        [ sub ]                 render plain, the rest glow
         │
         └────┬─────────────┬─────────────┬──────────┐
            [ outcome ]      [ outcome ]      [ outcome ]
             icon+title+body, exactly three, NOT cards
```

Three things stay load-bearing in the shell:

1. **The outcomes are not cards.** No border, background or padding box —
   boxing them turns a conclusion into a feature grid.
2. **The connector is the argument.** A line drops out of the illustration,
   meets a rule, and that rule feeds the columns. It is drawn, centre-out,
   because that reads as distribution rather than a progress bar.
3. **The side alternates** down a page, or it becomes the same slab twice.

And the depth rule, added after the flat first pass: **shadow on paper,
shine on dark.** Plates carry soft drop-shadows in the paper theme; in dark,
the semantic colours glow and an accent bloom pools behind the illustration.
Connector dashes FLOW while the section is on screen — direction follows the
path's authored direction, so traffic reads request-in, verdict-out. All of
it dies under reduced motion and on mobile.

## 4 · Motion and interactivity

Desktop only. Mobile is static — final frame, everything lit, nothing hidden.

- **Phase 1 is written as an exclusion, not a list.** `path:not([class*="z-dash"])`
  plus `text, rect, circle, image, line, polyline`. The old explicit list went
  stale constantly — tick marks, X marks and the SSO tangle were all paths
  nobody had added, so they snapped in at full opacity while everything else
  faded. **And the static block must mirror those selectors exactly:**
  `:not(...)` lifts phase 1 to (0,2,1) and the `.izo.in` restore to (0,3,1),
  so a bare `.iz-art path` in the media query loses to both and hides every
  glyph on phones. That is the FOURTH specificity bite in this file family.
- **Assemble, then connect. ALWAYS.** Phase 1: every plate, label, logo and
  glyph fades in, finishing at 560ms — internal rules inside a plate belong to
  the item and draw with it. Phase 2: the first connector starts at 620ms and
  the rest follow on a 60ms stagger. The two phases used to overlap (items from
  220ms, wires from 340ms) so the picture assembled and wired itself
  simultaneously and read as noise.
- **The section connector leaves the illustration.** `.izo-drop` is positioned
  with the same track maths as the grid — `calc((100% - var(--izo-gap)) / 3)`
  for a left-side visual, mirrored for right. A hardcoded percentage goes stale
  the moment the column ratio changes; 26% was left over from the old 1.05fr
  split and no longer landed under the picture at all.
- **One-shot, then still.** `IntersectionObserver` fires once. Plates and
  labels fade in, then each connector segment appears **in authored order**
  and travels three dash periods as it lands — `--seg` on the path is the
  only thing controlling sequence. `forwards` holds the final frame.
  **Nothing loops.** An endlessly travelling dash is a screensaver: it pulls
  the eye back every few seconds and never resolves, so the reader never
  finishes the section. Columns then fade and rise, 120ms stagger.
- **Hover link.** Hovering an outcome column brightens the matching part of
  the artifact and drops the rest to 35%. `@media (hover:hover) and
  (pointer:fine)` only. Hover never *reveals* anything — the neutral state
  already shows everything, hover only emphasises.
- `prefers-reduced-motion: reduce` → final frame, no transition, no
  count-up, no dimming.

### The illustration is the bigger half

The heading names the argument; the illustration *is* it. So the visual takes
the larger track (`1.55fr` against `1fr`) and the heading runs at
`clamp(30px, 3.4vw, 48px)` — down from a 88px maximum that was both shouting
over the picture and squeezing it.

**The specificity trap in `outcomes.css` — it has bitten three times.**
`.izo--right .izo-top` is (0,2,0) and beats a bare `.izo-top` (0,1,0) *even
inside a media query*. Any responsive or reduced-motion reset must name BOTH
selectors or the right-side sections keep their desktop rule. It has cost:
dashes still animating on phones, wires invisible on phones, and the
illustration collapsing to 96px on a phone. Same shape each time.

**`side="right"` must mirror the template, not just the order.** `order`
moves the items but not the track sizes; without `.izo--right .izo-top {
grid-template-columns: 1fr 1.55fr }` a right-side section hands the
illustration the narrow column. That shipped once and made the IAM
illustration 429px wide against 690px on its left-side neighbour.

### Real logos, everywhere one exists

Standing instruction (2026-08-09): use a real mark wherever we hold one. The
earlier "no vendor logos in an outcomes artifact" line from spec v3 is
withdrawn — it only ever made sense for the abstract artifacts. Generic
"Cloud app" tiles are out; ZTNA, ZTAA and device posture all carry real marks
now.

### Where no logo exists

Use the marks in `/public/logos/integrations` — they carry the invert filter
for dark automatically. Where a reference names something we hold no mark for
("HR System", "Linux Server", "On-prem app"), swap the row for a real product
we do have rather than drawing a generic glyph. A directory diagram full of
anonymous boxes argues nothing. (The outcomes-artifact logo ban applies to
abstract artifacts like the ledger, not to a named-estate diagram.)

### Density beats completeness

A supplied reference will usually contain more than the slot can carry. The
illustration renders at roughly 0.77 scale, so every element you keep pushes
labels toward unreadable. Drop whatever repeats an argument already made
elsewhere in the picture — the IAM reference's "life cycle events" and "one
action, everywhere" panels were both second diagrams nested inside the first,
saying what the green and red app rows already said. Ten app rows became six
for the same reason: four granted and two revoked establishes both states.

### Geometry is checked, not eyeballed

Text collisions are invisible until they aren't. After moving anything, run
BOTH browser checks:

1. **Pairwise `getBBox` overlap** — labels colliding with each other.
2. **Plate containment** — every label measured against *the rect it sits on*,
   requiring ≥4 units of padding each side.
3. **Mark collision** — labels against `circle` and `image` elements: ticks,
   status dots and logos. Filter to marks ≤40 units wide and skip any mark
   that fully *contains* the text, or the check fires on every label legitimately
   sitting inside a container circle.
4. **Straddle** — text overlapping a plate whose bounds it is NOT centred in.
   The padding check only inspects the plate a label sits *on*, so a label
   drifting into its neighbour goes unseen; that is how "Access restricted"
   ran 5 units into the panel beside it. Filter plates to ≥40 units wide so
   glyph sub-rects don't register, and expect one intentional hit: the IAM
   strip tag straddles its panel edge by design.
5. **viewBox bounds.**

Checks 1, 2 and 4 all passed on MFA while five method labels were visibly
running into their own tick circles — a tick is a `circle`, not a `rect`, so
nothing was watching. Run all four.

The second one matters more and was added late. The viewBox check passed
clean while four illustrations were quietly breaking text out of their own
plates: ZTAA's status pills were hardcoded 92/128/104 wide and
"Authenticated" overran its own pill by 37 units; IAM's lifecycle straplines
overran their panel by 40 and 49. **Never hardcode a pill or tile width —
derive it from the label.** And measure the mono advance rather than
estimating it: it is ~9.7 units at 14px, not the 8.4 that was assumed, which
is what left "Internal apps" 2 units over its panel through two fix attempts.

Where a label still will not fit, **shorten the label rather than shrink the
type** — a label nobody can read is worse than one that drops a word. MFA lost
"Access", "App", "Notification" and "Passkey" this way, and the Google
Workspace tile became the **Google** mark for the same reason.

Watch the effective size, not the viewBox number: at viewBox 1020 in a 690px
slot, 14px type renders at 9.5px. Tighten the viewBox before shrinking type.

### The dash-draw trap

Artifacts scale **proportionally** (fixed viewBox, default
`preserveAspectRatio`), which is what makes `pathLength="1"` +
`stroke-dasharray: 1` work as a normalised draw.

**Do not add `vector-effect="non-scaling-stroke"` to an artifact.** It moves
dashing into rendered space, so `stroke-dasharray: 1` becomes literal 1px
dashes and every stroke renders as a dotted line. (This already shipped once,
in the consolidation diagram, before it was caught.) Stretched wire layers
that *need* non-scaling-stroke must reveal with a clip wipe instead.

## 5 · Contract

```tsx
<IzOutcomes
  side="left"                        // ALTERNATE down a page
  tag="ZTNA architecture"
  title={['Access,', 'not access', 'to everything.']}
  accentFrom={2}                     // earlier lines render plain
  sub="One sentence of context."
  artifact={ZtnaArchitecture}        // gets the hover link wired to it
  outcomes={[ { Icon, title, body }, ×3 ]}
/>
```

`visual={<Node />}` still works for sections whose picture takes no
highlight. Pass `artifact` OR `visual`, not both.

Artifacts are standalone SVG components taking `{ highlightIndex: 0|1|2|null }`
and nothing else. That single prop is the entire contract between shell and
artifact, which is why the visual layer can be replaced without touching copy.

Each artifact ships with its mobile behaviour before it counts as done. If it
carries more than 8 labels, the mobile variant drops to the 5 that matter and
keeps the accent element.

## 6 · Prohibitions

- No purple, no photographs, no real third-party logos in the artifact.
- 2–3 word headings, no exceptions.
- One sentence per outcome.
- The eyebrow never names the count.
- No icons heading the columns.

## 7 · Where things live

- `components/izpages/pro/IzOutcomes.tsx` — the one shell (lab 00ar).
- `components/izpages/pro/outcomes.css` — its layout.
- `components/izoutcomes/artifacts/` — the illustration library.
- `components/izoutcomes/illustrations.css` — the class vocabulary every
  illustration paints with, plus the draw-in and hover-link rules. A page
  hosting an illustration must import this alongside `outcomes.css`.
- `/dev/outcomes` — every illustration, both themes, sides alternating.

The earlier duplicate shell at `components/izoutcomes/IzOutcomes.tsx` has
been removed. There is one component.
