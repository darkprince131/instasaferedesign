"use client";

import { useState } from "react";
import {
  ArrowsLeftRight,
  ShieldCheck,
  Fingerprint,
  Key,
  SlidersHorizontal,
  VideoCamera,
  Export,
  MapPin,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Feature split — clickable feature list (left) drives a screen
   on the right. Remodelled from the Fingerprint "For Developers"
   reference into InstaSafe capabilities.

   ▸ HOW TO SWAP A FEATURE'S RIGHT-SIDE VISUAL ◂
   Each feature has a `viz` field. Replace just that field — the
   window frame, title bar and cross-fade stay the same:

     viz: { kind: "json",  file: "access.json", lines: [...] }   // default mock
     viz: { kind: "image", file: "access.gif",  src: "/features/access.gif", alt: "…" }
     viz: { kind: "video", file: "access.mp4",  src: "/features/access.webm" }
     viz: { kind: "node",  file: "access",      node: <YourSvgAnimation /> }

   Put files in /public (e.g. /public/features/access.gif). Nothing
   else needs to change. Scoped `.fx-`; tokens from `.iz`.
   ============================================================ */

export type Viz =
  | { kind: "json"; file: string; lines: string[] }
  | { kind: "image"; file: string; src: string; alt: string }
  | { kind: "video"; file: string; src: string; poster?: string }
  | { kind: "node"; file: string; node: React.ReactNode };

export type Feature = { id: string; icon: Icon; title: string; viz: Viz };

const FEATURES: Feature[] = [
  {
    id: "access",
    icon: ArrowsLeftRight,
    title: "Per-app access",
    viz: {
      kind: "json",
      file: "access.json",
      lines: [
        `{`,
        `  "user": "anita.r",`,
        `  "app": "billing-portal",`,
        `  "decision": "allow",`,
        `  "exposed_ports": 0,`,
        `  "lateral_movement": false,`,
        `  "tunnel": "mTLS"`,
        `}`,
      ],
    },
  },
  {
    id: "posture",
    icon: ShieldCheck,
    title: "Device posture",
    viz: {
      kind: "json",
      file: "posture.json",
      lines: [
        `{`,
        `  "device": "WIN-FIN-114",`,
        `  "managed": true,`,
        `  "checks_passed": 25,`,
        `  "checks_total": 25,`,
        `  "disk_encrypted": true,`,
        `  "av_running": true`,
        `}`,
      ],
    },
  },
  {
    id: "mfa",
    icon: Fingerprint,
    title: "Multi-factor auth",
    viz: {
      kind: "json",
      file: "mfa.json",
      lines: [
        `{`,
        `  "factor": "push",`,
        `  "verified": true,`,
        `  "methods": ["totp", "fido2", "push"],`,
        `  "step_up_required": false,`,
        `  "passwordless": true`,
        `}`,
      ],
    },
  },
  {
    id: "sso",
    icon: Key,
    title: "Single sign-on",
    viz: {
      kind: "json",
      file: "sso.json",
      lines: [
        `{`,
        `  "protocol": "SAML",`,
        `  "directory": "AzureAD",`,
        `  "apps_unlocked": 42,`,
        `  "logins_today": 12400,`,
        `  "password_fatigue": false`,
        `}`,
      ],
    },
  },
  {
    id: "policy",
    icon: SlidersHorizontal,
    title: "Conditional access",
    viz: {
      kind: "json",
      file: "policy.json",
      lines: [
        `{`,
        `  "rule": "Finance-RW",`,
        `  "if_geo": "IN",`,
        `  "if_time": "09:00-18:00",`,
        `  "if_risk": "low",`,
        `  "else": "deny"`,
        `}`,
      ],
    },
  },
  {
    id: "session",
    icon: VideoCamera,
    title: "Session recording",
    viz: {
      kind: "json",
      file: "session.json",
      lines: [
        `{`,
        `  "session": "2f9a",`,
        `  "protocol": "RDP",`,
        `  "recorded": true,`,
        `  "duration_s": 1084,`,
        `  "replayable": true`,
        `}`,
      ],
    },
  },
  {
    id: "audit",
    icon: Export,
    title: "Audit & SIEM export",
    viz: {
      kind: "json",
      file: "audit.json",
      lines: [
        `{`,
        `  "event_types": 202,`,
        `  "formats": ["CEF", "LEEF", "JSON"],`,
        `  "streamed_to": "splunk",`,
        `  "retention_days": 365`,
        `}`,
      ],
    },
  },
  {
    id: "geo",
    icon: MapPin,
    title: "Geo-fencing",
    viz: {
      kind: "json",
      file: "geo.json",
      lines: [
        `{`,
        `  "country": "IN",`,
        `  "allowed": true,`,
        `  "impossible_travel": false,`,
        `  "blocklist_hit": false`,
        `}`,
      ],
    },
  },
];

/* tiny JSON highlighter — keys orange, strings bright, true=allow,
   false=deny, numbers dim, punctuation muted. */
const TOKEN = /("(?:[^"\\]|\\.)*")(\s*:)?|\b(true|false|null)\b|(-?\d+\.?\d*)/g;
function highlight(line: string, i: number) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = TOKEN.exec(line))) {
    if (m.index > last) out.push(<span key={k++}>{line.slice(last, m.index)}</span>);
    if (m[1]) {
      out.push(<span key={k++} className={m[2] ? "fx-key" : "fx-str"}>{m[1]}</span>);
      if (m[2]) out.push(<span key={k++} className="fx-pun">{m[2]}</span>);
    } else if (m[3]) {
      out.push(<span key={k++} className={m[3] === "true" ? "fx-true" : m[3] === "false" ? "fx-false" : "fx-null"}>{m[3]}</span>);
    } else if (m[4]) {
      out.push(<span key={k++} className="fx-num">{m[4]}</span>);
    }
    last = TOKEN.lastIndex;
  }
  if (last < line.length) out.push(<span key={k++}>{line.slice(last)}</span>);
  TOKEN.lastIndex = 0;
  return (
    <div className="fx-line" key={i}>
      {out}
    </div>
  );
}

function VizBody({ viz }: { viz: Viz }) {
  if (viz.kind === "image") {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img className="fx-media" src={viz.src} alt={viz.alt} loading="lazy" />;
  }
  if (viz.kind === "video") {
    return <video className="fx-media" src={viz.src} poster={viz.poster} autoPlay loop muted playsInline />;
  }
  if (viz.kind === "node") {
    return <div className="fx-node">{viz.node}</div>;
  }
  return <div className="fx-json">{viz.lines.map((l, i) => highlight(l, i))}</div>;
}

/* `features`/`eyebrow` are optional and default to the lab set, so every
   existing call site keeps working while real pages pass their own content. */
export function FeatureSplit({
  features = FEATURES,
  eyebrow = "For security teams_",
  title,
  lead,
  /* pages that already carry a CTA above/below this block pass cta={false}
     rather than stacking a second "Book a demo" into the same screen */
  cta = true,
}: {
  features?: Feature[];
  eyebrow?: string;
  title?: React.ReactNode;
  lead?: string;
  cta?: boolean;
} = {}) {
  const [active, setActive] = useState(0);
  const cur = features[active];

  return (
    <div className="fx">
      {/* LEFT */}
      <div className="fx-left">
        <span className="fx-ey">{eyebrow}</span>
        <h2 className="fx-title">
          {title ?? (
            <>
              One platform, <em>every signal</em>.
            </>
          )}
        </h2>
        <p className="fx-lead">
          {lead ??
            "Identity, device, location and session — every access decision is checked against all four, every time."}
        </p>
        {cta && (
          <div className="fx-cta">
            {/* was /instasafe-zero-trust-pricing — a button labelled
                "Book a demo" that landed on the pricing page. Wrong
                destination for its own label, and pricing is not
                something this site discloses. */}
            <a href="/book-a-demo" className="iz-btn iz-btn-pri iz-btn-sm">Book a demo</a>
            <span className="fx-stat">25 device checks · 144 named policy rules</span>
          </div>
        )}

        <div className="fx-grid" role="tablist" aria-label="Capabilities">
          {features.map((f, i) => {
            const I = f.icon;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={i === active}
                className={`fx-item${i === active ? " on" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="fx-item-ic"><I weight={i === active ? "fill" : "regular"} /></span>
                <span className="fx-item-t">{f.title}</span>
              </button>
            );
          })}
        </div>

        <a href="/platform" className="fx-all">See all capabilities ↗</a>
      </div>

      {/* RIGHT — swappable screen */}
      <div className="fx-right">
        <div className="fx-window" role="tabpanel" aria-label={cur.title}>
          <div className="fx-bar">
            <span className="fx-dots"><i /><i /><i /></span>
            <span className="fx-file">{"{}"} {cur.viz.file}</span>
            <span className="fx-brand">INSTASAFE.IO</span>
          </div>
          <div className="fx-screen" key={cur.id}>
            <VizBody viz={cur.viz} />
          </div>
        </div>
      </div>
    </div>
  );
}
