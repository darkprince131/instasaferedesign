"use client";

import {
  User,
  UsersThree,
  Laptop,
  ShieldCheck,
  AppWindow,
  MapPin,
  Fingerprint,
  Gauge,
  Clock,
  WifiHigh,
  Monitor,
  Key,
  VideoCamera,
  Terminal,
  Tag,
  Certificate,
  Export,
  EyeSlash,
  Drop,
  X,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Detailed access rules — "FilterStream".
   Reworked from the Dub "Detailed filters" card into InstaSafe:
   each chip is one access-rule condition (field · is · value).
   Rows marquee horizontally; alternate rows drift the opposite
   way. The whole card is one big "build a precise rule" picture.
   Pauses on hover; freezes for reduced-motion.
   Scoped `.fs-`; tokens from `.iz`.
   ============================================================ */

type Cond = { fi: Icon; field: string; vi?: Icon; value: string };

const F = (fi: Icon, field: string, value: string, vi?: Icon): Cond => ({ fi, field, vi, value });

/* Four rows of conditions — identity, device, location, risk. */
const ROWS: Cond[][] = [
  [
    F(User, "User", "anita.r"),
    F(UsersThree, "Group", "Finance", UsersThree),
    F(Key, "Auth", "SSO"),
    F(Fingerprint, "MFA", "Passed"),
    F(AppWindow, "App", "billing-portal", AppWindow),
    F(Tag, "Tag", "Contractor"),
  ],
  [
    F(Laptop, "Device", "Managed"),
    F(ShieldCheck, "Posture", "25/25"),
    F(Monitor, "OS", "Windows 11"),
    F(Certificate, "Cert", "Valid"),
    F(VideoCamera, "Session", "Recorded"),
    F(Terminal, "Protocol", "RDP"),
  ],
  [
    F(MapPin, "Geo", "India", MapPin),
    F(WifiHigh, "Network", "Corporate"),
    F(Clock, "Time", "09:00–18:00"),
    F(Gauge, "Risk", "Low"),
    F(AppWindow, "App", "finance-rdp", AppWindow),
    F(User, "User", "sophia.m"),
  ],
  [
    F(Gauge, "Risk score", "< 30"),
    F(Fingerprint, "Step-up", "Required"),
    F(Certificate, "Cert", "Pinned"),
    F(Drop, "Watermark", "On"),
    F(EyeSlash, "Servers", "Blackened"),
    F(Clock, "Window", "Mon–Fri"),
  ],
  [
    F(Export, "SIEM", "Streamed"),
    F(Terminal, "Protocol", "SSH"),
    F(AppWindow, "App", "analytics-db", AppWindow),
    F(UsersThree, "Group", "Contractors", UsersThree),
    F(MapPin, "Geo", "∉ blocklist"),
    F(Key, "Auth", "FIDO2"),
  ],
];

function Chip({ c }: { c: Cond }) {
  const Fi = c.fi;
  const Vi = c.vi;
  return (
    <span className="fs-chip" aria-hidden="true">
      <span className="fs-field">
        <Fi weight="regular" />
        {c.field}
      </span>
      <span className="fs-is">is</span>
      <span className="fs-val">
        {Vi ? <Vi weight="fill" /> : null}
        {c.value}
      </span>
      <span className="fs-x">
        <X weight="bold" />
      </span>
    </span>
  );
}

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* `embed` renders only the marquee animation (no card chrome / footer)
   so it can be dropped into another card's media slot. */
export function FilterStream({ href = "/zero-trust-network-access", embed = false }: { href?: string; embed?: boolean }) {
  const stage = (
    <div className={`fs-stage${embed ? " embed" : ""}`} aria-hidden="true">
      {ROWS.map((row, ri) => (
        <div className={`fs-row${ri % 2 ? " rev" : ""}`} key={ri} style={{ ["--dur" as string]: `${38 + ri * 7}s` }}>
          {/* duplicated track → seamless -50% loop */}
          <div className="fs-track">
            {[...row, ...row].map((c, i) => (
              <Chip c={c} key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (embed) return <div className="fs-embed">{stage}</div>;

  return (
    <div className="fs-card">
      {stage}

      <div className="fs-foot">
        <span className="iz-ey">21 rule combinations</span>
        <h3 className="fs-title">
          Detailed <em>access rules</em>.
        </h3>
        <p className="fs-desc">
          Combine identity, device, location and risk into one precise rule — exactly who gets in, from which device, to which app.
        </p>
        <a className="fs-learn" href={href}>
          Learn more {Arrow}
        </a>
      </div>
    </div>
  );
}
