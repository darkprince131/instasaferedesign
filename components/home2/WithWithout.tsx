"use client";

import { useEffect, useRef, useState, type JSX, type CSSProperties } from "react";

/* ============================================================
   With / Without toggle (C2 · C14) — "InstaSafe OFF / ON".

   The old version just swapped jargon for plain English. This
   one tells the real story: flip InstaSafe ON and watch the
   LAYERS between your team and your apps lift away — the
   exposed ports, the VPN box, the flat network, the detour,
   the vendor in your data path, the bolt-on MFA. What's left
   is one verified, encrypted tunnel to the one app they need.

   Content distilled from InstaSafe_Content_Master_v1.md
   (/platform "Why not VPN" + /solutions/vpn-alternative).
   Honesty-guardrail safe — every ON claim is a confirmed
   capability (server blackening, app-specific tunnel,
   cloud-born, split-plane, data-stays, MFA + 25 device checks).
   ============================================================ */

/* the six layers InstaSafe removes — slab glyph + list copy */
interface Layer {
  off: string;
  on: string;
  tag: string;
  icon: JSX.Element;
}
const LAYERS: Layer[] = [
  {
    off: "Out on the internet for anyone to scan.",
    on: "Invisible by default — nothing to find.",
    tag: "server blackening",
    icon: (
      <>
        <circle cx={12} cy={12} r={9} />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </>
    ),
  },
  {
    off: "One login opens the whole network.",
    on: "One app per session — no lateral movement.",
    tag: "app-specific tunnel",
    icon: (
      <>
        <circle cx={12} cy={5} r={2.2} />
        <circle cx={5} cy={19} r={2.2} />
        <circle cx={19} cy={19} r={2.2} />
        <path d="M12 7.2v3.8M11 11l-5 6M13 11l5 6" />
      </>
    ),
  },
  {
    off: "A VPN box to rack, size and maintain.",
    on: "Cloud-born — scales on its own.",
    tag: "no hardware",
    icon: (
      <>
        <rect x={4} y={4.5} width={16} height={6.5} rx={1.5} />
        <rect x={4} y={13} width={16} height={6.5} rx={1.5} />
        <circle cx={7.5} cy={7.75} r={1} fill="currentColor" stroke="none" />
        <circle cx={7.5} cy={16.25} r={1} fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    off: "Traffic detours through a choke point.",
    on: "Connects direct — no backhaul.",
    tag: "split-plane",
    icon: (
      <>
        <path d="M3 12l4-5 4 10 4-10 4 5h2" />
      </>
    ),
  },
  {
    off: "A vendor's servers see your traffic.",
    on: "Data never leaves your network.",
    tag: "privacy-first",
    icon: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx={12} cy={12} r={3} />
      </>
    ),
  },
  {
    off: "MFA and device checks bolted on after.",
    on: "Identity, MFA & 25 device checks built in.",
    tag: "6 MFA methods",
    icon: (
      <>
        <circle cx={8} cy={15.5} r={3.5} />
        <path d="M10.5 13L20 3.5M16.5 7l2 2M14.5 9l2 2" />
      </>
    ),
  },
];

const COUNTERS: { cl: string; from: string; to: string }[] = [
  { cl: "Layers in the way", from: "6", to: "0" },
  { cl: "Attack surface", from: "exposed", to: "invisible" },
  { cl: "Lateral movement", from: "possible", to: "contained" },
  { cl: "Deploy time", from: "weeks", to: "days" },
];

/* geometry (viewBox 900 × 320) */
const SLAB_CX = [168, 262, 356, 450, 544, 638];
const APP_CY = [86, 150, 214];

const Check = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export function WithWithout() {
  const [on, setOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const demoed = useRef(false);
  const autoTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* manual toggle — also cancels any pending auto-demo */
  const choose = (v: boolean) => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    demoed.current = true;
    setOn(v);
  };

  /* auto-demo: when first scrolled into view, play the OFF→ON removal once */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOn(true);
      demoed.current = true;
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !demoed.current) {
          demoed.current = true;
          autoTimer.current = setTimeout(() => setOn(true), 900);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      if (autoTimer.current) clearTimeout(autoTimer.current);
    };
  }, []);

  return (
    <div className={`ww ${on ? "on" : ""}`} ref={rootRef}>
      <div className="ww-toggle" role="group" aria-label="InstaSafe on or off">
        <button className={!on ? "on-off" : ""} onClick={() => choose(false)} aria-pressed={!on}>
          <span className="led" />
          InstaSafe OFF
        </button>
        <button className={on ? "on-on" : ""} onClick={() => choose(true)} aria-pressed={on}>
          <span className="led" />
          InstaSafe ON
        </button>
      </div>

      <h3 className="ww-head">
        What does InstaSafe actually <em>take away</em>?
      </h3>
      <p className="ww-sub">
        {on ? (
          <>
            Gone. One verified, encrypted tunnel to the one app they need — <b>everything else simply disappears</b>.
          </>
        ) : (
          <>
            Six layers sit between your people and their apps. Every one is something <b>you</b> run — and something an
            attacker can reach.
          </>
        )}
      </p>

      <div className="ww-stage">
        <div className="ww-diagram">
          <svg
            viewBox="0 0 900 320"
            role="img"
            aria-label="With InstaSafe off, six layers stand between your team and three internet-exposed apps: exposed ports, whole-network access, a VPN appliance, a traffic detour, a vendor in the data path, and bolt-on MFA. Turn InstaSafe on and every layer lifts away, leaving one verified encrypted tunnel to a single authorized app while the others become invisible."
          >
            <defs>
              <marker id="wwArrA" markerWidth="7" markerHeight="7" refX="5.2" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 z" fill="var(--allow)" />
              </marker>
              <marker id="wwArrR" markerWidth="7" markerHeight="7" refX="5.2" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 z" fill="var(--deny)" />
              </marker>
            </defs>

            {/* user */}
            <g>
              <circle className="ww-node" cx={60} cy={150} r={30} />
              <g className="ww-glyph" transform="translate(48 138)" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <circle cx={12} cy={8} r={3.4} />
                <path d="M5.5 19a6.5 6 0 0 1 13 0" />
              </g>
              <text className="ww-nlbl" x={60} y={205}>
                your team
              </text>
            </g>

            {/* OFF exposure: dashed line + scanner + lateral spread */}
            <g className="ww-risk">
              <line className="ww-expose-line" x1={90} y1={150} x2={748} y2={150} />
              {/* scanner sweeping the exposed apps */}
              <g className="ww-scan-grp" style={{ transformBox: "view-box", transformOrigin: "center" } as CSSProperties}>
                <g className="ww-scan" transform="translate(792 150)">
                  <circle cx={0} cy={0} r={11} />
                  <path d="M-16 0h7M9 0h7M0 -16v7M0 9v7" />
                </g>
              </g>
              {/* lateral spread between exposed apps */}
              <path className="ww-lat" d="M792 112 V124" markerEnd="url(#wwArrR)" />
              <path className="ww-lat" d="M792 176 V188" markerEnd="url(#wwArrR)" />
            </g>

            {/* the six layers (slabs) */}
            {SLAB_CX.map((cx, i) => (
              <g
                key={i}
                className="ww-slab"
                style={{ transitionDelay: on ? `${i * 55}ms` : `${(5 - i) * 55}ms` }}
              >
                <rect className="ww-slab-box" x={cx - 22} y={91} width={44} height={118} rx={9} />
                <text className="ww-slab-x" x={cx} y={106}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                <g
                  className="ww-slab-ic"
                  transform={`translate(${cx - 12} 138)`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {LAYERS[i].icon}
                </g>
                <circle className="ww-slab-dot" cx={cx + 14} cy={101} r={3} />
              </g>
            ))}

            {/* ON secure path: tunnel + InstaSafe shield + packet */}
            <g className="ww-secure">
              <path className="ww-tunnel" d="M92 150 H750" markerEnd="url(#wwArrA)" />
              <g>
                <rect className="ww-shield-box" x={373} y={122} width={64} height={56} rx={12} />
                <g className="ww-shield-ic" transform="translate(405 150)" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M0 -16 L12 -11 V-2 C12 7 7 12 0 15 C-7 12 -12 7 -12 -2 V-11 Z" />
                  <path d="M-5 -1 L-1 3 L6 -5" />
                </g>
              </g>
              <circle r={4.5} className="ww-packet" style={{ offsetPath: "path('M92 150 H750')" } as CSSProperties} />
            </g>

            {/* apps — three exposed (OFF) → one authorized, two invisible (ON) */}
            {APP_CY.map((cy, i) => {
              const keep = i === 1;
              return (
                <g key={cy} className={`ww-app ${keep ? "keep" : "gone"}`}>
                  <rect className="ww-app-box" x={750} y={cy - 26} width={84} height={52} rx={10} />
                  <g className="ww-app-ic" transform={`translate(${792 - 11} ${cy - 11})`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={2} y={3} width={18} height={16} rx={2} />
                    <path d="M2 8h18" />
                  </g>
                  {/* OFF open-port marker */}
                  <circle className="ww-risk ww-port" cx={824} cy={cy - 16} r={3.4} />
                  {/* ON authorized check (only on the kept app) */}
                  {keep && (
                    <g className="ww-secure" transform={`translate(${820} ${cy + 10})`}>
                      <circle r={9} fill="var(--allow)" />
                      <g transform="translate(-5 -5)" fill="none" stroke="var(--btn-ink)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3 3 5-6" />
                      </g>
                    </g>
                  )}
                </g>
              );
            })}
            <text className="ww-nlbl ww-risk" x={792} y={262}>
              your apps · exposed
            </text>
            <text className="ww-nlbl ww-secure" x={792} y={262}>
              one app · authorized
            </text>
          </svg>
        </div>

        <div className="ww-side">
          <span className="iz-ey">{on ? "Layers removed" : "What's in the way"}</span>

          <div className="ww-counters">
            {COUNTERS.map((c) => (
              <div key={c.cl} className="ww-counter">
                <span className="cl">{c.cl}</span>
                <span className="cv">
                  <span className="from">{c.from}</span>
                  <span className="ar">→</span>
                  <span className="to">{c.to}</span>
                </span>
              </div>
            ))}
          </div>

          <ul className="ww-layers">
            {LAYERS.map((l, i) => (
              <li key={i} className="ww-layer">
                <span className="lx">{String(i + 1).padStart(2, "0")}</span>
                <span className="lb">
                  <span className="off">{l.off}</span>
                  <span className="on">
                    {l.on}
                    <i>{l.tag}</i>
                  </span>
                </span>
                <span className="lmk">
                  <span className="ldot" />
                  <span className="lmark">{Check}</span>
                </span>
              </li>
            ))}
          </ul>

          <a href="/vpn-alternative" className="iz-btn iz-btn-ghost iz-btn-sm ww-foot">
            See the VPN-to-Zero-Trust switch
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
