"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  Check,
  Crosshair,
  Fingerprint,
  IdentificationCard,
  Key as KeyIcon,
  ShieldCheck,
  StackSimple,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Capabilities Deck (C1) — interactive, PPT-style feature
   explainer. Six features; each swaps a stage with its own
   interactive console (left) + infographic bullets (right).
   Auto-advances; clickable tabs + prev/next; pauses on hover.
   ============================================================ */

const DUR = 7000; // ms per slide

/* ---------- small inline glyphs used inside the console visuals ---------- */
type IcoProps = { className?: string };
const Tick = (p: IcoProps) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const Lock = (p: IcoProps) => (
  <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

/* ---------- console visuals ---------- */
function PBar({ title }: { title: string }) {
  return (
    <div className="iz-pbar">
      <span className="iz-dots">
        <i />
        <i />
        <i />
      </span>
      <span className="iz-pbar-title">{title}</span>
      <span className="iz-live">
        <i />
        LIVE
      </span>
    </div>
  );
}

function VisualZTNA() {
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="the secure connection" />
        <div className="cap-tunnel">
          <svg viewBox="0 0 360 150" role="img" aria-label="Encrypted tunnel from device to gateway with the drop-all firewall blocking unauthorised traffic">
            <defs>
              <path id="cap-path" d="M64 75 H300" />
            </defs>
            {/* device */}
            <rect x="22" y="58" width="42" height="34" rx="5" fill="none" stroke="var(--tx-mute)" strokeWidth="1.4" />
            <text x="43" y="108" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--tx-mute)">device</text>
            {/* gateway */}
            <rect x="300" y="54" width="44" height="42" rx="5" fill="none" stroke="var(--orange)" strokeWidth="1.6" />
            <text x="322" y="112" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--tx-mute)">gateway</text>
            {/* tunnel line */}
            <line x1="64" y1="75" x2="300" y2="75" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="4 5" />
            <text x="182" y="64" textAnchor="middle" fontFamily="var(--mono)" fontSize="9" fill="var(--allow)">mTLS · encrypted</text>
            {/* travelling packet */}
            <circle className="cap-packet" r="4" fill="var(--orange)" style={{ offsetPath: "path('M64 75 H300')" } as React.CSSProperties} />
            {/* drop-all firewall blocking an intruder from below */}
            <line x1="182" y1="92" x2="182" y2="138" stroke="var(--deny)" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.7" />
            <g className="cap-blocked">
              <circle cx="156" cy="132" r="4" fill="var(--deny)" />
            </g>
            <text x="200" y="135" fontFamily="var(--mono)" fontSize="9" fill="var(--deny)">drop-all firewall</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function VisualIAM() {
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="your accounts → your apps" />
        <div className="cap-group-h">Accounts you already have</div>
        <div className="cap-chips flow">
          {["Microsoft AD", "Microsoft 365", "Google Workspace", "LDAP"].map((c) => (
            <span key={c} className="cap-chip2">
              {c}
            </span>
          ))}
        </div>
        <div className="cap-group-h">What your team gets</div>
        <div className="cap-chips flow">
          {["One login", "Extra sign-in checks", "Access by role", "Auto setup & removal"].map((c) => (
            <span key={c} className="cap-chip2">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualSSO() {
  const [run, setRun] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRun(true), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="one login opens everything" />
        <div className={`cap-apps ${run ? "run" : ""}`}>
          {["CRM", "Mail", "Wiki", "VPN"].map((a) => (
            <div key={a} className="cap-app">
              <span className="lk">
                <Lock />
              </span>
              <span className="ck">
                <Tick />
              </span>
            </div>
          ))}
        </div>
        <button className="cap-vbtn" onClick={() => setRun((r) => !r)} type="button">
          {run ? "Reset" : "Authenticate once →"}
        </button>
      </div>
    </div>
  );
}

function VisualMFA() {
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="the extra check" />
        <div className="cap-seq run">
          {[
            ["Tap on your phone", "done"],
            ["6-digit code", "done"],
            ["Face unlock", "done"],
            ["Security key", "done"],
          ].map(([l, s]) => (
            <div key={l} className="cap-vrow ok">
              <span className="dot" />
              {l}
              <span className="tail">
                <span className="pill allow">{s}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualContext() {
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="checking the rules" />
        <div className="cap-seq run">
          {[
            ["Trusted network", "ok", "yes"],
            ["Allowed location", "ok", "yes"],
            ["Working hours", "ok", "yes"],
            ["Device is safe", "ok", "yes"],
            ["Already logged in elsewhere", "no", "blocked"],
          ].map(([l, st, tag]) => (
            <div key={l} className={`cap-vrow ${st === "no" ? "no" : "ok"}`}>
              <span className="dot" />
              {l}
              <span className="tail">
                <span className={`pill ${st === "no" ? "deny" : "allow"}`}>{tag}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualPlatform() {
  return (
    <div className="cap-vis">
      <div className="iz-panel">
        <PBar title="what it covers" />
        <div className="cap-group-h">Kinds of app</div>
        <div className="cap-chips flow">
          {["Websites", "Cloud apps", "In-house apps", "Remote desktops", "Servers", "File shares"].map((c) => (
            <span key={c} className="cap-chip2">
              {c}
            </span>
          ))}
        </div>
        <div className="cap-group-h">Devices &amp; systems</div>
        <div className="cap-chips flow">
          {["Windows", "Linux", "Mac", "iPhone", "Android"].map((c) => (
            <span key={c} className="cap-chip2">
              {c}
            </span>
          ))}
        </div>
        <div className="cap-group-h">Set it up your way</div>
        <div className="cap-chips flow">
          {["In the cloud", "Your server room", "A mix of both", "With or without an app"].map((c) => (
            <span key={c} className="cap-chip2">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- feature data (homepage = plain language, one CTA per slide) ---------- */
type Feature = {
  id: string;
  Icon: Icon;
  tab: [string, string];
  title: React.ReactNode;
  sub: string;
  href: string;
  cta: string;
  bullets: [string, string][];
  Visual: () => React.JSX.Element;
  footChips?: string[];
};

const FEATURES: Feature[] = [
  {
    id: "ztna",
    Icon: ShieldCheck,
    tab: ["Replace your VPN", "no more VPN"],
    title: (
      <>
        Let people in — <em>without a VPN</em>
      </>
    ),
    sub: "Your apps stay invisible to the internet. People reach only what they're allowed to — nothing else, ever.",
    href: "/zero-trust-network-access",
    cta: "See it replace the VPN",
    Visual: VisualZTNA,
    bullets: [
      ["Always on", "Protected the moment the device turns on — nobody has to remember to connect."],
      ["Only work traffic", "Work apps go the secure way; everyday browsing stays fast and normal."],
      ["Nothing to attack", "Every uninvited connection is dropped — there's nothing out there to find."],
      ["Carries calls too", "Works for voice and calls, not just apps."],
      ["Locked end to end", "Every connection is encrypted, from the device all the way to the app."],
      ["Easy first setup", "Brand-new Windows devices connect safely the first time they're switched on."],
    ],
  },
  {
    id: "iam",
    Icon: IdentificationCard,
    tab: ["One identity", "accounts"],
    title: (
      <>
        One identity for <em>everything</em>
      </>
    ),
    sub: "Use the accounts your team already has, and let InstaSafe decide who's allowed where.",
    href: "/platform/iam",
    cta: "Explore identity",
    Visual: VisualIAM,
    bullets: [
      ["Works with your accounts", "Microsoft, Google and your existing company directories — no rip-and-replace."],
      ["Fits every app", "Connects to your apps using the common, standard sign-in methods."],
      ["Add an extra check", "Layer on a second step — a tap, a code or a fingerprint."],
      ["One login", "Sign in once and reach every app you're allowed to use."],
      ["The right access, automatically", "People get the access their role needs and can reset their own password."],
      ["Reach servers safely", "Secure access to remote desktops, servers and Windows sign-in."],
    ],
  },
  {
    id: "sso",
    Icon: KeyIcon,
    tab: ["One login", "single sign-on"],
    title: (
      <>
        One login, <em>every app</em>
      </>
    ),
    sub: "Sign in once in the morning. Every app your team is allowed to use simply opens.",
    href: "/zero-trust-features/single-sign-on",
    cta: "See one-login in action",
    Visual: VisualSSO,
    bullets: [
      ["Sign in once", "One trusted login opens all your work apps — no more password juggling."],
      ["No password sharing", "Apps get you in without ever seeing your actual password."],
      ["Always knows it's you", "Confirms your identity safely behind the scenes."],
      ["Your computer too", "Your Windows login can carry straight through, automatically."],
    ],
  },
  {
    id: "mfa",
    Icon: Fingerprint,
    tab: ["Stronger sign-in", "extra check"],
    title: (
      <>
        A password alone <em>isn&apos;t enough</em>
      </>
    ),
    sub: "Add a quick second proof it's really them — so a stolen password can't get anyone in.",
    href: "/multifactor-authentication",
    cta: "Try the sign-in demo",
    Visual: VisualMFA,
    footChips: ["Apps for Windows, Mac and Linux", "Mobile app for Android and iOS"],
    bullets: [
      ["Add it to anything", "Even your existing VPN or remote login can get the extra check."],
      ["Pick your method", "A tap, a 6-digit code, a text, a PIN or a security key."],
      ["Use a security key", "Works with any standard hardware key."],
      ["Fingerprint or face", "Use the fingerprint or face unlock already on the device."],
      ["Right at the login screen", "The extra check can happen as your computer signs in."],
      ["Or no password at all", "Sign in from your phone, completely password-free."],
    ],
  },
  {
    id: "context",
    Icon: Crosshair,
    tab: ["Smart rules", "access rules"],
    title: (
      <>
        Access that <em>reads the room</em>
      </>
    ),
    sub: "Allow or block based on the whole picture — not just who, but where, when and on what device.",
    href: "/zero-trust-features/device-posture-check",
    cta: "See the rules engine",
    Visual: VisualContext,
    bullets: [
      ["Where they are", "Allow access only from trusted places or networks."],
      ["When they're working", "Limit access to working hours, if you want to."],
      ["What they're on", "Only healthy, approved devices get through."],
      ["From a safe network", "Block requests coming from risky locations."],
      ["Your rules, your call", "Decide exactly how people prove who they are."],
      ["One session at a time", "Stop the same login being used in two places at once."],
    ],
  },
  {
    id: "platform",
    Icon: StackSimple,
    tab: ["Works everywhere", "coverage"],
    title: (
      <>
        Every app, <em>every device</em>
      </>
    ),
    sub: "Old apps, new apps, any operating system, in the cloud or your own server room — all covered.",
    href: "/platform",
    cta: "See the whole platform",
    Visual: VisualPlatform,
    bullets: [
      ["Any kind of app", "Websites, cloud apps, in-house apps, remote desktops, file shares and servers."],
      ["Safer browsing", "A built-in secure browser keeps web threats away from your devices."],
      ["Only safe devices", "Checks each device is approved and protected before letting it in."],
      ["Your accounts", "Works with the company directories you already run."],
      ["Deploy your way", "Cloud, your own server room, or a mix — with or without an app installed."],
      ["Every platform", "Windows, Linux, Mac, iPhone and Android."],
    ],
  },
];

export function CapabilitiesDeck() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const go = useCallback((i: number) => setActive((i + FEATURES.length) % FEATURES.length), []);

  // auto-advance
  useEffect(() => {
    if (paused || reduced) return;
    timer.current = setTimeout(() => setActive((a) => (a + 1) % FEATURES.length), DUR);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, paused, reduced]);

  const f = FEATURES[active];
  const playing = !paused && !reduced;

  return (
    <div className="cap" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ ["--cap-dur" as string]: `${DUR}ms` }}>
      {/* tab strip */}
      <div className="cap-tabs" role="tablist" aria-label="Capabilities">
        {FEATURES.map((feat, i) => (
          <button
            key={feat.id}
            role="tab"
            aria-selected={i === active}
            className={`cap-tab ${i === active ? "on" : ""} ${i === active && playing ? "play" : ""}`}
            onClick={() => go(i)}
          >
            <feat.Icon className="ic" weight="regular" />
            <span className="lb">
              <span className="lb1">{feat.tab[0]}</span>
              <span className="lb2">{feat.tab[1]}</span>
            </span>
            <span className="bar" />
          </button>
        ))}
      </div>

      {/* stage */}
      <div className="cap-stage">
        <button className="cap-arrow prev" onClick={() => go(active - 1)} aria-label="Previous capability">
          <CaretLeft weight="bold" />
        </button>
        <button className="cap-arrow next" onClick={() => go(active + 1)} aria-label="Next capability">
          <CaretRight weight="bold" />
        </button>

        {/* key remounts the stage so visuals + bullets replay on change */}
        <div className="cap-grid" key={f.id}>
          <div className="cap-left">
            <f.Visual />
          </div>
          <div className="cap-right" role="tabpanel">
            <span className="iz-ey">{f.tab[0]}</span>
            <h3 className="cap-title">{f.title}</h3>
            <p className="cap-sub">{f.sub}</p>
            <ul className="cap-bullets">
              {f.bullets.map(([b, d]) => (
                <li key={b} className="cap-bullet">
                  <span className="bi">
                    <Check weight="bold" />
                  </span>
                  <span className="bt">
                    <b>{b}</b> — {d}
                  </span>
                </li>
              ))}
            </ul>
            {f.footChips && (
              <div className="cap-foot-chips">
                {f.footChips.map((c) => (
                  <span key={c} className="iz-chip">
                    {c}
                  </span>
                ))}
              </div>
            )}
            <div className="cap-cta">
              <a href={f.href} className="iz-btn iz-btn-pri iz-btn-sm">
                {f.cta}
                <ArrowRight weight="bold" />
              </a>
              <a href="/book-a-demo" className="iz-btn iz-btn-ghost iz-btn-sm">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
