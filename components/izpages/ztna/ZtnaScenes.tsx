"use client";

import { LogoMark } from "@/components/brand/Logo";
import { IzAppWindow } from "@/components/home2/IzAppWindow";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   ZTNA page scenes.

   (section nav now lives in the reusable IzSideNav component)
   HeroConsole   console with a slight tilt that straightens
   BlackeningScene   drop-all gateway, ON/OFF
   AlwaysOnBoot  a real desktop coming up with the agent connected
   OutcomesOrbit the estate around the mark, one app struck
   ============================================================ */

/* ---------- reveal once actually in view ----------
   rAF + getBoundingClientRect. NO blanket timeout: a timer fires whether
   or not the visitor ever scrolled near the section, which is why the
   boot animation was already over by the time you reached it. The poll
   is the mechanism, and it is cheap — it stops the moment it fires. */
function useInView<T extends HTMLElement>(threshold = 0.7) {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    let raf = 0;
    let done = false;
    const tick = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      if (r.top < vh * threshold && r.bottom > vh * 0.12) {
        done = true;
        setLive(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return { ref, live };
}

/* ============================================================
   HeroConsole — a SLIGHT tilt. 5deg, not 15: the point is a hint
   that this is an object, not a perspective stunt.
   ============================================================ */
export function HeroConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      const next = Math.max(0, Math.min(1, Math.max(0, 200 - r.top) / 380));
      setP((prev) => (Math.abs(prev - next) < 0.012 ? prev : next));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="ztconsole" ref={ref} style={{ ["--p" as string]: p }}>
      <div className="ztconsole-tilt">
        <IzAppWindow />
      </div>
    </div>
  );
}

/* ============================================================
   BlackeningScene
   ============================================================ */
const SCAN_PORTS = ["22", "80", "443", "3389", "1433", "8080", "5432", "9000"];

export function BlackeningScene() {
  const [on, setOn] = useState(true);
  return (
    <div className="ztbl">
      <div className="ztbl-head">
        <span className="ztbl-mlab">
          nmap -sS 10.20.0.0/16<i aria-hidden="true">_</i>
        </span>
        <div className="ztbl-toggle" role="group" aria-label="InstaSafe gateway">
          <button type="button" aria-pressed={!on} onClick={() => setOn(false)}>
            Gateway off
          </button>
          <button type="button" aria-pressed={on} onClick={() => setOn(true)}>
            Gateway on
          </button>
        </div>
      </div>

      <div className={`ztbl-grid${on ? " is-dark" : ""}`}>
        {SCAN_PORTS.map((port, i) => (
          <div key={port} className="ztbl-cell" style={{ ["--i" as string]: i }}>
            <span className="ztbl-port">:{port}</span>
            <span className="ztbl-state">{on ? "no response" : "open"}</span>
          </div>
        ))}
      </div>

      <p className="ztbl-foot">
        {on ? (
          <>
            <b>0 hosts up · 0 ports answered.</b> Drop-all plus Single Packet Authorization — the gateway only ever
            replies to a caller that has already proven who it is.
          </>
        ) : (
          <>
            <b>8 ports answered.</b> Every internet-facing service is a version string an attacker can match against a
            CVE, on their schedule rather than yours.
          </>
        )}
      </p>
    </div>
  );
}

/* ============================================================
   AlwaysOnBoot — a desktop a real person would recognise:
   wallpaper, icons, taskbar, and the agent already connected.
   ============================================================ */
const DESK_ICONS = ["This PC", "ERP Client", "Reports", "Recycle Bin"];

export function AlwaysOnBoot() {
  const { ref, live } = useInView<HTMLDivElement>();
  return (
    <div className={`ztboot${live ? " is-live" : ""}`} ref={ref}>
      <div className="ztboot-screen">
        {/* boot layer */}
        <div className="ztboot-boot" aria-hidden="true">
          <LogoMark size={24} forceTheme="dark" />
          <span className="ztboot-bar">
            <i />
          </span>
          <span className="ztboot-msg">Starting Windows…</span>
        </div>

        {/* desktop layer */}
        <div className="ztboot-desk" aria-hidden="true">
          <ul className="ztboot-icons">
            {DESK_ICONS.map((n) => (
              <li key={n}>
                <span />
                <em>{n}</em>
              </li>
            ))}
          </ul>
          <div className="ztboot-taskbar">
            <span className="ztboot-start" />
            <span className="ztboot-agent">
              <LogoMark size={12} forceTheme="dark" />
              <em>InstaSafe</em>
              <b>Connected</b>
            </span>
            <span className="ztboot-clock">09:41</span>
          </div>
        </div>
      </div>
      <p className="ztboot-cap">
        No login prompt, no &ldquo;connect&rdquo; step — the certificate brings the tunnel up while the desktop is
        still painting.
      </p>
    </div>
  );
}

/* ============================================================
   OutcomesOrbit — the estate as a scattered map, not a ring.

   Tiles sit at fixed cells on a faint grid (coordinates are data,
   the way IzSignalGrid does it) rather than on a circle: a real
   estate is scattered, and a perfect ring reads as decoration.

   THE SEQUENCE: an alert strikes, ONE app pulses under scrutiny,
   the mark indexes to it in discrete mechanical steps, that app
   settles to a green "cleared" glow — and every other tile never
   changes, which is the entire outcome being claimed.

   ▸ LOGOS ◂ each app takes an optional `logo` path under /public,
   by convention `/apps/<slug>.svg`. Until real artwork lands the
   tile renders the wordmark as text — never a broken-image box.
   ============================================================ */
type EstateApp = {
  name: string;
  /** cell on the 8-col / 7-row map */
  c: number;
  r: number;
  logo?: string;
  /** the app put under scrutiny, then cleared */
  struck?: boolean;
  /** the app already verified — settles green */
  cleared?: boolean;
};

const ESTATE: EstateApp[] = [
  { name: "Active Directory", c: 1, r: 2 },
  { name: "WNS", c: 2, r: 1 },
  { name: "Slack", c: 3, r: 3, struck: true },
  { name: "Hangouts", c: 5, r: 3 },
  { name: "Google Cloud", c: 1, r: 5 },
  { name: "AWS", c: 4, r: 5, cleared: true },
  { name: "Koovs", c: 6, r: 4 },
  { name: "Salesforce", c: 6, r: 6 },
  { name: "GitLab", c: 2, r: 6 },
];

export function OutcomesOrbit() {
  const { ref, live } = useInView<HTMLDivElement>(0.8);
  return (
    <div className={`ztes${live ? " is-live" : ""}`} ref={ref}>
      <div className="ztes-map">
        <span className="ztes-grid" aria-hidden="true" />

        {ESTATE.map((a) => (
          <span
            key={a.name}
            className={`ztes-app${a.struck ? " is-struck" : ""}${a.cleared ? " is-cleared" : ""}`}
            style={{ ["--c" as string]: a.c, ["--r" as string]: a.r }}
          >
            {a.logo ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={a.logo} alt="" loading="lazy" />
            ) : (
              <em>{a.name}</em>
            )}
          </span>
        ))}

        {/* the mark sits on the map as one more tile — it is part of the
            estate, not a badge floating over it */}
        <span className="ztes-core" style={{ ["--c" as string]: 3, ["--r" as string]: 4 }}>
          <LogoMark size={30} />
        </span>

        <span className="ztes-alert" aria-hidden="true">
          <svg viewBox="0 0 48 44" width="52" height="48" fill="none">
            <path
              d="M24 4 L45 40 H3 Z"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinejoin="round"
              fill="none"
            />
            <path d="M24 17v10" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="24" cy="33" r="1.9" fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  );
}
