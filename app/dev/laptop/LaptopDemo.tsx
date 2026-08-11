"use client";

import { ExplodedLaptop, ExplodedLaptopStatic } from "@/components/iz-fx/ExplodedLaptop";
import { izFontVars } from "@/lib/iz-fonts";

import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";

/* ============================================================
   DEV ONLY — /dev/laptop.

   The scrubbed section in both themes, with copy above and below so
   the pin enters and exits a real page flow, plus the static
   (reduced-motion / OG) figure at the end.
   ============================================================ */

function Spacer({ label }: { label: string }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        color: "var(--tx-mute)",
        fontFamily: "var(--mono)",
        fontSize: "var(--fs-mono)",
        letterSpacing: "var(--ls-mono)",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  );
}

export function LaptopDemo() {
  return (
    <>
      <div className={`iz ${izFontVars}`} data-theme="dark" data-system="orange" style={{ background: "var(--bg)" }}>
        <Spacer label="scroll ↓ · dark" />
        <ExplodedLaptop />
        <Spacer label="unpinned · next section" />
      </div>
      <div className={`iz ${izFontVars}`} data-theme="paper" data-system="orange" style={{ background: "var(--bg)" }}>
        <Spacer label="scroll ↓ · paper" />
        <ExplodedLaptop />
        <Spacer label="static figure (reduced-motion state)" />
        <div style={{ padding: "0 4vw 12vh" }}>
          <ExplodedLaptopStatic />
        </div>
      </div>
    </>
  );
}
