# InstaSafe — Build Handoff (v6)

Supersedes the ZTNA-page portions of `HANDOFF.md` (v5). v5 still holds for
everything before component 00as. Read v5 first for repo/brand/consent/SEO
context, then this.

Memory index: `C:\Users\Darkprince131\.claude\projects\C--Instasafe-Webdesign\memory\MEMORY.md`

---

## ⚠️ READ FIRST — the mistake that cost this session

I verified pages with **DOM measurements only** (`getComputedStyle`,
`getBoundingClientRect`) and repeatedly declared work "verified" without
ever seeing it. The Claude Preview browser pane **does not composite
frames in this environment** — `computer{action:"screenshot"}` times out
every single time, and CSS transitions/animations/programmatic scroll do
not advance there either. So numbers looked right while the page was
visibly broken. The user's words: *"Everything on the page is broken. What
are you even running checks for."*

**The fix, use it from turn one:**

```
mcp__claude-in-chrome__*     ← REAL Chrome. Screenshots work. USE THIS.
mcp__Claude_Browser__*       ← preview pane. Measurement only. NO screenshots.
```

Chrome MCP is connected (`list_connected_browsers` → "Browser 1", Windows).
Flow: `navigate` → `computer{action:"screenshot"}` → scroll → screenshot.
Batch with `browser_batch`. Screenshots occasionally time out when the
renderer is busy — just retry the single screenshot call.

Use the preview pane only for things Chrome MCP can't do: `resize_window`
for responsive sweeps (measure, don't look).

**Rule: never say "verified" about anything visual you have not seen.**

---

## Where things stand

**Page shipped:** `/zero-trust-network-access` — full `.iz` rebuild, real
URL kept, metadata byte-identical (SEO-locked). v3 original archived at
`/v2/zero-trust-network-access` (noindex + canonical to the live page).

Route: `app/zero-trust-network-access/page.tsx` (thin, imports CSS)
Page body: `components/izpages/ztna/ZtnaPage.tsx`
Page scenes: `components/izpages/ztna/ZtnaScenes.tsx` + `ztna.css`

Section order (follows the storyboard sheet):
hero (tilted console) → trust bar → **IzSideNav** → stat ribbon →
plain answer → quiet band → problem cards → breach simulator →
7 mechanism sections → quick scan → ribbon → outcomes → FAQ →
question band → related rail → final CTA → footer.

---

## Components built this arc

All in `components/home2/` unless noted. All registered in the lab
(`/components`) except the ZTNA-only scenes.

| ID | Component | Notes |
|---|---|---|
| 00at | `IzSpecTable` | 4 variants: `ledger` · `checklist` · `versus` · `rail`. Rail = icon spine drawn on scroll. Carries the **shared ledger grammar** the other new blocks inherit. |
| 00au | `IzAnswerStrip` | Plain-answer block (~41 pages). Typed proof slots: `terminal`/`json`/`grant-deny`/`posture`. Sticky visual left, copy scrolls. Has `heading` prop — **every plain answer needs one**. |
| 00av | `IzQuestionBand` + `IzQuietBand` | Transition devices. QuietBand exported separately (~50 pages). |
| 00aw | `IzRelatedRail` | `cards` (thumbnails) + `clusters`. Thumbs: `/related/<slug>.webp`, 16:9. Falls back to drawn vector motifs by `kind`. |
| 00ax | `IzTrustBar` | Under-hero proof strip, RatingBar folded in. Replaces IzLogoGrid in that slot. |
| 00ay | `IzStatRibbon` | **Standing replacement for 00q FilterStream** in stat-strip/interstitial slots. 00am rail grammar. Don't re-decide this per page. |
| 00az | `IzProblemCards` | Panel lifted over a contrasting band, 3 icon columns. |
| 00ba | `IzTunnelCards` | Per-session tunnels on **00an's four-grid** — reuses `izug-*` classes from `sections.css`. |
| 00bb | `IzSideNav` | Right-edge orange blade, ticks + hover-expand labels. **Replaced the horizontal sub-nav** (that ate a band and clashed with the transparent nav). Reusable on every page. |
| — | `IzProParts` (`izpages/pro/`) | 00am split: `IzProRail`, `IzProCounter` exported so "the rail"/"the slider" name one file. |

**Props added to existing components** (all non-breaking, defaults preserve old behaviour):
- `FeatureSplit` → `features`, `eyebrow`, `title`, `lead`, `cta`
- `LiveActivity` → `headless`
- `DeviceBindingDemo` → `consoleOnly`
- `IzFinalCta` → `reveal`
- `IzOutcomes` → `tag` now optional
- `ChatFaq` → **"Show all answers"** toggle (component-level, all pages)

---

## Bugs found — do not reintroduce

1. **`translateY(-46%)` for a ring radius.** Percent resolves against the
   *element's own* height (38px), not the ring — all 8 tiles piled at the
   centre. **Radii must be px.**
2. **JSX attributes do not process `\uXXXX` escapes.** `body="… \u2014 …"`
   renders the literal text `\u2014`. Inside `{...}` braces it works. Use
   real characters.
3. **Class-name collision.** `IzAnswerStrip` squatted on `.izas-*`, already
   owned by `IzAgentScene` — broke that component. Grep the prefix before
   claiming one. (Answer strip is now `izans-`.)
4. **Content hidden behind an optional hook.** `IzFinalCta` used
   `.iz-reveal`, which only un-hides when `useSectionReveals()` runs. Not
   run → section permanently invisible. Adding the hook *still* failed
   (consoles change height, ScrollTrigger positions go stale). **Content
   must never depend on a hook to be visible.**
5. **Blanket reveal timers.** A 6s "failsafe" fired whether or not the
   visitor scrolled anywhere near — animations were over before you
   arrived. Use rAF + `getBoundingClientRect` polling, **no blanket timer**.
6. **Keyframe fill modes strand content.** `forwards` leaves rows at
   opacity 0 until the animation completes; `backwards` pins them hidden.
   For scroll reveals use **transitions** — the live value *is* the
   specified value, so a stalled/suppressed transition still resolves visible.
7. **`align-items: start` kills `position: sticky`.** It shrinks the column
   to its content, leaving zero travel. Must be `stretch`.
8. **`.iz a { color: inherit }` is (0,1,1)** and outranks a bare class.
   Link colour rules need `.parent a.child`.
9. **Two sticky bars at `top: 0`.** Nav is **66px**; anything else that
   pins must clear it.
10. **Components that ship their own header** (LiveActivity) stack two
    headers when a page writes its own. Check before composing.
11. **ConsoleRow is full-bleed** — no wrap. Constrain it per page
    (`.ztna-crow .cr-row { max-width: var(--wrap-max); … }`).
12. **My overflow detector over-reported.** Elements clipped inside an
    `overflow:hidden` ancestor are not page overflow. Filter by walking
    ancestors, and trust `scrollWidth === clientWidth`.

---

## Standing design rules (from user, apply to every page)

- **`--tx-mute` fails AA** (4.29:1 on `--bg`, 4.0 on `--bg-2`). Quiet text
  uses `--tx-dim`. Separation comes from mono + tracking + uppercase.
- **Brand orange is ~3.5:1 on paper** — it cannot carry small text. Accent
  the glyph (`>_`, `↓`), not the words. Active states use ink-on-tint.
- **Spacing steps: 1 2 3 4 5 6 8 10 12 only.** No `--sp-7/9/11` — an
  undefined `var()` computes the whole declaration to **0**, silently.
- Each mechanism is **its own section**, not a numbered part. No 01–07.
- Body copy at section width is `--fs-lead`, not `--fs-body-sm`.
- Hover animations: declare **inside `.is-live`**, never
  `animation-play-state: paused`. Every un-animated state must already be
  the finished state.
- Hover on a list: **always** `izpages/pro/useHoverIndex.ts`.
- No tiled hairline-grid wallpaper. Structure comes from real rules/cells.
- Placeholders are **drawn or text, never broken-image boxes**.
- Sticky visuals sit **centred** (`top: max(96px, calc(50vh - 210px))`),
  not pinned near the top.

---

## Design detector (impeccable hook)

`app/globals.css` is in `detector.ignoreFiles` — it's the dead v3 system,
pages are being rebuilt from scratch. Config: `.impeccable/config.json`.
Admin only via `node .claude/skills/impeccable/scripts/hook-admin.mjs`.

---

## Source of truth for content

- **Storyboards:** `~/Downloads/InstaSafe_Page_Storyboards.xlsx` — 55 sheets,
  one per page, reads top-to-bottom exactly as the page should. `[NEW]` marks
  unbuilt components.
- **Content Master:** `~/Downloads/InstaSafe_Content_Master_Vol1-4.md`
- **Map:** `InstaSafe_Page_Component_Map.xlsx` (repo root) — 55 pages ×
  real URL × build status × matching component.

---

## Still unbuilt (from the storyboards)

`IzWhereItLands` (11 pages) · `IzLogTape` (3) · `IzRegStrip` (1) ·
`IzSplitPlane` (signature, 1). Also: App Portal Simulator, Login Tracer,
Leak Sandbox, Device Tester (all "SIGNATURE" slots, none exist).

**Next page in line:** `/zero-trust-application-access` (ZTAA) — storyboard
read, sheet `platform-ztaa`, 24 elements. Reuses the whole kit; needs the
App Portal Simulator as its signature.

---

## Open items / user calls pending

- `IzTrustBar` — user said *"00ap IzLogoGrid is not good but keep it, we
  will change it later."* Revisit.
- `IzAppWindow`, `RatingBar` still take **no props** (hardcoded lab demos).
  Fine for now; parameterise when a second page needs them.
- App logos for the outcomes estate: drop files in **`public/apps/`** as
  `/apps/<slug>.svg` and set `logo` on the entry in `ZtnaScenes.tsx`.
  Currently text wordmarks.
- Repo still on **one commit**, everything uncommitted. Ask before committing.
