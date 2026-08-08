"use client";

import { useState } from "react";
import { MechanismEmblem } from "@/components/dev/MechanismEmblem";

/* ============================================================
   DEV ONLY — /dev/emblem. Not linked from the site, not in the
   sitemap. Reviews <MechanismEmblem /> in both themes side by
   side, with beat, size and pause controls.
   ============================================================ */

const PANELS = [
  { theme: "dark", bg: "#0e1012", fg: "#c8cdd2", label: "dark" },
  { theme: "light", bg: "#f5f5f3", fg: "#3a3d40", label: "light" },
] as const;

export function EmblemDemo() {
  const [beat, setBeat] = useState(1.2);
  const [size, setSize] = useState(400);
  const [paused, setPaused] = useState(false);
  const [solo, setSolo] = useState<"both" | "dark" | "light">("both");

  const shown = PANELS.filter((p) => solo === "both" || p.theme === solo);

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#151719" }}>
      <header
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0.75rem 1.25rem",
          borderBottom: "1px solid #2a2c2f",
          fontFamily: "var(--font-geist-mono, monospace)",
          fontSize: 13,
          color: "#9aa0a6",
          background: "#101214",
        }}
      >
        <strong style={{ color: "#e6e8ea", fontWeight: 600 }}>MechanismEmblem</strong>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          beat
          <input
            type="range"
            min={0.6}
            max={2.4}
            step={0.05}
            value={beat}
            onChange={(e) => setBeat(Number(e.target.value))}
          />
          <span style={{ minWidth: 44, color: "#e6e8ea" }}>{beat.toFixed(2)}s</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          size
          <input
            type="range"
            min={64}
            max={800}
            step={8}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <span style={{ minWidth: 48, color: "#e6e8ea" }}>{size}px</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={paused} onChange={(e) => setPaused(e.target.checked)} />
          paused
        </label>

        <div style={{ display: "flex", gap: 4 }}>
          {(["both", "dark", "light"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setSolo(v)}
              style={{
                padding: "4px 10px",
                fontFamily: "inherit",
                fontSize: 12,
                border: "1px solid #2a2c2f",
                borderRadius: 4,
                cursor: "pointer",
                background: solo === v ? "#e6e8ea" : "transparent",
                color: solo === v ? "#101214" : "#9aa0a6",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </header>

      <div style={{ flex: 1, display: "flex", flexWrap: "wrap" }}>
        {shown.map((p) => (
          <section
            key={p.theme}
            data-theme={p.theme}
            style={{
              flex: "1 1 480px",
              minHeight: "calc(100vh - 54px)",
              display: "grid",
              placeItems: "center",
              background: p.bg,
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 14,
                left: 18,
                fontFamily: "var(--font-geist-mono, monospace)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: p.fg,
                opacity: 0.55,
              }}
            >
              {p.label}
            </span>
            <MechanismEmblem size={size} beat={beat} paused={paused} />
          </section>
        ))}
      </div>
    </main>
  );
}
