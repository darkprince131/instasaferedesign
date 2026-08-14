"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ShieldCheck, DeviceMobile, MapPin, Clock, AirplaneTilt, Warning,
  WifiHigh, Pulse, LockKey, Prohibit,
  Drop, Clipboard, Selection, GlobeSimple, Usb, SquaresFour,
  CaretLeft, CaretRight, ArrowUpRight, Play, Pause, type Icon,
} from "@phosphor-icons/react";
import { IzMiniDesktop } from "./IzMiniDesktop";

/* ============================================================
   IzControlSurface — contextual access and endpoint control in ONE
   section, on the 00ac control-surface chassis.

   Two things changed from 00ac IzSignalGrid:

   1. ONE SECTION, TWO FAMILIES. Contextual access decides whether a
      session happens; endpoint control decides what can be done
      inside it. Split across two sections they read as two products.
      Together they read as one surface with a before and an after,
      which is the actual claim.

   2. THE CONSOLE IS GONE, REPLACED BY A SCREEN. 00ac answers "what
      does the API return", which is the right answer for a developer
      audience and the wrong one here. A blocked paste has to be seen
      to land. So the JSON console is now a live endpoint that plays
      the selected control as a scripted scenario, on loop, with a
      pause control for anyone who wants the frame to hold still.

   Everything else — the irregular scatter, coordinates-as-data, the
   invisible placeholders — is inherited from `.izsg-*` rather than
   restated, so the two components can never drift apart.
   ============================================================ */

type Group = "context" | "endpoint";

type Control = {
  id: string;
  label: string;
  Icon: Icon;
  group: Group;
  blurb: string;
  /** which IzMiniDesktop script to play */
  script: string;
  /** contextual controls share one script and inject their own verdict */
  verdict?: { tone: "info" | "danger"; title: string; sub: string };
  lg: [number, number];
  md: [number, number] | null;
  sm: number | null;
  /** phone flow position. The scatter is explicit at md/lg, so on the
      4-column phone grid the array order is the ONLY thing deciding what
      lands in the first row — and the array is ordered by argument
      (context, then endpoint), which buried the controls that actually
      show you something on the screen. This reorders the phone flow so
      the demonstrable ones lead, without moving anything else. */
  smOrder: number;
};

const CONTROLS: Control[] = [
  /* ---- contextual access: does this session happen at all ---- */
  {
    id: "posture", label: "Device posture", Icon: ShieldCheck, group: "context",
    blurb: "Disk encryption, EDR, screen lock and patch level are checked before any app is brokered.",
    script: "context", verdict: { tone: "danger", title: "Access denied · device non-compliant", sub: "BitLocker off · remediation sent to the user" },
    lg: [2, 1], md: [1, 2], sm: 2, smOrder: 8,
  },
  {
    id: "binding", label: "Device binding", Icon: DeviceMobile, group: "context",
    blurb: "Access is pinned to enrolled hardware, so a stolen password on its own reaches nothing.",
    script: "context", verdict: { tone: "danger", title: "Access denied · device not enrolled", sub: "No challenge offered · enrolment request raised" },
    lg: [4, 1], md: [2, 2], sm: 1, smOrder: 7,
  },
  {
    id: "geo", label: "Geo-fence", Icon: MapPin, group: "context",
    blurb: "Access is bound to the countries you actually operate in. Everything else is denied by default.",
    script: "context", verdict: { tone: "danger", title: "Access denied · outside permitted geography", sub: "Request origin RU · policy IN-Finance" },
    lg: [6, 1], md: [4, 2], sm: 1, smOrder: 9,
  },
  {
    id: "tod", label: "Time-of-day", Icon: Clock, group: "context",
    blurb: "Contractor access that exists during working hours and closes itself afterwards.",
    script: "context", verdict: { tone: "danger", title: "Access denied · outside the permitted window", sub: "02:41 IST · window 09:00–19:00" },
    lg: [8, 1], md: [5, 2], sm: 1, smOrder: 10,
  },
  {
    id: "travel", label: "Impossible travel", Icon: AirplaneTilt, group: "context",
    blurb: "Two logins no aircraft could connect. The second one does not get in.",
    script: "context", verdict: { tone: "danger", title: "Session terminated · impossible travel", sub: "Pune → Toronto in 18 minutes" },
    lg: [10, 1], md: [6, 2], sm: 1, smOrder: 11,
  },
  {
    id: "root", label: "Jailbreak & root", Icon: Warning, group: "context",
    blurb: "Rooted phones and jailbroken tablets never reach a business application.",
    script: "context", verdict: { tone: "danger", title: "Access denied · device integrity compromised", sub: "su binary · debug bridge detected" },
    lg: [7, 2], md: [1, 3], sm: null, smOrder: 90,
  },
  {
    id: "network", label: "Network trust", Icon: WifiHigh, group: "context",
    blurb: "An unmanaged café network is not the same context as the office, and is not treated as one.",
    script: "context", verdict: { tone: "info", title: "Step-up challenge · untrusted network", sub: "Public Wi-Fi · downloads disabled for this session" },
    lg: [8, 4], md: [3, 3], sm: 1, smOrder: 12,
  },
  {
    id: "anomaly", label: "Anomaly score", Icon: Pulse, group: "context",
    blurb: "One number across posture, geography, velocity and behaviour, recalculated every session.",
    script: "context", verdict: { tone: "danger", title: "Risk score 87 · elevated", sub: "new device · impossible travel · MFA retries" },
    lg: [9, 5], md: [4, 3], sm: 1, smOrder: 13,
  },
  {
    id: "stepup", label: "Step-up MFA", Icon: LockKey, group: "context",
    blurb: "A challenge when something changed, and silence when nothing did.",
    script: "context", verdict: { tone: "info", title: "Step-up challenge issued", sub: "New country · reason recorded with the decision" },
    lg: [7, 3], md: [5, 3], sm: 1, smOrder: 14,
  },
  {
    id: "terminate", label: "Session termination", Icon: Prohibit, group: "context",
    blurb: "One action ends every live session for a user, everywhere, immediately.",
    script: "context", verdict: { tone: "danger", title: "3 sessions terminated in 380 ms", sub: "Triggered by administrator revoke" },
    lg: [10, 6], md: [6, 3], sm: null, smOrder: 91,
  },

  /* ---- endpoint control: what can be done inside the session ---- */
  {
    id: "watermark", label: "Watermark protection", Icon: Drop, group: "endpoint",
    blurb: "Every session carries the viewer's identity, so a photographed screen still names its source.",
    script: "watermark",
    lg: [9, 7], md: [1, 4], sm: 2, smOrder: 5,
  },
  {
    id: "clipboard", label: "Clipboard controls", Icon: Clipboard, group: "endpoint",
    blurb: "Copy, cut and paste are cut off at the session boundary. Nothing crosses it.",
    script: "clipboard",
    lg: [9, 3], md: [2, 4], sm: 1, smOrder: 4,
  },
  {
    id: "screenshot", label: "Screenshot block", Icon: Selection, group: "endpoint",
    blurb: "Screen capture is blocked at the surface. The frame that gets saved is blank.",
    script: "screenshot",
    lg: [10, 4], md: [3, 4], sm: 1, smOrder: 1,
  },
  {
    id: "chrome", label: "Chrome controls", Icon: GlobeSimple, group: "endpoint",
    blurb: "Dev tools, downloads, print and print preview, disabled inside the managed browser.",
    script: "chrome",
    lg: [7, 5], md: [4, 4], sm: 1, smOrder: 3,
  },
  {
    id: "usb", label: "USB blocking", Icon: Usb, group: "endpoint",
    blurb: "Removable storage is refused, so a data set cannot leave on a stick.",
    script: "usb",
    lg: [8, 6], md: [5, 4], sm: 1, smOrder: 6,
  },
  {
    id: "app", label: "Application restriction", Icon: SquaresFour, group: "endpoint",
    blurb: "Remote-control and exfiltration tools do not launch on a managed endpoint.",
    script: "app",
    lg: [9, 2], md: [6, 4], sm: 1, smOrder: 2,
  },
];

/* Invisible cells. They hold a slot and draw nothing — the asymmetry
   comes from the gaps, not from a texture. See 00ac.
   None of them has a phone slot: the phone grid is a flat 4-column flow,
   so a placeholder there is not scatter, it is a hole at the bottom of
   the block. */
const PLACEHOLDERS: { lg: [number, number]; md: [number, number] | null }[] = [
  { lg: [1, 1], md: [3, 2] },
  { lg: [3, 1], md: [2, 3] },
  { lg: [5, 1], md: null },
  { lg: [9, 1], md: null },
  { lg: [10, 2], md: null },
  { lg: [8, 3], md: null },
  { lg: [7, 4], md: null },
  { lg: [10, 5], md: null },
  { lg: [9, 6], md: null },
  { lg: [7, 7], md: null },
  { lg: [10, 7], md: null },
  { lg: [8, 8], md: null },
  { lg: [10, 8], md: null },
];

const GROUP_LABEL: Record<Group, string> = {
  context: "contextual access",
  endpoint: "endpoint control",
};

export function IzControlSurface({ exclude }: { exclude?: string[] } = {}) {
  /* `exclude` drops controls by id. It exists because a claim that is
     true of the endpoint agent is not automatically true of every
     product this surface appears under: /zero-trust-application-access
     may not present screenshot or USB blocking as ZTAA session
     controls, and the Content Master guardrail says so explicitly.
     Dropping a tile leaves a hole in the scatter, which is fine — the
     scatter is irregular by design and already carries placeholders. */
  const key = exclude?.join(",") ?? "";
  const controls = useMemo(
    () => (key ? CONTROLS.filter((c) => !key.split(",").includes(c.id)) : CONTROLS),
    [key]
  );

  const [active, setActive] = useState(0);
  /* Two separate facts, deliberately. `inView` is the browser's opinion
     and flips both ways; `userPaused` is the visitor's and only they
     get to change it. Folding them into one `playing` flag meant the
     observer could pause the loop and nothing could ever start it
     again. */
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [seen, setSeen] = useState(false);
  /* replay bumps on every advance so the desktop re-runs its script
     even when the visitor re-picks the control it is already on */
  const [cycle, setCycle] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver(
      (es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    const failsafe = setTimeout(() => setSeen(true), 2500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);

  /* Pause while off-screen: a scripted loop running in an unseen
     section is pure battery cost, and the visitor would arrive
     mid-scenario with no idea what they missed. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver((es) => setInView(es[0].isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback((i: number) => {
    setActive(((i % controls.length) + controls.length) % controls.length);
    setCycle((c) => c + 1);
  }, [controls.length]);

  /* The loop REPLAYS the current capability; it never advances to the
     next one. Auto-advancing meant the screen tore itself down and
     rebuilt every few seconds, and a visitor reading about screenshot
     blocking was moved on before they finished. Moving between
     capabilities is a decision, so it belongs to the tiles and the
     next/prev buttons — nothing else. */
  const handleEnd = useCallback(() => setCycle((c) => c + 1), []);

  const control = controls[Math.min(active, controls.length - 1)];

  return (
    <div className="izsg izcs" ref={rootRef}>
      <div className={`izsg-grid ${seen ? "in" : ""}`} role="group" aria-label="InstaSafe control surface">
        {/* Dashed lattice, drawn as real grid items so every line lands
            exactly in a gutter rather than being guessed at with a
            background gradient. Rendered FIRST and pinned to z-index 0,
            with the copy block carrying the section background on top —
            so lines cross each other in the open scatter and never run
            behind the headline, the blurb or the screen. */}
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={`vr${i}`} aria-hidden="true" className="izcs-rail v" style={{ ["--gc" as string]: i + 1 }} />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={`hr${i}`} aria-hidden="true" className="izcs-rail h" style={{ ["--gr" as string]: i + 1 }} />
        ))}

        <div className="izsg-copy">
          <span className="izsg-kicker">
            Control surface
            <i aria-hidden="true">_</i>
          </span>
          <h2 className="izsg-title">
            Decide the session, <mark>then</mark> govern it.
          </h2>
          <p className="izsg-sub">
            Contextual access decides whether a session happens. Endpoint control decides what can be done inside it.
            Same policy engine, same agent, one surface — pick any control and watch it land on a real endpoint.
          </p>

          <div className="izcs-stage">
            <div className="izcs-h">
              <span className="izcs-name">
                <control.Icon weight="regular" aria-hidden="true" />
                <span className="nm">{control.label}</span>
                <span className={`izcs-tag ${control.group}`}>{GROUP_LABEL[control.group]}</span>
              </span>
              {/* One transport, transport order: prev · play/pause · next.
                  Everything that drives the screen sits in one place, and
                  the screen gets back the height a separate footer took. */}
              <span className="izsg-pager izcs-transport" role="group" aria-label="Demonstration controls">
                <button type="button" onClick={() => go(active - 1)} aria-label="Previous control">
                  <CaretLeft weight="bold" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="izcs-playbtn"
                  onClick={() => setUserPaused((p) => !p)}
                  aria-label={userPaused ? "Play the demonstration" : "Pause the demonstration"}
                  aria-pressed={userPaused}
                >
                  {userPaused ? <Play weight="fill" aria-hidden="true" /> : <Pause weight="fill" aria-hidden="true" />}
                </button>
                <button type="button" onClick={() => go(active + 1)} aria-label="Next control">
                  <CaretRight weight="bold" aria-hidden="true" />
                </button>
              </span>
            </div>

            <p className="izcs-blurb">{control.blurb}</p>

            {/* deliberately NOT keyed on the control: a key change would
                remount the screen and drop it out of layout for a frame */}
            <IzMiniDesktop
              scriptId={control.script}
              verdict={control.verdict ?? null}
              playing={inView && seen && !userPaused}
              cycle={cycle}
              onEnd={handleEnd}
            />
          </div>

          {/* Two destinations, because the section makes two arguments.
              A single "see the platform" link sent everyone to the same
              page and made the split above it decorative. */}
          <div className="izcs-ctas">
            <a className="izcs-cta" href="/platform">
              Contextual access
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
            <a className="izcs-cta" href="/platform">
              Endpoint controls
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        {controls.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === active}
            data-group={c.group}
            className={`izsg-tile ${i === active ? "on" : ""} ${c.md ? "" : "izsg-x-md"} ${c.sm ? "" : "izsg-x-sm"}`}
            style={{
              "--gc": c.lg[0], "--gr": c.lg[1],
              "--gc-md": c.md?.[0] ?? 1, "--gr-md": c.md?.[1] ?? 1,
              "--sm-span": c.sm ?? 1, "--sm-order": c.smOrder, "--i": i,
            } as React.CSSProperties}
            onClick={() => go(i)}
          >
            <c.Icon weight="regular" aria-hidden="true" />
            <span>{c.label}</span>
          </button>
        ))}

        {PLACEHOLDERS.map((p, i) => (
          <span
            key={`ph-${i}`}
            aria-hidden="true"
            className={`izsg-ph izsg-x-sm ${p.md ? "" : "izsg-x-md"}`}
            style={{
              "--gc": p.lg[0], "--gr": p.lg[1],
              "--gc-md": p.md?.[0] ?? 1, "--gr-md": p.md?.[1] ?? 1,
              "--i": controls.length + i,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
