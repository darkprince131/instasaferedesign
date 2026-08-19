"use client";

import { useState } from "react";
import {
  Buildings,
  Clock,
  Database,
  DesktopTower,
  EnvelopeSimple,
  Fingerprint,
  IdentificationCard,
  Lock,
  Monitor,
  SealCheck,
  Terminal,
  Trophy,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   IamScenes — the bespoke visuals for /platform/iam.

   IamHeroScene is the hero's right column: one login, traced gate by
   gate, with the person it belongs to and the policy that decided it
   sitting beside it, and the resources it opened underneath. It is
   STATIC. The page's moving interactive is IamPolicyLab further down,
   per the interaction-placement rule — a hero that animates competes
   with the headline and with the thing it is trying to sell.

   IamPolicyLab is the same decision made arguable: change one
   condition and watch the six gates and the verdict move with it. It
   is deliberately a different composition from the hero — a rail of
   gates rather than a stacked card — so the page does not show the
   same picture twice.

   THE MARK, NOT A SHIELD. Every piece of product chrome here carries
   <LogoMark />. A generic shield in a console is a stock illustration
   of security; the mark is the product.
   ============================================================ */

/* ---------- the person ----------
   The portrait is a real photograph dropped in at this path. Until it
   exists the tile falls back to the initials block underneath — there
   is deliberately no user-glyph placeholder, because a line-art avatar
   in a product mock reads as a wireframe rather than as a person. */
const PORTRAIT = "/people/alen-joseph-640.webp";

type Gate = { k: string; label: string; sub: string; verdict: string; Icon: Icon; tone: "ok" | "accent" };

const GATES: Gate[] = [
  { k: "user", label: "User", sub: "alen.j@instasafe.com", verdict: "Verified", Icon: IdentificationCard, tone: "ok" },
  { k: "dir", label: "Directory", sub: "Active Directory", verdict: "Synced", Icon: Database, tone: "ok" },
  { k: "mfa", label: "MFA", sub: "Authenticator app", verdict: "Passed", Icon: Lock, tone: "ok" },
  { k: "device", label: "Device", sub: "macOS 14.4.1", verdict: "Trusted", Icon: Monitor, tone: "ok" },
  { k: "risk", label: "Risk", sub: "Contextual risk", verdict: "Low", Icon: Fingerprint, tone: "ok" },
];

const POLICY = [
  { k: "Location", v: "Bangalore, India" },
  { k: "Device posture", v: "Compliant" },
  { k: "Network", v: "Corporate" },
  { k: "Time window", v: "Business hours" },
  { k: "App sensitivity", v: "Medium" },
  { k: "Rule match", v: "Engineering access" },
];

const RESOURCES: { name: string; kind: string; Icon: Icon }[] = [
  { name: "AWS Console", kind: "Cloud resource", Icon: Buildings },
  { name: "Finance App", kind: "SaaS application", Icon: Trophy },
  { name: "SSH Gateway", kind: "Infrastructure", Icon: Terminal },
  { name: "HR Portal", kind: "Internal application", Icon: UsersThree },
];

/* The photograph is a CSS background rather than an <img>, deliberately.
   A missing background paints nothing and the initials underneath stay
   visible; a missing <img> is a broken-image box in several browsers.
   Drop the file at PORTRAIT and it appears — no code change. */
function Portrait() {
  return (
    <span className="iam-face" style={{ ["--iam-face-src" as string]: `url(${PORTRAIT})` }}>
      <b aria-hidden="true">AJ</b>
    </span>
  );
}

export function IamHeroScene() {
  return (
    <div className="iam-scene" aria-hidden="true">
      <div className="iam-scene-top">
        {/* LEFT COLUMN — the trace, and directly under it what the trace
            opened. The resources used to be a full-width row beneath the
            whole scene, which left the space under DECISION empty while
            making the hero taller than a laptop viewport. Stacked here as
            a 2x2 they fill that gap and the two columns finish level. */}
        <div className="iam-scene-main">
        {/* ---------- the trace ---------- */}
        <div className="iam-card iam-trace">
          <div className="iam-card-h">
            <span className="iam-mono">Login trace</span>
            <span className="iam-mono iam-dim">08:42:17 AM</span>
          </div>
          {GATES.map((g) => (
            <div className="iam-gate" key={g.k}>
              <span className="iam-gate-ic">
                <g.Icon size={16} weight="regular" />
              </span>
              <span className="iam-gate-t">
                <b>{g.label}</b>
                <i>{g.sub}</i>
              </span>
              <span className="iam-verdict ok">
                {g.verdict}
                <s />
              </span>
            </div>
          ))}
          <div className="iam-gate iam-gate--decision">
            <span className="iam-gate-ic accent">
              <SealCheck size={16} weight="regular" />
            </span>
            <span className="iam-gate-t">
              <b>Decision</b>
              <i>Access approved</i>
            </span>
            <span className="iam-verdict accent">
              Allow
              <s />
            </span>
          </div>
        </div>

        {/* ---------- and what it opened ---------- */}
        <div className="iam-fan">
          <span className="iam-node">
            <LogoMark size={26} />
          </span>
          <div className="iam-res">
            {RESOURCES.map((r) => (
              <div className="iam-card iam-res-c" key={r.name}>
                <span className="iam-res-h">
                  <r.Icon size={18} weight="regular" />
                  <b>{r.name}</b>
                  <s />
                </span>
                <span className="iam-res-k">{r.kind}</span>
                <span className="iam-res-v">Allowed</span>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* ---------- who it was, and what decided ---------- */}
        <div className="iam-scene-side">
          <div className="iam-card iam-who">
            <Portrait />
            <div className="iam-who-t">
              {/* the cast registry's Alen Joseph — same person the trace,
                  the audit lines and the portrait already name */}
              <b>Alen Joseph</b>
              <span>Infrastructure Engineer</span>
              <span>IT Operations</span>
            </div>
            <div className="iam-who-rows">
              <span>
                <EnvelopeSimple size={14} weight="regular" />
                alen.j@instasafe.com
              </span>
              <span>
                <Buildings size={14} weight="regular" />
                Bangalore, India
              </span>
              <span>
                <Clock size={14} weight="regular" />
                08:42 AM IST
              </span>
            </div>
            <span className="iam-chip ok">Active</span>
          </div>

          <div className="iam-card iam-policy">
            <div className="iam-card-h">
              <span className="iam-mono">Policy evaluation</span>
            </div>
            {POLICY.map((p) => (
              <div className="iam-prow" key={p.k}>
                <span className="iam-mono iam-dim">{p.k}</span>
                <b>{p.v}</b>
              </div>
            ))}
            <div className="iam-prow iam-prow--result">
              <span className="iam-mono">Result</span>
              <b>Allow</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   IamPolicyLab — the signature interactive.

   Four scenarios, one identity. Every scenario is the SAME person
   with the same entitlements; only the context around the login
   changes. That is the argument risk-based authentication makes, and
   it only lands if the user is held constant while the verdict moves.
   ============================================================ */

type Verdict = "allow" | "stepup" | "deny";
type Scenario = {
  id: string;
  label: string;
  blurb: string;
  /** per gate: the reading this scenario produces */
  gates: Record<string, { v: string; state: "ok" | "warn" | "no" }>;
  result: Verdict;
  resultLine: string;
  log: string;
};

const G_KEYS = ["Location", "Device", "Network", "Time", "MFA", "Risk score"];

const SCENARIOS: Scenario[] = [
  {
    id: "normal",
    label: "Office login",
    blurb: "Known device, corporate network, business hours. Nothing to challenge — the friction is invisible.",
    gates: {
      Location: { v: "Bangalore, IN", state: "ok" },
      Device: { v: "Enrolled · compliant", state: "ok" },
      Network: { v: "Corporate", state: "ok" },
      Time: { v: "08:42 IST", state: "ok" },
      MFA: { v: "Session valid", state: "ok" },
      "Risk score": { v: "12 · low", state: "ok" },
    },
    result: "allow",
    resultLine: "Access approved — no step-up required",
    log: "08:42:21  alen.j@instasafe.com  ALLOW  rule: engineering-access",
  },
  {
    id: "country",
    label: "New country",
    blurb: "Same credentials, same laptop — somewhere the policy has never seen this user. The factor gets harder, the session does not open on trust alone.",
    gates: {
      Location: { v: "Frankfurt, DE", state: "warn" },
      Device: { v: "Enrolled · compliant", state: "ok" },
      Network: { v: "Public Wi-Fi", state: "warn" },
      Time: { v: "05:10 IST", state: "warn" },
      MFA: { v: "Step-up demanded", state: "warn" },
      "Risk score": { v: "58 · elevated", state: "warn" },
    },
    result: "stepup",
    resultLine: "Step-up challenge issued — reason recorded with the decision",
    log: "05:10:44  alen.j@instasafe.com  STEP_UP  reason: new-geography",
  },
  {
    id: "device",
    label: "Unmanaged device",
    blurb: "The right person on the wrong machine. Credentials are not the gate they think they are.",
    gates: {
      Location: { v: "Bangalore, IN", state: "ok" },
      Device: { v: "Not enrolled", state: "no" },
      Network: { v: "Home broadband", state: "warn" },
      Time: { v: "21:35 IST", state: "ok" },
      MFA: { v: "Not offered", state: "no" },
      "Risk score": { v: "81 · high", state: "no" },
    },
    result: "deny",
    resultLine: "Access denied — device not enrolled, enrolment request raised",
    log: "21:35:02  alen.j@instasafe.com  DENY  reason: device-unenrolled",
  },
  {
    id: "leaver",
    label: "After offboarding",
    blurb: "One action in the directory, and everything downstream is already closed. There is no second user list still holding the door open.",
    gates: {
      Location: { v: "Bangalore, IN", state: "ok" },
      Device: { v: "Enrolled · compliant", state: "ok" },
      Network: { v: "Corporate", state: "ok" },
      Time: { v: "09:02 IST", state: "ok" },
      MFA: { v: "Not reached", state: "no" },
      "Risk score": { v: "—", state: "no" },
    },
    result: "deny",
    resultLine: "Identity disabled in directory — portal, apps, tunnels and OS logins all closed",
    log: "09:02:11  alen.j@instasafe.com  DENY  reason: identity-disabled",
  },
];

export function IamPolicyLab() {
  const [active, setActive] = useState(0);
  const s = SCENARIOS[active];

  return (
    <div className="iam-lab">
      <div className="iam-lab-pick" role="tablist" aria-label="Login scenario">
        {SCENARIOS.map((sc, i) => (
          <button
            key={sc.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "on" : undefined}
            onClick={() => setActive(i)}
          >
            {sc.label}
          </button>
        ))}
      </div>

      <p className="iam-lab-blurb">{s.blurb}</p>

      <div className="iam-lab-grid">
        {G_KEYS.map((k) => {
          const g = s.gates[k];
          return (
            <div className={`iam-lab-gate ${g.state}`} key={k}>
              <span className="iam-mono iam-dim">{k}</span>
              <b>{g.v}</b>
            </div>
          );
        })}
      </div>

      <div className={`iam-lab-out ${s.result}`}>
        <span className="iam-mono">
          {s.result === "allow" ? "Allow" : s.result === "stepup" ? "Step up" : "Deny"}
        </span>
        <p>{s.resultLine}</p>
      </div>

      <div className="iam-lab-log">
        <span className="iam-mono iam-dim">access log</span>
        <code>{s.log}</code>
      </div>
    </div>
  );
}

/* Small helper used by the page: the identity sources that feed the
   directory. Text-only, because the answer illustration already draws
   the directory and a second diagram of it would be a repeat. */
export function IamSources() {
  const rows: { k: string; v: string; Icon: Icon }[] = [
    { k: "Directory sync", v: "Active Directory, LDAP, Azure AD, Google Workspace, O365 — or InstaSafe's built-in directory", Icon: Database },
    { k: "As an IdP", v: "SAML 2.0, RADIUS, OIDC, OAuth, JWT, CAS, TACACS+ — IdP-initiated and SP-initiated", Icon: IdentificationCard },
    { k: "Behind your IdP", v: "InstaSafe can equally sit as the service provider to an IdP you already run", Icon: Lock },
    { k: "OS-level", v: "Windows logon MFA, RDP and SSH authentication, VDI — identity reaches past the browser", Icon: DesktopTower },
  ];
  return (
    <div className="iam-sources">
      {rows.map((r) => (
        <div className="iam-source" key={r.k}>
          <r.Icon size={20} weight="regular" />
          <b>{r.k}</b>
          <span>{r.v}</span>
        </div>
      ))}
    </div>
  );
}
