# Fingerprint / Firecrawl / Hobbes — responsive audit + ideation spec

Written 2026-07-25. Every claim in Part A was verified by live DOM + computed-style probes at
**1440×900 (desktop)** and **390×844 (mobile)**, not by eyeballing. Class names quoted are the real
ones from their build, so they can be re-checked.

Screenshots were unavailable this session (Browser pane not compositing — known quirk, see HANDOFF).
All findings come from DOM/computed-style probes, which is the stronger evidence for "what is hidden
on mobile" anyway.

---

## Part A — What actually happens desktop vs mobile

### A.0 The one doctrine behind all of it: **twin components, not responsive components**

This is the single most important finding, and it is the answer to *"nothing breaks, heavy animation
is hidden on mobile, and the context is not hurt at all."*

Fingerprint almost never makes one component reflow. They ship **two sibling DOM subtrees** and
`display:none` one of them at a breakpoint:

| Desktop node | Mobile node | Page |
|---|---|---|
| `AccuracyChart--chart` (hover-scrub line chart) | `AccuracyChart--mobileChartContainer` | home |
| `UseCasesSection--showcaseSection` (live console) | *(nothing — accordion text only)* | home |
| `IncludedSection--cards` (hover reveal) | `IncludedSection--mobileContainer` (all states open) | identification |
| `ForDevelopersSection--integrationsContainer` | `--integrationsContainerMobile` | use-case pages |
| `ForDevelopersSection--codeSectionContainer` | `--cardsMobile` | use-case pages |
| `Grid--grid` (4-up blog grid) | `Posts--swiperSection` (swiper) | smart-signals, bot-detection |
| `PlatformSlider` (scroll-pinned stack) | `PlatformSlider--mobileList` (4 static cards) | fingerprint-pro |
| `DiagramSection--tabs` | `DiagramSection--mobileTabs` | identification |
| `HeroSection--demoLeftDecorator`, `--accuracyDisclaimer` | *(hidden, no replacement)* | home |

**Cost:** duplicated markup and duplicated content strings. **Benefit:** the mobile build is never a
squeezed desktop build, and neither variant constrains the other. This is why nothing breaks.

**Recommendation for us:** adopt it, but only for the ~8 heavy components. Encode it once as a
convention so it doesn't sprawl:

```tsx
// components/iz-fx/Twin.tsx
<Twin
  desktop={<ZeroTrustFlow />}          // heavy, hover/scrub/canvas
  mobile={<ZeroTrustFlowStatic />}     // end-state, all labels permanent
  at={900}                             // px; CSS-driven, both SSR'd, no JS flash
/>
```
CSS-only switching (`display:none`) — **not** `matchMedia` in JS, or the wrong one paints first.
Only the desktop twin gets the animation code; lazy-import it so mobile never downloads it.

---

### A.1 `/` (homepage)

Desktop doc height 6402px, mobile far taller.

| Section (their class) | Desktop | Mobile | Note |
|---|---|---|---|
| `HeroSection--demoSectionWrapper` | 632px, text + live "YOUR RECENT VISITS" demo + side decorators | 755px, text + demo, **decorators and accuracy disclaimer removed** | hero demo survives on mobile — it's DOM, not canvas |
| `UseCasesSection` | 382px: accordion (left) **+ `showcaseSection` console (right)** | 727px: **accordion only, console `display:none`** | ⬅ this is the "account takeover / payment fraud have visuals, mobile only gets the text cards" you spotted. Correct. |
| `WhyFingerprintSection` ("most accurate visitor identifier") | 542px, `AccuracyChart--chart` interactive | 1137px, chart hidden → `mobileChartContainer` | ⬅ and this is the "hover info shown permanently on mobile". Correct — it's a **different chart component**, pre-revealed. |
| `BotDetectionFullSection` | 443px scene | **420px scene — present, not removed** | ⚠️ see correction below |
| `SmartSignalsFullSection` | 771px, 10×7 grid | **639px, reflowed grid — present, not removed** | ⚠️ see correction below |
| `CustomerStories` | swiper | swiper | same both |
| `ForDevelopersSection` | 655px | 759px + `mobileLastSpace` spacer | sparkline SVG kept |

**⚠️ Correction to one assumption:** *"Bot & AI agent detection" and "Smart Signals" are absent in
mobile* — they are **not** absent. Both render on mobile in a reduced arrangement. What makes them
look absent is that the desktop version is a wide 10-column scatter and the mobile version collapses
to a dense 4-ish column block with fewer visible tiles at a time. Worth knowing, because their actual
technique is better than hiding, and we can steal it directly (next section).

---

### A.2 The Smart Signals grid — the single best thing on the site to clone

`SmartSignalsFullScene--grid`, verified computed style:

```
display: grid
grid-template-columns: repeat(10, 116.6px)
grid-template-rows: repeat(7, 102px)
gap: 8px
children: 52  →  1 content block + 26 signal buttons + 25 empty placeholders
```

- The **left copy block is a grid item**: `grid-area: 2 / 1 / 7 / 6` — it occupies rows 2–6, cols 1–5.
  It is *inside* the same grid, which is why the tiles feel like they're spilling around the text
  rather than sitting in a separate column.
- Each signal is a `<button>` with **its coordinates as inline CSS custom properties**:
  ```html
  <button aria-pressed="true" aria-label="AI Agent"
     style="--gc:6;  --gr:3;      /* small/medium breakpoint */
            --gc-lg:7;--gr-lg:3;  /* large breakpoint */
            --sm-col-start:1;--sm-row-start:3;--sm-col-span:2;--sm-row-span:1;
            opacity:0; transform:scale(0.85)">
  ```
  So the *same DOM* is re-scattered per breakpoint by CSS reading the vars. **No JS, no duplicate
  markup, no media-query soup.** This is how they get an irregular layout that stays irregular (and
  stays deliberate) on every screen.
- **25 empty `placeholder` tiles** are real DOM elements with `placeholderLg` / `placeholderMd`
  modifiers, placed at hand-picked cells (`1/1`, `1/7`, `2/8`, `3/9`, `4/6`, `6/9`, `7/10`…). They
  are what breaks the symmetry. They're not gaps — they're drawn, faint, and they make the populated
  tiles read as "a system with room in it."
- Entrance is JS-driven inline `opacity/transform` (0 → 1, `scale(.85)` → 1), staggered.
- 26 signals: Incognito, Developer tools, Privacy settings, Bot, High activity, Tampering,
  Geolocation, VPN, AI Agent, Proxy, Residential proxy, Location spoofing, Emulator, Jailbroken,
  Cloned app, Remote control, VM, Rooted app, Emulator farm, IP blocklist, MitM, Frida, Raw Device
  Attributes, Suspect Score, Velocity Signals, Tor.

**The console half** (`browser-module--*`), which is the "each one has its own dedicated console
information with 2 options":

```
browser--root.inline
├─ header
│   ├─ headerIcon + headerName "AI Agent Detection" + headerType badge "object"
│   └─ headerActions: "Get API key" CTA + paginationButton ◀ ▶ ("Previous/Next signal")
└─ body
    ├─ variantToggle:  [ Signed | Spoofed ]   ← sliding pill, style="--active-index:0"
    └─ crossfade: typed field list (bot enum / bot_type string / bot_info object)
                  + JSON payload
```

That two-state toggle (`Signed / Spoofed`, i.e. **detected / not detected**) is the whole trick: one
capability, two truths, side by side, in the product's own output format. It makes a marketing grid
read as documentation.

---

### A.3 `/products/identification/` — the before/after

`DiagramSection`: two tab buttons `Before Pro` / `After Pro`, rendered **twice** (`--tabs` for
desktop, `--mobileTabs` for mobile). The diagram itself is *not* an SVG scene — it's a `--diagram`
div that gains/loses the class `--afterBackground`, with absolutely-positioned `<span>`s over it
(`--visitor`, `--visitorId`, `--trusted`, `--suspicious`, `--incomingFlow`, `--fingerService`).
2 SVGs total, 0 images, 0 video, 0 canvas.

**Why that matters to us:** our WithWithout can gain a second variant *without* a new animation
engine — swap a background layer + reposition labels. Cheap, robust, and it degrades to a static
image if JS dies.

Also on that page: `IncludedSection--cards` (hover) → `--mobileContainer` (permanent) — same twin
pattern.

---

### A.4 `/products/smart-signals/` — the autoplay section (works on both)

`AnimationSection`, 653px desktop / 1035px mobile, **visible on both**. Verified media count:
`svg:3, canvas:0, video:0, img:0, lottie:0` → **pure DOM + CSS**.

```
animationPanel
├─ tabsRow.tabsRowDesktop   (2×2 grid of step tabs)      ← desktop only
│   └─ stepTab[.stepTabActive]
│       ├─ stepTabLabel  "UPLOAD LABELED FRAUD DATA"
│       └─ progressTrack > progressFill   ← the fill IS the timer
├─ tabsRow.tabsRowMobile   (single column, "01 — upload labeled fraud data")
└─ animationArea > animationSlide > stepInner   ← cross-faded DOM slides
```

4 steps: upload labeled fraud data → ML training runs automatically → preview optimized weights →
apply with one click.

We already have this exact timer mechanism in **ScrollSteps (00o)** (`animation … forwards` on a fill
bar + `onAnimationEnd` → advance). What's new here is the **2×2 tab layout on desktop collapsing to
1-col on mobile, with the tab row doubling as the progress indicator**. That's a small, high-value
upgrade to our component.

Also on this page: blog `Grid--grid` (desktop) ↔ `Posts--swiperSection` (mobile).

---

### A.5 `/products/bot-detection/` — the text-only hero variant

`HeroSection--descriptionSection` is **300px, flex, no `animationSection` at all**. Compare:

| Page | Hero shape |
|---|---|
| `/` | text + live demo console + decorators, 632px |
| `/products/identification/` | text 454px **+ `HeroSection--animationSection` 454px** (side-by-side) |
| `/products/smart-signals/` | text 499px **+ `animationSection` 591px** (side-by-side, visual leads on mobile) |
| `/products/bot-detection/` | **text only, 300px, centered** — no visual |
| `/ai-agent-detection/` | text 350px **+ `monitorGridContainer` 386px console below** + `decorFrame` |
| use-case pages | `ctaSectionGridContainer` 401px, text-left / visual-right |

That's **five distinct hero archetypes**, which is exactly the "every page doesn't feel the same with
content changed" effect. This is the strongest structural lesson on the whole site and it costs us
almost nothing to copy.

`WebBotAuthTeaser--hero` (514px) is a section whose entire job is to hand off to a separate
interactive at `/web-bot-auth/test/`. Not a modal, not an embed — a real URL. Matches our own
interaction-placement doctrine ("promotion, not relocation").

---

### A.6 `/ai-agent-detection/` — three cards, one shell, three different animations

`BenefitsSection--cardsRow`, verified: `img:0, video:0, lottie:0` — every mockup is **DOM**.

All three share the shell `cardWrapper > card > cardHeader > cardTitle > mockupWrapper`, then diverge:

| Card | Inner DOM | Behaviour |
|---|---|---|
| "Stop impersonation and AI-powered fraud" | `loginCard > loginTitle / loginField / loginPasswordField > loginPasswordDots / loginPasswordX / loginButton` + `claudeBotBadge` + `fraudCursorOverlay` | a fake cursor keeps clicking Sign In |
| "Verify AI Agents with confidence" | `agentCard > authMockupIdle > progressTrack > progressFill`, `agentBadgeWrapper`, `agentInfo > agentName / agentSub`, `verifiedRow` | loads a progress bar → "ChatGPT Agent · Signed · Verified" |
| "Distinguish trusted agents from malicious bots" | `browserFrame > browserBar > browserDots ×3 / urlBar > favicon + urlText`, `cartBody` | analyses `acme.com/cart`, surfaces ClaudeBot |

**Same chrome, different inner theatre.** That is the whole reason it reads as a designed family
rather than three unrelated widgets. Static on mobile.

`UseCasesSection` — hover a use case, the Smart-Signal tags above it jump/highlight (Developer tools,
AI Agent detection, Anti-detect browsers, Residential proxy detection, VM detection, High Activity
Device). On mobile the tags render as a plain organised list.

---

### A.7 `/products/fingerprint-pro/` — the scroll-replace stack

Verified: document 12925px tall.

```
PlatformSlider--stickyWrapper   position:sticky; top:0; height:900px
  parent height: 10620px        → ~2650px of scroll per step × 4 steps
├─ leftCol > leftContent
│    stepLabel: stepNum "01/04" + stepName "INSTALLATION"
│    headline
│    installRow > commandPill ("npm install @fingerprint/agent") + copyBtn
└─ centerCol > cardStack
     cardSlot.cardSlotFront > cardWrap > (mac-ish window)
        tabBar > tabLabel.placeholder / tabLabel.typed + cursor   ← typewriter
        content > fileTabs > fileTabRow > fileTab.fileTabActive
```

`PlatformSlider--mobileList` holds 4 `mobileCard`s, `display:none` on desktop, and is the entire
mobile experience — no pinning, no scrubbing.

The `ActionSection` below it uses **CSS `subgrid`** (`grid-template-columns: subgrid`) to keep
headerSide / headerCenter / headerSideRight aligned to the page grid. Its hover cards are
"USE CASE 1. REDUCED FRICTION" / "USE CASE 2. INCREASED AUTHENTICATION" — each a small product mockup
(login screen, OTP screen) that animates on hover.

---

### A.8 Use-case pages — one template, three instances

`/account-takeover/`, `/payment-fraud/`, `/new-account-fraud-prevention/` are the same skeleton:

```
HeroSection (text-left / visual-right, 401px)
ClientsSection (logo strip, "TRUSTED BY TOP BRANDS TO PREVENT ATO ATTACKS")
UseCasesSection — 4 equal cards (192px)
AccuracySection — 1 big perk card + 2 small perk cards (asymmetric, 389px)
SmartSignalsSection — titleWrapper + swiperWrapper      ← shared component #1
CustomerStories — mainBox + infoBoxContainer            ← shared component #2
ForDevelopersSection — code window + integrations (+ mobile twins)
IdentifySection — $1B / 7B / 80M stat bar
```

**Shared component #1 — "Smart Signals for X"**: a swiper of signal cards, title is the only thing
that changes per page.

**Shared component #2 — "Learn more about X"** (`CustomerStories`): this is the *sub-navigation with
visuals*. Structure:
`mainBox > mainBoxHeader / mainBoxContent / logoMobile / learnTool / storyHeader / companySolution /
learnMoreLink` plus `infoBoxContainer > infoBox > card > quote > authorInfo`, and a logo rail where
the selected company carries `module--company1 module--selected`. Click a customer logo → the story
+ quote + author swap.

---

### A.9 `/products/account-sharing-prevention/` — the flowing chips

`DiagramSection--diagram > signals > marquee > signalRowContainer > signalRow > signalRowElement >
signal ×3` — repeated. `signalRowElement` is duplicated per row for the seamless loop. Chips carry
raw device attributes (`userAgent: …`, `language: en-US`, `hardwareConcurrency: 8`).

**We already own this**: FilterStream (00q) is the same mechanism. What we don't have is their
*destination* — the chips flow **into** a fixed object. Same idea as the SMS-fraud phone below.

---

### A.10 `/about-us/` — the timeline

This page is **Tailwind**, not CSS modules — Fingerprint is mid-migration; newer pages are Tailwind
(`bg-[#141415]`, `min-[641px]:py-24`), older ones are Gatsby CSS modules. Useful signal: they didn't
rebuild the site to change stacks, they changed stacks page by page.

Backstory section (dark `#141415`, 1004px):
- `<ol>` is **1956px tall inside a 574px window**, clipped by
  `[mask-image:linear-gradient(to_bottom, …)]` → fades at both ends, no hard edge.
- Each `<li>` is a **1px-wide vertical rule of variable height** (`h-16`, `h-24`, `h-[362px]`) —
  the *spacing between events is the data*. Long gaps = quiet years.
- Milestones are `position:absolute` labels at `left-[54px]`, plus a **293px curved SVG `<path>`**
  branching off the spine for the bigger moments.
- Left column copy is `absolute` at `min-[1025px]` and static below → desktop = copy pinned beside a
  moving timeline; mobile = copy above, timeline below.

---

### A.11 Firecrawl `/crawl`

Document 11543px. **13 `<canvas>` elements**, 0 video, 0 Lottie, 3 SMIL-animated SVGs.

The canvases are `absolute … pointer-events-none`, sized to their section
(`1109×520`, `1112×556`, `696×240`, `422×480`), sitting **behind** content. So the "subtle fire"
is a per-section particle/ember canvas field, not a video and not a GIF. Two are `20×20` — tiny
inline canvases inside icons.

Footer is **1642px tall** with its own canvas. That's a deliberately huge footer that acts as a
site map + brand closer, which is what makes their grid theme feel structural rather than decorative.

---

### A.12 hihobbes.com/solutions/outbound

Framer site. Document 7480px. **0 canvas, 0 video, 0 headings in the DOM** (text is baked into
images or rendered as divs). Everything is PNG:
`1425×900`, `1425×905`, `880×698`, then a row of `596×410` cards, plus a `598×586`.

So the "scrolling into a world" feeling is: **one enormous, well-art-directed image + scroll-linked
transform**. There is no 3D, no canvas, no video. This is extremely good news — see §C.20.

---

## Part B — Pattern inventory: what we already have vs what's new

| Fingerprint pattern | Our equivalent | Gap |
|---|---|---|
| Marquee chip rows | FilterStream `00q` | needs a *destination* (flow into a device/logo) |
| Autoplay steps w/ progress-fill timer | ScrollSteps `00o` | add 2×2 desktop tab row → 1-col mobile |
| Tab-swap feature showcase | FeatureHub `00g` | their single visual is far richer per tab |
| Clickable list → screen swap | FeatureSplit `00w` | already modelled on their "For Developers" |
| Console window chrome | IzConsole `00d` | add: header type badge, prev/next pager, 2-state variant toggle |
| Hover-scrub line chart | ImpactGraph `00t` | add cursor-driven "advance" + mobile static-at-max twin |
| Before/after toggle | WithWithout `00j` | add variant system (§C.5) |
| Irregular capability grid | **none** | build it — §C.1 |
| Scroll-pinned card stack | **none** | build it — §C.12 |
| Draw-on outline animation | **none** | build it — §C.2 |
| Masked scrolling timeline | **none** | build it — §C.15 |
| Persistent brand widget | **none** | build it — §C.4 |
| Background particle canvas | **none** | build it — §C.18 |
| Hero archetype library | **none** | build it — §C.7 |

---

## Part C — Ideation

### C.1 `IzSignalGrid` — the capability scatter (highest priority)

**Concept: "Every control, in one surface."** InstaSafe's problem is the mirror of theirs — they sell
*detection signals*, we sell *controls*. Same shape, opposite polarity: instead of
`detected / not detected`, ours is **`allowed / blocked`** or **`enforced / unenforced`**.

Layout: 10×7 grid, 8px gap, copy block occupying `grid-area: 2 / 1 / 7 / 6`. ~24 control tiles +
~22 drawn-empty placeholder tiles at hand-picked cells. Coordinates via CSS custom properties
(`--gc/--gr`, `--gc-md/--gr-md`, `--sm-col-start/--sm-row-start/--sm-col-span`) so one DOM
re-scatters at every breakpoint — no twin needed for this one.

Tiles (drawn from our existing product surface):
`Device posture` · `MFA` · `SSO` · `Device binding` · `Geo-fence` · `Time-of-day` ·
`Impossible travel` · `Jailbreak / root` · `Screen recording` · `Clipboard` · `Download block` ·
`Watermark` · `Session recording` · `Idle timeout` · `Split tunnel` · `DNS filtering` ·
`App-level allow-list` · `Just-in-time access` · `Approval workflow` · `Session termination` ·
`Anomaly score` · `Audit export` · `Agentless browser access` · `Always-on`

Console half (reuse + extend `IzConsole` 00d):

```
IzConsole.inline
├─ header:  [icon] Device Posture  ⟨object⟩          [ Book a demo ]  [◀ ▶]
└─ body
   ├─ variantToggle:   [ Compliant | Non-compliant ]     ← the 2-state, sliding pill
   └─ crossfade
       ├─ field list:  posture enum · reason string · device object
       └─ payload:
          {
            "decision": "allow",
            "posture":  "compliant",
            "device":   { "os":"Windows 11", "disk_encryption":"on",
                          "edr":"present", "screen_lock":"5m" },
            "policy":   "IN-Finance-BYOD"
          }
```

Flip to *Non-compliant* → `"decision":"deny"`, `"disk_encryption":"off"`, `"remediation":"…"`.
Same payload shape, one field changed. That contrast is the entire persuasive payload and it costs
one JSON object per tile.

**Placement:** fold 2+ on `/platform` or a new `/controls`. One signature per page (doctrine rule 4).
Static fallback: all tiles rendered, first tile pre-selected, console shows its `allow` state — works
with JS off.

**Why the empty tiles matter:** they are the difference between "a feature grid" and "a control
surface with headroom". Draw them at ~6% accent opacity with our `.iz-cross` plus-markers at their
corners — that ties this component into the grid system we already built (`izgrid.css`).

---

### C.2 Draw-on outline animation for illustrations

Their outline reveal is `stroke-dasharray` / `stroke-dashoffset` animated to 0. It works on **any**
SVG path, which means it works on our 89-illustration catalog with **zero redraw**.

```ts
// components/illustrations/useDrawIn.ts
// For each <path> in the SVG: len = path.getTotalLength()
//   dasharray = dashoffset = len  →  animate dashoffset → 0
// Stagger by path index (60ms), ease `--iz-ease-out`, total ≤ 1.4s.
// Fill (if any) fades in at 70% progress via a separate opacity keyframe.
// IntersectionObserver-gated, runs once.
// prefers-reduced-motion → jump straight to drawn state.
```

Constraints from our illustration rules (one orange focal per image): draw **structure first in ink,
the orange focal element last**. The eye lands where the accent lands, and it lands last.

Best candidates in the catalog: architecture/topology scenes, the flow diagrams, the "Governed City"
homepage scene. Worst candidates: anything with large filled areas (nothing to draw).

**This is the cheapest high-impact win in the whole document.** One hook, applied to existing assets.

---

### C.3 Cursor-scrub graph ("For Developers")

Desktop: pointer X over the plot maps to a time index; the line **draws up to the cursor** and the
readouts (`27K+ stars`, `6.2M downloads` in their case) count up to that index. Mobile: line is fully
drawn at max, readouts show final values, no interaction.

Ours: **"Access requests evaluated"** or **"Sessions secured"** over 12 months, with a second dimmed
line for "legacy VPN concurrent-connection ceiling" — the divergence is the story. We already have
the chart primitive in ImpactGraph (00t); this is a scrub-mode variant plus a mobile static twin.

Guardrail: label it clearly as illustrative unless we have real numbers cleared for publication.

---

### C.4 The InstaSafe circle-logo widget

Bottom-right persistent launcher using our logo mark. Closed: 56px circle, mark centred, subtle
accent ring that breathes at ~4s. Open: a small panel, not a chat window.

```
InstaSafe
──────────────────────────
📄  Read documentation
💬  Talk to sales
🛟  Contact support
▶️  Watch the 3-min demo
⌘K  Search the site
──────────────────────────
[ Start free trial ]
```

Rules so it doesn't become a nuisance:
- Never auto-opens. Never a modal. `Esc` closes, focus-trapped while open, `aria-expanded`.
- Hides while any full-bleed interactive is pinned (fingerprint-pro-style sections), reappears after.
- Single `IZ_FX`-style flag to disable site-wide, matching our `fx.config.ts` convention.
- On mobile it collapses into the sticky bottom CTA bar instead of floating over content.

The mark rotating slowly on hover (a few degrees, spring) is enough personality; don't spin it.

---

### C.5 WithWithout — a variant family, not one component

Today: `InstaSafe OFF ↔ ON · 6 layers removed`. Make `WithWithout` take a `variant` prop with a
shared shell (tab pair + diagram stage + caption) and swappable scenes — exactly Fingerprint's
`DiagramSection` architecture (background-class swap + absolutely-positioned labels; 2 SVGs, no
canvas, no video).

| Variant | Left (before) | Right (after) | Page |
|---|---|---|---|
| `stack` *(current)* | 6 stacked point tools | one plane | `/` or `/platform` |
| `vpn-ztna` **(new — the one you described)** | all visitor types mixed, every tool reachable by everyone, N×M spaghetti | Sales→CRM, Marketing→MAP, QA→staging; each lane isolated | `/zero-trust-features/ztna` |
| `network-app` | network-level tunnel (whole subnet lit) | app-level broker (one app lit) | `/platform` |
| `perimeter-identity` | castle-and-moat, inside = trusted | identity-checked at every door | `/zero-trust` pillar page |

`vpn-ztna` responsive plan, per your note:
- **Desktop**: left→right. 8 user avatars, 6 app tiles. Before = 48 crossing connectors at low
  opacity (deliberately illegible — illegibility *is* the message). After = 8 clean lanes, colour-coded
  by department.
- **Mobile**: top→bottom. **4 users, 3 apps.** Fewer nodes, same conclusion. This is a *content*
  reduction, not a scale-down — hard-code the mobile cast.
- **The InstaSafe mark sits at the junction in both states**, the way their fingerprint logo does.
  In "before" it's absent/greyed; in "after" it's the orange node everything routes through. That
  single move is what makes the diagram *ours* rather than generic.

---

### C.6 Autoplay 4-step section (works on both breakpoints)

Upgrade ScrollSteps (00o) with their tab-row-as-progress-bar layout: 2×2 grid of step tabs on
desktop, single column on mobile, each tab carrying its own `progressTrack > progressFill`. The fill
is the timer (CSS animation + `onAnimationEnd`), which we already do.

Content candidate — **onboarding, which is our actual differentiator**:
`01 CONNECT YOUR IDP → 02 IMPORT APPS → 03 WRITE ONE POLICY → 04 USERS ARE LIVE`, with a DOM mockup
per slide. All DOM, no video. Reuse `IzAppWindow` (00k) screens as the slide content — they already
exist.

---

### C.7 Hero archetype library (`components/izpages/heroes/`)

Five variants, matching the five they use, so no two consecutive page types feel alike:

| Name | Shape | Use on |
|---|---|---|
| `HeroSplit` | text-left / visual-right | use-case pages |
| `HeroSplitFlip` | visual-left / text-right; **visual first on mobile** | alternate use-case pages |
| `HeroCentered` | text only, centred, no visual | pillar/category pages, pricing |
| `HeroConsole` | centred text + console **below**, full width | technical product pages |
| `HeroImmersive` | full-bleed world image + scroll-linked transform | homepage only (§C.20) |

All static per doctrine rule 1 — `HeroConsole`'s console autoplays but takes no input; `HeroImmersive`
is scroll-linked only, never cursor-linked.

Each hero gets the `.iz-railed` / `.iz-cross` treatment from `izgrid.css` so they're visually kin
despite different shapes.

---

### C.8 "Try it" handoff sections

Their `WebBotAuthTeaser` → `/web-bot-auth/test/`. Ours, two of them:

1. **The deck** (InstaSafeDeckDesign) → a section that shows a still of the deck + one line +
   `Open the interactive walkthrough ↗`.
2. **Endpoint DLP by doing** → a small standalone route (`/try/dlp`) where a visitor attempts
   copy / screenshot / download against a fake app and watches the policy respond.

Both get their own URL (SEO + sales can share the link), a static teaser mid-page, and lazy-mount on
click. This is the doctrine's "promotion, not relocation" applied literally.

---

### C.9 Three-card family (AI-agent style)

One shell, three inner theatres, static on mobile:

| Card | Mockup | Motion on hover |
|---|---|---|
| "Stop credential stuffing" | login form | ghost cursor retries, attempts counter climbs, form locks |
| "Verify the device, not just the person" | device card + posture rows | rows tick green one by one, badge resolves *Trusted* |
| "See exactly what happened" | session log window | log lines stream, one flags amber, row expands |

Shared: `cardHeader > cardTitle > mockupWrapper`. Different inside. Same 12px radius, same border
token, same accent restraint — the family read comes from the chrome, not the content.

---

### C.10 Irregular logo / badge grid

Their `PartnersSection` scatters logos with intentional gaps. Ours: compliance + recognition marks
(SOC 2, ISO 27001, GDPR, DPDP, STQC, Gartner, G2) on the same CSS-var coordinate system as C.1, with
drawn-empty cells between. Reuse the `IzSignalGrid` placement engine — one component, two datasets.

---

### C.11 Hover tag-jump use cases

Hover a use-case row → the capability tags above it lift and highlight. Trivial to build
(`data-tags` on the row, `.is-lit` on matching chips, `transform: translateY(-3px)` + accent border).
Mobile: tags render as a static labelled list under each row. Add it to whichever page carries our
use-case index.

---

### C.12 `IzScrollStack` — the pinned card stack

Sticky wrapper at `top:0`, height `100vh` (they use a fixed 900px), inside a parent of
`steps × ~2.6 × viewportHeight`. Left column: `01/04` + step name + headline + a copyable command
pill. Centre: z-stacked card slots, front card swapped on progress thresholds, typewriter effect on
the window's tab label.

**Mobile twin is mandatory**: 4 static cards, first frame of each visual, no pinning. (Scroll-jacking
on touch is the single most common way these break — they avoided it by not shipping it.)

Candidate content: **"From VPN to Zero Trust in four moves"** — `01 CONNECT IDP` /
`02 PUBLISH APPS` / `03 SET POSTURE` / `04 RETIRE THE VPN`.

Cost note: this is the most expensive item in this document. It's worth building **once**, for
`/platform`, and never repeating — two pinned sections on one site is a tell.

---

### C.13 SMS-fraud-style closing animation

A device still, our logo mark on its screen with **segments of the mark rotating slowly at different
rates**, and identity/policy chips flowing *into* it from off-canvas: `device posture` · `location` ·
`IdP claim` · `app scope` · `time window` · `risk score`. Chips arrive, the mark completes, a
`Access granted · 240ms` label resolves.

Mechanically this is FilterStream (00q) + a destination. Good closing section for
`/zero-trust-features/*` pages — it visually restates "many signals, one decision" right above the CTA.

---

### C.14 Use-case page template

Adopt their skeleton verbatim, our content:

```
HeroSplit / HeroSplitFlip (alternating per page)
Client logo strip — "TRUSTED BY <sector> TO <outcome>"
4 outcome cards
Asymmetric perk block: 1 large + 2 small
"Controls for <use case>" — swiper of control cards          ← shared #1
"Learn more about <topic>" — customer story + logo rail       ← shared #2
For developers — code window + integrations (+ mobile twins)
Stat bar
```

Shared #2 (`IzStoryRail`) is worth building properly: logo rail selects the story, story swaps with a
crossfade, quote + author card animate in. It's the highest-credibility block on a B2B page and we'd
use it on every use-case and industry page.

---

### C.15 Timeline (about page)

Their exact recipe, which is better than a standard timeline:
- `<ol>` much taller than its window, clipped with `mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)`.
- `<li>` = a 1px vertical rule whose **height encodes elapsed time**. Quiet years are literally longer.
- Milestones absolutely positioned beside the spine; the important ones get a curved SVG branch.
- Desktop: intro copy `position:absolute` pinned left while the spine scrolls. Mobile: copy above,
  spine below.

For InstaSafe: founding → first enterprise deployment → SOC 2 → ISO 27001 → 1M+ sessions → DPDP
readiness → today. The variable-height spine does a lot of narrative work for very little code.

---

### C.16 Resources: events, blog, partners, support — feasibility

**Short answer: yes to all four, and none of them require leaving our design system.**

| Surface | Today | Feasible approach | Verdict |
|---|---|---|---|
| **Events** — `meetups.instasafe.com/events?type=completed` | Zoho Backstage portal, breaks the design | Zoho Backstage has a REST API (events, sessions, registration). Fetch at build + ISR (`revalidate: 3600`) into `/events`, render in our components with filters (upcoming/past, type, city). Registration itself hands off to Backstage — that's the one page we don't own, and that's fine (it's a form, post-intent). | ✅ Do it |
| **Blog** — `instasafe.com/blog/` on Ghost | Separate theme | Ghost **Content API** is read-only and purpose-built for headless. Pull posts/tags/authors at build + ISR into `/blog` and `/blog/[slug]`, render with our type scale. Authors keep writing in Ghost admin — no workflow change. | ✅ Do it — this is the easiest of the four |
| **Partners** — `instasafe.com/partners/` | Very thin | Pure content page, no integration needed. Build rich: partner tiers, a logo grid (C.10 engine), a "why partner" block, deal-registration form. Form → Zoho CRM via webhook, or Zoho Forms embedded. **Embed only if consented** — it's a third-party script, so it goes through `GatedScripts.tsx` like GA/Zoho PageSense. | ✅ Do it |
| **Support** — `support.instasafe.com/portal/en/home` | Zoho Desk portal | Two layers. (1) **Now:** an on-brand `/support` landing — search box, top articles, status, contact paths — that links out to the portal for ticket threads. Zoho Desk has a Help Center API for articles/categories, so the article browsing can live on our site. (2) **Later:** ticket *creation* via the Desk API needs server-side auth (OAuth refresh token in env, never client-side) and, for a signed-in "my tickets" view, real authentication — that's the piece that makes it a project rather than a page. | ⚠️ Landing page yes; full ticket portal is phase 2 |

**The honest caveat**, since you asked to be told if something isn't possible: everything
*read-only* is straightforward. Everything *write* (registering for an event, submitting a ticket,
seeing "my tickets") needs either a hand-off to the vendor's own page or a server-side integration
with real auth. My recommendation is read-side on our site, write-side handed off — that gets ~90%
of the design consistency for ~20% of the work, and it's the same split Fingerprint uses (their
`/demo/` and dashboard live on different origins too).

---

### C.17 Careers "We're hiring" — one-flag toggle

```ts
// components/home2/IzFooter.tsx  (or a tiny config module beside fx.config.ts)
export const HIRING = { active: true, label: "We're hiring", href: "/careers" };
```

Footer renders `Careers` and, when `HIRING.active`, an accent pill beside it with a slow pulse
(2 subtle steps, honours `prefers-reduced-motion`). Turning it off is one boolean and removes the
pill and its styles from the render — no leftover markup.

---

### C.18 Background canvas fields (the "not-fire" version)

Firecrawl's 13 canvases are `absolute; pointer-events:none`, sized to their section, layered behind
content. Their content is embers because they're Firecrawl. Ours should be **the thing we're named
for: instant, safe access.** Three candidates, in order of preference:

1. **Packet drift** — faint dots travelling along the grid rails of `izgrid.css`, occasionally
   passing through a checkpoint and briefly flaring accent. Ties directly to the grid system we
   already shipped, so it reads as *our* motif rather than a bought effect. **Pick this one.**
2. **Signal bloom** — slow concentric rings from a single point, like a posture check propagating.
   Good behind a CTA band, too rhythmic for a long section.
3. **Grid breathing** — grid crosses fading in/out on a slow noise field. Cheapest, least memorable.

Rules: max **2** per page, always behind a CTA/closing band or one dark section, `pointer-events:none`,
paused when off-screen (IntersectionObserver), fully disabled under `prefers-reduced-motion` and on
`data-fx="off"`, and it must look correct as a flat background if the canvas fails.

---

### C.19 Animated mega-menu icons

Yes — but the discipline you named is the whole point. **Animate 4 items maximum**, all in one row
of the Products column, everything else static:

| Item | Idle | On hover |
|---|---|---|
| ZTNA | closed padlock outline | shackle lifts, a lane opens beneath it |
| Device Binding | phone + laptop outlines | a link stitches between them |
| MFA | three dots | dots resolve into a tick, sequentially |
| Always-On VPN | broken line | line completes left→right and holds |

Build them as tiny inline SVGs (≤24px, 2–3 paths) using the C.2 draw-in engine in reverse — same
code, same feel as the illustrations. Anything more than four and it becomes wallpaper.

---

### C.20 The homepage hero — "the world"

**The finding that unlocks this:** hihobbes has **0 canvas, 0 video, 0 3D**. Its entire "scrolling
into a world" effect is one `1425×900` PNG plus scroll-linked transform. That is completely within
reach — and it means the whole question is *art direction*, not engineering.

Our advantage over them: we already have **89 catalogued illustrations** in a consistent
patent-drawing style with `--il-*` theme tokens. We don't need to commission a world. We need to
**compose one out of what we own**.

**The concept: "The Governed City."** We already have IMG-017 for this on the homepage. Promote it
from an illustration to *the* hero environment:

- A single wide scene, light and dark variants, drawn in our line style: a small city of buildings =
  applications (CRM, ERP, code repo, file store, admin console). Roads between them = the network.
  Every doorway has a checkpoint. The InstaSafe mark is the one orange element, sitting at the centre
  as the gate everything routes through.
- **Three depth layers** exported separately (far skyline / mid buildings / near checkpoints + mark).
  Scroll-link them at different rates (0.15 / 0.35 / 0.6) — parallax between three PNGs, ~20 lines of
  code, and it produces the "descending into a world" feeling.
- Headline and CTA sit **over** the near layer in plain language (per the homepage plain-language
  rule): something like *"Your apps. Your people. One gate."* — no jargon, no acronyms.
- Draw-in (C.2) runs **once, on load**, on the near layer only — outline draws, orange mark lands
  last. After that it's static. No cursor interaction, nothing to wait for. Doctrine rule 1 intact:
  the hero stays static in the sense that matters — nothing to *do*, nothing gating the message.
- **Mobile:** one composited image, no parallax, no draw-in. Portrait crop of the centre (gate +
  three buildings), text below. Same world, fewer streets — same principle as the C.5 mobile cast.

**Fallbacks if the city doesn't land** (worth prototyping in parallel, not sequentially):

- **B — "The Corridor."** One-point perspective down a hallway of doors, each door an app, each with
  a small posture readout. Scroll walks the camera forward (scale + translateZ on layers). Simpler to
  art-direct than a city, reads instantly, and it's a stronger metaphor for *access*.
- **C — "The Desk."** A single realistic-but-drawn workspace: laptop showing the InstaSafe console,
  phone showing an MFA push, a badge, a coffee. Scroll pushes in toward the laptop screen until the
  console fills the frame and the page continues *inside* it. Warmest of the three; closest to
  hihobbes's actual trick; lowest risk.
- **D — "The Map."** India-first: a map with offices, remote workers, a datacentre, contractors, each
  connected by a lane through the central gate. Strong for our actual market and for the compliance
  story. Risk: maps date quickly and invite "why isn't my city on it".

**My recommendation: prototype B and C first.** The city (A) is the most distinctive but the most
art-direction-dependent, and it's the one most likely to end up looking generic if the drawing isn't
excellent. The Corridor and The Desk both convey the message with far less that can go wrong, and
either can be produced from the existing illustration pipeline (you supply the render, we tokenise
and layer it).

**What I need from you to proceed on this one:** which of A/B/C/D to develop, and whether you'll
supply the artwork through the existing ChatGPT→SVG pipeline (per the standing rule that Claude
doesn't hand-draw). Everything else in this document can start without you.

---

## Suggested build order

Cheap and high-impact first, expensive-and-singular last.

1. **C.2 draw-in hook** — one hook, immediately applies to 89 existing illustrations
2. **C.17 hiring flag**, **C.11 tag-jump** — an afternoon each
3. **C.7 hero archetypes** — unblocks every subsequent page build
4. **C.1 IzSignalGrid + console** — the signature component; also gives us C.10 free
5. **C.5 WithWithout `vpn-ztna` variant** — the concept you most want explained
6. **C.6 autoplay steps**, **C.9 three-card family**, **C.14 use-case template**
7. **C.4 logo widget**, **C.16 blog + events integrations**
8. **C.13 closing animation**, **C.15 timeline**, **C.18 background canvas**
9. **C.12 IzScrollStack** — once, for `/platform`, and nowhere else
10. **C.20 homepage hero** — after A/B/C/D is chosen
