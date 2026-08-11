import { SquaresFour, ShieldCheck, User, Users, UsersThree } from "@phosphor-icons/react";
import { ArtIcon, IC } from "./ArtIcon";
import type { ArtifactProps } from "./types";

/* /secure-cloud-applications · one layer between every cloud and
   everyone — built from the supplied reference sheet.

   ONE artifact, per docs/three-outcomes-rule.md. The reference's three
   column drawings (a ticked shield, a cloud with an up arrow, a report
   page) are folded into this picture as its three parts:

     0 · the same lock everywhere   the layer itself, and the three
                                    audiences underneath it
     1 · migration without regression  the row of environments above
                                    it — interchangeable, and the next
                                    one lands on the same layer
     2 · one report                 a single sheet, tallied

   WHY THIS IS NOT A SECOND ACTIVITY LOG. `/secure-remote-access` sits
   in the same cluster and already ends in a live log panel; repeating
   that here would make two pages read as one diagram with different
   captions, which is the exact failure the rule exists to prevent.
   Column 03 says "is ONE report", so this draws a REPORT — a portrait
   sheet with a folded corner and a tally, no Live dot, no timestamps.
   Rows carry a logo instead of an environment tag: the mark IS the
   environment, and it saves a whole column of type.

   THE SHARED NOUN is the layer — a stratum with clouds above it and
   people below it — so the composition is a sandwich, not a funnel.

   GEOMETRY IS CHECKED, NOT EYEBALLED. Mono advance is ~11.1 units at
   16px and ~9.0 at 13px. The tightest run is the verb strip (38ch →
   482 against the layer's inner edge at 700). Shorten a label rather
   than shrinking the type.

   MOBILE. Second-tier labels carry `a-opt` and drop below 900px,
   leaving the five that matter: the layer's name, what it does, who
   it serves, the report, and its scope. */

const VB_W = 1010;
/* 500, not 560: the lowest ink is the audience label at 462, and the
   extra 60 units read as the picture sitting high in its slot */
const VB_H = 500;

/* ---------- part 1 · the environments above ---------- */
const CLOUDS = [
  { id: "aws", label: "AWS", logo: "aws", cx: 96 },
  { id: "azure", label: "Azure", logo: "azure", cx: 214 },
  { id: "gcp", label: "Google Cloud", logo: "google-cloud", cx: 332 },
  { id: "sfdc", label: "Salesforce", logo: "salesforce", cx: 450 },
  { id: "sap", label: "SAP", logo: "sap", cx: 568 },
  { id: "other", label: "Other apps", logo: null, cx: 686 },
];
const LOGO = 34;
const LOGO_CY = 64;

/* ---------- part 0 · the layer, and who it serves ---------- */
const BAR_X = 60;
const BAR_Y = 170;
const BAR_W = 660;
const BAR_H = 86;
const BAR_R = BAR_X + BAR_W; // 720
const BAR_MID = BAR_Y + BAR_H / 2; // 213

/* the glyph carries the headcount: one, a pair, a crowd */
const AUDIENCE = [
  { id: "emp", label: "Employees", cx: 190, glyph: User },
  { id: "ven", label: "Vendors", cx: 390, glyph: Users },
  { id: "par", label: "Partners", cx: 590, glyph: UsersThree },
];
const AUD_CY = 400;
const AUD_R = 34;

/* ---------- part 2 · the report ---------- */
const RPT_X = 756;
const RPT_Y = 64;
const RPT_W = 214;
const RPT_H = 356;
const RPT_L = RPT_X + 20; // 776
const RPT_R = RPT_X + RPT_W - 20; // 950
const RPT_ROWS = [
  { logo: "aws", what: "S3 bucket", n: "12" },
  { logo: "azure", what: "VM updated", n: "4" },
  { logo: "salesforce", what: "Opportunity", n: "9" },
  { logo: "sap", what: "Report run", n: "3" },
  { logo: "google-workspace", what: "Doc opened", n: "27" },
];
const RPT_ROW_Y = [164, 208, 252, 296, 340];

function Mark({ name, x, y, size }: { name: string; x: number; y: number; size: number }) {
  return <image href={`/logos/integrations/${name}.svg`} x={x} y={y} width={size} height={size} />;
}

export function CloudAccessLayer({ highlightIndex }: ArtifactProps) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-art--scl"
      role="img"
      aria-label="Five clouds and everything else drop onto a single InstaSafe access layer, which serves employees, vendors and partners and produces one report"
    >
      {/* ---------- 1 · migration without regression ---------- */}
      <g data-part={1} data-on={highlightIndex === 1 || undefined}>
        {CLOUDS.map((c, i) => (
          <g key={c.id}>
            {c.logo ? (
              <Mark name={c.logo} x={c.cx - LOGO / 2} y={LOGO_CY - LOGO / 2} size={LOGO} />
            ) : (
              /* no mark exists for "everything else", so it takes the
                 family's own tile glyph rather than an invented logo */
              <ArtIcon glyph={SquaresFour} cx={c.cx} cy={LOGO_CY} size={LOGO} tone="dim" />
            )}
            <text x={c.cx} y={106} textAnchor="middle" className="a-text scl-sm a-mute a-opt">
              {c.label}
            </text>
            <path
              d={`M${c.cx} 122 V${BAR_Y}`}
              className="z-dash-accent"
              style={{ ["--seg" as string]: i } as React.CSSProperties}
            />
            <circle cx={c.cx} cy={BAR_Y} r={4} className="scl-port" />
          </g>
        ))}
      </g>

      {/* ---------- 0 · every front door gets the same lock ---------- */}
      <g data-part={0} data-on={highlightIndex === 0 || undefined}>
        <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H} rx={10} className="scl-layer" />
        {/* duotone, because this is the one glyph carrying the claim */}
        <ArtIcon glyph={ShieldCheck} cx={100} cy={BAR_MID} size={IC.hero} tone="accent" weight="duotone" />
        {/* centred on the bar's remaining width (140→700), not left-set:
            left-aligned the two lines left a 200-unit void on the right
            of a plate that is meant to read as continuous */}
        <text x={420} y={206} textAnchor="middle" className="a-text a-ink">
          INSTASAFE ACCESS LAYER
        </text>
        <text x={420} y={234} textAnchor="middle" className="a-text scl-sm a-accent">
          VERIFY · AUTHORIZE · ENFORCE · MONITOR
        </text>

        {AUDIENCE.map((a, i) => (
          <g key={a.id}>
            <path
              d={`M${a.cx} ${BAR_Y + BAR_H} V${AUD_CY - AUD_R}`}
              className="z-dash-accent"
              style={{ ["--seg" as string]: 7 + i } as React.CSSProperties}
            />
            <circle cx={a.cx} cy={AUD_CY} r={AUD_R} className="zt-avatar" />
            <ArtIcon glyph={a.glyph} cx={a.cx} cy={AUD_CY} size={IC.node} tone="dim" />
            <text
              x={a.cx}
              y={AUD_CY + 62}
              textAnchor="middle"
              className={`a-text scl-sm a-mute${a.id === "emp" ? "" : " a-opt"}`}
            >
              {a.label}
            </text>
          </g>
        ))}
      </g>

      {/* ---------- 2 · one report ---------- */}
      <g data-part={2} data-on={highlightIndex === 2 || undefined}>
        <path
          d={`M${BAR_R} ${BAR_MID} H${RPT_X}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 6 } as React.CSSProperties}
        />

        <rect x={RPT_X} y={RPT_Y} width={RPT_W} height={RPT_H} rx={4} className="a-plate" />
        {/* a folded corner — a sheet, not another panel */}
        <path d={`M${RPT_X + RPT_W - 24} ${RPT_Y} L${RPT_X + RPT_W} ${RPT_Y + 24} H${RPT_X + RPT_W - 24} Z`} className="scl-fold" />

        <text x={RPT_L} y={104} className="a-text a-ink">
          Access report
        </text>
        <path d={`M${RPT_L} 122 H${RPT_R}`} className="a-line" data-draw pathLength={1} />

        {RPT_ROWS.map((r, i) => (
          <g key={r.logo}>
            <Mark name={r.logo} x={RPT_L} y={RPT_ROW_Y[i] - 13} size={18} />
            <text x={RPT_L + 26} y={RPT_ROW_Y[i]} className="a-text scl-sm a-mute a-opt">
              {r.what}
            </text>
            <text x={RPT_R} y={RPT_ROW_Y[i]} textAnchor="end" className="a-text scl-sm a-ink a-opt">
              {r.n}
            </text>
          </g>
        ))}

        <path d={`M${RPT_L} 372 H${RPT_R}`} className="a-line" data-draw pathLength={1} />
        <text x={RPT_L} y={398} className="a-text scl-sm a-accent">
          every environment
        </text>
      </g>
    </svg>
  );
}
