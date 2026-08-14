"use client";

import {
  Bell,
  ChartLineUp,
  Cube,
  Desktop,
  Eye,
  Faders,
  FileText,
  Gear,
  Globe,
  Lock,
  MapPin,
  Monitor,
  ShieldCheck,
  SquaresFour,
  Terminal,
  User,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   IzPlatformHero — the console hero for /platform.

   ▸ WHY A CONSOLE, WHEN THE SITE ALREADY HAS SEVERAL ◂
   It is a fair question and the honest answer is in two parts.

   Within this page it is not a repeat: the platform hero was the
   design-canvas (00am), and the only other console-shaped things here
   are the trust engine and a laptop in the outcomes. Across the site
   it IS the fourth full dashboard, after the SSO portal, the ZTAA
   use-case portal and the MFA applications list.

   What earns it a place anyway is that neither of the two things it
   is built around exists anywhere else:

     THE MAP. No other illustration on this site is geographic. Access
     is a thing that happens FROM somewhere TO somewhere, and every
     other drawing has said that with boxes.

     THE REACHABILITY SPLIT. Two panels outside the console — what
     this person's apps resolve to, and what simply does not answer.
     That is the whole ZTNA claim, and stating it as two lists rather
     than a sentence is the one thing a hero can do that a paragraph
     cannot.

   ▸ EVERYTHING IS DOM AND CSS ◂
   No images, no canvas. The map is a dot grid generated from a coarse
   land mask, the flow curves are one small SVG, and the rest is
   markup — so it stays crisp at any zoom, flips with the theme, and
   costs nothing to load on a page whose LCP this is.
   ============================================================ */

/* A 60 x 23 land mask: one column per 6° of longitude, one row per
   ~5° of latitude from about 75N down to 55S. Deliberately coarse —
   at this size a dot grid reads as "the world" and an accurate
   coastline reads as noise. */
const WORLD = [
  "....................####....................................",
  "..........########..#####.........####......................",
  ".......###############...........#####.####################.",
  "......################...........######.###################.",
  "......###############..........########.####################",
  ".......#############...........#######..###################.",
  "........###########.............#####...##################..",
  ".........#########..............####....#################...",
  "..........#######................###....###.####.#####......",
  "............####.................####...####..###..####.....",
  ".............###.................#####..####...##...##......",
  "..............####...............#####...###....#....#......",
  "...............#####.............#####...##.....##..........",
  "................#####............#####..........##..........",
  "................#####............####...........#...........",
  ".................####............####.................####..",
  ".................####............###.................######.",
  ".................####............###.................######.",
  "..................###.............##.................#####..",
  "..................###..............#..................###...",
  "..................##........................................",
  "..................##........................................",
  "...................#........................................",
];

const COLS = 60;
const ROWS = WORLD.length;

function WorldMap() {
  const dots: React.JSX.Element[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (WORLD[y][x] !== "#") continue;
      dots.push(<circle key={`${x}-${y}`} cx={x * 10 + 5} cy={y * 10 + 5} r={2.6} />);
    }
  }
  return (
    <svg className="iph-map" viewBox={`0 0 ${COLS * 10} ${ROWS * 10}`} aria-hidden="true">
      <g className="iph-land">{dots}</g>
    </svg>
  );
}

/* The flow curves. Four routes leave the identity column on the left
   and arrive at an application on the right; the two that are denied
   stop at the gate rather than reaching anything, which is the point
   of drawing them at all. */
const FLOWS = [
  { d: "M18 26 C 120 20, 300 12, 392 26", tone: "ok" },
  { d: "M18 62 C 120 60, 300 52, 392 62", tone: "ok" },
  { d: "M18 98 C 120 96, 300 104, 392 98", tone: "no" },
  { d: "M18 134 C 120 140, 300 148, 392 134", tone: "no" },
];

const RAIL: Icon[] = [SquaresFour, User, ShieldCheck, Monitor, MapPin, ChartLineUp, FileText, Gear];

const KPIS = [
  { k: "Users", v: "1,248", Ic: UsersThree },
  { k: "Applications", v: "86", Ic: SquaresFour },
  { k: "Active sessions", v: "312", Ic: ChartLineUp },
  { k: "Blocked attempts", v: "24", Ic: ShieldCheck },
];

const ACTIVITY = [
  { t: "09:42:17", who: "arun.k@instasafe.com", app: "SAP (Finance Portal)", ok: true },
  { t: "09:42:16", who: "priya.m@instasafe.com", app: "reports-db", ok: true },
  { t: "09:42:15", who: "contractor-07@acme.in", app: "finance-rdp", ok: false },
  { t: "09:42:14", who: "build-svc@acme.in", app: "code-server", ok: true },
];

const REACHABLE = [
  { name: "AWS Console", logo: "aws.svg" },
  { name: "SAP (Finance Portal)", logo: "sap.svg" },
  { name: "GitHub", logo: "github.svg" },
  { name: "Jira", logo: "jira.svg" },
  { name: "Internal apps", logo: null, Ic: SquaresFour },
];

const UNREACHABLE = [
  { name: "RDP", Ic: Desktop },
  { name: "Databases", Ic: Cube },
  { name: "File shares", Ic: FileText },
  { name: "Other servers", Ic: Terminal },
];

const PILLARS = [
  { Ic: ShieldCheck, k: "Verify every layer", v: "Identity, device, network and application verified on every request." },
  { Ic: Faders, k: "One policy engine", v: "Consistent access decisions across every user, app and location." },
  { Ic: Cube, k: "One agent", v: "Lightweight agent for posture, tunnel and secure access — everywhere." },
  { Ic: Terminal, k: "One console", v: "See everything. Control everything. Prove everything." },
  { Ic: Lock, k: "Built for zero trust", v: "No inbound access. No lateral movement. No unnecessary exposure." },
];

const BULLETS = [
  { Ic: ShieldCheck, a: "Zero trust", b: "by design" },
  { Ic: Lock, a: "No inbound", b: "exposure" },
  { Ic: Faders, a: "Least privilege", b: "by default" },
  { Ic: Eye, a: "Full visibility", b: "and audit" },
];

export function IzPlatformHero() {
  return (
    <section className="iph iz-railed">
      <span className="iz-cross iz-cross--tl" aria-hidden="true" />
      <span className="iz-cross iz-cross--tr" aria-hidden="true" />
      <span className="iz-cross iz-cross--bl" aria-hidden="true" />
      <span className="iz-cross iz-cross--br" aria-hidden="true" />

      <div className="iz-wrap">
        <div className="iph-grid">
          {/* ---------------- left: the claim ---------------- */}
          <div className="iph-copy">
            <span className="iph-ey">
              <i aria-hidden="true">
                <LogoMark size={17} />
              </i>
              InstaSafe ZTNA platform
            </span>

            <h1 className="iph-h1">
              Access control that works <em>the way your network actually does</em>.
            </h1>

            <p className="iph-lead">
              Identity, device, network and application — every layer verified on every request. One console, one
              agent, one policy engine.
            </p>

            <div className="iph-ctas">
              <a className="iph-btn is-pri" href="/book-a-demo">
                Book a demo
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="iph-btn" href="#what">
                Explore the platform
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </a>
            </div>

            <ul className="iph-bullets">
              {BULLETS.map((b) => (
                <li key={b.a}>
                  <b.Ic weight="regular" aria-hidden="true" />
                  <span>
                    {b.a}
                    <em>{b.b}</em>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------- right: the console ---------------- */}
          <div className="iph-stage" aria-hidden="true">
            <div className="iph-win">
              <div className="iph-top">
                <span className="iph-brand">
                  <LogoMark size={19} />
                  <b>InstaSafe</b>
                </span>
                <span className="iph-bell">
                  <Bell weight="fill" />
                  <i>3</i>
                </span>
                <span className="iph-user">
                  <i>AR</i>
                  Arun R.
                </span>
              </div>

              <div className="iph-body">
                <div className="iph-rail">
                  {RAIL.map((Ic, i) => (
                    <span className={i === 0 ? "on" : ""} key={i}>
                      <Ic weight={i === 0 ? "fill" : "regular"} />
                    </span>
                  ))}
                </div>

                <div className="iph-main">
                  <span className="iph-lbl">Overview</span>
                  <div className="iph-kpis">
                    {KPIS.map((k) => (
                      <span className="iph-kpi" key={k.k}>
                        <em>{k.k}</em>
                        <b>
                          {k.v}
                          <k.Ic weight="regular" />
                        </b>
                      </span>
                    ))}
                  </div>

                  <span className="iph-lbl">
                    Access flow <i>(live)</i>
                  </span>
                  <div className="iph-flowbox">
                    {/* the map, the curves and the two end columns share
                        one positioned box; the legend sits BELOW it in
                        normal flow rather than floating over the map,
                        which is what made it collide with the dots. */}
                    <div className="iph-mapwrap">
                    <WorldMap />
                    <svg className="iph-flow" viewBox="0 0 410 160" preserveAspectRatio="none">
                      {FLOWS.map((f, i) => (
                        <path className={`iph-curve is-${f.tone}`} d={f.d} key={i} style={{ ["--i" as string]: i } as React.CSSProperties} />
                      ))}
                    </svg>
                    <span className="iph-ends is-left">
                      {[User, Monitor, MapPin, SquaresFour].map((Ic, i) => (
                        <i key={i}>
                          <Ic weight="regular" />
                        </i>
                      ))}
                    </span>
                    <span className="iph-ends is-right">
                      {[Globe, Desktop, MapPin, SquaresFour].map((Ic, i) => (
                        <i className={i > 1 ? "no" : ""} key={i}>
                          <Ic weight="regular" />
                        </i>
                      ))}
                    </span>
                    </div>
                    <span className="iph-legend">
                      <b className="ok">Authorised</b>
                      <b className="no">Blocked</b>
                    </span>
                  </div>

                  <span className="iph-lbl">Recent activity</span>
                  <div className="iph-acts">
                    {ACTIVITY.map((a) => (
                      <span className="iph-act" key={a.t}>
                        <em>{a.t}</em>
                        <span className="iph-who">{a.who}</span>
                        <svg className="iph-arw" viewBox="0 0 24 24">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                        <span className="iph-app">{a.app}</span>
                        <b className={a.ok ? "ok" : "no"}>{a.ok ? "Allowed" : "Denied"}</b>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ---- the reachability split, outside the console ---- */}
            <div className="iph-side">
              <div className="iph-panel">
                <span className="iph-panel-h">
                  <i className="dot ok" />
                  Your applications
                </span>
                {REACHABLE.map((r) => (
                  <span className="iph-row" key={r.name}>
                    <i className="iph-logo">
                      {r.logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={`/logos/integrations/${r.logo}`} alt="" loading="lazy" decoding="async" />
                      ) : r.Ic ? (
                        <r.Ic weight="regular" />
                      ) : null}
                    </i>
                    {r.name}
                    <b className="dot ok" />
                  </span>
                ))}
              </div>

              <div className="iph-panel">
                <span className="iph-panel-h">
                  <i className="dot no" />
                  Not reachable
                </span>
                {UNREACHABLE.map((r) => (
                  <span className="iph-row is-off" key={r.name}>
                    <i className="iph-logo">
                      <r.Ic weight="regular" />
                    </i>
                    {r.name}
                    <b className="x">
                      <svg viewBox="0 0 24 24">
                        <path d="M7 7l10 10M17 7L7 17" />
                      </svg>
                    </b>
                  </span>
                ))}
              </div>
            </div>

            {/* the two gates the dashed connectors pass through */}
            <span className="iph-node is-ok">
              <ShieldCheck weight="fill" />
            </span>
            <span className="iph-node is-no">
              <Lock weight="fill" />
            </span>
          </div>
        </div>

        {/* ---------------- the pillar strip ---------------- */}
        <ul className="iph-strip">
          {PILLARS.map((p) => (
            <li key={p.k}>
              <span className="iph-strip-ic" aria-hidden="true">
                <p.Ic weight="regular" />
              </span>
              <b>{p.k}</b>
              <em>{p.v}</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
