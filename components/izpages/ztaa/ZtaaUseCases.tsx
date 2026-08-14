"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  Briefcase,
  Buildings,
  Broadcast,
  CaretRight,
  Cloud,
  Clock,
  Check,
  CheckCircle,
  Code,
  Database,
  DeviceMobile,
  Desktop,
  Envelope,
  Eye,
  EyeSlash,
  FileCode,
  Fingerprint,
  FileText,
  Folders,
  Globe,
  HardDrives,
  Handshake,
  Laptop,
  Lock,
  Kanban,
  LockKey,
  Monitor,
  Path,
  Plus,
  Prohibit,
  Record,
  ShieldCheck,
  SignIn,
  Stack,
  Terminal,
  Timer,
  UserCircle,
  UsersThree,
  VideoCamera,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   ZtaaUseCases — five populations, one gateway.

   The 00ao tab-switch mechanism (tabs drive a swapping panel) in the
   three-column arrangement the references use: a nav rail on the left,
   the scene in the middle, and what the reader gets on the right.

   ▸ THE SCENE NEVER REBUILDS ◂
   Every case draws the same three stages — who is asking, the gateway,
   what they reach — and only the contents change. That is the argument,
   not a layout convenience: the section claims five very different
   populations resolve to the SAME enforcement, and five unrelated
   diagrams would quietly say the opposite. The gateway strip in the
   middle is identical in all five on purpose.

   ▸ SIEM EXPORT FORMATS IS NOT A USE CASE ◂
   The reference images carry it as a sixth rail item. It is an export
   capability, not a population, and it is already a tab in the proof
   hub further down this page. Including it here would have listed the
   same thing twice and broken the set — five people, one appliance.
   Dropped deliberately.

   ▸ LOGOS ◂
   Real marks where the repo holds them (GitLab, Jenkins, GitHub).
   Jira is not in /public/logos/integrations, so that row falls back to
   a typed icon rather than an approximated mark.
   ============================================================ */

type Node = { label: string; Icon?: Icon; logo?: string; sub?: string };
/* `kind` drives which miniature is drawn — a laptop lid or a phone body.
   Devices are DRAWN rather than iconified: an icon of a laptop reads as
   a symbol, a little laptop with a screen in it reads as a device, and
   this section is about whose device is asking. */
type Device = { label: string; sub?: string; kind: "laptop" | "phone"; ok?: boolean };
/* the tiles inside the workspace mock — what this person's portal holds */
type Tile = { label: string; Icon: Icon; tone?: string; logo?: string };
type Benefit = { Icon: Icon; tone: "accent" | "allow" | "info" | "violet"; lead: string; body: string; accent: string };

type UseCase = {
  id: string;
  label: string;
  Icon: Icon;
  title: string;
  desc: string;
  sourceHead: string;
  devices: Device[];
  sourceNote?: string;
  /** what the portal shows this person */
  mockHead: string;
  tiles: Tile[];
  targetHead: string;
  targets: Node[];
  /** the strip under the scene — one case uses it for session controls */
  strip?: { head: string; items: Node[] };
  note: string;
  benefits: Benefit[];
};

/* The gateway is deliberately identical across all five. */
const GATE_CHECKS: Node[] = [
  { label: "Identity", Icon: UserCircle },
  { label: "Device", Icon: Fingerprint },
  { label: "Posture", Icon: ShieldCheck },
  { label: "Policy", Icon: Path },
];

const CASES: UseCase[] = [
  {
    id: "workforce",
    label: "Workforce access",
    Icon: UsersThree,
    title: "Workforce access",
    desc: "Employees get their full toolkit in one portal, on managed or personal devices, with MFA and posture invisible until something is wrong.",
    sourceHead: "Your people",
    devices: [
      { label: "Managed device", sub: "posture 25/25", kind: "laptop", ok: true },
      { label: "Personal device", sub: "posture checked", kind: "phone", ok: true },
    ],
    mockHead: "My workspace",
    tiles: [
      { label: "Mail", Icon: Envelope, tone: "a" },
      { label: "Files", Icon: Folders, tone: "b" },
      { label: "CRM", Icon: Buildings, tone: "c" },
      { label: "HR", Icon: UsersThree, tone: "d" },
      { label: "Docs", Icon: FileText, tone: "b" },
      { label: "Tickets", Icon: Kanban, tone: "a" },
      { label: "Wiki", Icon: BookOpen, tone: "c" },
    ],
    targetHead: "Their toolkit",
    targets: [
      { label: "Single sign-on", Icon: SignIn },
      { label: "Web apps", Icon: Globe },
      { label: "Files & resources", Icon: Folders },
      { label: "Internal tools", Icon: Monitor },
    ],
    note: "One portal. Every app their role lists. No network behind any of it.",
    benefits: [
      { Icon: Stack, tone: "accent", lead: "One portal. All apps.", body: "Full toolkit,", accent: "zero friction." },
      { Icon: ShieldCheck, tone: "allow", lead: "Secure by default.", body: "MFA and posture", accent: "always on." },
      { Icon: EyeSlash, tone: "violet", lead: "Access when it matters.", body: "Invisible until", accent: "there's a risk." },
      { Icon: DeviceMobile, tone: "info", lead: "Any device, anywhere.", body: "Managed or personal.", accent: "Always protected." },
      { Icon: Clock, tone: "accent", lead: "Always connected.", body: "Seamless access,", accent: "productive people." },
    ],
  },
  {
    id: "vendor",
    label: "Third-party / vendor access",
    Icon: Handshake,
    title: "Third-party and vendor access",
    desc: "Contractors reach the two systems their contract names, from their own laptops, with the session recorded and an expiry date already set.",
    sourceHead: "Outside the company",
    devices: [
      { label: "Vendor laptop", sub: "unmanaged", kind: "laptop" },
      { label: "Their phone", sub: "guest identity", kind: "phone" },
    ],
    sourceNote: "No agent required.",
    mockHead: "Contractor portal",
    tiles: [
      { label: "Reports DB", Icon: Database, tone: "a" },
      { label: "Ticketing", Icon: Kanban, tone: "b" },
    ],
    targetHead: "Exactly what was agreed",
    targets: [
      { label: "Two named systems", Icon: Stack },
      { label: "Read or read-write", Icon: FileCode },
      { label: "Everything else", Icon: Prohibit, sub: "no route" },
    ],
    note: "Access expires with the contract. Nobody has to remember to revoke it.",
    benefits: [
      { Icon: Prohibit, tone: "accent", lead: "No standing access.", body: "Granted for a window,", accent: "expires by itself." },
      { Icon: Record, tone: "violet", lead: "Recorded by default.", body: "Every privileged session,", accent: "replayable." },
      { Icon: Laptop, tone: "info", lead: "Their device is fine.", body: "Session controls do what", accent: "the device cannot." },
      { Icon: EyeSlash, tone: "allow", lead: "Nothing else exists.", body: "Unlisted systems are", accent: "never offered." },
      { Icon: Timer, tone: "accent", lead: "Time-boxed.", body: "The contract end date is", accent: "the access end date." },
    ],
  },
  {
    id: "devops",
    label: "DevOps tooling",
    Icon: Code,
    title: "DevOps tooling",
    desc: "GitLab, Jenkins, staging servers and SSH — governed and hidden from the internet, without changing how developers work.",
    sourceHead: "Developer workflow",
    devices: [
      { label: "Dev laptop", sub: "bound + posture", kind: "laptop", ok: true },
      { label: "On call", sub: "same policy", kind: "phone", ok: true },
    ],
    mockHead: "Engineering portal",
    tiles: [
      { label: "GitLab", Icon: Code, tone: "a", logo: "gitlab" },
      { label: "Jenkins", Icon: Terminal, tone: "b", logo: "jenkins" },
      { label: "GitHub", Icon: Code, tone: "c", logo: "github" },
      { label: "Staging", Icon: HardDrives, tone: "d" },
      { label: "SSH", Icon: Terminal, tone: "a" },
      { label: "Registry", Icon: Stack, tone: "b" },
    ],
    targetHead: "What they reach",
    targets: [
      { label: "GitLab", logo: "gitlab" },
      { label: "Jenkins", logo: "jenkins" },
      { label: "GitHub", logo: "github" },
      { label: "Staging servers", Icon: HardDrives },
      { label: "SSH servers", Icon: Terminal },
    ],
    note: "Zero inbound ports. No VPN. Developers get what they need, nothing more.",
    benefits: [
      { Icon: Code, tone: "accent", lead: "Developer-first.", body: "No workflow changes. Tools work as they", accent: "always have." },
      { Icon: EyeSlash, tone: "allow", lead: "Hidden and secure.", body: "No public exposure. Attack surface", accent: "minimised." },
      { Icon: LockKey, tone: "violet", lead: "Granular access.", body: "App, environment, user and", accent: "time based." },
      { Icon: Eye, tone: "info", lead: "Full session visibility.", body: "Commands, file transfers and sessions", accent: "recorded." },
      { Icon: Cloud, tone: "accent", lead: "Built for scale.", body: "From one repo to", accent: "hundreds of pipelines." },
    ],
  },
  {
    id: "privileged",
    label: "Privileged sessions",
    Icon: ShieldCheck,
    title: "Privileged sessions",
    desc: "Admin RDP and SSH with recording on — the lightweight answer to the audit finding that says there is no oversight of privileged access.",
    sourceHead: "Privileged users",
    devices: [
      { label: "Admin workstation", sub: "bound device", kind: "laptop", ok: true },
      { label: "Step-up device", sub: "MFA prompt", kind: "phone", ok: true },
    ],
    mockHead: "Privileged portal",
    tiles: [
      { label: "RDP", Icon: Desktop, tone: "a" },
      { label: "SSH", Icon: Terminal, tone: "b" },
      { label: "Databases", Icon: Database, tone: "c" },
      { label: "Cloud", Icon: Cloud, tone: "d" },
    ],
    targetHead: "Privileged systems",
    targets: [
      { label: "RDP servers", Icon: Desktop },
      { label: "SSH servers", Icon: Terminal },
      { label: "Databases", Icon: Database },
      { label: "Cloud consoles", Icon: Cloud },
    ],
    strip: {
      head: "Recorded for the whole session",
      items: [
        { label: "Full video", Icon: VideoCamera },
        { label: "Keystrokes", Icon: Terminal },
        { label: "Commands", Icon: Code },
        { label: "File transfers", Icon: Folders },
      ],
    },
    note: "Complete oversight. Every command, every session, always recorded.",
    benefits: [
      { Icon: VideoCamera, tone: "violet", lead: "Record everything.", body: "Video, keystrokes, commands and transfers,", accent: "all captured." },
      { Icon: ShieldCheck, tone: "allow", lead: "Meet audit requirements.", body: "Prove", accent: "who did what, when." },
      { Icon: Timer, tone: "accent", lead: "Just-in-time access.", body: "Granted only when needed,", accent: "auto-expires after." },
      { Icon: Eye, tone: "info", lead: "Session controls.", body: "Watch a live session or", accent: "terminate it." },
      { Icon: Lock, tone: "accent", lead: "Lightweight.", body: "No agents on target systems.", accent: "RDP and SSH work as is." },
    ],
  },
  {
    id: "byod",
    label: "BYOD",
    Icon: DeviceMobile,
    title: "BYOD",
    desc: "Personal devices use the clientless portal with watermark, clipboard and download controls — so corporate data is used but never kept on the device.",
    sourceHead: "Personal devices",
    devices: [
      { label: "Personal laptop", sub: "no agent", kind: "laptop" },
      { label: "Personal phone", sub: "no install", kind: "phone" },
    ],
    sourceNote: "Clientless. Browser only.",
    mockHead: "Browser portal",
    tiles: [
      { label: "Mail", Icon: Envelope, tone: "a" },
      { label: "Files", Icon: Folders, tone: "b" },
      { label: "CRM", Icon: Buildings, tone: "c" },
      { label: "Docs", Icon: FileText, tone: "d" },
    ],
    targetHead: "Corporate applications",
    targets: [
      { label: "Web apps", Icon: Globe },
      { label: "SaaS applications", Icon: Cloud },
      { label: "Internal tools", Icon: Monitor },
      { label: "Files & resources", Icon: Folders },
    ],
    strip: {
      head: "Protect data on every session",
      items: [
        { label: "Watermark", Icon: Fingerprint },
        { label: "Clipboard", Icon: FileCode },
        { label: "Download", Icon: Folders },
        { label: "Timeout & auto-lock", Icon: Timer },
      ],
    },
    note: "Use it securely. Keep it safe. Nothing stays on the device.",
    benefits: [
      { Icon: Globe, tone: "violet", lead: "Clientless by design.", body: "Everything from a browser.", accent: "No install needed." },
      { Icon: ShieldCheck, tone: "allow", lead: "Data stays protected.", body: "Watermark, clipboard and download controls", accent: "always on." },
      { Icon: DeviceMobile, tone: "accent", lead: "Your device. Our rules.", body: "Personal device, corporate access — with", accent: "full control." },
      { Icon: Timer, tone: "info", lead: "Session safety.", body: "Auto-lock, idle timeout and re-auth", accent: "protect every session." },
      { Icon: Briefcase, tone: "violet", lead: "Compliance ready.", body: "Complete", accent: "visibility and controls." },
    ],
  },
];

/* A device MINIATURE, drawn. An icon of a laptop reads as a symbol; a
   little laptop with a lit screen reads as a device, and this section is
   about whose device is asking. The green tick is the posture verdict —
   present only where the case actually verifies the device, which is why
   the vendor and BYOD laptops do not carry one. */
function DeviceMini({ d }: { d: Device }) {
  return (
    <div className={`ztuc-dev is-${d.kind}`}>
      <span className="ztuc-dev-art" aria-hidden="true">
        {d.kind === "laptop" ? (
          <svg viewBox="0 0 64 44">
            <rect className="ztuc-dev-body" x="8" y="4" width="48" height="31" rx="3" />
            <rect className="ztuc-dev-screen" x="12" y="8" width="40" height="23" rx="2" />
            <path className="ztuc-dev-base" d="M2 38h60l-3 4H5z" />
          </svg>
        ) : (
          <svg viewBox="0 0 64 44">
            <rect className="ztuc-dev-body" x="23" y="2" width="18" height="40" rx="4" />
            <rect className="ztuc-dev-screen" x="26" y="6" width="12" height="30" rx="1.5" />
          </svg>
        )}
        {d.ok && (
          <span className="ztuc-dev-ok">
            <CheckCircle weight="fill" />
          </span>
        )}
      </span>
      <span className="ztuc-dev-t">
        {d.label}
        {d.sub && <em>{d.sub}</em>}
      </span>
    </div>
  );
}

/* The portal itself. The reference's strongest move is showing an actual
   workspace rather than a labelled box — the reader recognises a grid of
   app tiles instantly, and "one portal, every app your role lists" stops
   being a sentence and becomes a picture. */
function Workspace({ head, tiles }: { head: string; tiles: Tile[] }) {
  return (
    <div className="ztuc-mock">
      <span className="ztuc-mock-lock" aria-hidden="true">
        <LockKey weight="fill" />
      </span>
      <div className="ztuc-mock-body">
        <div className="ztuc-mock-side" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        <div className="ztuc-mock-main">
          <span className="ztuc-mock-h">{head}</span>
          <div className="ztuc-tiles">
            {tiles.map((t) => (
              <span className={`ztuc-tile is-${t.tone ?? "a"}`} key={t.label}>
                <i aria-hidden="true">
                  {t.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={`/logos/integrations/${t.logo}.svg`} alt="" loading="lazy" />
                  ) : (
                    <t.Icon weight="duotone" />
                  )}
                </i>
                <b>{t.label}</b>
              </span>
            ))}
            <span className="ztuc-tile is-more" aria-hidden="true">
              <i>
                <Plus weight="bold" />
              </i>
            </span>
          </div>
        </div>
      </div>
      <span className="ztuc-mock-foot">
        <CheckCircle weight="fill" />
        MFA + device posture
      </span>
    </div>
  );
}

/* An outcome the person gets, ticked. Green, not orange: these are
   verdicts that PASSED, and the accent is spent on the one thing doing
   the work — the gateway. */
function OutcomePill({ n }: { n: Node }) {
  return (
    <span className="ztuc-out">
      <span className="ztuc-out-ic" aria-hidden="true">
        {n.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={`/logos/integrations/${n.logo}.svg`} alt="" loading="lazy" />
        ) : n.Icon ? (
          <n.Icon weight="duotone" />
        ) : null}
      </span>
      <span className="ztuc-out-t">
        {n.label}
        {n.sub && <em>{n.sub}</em>}
      </span>
      <CheckCircle className="ztuc-out-ok" weight="fill" aria-hidden="true" />
    </span>
  );
}

export function ZtaaUseCases() {
  const [open, setOpen] = useState(0);
  const [mobile, setMobile] = useState(false);
  const c = CASES[open];

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* PHONE: AN ACCORDION, NOT A TAB STRIP (user call).

     The strip put six pills in a horizontal scroller above a panel. Two
     things were wrong with it and neither is fixable by hiding more of
     the panel. The pills past the third were off-screen, so the section
     looked like it had three use cases; and the answer to the pill you
     tapped appeared BELOW the strip, so on a short screen you tapped a
     control and the thing it changed was already scrolled past.

     An accordion puts the answer directly under the question that asked
     it, and shows all six labels at once — which is the actual job of
     this section: let a reader find the row that is them. */
  if (mobile) {
    return (
      <div className="ztuc ztuc--acc">
        {CASES.map((u, i) => {
          const on = i === open;
          return (
            <div className={on ? "ztuc-acc on" : "ztuc-acc"} key={u.id}>
              <button
                type="button"
                className="ztuc-acc-h"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : i)}
              >
                <span className="ztuc-acc-ic" aria-hidden="true">
                  <u.Icon weight={on ? "fill" : "regular"} />
                </span>
                <span className="ztuc-acc-t">{u.label}</span>
                <CaretRight className="ztuc-acc-go" weight="bold" aria-hidden="true" />
              </button>
              {on && (
                <div className="ztuc-acc-b">
                  <p>{CASES[i].desc}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="ztuc">
      {/* ---------- left: the rail ---------- */}
      <div className="ztuc-rail" role="tablist" aria-label="Use cases">
        {CASES.map((u, i) => (
          <button
            key={u.id}
            type="button"
            role="tab"
            aria-selected={i === open}
            className={`ztuc-tab${i === open ? " on" : ""}`}
            onClick={() => setOpen(i)}
          >
            <span className="ztuc-tab-ic" aria-hidden="true">
              <u.Icon weight={i === open ? "fill" : "regular"} />
            </span>
            <span className="ztuc-tab-t">{u.label}</span>
            <CaretRight className="ztuc-tab-go" weight="bold" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* ---------- middle: the scene ---------- */}
      <div className="ztuc-stage" role="tabpanel" aria-label={c.title} key={c.id}>
        <h3 className="ztuc-h">{c.title}</h3>
        <p className="ztuc-desc">{c.desc}</p>

        {/* THE SCENE.

            It used to be five grid columns — source, link, gate, link,
            target — inside a 556px stage, which left node labels 49px of
            text box and clipped every one of them. The fix is not a font
            size; it is that a row of five things cannot fit here. So the
            flow turns a corner: devices and the gateway stack down the
            left in a 196px column, the portal takes the whole remaining
            width as an actual screen, and the outcomes run full width
            underneath as pills. Nothing now has to fit in 49px. */}
        <div className="ztuc-scene">
          <div className="ztuc-lane">
            <span className="ztuc-col-h">{c.sourceHead}</span>
            <div className="ztuc-devs">
              {c.devices.map((d) => (
                <DeviceMini key={d.label} d={d} />
              ))}
            </div>
            {c.sourceNote && <span className="ztuc-col-note">{c.sourceNote}</span>}

            <span className="ztuc-drop" aria-hidden="true">
              <i />
            </span>

            {/* identical in every case — that is the argument */}
            <div className="ztuc-gate">
              <span className="ztuc-gate-h">
                <span className="ztuc-gate-mark" aria-hidden="true">
                  <Broadcast weight="duotone" />
                </span>
                InstaSafe ZTNA gateway
              </span>
              <span className="ztuc-gate-sub">Every request, every time</span>
              <div className="ztuc-checks">
                {GATE_CHECKS.map((g) => (
                  <span className="ztuc-check" key={g.label}>
                    <span aria-hidden="true">{g.Icon && <g.Icon weight="duotone" />}</span>
                    {g.label}
                    <Check weight="bold" aria-hidden="true" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Workspace head={c.mockHead} tiles={c.tiles} />
        </div>

        <div className="ztuc-outs">
          <span className="ztuc-col-h">{c.targetHead}</span>
          <div className="ztuc-outs-grid">
            {c.targets.map((n) => (
              <OutcomePill key={n.label} n={n} />
            ))}
          </div>
        </div>

        {c.strip && (
          <div className="ztuc-strip">
            <span className="ztuc-strip-h">{c.strip.head}</span>
            <div className="ztuc-strip-items">
              {c.strip.items.map((s) => (
                <span className="ztuc-strip-i" key={s.label}>
                  <span aria-hidden="true">{s.Icon && <s.Icon weight="duotone" />}</span>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="ztuc-note">
          <ShieldCheck weight="fill" aria-hidden="true" />
          {c.note}
        </p>
      </div>

      {/* ---------- right: what they get ---------- */}
      <div className="ztuc-benefits">
        {c.benefits.map((b) => (
          <div className="ztuc-benefit" key={b.lead}>
            <span className={`ztuc-benefit-ic is-${b.tone}`} aria-hidden="true">
              <b.Icon weight="duotone" />
            </span>
            <span className="ztuc-benefit-t">
              <b>{b.lead}</b>
              <span>
                {b.body} <em>{b.accent}</em>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
