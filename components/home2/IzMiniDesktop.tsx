"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FileText, GlobeSimple, Monitor, Usb, Selection, Prohibit, Check,
  MagnifyingGlass, FolderSimple, EnvelopeSimple, SquaresFour, Code,
  DownloadSimple, Printer, type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   IzMiniDesktop — one fake Windows desktop that every control in
   the surface drives.

   Ported from the sales deck's S09 endpoint sim, with the control
   inverted: the deck is presenter-driven (toggle a switch, click
   the desktop), a marketing page has nobody to drive it. So each
   control here is a SCRIPT — a list of timed state patches — and
   the section plays the active one on a loop.

   The desktop itself never changes: same wallpaper, same taskbar,
   the InstaSafe agent always running. Only what happens on top of
   it changes. That constancy is the argument — it is one endpoint
   under one agent, not six unrelated screenshots.

   A visible cursor is not decoration. Without it, windows opening
   and menus appearing on their own read as a glitchy carousel; with
   it, the viewer follows a person doing something and getting
   stopped. Everything is inert markup — no real clipboard, capture
   or process API is touched.
   ============================================================ */

/* ---------- state the script can patch ---------- */
export type SimState = {
  /** the InstaSafe agent tile in the tray is always present; `connected`
      just controls whether it has announced itself this cycle */
  connected: boolean;
  watermark: boolean;
  notepad: boolean;
  chrome: boolean;
  /** notepad text selected → highlighted */
  selection: boolean;
  /** right-click context menu over the selection */
  ctxMenu: boolean;
  /** snip overlay: 0 = absent, 0..1 = rectangle being dragged */
  snip: number;
  /** white capture flash */
  flash: boolean;
  /** the saved-black-frame thumbnail */
  blackShot: boolean;
  /** which chrome action is being attempted */
  chromeAct: "devtools" | "download" | "print" | null;
  /** usb tray flyout */
  usb: boolean;
  /** anydesk double-click ripple */
  anydesk: boolean;
  cursor: { x: number; y: number } | null;
  /** click pulse at the cursor */
  click: boolean;
  toast: { tone: "info" | "danger"; title: string; sub: string } | null;
};

const BLANK: SimState = {
  connected: false, watermark: false, notepad: false, chrome: false,
  selection: false, ctxMenu: false, snip: 0, flash: false, blackShot: false,
  chromeAct: null, usb: false, anydesk: false, cursor: null, click: false, toast: null,
};

export type Step = { t: number; s: Partial<SimState> };
export type Script = { id: string; steps: Step[]; duration: number };

/* ---------- coordinates, in % of the screen ----------
   Named so a step reads as an intention ("move to the tray") rather
   than as two magic numbers. */
const AT = {
  agent: { x: 8, y: 12 },
  notepad: { x: 8, y: 46 },
  chrome: { x: 8, y: 63 },
  anydesk: { x: 8, y: 80 },
  noteText: { x: 46, y: 58 },
  noteCopy: { x: 55, y: 66 },
  omniDev: { x: 74, y: 34 },
  omniDl: { x: 80, y: 34 },
  omniPrint: { x: 86, y: 34 },
  trayUsb: { x: 88, y: 93 },
  traySnip: { x: 94, y: 93 },
  snipStart: { x: 30, y: 30 },
  snipEnd: { x: 78, y: 74 },
};

const CONNECT: Step[] = [
  { t: 0, s: { cursor: AT.agent } },
  { t: 500, s: { click: true } },
  { t: 640, s: { click: false, connected: true } },
  { t: 900, s: { toast: { tone: "info", title: "InstaSafe Agent · Connected", sub: "Always-on tunnel · device posture verified" } } },
  { t: 2200, s: { toast: null } },
];

/* ---------- the six endpoint scripts ---------- */
export const SCRIPTS: Record<string, Script> = {
  watermark: {
    id: "watermark",
    duration: 6200,
    steps: [
      ...CONNECT,
      { t: 2400, s: { watermark: true } },
      { t: 2700, s: { toast: { tone: "info", title: "Watermark applied to this session", sub: "user · device · IP · timestamp" } } },
      { t: 5200, s: { toast: null } },
    ],
  },

  clipboard: {
    id: "clipboard",
    duration: 9800,
    steps: [
      ...CONNECT,
      { t: 2400, s: { cursor: AT.notepad } },
      { t: 2900, s: { click: true } },
      { t: 3040, s: { click: false, notepad: true } },
      { t: 3800, s: { cursor: AT.noteText } },
      { t: 4400, s: { selection: true } },
      { t: 5000, s: { ctxMenu: true } },
      { t: 5900, s: { cursor: AT.noteCopy } },
      { t: 6500, s: { click: true } },
      { t: 6640, s: { click: false, ctxMenu: false } },
      { t: 6800, s: { toast: { tone: "danger", title: "Clipboard access blocked by administrator", sub: "InstaSafe DLP · Notepad" } } },
      { t: 9200, s: { toast: null } },
    ],
  },

  screenshot: {
    id: "screenshot",
    duration: 9400,
    steps: [
      ...CONNECT,
      { t: 2400, s: { cursor: AT.traySnip } },
      { t: 3000, s: { click: true } },
      { t: 3140, s: { click: false, snip: 0.001 } },
      { t: 3500, s: { cursor: AT.snipStart } },
      { t: 4100, s: { snip: 0.3 } },
      { t: 4500, s: { snip: 0.65 } },
      { t: 4900, s: { snip: 1, cursor: AT.snipEnd } },
      { t: 5400, s: { flash: true, snip: 0 } },
      { t: 5700, s: { flash: false, blackShot: true } },
      { t: 6000, s: { toast: { tone: "danger", title: "Screen capture blocked by administrator", sub: "Saved frame is blank · InstaSafe DLP" } } },
      { t: 8800, s: { toast: null } },
    ],
  },

  chrome: {
    id: "chrome",
    duration: 13400,
    steps: [
      ...CONNECT,
      { t: 2400, s: { cursor: AT.chrome } },
      { t: 2900, s: { click: true } },
      { t: 3040, s: { click: false, chrome: true } },
      // case 1 — dev tools
      { t: 3900, s: { cursor: AT.omniDev } },
      { t: 4400, s: { click: true, chromeAct: "devtools" } },
      { t: 4540, s: { click: false } },
      { t: 4700, s: { toast: { tone: "danger", title: "DevTools blocked by administrator", sub: "Chrome Controls · portal.instasafe.com" } } },
      { t: 6600, s: { toast: null, chromeAct: null } },
      // case 2 — download
      { t: 7000, s: { cursor: AT.omniDl } },
      { t: 7500, s: { click: true, chromeAct: "download" } },
      { t: 7640, s: { click: false } },
      { t: 7800, s: { toast: { tone: "danger", title: "Download blocked by administrator", sub: "q3-summary.pdf · Chrome Controls" } } },
      { t: 9700, s: { toast: null, chromeAct: null } },
      // case 3 — print
      { t: 10100, s: { cursor: AT.omniPrint } },
      { t: 10600, s: { click: true, chromeAct: "print" } },
      { t: 10740, s: { click: false } },
      { t: 10900, s: { toast: { tone: "danger", title: "Print and print preview blocked", sub: "Chrome Controls · InstaSafe DLP" } } },
      { t: 12900, s: { toast: null, chromeAct: null } },
    ],
  },

  usb: {
    id: "usb",
    duration: 7600,
    steps: [
      ...CONNECT,
      { t: 2400, s: { cursor: AT.trayUsb } },
      { t: 3000, s: { click: true } },
      { t: 3140, s: { click: false, usb: true } },
      { t: 3900, s: { toast: { tone: "danger", title: "Removable storage blocked", sub: "Kingston DataTraveler 32GB denied by policy" } } },
      { t: 6800, s: { toast: null, usb: false } },
    ],
  },

  app: {
    id: "app",
    duration: 7800,
    steps: [
      ...CONNECT,
      { t: 2400, s: { cursor: AT.anydesk } },
      { t: 3000, s: { click: true } },
      { t: 3140, s: { click: false } },
      { t: 3320, s: { click: true } },
      { t: 3460, s: { click: false, anydesk: true } },
      { t: 4000, s: { toast: { tone: "danger", title: "anydesk.exe has been restricted by administrator", sub: "Application Restriction" } } },
      { t: 7000, s: { toast: null, anydesk: false } },
    ],
  },

  /* Contextual-access controls share one script until their own
     choreography is specified: the agent connects, the policy engine
     answers, and the verdict lands as a toast. The per-control verdict
     text is injected by the caller. */
  context: {
    id: "context",
    duration: 6400,
    steps: [
      ...CONNECT,
      { t: 2400, s: { toast: { tone: "info", title: "Evaluating session context", sub: "posture · geography · network · time" } } },
      { t: 4200, s: { toast: null } },
    ],
  },
};

const WM_LINE = "Alen Joseph · alen.joseph · 10.24.8.101 · 2026-07-19 10:42";

type Props = {
  /** which script to play */
  scriptId: string;
  /** replaces the script's final toast — used by contextual controls */
  verdict?: { tone: "info" | "danger"; title: string; sub: string } | null;
  /** driven by the parent's transport — prev · play/pause · next */
  playing: boolean;
  /** bump to replay the script from the top WITHOUT remounting */
  cycle: number;
  /** fires when the script reaches its end, so the parent can loop */
  onEnd: () => void;
};

export function IzMiniDesktop({ scriptId, verdict, playing, cycle, onEnd }: Props) {
  const script = SCRIPTS[scriptId] ?? SCRIPTS.context;
  const [st, setSt] = useState<SimState>(BLANK);
  const timers = useRef<number[]>([]);

  /* The script is replayed from scratch whenever the control or the
     play state changes. Pausing freezes the frame rather than
     rewinding — a paused demo that jumps back to a blank desktop
     tells the viewer nothing about what they just paused. */
  const steps = useMemo(() => {
    if (!verdict) return script.steps;
    // swap the last toast-bearing step's payload for the control's verdict
    const out = script.steps.map((s) => ({ ...s, s: { ...s.s } }));
    for (let i = out.length - 1; i >= 0; i--) {
      if (out[i].s.toast) { out[i].s.toast = verdict; break; }
    }
    return out;
  }, [script, verdict]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!playing) return;

    setSt(BLANK);
    steps.forEach(({ t, s }) => {
      timers.current.push(window.setTimeout(() => setSt((p) => ({ ...p, ...s })), t));
    });
    timers.current.push(window.setTimeout(onEnd, script.duration));

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    /* `cycle` is the replay trigger. It is in the dep list precisely so
       a loop restarts the timeline in place — the component must NOT be
       remounted for that, because unmounting drops the screen out of
       layout for a frame and the whole section jumps. */
  }, [steps, script.duration, playing, onEnd, scriptId, cycle]);

  return (
    <div className="izmd">
      <div className="izmd-screen">
        {/* wallpaper — smooth blooms, same frame every scenario */}
        <div className="izmd-wall" aria-hidden="true">
          <span className="izmd-bloom b1" />
          <span className="izmd-bloom b2" />
          <span className="izmd-bloom b3" />
          <span className="izmd-arc" />
        </div>

        {/* desktop icons */}
        <div className="izmd-icons">
          {/* the only white tile on the desktop — our app is the one thing
              here that is meant to be found immediately */}
          <DeskIcon label="InstaSafe" brand active={st.connected} />
          <DeskIcon label="This PC" icon={Monitor} />
          <DeskIcon label="Notepad" icon={FileText} />
          <DeskIcon label="Chrome" icon={GlobeSimple} />
          <DeskIcon label="AnyDesk" icon={SquaresFour} blocked={st.anydesk} />
        </div>

        {/* notepad */}
        {st.notepad && (
          <div className="izmd-win izmd-notepad">
            <WinBar icon={FileText} title="Q3-summary.txt — Notepad" />
            <div className="izmd-note">
              <p className="h">Q3 FINANCIAL SUMMARY · CONFIDENTIAL</p>
              <p>Net revenue: 42.6 Cr</p>
              <p>Enterprise pipeline: 128 accounts</p>
              <p className={st.selection ? "sel on" : "sel"}>Internal only. Do not distribute.</p>
            </div>
            {st.ctxMenu && (
              <div className="izmd-ctx">
                <span className="izmd-ctx-i hot">Copy</span>
                <span className="izmd-ctx-i">Cut</span>
                <span className="izmd-ctx-i">Paste</span>
                <span className="izmd-ctx-sep" />
                <span className="izmd-ctx-i">Select all</span>
              </div>
            )}
          </div>
        )}

        {/* chrome */}
        {st.chrome && (
          <div className="izmd-win izmd-chrome">
            <WinBar icon={GlobeSimple} title="InstaSafe Portal — Chrome" />
            <div className="izmd-omni">
              <span className="izmd-url">portal.instasafe.com</span>
              <span className="izmd-omni-acts">
                <OmniBtn icon={Code} on={st.chromeAct === "devtools"} />
                <OmniBtn icon={DownloadSimple} on={st.chromeAct === "download"} />
                <OmniBtn icon={Printer} on={st.chromeAct === "print"} />
              </span>
            </div>
            <div className="izmd-page">
              <p className="h">Application catalogue</p>
              <span className="r" />
              <span className="r short" />
              <span className="r" />
            </div>
          </div>
        )}

        {/* snip rectangle */}
        {st.snip > 0 && (
          <>
            <div className="izmd-snipdim" aria-hidden="true" />
            <div
              className="izmd-sniprect"
              aria-hidden="true"
              style={{ ["--izmd-p" as string]: `${st.snip}` }}
            />
          </>
        )}

        {/* saved black frame */}
        {st.blackShot && (
          <div className="izmd-shot">
            <span className="izmd-shot-frame" aria-hidden="true" />
            <span className="izmd-shot-cap">Snip 2026-07-19.png</span>
          </div>
        )}

        {/* usb flyout */}
        {st.usb && (
          <div className="izmd-fly">
            <Usb weight="bold" aria-hidden="true" />
            <span>Removable drive detected</span>
          </div>
        )}

        {/* watermark composes over everything below the taskbar layer */}
        {st.watermark && (
          <div className="izmd-wm" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i}>{WM_LINE}</span>
            ))}
          </div>
        )}

        {/* taskbar */}
        <div className="izmd-taskbar">
          <span className="izmd-tb-center">
            <span className="izmd-tb-btn start"><SquaresFour weight="fill" aria-hidden="true" /></span>
            <span className="izmd-tb-btn"><MagnifyingGlass aria-hidden="true" /></span>
            <span className="izmd-tb-btn"><FolderSimple aria-hidden="true" /></span>
            <span className="izmd-tb-btn"><EnvelopeSimple aria-hidden="true" /></span>
            {/* the agent is pinned and always running — that is the point, so
                it wears the real mark rather than a generic shield glyph */}
            <span className={st.connected ? "izmd-tb-btn agent on" : "izmd-tb-btn agent"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/instasafe-mark-color.svg" alt="" aria-hidden="true" />
            </span>
            {st.notepad && <span className="izmd-tb-btn run"><FileText aria-hidden="true" /></span>}
            {st.chrome && <span className="izmd-tb-btn run"><GlobeSimple aria-hidden="true" /></span>}
          </span>
          <span className="izmd-tray">
            <span className={st.usb ? "izmd-tb-btn hot" : "izmd-tb-btn"}><Usb aria-hidden="true" /></span>
            <span className={st.snip > 0 ? "izmd-tb-btn hot" : "izmd-tb-btn"}><Selection aria-hidden="true" /></span>
          </span>
          <span className="izmd-clock">
            <b>10:42</b>
            <span>19-07-2026</span>
          </span>
        </div>

        {/* capture flash */}
        <div className={st.flash ? "izmd-flash on" : "izmd-flash"} aria-hidden="true" />

        {/* toast */}
        <div className={st.toast ? "izmd-toast on" : "izmd-toast"} role="status" aria-live="polite">
          {st.toast && (
            <>
              <span className={st.toast.tone === "danger" ? "izmd-toast-i danger" : "izmd-toast-i"}>
                {st.toast.tone === "danger" ? <Prohibit weight="bold" /> : <Check weight="bold" />}
              </span>
              <span className="izmd-toast-t">
                <b>{st.toast.title}</b>
                <span>{st.toast.sub}</span>
              </span>
            </>
          )}
        </div>

        {/* the pointer */}
        {st.cursor && (
          <span
            className={st.click ? "izmd-cursor click" : "izmd-cursor"}
            aria-hidden="true"
            style={{ left: `${st.cursor.x}%`, top: `${st.cursor.y}%` }}
          >
            <svg viewBox="0 0 12 18"><path d="M1 1l10 8-4.6.6L9 15.6l-2 .9-2.6-6L1 13z" /></svg>
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- small parts ---------- */

function DeskIcon({ label, icon: I, brand, blocked, active }: { label: string; icon?: Icon; brand?: boolean; blocked?: boolean; active?: boolean }) {
  return (
    <span className={`izmd-di${blocked ? " blocked" : ""}${active ? " active" : ""}`}>
      <span className="izmd-di-i">
        {brand ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/brand/instasafe-mark-color.svg" alt="" />
        ) : I ? (
          <I weight="regular" aria-hidden="true" />
        ) : null}
      </span>
      <span className="izmd-di-l">{label}</span>
    </span>
  );
}

function WinBar({ icon: I, title }: { icon: Icon; title: string }) {
  return (
    <span className="izmd-winbar">
      <I weight="regular" aria-hidden="true" />
      <span>{title}</span>
      <span className="izmd-winbtns" aria-hidden="true">
        <i />
        <i />
        <i className="x" />
      </span>
    </span>
  );
}

function OmniBtn({ icon: I, on }: { icon: Icon; on: boolean }) {
  return (
    <span className={on ? "izmd-omni-b on" : "izmd-omni-b"}>
      <I weight="regular" aria-hidden="true" />
    </span>
  );
}
