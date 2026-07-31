"use client";

import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   IzConverge — TIER 1 VISUAL  (lab 00aq)

   Signal chips drift in from the left, converge on the InstaSafe
   mark, and one orthogonal circuit run carries the result out to a
   session ID on the right.

   The intake is a marquee, reusing FilterStream's mechanism (00q):
   each row's track holds its chips twice and translates by exactly
   -50%, so the loop is seamless. All three rows travel the SAME way,
   toward the mark — opposing directions would read as churn, one
   direction reads as intake. Each row runs at its own duration so
   they never lock into one moving block, and the feed is masked at
   its trailing edge so chips dissolve into the mark rather than
   colliding with it.

   The circuit stays a single static SVG of straight segments — no
   path maths, no per-node animation. The argument is "many inputs,
   one identity out", and that reads from the composition; animating
   the wiring would add cost without adding meaning.

   Chips are data. Add one to a row and it joins the loop.
   ============================================================ */

type Chip = { label: string; value: string; tone?: "allow" };

/* Three rows, all travelling the SAME way — toward the mark. Opposing
   directions would read as churn; one direction reads as intake.
   Each row runs at its own speed so they never lock into a single
   moving block. */
const ROWS: { dur: string; chips: Chip[] }[] = [
  {
    dur: "34s",
    chips: [
      { label: "userAgent", value: "Mozilla/5.0" },
      { label: "screenWidth", value: "1536" },
      { label: "timezone", value: "Asia/Kolkata" },
      { label: "platform", value: "Win32" },
    ],
  },
  {
    dur: "27s",
    chips: [
      { label: "diskEncryption", value: "true", tone: "allow" },
      { label: "hardwareConcurrency", value: "8" },
      { label: "screenLock", value: "5m", tone: "allow" },
      { label: "deviceId", value: "WS-FIN-014" },
    ],
  },
  {
    dur: "40s",
    chips: [
      { label: "managedDevice", value: "true", tone: "allow" },
      { label: "geo", value: "IN" },
      { label: "edr", value: "present", tone: "allow" },
      { label: "osPatch", value: "current" },
    ],
  },
];

export function IzConverge({ sessionId = "sx_9F2ke6WRQIDdtH4" }: { sessionId?: string }) {
  return (
    <div className="izcv">
      <div className="izcv-stage">
        {/* the intake: marquee rows feeding the mark. Same mechanism as
            FilterStream (00q) — each track holds its chips twice and
            translates by exactly -50%, so the loop is seamless. */}
        <div className="izcv-feed" aria-hidden="true">
          {ROWS.map((row, r) => (
            <div className="izcv-row" key={r}>
              <div className="izcv-track" style={{ ["--dur" as string]: row.dur } as React.CSSProperties}>
                {[0, 1].map((dup) =>
                  row.chips.map((c) => (
                    <span key={`${dup}-${c.label}`} className={`izcv-chip ${c.tone === "allow" ? "t-allow" : ""}`}>
                      <i>{c.label}:</i> {c.value}
                    </span>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* the mark everything converges on */}
        <span className="izcv-mark" aria-hidden="true">
          <LogoMark size={34} forceTheme="light" />
        </span>

        {/* one static circuit run out to the result */}
        <svg className="izcv-wire" viewBox="0 0 320 200" role="img" aria-label="Signals resolving to one session identity">
          <g fill="none" stroke="var(--accent)" strokeWidth="1.4">
            <path d="M0 100 H54 L86 60 H150 V34 H236" />
            <path d="M0 100 H54 L86 140 H150 V166 H236" />
            <path d="M0 100 H236" />
            <path d="M150 34 V166" />
          </g>
          <g fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.4">
            <circle cx="150" cy="34" r="3.5" />
            <circle cx="150" cy="100" r="3.5" />
            <circle cx="150" cy="166" r="3.5" />
            <circle cx="86" cy="60" r="3.5" />
            <circle cx="86" cy="140" r="3.5" />
          </g>
        </svg>

        <span className="izcv-out" aria-hidden="true">
          {sessionId}
        </span>
      </div>
    </div>
  );
}
