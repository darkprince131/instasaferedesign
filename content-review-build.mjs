// ============================================================
// InstaSafe Content Review — static site generator.
// Plain Node, zero npm deps. Re-run when the source MDs change:
//   node content-review-build.mjs
// Reads the 4 Content Master markdown files, splits into page
// sections, renders each to a self-contained HTML file, and
// builds an index. Themes are FIXED per volume (no toggle).
// ============================================================

import fs from "node:fs";
import path from "node:path";

const ROOT = "C:/Instasafe Webdesign";
const OUT = path.join(ROOT, "content-review");
const DL = "C:/Users/Darkprince131/Downloads";
const BUILD_DATE = "2026-07-07";

const VOLS = [
  { id: "vol1", file: "InstaSafe_Content_Master_Vol1_Platform.md", label: "Vol 1 · Platform", theme: "t-paper", themeChip: "Paper theme" },
  { id: "vol2", file: "InstaSafe_Content_Master_Vol2_Solutions.md", label: "Vol 2 · Solutions", theme: "t-paper", themeChip: "Paper theme" },
  { id: "vol3", file: "InstaSafe_Content_Master_Vol3_Industries.md", label: "Vol 3 · Industries", theme: "t-dark", themeChip: "Dark theme" },
  { id: "vol4", file: "InstaSafe_Content_Master_Vol4_Company_Resources.md", label: "Vol 4 · Company & Resources", theme: "t-blue", themeChip: "Blue system (v3)" },
];

// ---- review markers to highlight ----------------------------------------
const MARKER_RE = /\[(?:SOURCE NEEDED|CONFIRM|PLACEHOLDER|BLOCKED|Legal review|Guardrail)[^\]]*\]/gi;
const XREF_RE = /\[→[^\]]*\]/g;

// ---- helpers ------------------------------------------------------------
function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Slug from a route like "/platform/ztna" -> "platform-ztna"
function slugFromRoute(route) {
  let s = route.trim().toLowerCase();
  s = s.replace(/[^a-z0-9/_-]+/g, "-"); // non-slug chars -> dash
  s = s.replace(/\//g, "-");            // path separators -> dash
  s = s.replace(/-+/g, "-").replace(/^-+|-+$/g, ""); // collapse + trim dashes
  return s || "page";
}

// Count review markers in a raw string.
function countMarkers(raw) {
  const m = raw.match(MARKER_RE);
  return m ? m.length : 0;
}

// Inline rendering for a text run (already whitespace-managed).
// Order matters: escape first, then apply markup on escaped text.
function inline(text, { allowBold = true } = {}) {
  let out = esc(text);
  // review markers -> amber chips (operate on escaped text; markers have no < > &)
  out = out.replace(MARKER_RE, (m) => `<mark class="todo">${m}</mark>`);
  // cross-references [→ ...] -> subtle inline chips
  out = out.replace(XREF_RE, (m) => `<span class="xref">${m}</span>`);
  // bold
  if (allowBold) {
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }
  return out;
}

// ---- markdown -> HTML (line-based, deliberately partial) ----------------
function renderMarkdown(body, stats) {
  const lines = body.split(/\r?\n/);
  const html = [];
  let i = 0;

  // Detect whether a fenced block is the Hero block.
  function isHeroFence(startIdx) {
    // Hero fence directly preceded (ignoring blanks) by a **Hero** label line.
    for (let k = startIdx - 1; k >= 0; k--) {
      const t = lines[k].trim();
      if (t === "") continue;
      return /^\*\*Hero\*\*/i.test(t);
    }
    return false;
  }

  while (i < lines.length) {
    let line = lines[i];
    const trimmed = line.trim();

    // blank
    if (trimmed === "") { i++; continue; }

    // horizontal rule
    if (/^---+$/.test(trimmed)) { html.push('<hr class="rule">'); i++; continue; }

    // fenced code block ```
    if (/^```/.test(trimmed)) {
      const hero = isHeroFence(i);
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        buf.push(lines[i]);
        i++;
      }
      i++; // consume closing fence
      const rawBlock = buf.join("\n");
      stats.markers += countMarkers(rawBlock);
      if (hero) {
        html.push(renderHero(rawBlock, stats));
      } else {
        // spec panel — preserve whitespace, escape + markers + xrefs
        let content = esc(rawBlock);
        content = content.replace(MARKER_RE, (m) => `<mark class="todo">${m}</mark>`);
        content = content.replace(XREF_RE, (m) => `<span class="xref">${m}</span>`);
        html.push(`<div class="spec"><pre>${content}</pre></div>`);
      }
      continue;
    }

    // headings ####/###/##/#
    const h = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (h) {
      const lvl = Math.min(h[1].length + 1, 4); // shift down; page title is h1
      stats.markers += countMarkers(h[2]);
      html.push(`<h${lvl}>${inline(h[2])}</h${lvl}>`);
      i++;
      continue;
    }

    // list item ( · or - or numbered ). Group consecutive.
    if (/^([·\-*]|\d+\.)\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^([·\-*]|\d+\.)\s+/.test(lines[i].trim())) {
        const t = lines[i].trim().replace(/^([·\-*]|\d+\.)\s+/, "");
        stats.markers += countMarkers(t);
        items.push(`<li>${inline(t)}</li>`);
        i++;
      }
      html.push(`<ul class="list">${items.join("")}</ul>`);
      continue;
    }

    // **Bold intro** — text  OR  **Section title**  -> section label + optional lead
    const boldLead = /^\*\*([^*]+)\*\*\s*(?:—\s*(.*))?$/.exec(trimmed);
    if (boldLead) {
      stats.markers += countMarkers(trimmed);
      html.push(`<h3 class="seclabel">${inline(boldLead[1])}</h3>`);
      if (boldLead[2] && boldLead[2].trim() !== "") {
        // gather following continuation lines into the same paragraph
        const para = [boldLead[2]];
        i++;
        while (i < lines.length && lines[i].trim() !== "" && !/^```/.test(lines[i].trim()) && !/^#{1,4}\s/.test(lines[i].trim()) && !/^\*\*/.test(lines[i].trim()) && !/^---+$/.test(lines[i].trim()) && !/^([·\-*]|\d+\.)\s+/.test(lines[i].trim())) {
          para.push(lines[i].trim());
          i++;
        }
        stats.markers += countMarkers(para.join(" "));
        html.push(`<p>${inline(para.join(" "))}</p>`);
        continue;
      }
      i++;
      continue;
    }

    // ordinary paragraph — gather until blank / block boundary
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() !== "" && !/^```/.test(lines[i].trim()) && !/^#{1,4}\s/.test(lines[i].trim()) && !/^\*\*/.test(lines[i].trim()) && !/^---+$/.test(lines[i].trim()) && !/^([·\-*]|\d+\.)\s+/.test(lines[i].trim())) {
      para.push(lines[i]);
      i++;
    }
    const paraText = para.join(" ").trim();
    stats.markers += countMarkers(paraText);
    html.push(`<p>${inline(paraText)}</p>`);
  }

  return html.join("\n");
}

// Render the Hero code block into a styled hero.
function renderHero(rawBlock, stats) {
  const lines = rawBlock.split(/\r?\n/);
  const parts = { eyebrow: "", h1: "", sub: "", cta: [] };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    let m;
    if ((m = /^Eyebrow:\s*(.*)$/i.exec(l))) parts.eyebrow = m[1];
    else if ((m = /^H1:\s*(.*)$/i.exec(l))) parts.h1 = m[1];
    else if ((m = /^Sub:\s*(.*)$/i.exec(l))) parts.sub = m[1];
    else if ((m = /^CTA:\s*(.*)$/i.exec(l))) parts.cta = m[1].split("|").map((s) => s.trim()).filter(Boolean);
    else {
      // stray hero line (some heroes have no CTA / extra text) -> treat as sub continuation
      if (parts.sub) parts.sub += " " + l;
      else if (!parts.h1) parts.h1 = l;
      else parts.sub = l;
    }
  }
  const bits = ['<header class="hero">'];
  if (parts.eyebrow) bits.push(`<div class="hero-ey">${inline(parts.eyebrow)}</div>`);
  if (parts.h1) bits.push(`<h2 class="hero-h1">${inline(parts.h1)}</h2>`);
  if (parts.sub) bits.push(`<p class="hero-sub">${inline(parts.sub)}</p>`);
  if (parts.cta.length) {
    const btns = parts.cta.map((c, idx) => `<span class="pill ${idx === 0 ? "pri" : "ghost"}">${inline(c)}</span>`).join("");
    bits.push(`<div class="hero-cta">${btns}</div>`);
  }
  bits.push("</header>");
  return bits.join("\n");
}

// Extract the SEO line from a section body -> small mono metadata block.
function extractSEO(body) {
  const m = /^\*\*SEO\*\*\s*—\s*(.*)$/im.exec(body);
  return m ? m[1].trim() : "";
}

// ---- commentable-block annotation ---------------------------------------
// Walk the rendered body HTML and stamp data-cb="bN" onto every commentable
// block, numbered in DOM order. Ids are order-derived, so regenerating with
// the same source content order yields identical ids (stable anchors).
// Commentable openers: hero header, h2/h3/h4 (incl. seclabel), paragraphs,
// spec panels, lists, and FAQ blocks (rendered as headings/paragraphs).
function annotateBlocks(bodyHTML, counter) {
  // Match the opening tag of each commentable block type at line start.
  // The generator emits one block per line, so anchoring on \n keeps this cheap.
  return bodyHTML.replace(
    /(^|\n)(<header class="hero">|<h2\b|<h3\b|<h4\b|<p>|<div class="spec">|<ul class="list">)/g,
    (full, lead, tag) => `${lead}${insertCb(tag, "b" + (++counter.n))}`
  );
}

// Insert a data-cb attribute into an opening tag string, right after the
// tag name (before any existing attributes), so it survives class lists.
function insertCb(openTag, id) {
  return openTag.replace(/^<([a-z0-9]+)/i, `<$1 data-cb="${id}"`);
}

// ---- page template ------------------------------------------------------
function pageHTML({ vol, section, prev, next, seo, markerCount, bodyHTML }) {
  const fonts = vol.theme === "t-blue"
    ? '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">'
    : '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">';
  const lockup = vol.theme === "t-paper" ? "instasafe-lockup-color.svg" : "instasafe-lockup-white.svg";
  const seoBlock = seo
    ? `<div class="seo-meta"><span class="seo-k">SEO</span> ${inline(seo, { allowBold: false })}</div>`
    : "";
  const markerChip = markerCount > 0
    ? `<span class="chip todo-chip">${markerCount} review marker${markerCount === 1 ? "" : "s"}</span>`
    : `<span class="chip clean-chip">No review markers</span>`;

  const navFoot = [];
  if (prev) navFoot.push(`<a class="pn prev" href="./${prev.slug}.html"><span class="pn-k">← Prev</span><span class="pn-t">${esc(prev.title)}</span></a>`);
  else navFoot.push(`<span class="pn empty"></span>`);
  if (next) navFoot.push(`<a class="pn next" href="./${next.slug}.html"><span class="pn-k">Next →</span><span class="pn-t">${esc(next.title)}</span></a>`);
  else navFoot.push(`<span class="pn empty"></span>`);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(section.title)} — InstaSafe Content Review</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
<link rel="stylesheet" href="../assets/review.css">
</head>
<body class="${vol.theme}">
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="../index.html"><img src="../assets/brand/${lockup}" alt="InstaSafe" height="24"></a>
    <span class="vol-label">${esc(vol.label)}</span>
    <span class="cr-count" data-cr-count hidden>💬 0</span>
    <a class="index-link" href="../index.html">← Index</a>
  </div>
</header>
<main class="wrap page">
  <div class="page-head" data-cb="b1">
    <div class="route">${esc(section.route)}</div>
    <h1 class="page-title">${esc(section.title)}</h1>
    <div class="chips">${markerChip}</div>
    ${seoBlock}
  </div>
  <article class="prose">
${bodyHTML}
  </article>
  <nav class="pagenav">
    ${navFoot.join("\n    ")}
  </nav>
</main>
<footer class="pagefoot">
  <div class="wrap">
    <span>InstaSafe Content Master — Review Build</span>
    <span class="dot">·</span>
    <span>${vol.label}</span>
    <span class="dot">·</span>
    <span>${BUILD_DATE}</span>
    <span class="dot">·</span>
    <a class="cr-export" href="#" data-cr-export>Export my comments</a>
  </div>
</footer>
<script src="../assets/review-comments.js" defer></script>
</body>
</html>`;
}

// ---- parse a volume file into page sections -----------------------------
function parseVolume(vol) {
  const src = fs.readFileSync(path.join(DL, vol.file), "utf8");
  const lines = src.split(/\r?\n/);
  // Section header pattern: # N. /route — Title   (also allow non-route titles like appendix)
  const sections = [];
  let cur = null;
  const headerRe = /^#\s+(\d+)\.\s+(.*)$/;

  for (let i = 0; i < lines.length; i++) {
    const m = headerRe.exec(lines[i]);
    if (m) {
      if (cur) sections.push(cur);
      const rest = m[2];
      // Normal form: "/route — Title". Split on the em dash.
      let route = "", title = rest;
      const dash = rest.indexOf("—");
      if (dash >= 0) {
        const left = rest.slice(0, dash).trim();
        const right = rest.slice(dash + 1).trim();
        if (left.startsWith("/")) {
          // standard "/route — Title"
          route = left;
          title = right;
        } else {
          // inverted "Title — /route-or-note" (e.g. education hub section)
          title = left;
          route = right.startsWith("/") ? right : "";
        }
      }
      cur = { num: m[1], route, title, bodyLines: [] };
    } else if (cur) {
      cur.bodyLines.push(lines[i]);
    }
    // lines before the first section (file preamble) are ignored
  }
  if (cur) sections.push(cur);

  // Trailing appendix / production notes -> attach to a synthetic prodnotes page.
  // The appendix lives inside the last section's body as "## APPENDIX ..." — split it out.
  let prodNotes = null;
  for (const s of sections) {
    const idx = s.bodyLines.findIndex((l) => /^##\s+APPENDIX/i.test(l.trim()));
    if (idx >= 0) {
      const notesLines = s.bodyLines.slice(idx);
      s.bodyLines = s.bodyLines.slice(0, idx);
      prodNotes = { route: "", title: "Production notes", bodyLines: notesLines };
    }
  }
  // Also catch a standalone "END VOLUME" trailing marker — strip it from bodies.
  for (const s of sections) {
    s.bodyLines = stripTrailingEnd(s.bodyLines);
  }

  // Build slug + route/title finalisation.
  for (const s of sections) {
    s.slug = s.route ? slugFromRoute(s.route) : slugFromRoute(s.title);
  }
  if (prodNotes) {
    prodNotes.bodyLines = stripTrailingEnd(prodNotes.bodyLines);
    prodNotes.slug = "production-notes";
  }
  return { sections, prodNotes };
}

function stripTrailingEnd(bodyLines) {
  // remove trailing blank + "**END VOLUME ...**" / "END VOLUME ..." markers
  const out = [...bodyLines];
  while (out.length) {
    const t = out[out.length - 1].trim();
    if (t === "" || /^\**END VOLUME/i.test(t) || /^\**END VOLUME.*COMPLETE\**$/i.test(t)) {
      out.pop();
    } else break;
  }
  return out;
}

// ---- build --------------------------------------------------------------
function build() {
  // fresh output dir
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(path.join(OUT, "assets", "brand"), { recursive: true });

  // copy brand svgs
  for (const f of ["instasafe-lockup-color.svg", "instasafe-lockup-white.svg"]) {
    fs.copyFileSync(path.join(ROOT, "public", "brand", f), path.join(OUT, "assets", "brand", f));
  }
  // write css + commenting script
  fs.writeFileSync(path.join(OUT, "assets", "review.css"), CSS, "utf8");
  fs.writeFileSync(path.join(OUT, "assets", "review-comments.js"), COMMENTS_JS, "utf8");

  const report = [];
  const indexVols = [];

  for (const vol of VOLS) {
    const dir = path.join(OUT, vol.id);
    fs.mkdirSync(dir, { recursive: true });
    const { sections, prodNotes } = parseVolume(vol);

    // page list including prodnotes at the end for prev/next nav
    const pages = sections.map((s) => ({ ...s }));
    if (prodNotes) pages.push(prodNotes);

    let volMarkers = 0;
    const indexPages = [];

    pages.forEach((section, idx) => {
      const stats = { markers: 0 };
      const seo = extractSEO(section.bodyLines.join("\n"));
      // remove the SEO line from the body before rendering (it's shown as metadata)
      const bodyNoSeo = section.bodyLines.filter((l) => !/^\*\*SEO\*\*/i.test(l.trim())).join("\n");
      // Reserve b1 for the page-head (route + title) block; body blocks start at b2.
      const cbCounter = { n: 1 };
      const bodyHTML = annotateBlocks(renderMarkdown(bodyNoSeo, stats), cbCounter);
      volMarkers += stats.markers;

      const prev = idx > 0 ? pages[idx - 1] : null;
      const next = idx < pages.length - 1 ? pages[idx + 1] : null;

      const html = pageHTML({
        vol, section,
        prev: prev ? { slug: prev.slug, title: prev.title } : null,
        next: next ? { slug: next.slug, title: next.title } : null,
        seo, markerCount: stats.markers, bodyHTML,
      });
      fs.writeFileSync(path.join(dir, section.slug + ".html"), html, "utf8");

      indexPages.push({
        slug: section.slug, route: section.route, title: section.title,
        markers: stats.markers, isProd: section === prodNotes,
      });
    });

    report.push({ vol: vol.label, pages: pages.length, markers: volMarkers });
    indexVols.push({ vol, pages: indexPages, markers: volMarkers });
  }

  // index.html
  fs.writeFileSync(path.join(OUT, "index.html"), indexHTML(indexVols), "utf8");

  return report;
}

// ---- index page ---------------------------------------------------------
function indexHTML(indexVols) {
  const fonts = '<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">';
  const totalMarkers = indexVols.reduce((a, v) => a + v.markers, 0);
  const totalPages = indexVols.reduce((a, v) => a + v.pages.length, 0);

  const volBlocks = indexVols.map(({ vol, pages, markers }) => {
    const cards = pages.map((p) => {
      const marker = p.markers > 0
        ? `<span class="card-chip todo-chip">${p.markers}</span>`
        : `<span class="card-chip clean-chip">✓</span>`;
      const routeLabel = p.route ? esc(p.route) : "";
      return `<a class="pcard${p.isProd ? " prod" : ""}" href="./${vol.id}/${p.slug}.html">
        <span class="pcard-route">${routeLabel || "&nbsp;"}</span>
        <span class="pcard-title">${esc(p.title)}</span>
        ${marker}
      </a>`;
    }).join("\n");
    return `<section class="volsec">
      <div class="volhead">
        <h2>${esc(vol.label)}</h2>
        <span class="theme-chip">${esc(vol.themeChip)}</span>
        <span class="vol-meta">${pages.length} pages · ${markers} markers</span>
      </div>
      <div class="pgrid">
${cards}
      </div>
    </section>`;
  }).join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>InstaSafe Content Master — Review Build</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
<link rel="stylesheet" href="./assets/review.css">
</head>
<body class="t-paper index">
<header class="topbar">
  <div class="wrap topbar-in">
    <a class="brand" href="./index.html"><img src="./assets/brand/instasafe-lockup-color.svg" alt="InstaSafe" height="24"></a>
    <span class="vol-label">Content Master — Review Build</span>
    <span class="cr-count" data-cr-count hidden>💬 0</span>
    <span class="index-link muted">${BUILD_DATE}</span>
  </div>
</header>
<main class="wrap indexmain">
  <div class="index-hero">
    <div class="hero-ey"><span class="ey-rule"></span>CONTENT REVIEW</div>
    <h1>Content Master — Review Build</h1>
    <p class="index-intro">This build exists to review the copy and see the design language in context. Amber marks flag unresolved <mark class="todo">[CONFIRM]</mark> / <mark class="todo">[SOURCE NEEDED]</mark> items that still need product, source, or legal sign-off before publishing.</p>
    <div class="index-stats">
      <span class="chip">${totalPages} pages</span>
      <span class="chip todo-chip">${totalMarkers} review markers total</span>
      <span class="chip">4 volumes</span>
    </div>
  </div>
${volBlocks}
</main>
<footer class="pagefoot">
  <div class="wrap">
    <span>InstaSafe Content Master — Review Build</span>
    <span class="dot">·</span>
    <span>Generated ${BUILD_DATE}</span>
    <span class="dot">·</span>
    <span>Static · no tracking · file:// safe</span>
    <span class="dot">·</span>
    <a class="cr-export" href="#" data-cr-export>Export my comments</a>
  </div>
</footer>
<script src="./assets/review-comments.js" defer></script>
</body>
</html>`;
}

// ---- CSS (three theme scopes) ------------------------------------------
const CSS = String.raw`/* InstaSafe Content Review — one stylesheet, three fixed theme scopes.
   t-paper (Vol 1+2, index) · t-dark (Vol 3) · t-blue (Vol 4).
   Token values sourced from components/home2/home2.css and app/globals.css. */

*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--tx);
  font-family: var(--body);
  font-size: 16px;
  line-height: 1.68;
  -webkit-font-smoothing: antialiased;
  background-image: radial-gradient(var(--dot) 1px, transparent 1px);
  background-size: 22px 22px;
}

/* ---------------- THEME: paper ---------------- */
.t-paper {
  --bg:#f9f9f7; --bg-2:#f2f1ec; --surface:#ffffff; --surface-2:#f6f5f1;
  --line:rgba(20,18,12,0.11); --line-strong:rgba(20,18,12,0.17);
  --tx:#1b1a17; --tx-dim:#5c594f; --tx-mute:#7a766e; --ghost:#c9c6bc;
  --accent:#f2480a; --dot:rgba(20,18,12,0.05); --headerbg:rgba(249,249,247,0.86);
  --btn-ink:#ffffff; --panel-sh:0 1px 3px rgba(40,30,10,0.05);
  --todo-bg:#ffe6c2; --todo-tx:#8a4b00; --todo-line:#eab676;
  --clean-tx:#178a51; --clean-bg:rgba(23,138,81,0.10);
  --disp:"Geist",sans-serif; --body:"Geist",sans-serif;
  --mono:"Geist Mono",ui-monospace,monospace;
}
/* ---------------- THEME: dark ---------------- */
.t-dark {
  --bg:#0a0b0d; --bg-2:#0e0f12; --surface:#121417; --surface-2:#171a1e;
  --line:rgba(255,255,255,0.07); --line-strong:rgba(255,255,255,0.13);
  --tx:#f1f1f3; --tx-dim:#a1a1aa; --tx-mute:#61626b; --ghost:#2a2d33;
  --accent:#ff6a2c; --dot:rgba(255,255,255,0.028); --headerbg:rgba(10,11,13,0.78);
  --btn-ink:#0a0b0d; --panel-sh:none;
  --todo-bg:rgba(255,176,72,0.16); --todo-tx:#ffcb8a; --todo-line:rgba(255,176,72,0.45);
  --clean-tx:#46d38a; --clean-bg:rgba(70,211,138,0.12);
  --disp:"Geist",sans-serif; --body:"Geist",sans-serif;
  --mono:"Geist Mono",ui-monospace,monospace;
}
/* ---------------- THEME: blue (System A) ---------------- */
.t-blue {
  --bg:#05080f; --bg-2:#070d1a; --surface:#0c1526; --surface-2:#111e35;
  --line:rgba(255,255,255,0.08); --line-strong:rgba(255,255,255,0.14);
  --tx:#f1f5f9; --tx-dim:#94a3b8; --tx-mute:#475569; --ghost:#1e2f4d;
  --accent:#3b82f6; --dot:rgba(255,255,255,0.04); --headerbg:rgba(7,13,26,0.82);
  --btn-ink:#05080f; --panel-sh:0 4px 32px rgba(0,0,0,0.5);
  --todo-bg:rgba(245,158,11,0.15); --todo-tx:#fbbf24; --todo-line:rgba(245,158,11,0.45);
  --clean-tx:#22c55e; --clean-bg:rgba(34,197,94,0.12);
  --disp:"Inter",sans-serif; --body:"Inter",sans-serif;
  --mono:"JetBrains Mono",ui-monospace,monospace;
}

a { color: inherit; text-decoration: none; }
::selection { background: var(--accent); color: var(--btn-ink); }

.wrap { max-width: 980px; margin: 0 auto; padding: 0 28px; }

/* ---------------- top bar ---------------- */
.topbar {
  position: sticky; top: 0; z-index: 40;
  background: var(--headerbg);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--line);
}
.topbar-in { display: flex; align-items: center; gap: 16px; height: 60px; }
.brand { display: inline-flex; align-items: center; }
.brand img { display: block; }
.vol-label {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.06em;
  text-transform: uppercase; color: var(--tx-mute);
}
.index-link { margin-left: auto; font-family: var(--mono); font-size: 13px; color: var(--tx-dim); }
.index-link:hover { color: var(--accent); }
.index-link.muted { color: var(--tx-mute); }

/* ---------------- page head ---------------- */
.page { padding: clamp(56px,8vw,96px) 28px 40px; }
.page-head { margin-bottom: var(--sp, 64px); }
.route { font-family: var(--mono); font-size: 12.5px; letter-spacing: 0.04em; color: var(--accent); }
.page-title {
  font-family: var(--disp); font-weight: 600;
  font-size: clamp(34px,4.5vw,52px); line-height: 1.1; letter-spacing: -0.02em;
  margin: 12px 0 0;
}
.chips { margin-top: 20px; display: flex; flex-wrap: wrap; gap: 8px; }
.chip, .card-chip {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.03em;
  border: 1px solid var(--line-strong); border-radius: 999px; padding: 4px 12px;
  color: var(--tx-dim);
}
.chip.todo-chip { background: var(--todo-bg); color: var(--todo-tx); border-color: var(--todo-line); }
.chip.clean-chip { background: var(--clean-bg); color: var(--clean-tx); border-color: transparent; }

.seo-meta {
  margin-top: 22px; font-family: var(--mono); font-size: 12.5px; line-height: 1.7;
  color: var(--tx-mute); background: var(--surface-2);
  border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px;
  max-width: 78ch;
}
.seo-k {
  color: var(--accent); font-weight: 500; letter-spacing: 0.08em;
  margin-right: 8px;
}

/* ---------------- prose ---------------- */
.prose { max-width: 65ch; }
.prose > * { margin-top: 0; }
.prose p { margin: 0 0 22px; color: var(--tx-dim); }
.prose p strong { color: var(--tx); font-weight: 600; }
.prose h2, .prose h3, .prose h4 {
  font-family: var(--disp); color: var(--tx);
  letter-spacing: -0.015em; line-height: 1.15; font-weight: 600;
}
.prose h2 { font-size: 28px; margin: 56px 0 18px; }
.prose h3 { font-size: 21px; margin: 44px 0 14px; }
.prose h4 { font-size: 17px; margin: 34px 0 12px; }
.prose h3.seclabel {
  font-size: 15px; font-family: var(--mono); font-weight: 500;
  letter-spacing: 0.04em; text-transform: none; color: var(--tx);
  margin: 44px 0 12px; padding-top: 20px; border-top: 1px solid var(--line);
}
.prose h3.seclabel + p { margin-top: -2px; }

.prose .list { margin: 0 0 22px; padding-left: 22px; color: var(--tx-dim); }
.prose .list li { margin-bottom: 8px; }

.prose hr.rule { border: 0; border-top: 1px solid var(--line); margin: 48px 0; }

/* hero (rendered from Hero fence) */
.hero {
  margin: 0 0 8px; padding: 30px 30px 34px; max-width: none;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 16px; box-shadow: var(--panel-sh);
}
.hero-ey {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--mono); font-size: 12px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent);
}
.hero-ey::before, .ey-rule { content: ""; width: 22px; height: 1px; background: var(--accent); display: inline-block; }
.hero-h1 {
  font-family: var(--disp); font-weight: 600;
  font-size: clamp(28px,3.4vw,40px); line-height: 1.12; letter-spacing: -0.02em;
  color: var(--tx); margin: 18px 0 0; max-width: 20ch;
}
.hero-sub { color: var(--tx-dim); font-size: 18px; line-height: 1.6; margin: 20px 0 0; max-width: 56ch; }
.hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.pill {
  font-family: var(--body); font-size: 14px; font-weight: 500;
  border-radius: 999px; padding: 10px 20px; border: 1px solid transparent;
  cursor: default; user-select: none;
}
.pill.pri { background: var(--accent); color: var(--btn-ink); }
.pill.ghost { background: transparent; color: var(--tx); border-color: var(--line-strong); }

/* spec panel (non-hero fences) */
.spec {
  margin: 0 0 26px; max-width: none;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 12px; box-shadow: var(--panel-sh); overflow: hidden;
}
.spec pre {
  margin: 0; padding: 18px 20px; overflow-x: auto;
  font-family: var(--mono); font-size: 12.5px; line-height: 1.65;
  color: var(--tx-dim); white-space: pre;
}

/* review markers + cross-refs (inline) */
mark.todo {
  background: var(--todo-bg); color: var(--todo-tx);
  border: 1px solid var(--todo-line); border-radius: 5px;
  padding: 0 5px; font-family: var(--mono); font-size: 0.86em;
  font-weight: 500; white-space: normal;
}
.xref {
  color: var(--tx-mute); font-family: var(--mono); font-size: 0.86em;
  border: 1px dashed var(--line-strong); border-radius: 5px; padding: 0 5px;
}

/* ---------------- page nav ---------------- */
.pagenav {
  margin-top: 72px; padding-top: 28px; border-top: 1px solid var(--line);
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.pn { display: flex; flex-direction: column; gap: 4px; padding: 14px 16px;
  border: 1px solid var(--line); border-radius: 10px; background: var(--surface-2); }
.pn:hover { border-color: var(--accent); }
.pn.next { text-align: right; }
.pn.empty { border: 0; background: none; }
.pn-k { font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.06em; color: var(--tx-mute); text-transform: uppercase; }
.pn-t { font-size: 15px; color: var(--tx); }

/* ---------------- footer ---------------- */
.pagefoot { border-top: 1px solid var(--line); padding: 30px 0; margin-top: 40px; }
.pagefoot .wrap { display: flex; flex-wrap: wrap; gap: 10px; align-items: center;
  font-family: var(--mono); font-size: 12px; color: var(--tx-mute); }
.pagefoot .dot { color: var(--ghost); }

/* ---------------- index ---------------- */
.indexmain { padding: clamp(48px,7vw,88px) 28px 40px; max-width: 1120px; }
.index-hero { margin-bottom: 64px; max-width: 72ch; }
.index-hero h1 {
  font-family: var(--disp); font-weight: 600; font-size: clamp(34px,4.5vw,52px);
  line-height: 1.1; letter-spacing: -0.02em; margin: 16px 0 0;
}
.index-intro { color: var(--tx-dim); font-size: 18px; line-height: 1.6; margin: 22px 0 0; }
.index-stats { margin-top: 26px; display: flex; flex-wrap: wrap; gap: 8px; }

.volsec { margin-bottom: 56px; }
.volhead { display: flex; align-items: baseline; flex-wrap: wrap; gap: 14px;
  padding-bottom: 16px; border-bottom: 1px solid var(--line-strong); margin-bottom: 22px; }
.volhead h2 { font-family: var(--disp); font-weight: 600; font-size: 24px; letter-spacing: -0.015em; margin: 0; }
.theme-chip {
  font-family: var(--mono); font-size: 11.5px; letter-spacing: 0.04em;
  color: var(--accent); border: 1px solid var(--line-strong); border-radius: 999px; padding: 3px 10px;
}
.vol-meta { margin-left: auto; font-family: var(--mono); font-size: 12px; color: var(--tx-mute); }

.pgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.pcard {
  display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto;
  gap: 4px 10px; align-items: start;
  padding: 16px 16px; border: 1px solid var(--line); border-radius: 12px;
  background: var(--surface); box-shadow: var(--panel-sh);
  transition: transform 0.16s ease, border-color 0.16s ease;
}
.pcard:hover { transform: translateY(-2px); border-color: var(--accent); }
.pcard.prod { background: var(--surface-2); border-style: dashed; }
.pcard-route { grid-column: 1; font-family: var(--mono); font-size: 11.5px; color: var(--accent); letter-spacing: 0.02em; }
.pcard-title { grid-column: 1; font-size: 15px; color: var(--tx); line-height: 1.35; }
.card-chip { grid-column: 2; grid-row: 1 / span 2; align-self: center; min-width: 30px; text-align: center; }

@media (max-width: 860px) {
  .pgrid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .pgrid { grid-template-columns: 1fr; }
  .pagenav { grid-template-columns: 1fr; }
  .pn.next { text-align: left; }
}

/* ================= inline commenting layer ================= */
/* Injected by review-comments.js. Inherits theme tokens via body class.
   Accent = theme accent (orange paper/dark, blue t-blue). Amber is left
   untouched for [CONFIRM] marks. Kept visually quiet. */

/* topbar comment counter chip */
.cr-count {
  font-family: var(--mono); font-size: 12px; letter-spacing: 0.03em;
  color: var(--tx-dim); background: var(--surface-2);
  border: 1px solid var(--line-strong); border-radius: 999px;
  padding: 3px 11px; margin-left: 4px; white-space: nowrap;
}
.cr-count.has { color: var(--accent); border-color: var(--accent); }

/* footer export link */
.cr-export { color: var(--tx-dim); border-bottom: 1px dotted var(--line-strong); }
.cr-export:hover { color: var(--accent); border-color: var(--accent); }

/* commentable block anchor + floating trigger */
[data-cb] { position: relative; }
.cr-btn {
  position: absolute; top: 2px; right: -14px;
  transform: translateX(100%);
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px;
  border: 1px solid var(--line-strong); background: var(--surface);
  box-shadow: var(--panel-sh); cursor: pointer;
  font-size: 14px; line-height: 1; opacity: 0;
  transition: opacity 0.14s ease; z-index: 5; padding: 0;
}
[data-cb]:hover > .cr-btn, .cr-btn.open, .cr-btn:focus { opacity: 1; }
.cr-btn:hover { border-color: var(--accent); }
@media (max-width: 720px) {
  .cr-btn { right: 4px; transform: none; opacity: 0.55; }
}

/* commented block accent */
[data-cb].cr-has {
  border-left: 2px solid var(--accent);
  padding-left: 16px; margin-left: -18px;
}

/* popover */
.cr-pop {
  position: absolute; z-index: 60; width: min(340px, 88vw);
  background: var(--surface); color: var(--tx);
  border: 1px solid var(--line-strong); border-radius: 12px;
  box-shadow: var(--panel-sh), 0 10px 40px rgba(0,0,0,0.14);
  padding: 14px; margin-top: 6px;
}
.cr-pop-lab {
  display: block; font-family: var(--mono); font-size: 12px;
  letter-spacing: 0.04em; color: var(--tx-mute); margin: 0 0 6px;
}
.cr-pop textarea, .cr-pop input {
  width: 100%; box-sizing: border-box; font-family: var(--body);
  font-size: 14px; color: var(--tx); background: var(--surface-2);
  border: 1px solid var(--line-strong); border-radius: 8px;
  padding: 9px 11px; line-height: 1.5; resize: vertical;
}
.cr-pop textarea { min-height: 78px; }
.cr-pop textarea:focus, .cr-pop input:focus { outline: none; border-color: var(--accent); }
.cr-pop input { margin-top: 10px; }
.cr-pop-note {
  display: block; font-family: var(--mono); font-size: 11px;
  color: var(--tx-mute); margin-top: 9px; line-height: 1.5;
}
.cr-pop-row { display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end; }
.cr-pill {
  font-family: var(--body); font-size: 13px; font-weight: 500;
  border-radius: 999px; padding: 7px 16px; border: 1px solid transparent;
  cursor: pointer;
}
.cr-pill.pri { background: var(--accent); color: var(--btn-ink); }
.cr-pill.pri:disabled { opacity: 0.45; cursor: default; }
.cr-pill.ghost { background: transparent; color: var(--tx-dim); border-color: var(--line-strong); }
.cr-pill.ghost:hover { color: var(--tx); border-color: var(--tx-mute); }

/* rendered comment cards under a block */
.cr-cards { margin: 10px 0 22px; display: flex; flex-direction: column; gap: 8px; }
.cr-card {
  background: var(--surface-2); border: 1px solid var(--line);
  border-radius: 10px; padding: 10px 13px;
}
.cr-card-head {
  display: flex; align-items: baseline; gap: 8px;
  font-family: var(--mono); font-size: 11.5px; color: var(--tx-mute);
  margin-bottom: 4px;
}
.cr-card-who { color: var(--accent); font-weight: 500; }
.cr-card-body { font-size: 14px; color: var(--tx-dim); line-height: 1.55; white-space: pre-wrap; }
.cr-card-del {
  margin-left: auto; cursor: pointer; color: var(--tx-mute);
  background: none; border: 0; font-family: var(--mono); font-size: 11.5px; padding: 0;
}
.cr-card-del:hover { color: var(--accent); }
`;

// ---- inline commenting layer (vanilla JS, written to assets) ------------
const COMMENTS_JS = String.raw`// InstaSafe Content Review — inline commenting layer.
// Vanilla JS, no deps. Loaded on every generated page. Comments save to
// localStorage (per browser) and, if configured, POST to a Google Form so
// they collect centrally in a Sheet. If the form is not configured yet the
// widget still works fully local-only.
(function () {
  "use strict";

  // ==== CONFIG — set after creating the Google Form ====
  const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdzptqSn7ubnP3XAiUboFfCSOAFqqpRwH2sEy1R7gluh7w6Cw/formResponse";
  const FIELD_IDS = { page: "entry.1347920383", section: "entry.1743009236", comment: "entry.613168385", reviewer: "entry.2128701935" };
  // =====================================================

  const LS_COMMENTS = "cr-comments";
  const LS_REVIEWER = "cr-reviewer";
  const PAGE_KEY = location.pathname; // stable per generated file
  const PAGE_TITLE = (document.title || "").replace(/\s+—\s+InstaSafe Content Review$/, "").trim();
  const configured = !!FORM_ACTION;

  // ---- storage helpers ----
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(LS_COMMENTS) || "[]"); }
    catch (e) { return []; }
  }
  function saveAll(list) {
    try { localStorage.setItem(LS_COMMENTS, JSON.stringify(list)); } catch (e) {}
  }
  function getReviewer() { try { return localStorage.getItem(LS_REVIEWER) || ""; } catch (e) { return ""; } }
  function setReviewer(v) { try { localStorage.setItem(LS_REVIEWER, v); } catch (e) {} }

  function forPage(list) { return list.filter((c) => c.pageKey === PAGE_KEY); }
  function forBlock(list, cb) { return forPage(list).filter((c) => c.cb === cb); }

  function blockText(el) {
    return (el.textContent || "").replace(/\s+/g, " ").trim();
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function fmtTime(ts) {
    try { return new Date(ts).toLocaleString(); } catch (e) { return ""; }
  }

  // ---- central sync (Google Form) ----
  function postToForm(c) {
    if (!configured) return;
    const fd = new FormData();
    if (FIELD_IDS.page)     fd.append(FIELD_IDS.page, PAGE_KEY + " — " + PAGE_TITLE);
    if (FIELD_IDS.section)  fd.append(FIELD_IDS.section, c.cb + " — " + c.sectionText);
    if (FIELD_IDS.comment)  fd.append(FIELD_IDS.comment, c.text);
    if (FIELD_IDS.reviewer) fd.append(FIELD_IDS.reviewer, c.reviewer);
    fetch(FORM_ACTION, { method: "POST", mode: "no-cors", body: fd }).catch(function () {});
  }

  // ---- counter chip ----
  function updateCount() {
    const chip = document.querySelector("[data-cr-count]");
    if (!chip) return;
    const all = loadAll();
    let n;
    if (document.body.classList.contains("index")) {
      n = all.length; // index shows total across pages
    } else {
      n = forPage(all).length;
    }
    chip.textContent = "💬 " + n;
    chip.hidden = false;
    chip.classList.toggle("has", n > 0);
  }

  // ---- render comment cards under a block ----
  function renderCards(el, cb) {
    // remove old card container
    const old = el.parentNode.querySelector('.cr-cards[data-for="' + cb + '"]');
    if (old) old.remove();

    const mine = forBlock(loadAll(), cb);
    el.classList.toggle("cr-has", mine.length > 0);
    if (!mine.length) return;

    const box = document.createElement("div");
    box.className = "cr-cards";
    box.setAttribute("data-for", cb);
    box.innerHTML = mine.map(function (c) {
      return '<div class="cr-card">' +
        '<div class="cr-card-head">' +
          '<span class="cr-card-who">' + esc(c.reviewer || "You") + "</span>" +
          '<span>' + esc(fmtTime(c.ts)) + "</span>" +
          '<button class="cr-card-del" data-del="' + c.id + '" type="button">delete</button>' +
        "</div>" +
        '<div class="cr-card-body">' + esc(c.text) + "</div>" +
      "</div>";
    }).join("");

    // insert right after the block
    el.parentNode.insertBefore(box, el.nextSibling);

    box.querySelectorAll("[data-del]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-del");
        saveAll(loadAll().filter(function (c) { return c.id !== id; }));
        renderCards(el, cb);
        updateCount();
      });
    });
  }

  // ---- popover ----
  let openPop = null;
  function closePop() {
    if (openPop) { openPop.remove(); openPop = null; }
    document.querySelectorAll(".cr-btn.open").forEach(function (b) { b.classList.remove("open"); });
  }

  function openPopover(el, cb, btn) {
    closePop();
    btn.classList.add("open");
    const pop = document.createElement("div");
    pop.className = "cr-pop";
    const note = configured ? "" :
      '<span class="cr-pop-note">Saved locally — central sync not configured yet.</span>';
    pop.innerHTML =
      '<label class="cr-pop-lab">Comment on this section</label>' +
      '<textarea placeholder="Comment on this section…"></textarea>' +
      '<input type="text" class="cr-name" placeholder="Your name" value="' + esc(getReviewer()) + '">' +
      note +
      '<div class="cr-pop-row">' +
        '<button class="cr-pill ghost" data-cancel type="button">Cancel</button>' +
        '<button class="cr-pill pri" data-submit type="button">Submit</button>' +
      "</div>";

    el.appendChild(pop);
    openPop = pop;
    // position: sits below the trigger, clamped into the block
    pop.style.top = (btn.offsetTop + btn.offsetHeight + 4) + "px";
    pop.style.right = "0px";

    const ta = pop.querySelector("textarea");
    const nameInput = pop.querySelector(".cr-name");
    const submit = pop.querySelector("[data-submit]");
    ta.focus();

    function refreshDisabled() { submit.disabled = ta.value.trim() === ""; }
    refreshDisabled();
    ta.addEventListener("input", refreshDisabled);

    pop.querySelector("[data-cancel]").addEventListener("click", closePop);
    pop.addEventListener("click", function (e) { e.stopPropagation(); });

    submit.addEventListener("click", function () {
      const text = ta.value.trim();
      if (!text) return;
      const reviewer = nameInput.value.trim();
      if (reviewer) setReviewer(reviewer);
      const c = {
        id: "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        pageKey: PAGE_KEY,
        pageTitle: PAGE_TITLE,
        cb: cb,
        sectionText: blockText(el).slice(0, 90),
        text: text,
        reviewer: reviewer,
        ts: Date.now(),
      };
      const all = loadAll();
      all.push(c);
      saveAll(all);
      postToForm(c);
      closePop();
      renderCards(el, cb);
      updateCount();
    });
  }

  // ---- wire up each commentable block ----
  function initBlocks() {
    document.querySelectorAll("[data-cb]").forEach(function (el) {
      const cb = el.getAttribute("data-cb");
      const btn = document.createElement("button");
      btn.className = "cr-btn";
      btn.type = "button";
      btn.title = "Comment on this section";
      btn.textContent = "💬";
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (openPop && btn.classList.contains("open")) { closePop(); return; }
        openPopover(el, cb, btn);
      });
      el.appendChild(btn);
      renderCards(el, cb);
    });
  }

  // ---- export ----
  function exportTxt() {
    const all = loadAll();
    if (!all.length) { alert("No comments saved in this browser yet."); return; }
    const lines = all.map(function (c) {
      const page = (c.pageKey || "") + " (" + (c.pageTitle || "") + ")";
      const section = c.cb + ": " + (c.sectionText || "");
      return [page, section, c.reviewer || "(no name)", c.text].join(" — ");
    });
    const blob = new Blob([lines.join("\n") + "\n"], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "instasafe-review-comments.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  // ---- boot ----
  function boot() {
    initBlocks();
    updateCount();
    const exp = document.querySelector("[data-cr-export]");
    if (exp) exp.addEventListener("click", function (e) { e.preventDefault(); exportTxt(); });
    document.addEventListener("click", closePop);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closePop(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
`;

// ---- run ----------------------------------------------------------------
const report = build();
console.log("=== InstaSafe Content Review — build report ===");
let totalPages = 0, totalMarkers = 0;
for (const r of report) {
  console.log(`  ${r.vol.padEnd(34)} ${String(r.pages).padStart(2)} pages   ${String(r.markers).padStart(3)} markers`);
  totalPages += r.pages; totalMarkers += r.markers;
}
console.log(`  ${"TOTAL".padEnd(34)} ${String(totalPages).padStart(2)} pages   ${String(totalMarkers).padStart(3)} markers`);
