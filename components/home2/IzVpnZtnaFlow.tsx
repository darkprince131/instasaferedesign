"use client";

import { useId, useState } from "react";
import { Check, X } from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   IzVpnZtnaFlow — TIER 2 SECTION  (lab 00ak)

   The `vpn-ztna` variant of the WithWithout family, specced in
   §C.5 of the audit and modelled on the DiagramSection from
   fingerprint.com/products/identification/.

   Their structure, which is what makes it work:
     - a segmented [Before | After] control ABOVE the scene, not
       beside it, so the two states read as one object changing
       rather than two things being compared
     - an incoming cone of undifferentiated dots on the left
     - a decision point in the middle: a "?" when it's off, the
       product mark when it's on
     - an outgoing cone on the right that SPLITS into a green half
       and a red half only in the "after" state
     - annotations that arrive with the after state (callout box,
       node tags), so switching feels like information appearing

   Our content is the one you asked for: VPN puts everybody on the
   same network; ZTNA gives each person only the apps their role
   lists. The InstaSafe mark sits at the junction — absent in
   "before", the node everything routes through in "after". That
   single swap is what makes the diagram ours rather than generic.

   Desktop runs left→right with 12 sessions and 4 apps. Mobile runs
   top→down with 4 sessions and 3 apps — a smaller CAST, not a
   scaled-down drawing, which is why it's a separate SVG rather than
   a viewBox trick.
   ============================================================ */

type Tone = "allow" | "deny" | "mute";
type Dot = { x: number; y: number; r?: number; tone: Tone };

/* Deterministic scatter — no Math.random in render, so SSR and the
   client agree (house rule). Coordinates are in the 1200x560 viewBox. */
const IN_DOTS: Dot[] = [
  { x: 92, y: 118, tone: "mute" },
  { x: 168, y: 196, tone: "mute" },
  { x: 60, y: 268, tone: "mute" },
  { x: 214, y: 152, tone: "mute" },
  { x: 132, y: 330, tone: "mute" },
  { x: 250, y: 262, tone: "mute" },
  { x: 196, y: 372, tone: "mute" },
  { x: 96, y: 420, tone: "mute" },
  { x: 286, y: 200, tone: "mute" },
  { x: 264, y: 344, tone: "mute" },
  { x: 158, y: 452, tone: "mute" },
  { x: 316, y: 292, tone: "mute" },
];

/* Right-hand field. `tone` is the AFTER state; before, they're all mute. */
const OUT_DOTS: Dot[] = [
  { x: 906, y: 108, tone: "allow" },
  { x: 984, y: 74, tone: "allow" },
  { x: 1052, y: 132, tone: "allow" },
  { x: 934, y: 186, tone: "allow" },
  { x: 1024, y: 214, tone: "allow" },
  { x: 1102, y: 92, tone: "allow" },
  { x: 1088, y: 248, tone: "allow" },
  { x: 878, y: 250, tone: "allow" },
  { x: 926, y: 372, tone: "deny" },
  { x: 1010, y: 336, tone: "deny" },
  { x: 1084, y: 406, tone: "deny" },
  { x: 962, y: 452, tone: "deny" },
  { x: 1046, y: 490, tone: "deny" },
  { x: 892, y: 470, tone: "deny" },
];

const APPS = ["CRM", "Payroll", "Repos", "Wiki"];
const APPS_SM = ["CRM", "Payroll", "Repos"];

function Hatches({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern id={`h-mute-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" stroke="var(--tx)" strokeWidth="1.6" opacity="0.16" />
      </pattern>
      <pattern id={`h-allow-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" stroke="var(--allow)" strokeWidth="1.6" opacity="0.42" />
      </pattern>
      <pattern id={`h-deny-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="7" stroke="var(--deny)" strokeWidth="1.6" opacity="0.42" />
      </pattern>
    </defs>
  );
}

function dotFill(t: Tone, on: boolean) {
  if (!on) return "var(--ghost)";
  if (t === "allow") return "var(--allow)";
  if (t === "deny") return "var(--deny)";
  return "var(--ghost)";
}

/* ---------- desktop scene ---------- */
function SceneWide({ on }: { on: boolean }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg className="izvz-svg" viewBox="0 0 1200 560" role="img" aria-hidden="true">
      <Hatches uid={uid} />

      {/* incoming cone — identical in both states: the same people
          arrive either way, which is the point */}
      <polygon points="300,70 300,490 610,280" fill={`url(#h-mute-${uid})`} />

      {/* outgoing cone — one undifferentiated field, or split in two */}
      {on ? (
        <>
          <polygon points="790,280 1160,64 1160,280" fill={`url(#h-allow-${uid})`} />
          <polygon points="790,280 1160,280 1160,496" fill={`url(#h-deny-${uid})`} />
        </>
      ) : (
        <polygon points="790,280 1160,64 1160,496" fill={`url(#h-mute-${uid})`} />
      )}

      {IN_DOTS.map((d, i) => (
        <circle key={`i${i}`} cx={d.x} cy={d.y} r={d.r ?? 9} fill="var(--ghost)" />
      ))}

      {OUT_DOTS.map((d, i) => (
        <circle
          key={`o${i}`}
          className="izvz-out"
          cx={d.x}
          cy={d.y}
          r={d.r ?? 9}
          fill={dotFill(d.tone, on)}
          style={{ ["--i" as string]: i } as React.CSSProperties}
        />
      ))}

      {/* elbow arrows, drawn not typed */}
      <path d="M300 520 L300 486 L344 486" fill="none" stroke="var(--tx-mute)" strokeWidth="1.5" />
      <path d="M336 481 L346 486 L336 491" fill="none" stroke="var(--tx-mute)" strokeWidth="1.5" />
      <path d="M600 528 L700 528 L700 500" fill="none" stroke="var(--tx-mute)" strokeWidth="1.5" />
      <path d="M695 508 L700 498 L705 508" fill="none" stroke="var(--tx-mute)" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- mobile scene ----------
   Top→down, and a smaller cast: 4 sessions, 3 apps. A reduction in
   CONTENT, not a squeezed copy of the wide drawing. */
function SceneTall({ on }: { on: boolean }) {
  const uid = useId().replace(/:/g, "");
  const inDots: Dot[] = [
    { x: 96, y: 40, tone: "mute" },
    { x: 190, y: 68, tone: "mute" },
    { x: 268, y: 38, tone: "mute" },
    { x: 148, y: 96, tone: "mute" },
  ];
  const outDots: Dot[] = [
    { x: 84, y: 470, tone: "allow" },
    { x: 150, y: 508, tone: "allow" },
    { x: 116, y: 552, tone: "allow" },
    { x: 258, y: 480, tone: "deny" },
    { x: 300, y: 534, tone: "deny" },
  ];
  return (
    <svg className="izvz-svg" viewBox="0 0 380 600" role="img" aria-hidden="true">
      <Hatches uid={uid} />
      <polygon points="40,140 340,140 190,300" fill={`url(#h-mute-${uid})`} />
      {on ? (
        <>
          <polygon points="190,340 40,600 190,600" fill={`url(#h-allow-${uid})`} />
          <polygon points="190,340 190,600 340,600" fill={`url(#h-deny-${uid})`} />
        </>
      ) : (
        <polygon points="190,340 40,600 340,600" fill={`url(#h-mute-${uid})`} />
      )}
      {inDots.map((d, i) => (
        <circle key={`i${i}`} cx={d.x} cy={d.y} r="9" fill="var(--ghost)" />
      ))}
      {outDots.map((d, i) => (
        <circle
          key={`o${i}`}
          className="izvz-out"
          cx={d.x}
          cy={d.y}
          r="9"
          fill={dotFill(d.tone, on)}
          style={{ ["--i" as string]: i } as React.CSSProperties}
        />
      ))}
    </svg>
  );
}

export function IzVpnZtnaFlow({
  kicker = "VPN vs Zero Trust",
  title = (
    <>
      A VPN lets people <mark>onto the network</mark>.
      <br />
      InstaSafe lets them into <mark>one app</mark>.
    </>
  ),
  sub = "Same people, same devices, same day. The only thing that changes is what a session can reach once it is connected.",
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
}) {
  const [on, setOn] = useState(false);

  return (
    <section className="izvz iz-railed">
      <div className="iz-wrap izvz-head">
        <span className="izvz-kicker">
          {kicker}
          <i aria-hidden="true">_</i>
        </span>
        <h2 className="izvz-title">{title}</h2>
        <p className="izvz-sub">{sub}</p>
      </div>

      <div className="iz-wrap">
        <div className="izvz-band iz-inverted">
          {/* the control sits ABOVE the scene: one object changing,
              not two things side by side */}
          <div className="izvz-tabs" role="tablist" aria-label="Access model">
            <button
              type="button"
              role="tab"
              aria-selected={!on}
              className={`izvz-tab ${!on ? "on" : ""}`}
              onClick={() => setOn(false)}
            >
              With a VPN
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={on}
              className={`izvz-tab ${on ? "on accent" : ""}`}
              onClick={() => setOn(true)}
            >
              With InstaSafe
            </button>
          </div>

          <div className={`izvz-stage ${on ? "on" : ""}`}>
            {/* Everything anchored to the drawing lives inside .izvz-plot.
                On mobile the caption and the incoming label drop into
                normal flow BELOW it — if they were inside, the plot box
                would grow and every percentage anchor (the gate most
                visibly) would drift off the cone junction. */}
            <div className="izvz-plot">
              <div className="izvz-scene izvz-scene--wide">
                <SceneWide on={on} />
              </div>
              <div className="izvz-scene izvz-scene--tall">
                <SceneTall on={on} />
              </div>

              {/* --- overlay: HTML so labels use our type tokens --- */}

              <span className="izvz-gate" aria-hidden="true">
              {on ? (
                <span className="izvz-mark">
                  {/* forceTheme: LogoMark auto-detects the nearest [data-theme],
                      but `.iz-inverted` flips TOKENS without setting that
                      attribute — so on a paper page it would pick the colour
                      mark and put orange on an orange tile. Pin the white one. */}
                  <LogoMark size={30} forceTheme="dark" />
                </span>
              ) : (
                  <span className="izvz-q">?</span>
                )}
              </span>

              {/* annotations that only exist in the ON state — switching
                  should feel like information appearing */}
              <span className="izvz-tag izvz-tag--user">Session</span>
              <span className="izvz-tag izvz-tag--id">Verdict</span>

              <span className="izvz-verdict izvz-verdict--allow">
                <Check weight="bold" aria-hidden="true" />
                Allowed · role-scoped
              </span>
              <span className="izvz-verdict izvz-verdict--deny">
                <X weight="bold" aria-hidden="true" />
                Blocked · not listed
              </span>

              <span className="izvz-callout">
                Each person reaches only the applications their role lists. Everything else is not just denied — it is
                never routable.
              </span>

              <span className="izvz-apps" aria-hidden="true">
                {(on ? APPS : APPS_SM).map((a) => (
                  <span key={a} className="izvz-app">
                    {a}
                  </span>
                ))}
                {!on && <span className="izvz-app izvz-app--all">…and the rest of the subnet</span>}
              </span>
            </div>

            <span className="izvz-node izvz-node--in">
              Incoming sessions
              <b>Staff, contractors, service accounts</b>
            </span>

            <p className="izvz-caption">
              {on
                ? "InstaSafe checks identity, device and posture, then opens one application. Nothing else is routable."
                : "The VPN checks a credential once and places the session on the network. Everything on it is now reachable."}
            </p>
          </div>
        </div>

        {/* the external description box the reference puts under its band */}
        <p className="izvz-external">
          InstaSafe brokers each request against identity, device posture and policy before an application is exposed.
          There is no network segment to land on, so there is nothing to move laterally across.
        </p>
      </div>
    </section>
  );
}
