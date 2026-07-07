"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   C26 · Industry word-search ("Built across industries").
   Words run BOTH horizontally and vertically. Hover the grid (or
   the chips) to find a sector; with no hover a slow autoplay
   lights them one at a time until all are found, then resets, so
   none feel left out. Grid built deterministically (seeded RNG,
   fixed placements) so SSR === CSR. A smaller grid + fewer
   industries is used on mobile. Scoped `.iw-`; tokens `.iz`.
   ============================================================ */

type Dir = "h" | "v";
type Cand = { text: string; label: string; row: number; col: number; dir: Dir };
type Cell = { ch: string; wid: number; dir: Dir | ""; pos: "s" | "m" | "e" | "" };
type Built = { grid: Cell[][]; placed: { label: string }[] };

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* place each candidate if every target cell is free; collisions are
   skipped (never corrupts the grid, never crosses another word). */
function build(cols: number, rows: number, cands: Cand[], seed: number): Built {
  const grid: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ ch: "", wid: -1, dir: "" as const, pos: "" as const }))
  );
  const placed: { label: string }[] = [];
  cands.forEach((c) => {
    const cells: [number, number][] = [];
    let ok = true;
    for (let k = 0; k < c.text.length; k++) {
      const r = c.dir === "v" ? c.row + k : c.row;
      const col = c.dir === "h" ? c.col + k : c.col;
      if (r < 0 || r >= rows || col < 0 || col >= cols || grid[r][col].wid !== -1) {
        ok = false;
        break;
      }
      cells.push([r, col]);
    }
    if (!ok) return;
    const id = placed.length;
    cells.forEach(([r, col], k) => {
      grid[r][col] = { ch: c.text[k], wid: id, dir: c.dir, pos: k === 0 ? "s" : k === c.text.length - 1 ? "e" : "m" };
    });
    placed.push({ label: c.label });
  });
  const rnd = mulberry32(seed);
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) if (grid[r][c].wid === -1) grid[r][c] = { ch: LETTERS[Math.floor(rnd() * 26)], wid: -1, dir: "", pos: "" };
  return { grid, placed };
}

const DESK_CANDS: Cand[] = [
  { text: "GOVERNMENT", label: "Government & PSU", row: 0, col: 2, dir: "h" },
  { text: "HOSPITALITY", label: "Hospitality", row: 2, col: 2, dir: "h" },
  { text: "HEALTHCARE", label: "Healthcare", row: 3, col: 4, dir: "h" },
  { text: "EDUCATION", label: "Education", row: 5, col: 5, dir: "h" },
  { text: "LOGISTICS", label: "Logistics", row: 6, col: 5, dir: "h" },
  { text: "NBFC", label: "NBFC", row: 7, col: 5, dir: "h" },
  { text: "ITES", label: "IT / ITES", row: 8, col: 0, dir: "h" },
  { text: "INSURANCE", label: "Insurance", row: 9, col: 4, dir: "h" },
  { text: "AUTOMOTIVE", label: "Automotive", row: 10, col: 4, dir: "h" },
  { text: "MANUFACTURING", label: "Manufacturing", row: 11, col: 1, dir: "h" },
  { text: "TELECOM", label: "Telecom", row: 0, col: 0, dir: "v" },
  { text: "PHARMA", label: "Pharma", row: 0, col: 1, dir: "v" },
  { text: "ENERGY", label: "Energy & Utilities", row: 0, col: 14, dir: "v" },
  { text: "AVIATION", label: "Aviation", row: 4, col: 0, dir: "v" },
  { text: "RETAIL", label: "Retail", row: 5, col: 2, dir: "v" },
  { text: "DEFENCE", label: "Defence", row: 5, col: 14, dir: "v" },
  { text: "BANKING", label: "Banking & BFSI", row: 1, col: 13, dir: "v" },
  { text: "MEDIA", label: "Media", row: 0, col: 12, dir: "v" },
];

const MOB_CANDS: Cand[] = [
  { text: "HEALTHCARE", label: "Healthcare", row: 0, col: 0, dir: "h" },
  { text: "LOGISTICS", label: "Logistics", row: 2, col: 0, dir: "h" },
  { text: "INSURANCE", label: "Insurance", row: 4, col: 0, dir: "h" },
  { text: "BANKING", label: "Banking & BFSI", row: 6, col: 0, dir: "h" },
  { text: "ENERGY", label: "Energy", row: 8, col: 0, dir: "h" },
  { text: "NBFC", label: "NBFC", row: 10, col: 0, dir: "h" },
  { text: "TELECOM", label: "Telecom", row: 4, col: 9, dir: "v" },
  { text: "PHARMA", label: "Pharma", row: 5, col: 8, dir: "v" },
  { text: "MEDIA", label: "Media", row: 6, col: 7, dir: "v" },
  { text: "ITES", label: "IT / ITES", row: 0, col: 0, dir: "h" },
];

const DESKTOP = build(15, 12, DESK_CANDS, 20260629);
const MOBILE = build(10, 11, MOB_CANDS, 73210);

export function IndustrySearch() {
  const [mobile, setMobile] = useState(false);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [hovered, setHovered] = useState<number>(-1);
  const idx = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const data = mobile ? MOBILE : DESKTOP;
  const total = data.placed.length;

  useEffect(() => {
    setFound(new Set());
    idx.current = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFound(new Set(data.placed.map((_, i) => i)));
      return;
    }
    const id = setInterval(() => {
      setFound((prev) => {
        if (prev.size >= total) {
          idx.current = 0;
          return new Set();
        }
        const next = new Set(prev);
        next.add(idx.current);
        idx.current += 1;
        return next;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [mobile, total, data.placed]);

  const isLit = (wid: number) => wid >= 0 && (wid === hovered || found.has(wid));

  return (
    <div className="iw">
      <div className="iw-head">
        <span className="iz-ey">Built across industries</span>
        <h2 className="iz-h2">Find your <em>sector</em> in the grid.</h2>
        <p className="iw-lead">From banks and PSUs to hospitals and factories — hover to hunt, or watch them light up on their own.</p>
      </div>

      <div className="iw-grid" role="img" aria-label="Word search of industries InstaSafe secures" onMouseLeave={() => setHovered(-1)}>
        {data.grid.map((row, r) => (
          <div className="iw-row" key={r}>
            {row.map((cell, c) => (
              <span
                key={c}
                className={`iw-cell${isLit(cell.wid) ? ` lit ${cell.dir} ${cell.pos}` : ""}`}
                onMouseEnter={() => cell.wid >= 0 && setHovered(cell.wid)}
              >
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="iw-legend">
        <span className="iw-count">{found.size} / {total} industries</span>
        <div className="iw-chips">
          {data.placed.map((w, i) => (
            <span
              key={w.label + i}
              className={`iw-chip${isLit(i) ? " on" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(-1)}
            >
              {w.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
