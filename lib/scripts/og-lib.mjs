/* ============================================================
   SHARED MACHINERY FOR THE SOCIAL-CARD GENERATORS.

   Imported by:
     lib/scripts/gen-og-card.mjs   the one site-wide card
     lib/scripts/gen-og-pages.mjs  the fifteen per-page cards

   This file exists because the second generator needed exactly the
   same three awkward things the first one had already solved, and a
   copy would have meant two TrueType readers drifting apart. Nothing
   here is new — it is gen-og-card.mjs's own code, lifted verbatim, so
   that card's output stays byte-for-byte what it was.

   WHY THE TYPE IS DRAWN AND NOT SET. Geist is the site's display face
   and is not installed as a system font. Next ships a real
   Geist-Regular.ttf inside @vercel/og, but sharp's Windows build
   ignores FONTCONFIG_PATH — every attempt to register the file left
   `font-family="Geist"` falling back to a serif, which is exactly the
   failure that would ship silently. So headlines are not SET at all:
   the TTF's glyph outlines are read directly (cmap/loca/glyf below)
   and emitted as SVG <path> data. Nothing about the output depends on
   what fonts the machine has.

   Only the 400 weight exists as a TTF, so display weight is faked the
   honest way by callers: a hairline stroke in the fill colour, which
   thickens the stems without the smear of synthetic obliquing. There
   is no kerning table applied — Geist's default sidebearings carry
   these short lines, and the alternative is a GPOS implementation
   nobody will maintain.
   ============================================================ */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const ROOT = path.resolve(import.meta.dirname, "..", "..");
export const p = (...s) => path.join(ROOT, ...s);

/* sharp is loaded by absolute path through a file URL rather than by
   bare specifier: these scripts are run from wherever, and on Windows
   a bare `import "sharp"` resolved against the script's own directory
   has bitten us before. */
export const sharp = (await import(pathToFileURL(p("node_modules/sharp/lib/index.js")).href))
  .default;

/* The one TTF the site can count on. Both generators fail loudly rather
   than quietly substituting a face nobody chose. */
export const GEIST_TTF = p("node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf");

export function loadGeist() {
  if (!fs.existsSync(GEIST_TTF)) {
    throw new Error(
      `Geist not found at ${GEIST_TTF}. Next moved it; point this at another ` +
        `Geist TTF before regenerating — the card must not be set in a substitute face.`
    );
  }
  return openFont(GEIST_TTF);
}

/* ============================================================
   A very small TrueType reader: cmap(4) -> loca -> glyf outlines.
   Enough for Latin text set in a static, non-variable font.
   ============================================================ */

export function openFont(file) {
  const b = fs.readFileSync(file);
  const tables = {};
  const numTables = b.readUInt16BE(4);
  for (let i = 0; i < numTables; i++) {
    const o = 12 + i * 16;
    tables[b.toString("latin1", o, o + 4).trim()] = {
      off: b.readUInt32BE(o + 8),
      len: b.readUInt32BE(o + 12),
    };
  }
  for (const t of ["head", "maxp", "cmap", "loca", "glyf", "hhea", "hmtx"]) {
    if (!tables[t]) throw new Error(`${file}: missing '${t}' table`);
  }

  const unitsPerEm = b.readUInt16BE(tables.head.off + 18);
  const indexToLocFormat = b.readInt16BE(tables.head.off + 50);
  const numGlyphs = b.readUInt16BE(tables.maxp.off + 4);
  const numberOfHMetrics = b.readUInt16BE(tables.hhea.off + 34);

  /* loca */
  const loca = new Uint32Array(numGlyphs + 1);
  for (let i = 0; i <= numGlyphs; i++) {
    loca[i] =
      indexToLocFormat === 0
        ? b.readUInt16BE(tables.loca.off + i * 2) * 2
        : b.readUInt32BE(tables.loca.off + i * 4);
  }

  /* cmap: prefer a (3,10) or (3,1) format-4/12 subtable */
  const cmapOff = tables.cmap.off;
  const nSub = b.readUInt16BE(cmapOff + 2);
  let best = null;
  for (let i = 0; i < nSub; i++) {
    const r = cmapOff + 4 + i * 8;
    const pid = b.readUInt16BE(r);
    const eid = b.readUInt16BE(r + 2);
    const sub = cmapOff + b.readUInt32BE(r + 4);
    const fmt = b.readUInt16BE(sub);
    const score = pid === 3 && eid === 10 ? 3 : pid === 3 && eid === 1 ? 2 : pid === 0 ? 1 : 0;
    if (score && (!best || score > best.score)) best = { sub, fmt, score };
  }
  if (!best) throw new Error(`${file}: no usable cmap subtable`);

  const cmap = new Map();
  if (best.fmt === 4) {
    const segX2 = b.readUInt16BE(best.sub + 6);
    const seg = segX2 / 2;
    const endO = best.sub + 14;
    const startO = endO + segX2 + 2;
    const deltaO = startO + segX2;
    const rangeO = deltaO + segX2;
    for (let i = 0; i < seg; i++) {
      const end = b.readUInt16BE(endO + i * 2);
      const start = b.readUInt16BE(startO + i * 2);
      const delta = b.readInt16BE(deltaO + i * 2);
      const rangeOff = b.readUInt16BE(rangeO + i * 2);
      if (start === 0xffff) continue;
      for (let c = start; c <= end && c !== 0x10000; c++) {
        let g;
        if (rangeOff === 0) g = (c + delta) & 0xffff;
        else {
          const gi = rangeO + i * 2 + rangeOff + (c - start) * 2;
          g = b.readUInt16BE(gi);
          if (g) g = (g + delta) & 0xffff;
        }
        if (g) cmap.set(c, g);
      }
    }
  } else if (best.fmt === 12) {
    const nGroups = b.readUInt32BE(best.sub + 12);
    for (let i = 0; i < nGroups; i++) {
      const r = best.sub + 16 + i * 12;
      const s = b.readUInt32BE(r);
      const e = b.readUInt32BE(r + 4);
      const g = b.readUInt32BE(r + 8);
      for (let c = s; c <= e; c++) cmap.set(c, g + (c - s));
    }
  } else {
    throw new Error(`${file}: cmap format ${best.fmt} not supported`);
  }

  const advance = (gid) => {
    const i = Math.min(gid, numberOfHMetrics - 1);
    return b.readUInt16BE(tables.hmtx.off + i * 4);
  };

  /* glyf -> contours of {x, y, on} points, font units, y-up */
  function contours(gid, depth = 0) {
    if (depth > 4) return [];
    const start = tables.glyf.off + loca[gid];
    if (loca[gid] === loca[gid + 1]) return []; // blank (space)
    const n = b.readInt16BE(start);

    if (n < 0) {
      /* composite */
      const out = [];
      let o = start + 10;
      for (;;) {
        const flags = b.readUInt16BE(o);
        const glyphIndex = b.readUInt16BE(o + 2);
        o += 4;
        let dx, dy;
        if (flags & 1) {
          dx = b.readInt16BE(o);
          dy = b.readInt16BE(o + 2);
          o += 4;
        } else {
          dx = b.readInt8(o);
          dy = b.readInt8(o + 1);
          o += 2;
        }
        let a = 1,
          bb = 0,
          c = 0,
          d = 1;
        const f2d = (v) => v / 16384;
        if (flags & 8) {
          a = d = f2d(b.readInt16BE(o));
          o += 2;
        } else if (flags & 0x40) {
          a = f2d(b.readInt16BE(o));
          d = f2d(b.readInt16BE(o + 2));
          o += 4;
        } else if (flags & 0x80) {
          a = f2d(b.readInt16BE(o));
          bb = f2d(b.readInt16BE(o + 2));
          c = f2d(b.readInt16BE(o + 4));
          d = f2d(b.readInt16BE(o + 6));
          o += 8;
        }
        for (const cont of contours(glyphIndex, depth + 1)) {
          out.push(
            cont.map((pt) => ({
              x: a * pt.x + c * pt.y + dx,
              y: bb * pt.x + d * pt.y + dy,
              on: pt.on,
            }))
          );
        }
        if (!(flags & 0x20)) break;
      }
      return out;
    }

    /* simple */
    let o = start + 10;
    const ends = [];
    for (let i = 0; i < n; i++) {
      ends.push(b.readUInt16BE(o));
      o += 2;
    }
    const nPts = ends[n - 1] + 1;
    o += 2 + b.readUInt16BE(o); // instructions

    const flags = new Uint8Array(nPts);
    for (let i = 0; i < nPts; ) {
      const f = b.readUInt8(o++);
      flags[i++] = f;
      if (f & 8) {
        let rep = b.readUInt8(o++);
        while (rep-- > 0 && i < nPts) flags[i++] = f;
      }
    }
    const readCoords = (shortBit, sameBit) => {
      const out = new Int16Array(nPts);
      let v = 0;
      for (let i = 0; i < nPts; i++) {
        const f = flags[i];
        if (f & shortBit) {
          const d = b.readUInt8(o++);
          v += f & sameBit ? d : -d;
        } else if (!(f & sameBit)) {
          v += b.readInt16BE(o);
          o += 2;
        }
        out[i] = v;
      }
      return out;
    };
    const xs = readCoords(2, 16);
    const ys = readCoords(4, 32);

    const out = [];
    let s = 0;
    for (let ci = 0; ci < n; ci++) {
      const e = ends[ci];
      const pts = [];
      for (let i = s; i <= e; i++) pts.push({ x: xs[i], y: ys[i], on: !!(flags[i] & 1) });
      if (pts.length) out.push(pts);
      s = e + 1;
    }
    return out;
  }

  return { unitsPerEm, cmap, advance, contours };
}

/** One contour of on/off-curve points -> SVG path commands (quadratics). */
export function contourToPath(pts, tx, ty) {
  if (!pts.length) return "";
  const P = (pt) => `${tx(pt.x).toFixed(2)} ${ty(pt.y).toFixed(2)}`;
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, on: true });

  /* Normalise: make sure we start on-curve. */
  let list = pts;
  const firstOn = list.findIndex((q) => q.on);
  if (firstOn === -1) {
    // all off-curve: synthesise implied on-curve points
    const implied = [];
    for (let i = 0; i < list.length; i++) {
      implied.push(mid(list[i], list[(i + 1) % list.length]), list[(i + 1) % list.length]);
    }
    list = implied;
  } else if (firstOn > 0) {
    list = list.slice(firstOn).concat(list.slice(0, firstOn));
  }

  let d = `M ${P(list[0])}`;
  let i = 1;
  while (i <= list.length) {
    const cur = list[i % list.length];
    if (cur.on) {
      d += ` L ${P(cur)}`;
      i++;
    } else {
      const next = list[(i + 1) % list.length];
      const end = next.on ? next : mid(cur, next);
      d += ` Q ${P(cur)} ${P(end)}`;
      i += next.on ? 2 : 1;
    }
    if (i > list.length) break;
  }
  return d + " Z";
}

/** Lay out a string at `size` px with `tracking` px between glyphs.
    Returns { d, width } — d is SVG path data with (x, baselineY) origin. */
export function textPath(font, str, size, x, baselineY, tracking = 0) {
  const s = size / font.unitsPerEm;
  let pen = x;
  let d = "";
  const chars = [...str];
  for (const ch of chars) {
    const gid = font.cmap.get(ch.codePointAt(0));
    if (gid === undefined) throw new Error(`Geist has no glyph for ${JSON.stringify(ch)}`);
    const ox = pen;
    for (const cont of font.contours(gid)) {
      d += contourToPath(
        cont,
        (v) => ox + v * s,
        (v) => baselineY - v * s
      );
    }
    pen += font.advance(gid) * s + tracking;
  }
  return { d, width: pen - tracking - x };
}

export function measure(font, str, size, tracking = 0) {
  const s = size / font.unitsPerEm;
  let w = 0;
  const chars = [...str];
  for (const ch of chars) {
    const gid = font.cmap.get(ch.codePointAt(0));
    if (gid === undefined) throw new Error(`Geist has no glyph for ${JSON.stringify(ch)}`);
    w += font.advance(gid) * s + tracking;
  }
  return w - tracking;
}
