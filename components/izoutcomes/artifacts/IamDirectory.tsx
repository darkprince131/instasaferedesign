import type { ArtifactProps } from "./types";

/* IAM — the whole identity plane, as the reference draws it.

   Five sources converge into one record; that record grants across the
   estate and revokes across it; and a single lifecycle event is what
   moves the whole thing. Five regions, one argument:

     top     sources feeding in
     left    the two lifecycle events that change the record
     centre  the record itself
     right   the estate, granted and revoked together
     bottom  one action reaching every app at once

   Highlight map (hover an outcome column):
     0 sources + the record        (one source of identity truth)
     1 lifecycle + revoked + strip (offboarding in one action)
     2 policies + adaptive factor  (authentication matches risk)

   GEOMETRY IS CHECKED, NOT EYEBALLED. The core is r=132 at (470,330),
   which is what buys the internal padding the earlier r=100 version
   lacked — at y=418 the chord is still ~197 units wide, so the deepest
   row clears the ring by roughly 50 units instead of 11. Regions are
   spaced so no wire crosses a plate: the left panel ends at 208 and the
   circle starts at 338; the circle ends at 602 and the app rows start
   at 760. Re-run the getBBox overlap pass after moving anything.

   Every brand is a real mark from /public/logos/integrations, which
   invert to white on dark automatically. Where the reference named
   something we hold no logo for ("HR System", "Other IdPs", "Linux
   Server", "Legacy App") the row became a real product we do have — a
   directory diagram full of anonymous boxes argues nothing. */

const CX = 470;
const CY = 330;
const R = 132;

const SOURCES = [
  { label: "Active Directory", logo: "active-directory" },
  { label: "Entra ID", logo: "microsoft-entra-id" },
  /* the Google mark, not the Workspace wordmark — "Workspace" set
     under a 96-unit tile left 3 units of padding and read as broken */
  { label: "Google", logo: "google" },
  { label: "Workday", logo: "workday" },
  { label: "OneLogin", logo: "onelogin" },
];
const SRC_X = [254, 362, 470, 578, 686];

const RECORD = ["Users", "Groups", "Roles", "Policies"];

type App = { label: string; logo: string; ok: boolean };
const APPS: App[] = [
  { label: "AWS Console", logo: "aws", ok: true },
  { label: "Slack", logo: "slack", ok: true },
  { label: "SAP", logo: "sap", ok: true },
  { label: "Salesforce", logo: "salesforce", ok: true },
  { label: "Zoom", logo: "zoom", ok: true },
  { label: "GitHub", logo: "github", ok: false },
  { label: "Jenkins", logo: "jenkins", ok: false },
  { label: "Oracle", logo: "oracle", ok: false },
];
const APP_X = 760;
const APP_W = 204;
const rowY = (i: number) => 84 + i * 50;

const STRIP = ["aws", "slack", "sap", "salesforce", "github"];

const Person = () => (
  <>
    <circle cx="10" cy="6" r="3.4" className="z-glyph" />
    <path d="M3.5 16c0-3.6 2.9-5.4 6.5-5.4s6.5 1.8 6.5 5.4" className="z-glyph" />
  </>
);
const Shield = () => (
  <path d="M10 2.5l6.5 2.4v4.8c0 3.7-2.8 6.1-6.5 7.4-3.7-1.3-6.5-3.7-6.5-7.4V4.9z" className="z-glyph" />
);

function G({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: React.ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}
function Logo({ name, x, y, size = 26 }: { name: string; x: number; y: number; size?: number }) {
  return <image href={`/logos/integrations/${name}.svg`} x={x} y={y} width={size} height={size} />;
}
/** `seg` orders the one-shot connect: sources, lifecycle, grants, revocations. */
function Wire({ d, tone, seg }: { d: string; tone: "neutral" | "allow" | "deny"; seg: number }) {
  return <path d={d} className={`z-dash-${tone}`} style={{ ["--seg" as string]: seg } as React.CSSProperties} />;
}

export function IamDirectory({ highlightIndex }: ArtifactProps) {
  const on = (i: number) => (highlightIndex === i ? true : undefined);
  const granted = APPS.filter((a) => a.ok);

  return (
    <svg
      viewBox="0 0 980 620"
      className="iz-art iz-art--iam"
      role="img"
      aria-label="Five identity sources resolving into one directory record that grants and revokes access across the whole application estate, driven by a single lifecycle event"
    >
      {/* ================= sources ================= */}
      <g data-part={0} data-on={on(0)}>
        <text x={206} y={16} className="a-text a-mute iam-label">
          IDENTITY SOURCES
        </text>
        {SOURCES.map((s, i) => {
          const [head, ...rest] = s.label.split(" ");
          return (
            <g key={s.label}>
              <rect x={SRC_X[i] - 48} y={26} width={96} height={84} rx={10} className="a-plate" />
              <Logo name={s.logo} x={SRC_X[i] - 13} y={38} />
              {/* two lines, 20 apart — these labels are wider than the tile on one */}
              <text x={SRC_X[i]} y={82} textAnchor="middle" className="a-text a-ink iam-tile">
                {head}
              </text>
              {rest.length > 0 && (
                <text x={SRC_X[i]} y={102} textAnchor="middle" className="a-text a-mute iam-tile">
                  {rest.join(" ")}
                </text>
              )}
            </g>
          );
        })}
        {SRC_X.map((x, i) => (
          <Wire key={x} d={`M${x} 110 V${136 + i * 9} H${CX} V${CY - R}`} tone="neutral" seg={i} />
        ))}
      </g>

      {/* ================= lifecycle events ================= */}
      <g data-part={1} data-on={on(1)}>
        <rect x={16} y={286} width={192} height={196} rx={10} className="a-plate" />
        <text x={34} y={312} className="a-text a-mute iam-label">
          LIFE CYCLE EVENTS
        </text>
        <line x1={16} y1={326} x2={208} y2={326} className="a-line" data-draw pathLength={1} />

        <G x={34} y={344} s={0.9}>
          <Person />
        </G>
        <text x={62} y={358} className="a-text iam-ok iam-src">
          NEW USER
        </text>
        <text x={34} y={376} className="a-text a-mute iam-strap">
          User created
        </text>
        <text x={34} y={396} className="a-text a-mute iam-strap">
          in directory
        </text>

        <line x1={34} y1={406} x2={190} y2={406} className="a-line" />

        <G x={34} y={418} s={0.9}>
          <Person />
        </G>
        <text x={62} y={432} className="a-text iam-no iam-src">
          DISABLE USER
        </text>
        <text x={34} y={450} className="a-text a-mute iam-strap">
          User disabled
        </text>
        <text x={34} y={470} className="a-text a-mute iam-strap">
          in directory
        </text>

        <Wire d={`M208 352 H268 V${CY - 34} H${CX - R}`} tone="allow" seg={5} />
        <Wire d={`M208 426 H268 V${CY + 34} H${CX - R}`} tone="deny" seg={6} />
      </g>

      {/* ================= the record ================= */}
      <g data-part={0} data-on={on(0)}>
        <circle cx={CX} cy={CY} r={R + 36} className="iam-orbit" />
        <circle cx={CX} cy={CY} r={R + 18} className="iam-orbit" />
        <circle cx={CX} cy={CY} r={R} className="iam-core" />
        <circle cx={CX} cy={CY} r={R} className="iam-core-ring" />

        <G x={CX - 11} y={228} s={1.1}>
          <Person />
        </G>
        <text x={CX} y={282} textAnchor="middle" className="a-text a-accent iam-title">
          IDENTITY DIRECTORY
        </text>
        <text x={CX} y={302} textAnchor="middle" className="a-text a-mute iam-strap">
          Single source of truth
        </text>
        <line x1={CX - 88} y1={314} x2={CX + 88} y2={314} className="a-line" data-draw pathLength={1} />

        {RECORD.map((r, i) => {
          const y = 340 + i * 26;
          const last = i === RECORD.length - 1;
          return (
            <g key={r} data-part={last ? 2 : undefined} data-on={last ? on(2) : undefined}>
              <text x={CX - 70} y={y} className="a-text a-ink iam-row">
                {r}
              </text>
              <circle cx={CX + 70} cy={y - 5} r={4} className="z-dot-ok" />
            </g>
          );
        })}
      </g>

      {/* adaptive factor — the policy made visible */}
      <g data-part={2} data-on={on(2)}>
        <Wire d={`M${CX} ${CY + R} V486`} tone="neutral" seg={7} />
        <rect x={CX - 86} y={486} width={172} height={32} rx={16} className="iam-chip" />
        <G x={CX - 68} y={494} s={0.8}>
          <Shield />
        </G>
        <text x={CX - 44} y={507} className="a-text a-accent iam-src">
          Adaptive MFA
        </text>
      </g>

      {/* ================= application access ================= */}
      <text x={APP_X} y={46} className="a-text a-mute iam-label">
        APPLICATION ACCESS
      </text>

      <g data-part={0} data-on={on(0)}>
        {granted.map((a, i) => (
          <Wire key={a.label} d={`M${CX + R} ${CY} H${646 + i * 10} V${rowY(i)} H${APP_X}`} tone="allow" seg={8 + i} />
        ))}
      </g>
      <g data-part={1} data-on={on(1)}>
        {APPS.map((a, i) =>
          a.ok ? null : (
            <Wire
              key={a.label}
              d={`M${CX + R} ${CY} H${700 + (i - 5) * 10} V${rowY(i)} H${APP_X}`}
              tone="deny"
              seg={13 + i}
            />
          )
        )}
      </g>

      {APPS.map((a, i) => {
        const y = rowY(i);
        return (
          <g key={a.label} data-part={a.ok ? undefined : 1} data-on={a.ok ? undefined : on(1)}>
            <rect
              x={APP_X}
              y={y - 20}
              width={APP_W}
              height={40}
              rx={9}
              className={`a-plate ${a.ok ? "" : "iam-row-off"}`}
            />
            <Logo name={a.logo} x={APP_X + 14} y={y - 11} size={22} />
            <text x={APP_X + 48} y={y + 5} className={`a-text iam-row ${a.ok ? "a-ink" : "a-mute"}`}>
              {a.label}
            </text>
            {a.ok ? (
              <>
                <circle cx={APP_X + APP_W - 22} cy={y} r={9} className="z-ok-ring" />
                <path d={`M${APP_X + APP_W - 27} ${y} l3.4 3.6 l7 -7.4`} className="z-ok-tick" />
              </>
            ) : (
              <>
                <circle cx={APP_X + APP_W - 22} cy={y} r={9} className="z-no-ring" />
                <path
                  d={`M${APP_X + APP_W - 27} ${y - 5} l10 10 M${APP_X + APP_W - 17} ${y - 5} l-10 10`}
                  className="z-no-x"
                />
              </>
            )}
          </g>
        );
      })}

      {/* ================= one action, everywhere ================= */}
      <g data-part={1} data-on={on(1)}>
        <rect x={252} y={546} width={456} height={64} rx={10} className="a-plate" />
        <rect x={296} y={534} width={264} height={24} rx={12} className="iam-strip-tag" />
        <text x={428} y={550} textAnchor="middle" className="a-text a-mute iam-strap">
          ONE ACTION. EVERYWHERE.
        </text>

        <G x={278} y={568} s={1}>
          <Person />
        </G>
        <path d="M312 578 H344" className="z-dash-deny" style={{ ["--seg" as string]: 16 } as React.CSSProperties} />
        <circle cx={362} cy={578} r={11} className="z-no-ring" />
        <path d="M357 573 l10 10 M367 573 l-10 10" className="z-no-x" />
        <path d="M380 578 H412" className="z-dash-deny" style={{ ["--seg" as string]: 17 } as React.CSSProperties} />

        {STRIP.map((n, i) => (
          <g key={n} className="iam-strip-logo">
            <rect x={424 + i * 54} y={562} width={34} height={32} rx={7} className="a-plate" />
            <Logo name={n} x={430 + i * 54} y={568} size={22} />
          </g>
        ))}
      </g>
    </svg>
  );
}
