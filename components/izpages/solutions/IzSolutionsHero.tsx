"use client";

import { useEffect, useRef, useState } from "react";
import {
  User, House, UsersThree, ShieldStar, Laptop, IdentificationBadge, Buildings,
  Package, Database, Cloud, SquaresFour, Code, Folder, HardDrives,
  ShieldCheck, ArrowRight, type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   00 · Solutions hero — the fourteen-point map.

   The argument the page has to make in one picture: fourteen
   different-sounding problems are one decision. So the composition
   is radial rather than a list — WHO is asking down the left, WHAT
   they are reaching for down the right, and the platform as the
   single point every route passes through.

   THREE THINGS KEEP IT OUT OF FLOWCHART TERRITORY

   1. The hub is an object, not a node. It is drawn as an isometric
      platter — contact shadow, rim, lit face — so the diagram has a
      ground plane and a light source. Everything else reads as
      lying on that plane.
   2. Routes are elbowed, not radial. Each one leaves the platter,
      runs level, breaks once on a 45-degree diagonal, then runs
      level into its card. A fan of straight rays is a flowchart; a
      consistent diagonal is a drawn perspective.
   3. One card per column is live at a time and the pair advances on
      a loop, so the picture is doing something rather than sitting
      there. Desktop only, paused off-screen and under
      prefers-reduced-motion.

   GEOMETRY CONTRACT
   The plate is aspect-locked to VB_W x VB_H and the SVG uses that
   same viewBox with the DEFAULT preserveAspectRatio. Cards (placed
   in %) and routes (drawn in viewBox units) therefore share one
   coordinate space and cannot drift apart. Because the aspect is
   locked, ONE viewBox unit is 0.1cqw on BOTH axes — which is why
   the hub's DOM size below can be written in cqw and still land
   exactly on the ellipse the routes are aimed at. Do NOT switch the
   SVG to preserveAspectRatio="none": it lets the plate stretch and
   skews the dashes and arrowheads with it.

   Every route is DERIVED from its card's row. Move a row and its
   route follows.
   ============================================================ */

const VB_W = 1000;
const VB_H = 740;

const ROWS = 7;
const ROW_TOP = 52;
const ROW_STEP = 88;
/** x where the left column's cards END and the right column's BEGIN */
const LEFT_EDGE = 286;
const RIGHT_EDGE = 714;

const HUB_CX = VB_W / 2;
const HUB_CY = ROW_TOP + ((ROWS - 1) * ROW_STEP) / 2;
/** the platter, flattened to a ~0.52 ratio — the scene's fixed eye level */
const HUB_RX = 120;
const HUB_RY = 63;

/* Both level segments are FIXED lengths, and the diagonal between them
   takes whatever angle the row needs.

   The first pass fixed the diagonal at 45° instead and solved for the
   runs — which cannot work here: there are only ~110 units of horizontal
   gap between the platter's edge and a card column, against a vertical
   spread of ±264. Every run collapsed to its floor and the "45°" came
   out near-vertical anyway. Holding the runs constant instead puts every
   elbow on a tidy arc just off the platter and lets the diagonals fan,
   which is the thing that actually reads as drawn depth. */
/** level run out of the platter before the route turns */
const RUN = 42;
/** level run into the card, so the arrow arrives square instead of stabbing */
const STUB = 30;

const pc = (n: number, total: number) => `${(n / total) * 100}%`;
const rowY = (i: number) => ROW_TOP + i * ROW_STEP;

type Item = { n: number; Icon: Icon; a: string; b: string };

const WHO: Item[] = [
  { n: 1, Icon: User, a: "Remote", b: "Workforce" },
  { n: 2, Icon: House, a: "Hybrid", b: "Employees" },
  { n: 3, Icon: UsersThree, a: "Third-Party", b: "Access" },
  { n: 4, Icon: ShieldStar, a: "Privileged", b: "Access" },
  { n: 5, Icon: Laptop, a: "BYOD &", b: "Personal Devices" },
  { n: 6, Icon: IdentificationBadge, a: "Contractors", b: "& Vendors" },
  { n: 7, Icon: Buildings, a: "Branch Office", b: "Users" },
];

const WHAT: Item[] = [
  { n: 8, Icon: Package, a: "Legacy", b: "Applications" },
  { n: 9, Icon: Database, a: "Databases", b: "& Servers" },
  { n: 10, Icon: Cloud, a: "Cloud", b: "Applications" },
  { n: 11, Icon: SquaresFour, a: "SaaS", b: "Applications" },
  { n: 12, Icon: Code, a: "Internal", b: "Applications" },
  { n: 13, Icon: Folder, a: "File Services", b: "& Storage" },
  { n: 14, Icon: HardDrives, a: "Network Devices", b: "& Infrastructure" },
];

/** Where a route leaves the platter: fanned across the ellipse's arc so
 *  the seven do not all pour out of one point. */
function port(i: number, side: -1 | 1) {
  const t = (i - (ROWS - 1) / 2) / ((ROWS - 1) / 2); // -1 .. 1
  const spread = (42 * Math.PI) / 180;
  const base = side === -1 ? Math.PI : 0;
  const a = base + t * spread * side;
  return { x: HUB_CX + HUB_RX * Math.cos(a), y: HUB_CY + HUB_RY * Math.sin(a) };
}

/** Corner-rounded polyline. Straight joins read as circuitry; a small
 *  consistent radius reads as a drawn route. */
function rounded(pts: [number, number][], r: number) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const d1 = Math.hypot(cx - px, cy - py) || 1;
    const d2 = Math.hypot(nx - cx, ny - cy) || 1;
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const s = [cx + ((px - cx) / d1) * rr, cy + ((py - cy) / d1) * rr];
    const e = [cx + ((nx - cx) / d2) * rr, cy + ((ny - cy) / d2) * rr];
    d += ` L ${s[0].toFixed(1)} ${s[1].toFixed(1)} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
  return d;
}

/** platter -> level run -> diagonal -> level stub -> card */
function route(i: number, side: -1 | 1) {
  const p = port(i, side);
  const ax = side === -1 ? LEFT_EDGE : RIGHT_EDGE;
  const ay = rowY(i);
  const x1 = p.x + side * RUN;
  const x2 = ax - side * STUB;
  const pts: [number, number][] = [
    [p.x, p.y],
    [x1, p.y],
    [x2, ay],
    [ax, ay],
  ];
  /* The middle row's "diagonal" is a straight continuation, so a corner
     radius there would round nothing — `rounded` already clamps to half
     the shorter segment, which keeps that case honest. */
  return rounded(pts, 16);
}

/** the verdict hangs straight off the bottom of the platter */
function verdictRoute() {
  return rounded(
    [
      [HUB_CX, HUB_CY + HUB_RY],
      [HUB_CX, VB_H - 112],
    ],
    0
  );
}

function Card({ it, side, live }: { it: Item; side: "l" | "r"; live: boolean }) {
  const { Icon: I } = it;
  return (
    <span
      className={`izsh-card izsh-${side}${live ? " is-live" : ""}`}
      style={{ top: pc(rowY(side === "l" ? it.n - 1 : it.n - 8), VB_H) }}
    >
      <span className="izsh-ic" aria-hidden="true">
        <I weight="regular" />
      </span>
      <span className="izsh-n" aria-hidden="true">
        {it.n}
      </span>
      <span className="izsh-lbl">
        {it.a}
        <br />
        {it.b}
      </span>
    </span>
  );
}

const CYCLE_MS = 2200;

export function IzSolutionsHero() {
  /* One pair lit at a time. The right column is offset by three so the
     two sides never march in lockstep — a synchronised pair reads as a
     single row highlight rather than as two independent things meeting
     in the middle. */
  const [tick, setTick] = useState(0);
  /* Gates the cue on the loop ACTUALLY running. Deriving the lit pair from
     `tick` alone lights cards 1 and 4 in the server HTML — and they then
     stay lit for every visitor the loop never starts for: no JS, reduced
     motion, and every phone. A permanent highlight on two of fourteen
     reads as a claim about those two. */
  const [running, setRunning] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 781px)");

    let id: number | undefined;
    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
      setRunning(false);
    };
    const start = () => {
      if (id !== undefined || !motionOk || !wide.matches) return;
      setRunning(true);
      id = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    };

    /* Off-screen the loop is pure battery cost, and a visitor arriving
       mid-cycle has missed nothing they needed. */
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((es) => (es[0]?.isIntersecting ? start() : stop()), { threshold: 0.25 });
      io.observe(el);
    } else {
      start();
    }

    const onWide = () => {
      stop();
      start();
    };
    wide.addEventListener?.("change", onWide);

    return () => {
      stop();
      io?.disconnect();
      wide.removeEventListener?.("change", onWide);
    };
  }, []);

  /* -1 lights nothing — the resting state is all fourteen equal. */
  const liveL = running ? tick % ROWS : -1;
  const liveR = running ? (tick + 3) % ROWS : -1;

  return (
    <section className="izsh iz-railed">
      <div className="iz-wrap izsh-cols">
        {/* ---------- left: the claim ---------- */}
        <div className="izsh-copy">
          <span className="izsh-eyebrow">
            solutions<i aria-hidden="true">_</i>
          </span>

          <h1 className="izsh-h1">
            Same platform. <em>Fourteen</em> access problems.
          </h1>

          <p className="izsh-sub">
            Every one of these is the same decision — who, on what device, from where, to which resource. What changes
            is who&apos;s asking and what they&apos;re reaching for.
          </p>

          {/* `.iz-btn`, the shared chassis every other page hero uses —
              not the local `.izsh-btn` this hero had, which is what made
              these the only square CTAs on the site. */}
          <div className="izsh-ctas">
            <a className="iz-btn iz-btn-pri" href="/book-a-demo">
              Book a demo
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
            <a className="iz-btn iz-btn-ghost" href="/platform">
              See the platform
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ---------- right: the map ---------- */}
        <div
          className="izsh-plate"
          ref={rootRef}
          style={
            {
              /* the card columns are positioned from the SAME constants the
                 routes are aimed at */
              ["--l-edge" as string]: pc(VB_W - LEFT_EDGE, VB_W),
              ["--r-edge" as string]: pc(RIGHT_EDGE, VB_W),
            } as React.CSSProperties
          }
        >
          <svg className="izsh-wires" viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden="true">
            <defs>
              <marker
                id="izsh-arrow"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="5.5"
                markerHeight="5.5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 7 5 L 0 8.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            {WHO.map((it, i) => (
              <path
                key={it.n}
                className={`izsh-wire${liveL === i ? " is-live" : ""}`}
                d={route(i, -1)}
                markerEnd="url(#izsh-arrow)"
              />
            ))}
            {WHAT.map((it, i) => (
              <path
                key={it.n}
                className={`izsh-wire${liveR === i ? " is-live" : ""}`}
                d={route(i, 1)}
                markerEnd="url(#izsh-arrow)"
              />
            ))}
            <path className="izsh-wire" d={verdictRoute()} markerEnd="url(#izsh-arrow)" />
          </svg>

          {WHO.map((it, i) => (
            <Card key={it.n} it={it} side="l" live={liveL === i} />
          ))}
          {WHAT.map((it, i) => (
            <Card key={it.n} it={it} side="r" live={liveR === i} />
          ))}

          {/* ---------- the hub, as an object on a ground plane ----------
              Four stacked ellipses rather than a 3D transform: the scene
              only ever needs one fixed eye level, and flat ellipses cannot
              be flattened further by an ancestor's containment or lose
              their rendering to a stray stacking context. */}
          <span className="izsh-hub" style={{ top: pc(HUB_CY, VB_H) }}>
            <span className="izsh-plinth" aria-hidden="true">
              <i className="izsh-cast" />
              <i className="izsh-rim" />
              <i className="izsh-face" />
              <i className="izsh-halo" />
              <span className="izsh-mark">
                <LogoMark size={200} />
              </span>
            </span>
            <b>
              InstaSafe
              <br />
              ZTNA Platform
            </b>
          </span>

          <span className="izsh-verdict">
            <ShieldCheck weight="regular" aria-hidden="true" />
            <span>
              <b>Same decision.</b>
              Verified. Authorized.
              <br />
              Least Privilege. Always.
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
