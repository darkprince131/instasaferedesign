# InstaSafe Website — Build Handoff (v5)

Read this first, then `MEMORY.md` index at
`C:\Users\Darkprince131\.claude\projects\C--Instasafe-Webdesign\memory\`.

**Supersedes v4.** v4 covered the fingerprint/firecrawl/hihobbes audit and components 00ac–00al. This session (still same day, 2026-07-26) added 00am–00ar — the full `/products/fingerprint-pro/` page recreation, two hover-animation sections, a tab-switch workhorse, two light blocks, a converge/events pair, and the sazabi outcomes skeleton. v4's content below is condensed, not dropped — read v4 in git history if full v3-era detail (SSO pilot, brand assets, consent, SEO) is needed.

---

## ⚠️ READ THIS FIRST — user flagged quality this session

End of session, user said plainly: **"results are not being in their best."** Not tied to one component — a pattern read after ~13 build rounds. See memory `feedback_quality_below_bar.md` for the full note. Short version: nearly every component this arc shipped with at least one real defect I only found via automated `getComputedStyle` checks, not by looking, and the user caught several more from screenshots after I'd called things done. The checks are good at catching wiring bugs; they say nothing about taste, spacing feel, or whether a composition actually resembles its reference. **Next session: slow down, do fewer components more carefully, get visual confirmation before declaring a round finished — don't treat a clean build + DOM assertions as equivalent to "looks right."**

---

## ⚠️ Repo state
- Git repo, `main`, remote `github.com/darkprince131/instasaferedesign`. **Still one commit** (`c87eb9d`). 74+ files uncommitted. No safety net — ask before any commit.
- Build: `npx tsc --noEmit -p tsconfig.json` then `npm run build` → **89 static pages**.
- Dev: Claude Preview `preview_start` name `dev`, not Bash.
- **The dev server died mid-session once** and `tsc` then failed against a corrupt generated `.next/dev/types/routes.d.ts` (server writing it while build read it) — not a code fault. Fix: stop the dev server, `rm -rf .next`, rebuild clean.
- **Preview pane limits, confirmed repeatedly:** no compositing — screenshots fail, `window.scrollTo` no-ops, CSS transition/animation clocks are **frozen** (never advance, never fire `transitionend`/`animationend`). Verify motion/hover/autoplay structurally — class applied, computed style at each state, dispatched synthetic `PointerEvent`s, or inject a `<style>` disabling `transition`/`animation` to read the end-state instantly. This structural-only verification is very likely *part of why* the quality flag above happened — it proves wiring, not appearance.

---

## Docs to read before touching component work

1. **`docs/research/fingerprint-audit-and-ideation.md`** — DOM audit of fingerprint.com/firecrawl.dev/hihobbes.com + 20 ideation specs (§C.1–C.20). Cite section numbers in code comments when building from it.
2. **`docs/research/build-checklist.md`** — master checklist, every brief line, status per item, **27 rounds** of follow-up as of this writing. Read the latest round first, then its open-questions section at the bottom before assuming what's next.

Both are living docs — append rounds, don't rewrite history.

---

## THE THREE-TIER COMPONENT LIBRARY (apply to everything)

1. **VISUALS** — live *inside* a section (consoles, mocks, chips, rails). `components/home2/Iz*.tsx` or `components/izpages/pro/Iz*.tsx`.
2. **SECTIONS** — assembled blocks a page drops in. Composes tier-1 + tier-3.
3. **BACKDROPS** — what a section *sits on*. `components/home2/iz-backdrops.css`.

Catalogue every new component in memory `project_built_components.md`, register in `ComponentsLab.tsx` + CSS import in `app/components/page.tsx`.

---

## Components built this session (00am–00ar) — full detail in memory `project_built_components.md`

All in `components/izpages/pro/`, registered at `/components#<id>`.

| id | Component | What it is |
|---|---|---|
| 00am | `IzProHero` + `IzProStack` + `IzProPanel` + `pro.config.tsx` | Full `/products/fingerprint-pro/` recreation. Hero = design-tool canvas conceit (selection rect, coordinate readout, proximity-lit cards), verified 0 img/svg/canvas/video, matching theirs. Stack = sticky scroll-stack, incoming slot has higher z-index and rises over outgoing (never leaves first) — `HOLD=0.55` constant added after finding slide 1 got zero dwell time otherwise. Mobile: stack **removed**, static list instead. All content is data in `pro.config.tsx` — one object per slide. |
| 00an | `IzUseCaseGrid` + `IzAgentCards` + `IzMocks` (5 mock sub-components) + `useHoverIndex.ts` | Hover-animation sections. Each mock has one specialty (resolution / escalation / repetition-that-never-resolves / progress-to-verdict / inspection). **Motion contract: animations declared INSIDE `.is-live`, never outside it paused** — so hover-out removes them and the next hover replays from zero instead of resuming stuck. `useHoverIndex.ts` exists because React's `onPointerEnter`/`onPointerLeave` don't bubble and got this wrong **four times** before being fixed once, centrally. |
| 00ao | `IzTabSwitch` | Copy+CTA left, 3 tabs, swapping panel right — fingerprint's use-case-page workhorse. Two variants (`console` permanently dark via `.iz-inverted`, `resource` theme-aware) are ONE component; which parts swap falls out of the data. ⚠️ **Resource variant has invented author names (Priya Menon, Arjun Rao, Evelyn Chea) that need replacing or reducing to role-only before ship** — flagged, not yet fixed. |
| 00ap | `IzLogoGrid` + `IzTestimonial` | Ecosystem lattice (coordinates-as-data, same engine as IzSignalGrid) + customer quote with the mark behind/clipped as texture. ⚠️ Both carry placeholder content (text wordmarks not artwork; quote attributed by role+org only, no invented name — the one placeholder rule followed correctly). |
| 00aq | `IzConverge` + `IzEventsHero` | Chip-marquee converging on the InstaSafe mark into a static SVG circuit (reuses FilterStream's exact marquee mechanism, all rows one direction). Events hero: calendar backdrop, card-then-grid-then-events entrance order (deliberately backwards from the obvious one). |
| 00ar | `IzOutcomes` | The sazabi.com section skeleton — glow headline, flowchart connector that **draws outward from centre** (verified `transform-origin` at exact midpoint), 3 non-card outcomes. `side` prop must alternate down a page. Reusable — visual is a slot. |

### Recurring bugs fixed this session — all now in memory as standing rules, check before writing new CSS/animation code
1. **React's `onPointerEnter`/`onPointerLeave` don't bubble** — always use native listeners (`useHoverIndex.ts` pattern), never React's synthesized versions.
2. **Hover animations must be declared INSIDE `.is-live`**, never `paused` outside it — or hover-out freezes the element instead of resetting it.
3. **The spacing scale has NO `--sp-7`, `--sp-9`, `--sp-11`** (valid: 1 2 3 4 5 6 8 10 12) — an invalid `var()` silently computes the whole declaration to `0`, not to an earlier fallback. Shipped as 5 components with zero padding before caught. Warning now lives at the token definition in `iz-system.css`.
4. **Dashed rails need `--rail-inset`** — `.iz-railed .iz-wrap` padding, fixed once centrally in `izgrid.css` after being patched per-component three times.
5. **Grid cells must be explicitly positioned**, never left to auto-flow around already-placed items — auto-placement pushed backing cells into implicit rows twice (IzLogoGrid 4→7 rows).
6. **IO-gated reveals need a ~2.5s failsafe timeout** — armed/pre-animation states are often invisible by design, so a missed observer must not leave content permanently broken.

---

## Illustrations — still deferred, PNG placeholders in use
Two hand-vectorized SVGs were deleted (user: "turned out bad"). Pipeline (`Illustration.tsx`/`ThemedImage.tsx`) intact, no assets wired. Hero demos borrow existing `.webp` diagrams as placeholders. **The 89-illustration catalogue is a separate, later job — don't start unasked.**

---

## Open items / next steps
1. **Read the quality flag above and change approach before building more components.**
2. Fix `IzTabSwitch` resource-variant invented author names (round 10 finding, unaddressed).
3. Continue closing `build-checklist.md` — check its open-questions section for what the user actually wants next; don't assume.
4. None of 00ac–00ar are wired into a real page yet — all live only in `/components` lab.
5. v3/v4 carryovers still open: SSO page sign-off, SEO fixes verification, Figma paused (don't resume unasked), one `[LEGAL REVIEW]` marker in consent center, 74+ uncommitted files.

---

## Session-standing rules (memory, all active)
Model split Fable/Opus-Sonnet, avoid generic-AI look, homepage plain language, WCAG-by-default, docs as `.docx`, illustrations user-supplied (catalogue deferred), interaction-placement doctrine, sitemap SEO-locked, product name "InstaSafe ZTNA" never "i365", three-tier component library, draw-in scoped to component artwork not the catalogue, `.iz-inverted` always-dark-for-now, **+ new: quality-below-bar flag — verify visually, not just structurally.**
