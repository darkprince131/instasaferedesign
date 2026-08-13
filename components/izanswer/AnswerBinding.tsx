import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is device binding?" — the answer-strip illustration for
   /zero-trust-features/device-binding.

   THIS IS THE SUPPLIED REFERENCE, GRAPHIC. The reference's right-hand
   panel is an icon strip — a person at a laptop, a fingerprint, a
   shield with a link through it, an app grid, a refresh with a tick —
   followed by the trusted/untrusted pair and a closing card. All of
   that is here; only the axis changed, because the answer strip's
   slot is portrait (~543px wide) and five icons across it would land
   each one at 90px with a two-line caption underneath.

   So the five steps run DOWN a numbered rail instead of across. Each
   one keeps its own drawn glyph, at a size you can actually read.

   TYPE. viewBox 720 against a ~543px slot ≈ 0.75 scale: 18px lands
   near 13px, 15px near 11px, 13px near 10px.
   Reuses `.iz-ans--pos` so it inherits the posture illustration's
   palette rather than declaring a second one. */

const VB_W = 720;
const VB_H = 1180;
const MID = 360;

/* ---------- the rail ---------- */
const R_X = 96;
const R_Y = 132;
const R_W = 528;
const STEP_H = 118;

type Step = { n: string; glyph: Parameters<typeof Glyph>[0]["name"]; label: string; sub: string };

const STEPS: Step[] = [
  { n: "01", glyph: "laptop", label: "A person signs in", sub: "from one specific machine" },
  { n: "02", glyph: "fingerprint", label: "The device is fingerprinted", sub: "MAC · serial · hardware UUID" },
  { n: "03", glyph: "shield-check", label: "Identity is bound to it", sub: "a certificate is issued" },
  { n: "04", glyph: "tiles", label: "Only permitted apps open", sub: "policy decides which" },
  { n: "05", glyph: "clock", label: "And it is re-checked", sub: "every session, and during it" },
];

/* ---------- the fork ---------- */
const F_Y = R_Y + STEPS.length * STEP_H + 56;
const F_W = 244;
const F_H = 214;
const F_LX = MID - F_W - 14;
const F_RX = MID + 14;

/* ---------- the closing card ---------- */
const K_Y = F_Y + F_H + 40;

export function AnswerBinding() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--pos"
      role="img"
      aria-label="How device binding works: sign-in, device fingerprint, certificate issued, permitted apps, continuous re-check — and the two verdicts that produces"
    >
      {/* ================= header ================= */}
      <g className="ap-ink">
        <Glyph name="shield-check" cx={MID - 108} cy={54} size={28} tone="accent" />
      </g>
      <text x={MID - 84} y={62} className="a-text an-sm a-ink">
        How device binding works
      </text>
      <path d={`M${R_X} 96 H${R_X + R_W}`} className="a-line" />

      {/* ================= the five steps ================= */}
      {STEPS.map((s, i) => {
        const y = R_Y + i * STEP_H;
        const cy = y + 44;
        const last = i === STEPS.length - 1;
        return (
          <g key={s.n}>
            {/* the spine, drawn between tiles and stopping at the last */}
            {!last && (
              <path
                d={`M${R_X + 44} ${cy + 44} V${cy + STEP_H - 44}`}
                className="z-dash-accent"
                style={{ ["--seg" as string]: i } as React.CSSProperties}
              />
            )}

            {/* the icon tile — the graphic the reference leads with */}
            <rect x={R_X} y={y} width={88} height={88} rx={20} className="ap-tile" />
            <g className="ap-ink">
              <Glyph name={s.glyph} cx={R_X + 44} cy={cy} size={40} tone={last ? "allow" : "accent"} />
            </g>

            {/* the step number, as a chip on the tile's shoulder */}
            <circle cx={R_X + 80} cy={y + 8} r={14} className="ap-num" />
            <text
              x={R_X + 80}
              y={y + 13}
              textAnchor="middle"
              className="a-text an-xs a-accent"
            >
              {s.n}
            </text>

            <text x={R_X + 118} y={cy - 6} className="a-text an-sm a-ink">
              {s.label}
            </text>
            <text x={R_X + 118} y={cy + 20} className="a-text an-xs a-mute">
              {s.sub}
            </text>
          </g>
        );
      })}

      {/* ================= the fork ================= */}
      <path
        d={`M${R_X + 44} ${F_Y - 40} V${F_Y - 22} H${F_LX + F_W / 2} V${F_Y}`}
        className="z-dash-allow"
        style={{ ["--seg" as string]: 5 } as React.CSSProperties}
      />
      <path
        d={`M${R_X + 44} ${F_Y - 40} V${F_Y - 22} H${F_RX + F_W / 2} V${F_Y}`}
        className="z-dash-deny"
        style={{ ["--seg" as string]: 6 } as React.CSSProperties}
      />

      {/* --- trusted --- */}
      <rect x={F_LX} y={F_Y} width={F_W} height={F_H} rx={16} className="ap-out ap-out--ok" />
      <rect x={F_LX + 24} y={F_Y + 18} width={104} height={26} rx={13} className="ap-ok" />
      <text x={F_LX + 76} y={F_Y + 36} textAnchor="middle" className="a-text an-xs a-allow">
        TRUSTED
      </text>
      <g className="ap-ink">
        <Glyph name="laptop" cx={F_LX + F_W / 2} cy={F_Y + 96} size={64} tone="allow" />
      </g>
      <circle cx={F_LX + F_W / 2 + 34} cy={F_Y + 118} r={16} className="ap-ok" />
      <path
        d={`M${F_LX + F_W / 2 + 26} ${F_Y + 118} l6 6 11-12`}
        className="ap-ok-mark"
        fill="none"
      />
      <text x={F_LX + F_W / 2} y={F_Y + 168} textAnchor="middle" className="a-text an-sm a-allow">
        Access allowed
      </text>
      <text x={F_LX + F_W / 2} y={F_Y + 192} textAnchor="middle" className="a-text an-xs a-mute">
        certificate matches
      </text>

      {/* --- untrusted --- */}
      <rect x={F_RX} y={F_Y} width={F_W} height={F_H} rx={16} className="ap-out ap-out--no" />
      <rect x={F_RX + 24} y={F_Y + 18} width={116} height={26} rx={13} className="ap-no" />
      <text x={F_RX + 82} y={F_Y + 36} textAnchor="middle" className="a-text an-xs a-deny">
        UNTRUSTED
      </text>
      <g className="ap-ink">
        <Glyph name="laptop" cx={F_RX + F_W / 2} cy={F_Y + 96} size={64} tone="deny" />
      </g>
      <circle cx={F_RX + F_W / 2 + 34} cy={F_Y + 118} r={16} className="ap-no" />
      <path
        d={`M${F_RX + F_W / 2 + 27} ${F_Y + 111} l14 14 M${F_RX + F_W / 2 + 41} ${F_Y + 111} l-14 14`}
        className="ap-no-mark"
        fill="none"
      />
      <text x={F_RX + F_W / 2} y={F_Y + 168} textAnchor="middle" className="a-text an-sm a-deny">
        Access blocked
      </text>
      <text x={F_RX + F_W / 2} y={F_Y + 192} textAnchor="middle" className="a-text an-xs a-mute">
        same password, no certificate
      </text>

      {/* ================= the closing card ================= */}
      <rect x={R_X} y={K_Y} width={R_W} height={84} rx={16} className="ap-note" />
      <g className="ap-ink">
        <Glyph name="shield" cx={R_X + 52} cy={K_Y + 42} size={34} tone="accent" />
      </g>
      <text x={R_X + 92} y={K_Y + 36} className="a-text an-sm a-ink">
        Your data. Your apps.
      </text>
      <text x={R_X + 92} y={K_Y + 60} className="a-text an-xs a-mute">
        Only on devices you have approved.
      </text>
    </svg>
  );
}
