"use client";

import { IzAccessEngine } from "@/components/home2/IzAccessEngine";
import { izFontVars } from "@/lib/iz-fonts";

import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";

/* DEV ONLY — /dev/engine. The deck in both themes. */

export function EngineDemo() {
  return (
    <>
      {(["paper", "dark"] as const).map((theme) => (
        <div
          key={theme}
          className={`iz ${izFontVars}`}
          data-theme={theme}
          data-system="orange"
          style={{ background: "var(--bg)" }}
        >
          <IzAccessEngine />
        </div>
      ))}
    </>
  );
}
