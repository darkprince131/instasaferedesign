"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   IzShieldField — ASCII cellular automaton, "deflection field".

   Firecrawl's footer runs a Doom-fire automaton because their
   name is fire. Ours runs the process our name describes:
   access attempts rise from the baseline, hit a dome they can
   never cross, and are deflected sideways until they burn out.
   Nothing above the arc. Ever.

   The shield itself is invisible at rest — a hairline of `-` at
   13% — and only lights up where it is being struck. That is the
   whole idea rendered as physics, not as a drawn shield icon.

   Character-cell simulation on a canvas: heat buffer per cell,
   density ramp " .:-=+X", one accent hue at six alpha steps.
   ~18fps on purpose (the quantised stutter is the medium), paused
   offscreen, and frozen to a single settled frame under
   prefers-reduced-motion.
   ============================================================ */

const RAMP = " .:-=+X"; // 0..6 — index 0 renders nothing
const CELL_W = 7;
const CELL_H = 11;
const STEP_MS = 55;
const LEVELS = 6;
const ALPHA = [0, 0.16, 0.3, 0.45, 0.62, 0.8, 1] as const;

type Props = {
  /** field height in CSS px */
  height?: number;
  /** dome apex as a fraction of field height */
  apex?: number;
  /** >1 pushes the arc's feet off-canvas for a wide, shallow dome */
  spread?: number;
  /** flip horizontally so a facing pair doesn't read as a repeat */
  mirror?: boolean;
  className?: string;
};

function parseRGB(value: string): [number, number, number] {
  const s = value.trim();
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  }
  const nums = s.match(/-?\d+(\.\d+)?/g);
  if (nums && nums.length >= 3) return [+nums[0], +nums[1], +nums[2]];
  return [242, 72, 10];
}

export function IzShieldField({
  height = 188,
  apex = 0.58,
  spread = 1.35,
  mirror = false,
  className,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let heat = new Float32Array(0);
    let impact = new Float32Array(0);
    let scratch = new Float32Array(0);
    let give = new Float32Array(0);
    /* shield row-from-bottom: the int drives the physics, the float lets the
       arc be dithered across two rows so it curves instead of stair-stepping */
    let shield = new Int16Array(0);
    let shieldF = new Float32Array(0);
    let rgb: [number, number, number] = [242, 72, 10];
    let family = "monospace";

    const readTheme = () => {
      const cs = getComputedStyle(host);
      const accent = cs.getPropertyValue("--accent") || cs.getPropertyValue("--orange");
      if (accent) rgb = parseRGB(accent);
      if (cs.fontFamily) family = cs.fontFamily;
    };

    /* width the buffers were last sized for; -1 = never built */
    let builtW = -1;

    const layout = () => {
      const w = host.clientWidth;
      if (w <= 0) {
        builtW = 0; // hidden by a breakpoint — settle here, don't thrash
        return false;
      }
      builtW = w;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(8, Math.floor(w / CELL_W));
      rows = Math.max(6, Math.floor(height / CELL_H));
      heat = new Float32Array(rows * cols);
      impact = new Float32Array(cols);
      scratch = new Float32Array(cols);
      give = new Float32Array(cols);
      shield = new Int16Array(cols);
      shieldF = new Float32Array(cols);

      const apexRows = Math.max(3, (rows - 1) * apex);
      for (let c = 0; c < cols; c++) {
        const x = cols === 1 ? 0 : (c / (cols - 1)) * 2 - 1;
        const t = Math.min(1, Math.abs(x) / spread);
        const f = Math.max(1, apexRows * Math.sqrt(1 - t * t));
        shieldF[c] = f;
        shield[c] = Math.round(f);
      }
      return true;
    };

    /* one tick of the automaton */
    const step = () => {
      const last = rows - 1;
      /* baseline: a steady stream of attempts, with gaps so it breathes */
      for (let c = 0; c < cols; c++) {
        heat[last * cols + c] =
          Math.random() < 0.08 ? 0.2 + Math.random() * 0.25 : 0.7 + Math.random() * 0.3;
      }

      for (let r = rows - 2; r >= 0; r--) {
        const rowFromBottom = rows - 1 - r;
        const base = r * cols;
        const below = (r + 1) * cols;
        for (let c = 0; c < cols; c++) {
          const dome = shield[c];
          if (rowFromBottom > dome) {
            heat[base + c] = 0; // nothing crosses the arc
            continue;
          }
          let src = c + (((Math.random() * 3) | 0) - 1);
          if (src < 0) src = 0;
          else if (src >= cols) src = cols - 1;

          let v = heat[below + src] - (0.075 + Math.random() * 0.135);

          if (rowFromBottom === dome) {
            if (v > 0) impact[c] += v * 1.05; // absorbed by the shield
            v = 0;
          } else if (rowFromBottom === dome - 1) {
            v -= 0.07; // compression in the layer that's about to hit
          }
          heat[base + c] = v > 0 ? v : 0;
        }
      }

      /* The arc cools, then hands a fixed share of what's left outward toward
         the flanks. The share is subtracted, not duplicated — otherwise the
         field gains energy every tick and the ends glow brighter than the
         apex. What runs off the last column drains away. */
      const mid = (cols - 1) / 2;
      for (let c = 0; c < cols; c++) {
        const v = impact[c] * 0.8;
        give[c] = v * 0.3;
        scratch[c] = v - give[c];
      }
      for (let c = 0; c < cols; c++) {
        const target = c + (c < mid ? -1 : 1);
        if (target >= 0 && target < cols) scratch[target] += give[c];
      }
      for (let c = 0; c < cols; c++) impact[c] = scratch[c] > 1.35 ? 1.35 : scratch[c];
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CELL_H}px ${family}`;
      ctx.textBaseline = "top";
      const [R, G, B] = rgb;

      /* rising field — one pass per density level keeps fillStyle churn flat */
      for (let lvl = 1; lvl <= LEVELS; lvl++) {
        ctx.fillStyle = `rgba(${R},${G},${B},${ALPHA[lvl]})`;
        const glyph = RAMP[lvl];
        for (let r = 0; r < rows; r++) {
          const base = r * cols;
          const y = r * CELL_H;
          for (let c = 0; c < cols; c++) {
            const h = heat[base + c];
            if (h <= 0) continue;
            let l = Math.ceil(h * LEVELS);
            if (l > LEVELS) l = LEVELS;
            if (l === lvl) ctx.fillText(glyph, c * CELL_W, y);
          }
        }
      }

      /* The arc: a hairline at rest, an X where it is taking a hit. Dithered
         across the two rows its true height falls between, so a shallow curve
         over few character rows reads as a curve and not as a staircase. */
      for (let c = 0; c < cols; c++) {
        const f = shieldF[c];
        const lo = Math.floor(f);
        const frac = f - lo;
        const i = impact[c];
        for (let k = 0; k < 2; k++) {
          const weight = k === 0 ? 1 - frac : frac;
          if (weight <= 0.02) continue;
          const r = rows - 1 - (lo + k);
          if (r < 0 || r >= rows) continue;
          const y = r * CELL_H;
          if (i < 0.05) {
            ctx.fillStyle = `rgba(${R},${G},${B},${(0.13 * (0.45 + weight * 0.55)).toFixed(3)})`;
            ctx.fillText(weight > 0.5 ? "-" : ".", c * CELL_W, y);
          } else {
            let l = 2 + Math.ceil(Math.min(1, i) * 4 * weight);
            if (l > LEVELS) l = LEVELS;
            else if (l < 1) l = 1;
            ctx.fillStyle = `rgba(${R},${G},${B},${ALPHA[l]})`;
            ctx.fillText(RAMP[l], c * CELL_W, y);
          }
        }
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let running = false;
    let themeAge = 0;

    const settle = () => {
      for (let i = 0; i < 90; i++) step();
      draw();
    };

    const build = () => {
      if (!layout()) return;
      readTheme();
      settle();
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < STEP_MS) return;
      last = now;
      themeAge++;
      /* self-heal: the host can be 0-wide or mid-transition on first paint,
         and a display:none breakpoint hides it entirely. Re-measure rather
         than trusting that a ResizeObserver tick landed. */
      if (themeAge % 12 === 0 && host.clientWidth !== builtW) {
        build();
        return;
      }
      if (themeAge > 36) {
        themeAge = 0;
        readTheme();
      }
      if (builtW <= 0) return;
      step();
      draw();
    };

    const start = () => {
      if (running || reduce.matches) return;
      if (host.clientWidth !== builtW) build();
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    build();

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px" },
    );
    io.observe(host);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 140);
    });
    ro.observe(host);

    const onMotionChange = () => {
      stop();
      build();
      start();
    };
    reduce.addEventListener("change", onMotionChange);

    /* The RAF loop re-reads the accent every ~2s, but that only helps if it is
       running — under prefers-reduced-motion it never is, so a theme or system
       swap would leave the field painted in the old hue for good. Watch the
       attributes that carry the palette and repaint straight away. */
    const themeRoot = host.closest("[data-theme]") ?? document.documentElement;
    const onThemeChange = () => {
      readTheme();
      draw();
    };
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(themeRoot, {
      attributes: true,
      attributeFilter: ["data-theme", "data-system"],
    });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.clearTimeout(resizeTimer);
      reduce.removeEventListener("change", onMotionChange);
    };
  }, [height, apex, spread]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={className ? `iz-shieldfield ${className}` : "iz-shieldfield"}
      style={{ height }}
    >
      <canvas ref={canvasRef} style={mirror ? { transform: "scaleX(-1)" } : undefined} />
    </div>
  );
}
