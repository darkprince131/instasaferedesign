# InstaSafe Website — Build Handoff (v2)

Context for continuing in a new chat. Read this first, then `MEMORY.md` index at
`C:\Users\Darkprince131\.claude\projects\C--Instasafe-Webdesign\memory\`.

---

## Project
- **Path:** `C:\Instasafe Webdesign\`
- **Stack:** Next.js 16 (App Router, Turbopack) · TypeScript · Tailwind v4 · Framer Motion · Phosphor Icons
- **Dev:** `npm run dev` → http://localhost:3000 (use Claude Preview `preview_start` name `dev`, not Bash)
- **Verify after edits:** `npx tsc --noEmit -p tsconfig.json` then `npm run build` (87 static pages, all prerender)
- **Deps:** framer-motion, @phosphor-icons/react, gsap, three/fiber/drei, d3, lottie-react, react-countup, simple-icons, clsx, tailwind-merge. (lucide-react is in package.json but version looks unreliable — use **Phosphor**.)

## ⚠️ Known environment quirks
- **Preview screenshots wedge** mid-session (renderer hangs on capture; freezing animations/pausing does NOT help; recovers only on full `preview_stop`+`preview_start`). `preview_eval` keeps working — **verify via DOM probes + computed styles + `npm run build`** instead of relying on screenshots.
- Pre-existing benign console error: `layout.tsx` injects JSON-LD via `<script>` in `<body>` → React 19 logs "Encountered a script tag while rendering". Harmless; can move to `<head>`/metadata to silence.
- Windows: no `python`/`pandoc`/`extract-text` in PATH. Read docx via PowerShell unzip + regex; xlsx via Excel COM. Node is available.
- `C:\` is **NOT a git repo** — no commits.

---

## TWO design systems live in this repo (decision pending)

### A. v3 system (original, dark/blue) — `html[data-theme="dark|light"]`, localStorage `theme`
- Tokens in `app/globals.css`: `--bg-base`, `--accent-blue`, `--text-primary`, etc. `--db-*` for console palette.
- Used by: all `/platform/*`, `/zero-trust-*`, scaffold pages (`ScaffoldPage.tsx`), `NavV3` mega-menu, `Footer`, `/v2`, `/console`, MFA/IAM/SSO/Always-On/Device-Binding bespoke pages.

### B. Balanced system (NEW, dark/paper, orange) — being trialled, candidate to replace A
- Spec: `InstaSafe_Design_Guide.md` (user's Downloads). **Fully isolated**: all CSS scoped under an `.iz` wrapper; own attribute `.iz[data-theme="dark|paper"]`; own localStorage key `is-theme`. Does NOT touch system A.
- Files: `components/home2/home2.css` (tokens + base components), `Home2.tsx` (the homepage), plus per-component CSS.
- Fonts: Space Grotesk (display, **weight 300**) + IBM Plex Mono (data) via next/font in the route's `page.tsx`; Inter (body) from `layout.tsx`. `<html>` has `suppressHydrationWarning` (theme boot script).
- **Rules (differ from A!):** product name **"InstaSafe ZTNA"** publicly (NEVER "i365"). Themes **dark/paper** (not dark/light); paper = warm off-white + real AmpleMarket pastels. Display Space Grotesk 300, orange `<em>` emphasis word weight 400, NEVER bold headlines. IBM Plex Mono = ONLY for eyebrows/stats/chips/console labels. Single accent **orange** (#FF6A2C dark / #F2480A paper). Green `--allow`/red `--deny` = semantic only (access states), never decoration. NO drop shadows in dark (use `--inset` hairline). Pills 999px, panels 14px, console/bento 12px. Section pad 96px (final CTA 120px), max 1200px / 28px gutters.
- **Decision pending:** "after components done, switch to blue (A) OR orange (B)." Build new components on `.iz` tokens so a theme swap = changing token values only.

---

## Routes / pages (87 total in build)
| Route | What |
|---|---|
| `/` | **NEW Balanced homepage** (`Home2.tsx`) — flagship. Dark/Paper toggle. |
| `/components` | **Component Lab** (`components/components-lab/ComponentsLab.tsx`) — gallery of every reusable Balanced component, dark/paper switch. Like `/console`. Jump-nav. `robots: noindex`. |
| `/v2` | old v3 flagship home (system A) |
| `/console` | v3 dashboard component gallery (system A) |
| `/multifactor-authentication`, `/zero-trust-features/always-on`, `/zero-trust-features/single-sign-on`, `/zero-trust-features/device-binding`, `/platform/iam`, `/zero-trust-network-access` | bespoke v3 pages at correct sitemap URLs. ztna/sso/device-binding were MOVED here from old `/platform/*` & `/features/*` paths (308 redirects in `next.config.ts`). |
| `app/[...slug]` | **catch-all** → `ScaffoldPage` for every other sitemap URL from `lib/site.ts` registry (`generateStaticParams` + `dynamicParams=false`). |

URL/sitemap rules + scaffold mechanics: memory `project_seo_urls.md`. **Sitemap is SEO-locked — never rename existing URLs; can ADD pages.**

---

## Balanced homepage (`/`) — section order in `Home2.tsx`
Nav · **Hero** (plain tagline "The right people get in. Everyone else stays out." + access-decision console) · **CapabilitiesDeck (C1)** · **Platform indexed rows** · **WithWithout / "How it works" (C2/C14)** + stat band (72%/500k/150+/$2 count-up) · **live activity-log console** · **pastel industries grid** · **comparison toggle** (vs VPN/Zscaler/Fortinet) + CTA · **live device-posture panel** (local navigator read, nothing sent) · **testimonials** · **pricing** · **final CTA** · **footer**.

## Reusable Balanced components built (`components/home2/`, also in `/components` lab)
1. **CapabilitiesDeck (C1)** — `CapabilitiesDeck.tsx` + `capabilities.css`. NetBird-style PPT explainer: 6 feature tabs (Replace your VPN / One identity / One login / Stronger sign-in / Smart rules / Works everywhere) auto-advance 7s w/ progress bar; each swaps an interactive console (left) + plain bullets (right) + **CTA per slide** (feature page + Book a demo). Hover-pause, prev/next carets, reduced-motion. **Phosphor icons.**
2. **WithWithout / "How it works" (C2/C14)** — `WithWithout.tsx` + `withwithout.css`. ONE flow diagram (person → check identity+device → one private door → one app lit, others dark/locked, attacker blocked). Toggle **"Plain English" ⇄ "Show the tech"** only swaps labels/bullets, NOT the picture. CTA. (Reworked from earlier castle-vs-zerotrust 2-diagram version per plain-language rule.)
3. **UnificationSlider (C29)** — `UnificationSlider.tsx` + `unification.css`. Before/after reveal: **SAME 12 capability boxes, same grid, in BOTH layers** (verified overlay-aligned). Bottom = each box coloured by the separate product managing it (blue VPN / purple Identity-SSO·MFA / teal Device-MDM / pink Privileged-access / amber Logs-SIEM) with product tags; top = same boxes all orange "Available in InstaSafe". **Colour-coding legend above.** Draggable handle (pointer + keyboard `role=slider`, ←/→), `clip-path: inset(0 0 0 var(--pos))`. Below: "up to 70% lower cost" + stack-of-tools-vs-InstaSafe table (reuses `.iz-cmp`). **In lab only — NOT on homepage yet.** Vendor multi-hue = intentional exception to single-accent (fragmentation is the message); avoids semantic green/red.

Lab also has specimens: foundations (tokens/pastels/type scale), buttons & chips, nav, panels & console, platform rows, pastel grid, bento, comparison, pricing, testimonials, live posture.

---

## ⭐ PERMANENT RULE (memory `feedback_homepage_plain_language.md`)
**Homepage = plain language, NO jargon, CTAs everywhere.** Visitors may want "a VPN replacement" and not know "ZTNA". Speak to problems/outcomes they recognise; hide the technical layer. Don't open with ZTNA/mTLS/SDP/posture/drop-all. CTAs in every major section + every deck slide. Toggles must simplify, not add load. **Deeper pages (`/platform/*`, features, compare) CAN be technical.** All homepage copy + deck + console labels already de-jargoned this session.

---

## Source-of-truth docs (user's Downloads — NOT in repo)
- `InstaSafe_Design_Guide.md` — Balanced spec (**have it; in memory**)
- `instasafe-homepage-balanced.html` — approved visual source of truth (**NOT yet provided** — ask for it; current build is from the guide + content)
- `InstaSafe_Website_Content_Master.docx` — copy/H1s/numbers (**captured** → `project_content_master.md`)
- `InstaSafe_Component_Content.docx` + `InstaSafe_Component_Page_Guide.docx` — C1–C40 catalog (**captured** → `project_component_catalog.md`)
- `Instasafe Website Sitemap.xlsx` — live URLs (**captured** → `project_seo_urls.md`)
- Not yet provided: `InstaSafe_FINAL_MasterPrompt_v2.md`, `InstaSafe_Page_Stories.md`, `InstaSafe_ScrollAnimation_Pattern.md`, `InstaSafe_Dashboard_UI_Spec.md`, `InstaSafe_Site_Blueprint.md`.

## Key proof numbers (memory `project_content_master.md` — use exactly)
500,000+ devices · 150+ companies · 100+ Fortune 2000 · $2/user/mo platform ($1 SSO, $1 MFA) · 25 device checks · 7 app types · 8 DB drivers · 6 MFA methods · 8 auth profiles · 202 event types · 7 SIEM formats · up to 70% TCO cut · 50,000 users/2,000 branches (Gov PSU on-prem) · 65,000 users in 5 days (BPM).

## Honesty guardrails — don't claim until Product confirms
Screenshot/print/keylogger DLP · FIDO2-passwordless end-to-end · DB-access GA (Oracle/Elasticsearch beta, ClickHouse/MongoDB alpha) · auto-suspend · device-policy push.

---

## Memory index (`MEMORY.md`)
- `project_seo_urls.md` — sitemap URLs (locked), URL corrections done, scaffold system
- `project_component_catalog.md` — C1–C40 components + build priority
- `project_content_master.md` — H1s, proof numbers, brand voice, pricing
- `project_design_language.md` — Balanced system, component status (C1/C2/C29 done)
- `feedback_homepage_plain_language.md` — ⭐ the permanent plain-language rule

## Session behaviour notes
- User runs `/ui-ux-pro-max <args>` each turn — treat args as the task.
- "Caveman mode" active (terse replies); code/docs written normally.
- User values: plain homepage, interactive "explain it" centrepieces, CTAs everywhere, theme-portability (build on tokens), better icons (Phosphor; swap library if one fails), accessibility, reduced-motion, performance.

## Likely next tasks
- Build more C1–C40 components into the lab (priority: C14, C2, C20, C23, C9 — some done). User may give a canonical "tools InstaSafe replaces" list to snap UnificationSlider boxes/legend to.
- Possibly drop UnificationSlider onto the homepage.
- Eventually: pick blue (A) vs orange (B), then roll chosen system across all pages + nav.
- User said "work on components later" — focus is the reusable component library in `/components`.
