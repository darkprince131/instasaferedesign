"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChatText,
  CheckCircle,
  Clock,
  Fingerprint,
  MagnifyingGlass,
  ShieldCheck,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   MfaApplies — the two places MFA actually lands.

   The page has already said MFA is six methods. What it has not
   said is WHERE the challenge appears, and the honest answer is two
   very different surfaces: a browser tab, and a Windows sign-in
   screen before a browser exists. Those two want different pictures,
   which is why this file holds two unrelated visuals rather than one
   component with a prop.

     SaasConsole  — a console. Applications are rows in an admin
                    list, because that is what a web app is to the
                    person configuring this: an entry with a protocol
                    and an auth profile attached.

     DesktopLogin — NOT a console. A screen. A desktop login is not
                    something you administer, it is something you
                    stand in front of at 08:58, so it gets the lit
                    wallpaper, the clock and the password field, and
                    it boots the way the real thing boots.
   ============================================================ */

/* ============================================================
   1. WEB & SAAS — the applications list
   ============================================================ */

type AppRow = { name: string; logo: string; proto: string; factors: string[] };

const APPS: AppRow[] = [
  { name: "Microsoft 365", logo: "microsoft-365", proto: "SAML 2.0", factors: ["Push", "TOTP"] },
  { name: "Salesforce", logo: "salesforce", proto: "SAML 2.0", factors: ["Push"] },
  { name: "Workday", logo: "workday", proto: "SAML 2.0", factors: ["FIDO", "TOTP"] },
  { name: "SAP", logo: "sap", proto: "SAML 2.0", factors: ["FIDO"] },
  { name: "GitLab", logo: "gitlab", proto: "OpenID Connect", factors: ["TOTP"] },
  { name: "ServiceNow", logo: "servicenow", proto: "SAML 2.0", factors: ["Push"] },
  { name: "Slack", logo: "slack", proto: "OAuth 2.0", factors: ["Push"] },
  { name: "Zoom", logo: "zoom", proto: "SAML 2.0", factors: ["SMS"] },
];

export function MfaSaasConsole() {
  return (
    <div className="mfap-win">
      <div className="mfap-chrome">
        <span className="mfap-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="mfap-ttl">InstaSafe console / applications</span>
      </div>

      <div className="mfap-body">
        <aside className="mfap-side" aria-hidden="true">
          <span className="mfap-brand">
            <LogoMark size={16} />
            <b>InstaSafe</b>
          </span>
          {["Dashboard", "Applications", "Users", "Policies", "Reports"].map((n) => (
            <span className={`mfap-nav${n === "Applications" ? " on" : ""}`} key={n}>
              {n}
            </span>
          ))}
        </aside>

        <div className="mfap-main">
          <div className="mfap-top">
            <h4>Applications</h4>
            <span className="mfap-search" aria-hidden="true">
              <MagnifyingGlass weight="bold" />
              Search
            </span>
            <span className="mfap-count">8 of 800+ shown</span>
          </div>

          <div className="mfap-table" role="table" aria-label="Applications and the factors required for each">
            <div className="mfap-tr mfap-th" role="row">
              <span role="columnheader">Application</span>
              <span role="columnheader">Protocol</span>
              <span role="columnheader">Factors required</span>
            </div>
            {APPS.map((a, i) => (
              <div className="mfap-tr" role="row" key={a.name} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <span className="mfap-app" role="cell">
                  <i aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" decoding="async" />
                  </i>
                  {a.name}
                </span>
                <span className="mfap-proto" role="cell">
                  {a.proto}
                </span>
                <span className="mfap-fx" role="cell">
                  {a.factors.map((f) => (
                    <b key={f}>{f}</b>
                  ))}
                </span>
              </div>
            ))}
          </div>

          {/* The point of the whole console in one line: the factor is a
              property of the POLICY, not of the application. None of
              these eight had to be taught what MFA is. */}
          <span className="mfap-foot">
            <CheckCircle weight="fill" aria-hidden="true" />
            Every application above is behind the same login. The factor comes from the group, not the app.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   2. DESKTOP LOGIN — the screen, booting

   ▸ WHY IT BOOTS ▸
   The interesting claim about desktop MFA is not the prompt, it is
   WHEN the prompt exists. The InstaSafe agent brings the tunnel up
   before anyone has signed in — the always-on, pre-logon behaviour —
   which is what makes a domain login possible on a laptop sitting in
   a hotel. Showing only the finished lock screen would drop the one
   part of this that is not obvious, so the loop starts at power-on.

   ▸ WHY THE METHOD ROTATES ▸
   Three factors are offered and a different one is used on each pass.
   A single hardcoded choice would quietly say "desktop login means
   fingerprint"; rotating says the menu is real. SMS, TOTP and
   fingerprint specifically — the three that make sense at a Windows
   sign-in screen, not all six.
   ============================================================ */

type Phase = "boot" | "tunnel" | "lock" | "password" | "mfa" | "in";

/* One clock, one table. Durations in ms, cumulative bounds derived —
   the same shape as OneLoginRace, so "which phase are we in" stays a
   pure lookup rather than six interacting timers. */
const PHASES: { id: Phase; ms: number }[] = [
  { id: "boot", ms: 1700 },
  { id: "tunnel", ms: 1600 },
  { id: "lock", ms: 1600 },
  { id: "password", ms: 1700 },
  { id: "mfa", ms: 3200 },
  { id: "in", ms: 1800 },
];
const BOUNDS = PHASES.reduce<number[]>((acc, p) => [...acc, acc[acc.length - 1] + p.ms], [0]);
const LOOP_MS = BOUNDS[BOUNDS.length - 1];

const METHODS: { id: string; label: string; Icon: Icon; detail: string }[] = [
  { id: "sms", label: "SMS OTP", Icon: ChatText, detail: "Code sent to ••••• 43210" },
  { id: "totp", label: "TOTP", Icon: Clock, detail: "Authenticator code · 30s" },
  { id: "bio", label: "Fingerprint", Icon: Fingerprint, detail: "Touch the reader" },
];

function phaseAt(t: number): { id: Phase; into: number } {
  for (let i = 0; i < PHASES.length; i++) {
    if (t < BOUNDS[i + 1]) return { id: PHASES[i].id, into: t - BOUNDS[i] };
  }
  return { id: "in", into: 0 };
}

export function MfaDesktopLogin() {
  const ref = useRef<HTMLDivElement>(null);
  /* ONE piece of state, not two.

     The first version kept `t` and `pass` separately and called
     setPass INSIDE the setT updater — a side effect inside a reducer,
     which React is entitled to run more than once per tick and does
     under StrictMode. The observable symptom was that the rotation
     skipped: only TOTP and fingerprint ever came up, and SMS OTP —
     the method most worth showing at a Windows sign-in, because it is
     the one people assume is browser-only — never appeared at all.

     Rolling both into a single pure updater makes a double invocation
     harmless, because the next value is derived entirely from the
     previous one. */
  const [clock, setClock] = useState({ t: 0, pass: 0 });
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    /* A backgrounded tab reports nothing as intersecting, so a visitor
       who opens this page in a new tab and comes back would find the
       screen frozen at power-on — the least useful frame in the loop.
       Same failsafe the SSO window stack carries, same reason. */
    const failsafe = window.setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  /* setInterval rather than rAF: rAF is suspended outright on a
     backgrounded tab, which would freeze the loop mid-boot and leave
     a half-drawn screen when the visitor came back. 60ms is plenty
     for a sequence whose motion is all CSS transitions. */
  useEffect(() => {
    if (reduced || !inView) return;
    let last = Date.now();
    const id = setInterval(() => {
      const now = Date.now();
      const dt = now - last;
      last = now;
      setClock((c) => {
        const next = c.t + dt;
        return next >= LOOP_MS ? { t: next - LOOP_MS, pass: c.pass + 1 } : { t: next, pass: c.pass };
      });
    }, 60);
    return () => clearInterval(id);
  }, [reduced, inView]);

  /* Reduced motion gets the END of the story, not the start: signed
     in, with the factor that did it still named. A frozen boot screen
     would be a picture of nothing happening. */
  const { id: phase, into } = reduced ? { id: "in" as Phase, into: 0 } : phaseAt(clock.t);
  const method = METHODS[clock.pass % METHODS.length];
  const dots = phase === "password" ? Math.min(9, Math.floor(into / 150)) : phase === "boot" || phase === "tunnel" || phase === "lock" ? 0 : 9;
  const mfaDone = phase === "in" || (phase === "mfa" && into > 2100);

  return (
    <div className={`mfap-screen ph-${phase}`} ref={ref} aria-label="A Windows sign-in protected by InstaSafe MFA">
      {/* the wallpaper — the same lit gradient the endpoint sim uses,
          because this is the same imaginary machine */}
      <div className="mfap-wall" aria-hidden="true">
        <span className="mfap-bloom b1" />
        <span className="mfap-bloom b2" />
        <span className="mfap-bloom b3" />
        <span className="mfap-arc" />
      </div>

      {/* --- power-on / pre-logon tunnel --- */}
      <div className="mfap-boot" aria-hidden={phase !== "boot" && phase !== "tunnel"}>
        <span className="mfap-boot-mark">
          <LogoMark size={26} />
        </span>
        <span className="mfap-boot-t">
          {phase === "boot" ? "InstaSafe agent starting…" : "Secure tunnel established"}
        </span>
        <span className="mfap-boot-s">
          {phase === "boot" ? "before anyone has signed in" : "the domain is reachable · nothing else is"}
        </span>
        <span className="mfap-boot-bar" aria-hidden="true">
          <i />
        </span>
      </div>

      {/* --- the lock screen --- */}
      <div className="mfap-lock">
        <div className="mfap-clock" aria-hidden="true">
          <b>08:58</b>
          <span>Tuesday, 14 August</span>
        </div>

        <div className="mfap-card">
          <span className="mfap-av" aria-hidden="true">
            AJ
          </span>
          <span className="mfap-who">Alen Joseph</span>
          <span className="mfap-dom">CORP\alen.joseph</span>

          <span className="mfap-field">
            <span className="mfap-dots" aria-hidden="true">
              {Array.from({ length: 9 }, (_, i) => (
                <i key={i} className={i < dots ? "on" : ""} />
              ))}
            </span>
            <span className="mfap-caret" aria-hidden="true" />
          </span>
          <span className="mfap-hint">Password</span>

          {/* --- the second factor --- */}
          <div className="mfap-mfa">
            <span className="mfap-mfa-h">
              <ShieldCheck weight="fill" aria-hidden="true" />
              Second factor required
            </span>
            <div className="mfap-methods">
              {METHODS.map((m) => (
                <span className={`mfap-m${m.id === method.id ? " on" : ""}`} key={m.id}>
                  <m.Icon weight="duotone" aria-hidden="true" />
                  {m.label}
                </span>
              ))}
            </div>
            <span className="mfap-detail">
              {mfaDone ? (
                <>
                  <CheckCircle weight="fill" aria-hidden="true" />
                  {method.label} approved
                </>
              ) : (
                method.detail
              )}
            </span>
          </div>

          <span className="mfap-welcome">Welcome, Alen</span>
        </div>
      </div>

      {/* The line that keeps the whole thing honest: this is the OS
          logon, not a browser pretending to be one. */}
      <span className="mfap-tag">Windows sign-in · not a browser</span>
    </div>
  );
}
