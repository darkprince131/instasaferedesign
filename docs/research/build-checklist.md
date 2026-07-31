# Master checklist — every item from the brief

Built from your prompt line by line, in the order you wrote it. Nothing merged, nothing dropped.
Companion to [`fingerprint-audit-and-ideation.md`](./fingerprint-audit-and-ideation.md) — the `§` refs
point into that doc.

**Status key**
| | meaning |
|---|---|
| ✅ | done and verified in the running app |
| 🟢 | done as research/answer (no code needed) |
| 🟡 | spec'd in the ideation doc — not built |
| ⬜ | not started, not spec'd |
| ⚠️ | gap, or needs your decision before it can move |

**Score: 12 ✅ · 6 🟢 · 26 🟡 · 9 ⬜ · 7 ⚠️**

---

## 0. Setup and process

| # | Item | Status | Where it stands |
|---|---|---|---|
| 0.1 | Read the handoff, pick up where we left off | ✅ | `HANDOFF.md` + memory index read. Current state: `.iz` orange system, 89-page build, SSO page pending your sign-off. |
| 0.2 | Use `/impeccable` | ✅ | Runs automatically as a write hook — fired on all 6 files I touched, no deterministic issues raised. |
| 0.3 | Use `/taste-skill:design-taste-frontend` | ⚠️ | **Not run.** The installed name is `taste-skill:taste-skill` (v2) — `design-taste-frontend` isn't in this session's skill list. Say the word and I'll run `taste-skill:taste-skill` over the two new components. |
| 0.4 | Use `/taste-skill:imagegen-frontend-mobile` | ⬜ | Not run — it generates mobile *app* screen concepts. No mobile-app surface in scope yet. Flag if you want it for something specific. |
| 0.5 | Use `/review-animations` | ⚠️ | **Not run.** Closest installed skills are `improve-animations` / `find-animation-opportunities`. Worth running once the animated pieces (C.2, C.6, C.9, C.13) exist — right now there'd be almost nothing to review. |
| 0.6 | Use `/motion-framer` | ⬜ | Not needed yet. Both components shipped are CSS-transition based, which is correct for them. It becomes relevant at C.9 / C.12 / C.13. |
| 0.7 | Check every listed page at **PC + mobile** dimensions | ⚠️ | **12 of 22 pages checked.** Full table in §7 below — 10 pages were never loaded, and 8 of the 12 were probed at desktop only. This is the biggest honesty gap in the work so far. |

---

## 1. fingerprint.com (homepage)

| # | Item you flagged | My finding | Status | Live where |
|---|---|---|---|---|
| 1.1 | Account takeover / payment fraud have animated visuals, hidden on mobile — only text cards remain | **Confirmed.** `UseCasesSection--showcaseSection` is `display:none` below the breakpoint; the accordion text survives alone (382px desktop → 727px mobile). | 🟢 | §A.1 |
| 1.2 | Hover info on "The internet's most accurate visitor identifier" shown permanently on mobile | **Confirmed, and it's a twin, not a reflow.** `AccuracyChart--chart` (hover-scrub) is hidden and `AccuracyChart--mobileChartContainer` — a different component, pre-revealed — takes its place. | 🟢 | §A.1 |
| 1.3 | "Identify all anonymous visitor" animation hidden on mobile | **Partly confirmed.** The hero demo itself survives on mobile (755px); what's dropped is `HeroSection--demoLeftDecorator` and `--accuracyDisclaimer`. | 🟢 | §A.1 |
| 1.4 | Draw-outline animation — we should use it for some illustrations | Mechanism is `stroke-dasharray`/`stroke-dashoffset` → 0. Works on **any** SVG path, so it applies to all 89 catalogued illustrations with zero redraw. Rule: draw structure in ink first, orange focal **last**. | 🟡 | §C.2 — **cheapest high-impact item in the whole doc, and still unbuilt** |
| 1.5 | "Bot & AI agent detection" and "Smart Signals" absent in mobile | ⚠️ **Correction: they are not absent.** Both render on mobile (420px / 639px). They reflow via CSS-variable grid coordinates. Their technique is better than hiding — and it's what I built. | 🟢 | §A.1 |
| 1.6 | Want an animation like those two sections — **ideate first** | Ideated, then built. 10×7 grid, 8px gap, 52 children = copy block + 26 signals + 25 drawn-empty cells. | ✅ | §A.2 / §C.1 → **`IzSignalGrid`, lab `/components#signalgrid`** |
| 1.7 | So many capabilities spread across the section | 24 InstaSafe controls (posture, MFA, SSO, binding, geo-fence, time-of-day, impossible travel, jailbreak, screen recording, clipboard, download, watermark, session recording, idle timeout, split tunnel, DNS, allow-list, JIT, approval, termination, anomaly, audit export, agentless, always-on). | ✅ | `IzSignalGrid.tsx` |
| 1.8 | Each one has its own dedicated console info with **2 options** — listed/not listed, detected/not detected | Their toggle is `Signed \| Spoofed` with a sliding `--active-index` pill. Ours inverts the polarity: **enforced/unenforced** — `Compliant\|Non-compliant`, `Listed\|Not listed`, `Bound\|Unrecognised`. Same JSON payload, one field changed. | ✅ | verified: toggle → `"decision":"deny"`, tone `deny` |
| 1.9 | Spread in random blocks, not continuous column or row | Coordinates are **data, not media queries** — inline `--gc/--gr`, `--gc-md/--gr-md`, `--sm-span` per tile. One DOM re-scatters at 10 / 6 / 4 columns. | ✅ | verified at 1440 / 900 / ≤700, zero cell collisions |
| 1.10 | Some empty blocks to break the symmetry and catch attention | 21 drawn-empty cells — real elements with dashed border + `.iz-gridfield` texture + corner cross, at hand-picked cells. Not gaps. | ✅ | 21 desktop / 6 tablet / 2 phone |
| 1.11 | "For Developers" — graph advances with cursor on desktop, stable at max on mobile | Pointer-X maps to a time index; the line draws to the cursor and readouts count up. Ours: sessions secured vs legacy VPN ceiling, with the divergence as the story. We own the chart primitive already (ImpactGraph 00t) — this is a scrub mode + a mobile static twin. | 🟡 | §C.3 |
| 1.12 | Fingerprint widget at the bottom → want one with our circle logo (read docs / talk to sales / contact support) | Spec'd: 56px mark, breathing accent ring, opens a 5-item panel + trial CTA. Never auto-opens, `Esc` closes, focus-trapped, one flag to disable, collapses into the mobile CTA bar. | 🟡 | §C.4 |

---

## 2. /products/identification/ — before & after

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 2.1 | Has a before/after like our WithWithout | `DiagramSection` — tabs rendered twice (`--tabs` desktop, `--mobileTabs` mobile), diagram is a div swapping an `--afterBackground` class with absolutely-positioned labels over it. **2 SVGs, 0 images, 0 video, 0 canvas.** | 🟢 | §A.3 |
| 2.2 | We can have multiple variants of with/without for different pages | Spec'd as a variant family on one shell: `stack` (current) · `vpn-ztna` · `network-app` · `perimeter-identity`. | 🟡 | §C.5 |
| 2.3 | Our current one needs modifying further | Not touched yet — waiting on the variant refactor so it becomes `variant="stack"` rather than a one-off. | 🟡 | §C.5 |
| 2.4 | New variant: VPN vs ZTNA — all visitor types mixed left, all tools right, everyone reaches everything → then Sales uses sales tools, Marketing marketing, QA QA | Spec'd. Before = 48 crossing connectors at low opacity (illegibility **is** the message). After = 8 clean department-coloured lanes. | 🟡 | §C.5 |
| 2.5 | Desktop left→right with more users and tools; mobile top→down with fewer | Spec'd as a **content** reduction, not a scale-down: desktop 8 users / 6 apps horizontal; mobile 4 users / 3 apps vertical, hard-coded cast. | 🟡 | §C.5 |
| 2.6 | Always keep the InstaSafe logo at the junction, like their fingerprint logo | Spec'd: absent/greyed in "before", the orange node everything routes through in "after". That single move is what makes the diagram ours. | 🟡 | §C.5 |
| 2.7 | *(found while auditing)* `IncludedSection--cards` (hover) → `--mobileContainer` (all states open) | Another twin. Reinforces 1.2. | 🟢 | §A.3 |

---

## 3. /products/smart-signals/

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 3.1 | Hero: visual right, text left; on mobile visual goes top, text below | Confirmed — text 499px + `animationSection` 591px side by side, visual leading on narrow. | ✅ | **`HeroSplitFlip`** — verified head order 2 / visual 1 on desktop **and** visual-first on phones |
| 3.2 | The autoplay section is a very nice animation, plays on **both** desktop and mobile — want one | Verified media count: `svg:3, canvas:0, video:0, img:0, lottie:0` → **pure DOM + CSS**. 4 steps, 2×2 tab grid on desktop → 1 column on mobile, each tab carrying its own `progressTrack > progressFill`; the fill **is** the timer. | 🟡 | §A.4 / §C.6 — we already own the timer mechanism in ScrollSteps (00o); the new part is the tab-row-as-progress-bar |
| 3.3 | One section goes dark — in dark mode we can make one light | ⚠️ **Not yet spec'd.** Their inversion is a hard-coded `#141415` band. For us it must be an *inverted* band (dark section on paper theme, light section on dark theme) driven off `data-theme`, not a fixed hex — otherwise it breaks in one of our two themes. Needs a token pair before it can be built. | ⚠️ | needs a decision — see §8 |
| 3.4 | *(found while auditing)* blog `Grid--grid` (desktop) ↔ `Posts--swiperSection` (mobile) | Third twin instance. | 🟢 | §A.4 |

---

## 4. /products/bot-detection/

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 4.1 | Hero is full-width dedicated to text, mid-aligned — breaks the monotonous feel | Confirmed: `descriptionSection` 300px, flex, **no `animationSection` at all** — the shortest hero on the site, deliberately. | ✅ | **`HeroCentered`** |
| 4.2 | Every page shouldn't feel the same with only content changed | Confirmed as their core structural move: **five distinct hero archetypes** across their pages. | ✅ | §A.5 |
| 4.3 | We need header components — variants of the header section | Built all five: `HeroSplit` · `HeroSplitFlip` · `HeroCentered` · `HeroConsole` · `HeroImmersive`, one shared `Head`, all static per the doctrine. | ✅ | **`components/izpages/heroes/`, lab `/components#heroes`** — verified 5 different silhouettes at 1440 (692/622/634/1329/837px) |
| 4.4 | "Web Bot Authentication" opens a dedicated interactive at a separate URL | Confirmed — `WebBotAuthTeaser--hero`, 514px, whose entire job is the hand-off. Matches our own "promotion, not relocation" rule. | 🟢 | §A.5 |
| 4.5 | We should link our deck like that | Spec'd: still of the deck + one line + "Open the interactive walkthrough ↗", own URL, lazy-mounted. | 🟡 | §C.8 |
| 4.6 | Or a "try out Endpoint DLP by doing" — one exists in InstaSafeDeckDesign | Spec'd as `/try/dlp`: visitor attempts copy / screenshot / download against a fake app, watches policy respond. | 🟡 | §C.8 — ⚠️ I have **not** opened the DeckDesign build to see what's already there; needs a look before building |

---

## 5. /ai-agent-detection/

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 5.1 | Hero is text-main with a console below; animated and hover-interactive | Confirmed: `ctaSectionGridContainer` 350px + `monitorGridContainer` 386px (live traffic monitor) + `decorFrame`. | ✅ (shape) | **`HeroConsole`** — built **without** the hover interactivity, deliberately: doctrine rule 1 says the hero takes no input. Console autoplays only. |
| 5.2 | Three animations, same design style but each a different animation | Verified `img:0, video:0, lottie:0` — every mockup is DOM. Shared shell `card > cardHeader > cardTitle > mockupWrapper`, then: `loginCard + fraudCursorOverlay` (ghost cursor keeps clicking) / `agentCard + progressTrack>progressFill` (loads, resolves "Signed · Verified") / `browserFrame + cartBody` (analyses, surfaces ClaudeBot). | 🟡 | §A.6 / §C.9 — ours: credential stuffing / device posture ticks / session log stream |
| 5.3 | These are static on mobile | Confirmed, and carried into the spec. | 🟢 | §C.9 |
| 5.4 | "Authorized AI Agent Detection" — logos in an irregular grid, looks cool | Ours: compliance + recognition marks (SOC 2, ISO 27001, GDPR, DPDP, STQC, Gartner, G2) on the **same coordinate engine as `IzSignalGrid`** — one component, two datasets. | 🟡 | §C.10 — cheap now that 1.9 is built |
| 5.5 | "Automation Use Cases" — hover jumps the tags above; static and organised on mobile | Trivial build: `data-tags` on the row, `.is-lit` on matching chips, `translateY(-3px)` + accent border. Mobile = labelled list. | 🟡 | §C.11 |

---

## 6. /products/fingerprint-pro/

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 6.1 | Highly animated page, unique design throughout | Confirmed — document **12925px**. | 🟢 | §A.7 |
| 6.2 | Hero reveals a lot on hover; doesn't on mobile | Noted. **We will not copy the hover-hero** — doctrine rule 1. | 🟢 | conscious deviation |
| 6.3 | The slider is good | `PlatformSlider--stickyWrapper`: `position:sticky; top:0; height:900px` inside a **10620px** parent → ~2650px of scroll per step × 4. | 🟢 | §A.7 |
| 6.4 | Scroll-heavy section reveals a lot, then another section replaces it seamlessly, ×3–4 | Confirmed: z-stacked `cardSlot` / `cardSlotFront`, left column `01/04` + step name + headline + copyable command pill, typewriter on the window tab label. | 🟡 | §C.12 — `IzScrollStack`, content "From VPN to Zero Trust in four moves" |
| 6.5 | On mobile these are 4 static sections showing the first part of each visual | `PlatformSlider--mobileList` with 4 `mobileCard`s. **Mobile twin is mandatory** — scroll-jacking on touch is how these break. | 🟡 | §C.12 |
| 6.6 | Love the grid section — hovered cell is distinguished, animations play on hover, text below | `ActionSection` using CSS **`subgrid`**; cards are "USE CASE 1. REDUCED FRICTION" / "2. INCREASED AUTHENTICATION", each a small product mockup animating on hover. | 🟡 | §C.12 / §C.9 |
| 6.7 | *(warning I'd add)* | This is the most expensive item in the doc. Build it **once**, for `/platform`, and never repeat — two pinned sections on one site is a tell. | 🟢 | §C.12 |

---

## 7. Use-case pages

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 7.1 | `/sms-fraud/` left-right hero layout, lots of text with a visual on each side | ⚠️ **Page never loaded.** Shape inferred from the sibling use-case pages I did probe. `HeroSplit` covers the layout. | ⚠️ | needs a real visit |
| 7.2 | Similar to a component we took from Cursor's page | Not re-checked. | ⬜ | |
| 7.3 | `/sms-fraud/` closing animation — phone still, fingerprint logo animated, parts rotating slowly, tags flowing into the phone | Spec'd from your description: device still, our mark with segments rotating at different rates, chips (`device posture`, `location`, `IdP claim`, `app scope`, `time window`, `risk score`) flowing in, resolving to `Access granted · 240ms`. Mechanically FilterStream (00q) **+ a destination**. | 🟡 | §C.13 — ⚠️ spec is from your description, **not** from my own inspection |
| 7.4 | Two consistent components across use-case pages: a slider, and a sub-navigation with visuals | Confirmed on `/account-takeover/`: **#1** `SmartSignalsSection--swiperWrapper` (title is the only per-page change); **#2** `CustomerStories` — `mainBox` + `infoBoxContainer` + a logo rail where the selected company carries `--company1 --selected`. Click a logo → story + quote + author swap. | 🟢 | §A.8 |
| 7.5 | Same two components on `/new-account-fraud-prevention/` | ⚠️ **Page never loaded** — assumed identical from the shared template. | ⚠️ | |
| 7.6 | Same two components on `/payment-fraud/` | ⚠️ **Page never loaded** — same assumption. | ⚠️ | |
| 7.7 | Full use-case page template for us | Spec'd end to end: hero (alternating Split/SplitFlip) → client strip → 4 outcome cards → 1 large + 2 small perk block → controls swiper → `IzStoryRail` → for-developers + mobile twins → stat bar. | 🟡 | §C.14 |
| 7.8 | `/returning-user-experience/` — "Why Fingerprint" is like our FeatureHub but far more polished; **analyse and enrich ours** | ⚠️ **Partial.** I probed the section (`workflowWrapper` + `backgroundMaskContainer` + `backgroundGradient` + 3 `reason` blocks) but **the animated visual did not mount** in my browser, so I never saw the thing you're actually asking me to match. FeatureHub is **not** enriched. | ⚠️ | needs a re-visit with the animation running |
| 7.9 | `/products/account-sharing-prevention/` — static illustration right (not mobile this time), chips flowing in | Confirmed: `DiagramSection > signals > marquee > signalRowContainer > signalRow > signalRowElement > signal`, rows duplicated for a seamless loop, chips carry raw device attributes. **We already own this mechanism** (FilterStream 00q). | 🟢 | §A.9 — the missing piece is the destination, same as 7.3 |

---

## 8. Resources, blog, partners, support

| # | Item | My answer | Status | Live where |
|---|---|---|---|---|
| 8.1 | Events — ours jumps to the Zoho portal and breaks the design; can we pull the info and do filters like `fingerprint.com/events/` in our own design? | **Yes.** Zoho Backstage has a REST API. Fetch at build + ISR (`revalidate: 3600`) into `/events`, render with our components and filters (upcoming/past, type, city). Registration itself hands off to Backstage. | 🟢 answer / 🟡 build | §C.16 |
| 8.2 | Same for the blog (Ghost CMS) | **Yes, and it's the easiest of the four.** Ghost **Content API** is read-only and built for headless. Pull posts/tags/authors → `/blog` and `/blog/[slug]`. Authors keep writing in Ghost admin, no workflow change. | 🟢 answer / 🟡 build | §C.16 |
| 8.3 | Rich partner page — ours is very boring; integrate a Zoho form or another form | **No integration needed for the page itself.** Tiers, logo grid (reuses the 5.4 engine), "why partner", deal-registration form → Zoho CRM webhook or embedded Zoho Forms. ⚠️ An embedded Zoho form is a third-party script and **must** go through `GatedScripts.tsx` like GA/PageSense. | 🟢 answer / 🟡 build | §C.16 |
| 8.4 | Support page — currently the Zoho Desk portal; integrate if we can, raise tickets managed in Zoho Desk | **Split answer.** Now: on-brand `/support` landing (search, top articles, status, contact paths) — Zoho Desk's Help Center API can serve the articles on our site. Later: ticket *creation* needs server-side OAuth (refresh token in env, never client-side), and a "my tickets" view needs real authentication. That's a project, not a page. | 🟢 answer / 🟡 build | §C.16 |
| 8.5 | "If not possible, let me know" | **Stated plainly:** everything read-only is straightforward; everything *write* (register for an event, submit a ticket, see my tickets) either hands off to the vendor or needs a server-side integration with real auth. Recommendation: read-side ours, write-side handed off — the same split Fingerprint uses. | 🟢 | §C.16 |
| 8.6 | *(not yet done)* | ⚠️ I never loaded `/events/`, `/blog/`, `/partners/`, `/support/`, or any of the **instasafe.com** equivalents. The answers above are from platform knowledge, not from inspecting the actual pages or your actual Zoho tenants. | ⚠️ | |

---

## 9. About us, playground, demo

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 9.1 | `/about-us/` — like the "Backstory and timeline" section on scroll | Confirmed and it's smarter than a normal timeline: `<ol>` **1956px tall inside a 574px window**, clipped by `mask-image: linear-gradient(...)` so it fades at both ends; each `<li>` is a **1px rule whose height encodes elapsed time** (quiet years are literally longer); milestones absolutely positioned, big ones get a 293px curved SVG branch; desktop pins the intro copy, mobile stacks it. | 🟡 | §A.10 / §C.15 — ours: founding → first enterprise deployment → SOC 2 → ISO 27001 → 1M+ sessions → DPDP readiness → today |
| 9.2 | *(page-stack note)* | `/about-us/` is **Tailwind**, not CSS modules — Fingerprint is mid-migration, page by page. Useful precedent for our own blue→orange migration. | 🟢 | §A.10 |
| 9.3 | Playground has the same theme — we should follow that for our free trial | ⚠️ **Never loaded** (`demo.fingerprint.com/playground`). Principle noted — a trial/playground on a different origin must still carry the design system — but nothing analysed or spec'd. | ⚠️ | |
| 9.4 | `/demo/` — like all its sections: hover autoplay animation, dark grid section, interactive console living inside it | ⚠️ **Never loaded.** Overlaps §C.6 (autoplay), §C.18 (dark grid band) and IzConsole, but the page itself wasn't inspected. | ⚠️ | |
| 9.5 | Careers in the footer with a "we are hiring" alert, on/off with minimal changes | Spec'd as one boolean: `HIRING = { active, label, href }` → accent pill beside `Careers` with a slow pulse honouring `prefers-reduced-motion`; off removes pill and styles from the render. | 🟡 | §C.17 |

---

## 10. firecrawl.dev/crawl

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 10.1 | Subtle fire animation matching their name — we should do something like that, not fire | **13 `<canvas>` elements**, `absolute; pointer-events:none`, sized per section (1109×520, 1112×556, 696×240, 422×480), behind content. 0 video, 0 Lottie, 3 SMIL SVGs. | 🟢 | §A.11 |
| 10.2 | Our equivalent | Three candidates, recommendation **packet drift** — faint dots travelling the grid rails of `izgrid.css`, flaring accent at checkpoints. Ties to the grid system we already shipped, so it reads as our motif. Max 2 per page, paused off-screen, killed by reduced-motion and `data-fx="off"`. | 🟡 | §C.18 |
| 10.3 | "Flexible pricing" section | ⬜ Not analysed individually. | ⬜ | |
| 10.4 | "Built into the AI tools you already use" section | ⬜ Not analysed individually. | ⬜ | |
| 10.5 | "Crawling that finishes the whole job." section | ⬜ Not analysed individually. | ⬜ | |
| 10.6 | The whole "Ready to build?" grid and fire | ⬜ Not analysed individually — headings probe suggests it may live on their homepage, not `/crawl`. | ⬜ | |
| 10.7 | Footer design like theirs, and the section above it | Confirmed: footer is **1642px tall** with its own canvas — a deliberately huge footer acting as sitemap + brand closer. That scale is what makes their grid theme read as structural rather than decorative. | ⬜ | not spec'd yet — ⚠️ **this is the one firecrawl item you called out most concretely and it has no entry in the ideation doc** |
| 10.8 | Use our small components, recognitions and compliance marks there | Overlaps 5.4 (irregular badge grid). | 🟡 | §C.10 |
| 10.9 | Pay attention to all animated illustrations on the page, learn which we can reuse | ⬜ Not done — I counted and located the canvases but did not catalogue each illustration. | ⬜ | |

---

## 11. Mega menu

| # | Item | My finding | Status | Live where |
|---|---|---|---|---|
| 11.1 | Their firewall → endpoints items have tailored animated icons | ⚠️ Not inspected directly (that's a Fortinet-style mega menu, not a page I loaded). | ⚠️ | |
| 11.2 | Create some icons in our style, for **important items only** — not all, or it loses the wow factor | Spec'd with your constraint as the rule: **4 maximum**, all in one row of the Products column. ZTNA (shackle lifts, lane opens) · Device Binding (link stitches) · MFA (dots resolve to a tick) · Always-On (broken line completes). Tiny inline SVGs, ≤24px, 2–3 paths, driven by the same draw-in engine as 1.4. | 🟡 | §C.19 |

---

## 12. Homepage hero

| # | Item | Decision / status | Status | Live where |
|---|---|---|---|---|
| 12.1 | Hero must be highly distinguishable | Open — deferred by your call. | 🟢 | |
| 12.2 | Like hihobbes.com — feels like scrolling into a world | **Verified: 0 canvas, 0 video, 0 3D.** One `1425×900` PNG + scroll-linked transform, document 7480px. So the effect is art direction, not engineering. | 🟢 | §A.12 |
| 12.3 | Ideate the hero image — can we recreate something from our illustrations, light + dark | Four directions ideated (Governed City / Corridor / Desk / Map) with a 3-layer parallax recipe. | 🟢 | §C.20 |
| 12.4 | Your decision | **"Do not draw any this time. Use Governed City image."** Homepage hero left untouched. | ✅ | `app/page.tsx` unchanged |
| 12.5 | The mechanism, kept available for when you do want it | `HeroImmersive` exists and works — takes `back` / `mid` / `near` nodes, scroll-linked at rates 18 / 48 / 88 via `--hp` × `--rate`, near layer also scales. rAF + `getBoundingClientRect` + IntersectionObserver, never scroll events. Demoed in the lab with the Governed City illustration. | ✅ | `components/izpages/heroes/Heroes.tsx` |

---

## 13. Page-visit ledger — the honest version

| Page | Desktop probed | Mobile probed | Depth |
|---|---|---|---|
| `fingerprint.com/` | ✅ 1440 | ✅ 390 | deep — grid internals, console DOM, all sections |
| `/products/identification/` | ✅ | ✅ | deep — DiagramSection internals |
| `/products/smart-signals/` | ✅ | ✅ | deep — AnimationSection internals |
| `/products/bot-detection/` | ✅ | ⬜ | section outline + hero measurement |
| `/ai-agent-detection/` | ✅ | ⬜ | deep — 3-card DOM |
| `/products/fingerprint-pro/` | ✅ | ⬜ | deep — sticky/stack maths |
| `/returning-user-experience/` | ✅ | ⬜ | partial — **visual never mounted** |
| `/account-takeover/` | ✅ | ⬜ | deep — full template + CustomerStories |
| `/products/account-sharing-prevention/` | ✅ | ⬜ | targeted — marquee only |
| `/about-us/` | ✅ | ⬜ | deep — timeline DOM |
| `firecrawl.dev/crawl` | ✅ | ⬜ | shallow — canvas/media census + footer |
| `hihobbes.com/solutions/outbound` | ✅ | ⬜ | shallow — media census |
| `/sms-fraud/` | ⬜ | ⬜ | **never loaded** |
| `/payment-fraud/` | ⬜ | ⬜ | **never loaded** |
| `/new-account-fraud-prevention/` | ⬜ | ⬜ | **never loaded** |
| `/events/` | ⬜ | ⬜ | **never loaded** |
| `/blog/` | ⬜ | ⬜ | **never loaded** |
| `/partners/` | ⬜ | ⬜ | **never loaded** |
| `/support/` | ⬜ | ⬜ | **never loaded** |
| `/demo/` | ⬜ | ⬜ | **never loaded** |
| `/web-bot-auth/test/` | ⬜ | ⬜ | **never loaded** |
| `demo.fingerprint.com/playground` | ⬜ | ⬜ | **never loaded** |
| `instasafe.com/*` (blog, partners, meetups, support) | ⬜ | ⬜ | **never loaded this session** |

You asked for **all** pages at both dimensions. 12 of 22 were loaded, and only 3 of those got a real mobile pass. Closing this is the obvious first job.

---

## 14. Built this session — what is actually live

| Component | Files | Lab route | Verified |
|---|---|---|---|
| `IzSignalGrid` (00ac) | `components/home2/IzSignalGrid.tsx`, `signalgrid.css` | `/components#signalgrid` | 1440: 10 cols, 24 tiles, 21 empties, uniform 121px rows · 900: 6 cols, 18 tiles, 6 empties, 96px rows · ≤700: 4 cols, 12 tiles, 2 empties. Zero cell collisions, zero horizontal overflow, zero clipped labels at all three. Tile click → `aria-pressed`; toggle → `deny` + tone; pager wraps + resets; autoplay stops on first interaction. |
| Hero archetypes (00ad) | `components/izpages/heroes/Heroes.tsx`, `heroes.css` | `/components#heroes` | Five distinct silhouettes at 1440 (692 / 622 / 634 / 1329 / 837px). Split = head 1 / visual 2; Flip = head 2 / visual 1 **and** visual-first on phones. Crosses hidden ≤720px. |
| Audit + ideation doc | `docs/research/fingerprint-audit-and-ideation.md` | — | — |
| This checklist | `docs/research/build-checklist.md` | — | — |

Also: `npx tsc --noEmit` clean, `npm run build` → 89 static pages.

**One verification limit, restated:** the Browser pane isn't compositing this session — screenshots fail, `window.scrollTo` is a no-op, and transition clocks never advance. Entrance stagger and theme cross-fade were verified *structurally* (class applied, selector matches, rule present at higher specificity, every custom property resolving to correct dark values) but never *watched*. Worth one human glance in a real browser.

---

## 16. Round 2 — corrections applied, and everything the second research pass found

*Added after your feedback. Supersedes any conflicting row above.*

### 16a. Corrections you asked for — done

| Your instruction | What changed | Status |
|---|---|---|
| "Forget about the 89 illustrations… they're a tremendous amount of work, to be released later" | Draw-in outline (§1.4 / §C.2) **re-scoped**: it is no longer a catalogue play. It runs on any SVG path, so it now belongs to the component artwork we build here — flow diagrams, mega-menu icons, console scenes, the WithWithout stages. Lab copy and memory updated to say so. | ✅ |
| "Delete the Governed City and the book SVGs, they turned out bad. Use PNG for now" | `public/illustrations/img-017_governed-city.svg` and `img-089_empty-state-ledger.svg` **deleted**. `<Illustration>` and `<ThemedImage>` both still work and are ready for real assets; the illustrations lab section now says so plainly instead of showing bad artwork. The hero demos borrow the existing `.webp` diagrams so the visual slot stays demonstrable. | ✅ |
| "IzSignalGrid — all cards have grid, do not create grids inside the cards" | Removed. The placeholder cells had `.iz-gridfield` texture **and** a dashed border **and** a corner cross. Verified against fingerprint.com: **their placeholders have no background, no border, no texture at all** — pure spacers. The asymmetry comes from the gaps. Ours now render nothing. | ✅ |
| "Visual layout make like fingerprint, ours doesn't look as appealing" | Rebuilt off their measured values rather than guesswork: tiles are now **centred icon-over-label** (was left-aligned rows), icon and label both **muted grey** at rest (was near-black text), a **hairline ring** `box-shadow 0 0 0 1px` instead of a border, **12px radius**, 4px padding. Active state is white surface + elevation + **orange icon only** — the accent-tinted background and accent border are gone; that was what made it look cheap. Console and toggle got the same ring treatment; the toggle indicator is now a neutral white pill like theirs, with the allow/deny meaning moved to a small tone dot. Title capped at 36px so tiles stay landscape. | ✅ |

**Measured before → after:** tile `102×121 portrait, accent-tinted, bordered` → `102×98, ring, centred, muted` (theirs: 99×87). Grid height 884px → 737px (theirs 762px). Placeholders `dashed + textured` → invisible. Build green, 89 pages, no horizontal overflow.

### 16b. Pages visited in round 2 — and the components they revealed

| Page | Verdict | New components it hands us |
|---|---|---|
| `/sms-fraud/` ✅ | Structure: hero → "Replace 95% of SMS verifications" stat → quote → `SolutionSection` ×3 → for-developers → related resources. | **(a) Big-card + diagram stage** — `bigCard` (title + long description) beside a `diagramSection`. The closing animation you liked is this, and its chips are **the same marquee mechanism as account-sharing** (`marquee > signalRowContainer > signalRow > signalRowElement`) firing into a phone drawn in 3 SVGs. So §C.13 is FilterStream + a destination, confirmed by inspection now, not just your description. **(b) `RelatedResourcesSection`** — 4 tagged cards (`TECHNICAL DEMO` / `SOLUTION DEMO`) linking out to `demo.fingerprint.com/...` and to internal pages. **This is the component for §4.5/§4.6** — the deck link and the DLP try-it. Desktop grid ↔ mobile swiper. |
| `/payment-fraud/` ✅ | **Identical template to `/account-takeover/`** confirmed — same UseCases → Accuracy → SmartSignals swiper → CustomerStories → ForDevelopers → Identify order. | Confirms §7.7 template is real, not inferred. |
| `/new-account-fraud-prevention/` ✅ | Same template, but swaps `AccuracySection` for `WhyFingerprint`. | The "why" block is a **slot** in the template, not a fixture. Swiper has `buttonLeft.buttonDisabled / buttonRight` arrows. |
| `/returning-user-experience/` ⚠️ | **Second attempt, same result.** Scrolled onto it slowly, dwelled 2.6s: the animated visual is an **empty `<div>`** — 0 svg, 0 img, 0 video, 0 canvas. No console errors or network records available in this pane to diagnose why. | ⚠️ I still cannot see the thing you want FeatureHub to match. See open question 1. |
| `/demo/` ✅ | 5 sections, **all SVG, zero images/video/canvas**. | **(c) `SectionLabel`** — a shared eyebrow of icon + dash + label, used on every section. **(d) `HoverBorderGradient`** — container/button with an animated gradient border on hover. **(e) `wordSpan`** — per-word hero title animation. **(f) `topDecorator` / `demoBoxSideDecoratorLeft`** — decorative frame rails, same family as our `izgrid.css`. |
| `firecrawl.dev/crawl` ✅ | Section recipe is consistent: `// eyebrow //` in mono → headline → **exactly one `<canvas>` per section**, `overflow-clip`, large vertical padding. | Confirms §C.18: one ember/packet canvas per section, not a page-wide wash. |
| firecrawl **footer + "Ready to build?"** ✅ | Section above: `h-416`, **3 canvases**, bracketed tags `[ SEARCH ] [ SCRAPE ] [ INTERACT ] [ CRAWL ]` + `// Get started //` + headline + CTA. Footer: **1642px**, three stacked blocks — a decorative 245px "FOOTER" wordmark, a 42px desktop-only strip, then a 1357px content block (tagline, YC badge, socials, SOC 2, four nav column groups) plus one `696×240` decorative canvas. Every block carries **`-mt-1`** so borders overlap into single hairlines — that 1px overlap is what makes it read as a lattice rather than stacked cards. | **(g) `IzMegaFooter`** + **(h) `ReadyToBuild` CTA band**. Both now spec'd enough to build. |
| `/events/` ✅ | Hero is a **week calendar strip** (timezone label + MON 29 / TUE 30 / … columns, 418px). Below: `EventsFilterSection` = title with `_` cursor + `[Upcoming Events][Past Events]` toggle + `FILTER BY · Event Type · Region · ✕ Clear filters` + card grid + "Load More". | **(i) `EventCalendarHero`** and **(j) `FilterableEventGrid`**. This is precisely the shape for meetups.instasafe.com — §8.1 now has a design, not just a feasibility answer. |
| `/partners/` ✅ | Explicit three-track layout: `leftGutter │ contentArea │ rightGutter`, with one `fullWidth` band breaking out of it. Sections: hero → full-width "MADE FOR DEVELOPERS_" band → customer story → "How partners grow". **3 native `<form>` elements, no vendor iframe** — they built their own forms. | **(k) `GutteredSection`** (rails as real tracks, not pseudo-elements) — a stronger version of our `.iz-railed`, and it gives §8.3 a layout. Also settles the form question: native form → webhook beats an embedded Zoho iframe. |

### 16c. Still not visited

`/blog/`, `/support/`, `/web-bot-auth/test/`, `demo.fingerprint.com/playground`, and every **instasafe.com** equivalent. Stopped here deliberately — the remaining four are lower-yield than building what the last eleven already revealed.

### 16d. Build queue — in the order I intend to work

Everything below is now spec'd off inspection, not description.

| # | Component | From | Notes |
|---|---|---|---|
| 1 | **`IzMegaFooter`** + `ReadyToBuild` band | your 15.2 · §10.7 | The `-mt-1` hairline-overlap trick is the whole look. Carries compliance/recognition marks. |
| 2 | **Mega-menu animated icons** ×4 | your "Do 11" · §C.19 | ZTNA / Device Binding / MFA / Always-On only. Uses the draw-in engine — which is now item 3's dependency, so these two land together. |
| 3 | **Draw-in outline hook** | §1.4 re-scoped | Powers the icons above and every future component SVG. |
| 4 | **Inverted band** | your "Create 1" | Built as a fixed dark band for now. Theme-inversion is deliberately deferred — you said we can think about it later. |
| 5 | **`RelatedResources` cards** | §16b (b) | Unblocks the deck link and the DLP try-it. |
| 6 | **Three-card hover family** | §5.2 | Shared shell, three different inner mockups. |
| 7 | **`HeroConsole` v2** — sleeker console + slight tilt on scroll, no tilt on mobile | your 5.1 | Tilt is scroll-linked, not cursor-linked, so the hero stays input-free. |
| 8 | **Hover tag-jump** | §5.5 | |
| 9 | **Irregular badge grid** | §5.4 | Reuses the `IzSignalGrid` coordinate engine — cheap now. |
| 10 | **`IzScrollStack`** + mobile card list | §6.4 (§6.5 *is* its responsive answer, understood) | |
| 11 | **Hover-reveal hero** | §6.2 | Corrected: you want this copied. Desktop-only reveal, static on mobile. |
| 12 | **Action grid section** | §6.6 | |
| 13 | **`GutteredSection`** | §16b (k) | |
| 14 | **`EventCalendarHero`** + `FilterableEventGrid` | §16b (i)(j) | |
| 15 | **Marquee-into-a-destination** | §7.3 · §16b (a) | FilterStream + phone/logo target. |
| 16 | **`SectionLabel`**, **`HoverBorderGradient`**, **word-span title** | §16b (c)(d)(e) | Small, shared, used by several of the above. |

---

## 17. Round 3 — the component library has three tiers now

*Your definition, adopted as the library's structure:*

| Tier | What it is | Where it lives |
|---|---|---|
| **1 · Visuals** | things that live *inside* a section — consoles, mockups, diagrams, chips, rails | `components/home2/Iz*.tsx` |
| **2 · Sections** | assembled blocks a page drops in | `components/izpages/**` and lab section demos |
| **3 · Backdrops** | what a section *sits on* — lattice, bloom, stage, inverted band | `components/home2/iz-backdrops.css` |

Everything from here gets built and catalogued against that split, and the lab now shows tier 3 on its own (`/components#backdrops`) and all three composed (`/components#scene`).

### 17a. What the video actually showed

Extracted 25 frames plus full-resolution crops. The scene is **one login flow run twice** — Fingerprint OFF (password → OTP → wait, 4 steps) then ON (recognised instantly, 2 steps) — with a console showing the API payload that made the difference. Five things make it read as sleek, and all five are now in `IzPanel`:

1. **Chrome is monospace, uppercase, letter-spaced.** Not a sentence-case title bar.
2. **The state control is a real toggle switch** — accent fill, checked knob — not tabs. It reads as *"this thing is switched on"*, which is the message.
3. **Muted window affordances** top-right (gear / kebab / close). They do nothing; they exist so it reads as a real tool.
4. **The payload overflows horizontally with a thin visible scrollbar.** Real consoles overflow. Tidied ones look like marketing.
5. **A footer meta strip** — mono status word left, target right. Gives the panel a bottom edge that isn't just a border.

And the background is **never flat**: dashed macro lattice → soft radial bloom → a bordered stage split into two tonal zones (warm narration column, cool visual column) by a 1px rule. That is the "little grid lines behind the console" — a **~220px lattice**, nothing like our 16px `iz-gridfield`.

### 17b. Built and verified this round

| Component | Tier | Files | Verified |
|---|---|---|---|
| **Backdrops** — `iz-bd-macro` / `iz-bd-bloom` / `iz-bd-stage` / `iz-bd-dashrule` / `iz-inverted` | 3 | `iz-backdrops.css` + tokens in `iz-system.css` §9 | lattice + radial mask ✓, bloom ✓, stage split gradient ✓. **Inverted band flips every token** — on a paper page it resolves `--tx` to `#f1f1f3` and paints `#0a0b0d`, with zero hardcoded hex. Turning it into a *true* inversion later is one extra rule, documented in place. |
| **`IzPanel`** + `IzJson` + `IzToggle` (00ae) | 1 | `IzPanel.tsx`, `izpanel.css` | Toggle drives label, payload and narration together: `INSTASAFE ON → "allow", factors_required 0, step 2` ⇄ `OFF → "challenge", factors_required 2, step 1`. `role="switch"`, `aria-checked` correct, focusable. Ring shadow, mono uppercase label in accent, JSON keys `--tx` / strings `--accent` / `true` `--allow`. Payload overflows with a thin scrollbar on narrow widths ✓ |
| **`IzStepRail`** + `IzChip` (00af) | 1 | `IzStepRail.tsx`, `izsteprail.css` | 2 steps, correct one active, accent rail on the right at desktop and **moves to the left edge when stacked**. Chips resolve to `--deny` red and `--allow` green. |
| **Inspector scene** | 2 | lab `#scene` + `lab.css` | Stage 2-col at desktop → 1-col at ≤900px, split rule hidden, background gradient rotates to vertical. No horizontal overflow at either width. |

**Also:** the JSON highlighter was duplicated in `IzSignalGrid`. It now lives in `IzPanel` and is imported, so the two consoles can never drift apart in colour or tokenising. `IzSignalGrid`'s console keeps only its inset-panel chrome.

Build green, 89 pages, `tsc` clean.

### 17c. Footer decision — recorded

Ship `IzMegaFooter` **as a variant, migrate page by page** (your call). `IzFooter` stays as-is and untouched; nothing migrates until you've seen the variant on one page.

---

## 18. Round 4 — the three homepage sections you screenshotted

All three built, registered and verified. Plus the draw-in hook they needed.

| # | Component | Lab | The bits that matter |
|---|---|---|---|
| **1** | **`IzUseCaseSwitch`** (00ah) — "Build safe and seamless products" | `/components#usecaseswitch` | Header owns the **left half only**; the empty right half is what makes the visual read as a second register. **Every tab has its own visual** — own outline drawing *and* own inspector rows. Verified: tab 1 → `sx_9F2ke…` / `Unmanaged · BYOD`, tab 4 → `sx_11Bq…` / `Toronto, CA · 41,200 km/h · Terminated`, and the artwork re-arms (`dash 675.9px, offset 675.9px`) then draws. **≤900px the visual is `display:none`** — exactly what they do — so all four panels force open, carets vanish and a footer CTA appears. |
| **2** | **`IzAgentScene`** (00ai) — "Not all bots are bad" | `/components#agentscene` | Three windows, middle focused, outer two `scale(.9)` on a stage that is `width: min(1440px, 118%)` so they run off the section edges. Content **reframed, not copied**: they sell agent detection, we sell access control — ours asks *who is driving this session* over three published apps. Toggle → `.blind` strips every marker and greys the windows: **same three windows, no way to tell them apart.** That is the argument. Verified toggle flips `aria-checked`, the stage class and the caption. ≤900px outer windows + floating tags drop, markers become a plain list. |
| **3** | **`IzDevBand`** (00aj) — "The original fingerprinting library" | `/components#devband` | Dark band via **`.iz-inverted`** — verified `--tx` resolves to `#f1f1f3` and it paints `#0a0b0d` **on a paper page, with zero hardcoded hex**, so it needs no dark variant. Sparkline is exactly 2 paths (gradient area + 1.5px line) like theirs, anchored bottom so copy sits on the chart. 2×2 link tiles, stats, 12-cell technology strip → 3 cols on mobile. |
| **+** | **`useDrawIn`** (`components/iz-fx/`) | used by 00ah | Their exact technique, confirmed from their DOM (`dasharray:146px; dashoffset:146px` pre-run). Works on **any** svg path. Artwork must be **stroked, not filled** — a filled shape has no outline to draw. IO-gated with a 2.5s failsafe, because the armed state is invisible artwork: a missed observer would mean a blank panel, not a missing flourish. |

**Re-scoped, as you said:** draw-in is for the component artwork we build, not the 89-image catalogue.

⚠️ **One thing to flag:** `IzDevBand`'s stats and trend are **illustrative defaults** so the component has a shape. They render a `TREND SHOWN IS ILLUSTRATIVE` line. Swap in Content Master figures before this goes on a page — I didn't want to invent performance claims.

No horizontal overflow at 1280 or 390. `tsc` clean, build green, 89 pages.

---

## 19. Round 5 — the VPN vs ZTNA diagram (§2.4 / §C.5)

`IzVpnZtnaFlow` (00ak) → `/components#vpnztna`. Closes checklist rows **2.2 – 2.6**.

Their structural moves from `DiagramSection`, all kept:

- Segmented control sits **above** the scene, so the two states read as *one object changing* rather than two things compared.
- Incoming hatched cone is **identical in both states** — the same people arrive either way, which is the whole point.
- Outgoing cone **splits into a green half and a red half only in the second state**.
- Annotations (callout box, node tags, verdict pills) **arrive with** that state, so switching feels like information appearing rather than colours changing.

Your directions, all in:

| You asked for | Built |
|---|---|
| Mixed users left, everything reachable → then department-scoped | "With a VPN" = one undifferentiated cone, apps list ends *"…and the rest of the subnet"*. "With InstaSafe" = split cone, `Allowed · role-scoped` / `Blocked · not listed` |
| InstaSafe logo at the junction like their fingerprint mark | `?` when off → orange mark tile when on. Verified it lands at viewBox **(700,280)** — the exact cone junction, dx/dy = 0 |
| Desktop L→R, more users and tools | 12 sessions, 4 apps, viewBox 1200×560 |
| Mobile top→down, fewer users and apps | 4 sessions, 3 apps, viewBox 380×600 — a smaller **cast**, so it's a separate SVG rather than a squeezed copy |
| More data in the section | Head block, in-scene labels, callout, verdict pills, app chips, and the external description box the reference puts under its band |

**Two real bugs caught and fixed during verification** (worth remembering, both are traps):

1. The overlay was anchored to the stage, which also held the caption and the incoming label. On mobile those drop into normal flow, the box grew, and **the gate floated 133px below the cone junction**. Fixed by anchoring everything to an inner `.izvz-plot` that contains only the drawing — now `plotHeight === svgHeight`, gate `dy = -1`.
2. `LogoMark` auto-detects the nearest `[data-theme]`, but `.iz-inverted` flips *tokens* without setting that attribute — so on a paper page it picked the **colour** mark and put orange on an orange tile. Pinned with `forceTheme="dark"`.

Verified: desktop gate exactly on junction, callout/verdicts/apps at the right viewBox rows; mobile plot == scene, caption static below, 9 dots vs 26. No horizontal overflow at either width. `tsc` clean, build green, 89 pages.

---

## 20. Round 6 — the process section with progress bars (§3.2 / §C.6)

`IzScoreProcess` (00al) → `/components#scoreprocess`. Closes checklist row **3.2**.

**The progress bars are the layout.** Two step tabs sit above the stage and two below it — read top-left → top-right → bottom-left → bottom-right and the four tracks form **one continuous progress bar wrapped around the animation**. Done steps stay filled, the live one is filling, the rest are empty, so the chrome says where you are with no number and no dots. The bottom row uses `column-reverse` so its labels sit *under* their tracks and the ring closes properly.

The fill is also the **clock** — a CSS animation whose end advances the step, so the thing you can see is the thing that's counting. One subtlety: the `animationend` listener lives on a single invisible `.izsp-clock` span rather than on each fill, otherwise two animating tracks could double-fire an advance.

**Our four steps** (their fraud-model flow → our adaptive-risk flow):

| | Step | Scene |
|---|---|---|
| 01 | Import your access logs | dashed accent dropzone, `access-logs.csv` chip dragged in |
| 02 | Baseline builds automatically | faint data field + file card + `Processing` spinner |
| 03 | Review suggested weights | 4 rows rising in: Impossible travel 7→9, Unmanaged device 7→8, MFA retries 6→8, New geography 5→6 |
| 04 | Enforce with one click | rows dim, orange `Apply new weights` button + cursor |

Verified: media in the panel is **svg only — no canvas, video or images**, matching their build. Layout 1.62fr panel / 1fr info-cards, same proportion as theirs. Tabs sit above *and* below the stage. Clicking a tab jumps and the fills accumulate correctly (`done/done/live/todo`). Hover pauses (`clockRun 1 → 0 → 1`). Section stays **fully visible on mobile** — one of the few they don't strip.

**Three bugs caught in verification:**

1. Every step label was **ellipsing on mobile**. The label *is* the content here, so it now wraps instead of truncating — clipped labels went from 4 to 0.
2. The live fill would read as **instantly complete** if its animation never started (blocked, or an engine that skips it). Now explicitly `transform: scaleX(0)`, verified as `matrix(0,0,0,1,0,0)` with animation disabled.
3. Hover-pause used React's `onPointerEnter`/`onPointerLeave` — synthesised from over/out, and a missed leave would strand autoplay paused. Switched to native listeners, same fix as `IzDevBand`.

**Note on autoplay:** it does not advance inside the preview pane, whose animation clock is frozen (same reason transitions never complete there). The mechanism is the one already shipping in ScrollSteps (00o), and stepping through by clicking verified every state transition. Worth one glance in a real browser.

`tsc` clean, build green, 89 pages, no horizontal overflow at 1440 or narrow.

---

## 21. Round 7 — the whole fingerprint-pro page (§6.1–6.7)

`IzProHero` + `IzProStack` (00am) → `/components#propage`. Closes checklist rows **6.1–6.6**, including **6.2** which you corrected me on — the hover-reveal hero *is* copied.

**Which page content fits:** our `/platform` overview. Their install → identify → signals → suspect score maps 1:1 onto **connect → verify → enforce → prove**, which is genuinely our product truth, not a costume.

### Hero
Verified on their build: **0 images, 0 SVG, 0 canvas, 0 video.** A real grid of cells with a few shaded, plus absolutely-placed cards. Ours matches — 96 cells, 16 shaded, 6 verdict cards, all from config.

The conceit is a design tool's canvas: selection rectangle with corner handles around the whole hero, the headline as a *selected object* with a label tab, a live coordinate readout, and cards that light as the cursor nears them. Verified: readout tracks `X:0087 Y:0058` → `X:0544 Y:0363` → `X:0925 Y:0616`, proximity lighting picks up 2 cards at top-left and 2 at centre, leave clears everything, touch pointers ignored.

Doctrine-compliant: the hover is decoration and **never a gate**. Headline, sub and link are static and carry the whole message. On touch the readout and scattered cards are *removed*, not just disabled — they need a canvas to be scattered on.

### Stack
Measured from their `PlatformSlider`: `sticky; top:0; height:720px` inside an `8496px` wrapper, four absolute slots, and the **incoming slot carries the higher z-index and rises over the outgoing one**. The outgoing card never leaves first — that overlap is the whole reason it reads as seamless rather than as a slideshow.

Verified the interpolation with `--local` driven manually:

| `--local` | next slot |
|---|---|
| 0 | `translateY(640px)`, opacity 0 |
| 0.25 | `480px`, 0.25 |
| 0.5 | `320px`, 0.5 |
| 0.75 | `160px`, 0.75 |
| 1 | `0px`, 1 |

**A real flaw caught here:** with a naive linear mapping, slide 1 begins leaving the *instant* you enter the section and never gets a still moment. Added a `HOLD = 0.55` constant — each slide is still for 55% of its scroll, then hands over. Now 1260px per slide, 693px of it still.

### Mobile
The scroll mechanism is **removed, not shrunk** — `display:none` on the stack, a plain static list renders instead, exactly as their `mobileList` does. Verified: 4 cards, 4 panels, 4 asides, correct eyebrows, hero cards + readout gone, zero clipped text, no horizontal overflow.

### Built to be cheap to change (your ask)
All content is data in **`components/izpages/pro/pro.config.tsx`**. A new slide is **one object** appended to `SLIDES` — the counter, the progress rail, the stack and the mobile list all read its length. Panels are a closed union (`code` / `table` / `record`) rendered by a single component, so a slide never needs hand-written JSX. Two scroll tunables (`--dwell`, `--sticky-h`) sit at the top of `.izpro-outer`.

### One deliberate deviation
The hero's pointer tracking uses **no rAF**. `pointermove` is already coalesced to one event per frame, card centres are cached as stage-relative offsets (a ResizeObserver invalidates them, so no scroll listener is needed), and only the stage's own rect is read per move. The first version used rAF and I found it dead in the preview pane — rAF gets throttled to zero in background tabs and some embedded webviews, which would silently kill the readout. The stack still uses rAF, correctly: scroll-driven animation has no cheaper option, and if rAF is throttled the section isn't visible anyway.

`tsc` clean, build green, 89 pages.

---

## 22. Round 8 — the two hover-animation sections (§5.2 / §6.6)

`IzUseCaseGrid` + `IzAgentCards` + the `IzMocks` library (00an) → `/components#hoveranims`. Closes **§5.2** and **§6.6**.

### The sub-components are the point

Five mocks in `IzMocks.tsx`, and each has **one specialty — the specialty *is* the argument it makes:**

| Mock | Specialty |
|---|---|
| `welcome` | **Resolution.** Arrives already recognised; nothing is asked. The animation is over before it starts, which is the message. |
| `challenge` | **Escalation.** A challenge appears and is answered. Forward, but interrupted. |
| `loop` | **Repetition that never resolves.** Cursor clicks, field rejects, it starts over. It must *not* succeed — a loop that resolved would say the attacker got in. The only `infinite` animation in the file. |
| `verify` | **Progress to a verdict.** A bar fills, an identity resolves, a green line lands. |
| `inspect` | **Inspection.** Something examined in place, with a finding surfacing over it. |

### Motion contract

Every animation is declared `animation-play-state: paused`; only an ancestor carrying `.is-live` starts it, and the sections set that on hover **one at a time**. Three looping mock-ups at once is noise and none of them gets read. Verified: at rest all animations `paused`; hovering cell 2 → its 8 animated elements `running`, cells 1 and 3 still `paused`.

Reduced motion **and** ≤900px freeze every mock at its **end** state, never mid-way, so it still reads as a finished thought.

### The grid's hover continues the hero — verified

Hovering a cell draws the same accent selection the hero puts around its headline. Measured end state with transitions disabled:

- selection outline opacity `1`, four corner handles
- **`.iz-gridfield` lit at `accent 38%`** — the orange grid
- cell background `accent @ 4%`, footer label `rgb(242,72,10)`

It reuses `.iz-gridfield` from `izgrid.css` rather than inventing a texture, which is what makes it read as the *same surface* as the hero rather than a lookalike.

### Mobile
Grid and cards both go single-column, **all mocks static at their end states**, selection chrome dropped entirely rather than parked on one arbitrary cell. Verified: every `animationName: none`, progress bar `scaleX(1)` (full, not empty), verdict chips at opacity 1, zero clipped text, no overflow.

### The bug worth recording

I reached for React's `onPointerEnter`/`onPointerLeave` again — **the fourth component to hit this**. Those events don't bubble, React synthesises them from over/out, and a missed `leave` strands a card permanently hovered, which here means an animation looping forever on a card the cursor left.

Fixed durably: `useHoverIndex.ts` — one delegated `pointerover`/`pointerout` listener per container, with the `relatedTarget` guard so moving between a cell's own children isn't read as leaving it, plus `focusin`/`focusout` for keyboard parity. Verified: hover switches cleanly, inner-child moves don't drop the cell, leave clears, `focusin` lights the same cell hover does.

*(Two measurement notes, so the numbers aren't misread later: elements with no animation report `animation-play-state: running` by default — filter on `animationName !== "none"` before counting. And programmatic `.focus()` sets `activeElement` but fires no focus event while the pane's document is unfocused, so keyboard parity had to be proven with a dispatched `focusin`.)*

Content is data in `sections.config.tsx`; mocks are referenced **by key**, so the config never imports JSX and a new mock is available to both sections at once.

`tsc` clean, build green, 89 pages.

---

## 23. Round 9 — two fixes and the use-case-page workhorse

### Fix 1 · Animations reset on hover-out instead of sticking

They were declared outside `.is-live` with `animation-play-state: paused`, so leaving froze each mock wherever the cursor happened to be and the next hover **resumed from that stuck position**.

Now every animation is declared **inside** `.is-live`. An animation that only exists while live is *removed* on hover-out, so the element snaps back to its finished still and the next hover replays from frame zero. Verified:

| | animated elements |
|---|---|
| idle | **0** — the animations don't exist |
| hover | 3 · `izm-reject`, `izm-press`, `izm-try`, all `running` |
| leave | **0 — removed** |
| re-hover | present and running again, from the start |

The corollary is what makes the stills correct: **every element's unanimated state must already be its finished state.** So `.izm-progress i` now has a base of `scaleX(1)` with the keyframe running `from scaleX(0)` — verified idle as `transform: none` (a full bar, not an empty one) and verdict chips at opacity 1. Mobile and reduced-motion stills come free, because there is no animation to switch off.

### Fix 2 · The gridline touching text — fixed once, in the main CSS

You were right that it needed fixing at the source. The cause: above ~1256px the rails sit outside `.iz-wrap`'s gutter and there's a natural gap, but below that `max()` clamps them to exactly `--wrap-gutter` — which *is* the wrap's padding edge — so the first character of every line lands on the dashed line. **I'd patched it three times per-component before finding the cause.**

One rule now, in `izgrid.css`:

```css
.iz-railed .iz-wrap { padding-inline: calc(var(--wrap-gutter) + var(--rail-inset)); }
```

with `--rail-inset` as a token in `iz-system.css` §9 and `.iz-railed--flush` to opt out. The three per-component patches are deleted.

**Verified at 1180px — the worst-case width — across every railed section on the page: minimum gap 52px, zero touching.** Previously several sat at 28px, i.e. on the line.

| section | gap to rail |
|---|---|
| izuc / izas / izvz / izsp / izpro / izac / izh | 52px |
| izdb | 92px · izug 130px · izts 85px (their own inner padding on top) |

### New · `IzTabSwitch` (00ao) → `/components#tabswitch`

The layout that repeats across nearly every fingerprint use-case page — copy and CTAs left, three tabs beneath, panel right that swaps with the tab. **Both screenshots are one component.**

**`variant="console"`** — permanently dark in a window frame. Dark isn't a theme choice here (a terminal is dark wherever it runs), so it pins `.iz-inverted`: verified `#0a0b0d` background and `--tx: #f1f1f3` **on a paper page, with no hardcoded hex**. Tabs pick a signal; the panel shows its payload with its own outcome sub-tabs. Verified: switching outcome flips `"decision": "deny"` → `"allow"`; switching tab resets the outcome and loads the right payload (`impossible_travel`).

**`variant="resource"`** — theme-aware and gridded. The tab swaps **both** the left copy and the right visual. Verified across all three: kicker `Guide:` → `Case study:` → `Tutorial:`, artwork `tone-c` → `tone-a` → `tone-b`, byline `Evelyn Chea` → `Priya Menon` → `Arjun Rao`.

Which parts swap **falls out of the data, not the code**: a tab carries a `copy` block when the left column should change with it, and omits it when the left column is fixed. Panels stay mounted and toggle with `hidden`, so switching costs no remount and the JSON isn't re-tokenised per click. Arrow keys move between tabs with roving `tabIndex`.

Mobile: both variants single-column, tabs one-per-row left-aligned — three labelled tabs can't share a phone row and truncating would hide the only thing naming each panel. Console stays dark, artwork goes 16:10, all mocks static, zero clipped text, no overflow.

⚠️ The resource artwork is a **placeholder** — an abstract gradient card. Real illustrations drop straight into `<Story>` when they arrive.

`tsc` clean, build green, 89 pages.

---

## 24. Round 10 — console gap fix + two light blocks

### Fix · Console CTAs were touching the tab row

You were right, and it was my miss. `.izts-head` had `flex: 1` and nothing else — whenever the column had no slack to distribute, the CTA buttons and the tab row collapsed into one undifferentiated stack. They're two different kinds of control and must not read as one. Added `padding-bottom: var(--sp-10)`. **Verified 40px at both 1280 and 390.**

### `IzLogoGrid` (00ap)

Copy and CTA left, ecosystem lattice right, logos in *some* cells with the rest empty — same coordinates-as-data engine as `IzSignalGrid`, and the gaps are what stop it being a logo wall. One cell isn't a logo but a full-width copy strip **set into** the grid at row 3; that interruption is what keeps the right side from reading as decoration. The headline's last word takes the accent, so the sequence lands on the one verb that is the point.

**A real bug caught in verification:** the grid rendered **7 rows instead of 4**. The backing cells were auto-placed, and auto-placement steps *around* coordinates already claimed by the logos — so the cells spilled into implicit rows and the grid outgrew its own declaration. Fixed by placing every backing cell explicitly from its index. Verified: 4×4, uniform 123px rows, grid height 491px matching the left column exactly.

Mobile: placed coordinates stop meaning anything, so everything flows — **two columns, not four**, because four forces every wordmark to wrap.

### `IzTestimonial` (00ap)

The oversized quote mark sits **behind** the block and is clipped, not beside the text — at 280px it's texture, so it's `aria-hidden`. The case-study hand-off is a **tinted band rather than a trailing link**, because it has to read as "there is more" — that's the job the section is doing.

### ⚠️ Placeholder content in both — and one thing to correct

Wordmarks render as **text, not artwork**, deliberately: nothing ships as a broken-asset box while real partner logos are outstanding.

The quote is attributed by **role and organisation only, with no invented person's name**. A fabricated human on a testimonial is a claim, not lorem ipsum.

**Correction to flag:** `IzTabSwitch`'s resource variant (round 9) *does* carry invented author names — Priya Menon, Arjun Rao, Evelyn Chea. I should have used role-only attribution there too. They need replacing with real approved names or reducing to roles before that component ships.

`tsc` clean, build green, 89 pages, no overflow at 1280 or 390.

---

## 25. Round 11 — converge visual + events hero

`IzConverge` + `IzEventsHero` (00aq) → `/components#converge`. Also closes **§8.1**'s design (the events hero was the one piece that had a feasibility answer but no shape).

### `IzConverge` — kept cheap, as asked

Signal chips drift in from the left, converge on the mark, and one orthogonal circuit run carries the result out to a session ID.

Chips are DOM with a single staggered CSS drift each (6 chips, 6 distinct delays — verified). The wiring is **one static SVG of straight segments**: 4 paths, 5 nodes, no path maths and no per-node animation. The argument is "many inputs, one identity out" and that reads from the composition alone — animating the wiring would have cost more without meaning more.

### `IzEventsHero`

Week calendar as backdrop, title card floating over it. **The entrance order is the trick, and it is backwards from the obvious one** — verified `card 0s → grid 0.3s → events 0.7s`. Leading with the calendar would make the reader parse a schedule they have no reason to care about yet; leading with the title tells them what they're looking at, and the calendar then assembles underneath as evidence. Plain animation-delays, no JS.

Desktop: 10 columns (label + 9 days), 7 rows (header + 6 hours), 54 cells, 5 events, card overlaying.

### Two grid bugs caught — both recur with explicitly-placed grids

1. **`:nth-of-type()` counts every sibling of that tag, not every sibling with that class.** Every child of the calendar is a `<span>`, so `.izev-hour:nth-of-type(n+5)` matched almost everything and **hid all six hour labels** on mobile. Now keyed off `data-row`.
2. **An item spanning past the narrow layout's row count spawns implicit tracks** and stretched the grid to 7 rows where 5 were declared. Overflowing events are now marked in the TSX (`data-overflow="sm"`) and dropped rather than clipped.

Verified after the fix at 390: 6 columns, **5 rows**, 5 days, **4 hour labels visible**, 20 cells, only the events that fit, no implicit tracks, no overflow. `SM = {days, hours}` in the TSX is the single place to keep in step with the media-query grid-template.

`tsc` clean, build green, 89 pages.

---

## 26. Round 12 — hero-scale events card, marquee converge, and a silent padding bug

### The padding bug — the real cause of "text sticking to the sides"

Chasing your padding note found something bigger than the one card. **The spacing scale has no `--sp-7`** — the steps are 1 2 3 4 5 6 8 10 12. I'd used `var(--sp-7)` in **five places across two files**, and every one of them had been rendering **`padding: 0`** the whole time:

| file | rule |
|---|---|
| `converge.css` | `.izev-card` (mobile) — the one you spotted |
| `sections.css` | `.izug-copy` |
| `sections.css` | `.izug-cell` |
| `sections.css` | `.izac-card` |
| `sections.css` | `.izac-card` (mobile) |

The reason it was invisible: an undefined `var()` makes the whole declaration **invalid at computed-value time**, so it computes to `0` — it does **not** fall back to the earlier valid rule in the cascade. So the padding didn't shrink, it vanished, with nothing in the console.

This is a **second, separate cause** from the rail-inset issue fixed in round 9. That one was the rails landing on the wrap's edge; this one was components with no padding at all. Both presented identically as "text touching the edges", which is why round 9 didn't fully fix what you were seeing.

All five replaced with real steps. Verified afterwards: `.izug-copy` `24px 20px`, `.izug-cell` `24px 20px`, `.izac-card` `32px 20px 40px`, events card `48px` — **zero elements left with `padding: 0`** except `.izts-head` in the console variant, which is correct (its parent does the padding).

A warning now sits at the scale definition in `iz-system.css` so this can't recur silently.

### Events card — now treated as a hero

It carries the page's H1 and was sized like a caption. Title `--fs-h1` → **`--fs-hero`** (64px at 1280, 42px at narrow), sub `--fs-body-sm` → **`--fs-lead`** (18px), kicker up to `--fs-body-sm`, card 520 → **640px**, padding now `clamp(--sp-8, 4.5vw, --sp-12)` = **48px** with text starting 48px from the card edge.

### `IzConverge` — rebuilt as a marquee

Now uses FilterStream's (00q) mechanism as you asked: each row's track holds its chips **twice** and translates exactly `-50%`, so the loop is seamless.

Verified: 3 rows, **8 chips per track** (4 × 2), **all `reverse` — one direction, toward the mark**, durations 34s / 27s / 40s so the rows never lock into one moving block, track wider than its row (so it genuinely scrolls), and the feed masked at its trailing edge so chips dissolve into the mark rather than sliding under it. The circuit stays the static SVG — 4 segments, unchanged.

Below 900px the wire and the result chip are dropped (they need horizontal room a phone hasn't got) and the intake becomes the whole visual, still flowing into the mark.

`tsc` clean, build green, 89 pages, no overflow at 1280 or 390.

---

## 27. Round 13 — the sazabi outcomes skeleton

`IzOutcomes` (00ar) → `/components#outcomes`. One reusable section, demoed twice to prove the mirror.

### Three things I treated as load-bearing

1. **The three outcomes are not cards.** No border, no background, no padding box — verified `border: 0`, `background: transparent`, `padding: 0`. Boxing them would turn a conclusion into a feature grid, which is a different (and weaker) claim.
2. **The connector is the argument.** A line drops out of the visual, meets a rule, and that rule feeds the three columns — it asserts *these three follow from that*. That's why it's drawn rather than simply present.
3. **The side alternates.** Verified across the two instances: visual left of copy in the first, right in the second. Without this a page of these becomes the same slab four times.

### The animation you asked for

Verified end-to-end — IO fires, every element reaches its target, and the sequence cascades:

| step | delay / duration |
|---|---|
| drop draws down | `0s / 0.42s` |
| **rule draws outward from centre** | `0.3s / 0.72s` |
| three feeds drop | `0.9 / 0.96 / 1.02s` |
| outcomes rise | `1.0 / 1.11 / 1.22s` |

The rule's `transform-origin` measured **544px on a 1088px rule — exactly centre**, so it genuinely opens both ways.

**Why centre-out matters:** it reads as *distribution* — one source feeding three. A left-to-right wipe would read as a loading bar, which is the opposite claim. Same reason the feeds fire after the rule reaches them rather than alongside it.

Pure CSS transforms behind one IntersectionObserver, with the failsafe — the connector starts at scale 0, so a missed observer would leave the section visibly broken, not merely unanimated.

### Their look, our language

Their neon-on-black is `.iz-inverted` (a token flip — correct on either page theme, no hardcoded hex) plus our accent glow via `text-shadow` at 42%. The headline reaches their condensed-caps register with the display face at its heaviest, uppercase, `-0.03em` tracking — **no second typeface and no borrowed red**. Verified rendering at 82px, `rgb(255,106,44)`, uppercase, on `#0a0b0d`.

Below 900px the connector has nothing to fan to once the columns stack, so the rule and feeds are dropped and it becomes a single short drop — the claim survives, the diagram stops pretending.

### Reusable, as you intended
`side`, `tag`, `title[]`, `sub`, `visual` and three `outcomes` are all props; the visual is a slot, so it takes any tier-1 component. The two lab instances pass `IzConverge` and `MockVerify`.

*(Build note: `tsc` failed once on a corrupt `.next/dev/types/routes.d.ts` — the running dev server writing it while the build read it. Not a code fault; stopped the server, cleared `.next`, rebuilt clean.)*

`tsc` clean, build green, 89 pages, no overflow at 1280 or 390.

---

## 15. Open questions for you

*Answered in your round-2 message: inverted band → build it, think about inverting later. Footer → build as a component. Endpoint DLP → hold. Page-visit gap → closed for 11 of the pages, see §16b.*

Still outstanding:

1. **§7.8 FeatureHub enrichment** — I have now tried twice and the "Why Fingerprint" visual renders as an **empty `<div>`** in this browser, with no console or network data available to explain it. Either describe what you liked about it, or send a screen recording, and I'll match it. It's the one item in the brief I genuinely cannot inspect.
2. **§10.7 footer scope** — replace `IzFooter` site-wide, or ship `IzMegaFooter` as a second variant and migrate page by page? (Their footer is 1642px — that's a big change to land everywhere at once.)
3. **§0.3 / §0.5 skills** — `design-taste-frontend` and `review-animations` aren't installed under those names. Want me to run `taste-skill:taste-skill` and `improve-animations` over the components once the queue in §16d is built?
