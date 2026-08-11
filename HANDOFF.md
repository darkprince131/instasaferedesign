# Session handoff — outcomes illustrations, laptop, access engine

Branch `outcomes-illustrations`, pushed to `origin` at commit `647f61e`. Everything
below is committed. Start a new chat by reading this file plus
`docs/three-outcomes-rule.md`.

---

## Review surfaces

All are `robots: noindex`. Run `npm run dev` and open:

| Route | What it shows |
| --- | --- |
| `/dev/outcomes` | Every artifact in the registry, both themes, all four highlight states |
| `/dev/answers` | The three answer-strip explainers, both themes |
| `/dev/laptop` | ExplodedLaptop, scroll-scrubbed |
| `/dev/engine` | IzAccessEngine (homepage capability deck), both themes |
| `/dev/three-outcomes` | The generic three-outcomes section |

Live pages that carry this session's work: `/vpn-alternative` (bespoke, whole page),
`/zero-trust-network-access` (AnswerZtna in the answer strip), `/` (IzAccessEngine).

---

## What shipped

### 1. Three-outcomes artifacts

`components/izoutcomes/artifacts/` — ten new artifacts, registered in `index.ts`:

`VpnAccessPlane`, `RemoteAccessPlane`, `VendorPass`, `ByodBoundary`,
`CloudAccessLayer`, `DevopsEnclosure`, `PrivilegedSessionRecord`, `VoipSession`,
`HybridStack`, `MigrationTimeline`.

Contract is exactly `{ highlightIndex: 0 | 1 | 2 | null }`. Nothing else crosses the
boundary.

Reveal is one-shot and never loops: phase one fades the items in under 560ms, phase
two draws the `z-dash-*` connectors on a `--seg` stagger, `animation-fill-mode:
forwards`.

Pages pass the artifact as a **component reference**, not a slug — see
`components/izpages/vpn/VpnPage.tsx:350`. The `ARTIFACTS` slug map in `index.ts`
exists so `/dev/outcomes` can enumerate them; it is not the wiring path.

### 2. Two glyph vocabularies — both are valid, don't unify them

- `DrawnGlyphs.tsx` — 29 hand-drawn marks on a 24×24 box. The wrapper divides
  `strokeWidth` by the scale factor so the 1.4 stroke survives any size. This is the
  house style for artifacts.
- `ArtIcon.tsx` — Phosphor icons nested as sub-SVGs with `fill: currentColor`. Sizes
  are `IC = { row: 18, tile: 24, node: 30, hero: 38 }`. **Only `CloudAccessLayer`
  uses this**, because that one artifact's icons were specifically called out.

The user's ruling, verbatim in effect: hand-drawn is kept deliberately because it
brings variety. Do not migrate the hand-drawn artifacts to Phosphor. This mistake was
already made once and reverted.

### 3. Answer-strip explainers

`components/izanswer/` — `AnswerZtna`, `AnswerIam`, `AnswerSso`, wrapped by
`IzAnswerArt` (intersection-observer reveal). `IzAnswerStrip` gained a slot variant:

```ts
| { kind: "art"; art: ComponentType }
```

These sit as the second visual on a page, right after the hero, so they carry more
weight than a normal illustration.

### 4. ExplodedLaptop

`components/iz-fx/` — `ExplodedLaptop.tsx`, `explodedlaptop.css`,
`laptop-geometry.ts`.

Geometry is **generated, not authored**. It was ported verbatim out of the approved
Python generator (`gen_laptop_new.py`, OPEN + mono variant) by
`scratchpad/port_laptop.py`. Do not hand-edit `laptop-geometry.ts` and do not
simplify any component — the user was explicit that the SVG is the approved visual
target and the generator is the source of truth for all geometry.

Scrubbing: one rAF scroll listener writes a single `--progress` custom property. Every
piece of choreography is CSS `calc()`/`clamp()` on transform and opacity only. No JS
per-element animation.

The hinge fold is a CSS trig matrix with an `@supports` fallback:

```css
.xl-screen .xl-screen-pivot {
  --pe: calc(var(--p) * (2 - var(--p)));
  --ang: calc(var(--pe) * 90deg);
  transform: translate(var(--stx), var(--sty))
    matrix(0.866, 0.42, calc(-0.866 * cos(var(--ang))),
           calc(0.42 * cos(var(--ang)) - sin(var(--ang))), 0, 0);
}
```

Each layer wraps in **two** nodes: an outer wrapper carrying the scrub `translateY`,
and an inner `<g>` carrying the generator's own matrix. Collapsing them makes the CSS
transform clobber the attribute matrix and the laptop falls apart.

### 5. IzAccessEngine (00c1)

`components/home2/IzAccessEngine.tsx` + `izaccessengine.css`. Replaces
CapabilitiesDeck on the homepage. Six controls across three columns
(`THE PROBLEM_` / `ACCESS ENGINE_` / `THE PROOF_`) over one shared engine core.
Horizontal nav on desktop, vertical on mobile, third column dropped on mobile.

The panel is keyed on `active.id` so switching remounts the subtree and the
`izae-rise` / `izae-fade` stagger replays. Remove the key and the animation only ever
plays once.

### 6. No vanity numbers — site-wide sweep

Binding rule, saved to memory as `feedback_no_vanity_numbers.md`. **Nowhere on the
site** may show customer counts, device counts, or pricing. Removed strings included
"72% of companies leaving the VPN", "500,000 devices protected", "150+ companies trust
us", "$2 per person, per month".

Stat bands now carry product facts instead: `25 device checks / 144 named policy
rules / 202 event types / 0 ports answering a scan`.

Files swept: `Home2.tsx`, `IzTrustBar`, `IzLogoMarquee`, `FeatureSplit`, `IzFinalCta`,
`IzFooterGrid`, `IzProofGrid`, `SplitShowcase`, `ScaffoldPage`, `SsoOrange`,
`sections/{Hero,FinalCTA,StatBar,ComparisonTable}`, `v2/{FinalV2,StatsV2}`,
`v3/{HeroV3,sso/SsoHero}`, `app/page.tsx` meta, both SSO page metas, `lib/site.ts`,
`lib/site-ia.ts`.

Verified clean by reading rendered HTML on `/`, `/about-us`, `/case-studies`,
`/instasafe-zero-trust-pricing`, `/zero-trust-network-access`, `/industries/banking`.

### 7. Blog

`/resources/blog` off the Ghost Content API — `lib/ghost.ts`,
`components/izblog/`. 330 posts, no custom excerpts in Ghost, `reading_time` requires
requesting `html`, canonical concedes to Ghost.

---

## Traps that cost time this session — read before debugging

**CSS specificity, hit five separate times.** Whenever you add a static or mobile
override, count the selector against the live rule it must beat. Cases that bit:

- `illustrations.css` hides every `.iz-art` and only `.izo.in` restores it, so answer
  artifacts rendered blank until `.izans-art.in .iz-art` (0,3,1) was added.
- All answer labels rendered at 18px because `.iz-art.iz-ans .a-text` (0,3,0) beat
  `.iz-ans .an-sm` (0,2,0).
- A blanket mobile animation kill at (0,3,0) lost to the live `.izans-art.in` at
  (0,4,0); the fix was a twin at matching specificity, not `!important`.
- `.izae-head` margin collapsed to 0 because the element also carries `.iz-wrap`
  whose `margin: 0 auto` is equal specificity and won on import order. Fixed with
  `.izae .izae-head`.
- `LogoMark` sets width/height inline, so resizing it genuinely needs `!important`.
  This one is not a mistake, it recurs.

**An undefined `var()` in a `fill` attribute renders BLACK.** `--xl-fill2` was
undefined and killed the entire paper theme. Define every custom property per theme.

**Label dropping must be a container query, not a media query.** Keying to viewport
stripped labels off a 690px-wide artifact on a narrow desktop. Use
`container-type: inline-size` on the artifact and `@container (max-width: 430px)`.

**Browser pane returns a flat black capture.** The DOM is fine —
`elementFromPoint` returns real content. The cause is stale viewport emulation after
the page height changes a lot (14k → 40k px). Fix: `resize_window {preset: "desktop"}`
to force a re-sync, then re-apply the custom size. Also, scrolling needs an
iterative correct-and-retry loop because reflow moves the target between the
measurement and the scroll.

**All `/dev/*` routes 404 while `/` serves fine** means a poisoned `.next` cache from
two dev servers colliding. `rm -rf .next` and restart.

**Mono advance for text-fit maths** is ≈ 0.69 × font-size for house artifacts and
≈ 0.92 × for the answer family. These differ; using the wrong one overflows plates.

---

## Artifact verification method

Run all four in the browser pane on every new artifact, before declaring it done:

1. Pairwise bounding-box overlap on every `<text>` node — must be zero.
2. Plate padding ≥ 4 user units on all sides.
3. Mark collision — no glyph bbox intersects another.
4. viewBox bounds — nothing renders outside.

Computed-style checks alone are not enough. Get a screenshot and look at it. This was
an explicit correction earlier in the project (`feedback_quality_below_bar.md`).

---

## Open items

- **Eight artifacts have no page yet.** `RemoteAccessPlane`, `VendorPass`,
  `ByodBoundary`, `CloudAccessLayer`, `DevopsEnclosure`, `PrivilegedSessionRecord`,
  `VoipSession`, `HybridStack` all exist and are reviewed at `/dev/outcomes`, but only
  `VpnAccessPlane` is wired into a real page. The bespoke pages
  (`/secure-remote-access`, `/third-party-access`, `/byod`,
  `/secure-cloud-applications`, and the devops/PAM/VoIP/hybrid equivalents) are
  the next build.
- **`AnswerIam` and `AnswerSso` are not live.** Their pages are still on the v3
  template and need migrating to `.iz` before the explainers can be dropped in.
  Only `AnswerZtna` is placed.
- **Duplicate VPN URL.** `lib/site-ia.ts:254` still registers
  `/solutions/vpn-alternative` while the bespoke build lives at `/vpn-alternative`
  (`lib/site.ts:188` carries a note about the promotion, `app/sitemap.ts:19` lists
  the bespoke path). Decide on a redirect or remove the stale entry.
- **ExplodedLaptop mobile.** Deferred at the user's instruction — "do not worry about
  mobile view currently". Labels will need a treatment at narrow widths.
- **Pricing page.** With pricing figures banned site-wide,
  `/instasafe-zero-trust-pricing` and its nav entry need a decision: repurpose or
  remove.

---

## Rules that bind future work

- `docs/three-outcomes-rule.md` — one artifact per section; it depicts the noun the
  three outcomes share; never repeat an artifact type inside a cluster. Seven of the
  twelve types carry no connecting lines, and those are preferred, because lines are
  what make every section read as the same flowchart.
- No customer counts, device counts, or pricing anywhere on the site.
- Everything comes from `iz-system.css` tokens — `--sp-*`, `--fs-*`, `--accent`,
  `--tx`, `--tx-dim`, `--tx-mute`, `--line`, `--surface`, `--allow`, `--deny`. No raw
  values.
- Heavy interactives at fold 2 or below, never in the hero. One signature interaction
  per page. Always a static fallback. Never a gate.
- Build to WCAG 2.2 AA by default. Note that `--tx-mute` fails AA on body text.
- The site must not read as AI-generated: Geist, relaxed tracking, generous spacing,
  light-first.
