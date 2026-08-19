"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { Magnetic } from "@/components/v2/Magnetic";

/* ============================================================
   EndpointHero — /platform/endpoint-controls

   THE WINDOW IS THE LCP ELEMENT, so the whole scene is authored
   backwards from that:

   1. WHAT THE SERVER SENDS IS THE FINISHED SCENE. The tunnel is up,
      the copy attempt has already been refused (stamp on the local
      clipboard, selection residue on the two rows it came from), the
      watermark is on, and three real audit lines are already written.
      Nothing in the window is opacity-0, translated, typed in or
      mounted late. A visitor who never gets JS — or gets it three
      seconds later — sees the same argument.

   2. THE FIRST CLIENT RENDER EQUALS THE SERVER RENDER. Every
      timestamp is a literal string; there is no Date, no random, no
      measurement during render. All of that lives in effects.

   3. THE LOOP ONLY MUTATES OVERLAYS. Chips morph, the cursor moves,
      the watermark brightens, rows light, a dim layer drops, log
      lines push in from below. The window, the toolbar, the table and
      the log box are never unmounted, cleared or resized — every box
      the loop touches is already at its final height in the static
      markup, so the animation cannot shift the layout.

      THE SCENE IS THREE CONTAINERS, not one console, because it is
      making three different claims and a single frame around them
      made it read as one dashboard:

        1  `.ep-strip`  — the network the session runs across: the
                          managed device, everything the tunnel does
                          not reach, and the one app it does.
        2  `.ep-win`    — the application, inside `.ep-winbox` so the
                          actor pills still hang off ITS top edge.
        3  `.ep-log`    — what the platform wrote down while it ran.

      All three sit in `.ep-stack`, which carries `is-armed` — the
      class the loop's decorative animations are gated on. It used to
      live on `.ep-win`; when the strip and the log moved out of the
      window, every `.ep-win.is-armed …` selector would have stopped
      matching them, so the flag moved up with them.

      Every one of the three has an explicit height in CSS and none of
      them is conditionally rendered, so the split costs nothing in
      CLS — the stack is the same shape before and after hydration.

   4. IT ONLY RUNS WHERE IT EARNS ITS KEEP. Fine pointer, ≥920px, no
      reduced-motion preference, and only after requestIdleCallback.
      On a phone the rail is a stacked list of the six controls and a
      tap swaps the window straight to that control's resolved state —
      no attract loop, no cursor, no autoplay.

   Ported from prototypes/endpoint-controls-hero-v2.html. Two
   deliberate departures from it: the window is painted from theme
   tokens instead of a hardcoded inverted palette (so it is a white
   console on paper and a dark console on dark), and the prototype's
   "the document types itself in" opening beat is gone — it violated
   rule 1. Chapter one is Alen applying the policy instead.

   5. THE STORY HAS TWO NAMED PEOPLE. Alen (IT Admin) turns the six
      controls on in chapter one and leaves. Sophia (Finance) is the
      one inside the governed session for the rest of the loop, and
      her pill's status chip is the running commentary — in-progress
      while a control is being decided, resolved once it has been.
      Both pills are ABSOLUTELY POSITIONED SIBLINGS of the window, so
      they cannot move a pixel of it (rule 3 still holds); Sophia's is
      server-rendered visible and resolved (rule 1 still holds); Alen's
      is server-rendered hidden, which is allowed only because he is a
      42px decorative overlay and not the LCP element.
   ============================================================ */

/* ---------- the six controls. SIX. Not eight, and never
     "session recording" — that is a different product surface. ---------- */
const CONTROLS = [
  { name: "Clipboard controls", idle: "monitoring" },
  { name: "Watermark protection", idle: "standby" },
  { name: "Network filter", idle: "24 rules" },
  { name: "App filter", idle: "standby" },
  { name: "Chrome control", idle: "standby" },
  { name: "Inactivity timeout", idle: "15:00" },
] as const;

/* ---------- the document. Real rows, real invoice numbers, real
     money — a skeleton bar would let the reader off the hook about
     what is actually being copied out of the session. ---------- */
const ROWS: [vendor: string, invoice: string, amount: string, due: string, status: string][] = [
  ["Meridian Components", "INV-4471", "₹18,40,000", "12 Sep", "Scheduled"],
  ["Kestrel Logistics", "INV-4468", "₹6,72,500", "15 Sep", "Approved"],
  ["Novapack Industries", "INV-4459", "₹11,05,000", "19 Sep", "Scheduled"],
  ["Arcus IT Services", "INV-4454", "₹3,90,000", "22 Sep", "On hold"],
  ["Trident Freight", "INV-4449", "₹8,26,000", "26 Sep", "Approved"],
  ["Halcyon Chemicals", "INV-4442", "₹5,18,750", "29 Sep", "Scheduled"],
];
/** the two rows the refused copy came out of */
const SELECTED = [1, 2];

/* ---------- the audit log. Six events; three of them are already on
     the page before a single byte of JS runs. ---------- */
type Pair = [key: string, value: string, tone?: "deny"];
type LogLine = { t: string; kw: string; pairs: Pair[] };

const LOG: Record<string, LogLine> = {
  /* Alen's line. NOTE the timestamp: it is 10:42:16, AFTER the three
     lines the server already wrote, because the log box is a rolling
     window of the last three events and an out-of-order stamp is the
     first thing a reader who actually reads the log will catch.
     Every reachable three-line window stays monotonic:
       base       tunnel 07 · clip 11 · mark 14
       + policy   clip 11 · mark 14 · policy 16
       + net      mark 14 · policy 16 · net 19
       + chrome   policy 16 · net 19 · chrome 23
       + idle     net 19 · chrome 23 · idle 10:57:26          */
  policy: {
    t: "10:42:16",
    kw: "POLICY",
    pairs: [
      ["by", "alen.r"],
      ["controls", "6"],
      ["target", "grp-finance"],
    ],
  },
  tunnel: {
    t: "10:42:07",
    kw: "TUNNEL",
    pairs: [
      ["app", "sap-erp"],
      ["scope", "1"],
      ["net", "unreachable"],
    ],
  },
  clip: {
    t: "10:42:11",
    kw: "CLIP",
    pairs: [
      ["direction", "out"],
      ["action", "blocked", "deny"],
    ],
  },
  mark: {
    t: "10:42:14",
    kw: "MARK",
    pairs: [
      ["overlay", "on"],
      ["bound", "sophia.s"],
    ],
  },
  net: {
    t: "10:42:19",
    kw: "NET",
    pairs: [
      ["dst", "drive-personal.com"],
      ["action", "denied", "deny"],
    ],
  },
  chrome: {
    t: "10:42:23",
    kw: "CHROME",
    pairs: [
      ["download", "blocked", "deny"],
      ["print", "blocked", "deny"],
    ],
  },
  idle: {
    t: "10:57:26",
    kw: "IDLE",
    pairs: [
      ["15m", ""],
      ["session", "closed", "deny"],
    ],
  },
};

/* watermark tiles — deterministic positions, so server and client
   agree to the pixel */
const WM_TEXT = "sophia.s@ · 8F2A · 10:42 IST";
const WM_TILES = Array.from({ length: 40 }, (_, i) => ({
  left: (i % 5) * 138 - 44,
  top: Math.floor(i / 5) * 54 + 2,
}));

const EASE_ARRIVE = "cubic-bezier(0.34,1.24,0.5,1)";
const CLOCK_BASE = 10 * 3600 + 42 * 60 + 14; /* 10:42:14 — the last written line */

/* ============================================================
   THE TWO ACTORS

   THE PORTRAITS ARE THE REAL ONES. Both come out of /public/people at
   the 256px crop the rest of the site already ships (see IZ_USERS in
   components/home2/izUsers.tsx) and both are drawn into the same 30px
   disc, so the pill geometry is unchanged from the placeholder era —
   the box, the ring and the radius all live in CSS.

   Sophia's pill is server-rendered VISIBLE, so her file is in the
   initial HTML. It is a 7.7KB webp at a 30px box; it is marked
   low-priority so it can never queue in front of the window, which is
   the LCP element. Alen's ships hidden and is fetched the same way.

   The names and roles come from the registry: Sophia S is the finance
   person there too, which is why the handle everywhere in this scene
   is `sophia.s` and not a hero-only invention.
   ============================================================ */
const ACTORS = {
  alen: { name: "Alen", role: "IT Admin", img: "/people/alen-joseph-256.webp" },
  sophia: { name: "Sophia", role: "Finance Systems Lead", img: "/people/sophia-s-256.webp" },
} as const;
type ActorId = keyof typeof ACTORS;

type Actor = {
  on: boolean;
  /** chip text — rendered uppercase by CSS */
  status: string;
  /** work = shimmer sweep + ellipsis; done/deny = solid resolved chip */
  mode: "work" | "done" | "deny";
  /** bump to replay the stamp pop on the chip (keys the element) */
  beat: number;
};

/* the right-click menu Sophia's copy attempt goes through. The three
   data-egress items are policy-disabled; Refresh is not, because a
   menu where everything is greyed out reads as a broken app rather
   than as a governed one. */
const MENU: { label: string; lock?: boolean; sep?: boolean }[] = [
  { label: "Copy", lock: true },
  { label: "Copy with headers", lock: true },
  { label: "Export selection…", lock: true },
  { label: "sep", sep: true },
  { label: "Refresh" },
];
/** index into MENU of the item the cursor goes for */
const MENU_TARGET = 0;
/* the menu's box. MUST match the `width` on `.ep-menu`. It is only
   ever used to clamp the open position inside the stage — nothing is
   measured, and the clamp is deliberately generous on height. */
const MENU_W = 196;
const MENU_H = 136;
const MENU_ROW = 23; /* item height + gap, for aiming the cursor */

type NetMark = "off" | "on" | "deny" | "allow";

type Scene = {
  live: number | null;
  chips: string[];
  deny: boolean[];
  done: boolean[];
  sel: "residue" | "arm" | "sweep";
  stamp: number;
  shake: boolean;
  wm: number;
  shimmer: number;
  netOpen: boolean;
  net: [NetMark, NetMark];
  netUrl: [string, string];
  chrome: "off" | "try" | "denied";
  ring: "off" | "arm" | "run";
  dim: boolean;
  payoff: boolean;
  conn: "live" | "surge" | "closed";
  wall: number;
  rewind: number;
  log: string[];
  lit: string | null;
  fresh: string | null;
  clock: string;
  score: [number, number];
  alen: Actor;
  sophia: Actor;
  /** bump to replay the staggered arm-tick sweep down the rail */
  armtick: number;
};

/* THE SERVER-RENDERED SCENE. Read this as the spec for the static
   HTML: clipboard refused, watermark on, three lines logged. */
const BASE: Scene = {
  live: null,
  chips: ["BLOCKED", "ON", "24 rules", "standby", "standby", "15:00"],
  deny: [true, false, false, false, false, false],
  done: [true, true, false, false, false, false],
  sel: "residue",
  stamp: 0,
  shake: false,
  wm: 0.55,
  shimmer: 0,
  netOpen: false,
  net: ["off", "off"],
  netUrl: ["", ""],
  chrome: "off",
  ring: "off",
  dim: false,
  payoff: false,
  conn: "live",
  wall: 0,
  rewind: 0,
  log: ["tunnel", "clip", "mark"],
  lit: null,
  fresh: null,
  clock: "10:42:14",
  score: [6, 6],
  /* Alen is hidden in the shipped HTML — he is a 42px decorative
     overlay whose whole job is chapter one. Sophia is NOT: her pill
     ships visible and already resolved, so it never animates into
     existence and never has a state the server did not paint. */
  alen: { on: false, status: "applying 6 controls", mode: "work", beat: 0 },
  sophia: { on: true, status: "session governed", mode: "done", beat: 0 },
  armtick: 0,
};

/* A tap on a control (coarse pointer, or any pointer with the loop
   off) jumps the window straight to that control's resolved end
   state — BASE plus the one thing that control does. No timeline,
   no cursor, one opacity crossfade at most. */
/* what Sophia's chip says once each control has resolved. On a phone
   this is the whole of her animation: a tap swaps the chip text and
   its tone, with no shimmer and no stamp (`beat` stays 0, and the pop
   is gated on `armed` anyway). */
const SOPHIA_END: [string, Actor["mode"]][] = [
  ["blocked", "deny"],
  ["screen marked", "done"],
  ["request denied", "deny"],
  ["policy enforced", "done"],
  ["download blocked", "deny"],
  ["session closed", "deny"],
];

function resolvedFor(i: number): Scene {
  const s: Scene = {
    ...BASE,
    chips: [...BASE.chips],
    deny: [...BASE.deny],
    done: [...BASE.done],
    net: [...BASE.net] as [NetMark, NetMark],
    netUrl: [...BASE.netUrl] as [string, string],
    log: [...BASE.log],
    score: [...BASE.score] as [number, number],
    sophia: { on: true, status: SOPHIA_END[i][0], mode: SOPHIA_END[i][1], beat: 0 },
    live: i,
  };
  const set = (text: string, deny: boolean) => {
    s.chips[i] = text;
    s.deny[i] = deny;
    s.done[i] = true;
  };
  switch (i) {
    case 0:
      set("BLOCKED", true);
      break;
    case 1:
      set("ON", false);
      s.wm = 1;
      break;
    case 2:
      set("1 DENIED", true);
      s.netOpen = true;
      s.net = ["deny", "allow"];
      s.netUrl = ["drive-personal.com", "sap-support.com"];
      s.log = ["clip", "mark", "net"];
      break;
    case 3:
      set("ENFORCED", false);
      break;
    case 4:
      set("DOWNLOADS OFF", true);
      s.chrome = "denied";
      s.log = ["clip", "mark", "chrome"];
      break;
    case 5:
      set("CLOSED", true);
      s.dim = true;
      s.conn = "closed";
      s.log = ["clip", "mark", "idle"];
      break;
  }
  return s;
}

/** which chapter a rail pill jumps to; app filter has no scene of its
    own and resolves inside the chrome chapter, as in the prototype */
const PILL_TO_CH = [1, 2, 3, 4, 4, 5];

const hhmmss = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor(s / 60) % 60;
  const x = s % 60;
  return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${x < 10 ? "0" : ""}${x}`;
};

function LogRow({ id, cls }: { id: string; cls: string }) {
  const l = LOG[id];
  return (
    <li className={cls}>
      <span className="t">{l.t}</span>
      {"  "}
      <b>{l.kw}</b>{" "}
      {l.pairs.map(([k, v, tone], i) => (
        <span key={k}>
          {i > 0 ? " " : ""}
          {v === "" ? k : tone === "deny" ? (
            <>
              {k}=<em>{v}</em>
            </>
          ) : (
            `${k}=${v}`
          )}
        </span>
      ))}
    </li>
  );
}

/* ---------- the monday-style actor pill. Absolutely positioned over
     the window's top edge, fixed size, transform-only motion — it can
     never move anything under it. Decorative narrative, so the whole
     thing is aria-hidden; the window's own alt text (`#ep-scene`)
     carries the meaning. ---------- */
function ActorPill({ who, a, armed }: { who: ActorId; a: Actor; armed: boolean }) {
  const p = ACTORS[who];
  return (
    <div className={`ep-ap ep-ap--${who}${a.on ? " on" : ""}`} aria-hidden="true">
      <span className="ep-ap-av">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.img}
          width={30}
          height={30}
          alt=""
          draggable={false}
          decoding="async"
          fetchPriority="low"
        />
      </span>
      <span className="ep-ap-id">
        <b>{p.name}</b>
        <i>{p.role}</i>
      </span>
      {/* keying on the beat is what replays the stamp; `armed` keeps it
          from firing on first paint, exactly like the rail chips */}
      <span
        key={a.beat}
        className={`ep-ap-chip ${a.mode}${armed && a.beat > 0 && a.mode !== "work" ? " pop" : ""}`}
      >
        <span className="ep-ap-t">{a.status}</span>
        {a.mode === "work" ? (
          <i className="ep-ap-ell">
            <b />
            <b />
            <b />
          </i>
        ) : null}
      </span>
    </div>
  );
}

/* ---------- the right-click menu. Mounted always, hidden until its
     beat, positioned from two custom properties so opening it is one
     transform and one opacity — no reflow, nothing measured on the
     way in. ---------- */
function ContextMenu({ m }: { m: { on: boolean; x: number; y: number; hi: number; refuse: boolean } }) {
  return (
    <div
      className={`ep-menu${m.on ? " on" : ""}${m.refuse ? " refuse" : ""}`}
      style={{ "--ep-mx": `${m.x}px`, "--ep-my": `${m.y}px` } as CSSProperties}
      aria-hidden="true"
    >
      {MENU.map((item, i) =>
        item.sep ? (
          <hr key="sep" />
        ) : (
          <span key={item.label} className={`ep-mi${item.lock ? " no" : ""}${m.hi === i ? " hi" : ""}`}>
            {item.lock ? (
              <svg className="ep-mlock" viewBox="0 0 12 12" aria-hidden="true">
                <rect x="2.3" y="5.3" width="7.4" height="5.2" rx="1.2" />
                <path d="M4.1 5.3V3.8a1.9 1.9 0 0 1 3.8 0v1.5" />
              </svg>
            ) : (
              <i className="ep-mlock" aria-hidden="true" />
            )}
            {item.label}
            {item.lock ? <em>policy</em> : null}
          </span>
        )
      )}
    </div>
  );
}

/* ---------- CONTAINER 1 · the connection strip.
     Lifted OUT of the window and given its own panel, because what it
     says is not what the window says: the window is one application
     being used, the strip is the shape of the network around it. Left
     is the managed device the session runs from, middle is everything
     the tunnel does NOT reach, right is the one thing it does.

     Entirely static markup — the only thing the loop touches is the
     `conn` class on the wrapper, which drives the dash march, the
     surge and the drop. Nothing here is a cursor target and nothing
     here is measured, so it has no geometry contract with the stage. */
function ConnStrip({ conn }: { conn: Scene["conn"] }) {
  return (
    <div className={`ep-strip ${conn}`} aria-hidden="true">
      <div className="ep-dev">
        <span className="ep-dev-pic">
          {/* the PNG is the one the posture page already ships; the
              webp beside it is the same square at 192px, which is what
              every modern browser actually downloads (3.5KB against
              91KB). The <img> keeps the png so the markup still names
              the canonical asset. */}
          <picture>
            <source srcSet="/hero/laptop-open-192.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/laptop-open.png"
              width={192}
              height={192}
              alt=""
              draggable={false}
              decoding="async"
              fetchPriority="low"
            />
          </picture>
        </span>
        <span className="ep-dev-id">
          <b>sophia.s@</b>
          <i>managed device</i>
        </span>
      </div>

      <div className="ep-tun">
        <div className="ep-offnet">
          <span className="ep-off">FILE SRV</span>
          <span className="ep-off">10.0.0.0/8</span>
          <span className="ep-off">DB-01</span>
          <span className="ep-unre">unreachable</span>
        </div>
        {/* base + flow are two backgrounds on one 2px rail, so the
            marching dash is a background-position animation on a
            single element rather than an SVG that has to be stretched
            to whatever width the strip lands on */}
        <span className="ep-tunline" />
      </div>

      <div className="ep-appnode">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ep-applogo"
          src="/logos/integrations/sap.svg"
          width={40}
          height={20}
          alt=""
          draggable={false}
          decoding="async"
        />
        <span className="ep-appt">SAP ERP</span>
      </div>
    </div>
  );
}

/* ---------- the toolbar's breadcrumb glyph. A folder, drawn from
     currentColor, so the crumb reads as a place in an application
     rather than as three words in a monospace font. ---------- */
function CrumbIcon() {
  return (
    <svg className="ep-crumb-ic" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1.4 11.2V3.4a.9.9 0 0 1 .9-.9h3l1.4 1.7h5a.9.9 0 0 1 .9.9v6.1a.9.9 0 0 1-.9.9H2.3a.9.9 0 0 1-.9-.9Z" />
      <path d="M1.4 6.1h11.2" />
    </svg>
  );
}

export function EndpointHero() {
  const [scene, setScene] = useState<Scene>(BASE);
  const [armed, setArmed] = useState(false);
  const [cursor, setCursor] = useState({
    on: false,
    x: -60,
    y: 320,
    dur: 700,
    ease: EASE_ARRIVE,
    press: 0,
    flip: false,
  });
  const [wallX, setWallX] = useState(0);
  const [menu, setMenu] = useState({ on: false, x: 0, y: 0, hi: -1, refuse: false });

  const stageRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const selRef = useRef<HTMLTableRowElement>(null);
  const toolRef = useRef<HTMLDivElement>(null);
  const n1Ref = useRef<HTMLDivElement>(null);
  const n2Ref = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const jumpRef = useRef<((ch: number) => void) | null>(null);
  const armedRef = useRef(false);

  /* ---------------- 1. should the loop exist at all ---------------- */
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 920px)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !wide || still) return;

    let live = true;
    const begin = () => {
      if (live) setArmed(true);
    };
    /* the hero must not compete with hydration or with the LCP paint —
       whatever is left of the main thread is what the loop gets */
    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle ? window.requestIdleCallback(begin, { timeout: 1400 }) : window.setTimeout(begin, 200);
    return () => {
      live = false;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  useEffect(() => {
    armedRef.current = armed;
  }, [armed]);

  /* the wall the copy hits is the right edge of the document pane */
  useEffect(() => {
    const measure = () => setWallX((docRef.current?.offsetWidth ?? 1) - 1);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* ---------------- 2. the loop ---------------- */
  useEffect(() => {
    if (!armed) return;

    let timers: number[] = [];
    let chapterT: number | null = null;
    let resumeT: number | null = null;
    let clockT: number | null = null;
    let raf = 0;
    let idx = 0;
    let paused = false;
    let seconds = 0;

    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const clearAll = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
      if (chapterT !== null) window.clearTimeout(chapterT);
      chapterT = null;
      cancelAnimationFrame(raf);
    };
    const set = (p: Partial<Scene>) => setScene((s) => ({ ...s, ...p }));

    const point = (el: HTMLElement | null, fx: number, fy: number) => {
      const stage = stageRef.current;
      if (!stage || !el) return null;
      const sb = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return { x: r.left - sb.left + r.width * fx, y: r.top - sb.top + r.height * fy };
    };
    const moveTo = (x: number, y: number, dur: number, ease = EASE_ARRIVE) =>
      setCursor((c) => ({
        ...c,
        x: Math.round(x),
        y: Math.round(y),
        dur,
        ease,
        flip: x > (stageRef.current?.offsetWidth ?? 9999) - 90,
      }));
    const moveOver = (el: HTMLElement | null, fx: number, fy: number, dur: number, ease?: string) => {
      const p = point(el, fx, fy);
      if (p) moveTo(p.x, p.y, dur, ease);
    };
    const press = () => setCursor((c) => ({ ...c, press: c.press + 1 }));

    /* a chip morph + a done tick, and optionally a line of evidence */
    const enforce = (i: number, text: string, deny: boolean, logId?: string) =>
      setScene((s) => {
        const chips = [...s.chips];
        const dny = [...s.deny];
        const done = [...s.done];
        chips[i] = text;
        dny[i] = deny;
        done[i] = true;
        return {
          ...s,
          chips,
          deny: dny,
          done,
          /* the log NEVER grows the box: three lines in, oldest out.
             The filter is not cosmetic — `go(idx)` re-enters the
             CURRENT chapter when the tab comes back, so a chapter
             whose line is already on screen would push a second copy
             of the same id and collide with its own React key. */
          log: logId ? [...s.log.filter((x) => x !== logId), logId].slice(-3) : s.log,
          fresh: logId ?? s.fresh,
          lit: logId ? null : s.lit,
        };
      });
    /* ---- the actors ---- */
    const actor = (who: ActorId, p: Partial<Actor>) =>
      setScene((s) =>
        who === "alen" ? { ...s, alen: { ...s.alen, ...p } } : { ...s, sophia: { ...s.sophia, ...p } }
      );
    /** resolve a pill's chip WITH the stamp pop */
    const settle = (who: ActorId, status: string, mode: Actor["mode"]) =>
      setScene((s) => {
        const next: Actor = { on: true, status, mode, beat: s[who].beat + 1 };
        return who === "alen" ? { ...s, alen: next } : { ...s, sophia: next };
      });
    /** a log line with no chip behind it (Alen's POLICY event) */
    const logOnly = (id: string) =>
      setScene((s) => ({ ...s, log: [...s.log.filter((x) => x !== id), id].slice(-3), fresh: id, lit: null }));

    /* ---- the right-click menu. `mx`/`my` are kept out here so the
       cursor can be aimed at a menu item without reading state. ---- */
    let mx = 0;
    let my = 0;
    /* `hi` is deliberately LEFT ALONE on close: clearing it would
       un-highlight the clicked row halfway through the 170ms fade,
       which reads as the menu changing its mind. `openMenu` resets
       it, and a stale highlight on a hidden menu is invisible. */
    const closeMenu = () => setMenu((m) => (m.on || m.refuse ? { ...m, on: false, refuse: false } : m));
    const openMenu = () => {
      const stage = stageRef.current;
      const p = point(selRef.current, 0.94, 1.9);
      if (!stage || !p) return;
      /* clamp so the menu can never hang out of the stage — it opens
         at the cursor, but the cursor finishes the sweep near the
         right edge of the document pane */
      mx = Math.round(Math.min(Math.max(4, p.x + 2), Math.max(4, stage.offsetWidth - MENU_W - 4)));
      my = Math.round(Math.min(Math.max(4, p.y + 4), Math.max(4, stage.offsetHeight - MENU_H - 4)));
      setMenu({ on: true, x: mx, y: my, hi: -1, refuse: false });
    };

    const chipOnly = (i: number, text: string, deny = false) =>
      setScene((s) => {
        const chips = [...s.chips];
        const dny = [...s.deny];
        chips[i] = text;
        dny[i] = deny;
        return { ...s, chips, deny: dny, live: i };
      });

    /* type a domain into a filter chip, one character at a time */
    const typeUrl = (slot: 0 | 1, text: string, per: number) => {
      for (let n = 1; n <= text.length; n++) {
        at(n * per, () =>
          setScene((s) => {
            const u = [...s.netUrl] as [string, string];
            u[slot] = text.slice(0, n);
            return { ...s, netUrl: u };
          })
        );
      }
    };

    const flyCopy = () => {
      const from = point(selRef.current, 0.86, 0.4);
      const g = ghostRef.current;
      if (!from || !g) return;
      const travel = Math.max(40, (docRef.current?.offsetWidth ?? 400) - 12 - from.x);
      g.animate(
        [
          { transform: `translate3d(${from.x}px,${from.y}px,0) scale(.86)`, opacity: 0 },
          { transform: `translate3d(${from.x + 16}px,${from.y - 8}px,0) scale(1)`, opacity: 1, offset: 0.16 },
          { transform: `translate3d(${from.x + travel}px,${from.y - 18}px,0) scale(1)`, opacity: 1, offset: 0.62 },
          { transform: `translate3d(${from.x + travel - 18}px,${from.y - 8}px,0) scale(.97)`, opacity: 1, offset: 0.78 },
          { transform: `translate3d(${from.x + travel - 34}px,${from.y + 4}px,0) scale(.86)`, opacity: 0 },
        ],
        { duration: 900, easing: "cubic-bezier(0.16,1,0.3,1)", fill: "forwards" }
      );
      /* the cursor chases its own copy, then recoils off the wall with it */
      at(160, () => moveTo(from.x + travel * 0.72, from.y + 10, 480, "cubic-bezier(0.3,0,0.2,1)"));
      at(660, () => moveTo(from.x + travel * 0.42, from.y + 26, 520));
    };

    const countTo = (to: [number, number], ms: number) => {
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / ms);
        const e = 1 - Math.pow(1 - t, 3);
        set({ score: [Math.round(to[0] * e), Math.round(to[1] * e)] });
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    /* back to the SERVER-RENDERED scene, not to a blank one — the
       loop's floor is the same picture the HTML shipped with */
    const rewind = () =>
      setScene((s) => ({
        ...BASE,
        chips: [...BASE.chips],
        deny: [...BASE.deny],
        done: [...BASE.done],
        net: [...BASE.net] as [NetMark, NetMark],
        netUrl: [...BASE.netUrl] as [string, string],
        log: [...BASE.log],
        score: [...BASE.score] as [number, number],
        rewind: s.rewind + 1,
        clock: s.clock,
      }));

    const CH: { name: string; dur: number; enter: () => void }[] = [
      {
        /* ALEN'S BEAT. The v2 "doc types itself in" opening is gone
           and so is the bare tunnel pulse that replaced it: the loop
           now opens on the admin actually switching the six controls
           on, with the tunnel surge running underneath it.

           Sophia is NOT dismissed at t=0. She holds her shipped,
           resolved pill for the first 1.9s and only steps off once
           Alen's APPLIED has landed — otherwise the very first thing
           a visitor sees the JS do is delete something the server
           had already drawn. It also means the rewind at the end of
           chapter seven, which restores her, has nearly two seconds
           of cover before she leaves again. */
        name: "policy",
        dur: 3200,
        enter() {
          set({ live: null, conn: "surge", lit: null, fresh: null });
          actor("alen", { on: true, status: "applying 6 controls", mode: "work" });
          at(1000, () => set({ conn: "live" }));
          at(1400, () => settle("alen", "applied", "done"));
          /* the six dots tick over in sequence — the rail arming */
          at(1520, () => setScene((s) => ({ ...s, armtick: s.armtick + 1 })));
          at(1660, () => logOnly("policy"));
          at(1900, () => actor("sophia", { on: false }));
          at(2100, () => actor("alen", { on: false }));
          at(2400, () => {
            const stage = stageRef.current;
            if (!stage) return;
            moveTo(stage.offsetWidth * 0.1, stage.offsetHeight * 0.94, 0, "linear");
            setCursor((c) => ({ ...c, on: true }));
            at(60, () => moveOver(selRef.current, 0.06, 0.4, 760));
          });
        },
      },
      {
        /* SOPHIA'S BEAT, and the one the whole page is about. She
           selects two rows, RIGHT-CLICKS, and the menu that opens has
           the three ways out of the session already locked. She
           clicks Copy anyway. */
        name: "clipboard",
        dur: 4800,
        enter() {
          chipOnly(0, "watching…");
          set({ sel: "arm", lit: null, fresh: null });
          actor("sophia", { on: true, status: "in session", mode: "work" });
          setCursor((c) => ({ ...c, on: true }));
          at(40, () => moveOver(selRef.current, 0.05, 0.2, 460));
          /* the sweep: the cursor drags left to right while the band
             grows under it */
          at(400, () => {
            set({ sel: "sweep" });
            moveOver(selRef.current, 0.94, 1.9, 640, "cubic-bezier(0.4,0,0.2,1)");
          });
          at(1120, press); /* the right-click */
          at(1180, openMenu);
          /* down the menu to Copy, and click it anyway */
          at(1460, () => {
            setMenu((m) => ({ ...m, hi: MENU_TARGET }));
            moveTo(mx + 52, my + 14 + MENU_TARGET * MENU_ROW, 400);
          });
          at(1960, press);
          at(2020, () => setMenu((m) => ({ ...m, refuse: true })));
          at(2300, closeMenu);
          /* and only now the copy leaves the row and hits the edge */
          at(2360, flyCopy);
          at(3000, () => setScene((s) => ({ ...s, wall: s.wall + 1, shake: true, stamp: s.stamp + 1 })));
          at(3160, () => {
            enforce(0, "BLOCKED", true);
            settle("sophia", "blocked", "deny");
          });
          at(3180, () => set({ lit: "clip" }));
          at(3460, () => set({ shake: false }));
          at(3880, () => set({ sel: "residue", lit: null }));
        },
      },
      {
        name: "watermark",
        dur: 2400,
        enter() {
          chipOnly(1, "applying…");
          setScene((s) => ({ ...s, shimmer: s.shimmer + 1, fresh: null }));
          at(60, () => moveOver(docRef.current, 0.6, 0.34, 760));
          at(420, () => set({ wm: 1 }));
          at(1200, () => {
            enforce(1, "ON", false);
            settle("sophia", "screen marked", "done");
            set({ lit: "mark" });
          });
          at(1800, () => set({ wm: 0.82, lit: null }));
        },
      },
      {
        name: "network",
        dur: 2800,
        enter() {
          chipOnly(2, "filtering…");
          set({ netOpen: true, fresh: null, lit: null });
          at(40, () => {
            setScene((s) => ({ ...s, net: ["on", s.net[1]] }));
            moveOver(n1Ref.current, 0.42, 0.5, 620);
          });
          at(180, () => typeUrl(0, "drive-personal.com", 42));
          at(1080, () => setScene((s) => ({ ...s, net: ["deny", s.net[1]] })));
          at(1200, () => {
            enforce(2, "1 DENIED", true, "net");
            settle("sophia", "request denied", "deny");
          });
          /* one green beat, same rule engine — a filter that only ever
             says no is a firewall, not a policy */
          at(1420, () => {
            setScene((s) => ({ ...s, net: [s.net[0], "on"] }));
            moveOver(n2Ref.current, 0.36, 0.5, 520);
          });
          at(1520, () => typeUrl(1, "sap-support.com", 36));
          at(2220, () => setScene((s) => ({ ...s, net: [s.net[0], "allow"] })));
        },
      },
      {
        name: "chrome",
        dur: 2400,
        enter() {
          chipOnly(4, "restricting…");
          set({ fresh: null });
          at(40, () => moveOver(toolRef.current, 0.72, 0.5, 700));
          at(640, () => {
            set({ chrome: "try" });
            press();
          });
          at(1220, () => set({ chrome: "denied" }));
          at(1360, () => {
            enforce(4, "DOWNLOADS OFF", true, "chrome");
            settle("sophia", "download blocked", "deny");
          });
          /* app filter has no scene of its own; it resolves alongside */
          at(1720, () => enforce(3, "ENFORCED", false));
        },
      },
      {
        name: "idle",
        dur: 3200,
        enter() {
          chipOnly(5, "00:12…");
          set({ ring: "arm", fresh: null });
          /* she stops working; the pill goes back to in-progress and
             then leaves with the cursor. `on: true` is explicit rather
             than assumed — a rail click can enter this chapter from
             chapter zero, where she has already stepped off. */
          actor("sophia", { on: true, status: "idle", mode: "work" });
          at(40, () => {
            const stage = stageRef.current;
            if (stage) moveTo(stage.offsetWidth * 1.14, stage.offsetHeight * 1.18, 900, "cubic-bezier(0.4,0,1,1)");
          });
          at(140, () => set({ ring: "run" }));
          at(780, () => setCursor((c) => ({ ...c, on: false })));
          at(900, () => actor("sophia", { on: false }));
          at(2200, () => set({ conn: "closed", dim: true }));
          at(2380, () => enforce(5, "CLOSED", true, "idle"));
        },
      },
      {
        name: "payoff",
        dur: 2600,
        enter() {
          set({ live: null, fresh: null });
          at(180, () => {
            set({ payoff: true, score: [0, 0] });
            countTo([6, 6], 1000);
          });
          /* a crossfade back to chapter one — a sweep, never a blank */
          at(2050, () => set({ payoff: false }));
          at(2300, rewind);
        },
      },
    ];

    const go = (i: number) => {
      clearAll();
      /* THE MENU CLOSES ON EVERY CHAPTER BOUNDARY. A rail click during
         the clipboard beat, a tab-away, or the rewind at the end of
         the loop all land here, so there is no path that leaves an
         orphaned menu floating over a later scene. */
      closeMenu();
      idx = ((i % CH.length) + CH.length) % CH.length;
      /* ALEN EXISTS IN CHAPTER ZERO ONLY. A rail click lands between
         his APPLIED stamp and his exit often enough that leaving the
         exit to a timer is not good enough — clearAll() would have
         cancelled it and he would sit over the window, still saying
         APPLIED, for the rest of the loop. Every entry into any other
         chapter takes him off. */
      if (idx !== 0) setScene((s) => (s.alen.on ? { ...s, alen: { ...s.alen, on: false } } : s));
      CH[idx].enter();
      if (!paused) chapterT = window.setTimeout(() => go(idx + 1), CH[idx].dur);
    };

    jumpRef.current = (ch: number) => {
      paused = true;
      if (resumeT !== null) window.clearTimeout(resumeT);
      /* jumping back past applied state would read as a reset, so an
         earlier chapter rewinds the whole scene under a sweep first */
      if (ch <= idx) rewind();
      go(ch);
      resumeT = window.setTimeout(() => {
        paused = false;
        go(idx + 1);
      }, 12000);
    };

    /* the only clock in the component, and it exists only here — the
       rendered value is a literal string until this line runs */
    clockT = window.setInterval(() => {
      if (document.hidden) return;
      seconds += 1;
      set({ clock: hhmmss(CLOCK_BASE + seconds) });
    }, 1000);

    const onVisibility = () => {
      if (document.hidden) {
        clearAll();
        closeMenu();
      } else go(idx);
    };
    document.addEventListener("visibilitychange", onVisibility);

    go(0);

    return () => {
      clearAll();
      closeMenu();
      if (resumeT !== null) window.clearTimeout(resumeT);
      if (clockT !== null) window.clearInterval(clockT);
      document.removeEventListener("visibilitychange", onVisibility);
      jumpRef.current = null;
    };
  }, [armed]);

  /* ---------------- rail interaction ---------------- */
  const onPill = useCallback((i: number) => {
    if (armedRef.current && jumpRef.current) jumpRef.current(PILL_TO_CH[i]);
    else setScene(resolvedFor(i));
  }, []);

  const cursorStyle = {
    "--ep-cx": `${cursor.x}px`,
    "--ep-cy": `${cursor.y}px`,
    "--ep-cdur": `${cursor.dur}ms`,
    "--ep-cease": cursor.ease,
  } as CSSProperties;

  return (
    <header className="ep-hero">
      <div className="iz-wrap ep-hero-in">
        {/* ==================== COPY ==================== */}
        <div className="ep-copy">
          <span className="iz-ey">Endpoint Controls</span>
          <h1 className="iz-h1">Access granted is not the end of the story.</h1>
          <p className="iz-lead">
            What happens inside the session — <em>copying, downloading, wandering</em> — is policy too.
          </p>
          <div className="ep-cta">
            <Magnetic>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri">
                Book a Demo
              </a>
            </Magnetic>
            {/* the simulator, not the card grid: "try" means the live
                desktop the reader can actually flip switches on.

                It therefore goes when the simulator does. Below 920 /
                on a coarse pointer the target section is display:none
                (see the foot of endpointsim.css), and a jump link to a
                hidden anchor is worse than no link — it looks broken.
                One class, hidden by the same query, no JS. */}
            <a href="#simulator" className="iz-btn iz-btn-ghost ep-cta-sim">
              Try the controls ↓
            </a>
          </div>
        </div>

        {/* ==================== THE RAIL ==================== */}
        <div className="ep-rail">
          <p className="ep-rail-lab" id="ep-rail-lab">
            the six controls_
          </p>
          {CONTROLS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              className={`ep-pill${scene.live === i ? " is-live" : ""}${scene.done[i] ? " is-done" : ""}${
                scene.armtick > 0 ? " tick" : ""
              }`}
              aria-pressed={scene.live === i}
              aria-describedby="ep-rail-lab"
              style={{ ["--ep-i" as string]: i } as CSSProperties}
              onClick={() => onPill(i)}
            >
              {/* the dot is REMOUNTED on every arm-tick so the sweep
                  can replay; at rest `armtick` is 0 and the class is
                  absent, so the server-rendered dot has no animation */}
              <span key={`d${scene.armtick}`} className="ep-dot" aria-hidden="true" />
              <span className="ep-nm">{c.name}</span>
              {/* keying on the text is what replays the stamp; `armed`
                  keeps it from firing on first paint */}
              <span
                key={`${i}:${scene.chips[i]}`}
                className={`ep-chip${scene.deny[i] ? " deny" : ""}${armed ? " morph" : ""}`}
              >
                {scene.chips[i]}
              </span>
              <span className="ep-tick" aria-hidden="true">
                ✓
              </span>
            </button>
          ))}
          <p className="ep-railfoot">
            enforced per app, per user group — <b>every event is one of 202 logged types.</b>
          </p>
        </div>

        {/* ==================== THE SESSION WINDOW ==================== */}
        <div className="ep-winwrap">
          <p className="ep-sr" id="ep-scene">
            A live remote session to SAP ERP, showing the Q3 vendor payment schedule. It runs from a managed laptop, and
            the tunnel out of it reaches that one application and nothing else on the network — the file server, the
            internal range and the database are all off the map. A copy of two invoice rows has been attempted and refused, so
            the local clipboard is stamped BLOCKED; a watermark carrying the user, the session ID and the time is
            rendered over the screen; downloads and printing are switched off; a personal file-sharing domain is denied
            while a support domain is allowed; and the session closes on its own after fifteen minutes idle. Each of
            those decisions is written to the audit log.
          </p>

          <div className={`ep-stack${armed ? " is-armed" : ""}`} role="img" aria-labelledby="ep-scene">
            {/* ========== CONTAINER 1 · the connection strip ========== */}
            <ConnStrip conn={scene.conn} />

            {/* ========== CONTAINER 2 · the session window ==========
                Its own positioning context, because the two actor
                pills hang over its top edge and must be measured from
                the WINDOW, not from the strip that now sits above it. */}
            <div className="ep-winbox">
              <div className="ep-win">
                {/* ---------- titlebar ---------- */}
                <div className="ep-bar">
                  {/* window controls. Tinted from the semantic tokens
                      rather than from literal red/amber/green, so they
                      still read as a titlebar on both themes and still
                      spend nothing out of the one-orange budget. */}
                  <span className="ep-lights" aria-hidden="true">
                    <i className="ep-l-close" />
                    <i className="ep-l-min" />
                    <i className="ep-l-max" />
                  </span>
                  <span className="ep-bar-ttl">SAP ERP — Remote session</span>
                  <span className="ep-bar-right">
                    <span className="ep-bar-meta">sophia.s@ · 8F2A</span>
                    <span className={`ep-livepip${scene.conn === "closed" ? " off" : ""}`} aria-hidden="true">
                      <i />
                      <span>LIVE</span>
                    </span>
                    <svg className={`ep-ring ${scene.ring}`} viewBox="0 0 20 20" aria-hidden="true">
                      <circle className="bg" cx="10" cy="10" r="8.5" />
                      <circle className="fg" cx="10" cy="10" r="8.5" />
                    </svg>
                  </span>
                </div>

                {/* ---------- the stage ---------- */}
                <div className="ep-stage" ref={stageRef}>
                  <div className="ep-doc" ref={docRef}>
                    {/* the ERP toolbar — export and print are what the
                        chrome chapter takes away */}
                    <div className={`ep-tool ${scene.chrome}`} ref={toolRef}>
                      <span className="ep-crumb">
                        <CrumbIcon />
                        <span>Finance / AP / Q3-2026</span>
                      </span>
                      <span className="ep-search" aria-hidden="true">
                        <svg viewBox="0 0 16 16">
                          <circle cx="7" cy="7" r="4.4" />
                          <path d="M10.4 10.4 14 14" />
                        </svg>
                        vendor…
                      </span>
                      <span className="ep-tbtn ep-tbtn--x">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M8 2v8m0 0 3-3m-3 3-3-3M3 13h10" />
                        </svg>
                        Export
                        <s aria-hidden="true" />
                      </span>
                      <span className="ep-tbtn">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                          <path d="M4.5 6V2.5h7V6M4.5 11.5H3V6h10v5.5h-1.5M4.5 9.5h7v4h-7z" />
                        </svg>
                        Print
                        <s aria-hidden="true" />
                      </span>
                    </div>

                    <div className="ep-dochead">
                      <h3>Q3 vendor payment schedule</h3>
                      <span className="ep-doc-sub">6 of 214</span>
                    </div>

                    <table className="ep-tbl" data-sel={scene.sel}>
                      <thead>
                        <tr>
                          <th>Vendor</th>
                          <th>Invoice</th>
                          <th style={{ textAlign: "right" }}>Amount</th>
                          <th className="col-due">Due</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ROWS.map((r, i) => (
                          <tr
                            key={r[1]}
                            className={SELECTED.includes(i) ? "sel" : undefined}
                            ref={i === SELECTED[0] ? selRef : undefined}
                          >
                            <td className="v">{r[0]}</td>
                            <td>{r[1]}</td>
                            <td className="n">{r[2]}</td>
                            <td className="cell-due">{r[3]}</td>
                            <td>
                              <span className={`st${r[4] === "Approved" ? " ok" : ""}`}>{r[4]}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* reserved box: the resting rule count and the two
                        filter verdicts occupy the same 64px, so the
                        network chapter cannot move the table */}
                    <div className="ep-net">
                      <div className={`ep-net-layer${scene.netOpen ? " out" : ""}`}>
                        <span className="ep-net-rest">
                          <s aria-hidden="true" />
                          net_filter · 24 rules armed
                        </span>
                      </div>
                      <div className={`ep-net-layer${scene.netOpen ? "" : " out"}`} aria-hidden="true">
                        <div className="ep-net-rows">
                          <div className={`ep-nrow${scene.net[0] === "off" ? "" : " on"}${scene.net[0] === "deny" ? " deny" : ""}`} ref={n1Ref}>
                            <span className="ep-nleg" />
                            <span className="ep-nchip">
                              <span className="ep-nurl">{scene.netUrl[0]}</span>
                              <span className="ep-nmark">✕</span>
                            </span>
                          </div>
                          <div className={`ep-nrow${scene.net[1] === "off" ? "" : " on"}${scene.net[1] === "allow" ? " allow" : ""}`} ref={n2Ref}>
                            <span className="ep-nleg" />
                            <span className="ep-nchip">
                              <span className="ep-nurl">{scene.netUrl[1]}</span>
                              <span className="ep-nmark">✓</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* the one place in the picture that is OUTSIDE the
                      session — and the reason the stamp reads */}
                  <div className="ep-side">
                    <span className="ep-side-lab">local_clipboard_</span>
                    <div className={`ep-target${scene.shake ? " shake" : ""}`}>
                      <span key={scene.stamp} className={`ep-stamp${armed && scene.stamp > 0 ? " pop" : ""}`}>
                        BLOCKED
                      </span>
                    </div>
                    <span className="ep-side-note">
                      nothing crossed
                      <br />
                      the session edge
                    </span>
                  </div>

                  {/* ---------- overlays ---------- */}
                  <div className="ep-wm" style={{ ["--ep-wm-o" as string]: scene.wm } as CSSProperties} aria-hidden="true">
                    {WM_TILES.map((t, i) => (
                      <b key={i} style={{ left: t.left, top: t.top }}>
                        {WM_TEXT}
                      </b>
                    ))}
                  </div>
                  <div key={`sh${scene.shimmer}`} className={`ep-shimmer${scene.shimmer > 0 ? " sweep" : ""}`} aria-hidden="true" />
                  <div
                    key={`wl${scene.wall}`}
                    className={`ep-wall${scene.wall > 0 ? " hit" : ""}`}
                    style={{ left: wallX }}
                    aria-hidden="true"
                  />
                  <div className="ep-ghost" ref={ghostRef} aria-hidden="true">
                    ⌘C &nbsp;copy
                  </div>

                  <ContextMenu m={menu} />

                  <div className={`ep-cursor${cursor.on ? " on" : ""}${cursor.flip ? " flip" : ""}`} style={cursorStyle} aria-hidden="true">
                    <svg key={cursor.press} className={cursor.press > 0 ? "press" : undefined} width="19" height="23" viewBox="0 0 19 23">
                      <path d="M1.6 1.2 L1.6 18.4 L6.1 14.3 L8.8 20.6 L11.8 19.3 L9.1 13.2 L15.2 13 Z" />
                    </svg>
                    <span className="ep-nametag">sophia.s@</span>
                  </div>

                  <div className={`ep-dim${scene.dim ? " on" : ""}${scene.payoff ? " payoff" : ""}`} aria-hidden="true">
                    <p className="ep-closed">Session closed — 15 min idle</p>
                  </div>

                  <div className={`ep-score${scene.payoff ? " on" : ""}`} aria-hidden="true">
                    <div className="ep-score-big">
                      <span>
                        <b>{scene.score[0]}</b> controls enforced
                      </span>
                      <i>·</i>
                      <span>
                        <b>{scene.score[1]}</b> events logged
                      </span>
                    </div>
                    <span className="ep-score-bar" />
                    {/* one line of credit for the story that just played,
                        and no more than one */}
                    <span className="ep-score-cred">
                      set by <b>alen.r</b> · enforced on <b>sophia.s</b>
                    </span>
                    <span className="ep-score-foot">202 logged event types</span>
                  </div>

                  <div key={`rw${scene.rewind}`} className={`ep-rewind${scene.rewind > 0 ? " go" : ""}`} aria-hidden="true" />
                </div>
              </div>

              {/* ---------- the two actors ----------
                  SIBLINGS of the window, not children: the window
                  clips its own overflow, and these hang over its top
                  edge. They are position:absolute inside `.ep-winbox`
                  — which wraps the WINDOW alone, not the whole stack,
                  so lifting the connection strip out above did not
                  move them. Fixed size, transform-only motion: they
                  contribute nothing to layout and cannot shift a pixel
                  of the LCP element. */}
              <ActorPill who="sophia" a={scene.sophia} armed={armed} />
              <ActorPill who="alen" a={scene.alen} armed={armed} />
            </div>

            {/* ========== CONTAINER 3 · the audit log ==========
                Out of the window and into its own panel: the log is
                not part of the application Sophia is using, it is what
                the platform wrote down while she used it. Same three
                ids, same dedupe, same fixed box — only the frame
                around it changed. */}
            <div className="ep-log">
              <div className="ep-loghead">
                <span className="ep-logpip" aria-hidden="true" />
                <span className="lbl">audit_log_</span>
                <span className="clock">{scene.clock}</span>
              </div>
              <ul>
                {scene.log.map((id, i) => (
                  <LogRow
                    key={id}
                    id={id}
                    cls={[
                      i < scene.log.length - 1 ? "old" : "",
                      scene.fresh === id ? "fresh" : "",
                      scene.lit === id ? "lit" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
