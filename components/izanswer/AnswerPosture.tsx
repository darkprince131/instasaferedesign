import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is device posture checking?" — the answer-strip illustration
   for /zero-trust-features/device-posture-check.

   THE LIST IS THE SUBJECT, AND ONE ROW IN IT IS RED. A device posture
   check is not a gate that opens or shuts; it is a report card that a
   policy then reads. So the middle of the picture is a real checklist
   with real rows, one of them failed, and the fork below it is the
   consequence rather than the point.

   NOT A FLOWCHART. Every element is a surface a person would
   recognise — a laptop on a plate, a card with rows and status pills,
   two outcome tiles with an app grid and a padlock in them. The
   dashed connectors carry no information the cards do not already
   carry; they are the quietest thing here on purpose.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 18px lands
   near 13px, 15px near 11px, 13px near 9px. */

const VB_W = 720;
/* 900 -> 950. THE VIEWBOX WAS SHORTER THAN THE DRAWING. The closing note
   is placed off `F_Y`, which is itself derived from the checklist's row
   count — so the card lands at y 860 and runs to 924, and its second
   line ("A device that drifts out of policy loses the access it already
   had.") sits on baseline 910. Against a 900 box, that line was simply
   outside the canvas: the card looked cropped and the sentence it
   carries had never been visible on any screen size. Anything derived
   from the row count has to be checked against this number when a check
   is added — seven rows is what pushed it over. */
const VB_H = 950;
const MID = 360;

/* ---------- the device ---------- */
const D_CY = 96;

/* ---------- the checklist ---------- */
const L_X = 118;
const L_Y = 200;
const L_W = 484;
const L_HEAD = 56;
const ROW_H = 46;

type Check = { label: string; ok: boolean };
const CHECKS: Check[] = [
  { label: "OS up to date", ok: true },
  { label: "Security patches", ok: true },
  { label: "Disk encryption", ok: true },
  { label: "Antivirus active", ok: true },
  { label: "Firewall on", ok: true },
  { label: "Root / jailbreak", ok: false },
  { label: "Screen lock set", ok: true },
];
const L_H = L_HEAD + CHECKS.length * ROW_H;

/* ---------- the fork ---------- */
const F_Y = L_Y + L_H + 96;
const F_W = 250;
const F_X = [44, 426];

export function AnswerPosture() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--pos"
      role="img"
      aria-label="A device is checked against a list of security signals — operating system, patches, disk encryption, antivirus, firewall, jailbreak status and screen lock. One check fails, so the policy either grants access to corporate applications or blocks it and offers restricted access instead."
    >
      {/* ================= the device ================= */}
      <circle cx={MID} cy={D_CY} r={46} className="ap-plate" />
      <g className="ap-ink">
        <Glyph name="laptop" cx={MID} cy={D_CY} size={44} />
      </g>
      <text x={MID} y={D_CY + 72} textAnchor="middle" className="a-text an-sm a-ink">
        The user&apos;s device
      </text>
      <path
        d={`M${MID} ${D_CY + 88} V${L_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 0 } as React.CSSProperties}
      />

      {/* ================= the check ================= */}
      <rect x={L_X} y={L_Y} width={L_W} height={L_H} rx={14} className="an-panel" />

      {/* the card's own header, with the mark rather than a shield */}
      <image href="/brand/instasafe-mark-color.svg" x={L_X + 22} y={L_Y + 16} width={24} height={24} />
      <text x={L_X + 58} y={L_Y + 34} className="a-text an-sm a-ink">
        Posture check
      </text>
      <text x={L_X + L_W - 22} y={L_Y + 34} textAnchor="end" className="a-text an-xs a-mute an-opt">
        6 of 7 passed
      </text>
      <path d={`M${L_X} ${L_Y + L_HEAD} H${L_X + L_W}`} className="a-line" />

      {CHECKS.map((c, i) => {
        const y = L_Y + L_HEAD + i * ROW_H;
        const cy = y + ROW_H / 2;
        return (
          <g key={c.label}>
            {i > 0 && <path d={`M${L_X} ${y} H${L_X + L_W}`} className="a-line" />}
            {/* the failed row is tinted, not just marked — a single red
                glyph on a white row is easy to scan past */}
            {!c.ok && <rect x={L_X + 1} y={y + 1} width={L_W - 2} height={ROW_H - 2} className="ap-row-no" />}
            <circle cx={L_X + 40} cy={cy} r={12} className={c.ok ? "ap-ok" : "ap-no"} />
            {c.ok ? (
              <path d={`M${L_X + 34} ${cy} l4.4 4.6 l7.6 -9`} className="ap-ok-mark" />
            ) : (
              <path
                d={`M${L_X + 35} ${cy - 5} l10 10 M${L_X + 45} ${cy - 5} l-10 10`}
                className="ap-no-mark"
              />
            )}
            <text x={L_X + 66} y={cy + 6} className={`a-text an-sm ${c.ok ? "a-ink" : "a-deny"}`}>
              {c.label}
            </text>
            <text
              x={L_X + L_W - 22}
              y={cy + 5}
              textAnchor="end"
              className={`a-text an-xs an-opt ${c.ok ? "a-mute" : "a-deny"}`}
            >
              {c.ok ? "pass" : "fail"}
            </text>
          </g>
        );
      })}

      {/* ================= what the policy does with it ================= */}
      <path
        d={`M${MID} ${L_Y + L_H} V${L_Y + L_H + 44}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 1 } as React.CSSProperties}
      />
      <path
        d={`M${F_X[0] + F_W / 2} ${L_Y + L_H + 44} H${F_X[1] + F_W / 2}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 2 } as React.CSSProperties}
      />
      <path
        d={`M${F_X[0] + F_W / 2} ${L_Y + L_H + 44} V${F_Y}`}
        className="z-dash-allow"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />
      <path
        d={`M${F_X[1] + F_W / 2} ${L_Y + L_H + 44} V${F_Y}`}
        className="z-dash-deny"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />

      {/* --- granted --- */}
      <g>
        <rect x={F_X[0]} y={F_Y} width={F_W} height={150} rx={14} className="ap-out ap-out--ok" />
        <circle cx={F_X[0] + 46} cy={F_Y + 46} r={22} className="ap-ok" />
        <path d={`M${F_X[0] + 35} ${F_Y + 46} l8 8.4 l14 -16`} className="ap-ok-mark" />
        <text x={F_X[0] + 80} y={F_Y + 52} className="a-text an-sm a-ink">
          Access granted
        </text>
        {/* the thing they actually reach */}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={F_X[0] + 30 + (i % 2) * 26}
            y={F_Y + 92 + Math.floor(i / 2) * 26}
            width={20}
            height={20}
            rx={5}
            className="ap-tile"
          />
        ))}
        <text x={F_X[0] + 92} y={F_Y + 108} className="a-text an-xs a-mute an-opt">
          Corporate
        </text>
        <text x={F_X[0] + 92} y={F_Y + 128} className="a-text an-xs a-mute an-opt">
          applications
        </text>
      </g>

      {/* --- blocked --- */}
      <g>
        <rect x={F_X[1]} y={F_Y} width={F_W} height={150} rx={14} className="ap-out ap-out--no" />
        <circle cx={F_X[1] + 46} cy={F_Y + 46} r={22} className="ap-no" />
        <path
          d={`M${F_X[1] + 37} ${F_Y + 37} l18 18 M${F_X[1] + 55} ${F_Y + 37} l-18 18`}
          className="ap-no-mark"
        />
        <text x={F_X[1] + 80} y={F_Y + 52} className="a-text an-sm a-ink">
          Access blocked
        </text>
        <g className="ap-ink">
          <Glyph name="lock" cx={F_X[1] + 46} cy={F_Y + 112} size={30} />
        </g>
        <text x={F_X[1] + 92} y={F_Y + 108} className="a-text an-xs a-mute an-opt">
          Restricted
        </text>
        <text x={F_X[1] + 92} y={F_Y + 128} className="a-text an-xs a-mute an-opt">
          access until fixed
        </text>
      </g>

      {/* ================= the part people miss ================= */}
      <rect x={44} y={F_Y + 186} width={632} height={64} rx={12} className="ap-note" />
      <image href="/brand/instasafe-mark-color.svg" x={68} y={F_Y + 206} width={24} height={24} />
      <text x={106} y={F_Y + 214} className="a-text an-sm a-ink">
        Evaluated in real time, and again during the session.
      </text>
      <text x={106} y={F_Y + 236} className="a-text an-xs a-mute">
        A device that drifts out of policy loses the access it already had.
      </text>
    </svg>
  );
}
