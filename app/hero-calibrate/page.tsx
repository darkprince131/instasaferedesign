"use client";

import { useCallback, useMemo, useRef, useState } from "react";

/* ============================================================
   Hero plate calibration tool.  DEV ONLY — not linked from the
   site, not in the sitemap. Open http://localhost:3000/hero-calibrate

   Purpose: stop guessing plate geometry. You click the groove and
   drag boxes over the panels; this outputs the exact SVG path and
   the --p-* custom properties for iz-hero-portal.css.
   ============================================================ */

const PLATES = {
  "dark-desktop": { src: "/hero/hero-dark-desktop.webp", w: 1672, h: 941 },
  "light-desktop": { src: "/hero/hero-light-desktop.webp", w: 1672, h: 941 },
  "dark-mobile": { src: "/hero/hero-dark-mobile.webp", w: 1086, h: 1448 },
  "light-mobile": { src: "/hero/hero-light-mobile.webp", w: 1086, h: 1448 },
} as const;
type PlateKey = keyof typeof PLATES;

type Pt = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };
type BoxKey = "portal" | "reader" | "display";
type Mode = "path" | BoxKey;

const BOX_COLOR: Record<BoxKey, string> = { portal: "#4a9eff", reader: "#3fcf8e", display: "#a78bfa" };

export default function HeroCalibrate() {
  const [plate, setPlate] = useState<PlateKey>("dark-desktop");
  const [mode, setMode] = useState<Mode>("path");
  const [pts, setPts] = useState<Pt[]>([]);
  const [boxes, setBoxes] = useState<Partial<Record<BoxKey, Box>>>({});
  const [drag, setDrag] = useState<{ start: Pt; cur: Pt } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showPrev, setShowPrev] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  const P = PLATES[plate];

  // pointer -> native plate coordinates
  const toPlate = useCallback(
    (e: React.MouseEvent): Pt => {
      const el = wrapRef.current;
      if (!el) return { x: 0, y: 0 };
      const b = el.getBoundingClientRect();
      return {
        x: Math.round(((e.clientX - b.left) / b.width) * P.w),
        y: Math.round(((e.clientY - b.top) / b.height) * P.h),
      };
    },
    [P.w, P.h]
  );

  const onDown = (e: React.MouseEvent) => {
    const p = toPlate(e);
    if (mode === "path") {
      setPts((v) => [...v, p]);
      return;
    }
    setDrag({ start: p, cur: p });
  };
  const onMove = (e: React.MouseEvent) => {
    if (!drag) return;
    setDrag({ ...drag, cur: toPlate(e) });
  };
  const onUp = () => {
    if (!drag || mode === "path") return setDrag(null);
    const { start, cur } = drag;
    const box: Box = {
      x: Math.min(start.x, cur.x),
      y: Math.min(start.y, cur.y),
      w: Math.abs(cur.x - start.x),
      h: Math.abs(cur.y - start.y),
    };
    if (box.w > 3 && box.h > 3) setBoxes((v) => ({ ...v, [mode]: box }));
    setDrag(null);
  };

  const pathD = useMemo(
    () => (pts.length ? "M " + pts.map((p, i) => (i ? `L ${p.x} ${p.y}` : `${p.x} ${p.y}`)).join(" ") : ""),
    [pts]
  );

  const pct = (v: number, t: number) => ((v / t) * 100).toFixed(2);

  const cssOut = useMemo(() => {
    const L: string[] = [];
    const b = boxes;
    if (b.portal)
      L.push(
        `--p-portal-l: ${pct(b.portal.x, P.w)}%;`,
        `--p-portal-r: ${pct(b.portal.x + b.portal.w, P.w)}%;`,
        `--p-portal-t: ${pct(b.portal.y, P.h)}%;`,
        `--p-portal-b: ${pct(b.portal.y + b.portal.h, P.h)}%;`,
        `--p-cx: ${pct(b.portal.x + b.portal.w / 2, P.w)}%;`,
        `--p-cy: ${pct(b.portal.y + b.portal.h / 2, P.h)}%;`
      );
    if (b.reader)
      L.push(
        `--p-reader-l: ${pct(b.reader.x, P.w)}%;`,
        `--p-reader-t: ${pct(b.reader.y, P.h)}%;`,
        `--p-reader-w: ${pct(b.reader.w, P.w)}%;`,
        `--p-reader-h: ${pct(b.reader.h, P.h)}%;`
      );
    if (b.display)
      L.push(
        `--p-display-l: ${pct(b.display.x, P.w)}%;`,
        `--p-display-t: ${pct(b.display.y, P.h)}%;`,
        `--p-display-w: ${pct(b.display.w, P.w)}%;`,
        `--p-display-h: ${pct(b.display.h, P.h)}%;`
      );
    if (pathD) L.push(``, `/* PATH_D (${P.w}x${P.h} viewBox) */`, `const PATH_D = "${pathD}";`);
    return L.join("\n");
  }, [boxes, pathD, P.w, P.h]);

  const liveBox: Box | null = drag
    ? {
        x: Math.min(drag.start.x, drag.cur.x),
        y: Math.min(drag.start.y, drag.cur.y),
        w: Math.abs(drag.cur.x - drag.start.x),
        h: Math.abs(drag.cur.y - drag.start.y),
      }
    : null;

  const btn = (active: boolean): React.CSSProperties => ({
    padding: "7px 13px",
    borderRadius: 7,
    border: "1px solid " + (active ? "#ff6a2c" : "#33363d"),
    background: active ? "#ff6a2c" : "#16181d",
    color: active ? "#0a0b0d" : "#c9ccd3",
    cursor: "pointer",
    fontSize: 13,
    fontWeight: 600,
    fontFamily: "ui-sans-serif, system-ui, sans-serif",
  });

  return (
    <div style={{ background: "#0a0b0d", color: "#e9ebf0", minHeight: "100vh", padding: 18, fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 17, margin: "0 0 4px" }}>Hero plate calibration</h1>
      <p style={{ fontSize: 13, color: "#9599a3", margin: "0 0 14px", lineHeight: 1.5 }}>
        <b>Trace path</b>: click along the groove, one click per corner — start at the reader, end at the threshold
        marker. <b>Box</b> modes: drag a rectangle over that feature. Values below are in the plate&apos;s native pixels
        and update live. Send me the output block.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        <select value={plate} onChange={(e) => setPlate(e.target.value as PlateKey)} style={{ ...btn(false), padding: "7px 10px" }}>
          {Object.keys(PLATES).map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <span style={{ width: 10 }} />
        {(["path", "portal", "reader", "display"] as Mode[]).map((m) => (
          <button key={m} style={btn(mode === m)} onClick={() => setMode(m)}>
            {m === "path" ? "Trace path" : "Box: " + m}
          </button>
        ))}
        <span style={{ width: 10 }} />
        <button style={btn(false)} onClick={() => setPts((v) => v.slice(0, -1))}>Undo point</button>
        <button style={btn(false)} onClick={() => setPts([])}>Clear path</button>
        <button style={btn(false)} onClick={() => setBoxes({})}>Clear boxes</button>
        <span style={{ width: 10 }} />
        <label style={{ fontSize: 13, color: "#9599a3" }}>
          Zoom{" "}
          <input type="range" min={0.5} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(+e.target.value)} />
          {zoom.toFixed(1)}x
        </label>
        <label style={{ fontSize: 13, color: "#9599a3", display: "inline-flex", gap: 6, alignItems: "center" }}>
          <input type="checkbox" checked={showPrev} onChange={(e) => setShowPrev(e.target.checked)} />
          show current values
        </label>
      </div>

      <div style={{ overflow: "auto", border: "1px solid #23262c", borderRadius: 10, maxHeight: "72vh" }}>
        <div
          ref={wrapRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={() => setDrag(null)}
          style={{ position: "relative", width: P.w * zoom, height: P.h * zoom, cursor: "crosshair", userSelect: "none" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={P.src} alt="" width={P.w} height={P.h} draggable={false} style={{ width: "100%", height: "100%", display: "block" }} />

          <svg viewBox={`0 0 ${P.w} ${P.h}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            {/* what the hero currently uses, for comparison */}
            {showPrev && plate.endsWith("desktop") && (
              <>
                <path d="M 379 531 L 379 788 L 828 788" fill="none" stroke="#ff6a2c" strokeOpacity={0.45} strokeWidth={3} strokeDasharray="10 8" />
                <rect x={0.7685 * P.w} y={0.3613 * P.h} width={0.1316 * P.w} height={0.2009 * P.h} fill="none" stroke="#a78bfa" strokeOpacity={0.5} strokeWidth={2} strokeDasharray="8 6" />
                <rect x={0.2004 * P.w} y={0.4899 * P.h} width={0.0233 * P.w} height={0.0616 * P.h} fill="none" stroke="#3fcf8e" strokeOpacity={0.6} strokeWidth={2} strokeDasharray="6 4" />
              </>
            )}

            {/* traced path */}
            {pathD && <path d={pathD} fill="none" stroke="#ff6a2c" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r={7} fill="#ff6a2c" />
                <text x={p.x + 12} y={p.y - 10} fill="#fff" fontSize={20} fontFamily="monospace">
                  {i + 1}
                </text>
              </g>
            ))}

            {/* committed boxes */}
            {(Object.keys(boxes) as BoxKey[]).map((k) => {
              const b = boxes[k]!;
              return (
                <g key={k}>
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="none" stroke={BOX_COLOR[k]} strokeWidth={3} />
                  <text x={b.x} y={b.y - 8} fill={BOX_COLOR[k]} fontSize={20} fontFamily="monospace">{k}</text>
                </g>
              );
            })}
            {liveBox && <rect x={liveBox.x} y={liveBox.y} width={liveBox.w} height={liveBox.h} fill="none" stroke="#fff" strokeWidth={2} strokeDasharray="8 6" />}
          </svg>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 12 }}>
        <pre
          style={{
            flex: 1,
            background: "#111319",
            border: "1px solid #23262c",
            borderRadius: 10,
            padding: 13,
            fontSize: 12.5,
            lineHeight: 1.65,
            margin: 0,
            minHeight: 90,
            whiteSpace: "pre-wrap",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
          }}
        >
          {cssOut || "// trace a path or drag a box"}
        </pre>
        <button style={btn(true)} onClick={() => navigator.clipboard?.writeText(cssOut)}>Copy</button>
      </div>
    </div>
  );
}
