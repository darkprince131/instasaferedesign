"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowUpLeft,
  ArrowUpRight,
  Browsers,
  CaretLeft,
  CaretRight,
  Check,
  Clipboard,
  Code,
  Desktop,
  DotsThreeVertical,
  DownloadSimple,
  Drop,
  Folder,
  Globe,
  HardDrives,
  Info,
  LockSimple,
  Minus,
  Monitor,
  Plus,
  Printer,
  Prohibit,
  PuzzlePiece,
  ShieldCheck,
  Square,
  Star,
  Timer,
  WifiHigh,
  X,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   EndpointSim — the live desktop (#simulator)

   A PORT of the deck's S09 endpoint slide
   (InstaSafe DeckDesign/deck/src/slides/S09Endpoint.tsx +
   src/miniwin/MiniWindows.tsx). The MECHANIC is what came across, not
   a line of the styling: one persistent fake desktop that every
   control acts on, an admin rail on the left that changes how that
   desktop behaves, and effects that COMPOSE — the watermark stays
   rendered over everything while a clipboard request is refused and a
   domain is denied. That composition is the whole argument; six
   isolated demos would have made six smaller ones.

   WHAT CHANGED IN THE PORT
     · Control set is OURS. The deck's screenshot-block and USB-block
       are not two of the six this page names, so they are gone and
       Network filter and Inactivity timeout took their slots. The
       other four (clipboard, watermark, chrome, app) map straight
       across.
     · Tabler icons → phosphor, framer-motion's useReducedMotion →
       matchMedia. Both are site convention.
     · The deck reset on slide-leave; there are no slides here, so the
       reset is the Restart button on the lock screen and nothing else
       clears state behind the reader's back.

   ------------------------------------------------------------
   THE REALISM PASS (client review). Three things changed and they
   all pull the same direction — this has to read as a WINDOWS
   DESKTOP somebody actually uses, not as a diagram of one.

   1. REAL APP ICONS. /public/apps/{chrome,notepad,anydesk,
      file-explorer}.webp are the client's own converted marks. They
      are the desktop icons AND the taskbar icons, and File Explorer
      is pinned to the taskbar the way Windows pins it. The InstaSafe
      brand mark stays the agent icon, the browser tab favicon and the
      lock-screen mark.

   2. THE WINDOWS ARE DEPICTIONS, NOT DIAGRAMS. Chrome now has the
      real furniture: a grey tab strip with one rounded-top active
      tab, minimise/maximise/close at the top right, a toolbar with
      back/forward/reload, a full omnibox pill with a padlock and a
      star, extensions + avatar + kebab, and a BOOKMARKS BAR — which
      is where the network filter is actually exercised. Notepad and
      File Explorer get the Windows 11 title-bar-plus-menu-row
      treatment. Colour inside those windows is literal and lives in
      one commented block in endpointsim.css; the wallpaper is the
      site's own mini-desktop plum, also literal, also theme-constant,
      because a desktop wallpaper does not change when a website's
      theme does.

   3. THE HINT SYSTEM (below). Flipping a switch used to leave the
      reader with a changed rail and no idea what to try. Now every
      toggle names the next action and pulses the thing to click.
   ============================================================ */

type CtlId = "clipboard" | "watermark" | "network" | "app" | "chrome" | "idle";

type ControlDef = {
  id: CtlId;
  group: "dlp" | "session";
  name: string;
  desc: string;
  Ico: Icon;
};

const CONTROLS: ControlDef[] = [
  {
    id: "clipboard",
    group: "dlp",
    name: "Clipboard controls",
    desc: "Copy, paste and clipboard access are refused inside the session.",
    Ico: Clipboard,
  },
  {
    id: "watermark",
    group: "dlp",
    name: "Watermark protection",
    desc: "An identity overlay is rendered over everything on screen.",
    Ico: Drop,
  },
  {
    id: "network",
    group: "session",
    name: "Network filter",
    desc: "Named domains stop resolving for the life of the session.",
    Ico: WifiHigh,
  },
  {
    id: "app",
    group: "session",
    name: "App filter",
    desc: "Named local applications cannot launch while this session runs.",
    Ico: Monitor,
  },
  {
    id: "chrome",
    group: "session",
    name: "Chrome control",
    desc: "Developer tools, downloads and printing are switched off.",
    Ico: Browsers,
  },
  {
    id: "idle",
    group: "session",
    name: "Inactivity timeout",
    desc: "An idle session counts down and then disconnects itself.",
    Ico: Timer,
  },
];

const GROUPS: { key: ControlDef["group"]; label: string }[] = [
  { key: "dlp", label: "Data loss prevention" },
  { key: "session", label: "Session and application" },
];

type WinState = "closed" | "open" | "min";
type WinId = "notepad" | "browser" | "explorer";

type ToastData = { key: number; tone: "info" | "deny"; Ico: Icon; title: string; sub: string };

/* the client's converted app marks. One place, so a re-export is a
   one-line change. */
const APP = {
  chrome: "/apps/chrome-64.webp",
  notepad: "/apps/notepad-64.webp",
  anydesk: "/apps/anydesk-64.webp",
  explorer: "/apps/file-explorer-48.webp",
  brand: "/brand/instasafe-mark-color.svg",
} as const;

function AppIcon({ src, size }: { src: string; size: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} width={size} height={size} alt="" aria-hidden="true" draggable={false} className="eps-appico" />
  );
}

/* the session identity, everywhere. Same handle the hero uses. */
const WM_LINE = "Sophia S · sophia.s · 8F2A · 10:42 IST";
const WM_TILES = Array.from({ length: 44 }, (_, i) => i);

/* Notepad content is the hero's Q3 vendor rows, not a new set of
   numbers — the page must not appear to make two different claims
   about the same schedule. The FILE NAME therefore stays
   Q3-vendors.txt (it names what is in the file); only the title-bar
   FORMAT changed, to the Windows "name - App" hyphen. */
const NOTE_ROWS: [string, string, string][] = [
  ["Meridian Components", "INV-4471", "18,40,000"],
  ["Kestrel Logistics", "INV-4468", "6,72,500"],
  ["Novapack Industries", "INV-4459", "11,05,000"],
];

/* the two bookmarks the network filter decides between */
const HOST_ALLOW = "sap-support.com";
const HOST_DENY = "drive-personal.com";
const HOST_PORTAL = "portal.instasafe.com";

/** the idle countdown, in seconds. The COPY says fifteen minutes,
    because that is the real policy; the demo cannot make a reader wait
    fifteen minutes, so the chip counts a compressed ten and says so. */
const IDLE_SECONDS = 10;

/* ============================================================
   THE HINT SYSTEM

   A toggle used to be a dead end: the rail changed and the desktop
   did not, because nothing had been attempted yet. So flipping a
   control on now names the next action and PULSES the thing to
   click, and the hint clears the moment that action happens (or the
   toggle goes back off). One hint at a time — latest toggle wins —
   and the chip is a live region, so a screen reader hears the
   instruction rather than watching a ring it cannot see.

   The hint is stored as the CONTROL ID alone and its text/target are
   derived at render from current window state. That is what makes it
   follow the reader: "open Chrome and try the bookmark" becomes "try
   the bookmark" the instant Chrome is on screen, with the pulse
   moving from the desktop icon to the bookmark, and no extra state
   machine to keep in sync.
   ============================================================ */
type HintTarget =
  | "di-notepad"
  | "npd-copy"
  | "di-chrome"
  | "bm-deny"
  | "di-anydesk"
  | "crm-tools"
  | "idle-chip"
  | "none";

type Hint = { text: string; target: HintTarget; dir: "ul" | "ur" | null };

function hintOf(id: CtlId, win: Record<WinId, WinState>): Hint {
  switch (id) {
    case "clipboard":
      return win.notepad === "open"
        ? { text: "Select a line, then hit Copy", target: "npd-copy", dir: "ul" }
        : { text: "Open Notepad, select a line, hit Copy", target: "di-notepad", dir: "ul" };
    case "watermark":
      return { text: "Watch the screen — every frame now carries her identity", target: "none", dir: null };
    case "network":
      return win.browser === "open"
        ? { text: "Try the drive-personal.com bookmark", target: "bm-deny", dir: "ur" }
        : { text: "Open Chrome and try the drive-personal.com bookmark", target: "di-chrome", dir: "ul" };
    case "app":
      return { text: "Double-click anydesk.exe on the desktop", target: "di-anydesk", dir: "ul" };
    case "chrome":
      return { text: "Try Download or Print in Chrome's toolbar", target: "crm-tools", dir: "ur" };
    case "idle":
      return { text: "Hands off the desktop and watch the countdown", target: "idle-chip", dir: "ur" };
  }
}

/** the two hints that name no action have to time out, because there
    is no click that could ever clear them */
const PASSIVE_HINTS: CtlId[] = ["watermark", "idle"];
const PASSIVE_MS = 7000;

export function EndpointSim() {
  const [on, setOn] = useState<Record<CtlId, boolean>>({
    clipboard: false,
    watermark: false,
    network: false,
    app: false,
    chrome: false,
    idle: false,
  });
  const [win, setWin] = useState<Record<WinId, WinState>>({
    notepad: "closed",
    browser: "closed",
    explorer: "closed",
  });
  const [focused, setFocused] = useState<WinId | null>(null);
  const [maxed, setMaxed] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);
  const [page, setPage] = useState<"portal" | "drive">("portal");
  const [denied, setDenied] = useState(false);
  const [left, setLeft] = useState(IDLE_SECONDS);
  const [locked, setLocked] = useState(false);
  const [still, setStill] = useState(false);
  const [hintFor, setHintFor] = useState<CtlId | null>(null);

  const toastT = useRef<number | null>(null);
  const toastKey = useRef(0);

  useEffect(() => {
    setStill(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(
    () => () => {
      if (toastT.current) window.clearTimeout(toastT.current);
    },
    []
  );

  /* the passive hints expire on their own */
  useEffect(() => {
    if (!hintFor || !PASSIVE_HINTS.includes(hintFor)) return;
    const id = window.setTimeout(() => setHintFor((h) => (h === hintFor ? null : h)), PASSIVE_MS);
    return () => window.clearTimeout(id);
  }, [hintFor]);

  const clearHint = useCallback((id: CtlId) => {
    setHintFor((h) => (h === id ? null : h));
  }, []);

  const notify = useCallback((t: Omit<ToastData, "key">) => {
    toastKey.current += 1;
    setToast({ ...t, key: toastKey.current });
    if (toastT.current) window.clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  /* ---------------- the idle countdown ----------------
     THE ONLY TIMER IN THE COMPONENT that is not the hint expiry, and
     it exists only while the inactivity control is on, the session is
     not already closed, and the tab is visible. Turning the control
     off removes it entirely. */
  const bump = useCallback(() => setLeft(IDLE_SECONDS), []);

  useEffect(() => {
    if (!on.idle || locked) return;
    let id = 0;
    const tick = () => {
      if (document.hidden) return;
      setLeft((n) => {
        if (n <= 1) {
          setLocked(true);
          return 0;
        }
        return n - 1;
      });
    };
    id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [on.idle, locked]);

  /* every interaction inside the stage resets the clock, which is what
     an inactivity timeout means */
  const touched = useCallback(() => {
    if (on.idle && !locked) bump();
  }, [on.idle, locked, bump]);

  const toggle = useCallback(
    (id: CtlId) => {
      setOn((prev) => {
        const next = { ...prev, [id]: !prev[id] };
        /* turning Chrome control on with no browser on screen would be
           a switch with nothing to show, so the window comes up with it */
        if (id === "chrome" && next.chrome) {
          setWin((w) => (w.browser === "closed" ? { ...w, browser: "open" } : w));
          setFocused("browser");
        }
        /* the hint follows the switch: on names the next action, off
           takes its own hint down and leaves any other one alone */
        setHintFor((h) => (next[id] ? id : h === id ? null : h));
        return next;
      });
      if (id === "idle") {
        setLeft(IDLE_SECONDS);
        setLocked(false);
      }
      bump();
    },
    [bump]
  );

  const openWin = useCallback((id: WinId) => {
    setWin((w) => ({ ...w, [id]: "open" }));
    setFocused(id);
  }, []);
  const closeWin = useCallback((id: WinId) => {
    setWin((w) => ({ ...w, [id]: "closed" }));
    setFocused((f) => (f === id ? null : f));
  }, []);
  const minWin = useCallback((id: WinId) => {
    setWin((w) => ({ ...w, [id]: "min" }));
    setFocused((f) => (f === id ? null : f));
  }, []);

  /** taskbar pill: restore if minimised, minimise if focused, else raise */
  const taskbarClick = useCallback(
    (id: WinId) => {
      if (win[id] === "closed") {
        setWin((w) => ({ ...w, [id]: "open" }));
        setFocused(id);
      } else if (win[id] === "min") {
        setWin((w) => ({ ...w, [id]: "open" }));
        setFocused(id);
      } else if (focused === id) {
        setWin((w) => ({ ...w, [id]: "min" }));
        setFocused(null);
      } else setFocused(id);
    },
    [win, focused]
  );

  /* ---------------- guarded actions ---------------- */
  const actClip = useCallback(
    (verb: string) => {
      clearHint("clipboard");
      if (on.clipboard) {
        notify({
          tone: "deny",
          Ico: Clipboard,
          title: `${verb} blocked by administrator`,
          sub: "InstaSafe DLP · Notepad",
        });
      } else {
        notify({ tone: "info", Ico: Clipboard, title: `${verb} to clipboard`, sub: "3 rows" });
      }
    },
    [on.clipboard, notify, clearHint]
  );

  const browserAct = useCallback(
    (label: string, Ico: Icon) => {
      clearHint("chrome");
      if (win.browser !== "open") openWin("browser");
      if (on.chrome) {
        notify({ tone: "deny", Ico, title: `${label} blocked by administrator`, sub: "Chrome control" });
      } else {
        notify({ tone: "info", Ico, title: `${label} allowed`, sub: HOST_PORTAL });
      }
    },
    [win.browser, on.chrome, notify, openWin, clearHint]
  );

  const goHost = useCallback(
    (host: string) => {
      clearHint("network");
      if (win.browser !== "open") openWin("browser");
      if (host === HOST_DENY && on.network) {
        setDenied(true);
        setPage("drive");
        notify({ tone: "deny", Ico: WifiHigh, title: `${host} denied`, sub: "net_filter · grp-finance" });
        return;
      }
      setDenied(false);
      setPage(host === HOST_DENY ? "drive" : "portal");
      notify({ tone: "info", Ico: WifiHigh, title: `${host} loaded`, sub: "session route" });
    },
    [win.browser, on.network, notify, openWin, clearHint]
  );

  const actAnyDesk = useCallback(() => {
    clearHint("app");
    if (on.app) {
      notify({ tone: "deny", Ico: Monitor, title: "anydesk.exe blocked by administrator", sub: "Application filter" });
    } else {
      notify({ tone: "info", Ico: Monitor, title: "Launching anydesk.exe", sub: "Remote access tool" });
    }
  }, [on.app, notify, clearHint]);

  const actAgent = useCallback(() => {
    const n = Object.values(on).filter(Boolean).length;
    notify({
      tone: "info",
      Ico: ShieldCheck,
      title: "InstaSafe agent · connected",
      sub: n > 0 ? `enforcing ${n} ${n === 1 ? "policy" : "policies"}` : "session governed · no controls on",
    });
  }, [on, notify]);

  const restart = useCallback(() => {
    setLocked(false);
    setLeft(IDLE_SECONDS);
  }, []);

  const activeCount = Object.values(on).filter(Boolean).length;
  const zOf = (id: WinId) => (focused === id ? 22 : 12);

  const hint = hintFor ? hintOf(hintFor, win) : null;
  const pulse: HintTarget = hint ? hint.target : "none";
  const pu = (t: HintTarget) => (pulse === t ? " is-pulse" : "");

  /* the omnibox splits domain from path so the domain can be the dark
     half, which is the one thing everyone recognises about Chrome's
     address bar */
  const urlHost = page === "drive" ? HOST_DENY : HOST_PORTAL;
  const urlPath = page === "drive" ? "/upload" : "/apps";
  const showDeny = denied && on.network;

  return (
    <div className={`eps-shell${still ? " is-still" : ""}`} onPointerDownCapture={touched} onKeyDownCapture={touched}>
      {/* ==================== the admin console ==================== */}
      <div className="eps-rail">
        <div className="eps-railhead">
          <span className="eps-railttl">
            <LockSimple size={11} weight="bold" aria-hidden="true" />
            Admin console
          </span>
          <span className={`eps-count${activeCount ? " live" : ""}`}>{activeCount} active</span>
        </div>

        {GROUPS.map((g) => (
          <div className="eps-group" key={g.key}>
            <p className="eps-grouplab">{g.label}</p>
            {CONTROLS.filter((c) => c.group === g.key).map((c) => {
              const isOn = on[c.id];
              const I = c.Ico;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`eps-ctl${isOn ? " on" : ""}`}
                  aria-pressed={isOn}
                  onClick={() => toggle(c.id)}
                >
                  <span className="eps-ctl-ic">
                    <I size={15} weight="regular" aria-hidden="true" />
                  </span>
                  <span className="eps-ctl-tx">
                    <b>{c.name}</b>
                    <em>{c.desc}</em>
                  </span>
                  <span className="eps-sw" aria-hidden="true">
                    <i />
                  </span>
                </button>
              );
            })}
          </div>
        ))}

        <p className="eps-railfoot">Every one of these decisions is one of 202 logged event types.</p>
      </div>

      {/* ==================== the desktop ==================== */}
      <div className="eps-stagewrap">
        <div className="eps-screen">
          <span className="eps-wall" aria-hidden="true" />

          {/* ---------- desktop icons ---------- */}
          <div className="eps-icons">
            <button type="button" className="eps-di" onClick={actAgent}>
              <span className="eps-di-tile eps-di-tile--brand">
                <AppIcon src={APP.brand} size={22} />
              </span>
              <span className="eps-di-l">InstaSafe</span>
            </button>
            <button type="button" className={`eps-di${pu("di-notepad")}`} onClick={() => openWin("notepad")}>
              <span className="eps-di-tile">
                <AppIcon src={APP.notepad} size={30} />
              </span>
              <span className="eps-di-l">Q3-vendors</span>
            </button>
            <button type="button" className={`eps-di${pu("di-chrome")}`} onClick={() => openWin("browser")}>
              <span className="eps-di-tile">
                <AppIcon src={APP.chrome} size={30} />
              </span>
              <span className="eps-di-l">Chrome</span>
            </button>
            <button
              type="button"
              className={`eps-di${on.app ? " is-blocked" : ""}${pu("di-anydesk")}`}
              onDoubleClick={actAnyDesk}
              onClick={actAnyDesk}
            >
              <span className="eps-di-tile">
                <AppIcon src={APP.anydesk} size={30} />
                {on.app ? (
                  <b className="eps-di-lock" aria-hidden="true">
                    <LockSimple size={8} weight="fill" />
                  </b>
                ) : null}
              </span>
              <span className="eps-di-l">anydesk.exe</span>
            </button>
          </div>

          {/* ---------- the idle chip ---------- */}
          {on.idle && !locked ? (
            <span className={`eps-idlechip${pu("idle-chip")}`}>
              <Timer size={11} weight="bold" aria-hidden="true" />
              idle {left}s
              <em>demo speed · policy is 15 min</em>
            </span>
          ) : null}

          {/* ==================== NOTEPAD (Windows 11) ==================== */}
          {win.notepad !== "closed" && (
            <div
              className={`eps-win eps-win--note${win.notepad === "min" ? " is-min" : ""}`}
              style={{ zIndex: zOf("notepad") }}
              onPointerDown={() => setFocused("notepad")}
            >
              <div className="eps-w11bar">
                <AppIcon src={APP.notepad} size={14} />
                <span className="eps-w11ttl">Q3-vendors.txt - Notepad</span>
                <span className="eps-w11wc">
                  <button type="button" aria-label="Minimise Notepad" onClick={() => minWin("notepad")}>
                    <Minus size={11} weight="bold" aria-hidden="true" />
                  </button>
                  <span aria-hidden="true">
                    <Square size={9} weight="regular" />
                  </span>
                  <button type="button" className="x" aria-label="Close Notepad" onClick={() => closeWin("notepad")}>
                    <X size={11} weight="bold" aria-hidden="true" />
                  </button>
                </span>
              </div>
              <div className="eps-w11menu" aria-hidden="true">
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
              </div>
              <div className="eps-tools">
                <button type="button" className={pu("npd-copy").trim()} onClick={() => actClip("Copy")}>
                  Copy
                </button>
                <button type="button" onClick={() => actClip("Cut")}>
                  Cut
                </button>
                <button type="button" onClick={() => actClip("Paste")}>
                  Paste
                </button>
              </div>
              <div className="eps-note">
                <p className="eps-note-h">Q3 VENDOR PAYMENT SCHEDULE · CONFIDENTIAL</p>
                {NOTE_ROWS.map((r) => (
                  <p key={r[1]}>
                    <span>{r[0]}</span>
                    <i>{r[1]}</i>
                    <b>₹{r[2]}</b>
                  </p>
                ))}
                <p className="eps-note-sel">Internal only. Do not distribute.</p>
              </div>
            </div>
          )}

          {/* ==================== FILE EXPLORER ====================
              Not a control surface — it is here because a Windows
              desktop with nothing pinned but a browser is not a
              Windows desktop. It opens, it moves, it closes. */}
          {win.explorer !== "closed" && (
            <div
              className={`eps-win eps-win--exp${win.explorer === "min" ? " is-min" : ""}`}
              style={{ zIndex: zOf("explorer") }}
              onPointerDown={() => setFocused("explorer")}
            >
              <div className="eps-w11bar">
                <AppIcon src={APP.explorer} size={14} />
                <span className="eps-w11ttl">Q3-reports</span>
                <span className="eps-w11wc">
                  <button type="button" aria-label="Minimise File Explorer" onClick={() => minWin("explorer")}>
                    <Minus size={11} weight="bold" aria-hidden="true" />
                  </button>
                  <span aria-hidden="true">
                    <Square size={9} weight="regular" />
                  </span>
                  <button
                    type="button"
                    className="x"
                    aria-label="Close File Explorer"
                    onClick={() => closeWin("explorer")}
                  >
                    <X size={11} weight="bold" aria-hidden="true" />
                  </button>
                </span>
              </div>
              <div className="eps-exp-crumb" aria-hidden="true">
                <Folder size={10} weight="fill" />
                This PC <i>›</i> Documents <i>›</i> <b>Q3-reports</b>
              </div>
              <div className="eps-exp-body">
                <div className="eps-exp-rail" aria-hidden="true">
                  <p>Quick access</p>
                  <span>
                    <Desktop size={11} weight="regular" />
                    Desktop
                  </span>
                  <span>
                    <DownloadSimple size={11} weight="regular" />
                    Downloads
                  </span>
                  <span>
                    <Folder size={11} weight="regular" />
                    Documents
                  </span>
                  <span className="on">
                    <Folder size={11} weight="fill" />
                    Q3-reports
                  </span>
                </div>
                <div className="eps-exp-list" aria-hidden="true">
                  <span className="eps-exp-hd">
                    <i>Name</i>
                    <em>Date modified</em>
                  </span>
                  <span>
                    <Folder size={12} weight="fill" />
                    <i>Documents</i>
                    <em>14-08-2026</em>
                  </span>
                  <span>
                    <Folder size={12} weight="fill" />
                    <i>Downloads</i>
                    <em>17-08-2026</em>
                  </span>
                  <span>
                    <Folder size={12} weight="fill" />
                    <i>Q3-reports</i>
                    <em>18-08-2026</em>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== CHROME (Windows) ====================
              Tab strip, window controls, toolbar, omnibox, bookmarks
              bar, page. The bookmarks bar is the network filter's
              interaction surface — clicking a bookmark is what a
              person actually does, and it is what the hint points at. */}
          {win.browser !== "closed" && (
            <div
              className={`eps-win eps-win--chrome${win.browser === "min" ? " is-min" : ""}${maxed ? " is-max" : ""}`}
              style={{ zIndex: zOf("browser") }}
              onPointerDown={() => setFocused("browser")}
            >
              {/* ---- tab strip ---- */}
              <div className="eps-crm-tabs">
                <span className="eps-crm-tab">
                  {/* the favicon is the brand mark because the tab IS the
                      portal — but a tab that failed to resolve has no
                      favicon to show, and Chrome falls back to its grey
                      globe. Keeping our mark on a dead tab was the one
                      place the depiction was flattering itself. */}
                  {showDeny ? (
                    <Globe size={11} weight="regular" aria-hidden="true" className="eps-crm-fav" />
                  ) : (
                    <AppIcon src={APP.brand} size={12} />
                  )}
                  <b>{page === "drive" ? "Personal Drive" : "InstaSafe Portal"}</b>
                  <button type="button" className="eps-crm-tabx" aria-label="Close tab" onClick={() => closeWin("browser")}>
                    <X size={8} weight="bold" aria-hidden="true" />
                  </button>
                </span>
                <button
                  type="button"
                  className="eps-crm-new"
                  aria-label="New tab"
                  onClick={() => {
                    setPage("portal");
                    setDenied(false);
                  }}
                >
                  <Plus size={10} weight="bold" aria-hidden="true" />
                </button>
                <span className="eps-crm-wc">
                  <button type="button" aria-label="Minimise Chrome" onClick={() => minWin("browser")}>
                    <Minus size={10} weight="bold" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label={maxed ? "Restore Chrome" : "Maximise Chrome"}
                    aria-pressed={maxed}
                    onClick={() => setMaxed((m) => !m)}
                  >
                    <Square size={9} weight="regular" aria-hidden="true" />
                  </button>
                  <button type="button" className="x" aria-label="Close Chrome" onClick={() => closeWin("browser")}>
                    <X size={10} weight="bold" aria-hidden="true" />
                  </button>
                </span>
              </div>

              {/* ---- toolbar ---- */}
              <div className="eps-crm-bar">
                <button
                  type="button"
                  className="eps-crm-nb"
                  aria-label="Back"
                  onClick={() => {
                    setPage("portal");
                    setDenied(false);
                  }}
                >
                  <CaretLeft size={12} weight="bold" aria-hidden="true" />
                </button>
                <span className="eps-crm-nb is-off" aria-hidden="true">
                  <CaretRight size={12} weight="bold" />
                </span>
                <button type="button" className="eps-crm-nb" aria-label="Reload" onClick={() => goHost(urlHost)}>
                  <ArrowClockwise size={11} weight="bold" aria-hidden="true" />
                </button>

                <span className="eps-crm-omni">
                  {/* padlock means a TLS handshake happened. On a name
                      that never resolved there was no connection to
                      secure, and Chrome shows its circle-i instead —
                      the small tell that separates a drawing of a
                      browser from a browser. */}
                  {showDeny ? (
                    <Info size={10} weight="regular" aria-hidden="true" />
                  ) : (
                    <LockSimple size={9} weight="fill" aria-hidden="true" />
                  )}
                  <span className="eps-crm-url">
                    <b>{urlHost}</b>
                    {urlPath}
                  </span>
                  <Star size={10} weight="regular" aria-hidden="true" />
                </span>

                <span className={`eps-crm-tools${pu("crm-tools")}`}>
                  <button type="button" aria-label="Download this page" onClick={() => browserAct("Download", DownloadSimple)}>
                    <DownloadSimple size={12} weight="regular" aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Print this page" onClick={() => browserAct("Print", Printer)}>
                    <Printer size={12} weight="regular" aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Open developer tools" onClick={() => browserAct("DevTools", Code)}>
                    <Code size={12} weight="regular" aria-hidden="true" />
                  </button>
                </span>

                <span className="eps-crm-ext" aria-hidden="true">
                  <PuzzlePiece size={12} weight="regular" />
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="eps-crm-av"
                  src="/people/sophia-s-256.webp"
                  width={22}
                  height={22}
                  alt=""
                  aria-hidden="true"
                />
                <span className="eps-crm-kebab" aria-hidden="true">
                  <DotsThreeVertical size={13} weight="bold" />
                </span>
              </div>

              {/* ---- bookmarks bar ---- */}
              <div className="eps-crm-bm">
                <button
                  type="button"
                  className={`eps-bm${showDeny ? " is-denied" : ""}${pu("bm-deny")}`}
                  onClick={() => goHost(HOST_DENY)}
                >
                  <HardDrives size={11} weight="regular" aria-hidden="true" />
                  {HOST_DENY}
                </button>
                <button type="button" className="eps-bm" onClick={() => goHost(HOST_ALLOW)}>
                  <Folder size={11} weight="fill" aria-hidden="true" />
                  {HOST_ALLOW}
                </button>
              </div>

              {/* ---- page ---- */}
              <div className="eps-crm-page">
                {showDeny ? (
                  <div className="eps-err">
                    <span className="eps-err-ic" aria-hidden="true">
                      <Prohibit size={22} weight="regular" />
                    </span>
                    <p className="eps-err-h">This site can’t be reached</p>
                    <p className="eps-err-p">
                      <b>{HOST_DENY}</b>’s DNS address could not be found.
                    </p>
                    <p className="eps-err-c">ERR_NAME_NOT_RESOLVED · net_filter · grp-finance</p>
                  </div>
                ) : page === "drive" ? (
                  <>
                    <p className="eps-page-h">Personal drive — upload</p>
                    <div className="eps-page-r">Drop files here to share outside the company</div>
                    <p className="eps-page-n">no filter on this session</p>
                  </>
                ) : (
                  <>
                    <p className="eps-page-h">Application catalogue</p>
                    <div className="eps-page-r">SAP ERP · Payroll · CRM</div>
                    <div className="eps-page-r">Finance vault · HR records</div>
                    <p className="eps-page-n">secured by InstaSafe ZTNA</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ---------- the hint chip ----------
              role=status so the instruction is heard, not only seen. */}
          <div className="eps-hintbox" role="status" aria-live="polite">
            {hint ? (
              <span className="eps-hintchip">
                {hint.dir === "ul" ? (
                  <ArrowUpLeft size={11} weight="bold" aria-hidden="true" />
                ) : hint.dir === "ur" ? (
                  <ArrowUpRight size={11} weight="bold" aria-hidden="true" />
                ) : (
                  <Drop size={11} weight="bold" aria-hidden="true" />
                )}
                {hint.text}
              </span>
            ) : null}
          </div>

          {/* ---------- taskbar ---------- */}
          <div className="eps-taskbar">
            <div className="eps-tbc">
              <button type="button" className="eps-tbtn eps-tbtn--pin" onClick={actAgent} aria-label="InstaSafe agent">
                <AppIcon src={APP.brand} size={15} />
              </button>
              <button
                type="button"
                className={`eps-tbtn${win.explorer !== "closed" ? " run" : ""}${
                  focused === "explorer" && win.explorer === "open" ? " active" : ""
                }`}
                aria-label="File Explorer"
                aria-pressed={focused === "explorer" && win.explorer === "open"}
                onClick={() => taskbarClick("explorer")}
              >
                <AppIcon src={APP.explorer} size={17} />
              </button>
              <button
                type="button"
                className={`eps-tbtn${win.browser !== "closed" ? " run" : ""}${
                  focused === "browser" && win.browser === "open" ? " active" : ""
                }`}
                aria-label="Google Chrome"
                aria-pressed={focused === "browser" && win.browser === "open"}
                onClick={() => taskbarClick("browser")}
              >
                <AppIcon src={APP.chrome} size={17} />
              </button>
              {win.notepad !== "closed" && (
                <button
                  type="button"
                  className={`eps-tbtn run${focused === "notepad" && win.notepad === "open" ? " active" : ""}`}
                  aria-label="Notepad"
                  aria-pressed={focused === "notepad" && win.notepad === "open"}
                  onClick={() => taskbarClick("notepad")}
                >
                  <AppIcon src={APP.notepad} size={17} />
                </button>
              )}
            </div>
            <div className="eps-tray">
              <span className={`eps-trayi${on.network ? " on" : ""}`} aria-hidden="true">
                <WifiHigh size={12} weight="regular" />
              </span>
              <span className={`eps-trayi${activeCount ? " on" : ""}`} aria-hidden="true">
                <ShieldCheck size={12} weight="regular" />
              </span>
              <span className="eps-clock">
                <b>10:42</b>
                <em>18-08-2026</em>
              </span>
            </div>
          </div>

          {/* ---------- watermark: composes over desktop AND windows ---------- */}
          {on.watermark && (
            <div className="eps-wm" aria-hidden="true">
              <div className="eps-wm-grid">
                {WM_TILES.map((i) => (
                  <span key={i}>{WM_LINE}</span>
                ))}
              </div>
            </div>
          )}

          {/* ---------- the closed session ---------- */}
          <div className={`eps-lock${locked ? " on" : ""}`} aria-hidden={!locked}>
            <span className="eps-lock-mark" aria-hidden="true">
              <AppIcon src={APP.brand} size={30} />
            </span>
            <p>Session closed — 15 min idle</p>
            <button type="button" className="eps-restart" onClick={restart} tabIndex={locked ? 0 : -1}>
              <ArrowCounterClockwise size={13} weight="bold" aria-hidden="true" />
              Restart session
            </button>
          </div>

          {/* ---------- the toast ---------- */}
          <div className="eps-toastbox" role="status" aria-live="polite">
            {toast ? <ToastRow key={toast.key} t={toast} /> : null}
          </div>
        </div>

        <p className="eps-hint">
          Flip a control on the left and the desktop tells you what to try next — the hint names the action and the
          target pulses. Controls stack: watermarking stays on while the clipboard is refused and a domain is denied.
        </p>
      </div>
    </div>
  );
}

function ToastRow({ t }: { t: ToastData }) {
  const I = t.Ico;
  return (
    <div className={`eps-toast ${t.tone}`}>
      <span className="eps-toast-ic">
        {t.tone === "deny" ? <Prohibit size={14} weight="bold" /> : <Check size={14} weight="bold" />}
      </span>
      <span className="eps-toast-tx">
        <b>{t.title}</b>
        <em>
          <I size={10} weight="regular" aria-hidden="true" />
          {t.sub}
        </em>
      </span>
    </div>
  );
}

export default EndpointSim;
