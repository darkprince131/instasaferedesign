"use client";

import { LogoMark } from "@/components/brand/Logo";
import {
  ChartLine,
  Database,
  GridFour,
  Lock,
  Prohibit,
  ShieldCheck,
  SquaresFour,
  Terminal,
  UserGear,
  UsersThree,
  UserSquare,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   IzConsoleLaptop — the platform Outcomes visual.

   THE WHOLE SCENE from the supplied reference, not just its hub:
   an isometric machine running the InstaSafe Console, with

     · USERS & DEVICES flowing IN from the left — employees on
       managed devices, contractors on unmanaged, partners on
       third-party — each wired to the machine;
     · YOUR APPLICATIONS on the right, each row checked green,
       reached through a wire that carries a green lock;
     · NOT REACHABLE below it — RDP, SSH, databases — the wire
       carrying a red lock, every row crossed out. What the
       platform hides is drawn with the same care as what it
       serves, because invisibility is the second outcome;
     · REAL-TIME DEVICE POSTURE ticking under the machine.

   The screen is real DOM on tokens (no screenshot): it stays
   crisp, and the whole object flips paper/dark for free. The
   isometric pose is applied to the MACHINE as one unit — shallow
   angles, so the UI foreshortens believably without shearing into
   illegibility.

   Counters are fictional console demo data, same convention as
   the homepage DashboardHero.

   MOTION: one ambient dash-flow on the session lines, CSS-only,
   removed under prefers-reduced-motion. The still is finished.
   ============================================================ */

const STATS: { label: string; n: string; Icon: Icon }[] = [
  { label: "Users", n: "1,248", Icon: UsersThree },
  { label: "Applications", n: "86", Icon: SquaresFour },
  { label: "Sessions", n: "312", Icon: ChartLine },
  { label: "Blocked", n: "24", Icon: Prohibit },
];

const SIDE_ICONS: Icon[] = [GridFour, UsersThree, ShieldCheck, ChartLine, Prohibit];

const USERS: { Icon: Icon; a: string; b: string }[] = [
  { Icon: UsersThree, a: "Employees", b: "Managed devices" },
  { Icon: UserGear, a: "Contractors", b: "Unmanaged devices" },
  { Icon: UserSquare, a: "Partners", b: "Third-party devices" },
];

const APPS: { logo?: string; Icon?: Icon; name: string }[] = [
  { logo: "aws", name: "AWS Console" },
  { logo: "slack", name: "Slack" },
  { logo: "sap", name: "SAP" },
  { Icon: SquaresFour, name: "Internal apps" },
];

const HIDDEN: { Icon: Icon; name: string }[] = [
  { Icon: Terminal, name: "RDP" },
  { Icon: Terminal, name: "SSH" },
  { Icon: Database, name: "Databases" },
];

/* ---------- the session-flow field on the screen ---------- */
const FLOWS: { d: string; ok: boolean; end: [number, number] }[] = [
  { d: "M16 18 C120 18 150 44 250 44 C350 44 380 24 492 24", ok: true, end: [492, 24] },
  { d: "M16 48 C120 48 150 56 250 56 C350 56 380 52 492 52", ok: true, end: [492, 52] },
  { d: "M16 78 C110 78 150 68 250 68 C310 68 330 74 356 78", ok: false, end: [356, 78] },
  { d: "M16 106 C120 106 150 80 250 80 C350 80 380 90 492 90", ok: true, end: [492, 90] },
  { d: "M16 130 C100 130 140 94 216 92 C250 92 262 100 282 106", ok: false, end: [282, 106] },
];

export function IzConsoleLaptop() {
  return (
    <div
      className="izcl"
      role="img"
      aria-label="Employees, contractors and partners connect through the InstaSafe console to authorized applications; RDP, SSH and databases stay unreachable"
    >
      {/* ---------------- users & devices, wired in ---------------- */}
      <div className="izcl-col izcl-col--in">
        <span className="izcl-kick">
          Users &amp; devices<i aria-hidden="true">_</i>
        </span>
        {USERS.map((u) => (
          <div key={u.a} className="izcl-card">
            <span className="izcl-card-ic">
              <u.Icon size={15} weight="regular" aria-hidden="true" />
            </span>
            <span className="izcl-card-t">
              <b>{u.a}</b>
              <em>{u.b}</em>
            </span>
          </div>
        ))}
      </div>

      {/* ---------------- the machine ---------------- */}
      <div className="izcl-mid">
        <div className="izcl-pose">
          <div className="izcl-lid">
            <div className="izcl-screen" aria-hidden="true">
              <div className="izcl-bar">
                <LogoMark size={13} />
                <b>InstaSafe Console</b>
                <span className="izcl-live">
                  <i />
                  live
                </span>
              </div>

              <div className="izcl-body">
                <aside className="izcl-side">
                  {SIDE_ICONS.map((I, i) => (
                    <span key={i} className={i === 0 ? "on" : undefined}>
                      <I size={12} weight={i === 0 ? "fill" : "regular"} />
                    </span>
                  ))}
                </aside>

                <div className="izcl-main">
                  <span className="izcl-lab">Access overview</span>
                  <div className="izcl-stats">
                    {STATS.map((s) => (
                      <div key={s.label} className="izcl-stat">
                        <b>{s.n}</b>
                        <span>
                          <s.Icon size={10} weight="regular" aria-hidden="true" />
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <span className="izcl-lab">
                    Session flow <em>· live</em>
                  </span>
                  <div className="izcl-flow">
                    <svg viewBox="0 0 508 148" preserveAspectRatio="xMidYMid meet">
                      {FLOWS.map((f, i) => (
                        <g key={i} className={f.ok ? "izcl-fl izcl-fl--ok" : "izcl-fl izcl-fl--no"}>
                          <path d={f.d} className="izcl-fl-line" pathLength={1} />
                          <path d={f.d} className="izcl-fl-dash" pathLength={1} style={{ ["--i" as string]: i }} />
                          <circle cx={16} cy={Number(f.d.split(" ")[1])} r={3} className="izcl-fl-src" />
                          {f.ok ? (
                            <circle cx={f.end[0]} cy={f.end[1]} r={3.5} className="izcl-fl-dst" />
                          ) : (
                            <g className="izcl-fl-x" transform={`translate(${f.end[0]} ${f.end[1]})`}>
                              <circle r={7} />
                              <path d="M-3 -3 L3 3 M3 -3 L-3 3" />
                            </g>
                          )}
                        </g>
                      ))}
                      <line x1={250} y1={10} x2={250} y2={138} className="izcl-gate" />
                    </svg>
                    <div className="izcl-legend">
                      <span className="ok">
                        <i />
                        Authorized
                      </span>
                      <span className="no">
                        <i />
                        Blocked
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="izcl-base" aria-hidden="true">
            <div className="izcl-deck">
              <span className="izcl-keys" />
              <span className="izcl-pad" />
            </div>
            <div className="izcl-lip" />
          </div>
        </div>

        {/* posture, ticking under the machine */}
        <div className="izcl-posture" aria-hidden="true">
          <span>Real-time device posture</span>
          <svg viewBox="0 0 220 26" preserveAspectRatio="xMidYMid meet">
            <path
              d="M2 14 h44 l7 -9 7 9 h30 l6 -6 6 6 h42 l7 -10 7 10 h50"
              className="izcl-posture-w"
            />
            <circle cx={212} cy={14} r={3.5} className="izcl-posture-d" />
          </svg>
        </div>
      </div>

      {/* ---------------- the two estates, wired out ---------------- */}
      <div className="izcl-col izcl-col--out">
        <div className="izcl-stack izcl-stack--ok">
          <span className="izcl-kick">
            Your applications<i aria-hidden="true">_</i>
          </span>
          <span className="izcl-lockchip is-ok" aria-hidden="true">
            <Lock size={10} weight="fill" />
          </span>
          <ul>
            {APPS.map((a) => (
              <li key={a.name}>
                {a.logo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={`/logos/integrations/${a.logo}.svg`} alt="" decoding="async" />
                ) : (
                  a.Icon && <a.Icon size={14} weight="regular" aria-hidden="true" />
                )}
                <b>{a.name}</b>
                <svg viewBox="0 0 16 16" className="izcl-ok" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M5 8.2 l2 2 4-4.5" />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        <div className="izcl-stack izcl-stack--no">
          <span className="izcl-kick">
            Not reachable<i aria-hidden="true">_</i>
          </span>
          <span className="izcl-lockchip is-no" aria-hidden="true">
            <Lock size={10} weight="fill" />
          </span>
          <ul>
            {HIDDEN.map((h) => (
              <li key={h.name}>
                <h.Icon size={14} weight="regular" aria-hidden="true" />
                <b>{h.name}</b>
                <svg viewBox="0 0 16 16" className="izcl-no" aria-hidden="true">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M5.2 5.2 l5.6 5.6 M10.8 5.2 l-5.6 5.6" />
                </svg>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
