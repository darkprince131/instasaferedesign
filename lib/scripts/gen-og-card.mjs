/* ============================================================
   THE SOCIAL CARD GENERATOR.

   Run: node lib/scripts/gen-og-card.mjs

   OUTPUTS — all four are ARTEFACTS OF THIS SCRIPT. Do not hand-edit
   them; edit this file and re-run.
     app/opengraph-image.png     1200x630, the site-wide card
     app/twitter-image.png       byte-identical copy; Next wants its own file
     app/opengraph-image.alt.txt
     app/twitter-image.alt.txt

   WHY A FILE AND NOT A ROUTE. This replaced `app/opengraph-image.tsx`,
   a Next ImageResponse route that drew an orange dot beside the word
   "InstaSafe" in whatever sans satori could find — an invented logo on
   the single highest-traffic sharing surface the site has. The real
   lockup is a vector of outlined paths (public/brand/), and satori
   cannot rasterise an arbitrary SVG, so the card had to become a
   composed raster. Next's file convention serves it and emits the
   <meta> tags exactly the same way, and every route without its own
   opengraph-image still inherits this one.

   INGREDIENTS
     public/brand/instasafe-lockup-white.svg — the real lockup. Outlined
       paths, no live type, so it rasterises at any size.
     public/hero/hero-dark-desktop.webp — the homepage doorway hero, the
       one signature image the site has. Cropped to the lit doorway and
       dissolved into the ground on its left edge so there is no seam.

   TYPE IS DRAWN, NOT SET. Geist is the site's display face and is not
   installed as a system font, and sharp's Windows build ignores
   FONTCONFIG_PATH, so `font-family="Geist"` silently falls back to a
   serif. The headline is therefore not SET at all: the TTF's glyph
   outlines are read and emitted as SVG <path> data. That reader, and
   the reasoning behind it, now live in og-lib.mjs — shared with
   gen-og-pages.mjs, which needed exactly the same three things.

   Only the 400 weight exists as a TTF, so display weight is faked the
   honest way: a hairline stroke in the fill colour, which thickens the
   stems without the smear of synthetic obliquing. There is no kerning
   table applied — Geist's default sidebearings carry these three short
   lines, and the alternative is a GPOS implementation nobody will
   maintain.
   ============================================================ */

import fs from "node:fs";

import { p, sharp, loadGeist, textPath, measure } from "./og-lib.mjs";

/* ============================================================
   The card
   ============================================================ */

const W = 1200;
const H = 630;
const GROUND = "#0a0b0d";
const PAD = 64;

const INK = "#f1f1f3";
const ACCENT = "#f2480a";
const MUTE = "#9a9aa2";

/* The photo owns the right slab. Its left FADE px dissolve into the
   ground, so the text column really ends around 600; TEXT_MAX keeps the
   headline clear of the dissolve. */
const IMG_X = 640;
const IMG_W = W - IMG_X;
const FADE = 108;
const TEXT_MAX = 520;

const geist = loadGeist();

/* ---------- 1. the doorway ---------- */

/* Measured off the plate: the glowing frame stands between x 533 and
   x 1148 of the 1672x941 source. The crop is chosen so the whole frame
   lands clear of the dissolve, with the dark wall to its left absorbing
   the fade. Height is filled exactly, so there is no vertical crop. */
const SRC = p("public/hero/hero-dark-desktop.webp");
const SRC_H = 941;
const DOOR_L = 533;
const scale = H / SRC_H;
const cropW = Math.round(IMG_W / scale);
const cropL = Math.round(DOOR_L - (FADE + 8) / scale);

const photoRgb = await sharp(SRC)
  .extract({ left: cropL, top: 0, width: cropW, height: SRC_H })
  .resize(IMG_W, H, { fit: "fill" })
  .modulate({ brightness: 1.04 })
  .removeAlpha()
  .raw()
  .toBuffer();

/* Smoothstep alpha ramp on the left edge. A linear ramp leaves a faint
   hard line where it reaches 1; smoothstep does not. */
const alpha = Buffer.alloc(IMG_W * H);
for (let x = 0; x < IMG_W; x++) {
  const t = Math.min(1, x / FADE);
  const a = Math.round(255 * (t * t * (3 - 2 * t)));
  for (let y = 0; y < H; y++) alpha[y * IMG_W + x] = a;
}

const photo = await sharp(photoRgb, { raw: { width: IMG_W, height: H, channels: 3 } })
  .joinChannel(alpha, { raw: { width: IMG_W, height: H, channels: 1 } })
  .png()
  .toBuffer();

/* ---------- 2. the lockup ---------- */

const LOCKUP_W = 296;
/* Rasterise large, trim to the real ink, then resize — so the 64px
   margin is measured off the letterforms, not off viewBox padding. */
const lockup = await sharp(p("public/brand/instasafe-lockup-white.svg"), { density: 700 })
  .trim({ threshold: 1 })
  .resize({ width: LOCKUP_W })
  .png()
  .toBuffer();
const lockupMeta = await sharp(lockup).metadata();

/* ---------- 3. the type ---------- */

const L1 = "Zero Trust access,";
const L2 = "in one console.";
const TAG = "ZTNA · ZTAA · Identity · MFA · Device trust".toUpperCase();

const STROKE = 1.5; // the stand-in for weight 600

/* Auto-fit so a copy change can never push the headline into the photo. */
let headSize = 62;
while (
  headSize > 24 &&
  Math.max(
    measure(geist, L1, headSize, -headSize * 0.018),
    measure(geist, L2, headSize, -headSize * 0.018)
  ) > TEXT_MAX
) {
  headSize -= 1;
}
const headTrack = -headSize * 0.018;

let tagSize = 18;
while (tagSize > 10 && measure(geist, TAG, tagSize, tagSize * 0.13) > TEXT_MAX) tagSize -= 1;
const tagTrack = tagSize * 0.13;

const lineH = Math.round(headSize * 1.16);
const base1 = 340;
const base2 = base1 + lineH;
const tagBase = H - PAD - 4;

const t1 = textPath(geist, L1, headSize, PAD, base1, headTrack);
const t2 = textPath(geist, L2, headSize, PAD, base2, headTrack);
const t3 = textPath(geist, TAG, tagSize, PAD, tagBase, tagTrack);

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <path d="${t1.d}" fill="${INK}" stroke="${INK}" stroke-width="${STROKE}" stroke-linejoin="round"/>
  <path d="${t2.d}" fill="${ACCENT}" stroke="${ACCENT}" stroke-width="${STROKE}" stroke-linejoin="round"/>
  <rect x="${PAD}" y="${tagBase - 52}" width="44" height="2" fill="${ACCENT}"/>
  <path d="${t3.d}" fill="${MUTE}"/>
</svg>`;

/* ---------- 4. compose ---------- */

const card = await sharp({
  create: { width: W, height: H, channels: 3, background: GROUND },
})
  .composite([
    { input: photo, left: IMG_X, top: 0 },
    { input: lockup, left: PAD, top: PAD },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .png({ compressionLevel: 9, effort: 10, palette: true, colours: 256, dither: 1 })
  .toBuffer();

fs.writeFileSync(p("app/opengraph-image.png"), card);
fs.writeFileSync(p("app/twitter-image.png"), card);

const ALT = "InstaSafe — Zero Trust access in one console";
fs.writeFileSync(p("app/opengraph-image.alt.txt"), ALT);
fs.writeFileSync(p("app/twitter-image.alt.txt"), ALT);

console.log(
  [
    `font       Geist-Regular.ttf, ${geist.cmap.size} glyphs mapped, outlines inlined`,
    `crop       left=${cropL} width=${cropW} of the ${SRC_H}px-tall plate`,
    `lockup     ${lockupMeta.width}x${lockupMeta.height}`,
    `headline   ${headSize}px, widest line ${Math.max(t1.width, t2.width).toFixed(0)}px (max ${TEXT_MAX})`,
    `tagline    ${tagSize}px, ${t3.width.toFixed(0)}px`,
    `written    app/opengraph-image.png + app/twitter-image.png  ${(card.length / 1024).toFixed(1)} KB each`,
  ].join("\n")
);
