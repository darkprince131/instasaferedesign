"use client";

import {
  EyeSlash,
  Fingerprint,
  Lock,
  MapPin,
  Monitor,
  ShieldCheck,
  SquaresFour,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./ssohero.css";

/* ============================================================
   SsoScenes — the hero visual for /zero-trust-features/single-sign-on.

   ONE LOGIN, READ LEFT TO RIGHT. The page's whole claim is a
   sequence: a person signs in once, five checks run inside that one
   login, and every application they were provisioned opens. Drawn as
   three columns in that order, the sentence and the picture say the
   same thing — which is the point of putting them side by side.

   STATIC. The page's moving interactive is OneLoginRace, further
   down, behind its own button. A hero that animates competes with
   the headline (see the interaction-placement rule).

   THE MARK, NOT A SHIELD. Product chrome carries <LogoMark />.
   ============================================================ */

type Check = { label: string; value: string; Icon: Icon };

const CHECKS: Check[] = [
  { label: "Password", value: "Verified", Icon: Lock },
  { label: "MFA", value: "Approved", Icon: Fingerprint },
  { label: "Device", value: "Trusted", Icon: Monitor },
  { label: "Location", value: "Bangalore, India", Icon: MapPin },
  { label: "Risk", value: "Low", Icon: ShieldCheck },
];

/* Seven applications, six of them real brand marks we ship. Jira and
   Confluence are in the reference but we hold no licensed asset for
   them, so the rail uses integrations we actually own rather than
   inventing logos. The last row is an internal app and correctly has
   no vendor mark at all. */
type App = { name: string; logo?: string; Icon?: Icon };
const APPS: App[] = [
  { name: "AWS Console", logo: "aws" },
  { name: "Google Workspace", logo: "google" },
  { name: "GitHub", logo: "github" },
  { name: "Salesforce", logo: "salesforce" },
  { name: "Slack", logo: "slack" },
  { name: "Microsoft 365", logo: "microsoft-365" },
  { name: "HR Portal", Icon: UsersThree },
];

export function SsoHeroScene() {
  return (
    <div className="ssoh" aria-hidden="true">
      {/* ---------- one login ---------- */}
      <div className="ssoh-login">
        <LogoMark size={26} />
        <b>Welcome back</b>
        <span className="ssoh-field">arun.k@instasafe.com</span>
        <span className="ssoh-field ssoh-field--pw">
          ••••••••••
          <EyeSlash size={13} weight="regular" />
        </span>
        <span className="ssoh-signin">Sign in</span>
      </div>

      {/* ---------- what runs inside it ---------- */}
      <div className="ssoh-auth">
        <div className="ssoh-auth-h">
          <Lock size={13} weight="regular" />
          Authentication
        </div>
        {CHECKS.map((c) => (
          <div className="ssoh-check" key={c.label}>
            <span className="ssoh-check-ic">
              <c.Icon size={15} weight="regular" />
            </span>
            <span className="ssoh-check-t">
              <b>{c.label}</b>
              <i>{c.value}</i>
            </span>
            <s />
          </div>
        ))}
        <div className="ssoh-granted">
          Access granted
          <span className="ssoh-tick">
            <ShieldCheck size={12} weight="regular" />
          </span>
        </div>
      </div>

      {/* ---------- and everything it opens ---------- */}
      <div className="ssoh-apps">
        {APPS.map((a) => (
          <div className="ssoh-app" key={a.name}>
            <span className="ssoh-app-l">
              {a.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" decoding="async" />
              ) : (
                a.Icon && <a.Icon size={17} weight="regular" />
              )}
            </span>
            <b>{a.name}</b>
            <s />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   The four claims under the hero. Text only — this is the summary of
   the picture above it, so a second set of graphics would restate
   what the reader has just looked at.
   ============================================================ */

const CELLS: { t: string; d: string; Icon: Icon }[] = [
  {
    t: "One identity",
    d: "One username and password for everything you're allowed to access.",
    Icon: Fingerprint,
  },
  {
    t: "Built-in security",
    d: "MFA, device trust and risk checks protect every login by default.",
    Icon: ShieldCheck,
  },
  {
    t: "Zero friction",
    d: "Users get to their work faster. IT stays in control.",
    Icon: SquaresFour,
  },
  {
    t: "Nothing extra",
    d: "No shared passwords. No excess access. No exceptions.",
    Icon: EyeSlash,
  },
];

export function SsoHeroCells() {
  return (
    <div className="ssoh-cells">
      {CELLS.map((c) => (
        <div className="ssoh-cell" key={c.t}>
          <c.Icon size={22} weight="regular" />
          <b>{c.t}</b>
          <span>{c.d}</span>
        </div>
      ))}
    </div>
  );
}
