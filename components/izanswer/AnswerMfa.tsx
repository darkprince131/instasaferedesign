import { Glyph } from "@/components/izoutcomes/artifacts/DrawnGlyphs";

/* "What is MFA?" — the answer-strip illustration for
   /multifactor-authentication.

   THE KINDS ARE THE ARGUMENT. Every reader already knows what a
   second code is; almost none know why the KIND of proof is the thing
   that matters. So the three factors are drawn as three peers — a
   secret, an object, a body — each shown as the thing it actually is:
   a password field, a phone holding a six-digit code, a fingerprint
   mid-scan. A row of identical icons would have made them look
   interchangeable, which is the misunderstanding this picture exists
   to remove.

   IT IS DELIBERATELY NOT A FLOWCHART. An earlier version was boxes
   and connectors, and it read as process documentation. The subject
   is a login, so the picture is made of the surfaces a login actually
   happens on: a browser window with real chrome, cards with soft icon
   plates, a device with a screen. The dashed connectors are still
   there but they are the least of it.

   NOT MfaEngine. The outcomes artifact argues that friction is sized
   to risk across every entry point; this teaches what a factor is.

   TYPE. viewBox 720 against a ~518px slot ≈ 0.72 scale: 18px lands
   near 13px, 15px near 11px, 13px near 9px. */

const VB_W = 720;
const VB_H = 970;
const MID = 360;

/* ---------- the browser the login happens in ---------- */
const W_X = 150;
const W_Y = 40;
const W_W = 420;
const W_H = 250;
const BAR = 34;

/* ---------- the three kinds ---------- */
const C_W = 208;
const C_H = 214;
const C_X = [26, 256, 486];
const C_Y = 440;
/* The fan sits well clear of the number chips. When the two were close
   the chips landed ON the dashes and the whole thing read as a
   flowchart node diagram — which is the one thing this picture must
   not look like. */
const FAN_Y = C_Y - 104;
const N_CY = C_Y - 46;
const N_R = 15;

/* ---------- the verdict ---------- */
const OK_CY = 856;

export function AnswerMfa() {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="iz-art iz-ans iz-ans--mfa"
      role="img"
      aria-label="A person signs in to a browser, then proves who they are three different ways — a secret they know, a code on a device they hold, and a fingerprint that is part of them. All three are accepted and the session opens."
    >
      {/* ================= the login ================= */}
      <rect x={W_X} y={W_Y} width={W_W} height={W_H} rx={14} className="an-panel" />
      <path d={`M${W_X} ${W_Y + BAR} H${W_X + W_W}`} className="a-line" />
      <circle cx={W_X + 24} cy={W_Y + 17} r={4.5} className="am-dot" />
      <circle cx={W_X + 40} cy={W_Y + 17} r={4.5} className="am-dot" />
      <circle cx={W_X + 56} cy={W_Y + 17} r={4.5} className="am-dot" />
      <rect x={W_X + 86} y={W_Y + 9} width={150} height={17} rx={8} className="am-url" />

      {/* the product's own mark sits on the login, not a stock shield */}
      <image href="/brand/instasafe-mark-color.svg" x={MID - 19} y={W_Y + 54} width={38} height={38} />

      {/* the credential card inside the window */}
      <rect x={W_X + 46} y={W_Y + 110} width={W_W - 92} height={110} rx={10} className="am-card" />
      <Glyph name="person" cx={MID} cy={W_Y + 140} size={26} tone="mute" />
      <rect x={W_X + 76} y={W_Y + 160} width={W_W - 152} height={22} rx={11} className="am-field" />
      <text x={MID} y={W_Y + 176} textAnchor="middle" className="a-text an-xs a-mute an-dots">
        ••••••••
      </text>
      {/* the one orange control in the window */}
      <rect x={W_X + 76} y={W_Y + 190} width={W_W - 152} height={22} rx={11} className="am-go" />
      <path
        d={`M${MID - 7} ${W_Y + 201} h14 m-5 -5 l5 5 l-5 5`}
        className="am-go-arrow"
      />

      <text x={MID} y={W_Y + W_H + 34} textAnchor="middle" className="a-text an-sm a-mute">
        the password gets them to the question, not past it
      </text>

      <path
        d={`M${MID} ${W_Y + W_H + 50} V${FAN_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 0 } as React.CSSProperties}
      />
      <path
        d={`M${C_X[0] + C_W / 2} ${FAN_Y} H${C_X[2] + C_W / 2}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 1 } as React.CSSProperties}
      />

      {/* ================= 1 · something you know ================= */}
      <Card i={0} n="1" kind="something you know" label="A secret" seg={2}>
        <circle cx={C_X[0] + C_W / 2} cy={C_Y + 72} r={44} className="am-plate" />
        <g className="am-ink">
          <Glyph name="lock" cx={C_X[0] + C_W / 2} cy={C_Y + 72} size={44} />
        </g>
        <rect x={C_X[0] + 30} y={C_Y + 128} width={C_W - 60} height={26} rx={13} className="am-field" />
        <text x={C_X[0] + 52} y={C_Y + 146} className="a-text an-xs a-mute an-dots">
          ••••••
        </text>
        <path
          d={`M${C_X[0] + C_W - 52} ${C_Y + 141} c5 -6 13 -6 18 0 c-5 6 -13 6 -18 0`}
          className="am-eye"
        />
        <circle cx={C_X[0] + C_W - 43} cy={C_Y + 141} r={2} className="am-eye-pupil" />
      </Card>

      {/* ================= 2 · something you have ================= */}
      <Card i={1} n="2" kind="something you have" label="A device" seg={3}>
        <rect x={C_X[1] + C_W / 2 - 38} y={C_Y + 24} width={76} height={126} rx={13} className="am-phone" />
        <rect x={C_X[1] + C_W / 2 - 10} y={C_Y + 33} width={20} height={3.5} rx={1.75} className="am-phone-sp" />
        {/* the code card overhangs the handset on both sides — that
            overlap is what stops the pair reading as one flat icon */}
        <rect x={C_X[1] + 18} y={C_Y + 74} width={C_W - 36} height={34} rx={8} className="am-code" />
        <text x={C_X[1] + C_W / 2} y={C_Y + 97} textAnchor="middle" className="a-text an-sm a-ink am-code-t">
          123 456
        </text>
      </Card>

      {/* ================= 3 · something you are ================= */}
      <Card i={2} n="3" kind="something you are" label="A body" seg={4}>
        <circle cx={C_X[2] + C_W / 2} cy={C_Y + 72} r={44} className="am-plate" />
        <g className="am-ink">
          <Glyph name="fingerprint" cx={C_X[2] + C_W / 2} cy={C_Y + 72} size={46} />
        </g>
        <rect x={C_X[2] + 34} y={C_Y + 138} width={C_W - 68} height={8} rx={4} className="am-track" />
        <rect x={C_X[2] + 34} y={C_Y + 138} width={(C_W - 68) * 0.62} height={8} rx={4} className="am-fill" />
      </Card>

      {/* the small ticks BETWEEN the cards — each factor is accepted
          before the next is asked for, which is why they sit in the
          gaps rather than on the cards */}
      {[0, 1].map((g) => {
        const x = (C_X[g] + C_W + C_X[g + 1]) / 2;
        return (
          <g key={g}>
            <circle cx={x} cy={C_Y + C_H / 2} r={13} className="am-tick" />
            <path d={`M${x - 5} ${C_Y + C_H / 2} l3.6 4 l6.4 -8`} className="am-tick-mark" />
          </g>
        );
      })}

      {/* ================= all three, then the door ================= */}
      {/* the drops start BELOW the card captions — at +46 they began
          level with "something you know" and crossed it */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${C_X[i] + C_W / 2} ${C_Y + C_H + 68} V${OK_CY - 96}`}
          className="z-dash-accent"
          style={{ ["--seg" as string]: 5 + i } as React.CSSProperties}
        />
      ))}
      <path
        d={`M${C_X[0] + C_W / 2} ${OK_CY - 96} H${C_X[2] + C_W / 2}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 8 } as React.CSSProperties}
      />
      <path
        d={`M${MID} ${OK_CY - 96} V${OK_CY - 52}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: 9 } as React.CSSProperties}
      />

      <circle cx={MID} cy={OK_CY} r={52} className="am-ok" />
      <Glyph name="shield-check" cx={MID} cy={OK_CY} size={46} tone="allow" />
      <text x={MID} y={OK_CY + 82} textAnchor="middle" className="a-text an-sm a-accent">
        three kinds of proof, not three secrets
      </text>
    </svg>
  );
}

/* One factor card: the number in its own chip above, the illustration
   in the middle, the naming underneath. Children draw the middle. */
function Card({
  i,
  n,
  kind,
  label,
  seg,
  children,
}: {
  i: number;
  n: string;
  kind: string;
  label: string;
  seg: number;
  children: React.ReactNode;
}) {
  const x = C_X[i];
  const cx = x + C_W / 2;
  return (
    <g>
      {/* fan → chip, then chip → card: the number gets its own air on
          both sides instead of sitting on a line */}
      <path
        d={`M${cx} ${FAN_Y} V${N_CY - N_R}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: seg } as React.CSSProperties}
      />
      <circle cx={cx} cy={N_CY} r={N_R} className="an-step" />
      <text x={cx} y={N_CY + 5} textAnchor="middle" className="a-text an-xs an-step-n">
        {n}
      </text>
      <path
        d={`M${cx} ${N_CY + N_R} V${C_Y}`}
        className="z-dash-accent"
        style={{ ["--seg" as string]: seg } as React.CSSProperties}
      />

      <rect x={x} y={C_Y} width={C_W} height={C_H} rx={14} className="an-panel" />
      {children}

      <text x={cx} y={C_Y + C_H + 26} textAnchor="middle" className="a-text an-sm a-ink">
        {label}
      </text>
      <text x={cx} y={C_Y + C_H + 48} textAnchor="middle" className="a-text an-xs a-mute an-opt">
        {kind}
      </text>
    </g>
  );
}
