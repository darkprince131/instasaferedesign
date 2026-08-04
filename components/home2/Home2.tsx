"use client";

import { useEffect, useRef, useState } from "react";
import { CapabilitiesDeck } from "./CapabilitiesDeck";
import { IzAccessFlow } from "./IzAccessFlow";
import "./izaccessflow.css";
import { useSectionReveals, useParallax } from "./useIzMotion";
import { IzNav } from "./IzNav";
import { IzFinalCta } from "./IzFinalCta";
import { IzFooterGrid } from "./IzFooterGrid";
import { IzHeroPortal } from "./IzHeroPortal";
import "./iz-hero-portal.css";

/* ============================================================
   InstaSafe ZTNA — "Balanced" homepage, new design language.
   Self-contained: own theme (paper default / dark toggle, localStorage is-theme),
   own nav + footer, scoped under .iz. Does not touch the rest
   of the site. Product name is "InstaSafe ZTNA" (never i365).
   ============================================================ */

type Theme = "dark" | "paper";
type DesignSystem = "orange" | "teal" | "violet" | "blue";

/* scroll-reveal moved to useIzMotion.ts (GSAP ScrollTrigger.batch,
   staggered; CSS `.iz-reveal` + reduced-motion block is the fallback). */

/* ---------- count-up ---------- */
function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          obs.disconnect();
          const step = Math.max(1, Math.round(to / 40));
          const t = setInterval(() => {
            setN((c) => {
              if (c + step >= to) {
                clearInterval(t);
                return to;
              }
              return c + step;
            });
          }, 22);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- data ---------- */
const PILLARS = [
  { name: "Get in without a VPN", desc: "Your team reaches work apps directly and safely — the network stays invisible to outsiders.", stat: ["7", "kinds of app"] },
  { name: "One identity for everything", desc: "Use the accounts you already have, with InstaSafe deciding who's allowed where.", stat: ["8", "ways to sign in"] },
  { name: "Stronger sign-in", desc: "Add a quick second check, so a stolen password on its own gets nobody in.", stat: ["6", "extra methods"] },
  { name: "Only safe devices", desc: "Every device is checked for safety before it's allowed anywhere near your apps.", stat: ["25", "device checks"] },
  { name: "Recorded for safety", desc: "Sensitive sessions are recorded, so there's always a clear, trustworthy trail.", stat: ["202", "things logged"] },
  { name: "See everything", desc: "Every login and every block shows up in the security tools you already use.", stat: ["7", "report formats"] },
];

const INDUSTRIES = ["Banking & BFSI", "Government / PSU", "Logistics", "Manufacturing", "IT / ITES", "Healthcare", "Real Estate", "NBFC"];

const LOGS = [
  { u: "Anita (sales)", app: "Billing app", state: "allow", t: "09:41:02" },
  { u: "Build server", app: "Code server", state: "allow", t: "09:41:07" },
  { u: "Contractor", app: "Finance desktop", state: "deny", t: "09:41:09" },
  { u: "Priya (data)", app: "Reports database", state: "allow", t: "09:41:15" },
  { u: "Unknown device", app: "Admin panel", state: "deny", t: "09:41:21" },
];

const COMPARE: Record<string, [string, string, string][]> = {
  "vs VPN": [
    ["What they can reach", "Your whole network", "Just the one app they need"],
    ["Visible to attackers", "Yes — ports are open", "No — nothing to find"],
    ["If one login is stolen", "They can roam freely", "They're stuck at one app"],
    ["Speed", "Slower — traffic detours", "Direct, so it's fast"],
  ],
  "vs Zscaler": [
    ["Your traffic goes through", "Their cloud", "Straight to your app — never us"],
    ["Sign-in & extra checks built in", "no", "yes"],
    ["Records sensitive sessions", "no", "yes"],
    ["Can run in your own server room", "no", "yes"],
  ],
  "vs Fortinet": [
    ["What it runs on", "A hardware box", "The cloud — nothing to rack"],
    ["Works on Mac, Linux, iPhone", "no", "yes"],
    ["Safe access to databases", "no", "yes"],
    ["Price", "Old-style, pricey", "$2 per person / month"],
  ],
};

const PRICING = [
  { name: "SSO", amt: "$1", feat: false, list: ["Unlimited SAML / OAuth / OIDC", "Desktop SSO + directory sync", "Device authentication", "11 report types"] },
  { name: "Zero Trust Platform", amt: "$2", feat: true, list: ["25 device checks · 7 app types", "Session recording + watermark", "Agent + agentless access", "7 SIEM formats · 202 events"] },
  { name: "MFA", amt: "$1", feat: false, list: ["TOTP, push, biometrics", "Hardware key + certificate", "OS MFA at Windows login", "Conditional MFA + backup codes"] },
];

const TESTIMONIALS = [
  { q: "InstaSafe simply stands out in its adaptability to expanding cloud environments. We have secure mobility we previously didn't possess.", name: "Ranjith P.", role: "Head of IT Security, BPM" },
  { q: "We scaled remote access security from 500 to 65,000 users in five days, with no hardware to rack.", name: "Hariharan S.", role: "Infrastructure Lead, BFSI" },
  { q: "On-premise deployment was the deciding factor — our data never leaves the private network.", name: "Rishu P.", role: "CISO, Government PSU" },
];

/* ---------- icons (inline, currentColor) ---------- */
const Check = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Cross = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function Home2() {
  const [theme, setTheme] = useState<Theme>("paper");
  const [system, setSystem] = useState<DesignSystem>("orange");
  const [cmp, setCmp] = useState<keyof typeof COMPARE>("vs VPN");
  const [visitor, setVisitor] = useState<[string, string][]>([]);
  const posturePanelRef = useRef<HTMLDivElement>(null);
  useSectionReveals();
  useParallax(posturePanelRef);

  // theme bootstrap (scoped to this page; key = is-theme)
  useEffect(() => {
    try {
      const t = (localStorage.getItem("is-theme") as Theme) || "paper";
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const setT = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  // design-system bootstrap — no UI here, just inherits whatever the
  // Components Lab switcher last set (key = is-system), so this page stays clean.
  useEffect(() => {
    try {
      const s = localStorage.getItem("is-system") as DesignSystem | null;
      if (s === "orange" || s === "teal" || s === "violet" || s === "blue") setSystem(s);
    } catch {}
  }, []);

  // live visitor read — local only, no network
  useEffect(() => {
    const ua = navigator.userAgent;
    const browser = /edg/i.test(ua) ? "Edge" : /chrome/i.test(ua) ? "Chrome" : /firefox/i.test(ua) ? "Firefox" : /safari/i.test(ua) ? "Safari" : "Unknown";
    const os = /windows/i.test(ua) ? "Windows" : /mac/i.test(ua) ? "macOS" : /linux/i.test(ua) ? "Linux" : /android/i.test(ua) ? "Android" : /iphone|ipad/i.test(ua) ? "iOS" : "Unknown";
    const device = /mobile|android|iphone/i.test(ua) ? "Mobile" : "Desktop";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "—";
    setVisitor([
      ["operating system", os],
      ["browser", browser],
      ["device type", device],
      ["timezone", tz],
      ["language", navigator.language || "—"],
      ["screen", `${window.screen.width}×${window.screen.height}`],
    ]);
  }, []);

  return (
    <div className="iz" data-theme={theme} data-system={system}>
      {/* ---------------- NAV ---------------- */}
      <IzNav theme={theme} onThemeChange={setT} overlay />

      {/* ---------------- HERO ---------------- */}
      <IzHeroPortal theme={theme} />

      {/* ---------------- CAPABILITIES DECK ---------------- */}
      {/* rails: this block is wide and benefits from column edges */}
      <section className="iz-section iz-railed iz-railed--fade">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock">
            <span className="iz-ey">Everything it does</span>
            <h2 className="iz-h2">
              The whole thing, <em>in a two-minute tour</em>.
            </h2>
            <p className="iz-lead" style={{ maxWidth: "54ch" }}>
              No slides to sit through. Click through each part — every one shows you, live, exactly what it does.
            </p>
          </div>
          <div className="iz-reveal">
            <CapabilitiesDeck />
          </div>
        </div>
      </section>

      {/* ---------------- PLATFORM ROWS ---------------- */}
      {/* no rails — the rows already draw their own horizontals */}
      <section className="iz-section alt iz-ruled-top">
        <div className="iz-wrap iz-stitch" style={{ paddingTop: 12, paddingBottom: 12 }}>
          <div className="iz-reveal">
            <span className="iz-ey">All in one place</span>
            <h2 className="iz-h2">
              Everything your team needs to get in safely — <em>in one place</em>.
            </h2>
          </div>
          <div className="iz-rows iz-reveal">
            {PILLARS.map((p, i) => (
              <a key={p.name} href="/platform" className="iz-row">
                <span className="iz-row-i">{String(i + 1).padStart(2, "0")}</span>
                <span className="iz-row-name">{p.name}</span>
                <span className="iz-row-desc">{p.desc}</span>
                <span className="iz-row-stat">
                  <b>{p.stat[0]}</b> {p.stat[1]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS (plain ⇄ tech flow) ---------------- */}
      {/* one rail + a dashed top rule — no field texture */}
      <section className="iz-section iz-railed iz-railed--fade iz-railed--left iz-ruled-top" id="how">
        <div className="iz-wrap">
          <div className="iz-reveal iz-headblock" style={{ textAlign: "center" }}>
            <span className="iz-ey dim" style={{ justifyContent: "center", display: "inline-flex" }}>
              How it works
            </span>
            <h2 className="iz-h2">
              Watch one request <em>earn its way in</em>.
            </h2>
          </div>
          <div className="iz-reveal">
            <IzAccessFlow />
          </div>
          <div className="iz-reveal iz-block-top">
            <div className="iz-statband">
              {[
                { n: <CountUp to={72} suffix="%" />, l: "of companies leaving the VPN" },
                { n: <CountUp to={500000} />, l: "devices protected" },
                { n: <CountUp to={150} suffix="+" />, l: "companies trust us" },
                { n: <>$2</>, l: "per person, per month" },
              ].map((s, i) => (
                <div key={i} className="iz-statcell">
                  <div className="iz-statnum">{s.n}</div>
                  <div className="iz-statlbl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CONSOLE (live log) ---------------- */}
      <section className="iz-section alt iz-ruled-top">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">Always watching</span>
            <h2 className="iz-h2">
              See every login, <em>as it happens</em>.
            </h2>
          </div>
          <div className="iz-panel iz-reveal iz-block-top">
            <div className="iz-pbar">
              <span className="iz-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="iz-pbar-title">activity</span>
              <span className="iz-pbar-cta">Export</span>
            </div>
            <div className="iz-tabs">
              <span className="iz-tab on">Live</span>
              <span className="iz-tab">Blocked</span>
              <span className="iz-tab">Devices</span>
            </div>
            <div className="iz-toolbar">
              <span className="iz-chip count">5 just now</span>
              <span className="iz-chip">last 30 seconds</span>
              <span className="iz-chip">everything logged</span>
            </div>
            <div className="iz-log">
              {LOGS.map((l) => (
                <div key={l.u + l.t} className={`iz-log-row ${l.state === "deny" ? "deny" : ""}`}>
                  <span style={{ color: l.state === "deny" ? "var(--deny)" : "var(--allow)" }}>{l.state === "deny" ? <Cross /> : <Check />}</span>
                  <span className="u">{l.u}</span>
                  <span className="ap">{l.app}</span>
                  <span className={`iz-pill ${l.state}`}>{l.state}</span>
                  <span className="ti">{l.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- INDUSTRIES (pastel) ---------------- */}
      <section className="iz-section">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">Trusted across sectors</span>
            <h2 className="iz-h2">
              150+ organisations, <em>every regulated industry</em>.
            </h2>
          </div>
          <div className="iz-pastel iz-reveal">
            {INDUSTRIES.map((t, i) => (
              <div key={t} className="iz-cell">
                <span className="k">{String(i + 1).padStart(2, "0")}</span>
                <span className="t">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COMPARISON ---------------- */}
      <section className="iz-section alt iz-railed iz-railed--fade">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">The short version</span>
            <h2 className="iz-h2">
              The difference, <em>line by line</em>.
            </h2>
            <div className="iz-cmp-toggle">
              {Object.keys(COMPARE).map((k) => (
                <button key={k} className={cmp === k ? "on" : ""} onClick={() => setCmp(k as keyof typeof COMPARE)}>
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div className="iz-reveal">
            <table className="iz-cmp">
              <thead>
                <tr>
                  <th>What matters</th>
                  <th>{cmp.replace("vs ", "")}</th>
                  <th className="ours">InstaSafe</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE[cmp].map((row) => (
                  <tr key={row[0]}>
                    <td>{row[0]}</td>
                    <td>{row[1] === "no" ? <span className="no">✗ no</span> : row[1]}</td>
                    <td className="ours">{row[2] === "yes" ? <span className="yes">✓ yes</span> : row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="iz-hero-cta" style={{ marginTop: 24 }}>
              <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-btn-sm">
                Book a demo <Arrow />
              </a>
              <a href="/why-instasafe-zero-trust" className="iz-btn iz-btn-ghost iz-btn-sm">
                Why teams switch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- LIVE VISITOR ---------------- */}
      <section className="iz-section iz-railed iz-railed--fade iz-railed--right">
        <div className="iz-wrap iz-hero-grid">
          <div className="iz-reveal">
            <span className="iz-ey">Try it right now</span>
            <h2 className="iz-h2">
              We can already tell this much <em>about your device</em>.
            </h2>
            <p className="iz-lead">
              This is read right here in your own browser — the same kind of things InstaSafe checks about a device before
              it lets anyone in. Nothing here is sent anywhere.
            </p>
            <a href="/zero-trust-features/device-posture-check" className="iz-btn iz-btn-ghost" style={{ marginTop: 24 }}>
              See device checks <Arrow />
            </a>
          </div>
          <div className="iz-reveal" data-dir="right">
            <div className="iz-panel" ref={posturePanelRef}>
              <div className="iz-pbar">
                <span className="iz-dots">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="iz-pbar-title">your device, right now</span>
                <span className="iz-live">
                  <i />
                  LOCAL
                </span>
              </div>
              <div className="iz-pbody">
                <div className="iz-visitor-grid">
                  {visitor.map(([l, v]) => (
                    <div key={l} className="iz-vrow">
                      <span className="l">{l}</span>
                      <span className="v">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="iz-verdict">
                  <i />
                  read in your browser · checked against the rules
                </div>
                <div className="iz-disclaim">all done on your device · nothing is sent anywhere.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="iz-section alt">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">In production</span>
            <h2 className="iz-h2">
              Run by the teams who <em>can&apos;t afford a breach</em>.
            </h2>
          </div>
          <div className="iz-tst iz-reveal">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="iz-tst-card">
                <p className="q">&ldquo;{t.q}&rdquo;</p>
                <div className="by">
                  <b>{t.name}</b>
                  {t.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRICING ---------------- */}
      <section className="iz-section iz-railed iz-railed--fade iz-ruled-top">
        <div className="iz-wrap">
          <div className="iz-reveal">
            <span className="iz-ey">Enterprise security, startup pricing</span>
            <h2 className="iz-h2">
              Public prices. <em>From $1 a user.</em>
            </h2>
          </div>
          <div className="iz-price iz-reveal">
            {PRICING.map((p) => (
              <div key={p.name} className={`iz-price-card ${p.feat ? "feat" : ""}`}>
                {p.feat && <span className="iz-badge">Most popular</span>}
                <span className="iz-price-name">{p.name}</span>
                <div className="iz-price-amt">
                  {p.amt}
                  <span className="suf"> / user / mo</span>
                </div>
                <ul className="iz-price-list">
                  {p.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
                <a href="/instasafe-zero-trust-pricing" className="iz-btn">
                  {p.feat ? "Start here" : "Choose plan"}
                </a>
              </div>
            ))}
          </div>
          <p className="iz-mono iz-mute" style={{ marginTop: 18, fontSize: 12 }}>
            Billed annually · startup pricing under 50 users · enterprise on request.
          </p>
        </div>
      </section>

      {/* ---------------- FINAL CTA ---------------- */}
      <IzFinalCta />

      {/* ---------------- FOOTER ---------------- */}
      <IzFooterGrid />
    </div>
  );
}
