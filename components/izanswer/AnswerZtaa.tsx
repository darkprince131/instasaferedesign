import { Glyph, type GlyphName } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is ZTAA?" — the answer-strip illustration for
   /zero-trust-application-access.

   THE THREE BEATS OF THE ANSWER, IN ORDER. ZTAA is not one idea but
   three stacked on each other, and a reader who has never heard the
   acronym only gets it if they see them separated: a portal that
   shows you your applications and no one else's, a session that is
   governed while it runs, and a record of what happened in it. So
   the picture is a ladder, same as AnswerZtna — but where that one
   ends at "one tunnel, one app", this one starts after the app opens.
   That is the whole difference between the two products, and the two
   pictures have to disagree in exactly that place.

   THE REFUSALS. Two of them, one per level, because a picture of a
   portal full of apps is a picture of a launcher, not of access
   control. The dashed tiles are applications this person was not
   provisioned — they do not appear greyed, they are not there. The
   struck chips are the clipboard and the download, refused inside a
   session that is otherwise working normally.

   NOT A SCREENSHOT. The page already carries two real consoles (the
   hero dashboard and the portal simulator). A third product shot in
   the answer slot would teach nothing the reader has not just seen,
   so this stays in the drawn vocabulary the other explainers use.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 18px lands
   near 13px, 15px near 11px, 13px near 9px. */

const VB_W = 720;
const VB_H = 820;
const MID = 360;

/* ---------- step 1 · the portal, and what is not in it ---------- */
const P_X = 56;
const P_Y = 176;
const P_W = 608;
const P_H = 218;
const BAR_H = 36;

type Tile = { label: string; glyph: GlyphName; on: boolean };
/* Six provisioned, two not. The order interleaves them so the absent
   ones do not read as a trailing row that ran out of content. */
const TILES: Tile[] = [
  { label: "web app", glyph: "tiles", on: true },
  { label: "remote desktop", glyph: "laptop", on: true },
  { label: "ssh", glyph: "terminal", on: true },
  { label: "finance", glyph: "board", on: false },
  { label: "database", glyph: "database", on: true },
  { label: "file share", glyph: "folder", on: true },
  { label: "code", glyph: "code", on: true },
  { label: "hr records", glyph: "doc", on: false },
];
const T_W = 136;
const T_H = 68;
const T_GAP = 14;
const T_X = [0, 1, 2, 3].map((i) => P_X + 24 + i * (T_W + T_GAP));
const T_Y = [P_Y + BAR_H + 18, P_Y + BAR_H + 18 + T_H + T_GAP];

/* ---------- step 2 · the session, while it runs ---------- */
const S_Y = 470;
const S_H = 152;
const SCR_X = P_X + 24;
const SCR_W = 300;

type Chip = { label: string; refused?: boolean };
const CHIPS: Chip[] = [
  { label: "recording" },
  { label: "watermarked" },
  { label: "copy out", refused: true },
  { label: "download", refused: true },
];
const C_X = SCR_X + SCR_W + 28;
const C_W = P_W - (C_X - P_X) - 24;

/* ---------- step 3 · the record ---------- */
const L_Y = 690;
const LOG = [
  "09:42:18  mfa verified · totp",
  "09:42:21  policy matched · role finance",
  "09:42:26  clipboard export refused",
];

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

export function AnswerZtaa() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--ztaa"
      role="img"
      aria-label="One person signs in to a browser portal and sees only the applications they were provisioned; two others are absent. Opening one starts a session that is recorded and watermarked, with copy-out and download refused, and every action is written to an audit record."
    >
      {/* ---------- who is asking ---------- */}
      <rect x={250} y={26} width={220} height={92} rx={10} className="a-plate" />
      <Glyph name="person" cx={310} cy={72} size={36} />
      <Glyph name="laptop" cx={402} cy={72} size={34} />
      <text x={MID} y={142} textAnchor="middle" className="a-text an-sm a-mute">
        one browser, one sign-in
      </text>

      <path
        d={`M${MID} 156 V${182 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 0 } as React.CSSProperties}
      />
      <Step n={1} cy={182} label="the portal is theirs alone" />
      <path
        d={`M${MID} ${182 + 15} V${P_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 1 } as React.CSSProperties}
      />

      {/* ---------- the portal ---------- */}
      <rect x={P_X} y={P_Y} width={P_W} height={P_H} rx={12} className="an-panel" />
      <path d={`M${P_X} ${P_Y + BAR_H} H${P_X + P_W}`} className="a-line" />
      {/* the real mark, not a drawn shield: this chip is the product's
          own chrome. The colour variant is used for both themes — the
          emblem is orange and purple, and reads on paper and on dark.
          `image` is already in answers.css's reveal restore list. */}
      <image href="/brand/instasafe-mark-color.svg" x={P_X + 18} y={P_Y + 8} width={20} height={20} />
      <text x={P_X + 48} y={P_Y + 24} className="a-text an-xs a-ink">
        Access Portal
      </text>
      <text x={P_X + P_W - 22} y={P_Y + 24} textAnchor="end" className="a-text an-xs a-mute an-opt">
        6 of 8 provisioned
      </text>

      {TILES.map((t, i) => {
        const x = T_X[i % 4];
        const y = T_Y[Math.floor(i / 4)];
        return (
          <g key={t.label}>
            <rect
              x={x}
              y={y}
              width={T_W}
              height={T_H}
              rx={8}
              className={t.on ? "a-chip" : "an-unreachable"}
            />
            <Glyph
              name={t.glyph}
              cx={x + T_W / 2}
              cy={y + 26}
              size={24}
              tone={t.on ? undefined : "mute"}
            />
            {!t.on && (
              <path
                d={`M${x + T_W / 2 - 12} ${y + 14} l24 24 M${x + T_W / 2 + 12} ${y + 14} l-24 24`}
                className="a-x"
              />
            )}
            <text
              x={x + T_W / 2}
              y={y + 54}
              textAnchor="middle"
              className={`a-text an-xs ${t.on ? "a-ink" : "a-mute"} an-opt`}
            >
              {t.on ? t.label : "not provisioned"}
            </text>
          </g>
        );
      })}

      <path
        d={`M${MID} ${P_Y + P_H} V${420 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 2 } as React.CSSProperties}
      />
      <Step n={2} cy={420} label="the session is governed while it runs" />
      <path
        d={`M${MID} ${420 + 15} V${S_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 3 } as React.CSSProperties}
      />

      {/* ---------- the session ---------- */}
      <rect x={P_X} y={S_Y} width={P_W} height={S_H} rx={12} className="an-panel" />
      <rect x={SCR_X} y={S_Y + 22} width={SCR_W} height={S_H - 44} rx={8} className="an-dark" />
      <text
        x={SCR_X + SCR_W / 2}
        y={S_Y + S_H / 2 + 4}
        textAnchor="middle"
        className="a-text an-sm a-mute"
        transform={`rotate(-16 ${SCR_X + SCR_W / 2} ${S_Y + S_H / 2})`}
      >
        arjun.r@acme.com
      </text>
      <circle cx={SCR_X + 20} cy={S_Y + 42} r={5} className="a-dot-in" />
      <text x={SCR_X + 34} y={S_Y + 46} className="a-text an-xs a-accent an-opt">
        live
      </text>

      {CHIPS.map((c, i) => {
        const y = S_Y + 24 + i * 28;
        return (
          <g key={c.label}>
            <rect x={C_X} y={y} width={C_W} height={22} rx={6} className={c.refused ? "an-unreachable" : "a-chip"} />
            <text x={C_X + 12} y={y + 15} className={`a-text an-xs ${c.refused ? "a-mute" : "a-ink"}`}>
              {c.label}
            </text>
            <text x={C_X + C_W - 12} y={y + 15} textAnchor="end" className={`a-text an-xs ${c.refused ? "a-deny" : "a-accent"}`}>
              {c.refused ? "refused" : "on"}
            </text>
          </g>
        );
      })}

      <path
        d={`M${MID} ${S_Y + S_H} V${656 - 15}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 4 } as React.CSSProperties}
      />
      <Step n={3} cy={656} label="and every action is written down" />
      <path
        d={`M${MID} ${656 + 15} V${L_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 5 } as React.CSSProperties}
      />

      {/* ---------- the record ---------- */}
      <rect x={P_X} y={L_Y} width={P_W} height={82} rx={10} className="a-plate" />
      {LOG.map((line, i) => (
        <text key={line} x={P_X + 24} y={L_Y + 26 + i * 22} className="a-text an-xs a-mute">
          {line}
        </text>
      ))}

      <text x={MID} y={VB_H - 6} textAnchor="middle" className="a-text an-sm a-accent">
        the network was never on the other side
      </text>
    </svg>
  );
}
