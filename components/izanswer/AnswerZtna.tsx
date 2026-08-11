import { Glyph, type GlyphName } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is ZTNA?" — the answer-strip illustration for
   /zero-trust-network-access.

   THE MECHANISM, IN THE ORDER IT HAPPENS. A VPN's story is "connect,
   then you are inside"; ZTNA's is three separate events, and the
   reader only understands the architecture if they see them as
   separate. So the picture is a ladder: who is asking gets checked,
   the gateway is knocked on rather than found, and exactly one
   application opens while the rest of the estate stays invisible.

   THIS PAGE ALREADY HAS TWO OTHER ZTNA PICTURES — the hero console
   and the outcomes fork (`ZtnaArchitecture`, granted vs unreachable).
   This one must not be a third version of either, which is why it is
   sequential rather than comparative, and why the gateway — the thing
   neither of the others draws — is the middle beat.

   THE DARK TILES ARE NOT DECORATION. Two of the three results are
   struck through: without them the picture claims "you get an app",
   which is what a VPN also claims. The refusal is the architecture.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 18px lands
   near 13px, 15px near 11px. Mono advance 12.5 / 10.4 / 9.0. */

const VB_W = 720;
const VB_H = 780;

const MID = 360;

/* ---------- step 2 · what is checked, before anything opens ---------- */
const CHECKS = [
  { id: "who", label: "identity", glyph: "person" as GlyphName },
  { id: "device", label: "device posture", glyph: "laptop" as GlyphName },
  { id: "ctx", label: "context", glyph: "clock" as GlyphName },
];
const CHK_W = 200;
const CHK_X = [40, 260, 480];
const CHK_Y = 230;
const CHK_H = 64;

/* ---------- step 3 · the gateway that does not answer ---------- */
const GW_X = 140;
const GW_Y = 384;
const GW_W = 440;
const GW_H = 96;

/* ---------- the result: one of three ---------- */
const RES_Y = 566;
const RES_H = 100;
const RES_W = 200;
const RES_X = [40, 260, 480];

function Step({ n, cy, label }: { n: number; cy: number; label: string }) {
  return (
    <g>
      <circle cx={MID} cy={cy} r={15} className="an-step" />
      <text x={MID} y={cy + 5} textAnchor="middle" className="a-text an-xs an-step-n">
        {n}
      </text>
      <text x={MID + 26} y={cy + 5} className="a-text an-xs a-mute an-opt">
        {label}
      </text>
    </g>
  );
}

export function AnswerZtna() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--ztna"
      role="img"
      aria-label="A verified user and device are checked on identity, device posture and context, knock on a gateway that answers nothing until they are known, and receive a tunnel to exactly one application while the rest of the estate stays invisible"
    >
      {/* ---------- who is asking ---------- */}
      <rect x={250} y={30} width={220} height={92} rx={10} className="a-plate" />
      <Glyph name="person" cx={310} cy={76} size={36} />
      <Glyph name="laptop" cx={402} cy={76} size={34} />
      <text x={MID} y={146} textAnchor="middle" className="a-text an-sm a-mute">
        a person, and the machine they are on
      </text>

      <path
        d={`M${MID} 160 V${182 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 0 } as React.CSSProperties}
      />
      <Step n={1} cy={182} label="both are checked, every time" />
      <path
        d={`M${MID} ${182 + 15} V${CHK_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 1 } as React.CSSProperties}
      />

      {/* ---------- what gets checked ---------- */}
      {CHECKS.map((c, i) => (
        <g key={c.id}>
          <rect x={CHK_X[i]} y={CHK_Y} width={CHK_W} height={CHK_H} rx={8} className="a-chip" />
          <Glyph name={c.glyph} cx={CHK_X[i] + 34} cy={CHK_Y + 32} size={24} />
          <text x={CHK_X[i] + 60} y={CHK_Y + 38} className="a-text an-xs a-mute an-opt">
            {c.label}
          </text>
        </g>
      ))}
      <path
        d={`M${CHK_X[0] + CHK_W / 2} ${CHK_Y + CHK_H} V318 H${CHK_X[2] + CHK_W / 2} V${CHK_Y + CHK_H}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 2 } as React.CSSProperties}
      />
      <path
        d={`M${MID} 318 V${340 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />
      <Step n={2} cy={340} label="one packet knocks" />
      <path
        d={`M${MID} ${340 + 15} V${GW_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 4 } as React.CSSProperties}
      />

      {/* ---------- the gateway nobody can find ---------- */}
      <rect x={GW_X} y={GW_Y} width={GW_W} height={GW_H} rx={10} className="an-dark" />
      <Glyph name="shield" cx={GW_X + 40} cy={GW_Y + 48} size={30} tone="accent" />
      <text x={GW_X + 74} y={GW_Y + 40} className="a-text an-sm a-ink">
        Gateway
      </text>
      <text x={GW_X + 74} y={GW_Y + 66} className="a-text an-xs a-mute an-opt">
        drops everything it was not expecting
      </text>
      <text x={GW_X + GW_W - 18} y={GW_Y + 40} textAnchor="end" className="a-text an-xs a-accent an-opt">
        0 ports
      </text>

      <path
        d={`M${MID} ${GW_Y + GW_H} V${518 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 5 } as React.CSSProperties}
      />
      <Step n={3} cy={518} label="one tunnel opens" />
      <path
        d={`M${MID} ${518 + 15} V${RES_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 6 } as React.CSSProperties}
      />

      {/* ---------- and the estate that stays invisible ---------- */}
      {[0, 1, 2].map((i) => {
        const granted = i === 1;
        return (
          <g key={i}>
            <rect
              x={RES_X[i]}
              y={RES_Y}
              width={RES_W}
              height={RES_H}
              rx={8}
              className={granted ? "an-granted" : "an-unreachable"}
            />
            <Glyph
              name={granted ? "database" : "tiles"}
              cx={RES_X[i] + RES_W / 2}
              cy={RES_Y + 36}
              size={26}
              tone={granted ? "accent" : "mute"}
            />
            {!granted && (
              <path
                d={`M${RES_X[i] + RES_W / 2 - 13} ${RES_Y + 23} l26 26 M${RES_X[i] + RES_W / 2 + 13} ${RES_Y + 23} l-26 26`}
                className="a-x"
              />
            )}
            <text
              x={RES_X[i] + RES_W / 2}
              y={RES_Y + 76}
              textAnchor="middle"
              className={`a-text an-xs ${granted ? "a-ink" : "a-mute"} an-opt`}
            >
              {granted ? "the one app asked for" : "not visible"}
            </text>
          </g>
        );
      })}

      <text x={MID} y={730} textAnchor="middle" className="a-text an-sm a-accent">
        no network is ever joined
      </text>
    </svg>
  );
}
