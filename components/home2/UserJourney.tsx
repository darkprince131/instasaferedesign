"use client";

import {
  Laptop,
  DeviceMobile,
  Monitor,
  GlobeSimple,
  MapPin,
  VideoCamera,
  Buildings,
  AppWindow,
  ShieldCheck,
  Key,
  UsersThree,
  CheckCircle,
  XCircle,
  Play,
  DoorOpen,
  type Icon,
} from "@phosphor-icons/react";
import { LinkPreview } from "@/components/home2/LinkPreview";
import { InfoTip } from "@/components/home2/InfoTip";

/* ============================================================
   User access journey — main component.
   A scattered 5-column card field (mirrors the Dub reference):
   the photo identity sits in the centre (3rd) column; the four
   side columns hold small no-fill cards, staggered vertically,
   edges faded. Highlighted values use LinkPreview (explain / go
   to page) or InfoTip (hover explainer). Scoped `.uj-`.
   ============================================================ */

/* ---------- small building blocks ---------- */
function Card({ label, icon: I, ghost, className = "", children }: { label?: string; icon?: Icon; ghost?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <div className={`uj-card${ghost ? " ghost" : ""} ${className}`}>
      {(label || I) && (
        <div className="uj-card-h">
          {I && <span className="uj-card-ic"><I weight="regular" /></span>}
          {label && <span className="uj-card-lbl">{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

function KV({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="uj-kv">
      <span className="uj-kv-k">{k}</span>
      <span className="uj-kv-v">{children}</span>
    </div>
  );
}

function IconRow({ icon: I, children }: { icon: Icon; children: React.ReactNode }) {
  return (
    <div className="uj-irow">
      <span className="uj-irow-ic"><I weight="regular" /></span>
      <span>{children}</span>
    </div>
  );
}

/* ---------- highlighted previews ---------- */
const recPreview = (
  <span className="uj-rec">
    <span className="uj-rec-bar">
      <span className="uj-rec-dots"><i /><i /><i /></span>
      <span className="uj-rec-file">session-2f9a.mp4</span>
      <span className="uj-rec-len">18:04</span>
    </span>
    <span className="uj-rec-screen">
      <span className="uj-rec-play"><Play weight="fill" /></span>
      <span className="uj-rec-scrub"><i style={{ width: "38%" }} /></span>
    </span>
    <span className="uj-rec-foot">alen.joseph · build-farm · RDP · 09:24</span>
  </span>
);

function rulePreview(title: string, body: string) {
  return (
    <span className="uj-rulep">
      <span className="uj-rulep-h"><ShieldCheck weight="fill" /> {title}</span>
      <span className="uj-rulep-b">{body}</span>
      <span className="uj-rulep-f">Open in IAM →</span>
    </span>
  );
}

export function UserJourney() {
  return (
    <div className="uj">
      <div className="uj-field-grid">
        {/* ---------------- COLUMN 1 — faded recent access events ---------------- */}
        <div className="uj-col c1">
          {/* App names come from Alen's own entitlements in izUsers.tsx
              (prod-bastion · build-farm · metrics-db), not the Finance
              set this card was built with. A journey card that names
              apps its subject is not entitled to contradicts the very
              thing the section is demonstrating. */}
          <Card ghost icon={DoorOpen}>
            <div className="uj-ev-l"><span className="uj-ev-app">prod-bastion</span><span className="uj-pill allow">allowed</span></div>
            <span className="uj-ev-t">Today · 09:42</span>
          </Card>
          <Card ghost icon={DoorOpen}>
            <div className="uj-ev-l"><span className="uj-ev-app">build-farm</span><span className="uj-pill deny">denied</span></div>
            <span className="uj-ev-t">Today · 09:44 · off-hours</span>
          </Card>
          <Card ghost icon={DoorOpen}>
            <div className="uj-ev-l"><span className="uj-ev-app">metrics-db</span><span className="uj-pill allow">allowed</span></div>
            <span className="uj-ev-t">Tue · 18:02</span>
          </Card>
        </div>

        {/* ---------------- COLUMN 2 ---------------- */}
        <div className="uj-col c2">
          <Card label="Details">
            <IconRow icon={MapPin}>Mumbai, India</IconRow>
            <IconRow icon={Monitor}>Windows 11</IconRow>
            <IconRow icon={Laptop}>Desktop · managed</IconRow>
            <IconRow icon={GlobeSimple}>Chrome 124</IconRow>
          </Card>

          <Card label="Last session" icon={VideoCamera}>
            <div className="uj-line">
              Recording{" "}
              <LinkPreview href="/solutions/privileged-access-management" preview={recPreview}>
                session-2f9a
              </LinkPreview>
            </div>
            <span className="uj-sub">Started 09:24 · ran 18m 04s</span>
          </Card>

          <Card label="Enrolled" icon={Buildings}>
            <div className="uj-line">
              <span className="uj-hl-static">Active Directory</span> user
            </div>
            <span className="uj-mono-sub">CORP\alen.joseph</span>
            <span className="uj-sub">Joined Oct 2, 2024</span>
          </Card>
        </div>

        {/* ---------------- COLUMN 3 — centre identity ---------------- */}
        <div className="uj-col c3">
          <div className="uj-id-card">
            {/* THE WHOLE CARD IS ALEN JOSEPH, not just this photo.

                He is the site's standing cast member — the same person in
                IzAccessFlow, IzAppWindow, the console mocks and the
                watermark line — defined once in izUsers.tsx. This section
                was built around a different persona ("Anita Rao",
                Finance), so swapping only the name and face would have
                left an Infrastructure Engineer holding Finance-RW,
                sitting in the Finance group and opening billing-portal.
                Every field below now comes from Alen's own record:
                handle, AD account, device host, entitlements, group.

                The photo was also a HOTLINKED randomuser.me URL — a
                stranger's face fetched from a third party at render time,
                on our homepage. It is the local asset now, and the plate
                is a circle because these portraits carry a baked-in
                circular alpha mask (see userjourney.css). */}
            <span className="uj-photo">
              <span className="uj-photo-fallback" aria-hidden="true">AJ</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/people/alen-joseph-256.webp"
                alt="Alen Joseph"
                loading="lazy"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <span className="uj-status" title="Offline"><i /></span>
            </span>
            <span className="uj-id-name">Alen Joseph</span>
            <span className="uj-id-mail">alen.joseph@veno.co.in</span>
            <span className="uj-id-row">
              <span className="uj-id-ad"><Buildings weight="fill" /> AD user</span>
              <span className="uj-id-off"><i /> Offline · 2h ago</span>
            </span>
          </div>
        </div>

        {/* ---------------- COLUMN 4 ---------------- */}
        <div className="uj-col c4">
          <Card label="Access rules">
            <div className="uj-ruleset">
              <LinkPreview href="/platform/iam" className="rule" preview={rulePreview("Infra-RW", "Read/write to infrastructure hosts for the IT-Operations group, business hours only.")}>
                <Key weight="fill" /> Infra-RW
              </LinkPreview>
              <LinkPreview href="/platform/iam" className="rule" preview={rulePreview("No-RDP-offhours", "Blocks RDP protocol outside 09:00–18:00 Mon–Fri.")}>
                <Key weight="fill" /> No-RDP-offhours
              </LinkPreview>
              <LinkPreview href="/platform/iam" className="rule" preview={rulePreview("Geo-IN-only", "Denies any connection originating outside India.")}>
                <Key weight="fill" /> Geo-IN-only
              </LinkPreview>
            </div>
          </Card>

          <Card label="Last accessed">
            <KV k="Time">Today · 09:42</KV>
            <KV k="Connection">09:24 → 09:42 · 18m</KV>
          </Card>

          <Card label="Last app accessed">
            <div className="uj-line big">
              <InfoTip label={<span className="uj-app-name">prod-bastion</span>}>
                <span className="uj-tip-row"><AppWindow weight="fill" /> SSH host · infrastructure segment</span>
                <span className="uj-tip-row dim">per-app tunnel · mTLS</span>
                <span className="uj-tip-row dim">42 users today</span>
              </InfoTip>
            </div>
          </Card>
        </div>

        {/* ---------------- COLUMN 5 ---------------- */}
        <div className="uj-col c5">
          <Card label="Devices">
            <div className="uj-devs">
              <InfoTip label={<span className="uj-dev-trig"><Laptop weight="fill" /> DESKTOP-16MTL6M</span>}>
                <span className="uj-tip-row"><ShieldCheck weight="fill" /> Posture 25/25</span>
                <span className="uj-tip-row dim">Windows 11 Pro · managed</span>
                <span className="uj-tip-row dim">last seen 2h ago</span>
              </InfoTip>
              <InfoTip label={<span className="uj-dev-trig"><DeviceMobile weight="fill" /> iPhone 15</span>}>
                <span className="uj-tip-row"><ShieldCheck weight="fill" /> Posture 22/22</span>
                <span className="uj-tip-row dim">iOS 17.4 · managed</span>
                <span className="uj-tip-row dim">last seen 5h ago</span>
              </InfoTip>
            </div>
          </Card>

          <Card label="User groups">
            <div className="uj-chips">
              {["IT-Operations", "All-Staff", "VPN-Users"].map((g) => (
                <span className="uj-chip" key={g}><UsersThree weight="fill" /> {g}</span>
              ))}
            </div>
          </Card>

          <Card label="Last 5 logins">
            <div className="uj-logins">
              {[
                { ok: true, t: "09:24" },
                { ok: true, t: "Tue 18:02" },
                { ok: false, t: "Tue 08:51" },
                { ok: true, t: "Mon 09:10" },
                { ok: true, t: "Fri 17:44" },
              ].map((l, i) => (
                <span className={`uj-login${l.ok ? "" : " deny"}`} key={i}>
                  {l.ok ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
                  {l.t}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
