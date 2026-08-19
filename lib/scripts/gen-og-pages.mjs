/* ============================================================
   THE PER-PAGE SOCIAL CARDS.

   Run: python prototypes/og/gen_og_kit.py   (draws the fifteen scenes)
        node   lib/scripts/gen-og-pages.mjs  (bakes them into cards)

   OUTPUTS — sixty files, four per route, ALL ARTEFACTS OF THIS SCRIPT.
   Do not hand-edit them; edit this file, or the kit, and re-run.
     app/<route>/opengraph-image.png       1200x630
     app/<route>/twitter-image.png         byte-identical copy
     app/<route>/opengraph-image.alt.txt
     app/<route>/twitter-image.alt.txt

   WHY PER-PAGE AT ALL. Next's file convention means a route without its
   own opengraph-image silently inherits app/opengraph-image.png — so
   until now every one of these fifteen pages shared the homepage's
   doorway card. Fifteen different offers, one picture. The illustration
   kit already draws a scene per page; this makes the share surface say
   which page it is.

   WHY A SIBLING SCRIPT AND NOT A BRANCH INSIDE gen-og-card.mjs. That
   card is a photographic composite on near-black with a dissolve; these
   are flat vector illustrations on bone. They share the type machinery
   (og-lib.mjs) and nothing else. Folding both into one file would mean
   a flag threaded through every constant.

   THE GEOMETRY IS THE KIT'S, NOT A NEW ONE.
     · The scenes are normalised to exactly 1.250 (see fit_vb in
       gen_og_kit.py, which explains why that number). SCENE_W/SCENE_H
       below are the integer pair nearest 61% of the frame that is
       exactly 1.250, so the art is placed at its true aspect — no
       stretch, no crop, and 23px of bone above and below.
     · Where the headline may run is not guessed: each scene file
       carries data-content, the ink's bounding box inside its own
       canvas, and the column stops short of that.

   ONE TYPE SIZE FOR ALL FIFTEEN. HEAD_SIZE is solved once, for the
   whole set, as the largest integer at which every approved H1 fits in
   two balanced lines inside the narrowest available column. Fitting
   each card independently would give the short titles 56px and the long
   ones 30px, and the fifteen would stop looking like a set — which was
   exactly the complaint the kit's uniform canvas was built to answer.

   THE EYEBROW IS NOT MONO. The site's mono face, Geist Mono, ships in
   Next only as woff2 — a brotli-compressed container with a transformed
   glyf table, which the little TTF reader in og-lib.mjs cannot open and
   should not grow to. The eyebrow is therefore Geist caps on wide
   tracking, which is the same idiom the site-wide card's tagline uses,
   rather than a monospace fallback nobody chose.

   THE SCENES ARE RASTERISED IN CHROME, NOT IN sharp. The labels INSIDE
   the drawings — ENDPOINT CONTROLS, the OTP digits, GOVERNED SESSION,
   the watermark tiles — are real SVG <text> in the kit's mono stack.
   sharp's librsvg resolves none of that stack on Windows and shipped
   every one of them in Times; see chrome-raster.mjs, which now does
   the rasterising and refuses to run if the stack does not resolve to
   a monospaced face. Chrome also renders the scenes the way the review
   board rendered them, and the board is what was approved.
   ============================================================ */

import fs from "node:fs";
import path from "node:path";

import { p, sharp, loadGeist, textPath, measure } from "./og-lib.mjs";
import { openChrome, MONO_STACK } from "./chrome-raster.mjs";

/* ---------- the frame ---------- */

const W = 1200;
const H = 630;

/* The illustration ground, straight out of gen_scene_kit's palette. The
   card is this colour edge to edge; the scene raster carries the same
   value, so there is no seam to hide. */
const GROUND = "#F7F4EF";
const INK = "#2B2B2E";
const ACCENT = "#F2621A";

/* 730/584 is exactly 1.250 and 60.8% of the frame — the nearest integer
   pair to "61% wide" that needs no resampling of the aspect. 732 would
   want 585.6 and force a 0.07% vertical squash for nothing. */
const SCENE_W = 730;
const SCENE_H = 584;
const SCENE_X = W - SCENE_W;
const SCENE_Y = Math.round((H - SCENE_H) / 2); // 23px of bone, top and bottom

const PAD_L = 72; // the left margin, measured to the ink not the box
const GUTTER = 26; // clear air between the text column and the artwork
const COL_MAX = Math.round(W * 0.46) - PAD_L; // the ~46% column, less its padding

const LOCKUP_W = 150;
const LOCKUP_BOTTOM = H - 56;

const EYEBROW_SIZE = 15;
const EYEBROW_BASE = 96;
const HEAD_LEAD = 1.18;
const STROKE = 0.8; // the stand-in for weight 600, in proportion to HEAD_SIZE

const SCENES = p("prototypes/og/scenes");
const geist = loadGeist();

/* ---------- what each drawing shows ----------

   Written by hand against the scenes, because the alt text is the only
   part of a social card a screen reader gets and "InstaSafe social card"
   tells a listener nothing. Keyed by route; a page in the manifest with
   no entry here is a hard error below, so a sixteenth scene cannot ship
   with a placeholder. */
/* Routes whose card cannot use Next's file convention, and where its PNG
   goes instead. See the comment at the write site for why /blog is here;
   any future route living behind the legacy proxy belongs here too. */
const OFF_CONVENTION = {
  "/blog": ["public", "og", "blog.png"],
};

const ALT = {
  "/platform":
    "Isometric illustration: a platform plinth carrying four labelled modules — SSO, MFA, " +
    "IAM and a taller, highlighted ZTNA — with access routes running out to four satellite pads.",
  "/solutions":
    "Isometric illustration: three greyed-out, crossed-through stacks on the left converge " +
    "through a single glowing ring into one lit console panel reading IN SCOPE.",
  "/multifactor-authentication":
    "Isometric illustration: a central authentication plinth ringed by six factor satellites — " +
    "email, SMS, a number grid, a hardware key, a six-digit OTP disc and push — each running a " +
    "spoke into the hub.",
  "/zero-trust-features/single-sign-on":
    "Isometric illustration: a laptop showing ONE LOGIN sends a single route into a tall gate " +
    "tower, which fans out to five app tiles — GitHub, AWS, Gmail, Figma and Azure.",
  "/zero-trust-network-access":
    "Isometric illustration: a laptop reading USER DEVICE routes into a ZERO TRUST panel and on " +
    "to an ERP console reading ACCESS GRANTED, while a greyed, crossed-out cluster of servers " +
    "floats unreachable above the flow.",
  "/zero-trust-application-access":
    "Isometric illustration: one application console stands lit on its plinth reading APP and " +
    "OPEN, with a single route arriving from the left, beneath a greyed, crossed-out cluster of " +
    "servers.",
  "/zero-trust-features/device-binding":
    "Isometric illustration: a laptop reading THIS DEVICE with a key sliding into its " +
    "certificate slot, beside a padlocked panel reading BOUND TO and one MAC address.",
  "/zero-trust-features/device-posture-check":
    "Isometric illustration: a laptop mid-SCAN inside two concentric orange halos, next to a " +
    "DEVICE CHECK sheet with three ticked rows — OS, AV and DISK.",
  "/platform/endpoint-controls":
    "Isometric illustration: a laptop on a lit control plinth with a six-segment status strip " +
    "along its front edge, and a greyed, crossed-out unmanaged machine standing behind it.",
  "/awards":
    "Isometric illustration: a three-step podium carrying a trophy on the tallest step, a " +
    "rosette and Gartner nameplate on the first, and a G2 mark on the third.",
  "/instasafe-newsroom":
    "Isometric illustration: an upright front page with an InstaSafe NEWSROOM masthead, a lead " +
    "story and a photo, standing on a plinth in front of two blank sheets.",
  "/blog":
    "Isometric illustration: an upright article page with an orange caret mid-paragraph, sheets " +
    "leaning behind it, and ZTNA, MFA and SDP topic chips along the plinth apron.",
  "/careers":
    "Isometric illustration: three ascending decks with an orange route climbing them step by " +
    "step to a flag planted on the top one.",
  "/resource-center":
    "Isometric illustration: a shelf of five upright volumes of different heights on one " +
    "plinth, with a ticked download sheet on a smaller plinth to its right.",
  "/book-a-demo":
    "Isometric illustration: a SEPTEMBER calendar panel with one date circled in orange, a clock " +
    "beside it, and a laptop reading BOOK A SLOT routed in from the left.",
};

/* ---------- 1. read the kit's output ---------- */

const manifestPath = path.join(SCENES, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  throw new Error(
    `No scenes at ${SCENES}. Run \`python prototypes/og/gen_og_kit.py\` first — ` +
      `the drawings and the approved copy both come from there.`
  );
}
const pages = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const missing = pages.map((g) => g.slug).filter((s) => !ALT[s]);
if (missing.length) throw new Error(`No alt text written for: ${missing.join(", ")}`);

/* Each scene's ink box, in card pixels. fit_vb pads the canvas with empty
   bone, so the drawing starts well inside its own left edge — that slack
   is real column width and is not thrown away. */
const scenes = pages.map((g) => {
  const svg = fs.readFileSync(path.join(SCENES, g.file), "utf8");
  const vb = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
  const dc = /data-content="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
  const inkLeft = SCENE_X + ((dc[0] - vb[0]) / vb[2]) * SCENE_W;
  return { ...g, svg, inkLeft, textMax: Math.min(COL_MAX, inkLeft - GUTTER - PAD_L) };
});

/* ---------- 2. one headline size for the whole set ---------- */

/** Split a title into two lines at the point that minimises the WIDER of
    them. Greedy wrapping fills line one and dumps the remainder, which
    both looks like an accident and fits worse; the balanced break is the
    one that lets the type be biggest, so it is what sets HEAD_SIZE. */
function balance(str, size) {
  const tracking = -size * 0.018;
  const words = str.split(" ");
  let best = { lines: [str], width: measure(geist, str, size, tracking), tracking };
  for (let k = 1; k < words.length; k++) {
    const a = words.slice(0, k).join(" ");
    const b = words.slice(k).join(" ");
    const width = Math.max(measure(geist, a, size, tracking), measure(geist, b, size, tracking));
    if (width < best.width) best = { lines: [a, b], width, tracking };
  }
  return best;
}

/** What actually gets set. A title that fits on one line stays on one
    line — "Grow with InstaSafe." broken across two because the balanced
    split is narrower would be a rule beating a reading. */
function layout(str, size, cap) {
  const tracking = -size * 0.018;
  const one = measure(geist, str, size, tracking);
  return one <= cap ? { lines: [str], width: one, tracking } : balance(str, size);
}

const NARROWEST = Math.min(...scenes.map((s) => s.textMax));
let HEAD_SIZE = 56;
while (HEAD_SIZE > 20 && scenes.some((s) => balance(s.h1, HEAD_SIZE).width > NARROWEST)) {
  HEAD_SIZE -= 1;
}
const LINE_H = Math.round(HEAD_SIZE * HEAD_LEAD);
const CAP_H = HEAD_SIZE * 0.72; // Geist cap height, near enough for optical centring

/* ---------- 3. the lockup, once ----------

   The bone-ground cards need the INK lockup, not the white one the
   site-wide card uses. It is recoloured rather than used raw: the file
   paints pure #000, which next to a #2B2B2E headline reads as a colder,
   heavier mark. Rasterise large, trim to the real letterforms so PAD_L
   is measured off the ink and not off viewBox padding, then keep only
   the alpha and pour the headline's own ink through it. */
const lockupMask = await sharp(p("public/brand/instasafe-lockup-black.svg"), { density: 700 })
  .trim({ threshold: 1 })
  .resize({ width: LOCKUP_W })
  .ensureAlpha()
  .png()
  .toBuffer();
const lkMeta = await sharp(lockupMask).metadata();
const lockup = await sharp({
  create: { width: lkMeta.width, height: lkMeta.height, channels: 3, background: INK },
})
  .joinChannel(await sharp(lockupMask).extractChannel("alpha").raw().toBuffer(), {
    raw: { width: lkMeta.width, height: lkMeta.height, channels: 1 },
  })
  .png()
  .toBuffer();
const LOCKUP_TOP = LOCKUP_BOTTOM - lkMeta.height;

/* ---------- 4. bake ---------- */

/* Before a single card is composed, prove the renderer can do the one
   thing librsvg could not. If this throws, nothing is written. */
const chrome = await openChrome();
const mono = await chrome.assertMonospace(MONO_STACK);

const rows = [];
let total = 0;

for (const s of scenes) {
  /* Rasterise at 2x and come back down: the kit draws a lot of 0.7-1.2
     unit strokes, and resolving them at double density before resampling
     keeps them as hairlines instead of snapping them to one pixel. The 2x
     is Chrome's deviceScaleFactor, so the page is laid out at the true CSS
     size and only the raster is doubled. */
  const art = await sharp(await chrome.shot(s.svg, SCENE_W, SCENE_H, 2))
    .resize(SCENE_W, SCENE_H, { kernel: "lanczos3" })
    .flatten({ background: GROUND })
    .png()
    .toBuffer();

  const eyebrow = `${s.eyebrow.toUpperCase()} /`;
  const eb = textPath(geist, eyebrow, EYEBROW_SIZE, PAD_L, EYEBROW_BASE, EYEBROW_SIZE * 0.16);

  /* Optically centre the headline block on the frame's midline: the block
     runs from the first line's cap top to the last line's baseline. */
  const { lines, tracking, width } = layout(s.h1, HEAD_SIZE, s.textMax);
  const base1 = Math.round((H + CAP_H - (lines.length - 1) * LINE_H) / 2);
  const head = lines
    .map((ln, i) => textPath(geist, ln, HEAD_SIZE, PAD_L, base1 + i * LINE_H, tracking))
    .map(
      (t) =>
        `<path d="${t.d}" fill="${INK}" stroke="${INK}" stroke-width="${STROKE}" ` +
        `stroke-linejoin="round"/>`
    )
    .join("");

  const overlay =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">` +
    `<path d="${eb.d}" fill="${ACCENT}"/>` +
    head +
    `</svg>`;

  const card = await sharp({ create: { width: W, height: H, channels: 3, background: GROUND } })
    .composite([
      { input: art, left: SCENE_X, top: SCENE_Y },
      { input: lockup, left: PAD_L, top: LOCKUP_TOP },
      { input: Buffer.from(overlay), left: 0, top: 0 },
    ])
    /* Flat vector art has maybe two dozen real colours; a truecolour PNG
       spends 4x the bytes carrying an 8-bit-per-channel gradient nothing
       in the frame uses. 256 entries is far more than the palette needs
       even after the kit's soft glows and the type's antialiasing, so the
       quantiser is not actually approximating anything and no dithering
       is required — dither would only stipple the flat bone. */
    .png({ compressionLevel: 9, effort: 10, palette: true, colours: 256, dither: 0 })
    .toBuffer();

  const meta = await sharp(card).metadata();
  if (meta.width !== W || meta.height !== H) {
    throw new Error(`${s.slug}: composed ${meta.width}x${meta.height}, expected ${W}x${H}`);
  }

  /* ONE ROUTE CANNOT USE THE FILE CONVENTION. Caddy proxies `/blog/*`
     wholesale to the legacy Ghost box, so app/blog/opengraph-image.png
     is never reached by Next in production — Ghost answered it with a
     redirect and then a 404, and the card was dead on the most-shared
     page on the site. Its PNG therefore lives in /public/og/ and
     app/blog/page.tsx names it by hand in `metadata.openGraph`. Writing
     it back into app/blog/ here would silently re-break it, so this is
     a redirect rather than an exception to skip. */
  if (OFF_CONVENTION[s.slug]) {
    const out = p(...OFF_CONVENTION[s.slug]);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, card);
    total += card.length;
    rows.push({ slug: s.slug, lines: lines.length, width, col: s.textMax, bytes: card.length });
    continue;
  }

  const dir = p("app", ...s.slug.split("/").filter(Boolean));
  if (!fs.existsSync(path.join(dir, "page.tsx"))) {
    throw new Error(`${s.slug}: no app route folder at ${dir} — the card would never be served.`);
  }
  for (const name of ["opengraph-image.png", "twitter-image.png"]) {
    fs.writeFileSync(path.join(dir, name), card);
  }
  for (const name of ["opengraph-image.alt.txt", "twitter-image.alt.txt"]) {
    fs.writeFileSync(path.join(dir, name), ALT[s.slug]);
  }

  total += card.length * 2 + ALT[s.slug].length * 2;
  rows.push({ slug: s.slug, lines: lines.length, width, col: s.textMax, bytes: card.length });
}

await chrome.close();

/* ---------- 5. say what happened ---------- */

console.log(
  [
    `raster     headless Chrome via CDP, ${SCENE_W}x${SCENE_H} CSS at deviceScaleFactor 2`,
    `mono       "${MONO_STACK}" resolved, advance ${mono.advance.toFixed(4)}em ` +
      `(iiii ${mono.wi.toFixed(2)}px == MMMM ${mono.wm.toFixed(2)}px)`,
    `scenes     ${scenes.length} from prototypes/og/scenes/ at ${SCENE_W}x${SCENE_H} (1.250), ` +
      `placed at x=${SCENE_X} y=${SCENE_Y}`,
    `lockup     instasafe-lockup-black.svg recoloured ${INK}, ${lkMeta.width}x${lkMeta.height} ` +
      `at ${PAD_L},${LOCKUP_TOP}`,
    `headline   ${HEAD_SIZE}px for all ${scenes.length}, lead ${LINE_H}px, ` +
      `narrowest column ${NARROWEST.toFixed(0)}px`,
    "",
  ].join("\n")
);
const col = (v, n) => String(v).padEnd(n);
console.log(col("route", 44) + col("lines", 7) + col("text", 7) + col("col", 7) + "PNG bytes");
console.log("-".repeat(80));
for (const r of rows) {
  console.log(
    col(r.slug, 44) +
      col(r.lines, 7) +
      col(Math.round(r.width), 7) +
      col(Math.round(r.col), 7) +
      r.bytes.toLocaleString("en-US")
  );
}
console.log("-".repeat(80));
console.log(
  `${rows.length * 4} files written · ${(total / 1024).toFixed(1)} KB total · ` +
    `largest PNG ${(Math.max(...rows.map((r) => r.bytes)) / 1024).toFixed(1)} KB`
);
