import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is SSO?" — the answer-strip illustration for
   /zero-trust-features/single-sign-on.

   THIS IS AN EXPLAINER, NOT AN OUTCOMES ARTIFACT. The outcomes
   illustration argues a conclusion; this one has to teach a mechanism
   to somebody who does not yet know it. So it is authored as a
   NARRATIVE DOWN THE PAGE — one user, one login, one assertion, every
   app — rather than as a scene to be read in any order. The slot is
   portrait (518px wide against ~870 of column), which is why the
   reference sheet's left-to-right board becomes a vertical ladder
   here instead of being squeezed sideways.

   THE TWO NUMBERS ARE THE WHOLE POINT. Everything else in the picture
   is context for step 1 (authenticate once) and step 2 (be vouched
   for). They are the only accent rings in the composition.

   TYPE. viewBox is 720 wide against a 518px slot ≈ 0.72 scale, so
   18px lands near 13px on screen and 15px near 11px. Mono advance is
   12.5 units at 18px, 10.4 at 15px, 9.0 at 13px. Widest run is the
   provider title (26ch → 325, centred on 360 → 197..522 inside a
   panel of 90..630). */

const VB_W = 720;
const VB_H = 820;

const MID = 360;

/* ---------- the identity provider ---------- */
const IDP_X = 90;
const IDP_Y = 250;
const IDP_W = 540;
const IDP_H = 330;

/* ---------- what the assertion opens ---------- */
const APPS = [
  { id: "hr", label: "HR portal", glyph: "buildings" as const },
  { id: "sales", label: "Sales app", glyph: "chart" as const },
  { id: "fin", label: "Finance", glyph: "doc" as const },
  { id: "dev", label: "Dev console", glyph: "code" as const },
  { id: "files", label: "File share", glyph: "folder" as const },
];
const APP_W = 124;
const APP_Y = 660;
const APP_H = 96;
const APP_X = [40, 172, 304, 436, 568];

/** the numbered rings — the only two in the picture */
function Step({ n, cy, label }: { n: number; cy: number; label: string }) {
  return (
    <g>
      <circle cx={MID} cy={cy} r={15} className="an-step" />
      <text x={MID} y={cy + 5} textAnchor="middle" className="a-text an-xs an-step-n">
        {n}
      </text>
      <text x={MID + 26} y={cy + 5} className="a-text an-xs a-mute">
        {label}
      </text>
    </g>
  );
}

export function AnswerSso() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--sso"
      role="img"
      aria-label="One user authenticates once at the InstaSafe identity provider with a password and a second factor, and that one assertion opens the HR portal, sales app, finance tool, developer console and file share"
    >
      {/* ---------- who is asking ---------- */}
      <rect x={260} y={40} width={200} height={96} rx={10} className="a-plate" />
      <Glyph name="person" cx={318} cy={88} size={38} />
      <Glyph name="laptop" cx={402} cy={88} size={36} />
      <text x={MID} y={162} textAnchor="middle" className="a-text an-sm a-mute an-opt">
        one user, one browser
      </text>

      <path d={`M${MID} 178 V${181}`} className="a-line" />
      <path
        d={`M${MID} 181 V${196 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 0 } as React.CSSProperties}
      />
      <Step n={1} cy={196} label="login once" />
      <path
        d={`M${MID} ${196 + 15} V${IDP_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 1 } as React.CSSProperties}
      />

      {/* ---------- the one login that is defended properly ---------- */}
      <rect x={IDP_X} y={IDP_Y} width={IDP_W} height={IDP_H} rx={12} className="an-panel" />
      <Glyph name="shield-check" cx={MID} cy={296} size={36} tone="accent" />
      <text x={MID} y={344} textAnchor="middle" className="a-text a-ink">
        InstaSafe identity provider
      </text>

      <text x={130} y={382} className="a-text an-xs a-mute an-opt">
        AUTHENTICATE
      </text>
      <rect x={130} y={394} width={460} height={42} rx={6} className="a-chip" />
      <text x={148} y={421} className="a-text an-sm a-mute an-opt">
        user ID
      </text>
      <rect x={130} y={446} width={460} height={42} rx={6} className="a-chip" />
      <text x={148} y={473} className="a-text an-sm a-mute an-dots an-opt">
        ••••••••
      </text>

      <text x={130} y={516} className="a-text an-xs a-mute an-opt">
        SECOND FACTOR
      </text>
      {[
        { id: "push", glyph: "record" as const },
        { id: "bio", glyph: "fingerprint" as const },
        { id: "key", glyph: "lock" as const },
      ].map((m, i) => (
        <g key={m.id}>
          <rect x={130 + i * 84} y={526} width={74} height={44} rx={6} className="a-chip" />
          <Glyph name={m.glyph} cx={167 + i * 84} cy={548} size={22} />
        </g>
      ))}

      <path
        d={`M${MID} ${IDP_Y + IDP_H} V${616 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 2 } as React.CSSProperties}
      />
      <Step n={2} cy={616} label="one signed assertion" />
      <path
        d={`M${MID} ${616 + 15} V642`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />

      {/* ---------- what it opens ---------- */}
      {/* the bus: one assertion arriving at five doors at once */}
      <path d={`M${APP_X[0] + APP_W / 2} 642 H${APP_X[4] + APP_W / 2}`} className="a-line" data-draw pathLength={1} />
      {APPS.map((a, i) => (
        <g key={a.id}>
          <path
            d={`M${APP_X[i] + APP_W / 2} 642 V${APP_Y}`}
            className="z-dash-accent"
            style={{ ["--seg" as string]: 4 + i } as React.CSSProperties}
          />
          <rect x={APP_X[i]} y={APP_Y} width={APP_W} height={APP_H} rx={8} className="a-chip" />
          <Glyph name={a.glyph} cx={APP_X[i] + APP_W / 2} cy={APP_Y + 34} size={26} />
          <text
            x={APP_X[i] + APP_W / 2}
            y={APP_Y + 74}
            textAnchor="middle"
            className="a-text an-xs a-mute an-opt"
          >
            {a.label}
          </text>
        </g>
      ))}

      <text x={MID} y={790} textAnchor="middle" className="a-text an-sm a-accent">
        every app, one credential
      </text>
    </svg>
  );
}
