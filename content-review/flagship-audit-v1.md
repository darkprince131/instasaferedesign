# Flagship Candidate Audit — 10 posts

**Companion to** `ghostheadlesscoworkbrief.md` (v2). Does not supersede it.
**Date:** 11 Aug 2026 · **Method:** live fetch of the 10 supplied URLs plus
`/blog/`, `/blog/rss/`, `robots.txt`, and all four Ghost sitemaps.
**Confidence key:** ✅ verified on the live site · ⚠ needs Content API or raw-HTML check · ❌ contradicted

---

## 0. The short version

Three things came out of this that change work, not just confirm it.

1. **The duplicated-title-line bug is not there.** Zero of ten posts open by
   repeating their own title, and zero of the first three index cards stutter.
   The Phase 1 script written against that assumption would have run across 354
   posts looking for something that is not present — and a loose
   "delete the first line if it resembles the title" heuristic would have
   deleted real opening paragraphs. See §2.
2. **The taxonomy already exists — 15 tags — and it is the wrong axis.**
   The brief assumes a near-empty tag set. In fact Ghost has 15 live tag
   archives, all technology/product-oriented (SASE, SDP, microsegmentation,
   VPN alternative…). None are industry verticals. The Phase 1 pass is
   therefore an *additive second axis*, plus a merge/retire decision on the
   existing 15 — a materially different job from tagging from scratch. See §6.
3. **Three author archive URLs are live and in the sitemap**, including a
   default `author/ghost/`. The brief says "single author, do not build author
   archives" — correct as a build decision, wrong as a migration decision.
   Dropping them 404s three indexed URLs. See §7.

Everything else below is the corpus-level detail that determines what the one
post template and one prose stylesheet actually have to carry.

---

## 1. Corpus facts established

| Fact | Value | Source |
|---|---|---|
| Ghost version | 5.89 ✅ | RSS generator string — matches brief |
| Total posts in sitemap | ~354 ⚠ | `/blog/sitemap-posts.xml` — brief says "300+"; confirm exact count via Content API |
| Oldest post `lastmod` | 2021-11-12 ✅ | sitemap-posts |
| Newest post `lastmod` | 2026-03-10 ✅ | sitemap-posts |
| Live tag archives | 15 ✅ | `/blog/sitemap-tags.xml` |
| Live author archives | 3 ✅ | `/blog/sitemap-authors.xml` |
| Index page size | 25 cards ✅ | `/blog/` |
| Pagination path | `/blog/page/2/` ✅ | `/blog/` |
| Trailing slash on all post URLs | Yes ✅ | sitemap-posts |
| Feed path | `/blog/rss/` ✅ | valid RSS 2.0, 14 items, full `content:encoded` HTML |
| Feed title / channel link | "Zero Trust Blog" / `https://instasafe.com/blog/` ✅ | must be reproduced exactly |
| `robots.txt` | `User-agent: *` / `Disallow:` / `Sitemap: https://instasafe.com/sitemap.xml` ✅ | see §7 — blog sitemap is not declared |
| Root `sitemap.xml` | Flat list of 89 main-site URLs; **no reference to any blog sitemap** ✅ | confirms the gap above |

---

## 2. Brief §2 assumptions, tested

| Brief claim | Result | Evidence |
|---|---|---|
| Post bodies are plain HTML — `h2`, `h3`, `p`, `ul` | **Partly ❌** | Also present: ordered lists (6/10), code blocks (1/10), inline raster CTA banners (7/10), a hand-built related-posts block (1/10). No `h4` observed; H3 is the deepest level. |
| No Koenig cards, embeds, callouts, bookmarks | ✅ | None observed in any of the 10. |
| Only the feature image at top | **❌** | 7 of 10 carry an inline `Book-A-Demo-N.png` banner mid-body. One post (`what-is-basic-authentication`) carries three additional inline `w600` promo images. |
| Headings bold-wrapped in source | ✅ **9.5/10** | Confirmed on every post. One exception found: in `the-different-token-types-and-formats-explained`, the H2 "Token-Based Authentication Types – The Best Of Both Worlds" is *not* bold-wrapped. The strip script must be idempotent and tolerate already-clean headings. |
| Every post repeats its title as bold-italic body text under the H1 | **❌ not found** | 0/10. Nor do index excerpts stutter (checked the first 3 cards on `/blog/`). |
| Single author, "Instasafe Marketing" | ✅ on-page, **⚠ contradicted at the archive level** | All 10 posts render "Instasafe Marketing", but three author archives exist: `instasafe-marketing`, `instasafe`, `ghost`. Either legacy empty accounts or genuinely mis-attributed posts. Check `authors` across all 354 via Content API before assuming. |
| Confirm `visibility: "public"` corpus-wide | ⚠ untestable this way | All 10 rendered publicly, so all 10 are public. Says nothing about the other 344. Still a required Content API check. |

### On the missing duplicate-title bug

The likeliest source of the original observation: **2 of 10 posts open with an H2
that restates the H1 verbatim.**

- `what-is-tacacs-authentication` — H1 "What is TACACS Authentication?" → first H2 "**What is TACACS Authentication?**"
- `what-is-basic-authentication` — H1 "What is Basic Authentication?" → first H2 "**What Is Basic Authentication?**"

That is a real redundancy worth fixing, but it is a *heading* problem, not a body
problem, and it is in a minority of posts rather than corpus-wide. Treat this as
a hypothesis, not a finding — it explains the symptom but I cannot prove it is
what was originally seen.

### On the excerpt problem

The index excerpts are broken, just not in the way the brief describes. They are
Ghost's auto-excerpts, hard-truncated mid-clause with no ellipsis:

> "…Banks, NBFCs, and insurance firms are now among the"
> "…Today's BFSI infrastructure is no longer"
> "…most security breaches in Fintech"

This is a stronger argument for the custom-excerpt pass than stuttering would
have been, and it argues for extending the pass past the top 30 — or, cheaper,
for the new card component to word-boundary-truncate with an ellipsis so the
untreated ~324 degrade gracefully.

---

## 3. Per-post evidence

| # | Slug | Words | Deepest heading | Ordered lists | Code | Inline images | FAQ | Tag |
|---|---|---|---|---|---|---|---|---|
| 1 | `network-security-model-and-its-components-a-complete-guide` | ~2,100 | H3 | Yes | — | 1 CTA | 3 Q | Cybersecurity |
| 2 | `whitelisting-vs-blacklisting-whats-the-difference` | ~2,800 | H3 | — | — | 1 CTA | 3 Q | Cybersecurity |
| 3 | `digital-watermarking-and-its-types` | ~2,100 | H3 | — | — | 1 CTA | 3 Q | Cybersecurity |
| 4 | `types-of-authentication-methods-used-for-network-security` | ~1,200 | H3 | Yes | — | 1 CTA | 3 Q | Multi Factor Authentication |
| 5 | `how-to-set-up-mfa-exchange-on-premise` | **~7,200** | H3 | Yes | **Yes** | 1 CTA | **None** | Multi Factor Authentication |
| 6 | `the-different-token-types-and-formats-explained` | ~2,100 | H3 | — | — | none | 3 Q | Cybersecurity |
| 7 | `pim-vs-pam-vs-iam-understand-the-differences` | ~2,100 | H3 | Yes | — | none | 3 Q | Cybersecurity |
| 8 | `what-is-tacacs-authentication` | ~1,400 | H2 only | Yes | — | 1 CTA | 3 Q | Cybersecurity |
| 9 | `what-is-client-certificate-authentication` | ~2,100 | H3 | Yes | — | none | 3 Q | Multi Factor Authentication |
| 10 | `what-is-basic-authentication` | ~1,100 | H3 | Yes | — | **3 promo** | 3 Q | Multi Factor Authentication |

Word counts are the fetcher's estimates — directionally right, not exact.

**Spread:** 1,100 → 7,200 words. The template has to hold both without either
looking broken. Post 5 is a genuine outlier at roughly 6× the median.

---

## 4. What the post template must handle

Confirmed required, from evidence:

- `h2`, `h3` (no `h4` — but do not assume; style it anyway, it costs nothing)
- `p`, `ul`, `ol` — **ordered lists are in 6 of 10 and the brief omits them**
- `pre` / `code` — post 5 only, but real. Style in IBM Plex Mono per the token set.
- `a` inline links, including post-to-post internal links
- `strong`, `em`
- Feature image at `…/content/images/size/w2000/…`, `.webp`
- Inline raster images at `…/content/images/…` and `…/content/images/size/w600/…`, `.png`

Required by structure rather than by tag:

- **Table of contents.** Post 5 has 13 numbered `Step N:` H3s under one H2 and
  runs 7,200 words. Without a sticky ToC it is unusable. This is the single
  strongest argument for the flagship layout variant being a *different
  information architecture*, not just a different skin.
- **FAQ block.** 9 of 10 posts end in one. Markup is inconsistent between them
  (post 10 uses `h3` per question; the rest appear to use bold paragraph runs).
  ⚠ Confirm against raw HTML.
- **Comparison rendering.** Posts 2 and 7 are explicitly comparison pieces
  ("X vs Y") carrying their comparisons as prose bullet lists. Neither has a
  `<table>`. A comparison-table component would be the highest-value editorial
  upgrade available on the flagship set, and it is additive — no risk to the
  existing text.

### The inline CTA banners — decide this before the template is built

Seven of ten posts have a hardcoded `<img>` of `Book-A-Demo-N.png` (uploaded
`2025/06`) sitting mid-body. These are raster images of a button. In the new
design system they should be an `IzInlineCTA` component: real text, real pill
button, no raster, themable, accessible, and editable in one place instead of
354.

Two paths:

- **Ship-fast:** proxy them like any other image. They render, they look like
  2025 artwork inside a 2026 design system, and every future CTA change is a
  re-upload across the corpus.
- **Better, still cheap:** in the ingest layer, detect `img[src*="Book-A-Demo"]`
  and swap it for the `IzInlineCTA` component at render time. Zero writes to
  Ghost, zero risk, reversible, and it kills a whole class of visual drift.

I would take the second. It is a single regex in the HTML transform step and it
is the difference between the corpus looking migrated and looking pasted in.

Post 10's three `w600` promo images are a different case — that is a
**hand-built related-posts block inside the body**, and it will sit directly
above the planned `IzRelatedRail`, showing two related-content modules stacked.
Worth a targeted check of how many other posts have one. ⚠

---

## 5. Flagship assessment

Assessed on structural fitness for a distinct layout and on editorial substance.
**Caveat: I have no Search Console data.** Brief §8.4 is right that selection
must come from traffic, and I cannot see traffic. This ranks the ten on whether
flagship treatment would *do* anything, which is the second half of that
decision.

**Tier 1 — flagship earns its keep**

| Post | Why |
|---|---|
| 5 · MFA Exchange on-premise | 7,200 words, 13 procedural steps, code blocks, no FAQ. Needs ToC, step navigation, copyable code. The layout variant pays for itself here more than anywhere else. Also the only post whose current rendering is arguably failing readers. |
| 2 · Whitelisting vs Blacklisting | 2,800 words, the longest of the comparison set, clean symmetrical structure (advantages/disadvantages/when-to-use ×2). Drops straight into a comparison-table treatment. |
| 7 · PIM vs PAM vs IAM | Three-way comparison currently carried entirely in bullets. Highest delta between what the content is and how it presents. |
| 1 · Network Security Model | Broadest scope, 7 sub-topics that each map to another post in the corpus. The natural pillar/hub page — flagship treatment plus outbound links to the cluster. |

**Tier 2 — restyle, do not flagship**

| Post | Why |
|---|---|
| 6 · Token types and formats | Solid 2,100 words, well-structured, but no structural need the universal template will not meet. |
| 9 · Client certificate authentication | Same. Clean numbered advantages and use cases; the standard template handles it. |
| 3 · Digital watermarking | Well-built post, but off-axis from ZTNA positioning. If it draws traffic it draws the wrong traffic. Flagship treatment spends design attention on a topic that does not convert. Worth checking what it actually ranks for before investing. |

**Tier 3 — thin; needs words before it needs design**

| Post | Why |
|---|---|
| 4 · Types of authentication methods | ~1,200 words for a hub-shaped topic with six sub-methods. It is a table of contents pretending to be an article. Strong internal-linking candidate, weak flagship. |
| 8 · What is TACACS | ~1,400 words, H2-only, no depth. Also carries the duplicate-H2 issue. |
| 10 · What is Basic Authentication | ~1,100 words, the thinnest of the ten, and the only one whose body is polluted with a hand-built promo block. Fix the body before considering the layout. |

**Recommendation:** flagship = Tier 1 (4 posts), plus 6–11 more chosen from
Search Console. Do not fill the 10–15 slots from this list alone; five of these
ten would be flattered by a layout they have not earned.

---

## 6. Taxonomy — the picture is different from the brief

15 tag archives are live today:

`endpoint-security` · `single-sign-on-sso` · `data-loss-prevention` ·
`contextual-access-management` · `multi-factor-authentication` · `cloud-security` ·
`zero-trust-access` · `cybersecurity` · `instasafe-in-news` · `remote-access` ·
`vpn-alternative` · `identity-access-management` · `microsegmentation` · `sase` ·
`software-defined-perimeter`

Observations:

- All 15 are **technology/product** tags. Not one industry vertical. The brief's
  target set (BFSI, Fintech, ITES, Logistics, SaaS, IPO) is a **second, orthogonal
  axis** — so the work is additive tagging, not tagging from zero.
- The 10 sampled posts surface only 2 of the 15 on-page (`cybersecurity`,
  `multi-factor-authentication`). Either most posts carry a single tag, or the
  theme only renders the primary. ⚠ Check via Content API — it changes whether
  the 15 are real coverage or mostly empty archives.
- `cybersecurity` looks like a catch-all doing no filtering work.
- `instasafe-in-news` is a non-editorial bucket and should probably not sit in
  the same filter row as topic tags.
- Every one of the 15 is an indexed URL. Retiring any means a 301, not a delete.

**Consequence for Romali's pass:** the decision is not "what are the categories"
but "do we keep the technology axis as-is and layer verticals on top, or
consolidate 15 → ~8 and accept the redirects". That is a smaller, more concrete
question than the brief poses, and it can be answered in a sitting.

Encouraging signal: the newest posts in the feed are already vertical-shaped —
BFSI, Fintech, ITES, IPO-readiness, SaaS. The content strategy has already moved
to the axis the brief wants. It is the legacy corpus that needs retro-tagging.

---

## 7. SEO parity items to add to §5 of the brief

Four gaps the current checklist does not cover:

1. **Author archives.** `/blog/author/instasafe-marketing/`, `/blog/author/instasafe/`
   and `/blog/author/ghost/` are live and in the sitemap. The brief's decision not
   to build them is right; the migration consequence is unhandled. Add:
   *301 all three to `/blog/`, and drop them from the new sitemap.*
2. **`robots.txt` does not declare the blog sitemap — confirmed defect ✅.**
   `robots.txt` points only at `https://instasafe.com/sitemap.xml`. That file is
   a **flat list of 89 main-site URLs**, not an index — it contains
   `https://instasafe.com/blog/` as a single URL and **references no blog
   sitemap at all**. So the blog's own index at `/blog/sitemap.xml`, and the
   ~354 post URLs beneath it, are undeclared to crawlers. Google has almost
   certainly discovered them by crawling `/blog/`, but nothing is announcing
   `lastmod` for the corpus.

   This is a pre-existing defect, not a migration risk — which makes it worth
   fixing **now, before cutover**, so the improvement is not confounded with the
   proxy flip. Fixing it first also gives you a clean before/after baseline in
   Search Console, which is exactly what you want going into a migration whose
   non-negotiable is "traffic must not dip".
3. **Ghost's responsive image variants die with Ghost's renderer.** Feature
   images are served from `/content/images/size/w2000/…` and Ghost generates
   `w600`, `w1000`, etc. on demand. The §6 proxy plan covers this only if the
   proxy matches `/blog/content/images/**` including the `size/` segment.
   Make that explicit in the proxy rule, and confirm the origin keeps serving
   after theme rendering is disabled in Phase 4 — image serving and theme
   rendering are separate concerns in Ghost, but verify rather than assume.
4. **RSS parity is more than the path.** The current feed is `/blog/rss/`,
   titled "Zero Trust Blog", channel link `https://instasafe.com/blog/`, and
   ships **full `content:encoded` HTML**, not excerpts. Anything subscribed to
   it will notice a switch to excerpts. Add title, channel link, and full-content
   to the parity checklist, not just the URL.

Also worth noting: **there is no visible search box on `/blog/`** in the served
markup. If Casper's search is behind a JS-initialised icon it may still exist, but
if it is genuinely absent, open item §8.3 answers itself — you cannot lose what
is not there. ⚠ Worth thirty seconds in a browser to settle.

---

## 8. Corrections to Phase 1

- **Drop** "Remove the duplicated title line from every post body" as written.
  Replace with: *audit for an opening H2 that restates the H1; fix the ~20% where
  it occurs.* Do not run a title-similarity heuristic across 354 bodies.
- **Amend** the heading-strip script: it must be idempotent and skip
  already-clean headings — at least one post is partially clean already.
- **Amend** the excerpt task: the problem is mid-clause truncation, not
  stuttering. Fix the card component's truncation first (helps all 354), then do
  custom excerpts for the top 30 (helps the ones that matter).
- **Reframe** the taxonomy task per §6 — additive vertical axis over an existing
  15-tag technology axis, plus a keep/merge decision.
- **Add** an audit of inline `Book-A-Demo` banners and hand-built related-post
  blocks across the corpus, so the ingest transform is written against real
  counts rather than a 10-post sample.

---

## 9. Still unverifiable without the Content API

Everything below needs the key from Phase 0. None of it can be settled by
fetching rendered pages.

- `visibility` across all 354 posts
- `meta_title` / `meta_description` fill rate — the fallback chains in §4 of the
  brief hinge on this
- `canonical_url` overrides in place today
- `og_*` and `twitter_*` fill rate
- `codeinjection_head` / `codeinjection_foot` — whether any post carries one
- True author distribution behind the three archive URLs
- Tag counts per archive — which of the 15 are real and which are near-empty
- Exact post count (~354 is a fetched estimate)
- Whether the FAQ markup is `h3`-based or bold-paragraph-based, and in what ratio
- How many posts carry inline `Book-A-Demo` banners and hand-built related blocks

Suggested next step: once the Content API key is confirmed working (Phase 0,
last item), a single read-only script can answer this entire list in one pass and
turn most of the ⚠ marks in this document into ✅ or ❌.
