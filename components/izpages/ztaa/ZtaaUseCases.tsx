"use client";

import { useState } from "react";
import {
  Briefcase,
  Broadcast,
  CaretRight,
  Cloud,
  Clock,
  Code,
  Database,
  DeviceMobile,
  Desktop,
  Eye,
  EyeSlash,
  FileCode,
  Fingerprint,
  Folders,
  Globe,
  HardDrives,
  Handshake,
  Laptop,
  Lock,
  LockKey,
  Monitor,
  Path,
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
type Benefit = { Icon: Icon; tone: "accent" | "allow" | "info" | "violet"; lead: string; body: string; accent: string };

type UseCase = {
  id: string;
  label: string;
  Icon: Icon;
  title: string;
  desc: string;
  sourceHead: string;
  sources: Node[];
  sourceNote?: string;
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
    sources: [
      { label: "Managed device", Icon: Laptop, sub: "posture 25/25" },
      { label: "Personal device", Icon: DeviceMobile, sub: "posture checked" },
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
    sources: [
      { label: "Vendor laptop", Icon: Laptop, sub: "unmanaged" },
      { label: "Contractor", Icon: Handshake, sub: "guest identity" },
    ],
    sourceNote: "No agent required.",
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
    sources: [
      { label: "Code", Icon: Code },
      { label: "Build", Icon: Terminal },
      { label: "Deploy", Icon: Broadcast },
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
    sources: [
      { label: "IT admin", Icon: UserCircle },
      { label: "DB admin", Icon: Database },
      { label: "SecOps", Icon: ShieldCheck },
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
    sources: [
      { label: "Personal laptop", Icon: Laptop },
      { label: "Personal phone", Icon: DeviceMobile },
    ],
    sourceNote: "No agent. No install.",
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

function NodeChip({ n, big }: { n: Node; big?: boolean }) {
  return (
    <span className={`ztuc-node${big ? " is-big" : ""}`}>
      <span className="ztuc-node-ic" aria-hidden="true">
        {n.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={`/logos/integrations/${n.logo}.svg`} alt="" loading="lazy" />
        ) : n.Icon ? (
          <n.Icon weight="duotone" />
        ) : null}
      </span>
      <span className="ztuc-node-t">
        {n.label}
        {n.sub && <em>{n.sub}</em>}
      </span>
    </span>
  );
}

export function ZtaaUseCases() {
  const [open, setOpen] = useState(0);
  const c = CASES[open];

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

        <div className="ztuc-flow">
          <div className="ztuc-col">
            <span className="ztuc-col-h">{c.sourceHead}</span>
            {c.sources.map((n) => (
              <NodeChip key={n.label} n={n} big />
            ))}
            {c.sourceNote && <span className="ztuc-col-note">{c.sourceNote}</span>}
          </div>

          <span className="ztuc-link" aria-hidden="true">
            <i />
            <Lock weight="fill" />
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
            <span className="ztuc-gate-sub">Identity · Device · Posture · Policy</span>
            <div className="ztuc-checks">
              {GATE_CHECKS.map((g) => (
                <span className="ztuc-check" key={g.label}>
                  <span aria-hidden="true">{g.Icon && <g.Icon weight="duotone" />}</span>
                  {g.label}
                </span>
              ))}
            </div>
          </div>

          <span className="ztuc-link" aria-hidden="true">
            <i />
            <Lock weight="fill" />
            <i />
          </span>

          <div className="ztuc-col">
            <span className="ztuc-col-h">{c.targetHead}</span>
            {c.targets.map((n) => (
              <NodeChip key={n.label} n={n} />
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
