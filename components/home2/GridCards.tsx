"use client";

import {
  CheckCircle,
  Circle,
  Play,
  type Icon,
} from "@phosphor-icons/react";
import { FilterStream } from "@/components/home2/FilterStream";
import { AggregateStack } from "@/components/home2/AggregateStack";

/* ============================================================
   Grid cards — a reusable card for feature/capability grids,
   remodelled from the reference (preview panel on top, a mono
   <Tag/> + description below).

   ▸ EACH CARD'S VISUAL IS A SWAPPABLE SLOT ◂
   Pass `media` as one of:
     { kind: "node",  node: <YourSvgAnimation /> }   // static OR animated SVG / any JSX
     { kind: "image", src: "/cards/x.svg", alt: "…" } // svg / png / gif
     { kind: "video", src: "/cards/x.webm" }          // mp4 / webm

   The card frame, hover, tag and description stay identical —
   only the slot changes. Use <CardGrid> to lay them out.
   Scoped `.fc-` / `.gm-`; tokens from `.iz`.
   ============================================================ */

export type CardMedia =
  | { kind: "node"; node: React.ReactNode }
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster?: string };

/* 4 layout variants — change `variant` to pick the card shape:
   1) "media-top"      graphic on top, text below
   2) "media-top-cta"  graphic on top, text below + CTA button
   3) "text-top"       text on top, graphic below
   4) "text-top-link"  text on top + inline link, graphic below      */
export type CardVariant = "media-top" | "media-top-cta" | "text-top" | "text-top-link";

export type GridCardProps = {
  variant?: CardVariant;
  tag?: string; // optional mono "<Tag/>" label (media-top)
  title?: string; // heading
  desc: string;
  link?: { label: string; href: string }; // shown when variant ends in "-link"
  cta?: { label: string; href: string }; // shown when variant ends in "-cta"
  href?: string; // makes the whole media-top card a link
  tone?: 1 | 2 | 3 | 4 | 5; // optional pastel tint for the media panel
  media: CardMedia;
};

function Media({ media }: { media: CardMedia }) {
  if (media.kind === "image") {
    /* eslint-disable-next-line @next/next/no-img-element */
    return <img className="fc-img" src={media.src} alt={media.alt} loading="lazy" />;
  }
  if (media.kind === "video") {
    return <video className="fc-img" src={media.src} poster={media.poster} autoPlay loop muted playsInline />;
  }
  return <>{media.node}</>;
}

export function FeatureCard({ variant = "media-top", tag, title, desc, link, cta, href, tone, media }: GridCardProps) {
  const textTop = variant === "text-top" || variant === "text-top-link";

  // VARIANTS 3 & 4 — text on top, graphic below (+ inline link on -link)
  if (textTop) {
    return (
      <div className="fc v-text">
        <div className="fc-head">
          {title && <h3 className="fc-h">{title}</h3>}
          <p className="fc-desc">{desc}</p>
          {variant === "text-top-link" && link && (
            <a className="fc-link" href={link.href}>
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        <div className="fc-media grow">{media && <Media media={media} />}</div>
      </div>
    );
  }

  // VARIANTS 1 & 2 — graphic on top, text below (+ CTA button on -cta)
  const inner = (
    <>
      <div className={`fc-media${tone ? ` tone-${tone}` : ""}`}>
        <Media media={media} />
      </div>
      <div className="fc-body">
        {tag && <span className="fc-tag">{tag}</span>}
        {title && <h3 className="fc-h">{title}</h3>}
        <p className="fc-desc">{desc}</p>
        {variant === "media-top-cta" && cta && (
          <div className="fc-cta">
            <a className="iz-btn iz-btn-pri iz-btn-sm" href={cta.href}>{cta.label}</a>
          </div>
        )}
      </div>
    </>
  );
  // whole-card link only when there's no inner CTA button to avoid nested anchors
  return href && variant !== "media-top-cta" ? (
    <a className="fc link" href={href}>{inner}</a>
  ) : (
    <div className="fc">{inner}</div>
  );
}

export function CardGrid({ cols = 3, children }: { cols?: 2 | 3 | 4; children: React.ReactNode }) {
  return <div className={`fcg cols-${cols}`}>{children}</div>;
}

/* ============================================================
   Default mock visuals (the `node` slot demos). Each is a small
   self-contained component — swap any card's `media` to replace.
   ============================================================ */

function Pane({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="gm-pane">
      <div className="gm-bar">
        <span className="gm-dots"><i /><i /><i /></span>
        <span className="gm-file">{label}</span>
      </div>
      <div className="gm-body">{children}</div>
    </div>
  );
}

const LogRow = ({ u, a, ok }: { u: string; a: string; ok: boolean }) => (
  <div className="gm-row">
    <span className="gm-ic" style={{ color: ok ? "var(--allow)" : "var(--deny)" }}>
      {ok ? <CheckCircle weight="fill" /> : <Circle weight="bold" />}
    </span>
    <span className="gm-u">{u}</span>
    <span className="gm-a">{a}</span>
    <span className={`iz-pill ${ok ? "allow" : "deny"}`}>{ok ? "allow" : "deny"}</span>
  </div>
);

function AccessConsole() {
  return (
    <Pane label="access-decisions">
      <LogRow u="anita.r" a="billing-portal" ok />
      <LogRow u="priya.m" a="analytics-db" ok />
      <LogRow u="contractor-07" a="finance-rdp" ok={false} />
    </Pane>
  );
}

function Check({ on, t }: { on: boolean; t: string }) {
  const I: Icon = on ? CheckCircle : Circle;
  return (
    <div className={`gm-check${on ? " on" : ""}`}>
      <span className="gm-check-ic"><I weight={on ? "fill" : "bold"} /></span>
      {t}
    </div>
  );
}

function DevicePosture() {
  return (
    <Pane label="posture · WIN-FIN-114">
      <Check on t="Disk encrypted" />
      <Check on t="AV running · up to date" />
      <Check on t="25 / 25 checks passed" />
    </Pane>
  );
}

/* dynamic SVG example — an animated radar pulse */
function ThreatPulse() {
  return (
    <div className="gm-svgwrap">
      <svg viewBox="0 0 120 120" className="gm-pulse" aria-hidden="true">
        <circle className="gm-ring r1" cx="60" cy="60" r="18" />
        <circle className="gm-ring r2" cx="60" cy="60" r="18" />
        <circle className="gm-ring r3" cx="60" cy="60" r="18" />
        <circle className="gm-core" cx="60" cy="60" r="8" />
      </svg>
      <span className="gm-svglabel">scanning · 0 threats</span>
    </div>
  );
}

function MfaPush() {
  return (
    <div className="gm-mfa">
      <div className="gm-mfa-h">Approve sign-in?</div>
      <div className="gm-mfa-sub">anita.r · Mumbai, IN · 09:24</div>
      <div className="gm-mfa-btns">
        <span className="gm-mfa-deny">Deny</span>
        <span className="gm-mfa-ok">Approve</span>
      </div>
    </div>
  );
}

function PolicyRule() {
  return (
    <Pane label="policy · Finance-RW">
      <div className="gm-rule-h">WHEN ACCESS REQUESTED</div>
      <div className="gm-rule">if geo <b>∉ IN</b> → deny</div>
      <div className="gm-rule">if time <b>∉ 09–18</b> → step-up MFA</div>
      <div className="gm-rule ok">else → <b>allow</b></div>
    </Pane>
  );
}

function SessionReplay() {
  return (
    <div className="gm-rec">
      <div className="gm-rec-screen">
        <span className="gm-rec-play"><Play weight="fill" /></span>
        <span className="gm-rec-scrub"><i style={{ width: "42%" }} /></span>
      </div>
      <div className="gm-rec-foot">session-2f9a · RDP · 18:04</div>
    </div>
  );
}

/* Variants 3 & 4 — text on top, graphic below (+ inline link). 4-up grid. */
const TEXT_GRID: GridCardProps[] = [
  { variant: "text-top", title: "Replace your VPN", desc: "Every request allowed or denied per app — exposed ports zero, lateral movement impossible.", media: { kind: "node", node: <AccessConsole /> } },
  { variant: "text-top-link", title: "Verify every device", desc: "25 device checks clear before any connection, across every OS.", link: { label: "Device trust", href: "/zero-trust-features/device-posture-check" }, media: { kind: "node", node: <DevicePosture /> } },
  { variant: "text-top", title: "One login", desc: "SSO across every app — SAML, OAuth and OpenID, with directory sync.", media: { kind: "node", node: <AccessConsole /> } },
  { variant: "text-top-link", title: "Smart rules", desc: "Conditional access from identity, device, geo, time and risk.", link: { label: "Policies", href: "/platform/iam" }, media: { kind: "node", node: <PolicyRule /> } },
];

/* Variants 1 & 2 — graphic on top, text below (+ CTA button). 3-up grid. */
const MEDIA_GRID: GridCardProps[] = [
  { variant: "media-top", tag: "<AccessConsole/>", desc: "Every request allowed or denied per app — exposed ports zero.", href: "/zero-trust-network-access", media: { kind: "node", node: <AccessConsole /> } },
  { variant: "media-top-cta", title: "Score risk live", desc: "Continuous risk scoring on every session — swap this animated SVG slot for your own.", cta: { label: "Book a demo", href: "/instasafe-zero-trust-pricing" }, media: { kind: "node", node: <ThreatPulse /> } },
  { variant: "media-top", title: "Recorded sessions", desc: "Privileged sessions recorded and replayable — RDP, SSH, VNC, DB.", href: "/solutions/privileged-access-management", media: { kind: "node", node: <SessionReplay /> } },
];

/* Grid of 2 — the wide animated graphics (isometric deck + detailed-filters marquee). */
const BIG_2: GridCardProps[] = [
  { variant: "media-top", tag: "<DetailedFilters/>", desc: "Combine identity, device, location and risk into one precise rule — 21 combinations.", href: "/zero-trust-network-access", media: { kind: "node", node: <FilterStream embed /> } },
  { variant: "media-top", tag: "<AggregateData/>", desc: "Top apps, devices, users and locations rolled up from every access event.", href: "/zero-trust-network-access", media: { kind: "node", node: <AggregateStack embed /> } },
];

export function GridCardsDemo() {
  return (
    <div className="fcg-demo">
      {/* variants 3 + 4 (text-top / text-top-link) in a 4-col grid */}
      <CardGrid cols={4}>
        {TEXT_GRID.map((c, i) => <FeatureCard key={`t${i}`} {...c} />)}
      </CardGrid>
      {/* variants 1 + 2 (media-top / media-top-cta) in a 3-col grid */}
      <CardGrid cols={3}>
        {MEDIA_GRID.map((c, i) => <FeatureCard key={`m${i}`} {...c} />)}
      </CardGrid>
      {/* grid of 2 — isometric deck + detailed-filters marquee */}
      <CardGrid cols={2}>
        {BIG_2.map((c, i) => <FeatureCard key={`b${i}`} {...c} />)}
      </CardGrid>
    </div>
  );
}
