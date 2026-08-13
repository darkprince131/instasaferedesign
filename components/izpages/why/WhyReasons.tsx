"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Bank,
  Books,
  ChartLine,
  CloudArrowUp,
  Fingerprint,
  Presentation,
  ShieldCheck,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import { ConvergeFlow } from "@/components/home2/ConvergeFlow";
import { IzDevBand } from "@/components/home2/IzDevBand";
import { WallOfLove } from "@/components/home2/WallOfLove";
import { IzLogoGrid } from "@/components/izpages/pro/IzLogoGrid";
import { IzTabSwitch, type IzTabSwitchTab } from "@/components/izpages/pro/IzTabSwitch";
import {
  CLUSTERS,
  GLOBAL_FRAMEWORKS,
  INDIA_FRAMEWORKS,
  REASONS,
  TIMELINE,
  type Framework,
  type ReasonKey,
} from "./why-data";
import "./whyreasons.css";

/* ============================================================
   WhyReasons — the four reasons, full width.

   NAVIGATION IS NOT THIS FILE'S JOB ANY MORE (2026-08-13). There used
   to be a sticky in-page rail here carrying 01–04 with its own
   scroll-spy — a second nav pattern, maintained twice, sitting beside
   the reasons and costing them 232px plus a gutter. The site-wide
   IzSideNav does the same work on every other page, so WhyPage mounts
   that and the reasons take the whole wrap.

   The deep-link surface survives the change: every reason keeps its
   `#reason-*` id, so "reason 4" is still a URL sales can paste.

   EACH REASON GETS A DIFFERENT VISUAL LANGUAGE, deliberately. Reason
   2 is a number grid, so reason 3 must NOT be: two counter bands in a
   row and the page reads as a dump with both halves weakened. Three
   is a timeline resolving into logos and testimony.
   ============================================================ */

/* The in-page rail and its scroll-spy used to live here. Both are gone
   (user call, 2026-08-13): navigation moved to the site-wide IzSideNav,
   which WhyPage mounts, so this file no longer owns a second nav
   pattern and the reasons get the full wrap width instead of an
   864px column beside a 232px rail.

   The 01–04 numerals that sat above each eyebrow went with it. They
   were doing the rail's job — telling you where in the set you were —
   and with the rail gone they read as decoration stacked on top of a
   kicker that already says what the section is. */
function Head({ kicker, title, em }: { kicker: string; title: string; em?: string }) {
  return (
    <div className="whyr-head">
      <span className="iz-ey">{kicker}</span>
      <h2>
        {title} {em && <em>{em}</em>}
      </h2>
    </div>
  );
}

/* ============================================================
   01 · the data path
   Restrained on purpose: it sits directly after the hero, and the
   interactive version of this argument lives at
   /why-instasafe/privacy-first. This section's job is to make the
   reader want that page, not to replace it.
   ============================================================ */

function PlaneNode({ label, sub, tone }: { label: string; sub: string; tone: "ours" | "yours" }) {
  return (
    <div className={`whyr-plane whyr-plane--${tone}`}>
      <span className="whyr-plane-h">
        {tone === "ours" ? <LogoMark size={18} /> : <CloudArrowUp size={18} weight="regular" />}
        {label}
      </span>
      <span className="whyr-plane-s">{sub}</span>
    </div>
  );
}

function ReasonPath() {
  return (
    <section className="whyr-sec" id="reason-path">
      <Head kicker="The data path" title="We are not" em="in it." />
      <p className="whyr-lead">
        Most Zero Trust vendors terminate your sessions on their own infrastructure — which means decrypting your
        traffic to inspect it, then re-encrypting it and sending it on. That is the usual premise. Ours splits the two
        planes apart and only ever holds one of them.
      </p>

      <div className="whyr-split">
        <div className="whyr-split-col">
          <span className="whyr-split-h">The usual premise</span>
          <div className="whyr-fused">
            <span className="whyr-fused-t">Vendor cloud</span>
            <span className="whyr-fused-s">Policy · auth · telemetry</span>
            <span className="whyr-fused-div" aria-hidden="true" />
            <span className="whyr-fused-s is-warn">…and your traffic, decrypted</span>
          </div>
          <span className="whyr-split-note">One plane. Theirs.</span>
        </div>

        <div className="whyr-split-col">
          <span className="whyr-split-h is-accent">The split plane</span>
          <div className="whyr-planes">
            <PlaneNode label="Control plane" sub="Policy · auth · telemetry" tone="ours" />
            <PlaneNode label="Data plane" sub="Your traffic, your environment" tone="yours" />
          </div>
          <span className="whyr-split-note">Two planes. One of them is ours.</span>
        </div>
      </div>

      {/* 00u ConvergeFlow, RETITLED — and the retitling is the whole
          point. Its defaults say "everything funnels through one
          verified core", which is the exact opposite of this section's
          claim; dropped in unchanged it would have had reason 01 argue
          against itself. What actually converges here is the DECISION —
          identity, device, context — while the traffic it authorises
          goes straight to the app. Same drawing, opposite argument, and
          now the picture and the headline agree. */}
      <div className="whyr-embed">
        <ConvergeFlow
          kicker="What converges"
          title="The decisions meet here."
          titleEm="Your traffic never does"
          lead="Identity, device posture, location and risk are evaluated in one place, on every request. What comes out is a verdict — the session it authorises runs straight from your people to your applications."
          coreLabel="Control plane"
          outLabel="Your apps, direct"
          cta={{ label: "Take the data path apart", href: "/why-instasafe/privacy-first" }}
        />
      </div>

      <blockquote className="whyr-quote">
        <span aria-hidden="true">“</span>
        We can&apos;t leak what we never carry.
      </blockquote>

      <a className="whyr-cta" href="/why-instasafe/privacy-first">
        Take the data path apart
        <ArrowRight size={15} weight="bold" />
      </a>
    </section>
  );
}

/* ============================================================
   02 · the numbers
   ============================================================ */

function ReasonNumbers() {
  return (
    <section className="whyr-sec" id="reason-numbers">
      <Head kicker="The numbers" title="Every figure here has a page" em="behind it." />
      <p className="whyr-lead">
        Enumerable controls are the difference between a security posture and a security story. Each cluster below links
        to the page that proves it — because a number nobody can check is marketing.
      </p>

      <div className="whyr-grid">
        {CLUSTERS.map((c) => (
          <a className="whyr-cell" href={c.href} key={c.head}>
            <span className="whyr-cell-h">{c.head}</span>
            <span className="whyr-cell-lead">
              <b>{c.lead.n}</b>
              <i>{c.lead.label}</i>
            </span>
            <span className="whyr-cell-subs">
              {c.subs.map((s) => (
                <span key={s.label}>
                  <b>{s.n}</b> {s.label}
                </span>
              ))}
            </span>
            <span className="whyr-cell-cta">
              {c.cta}
              <ArrowUpRight size={13} weight="bold" />
            </span>
          </a>
        ))}
      </div>

      {/* 00aj IzDevBand closes the reason. The grid above is the CLAIM
          (every figure has a page behind it); this is the mechanism that
          makes the figures checkable — the logs, the exports, the
          replay. Its own stats are the two counts the grid does not
          spend, so the reason never states a number twice.

          Links are wired to routes that exist; the component's defaults
          point at /docs/*, which this site does not have. */}
      <div className="whyr-embed">
        <IzDevBand
          kicker="Checkable, not quotable"
          title={
            <>
              Every number here is <mark>something you can query</mark>
            </>
          }
          sub="Controls you can enumerate are only worth anything if you can pull the evidence yourself. Every decision the platform makes is logged as a typed event, exportable to the tooling you already run."
          links={[
            { label: "The full spec sheet", href: "/platform", Icon: Books },
            { label: "Device checks in detail", href: "/zero-trust-features/device-posture-check", Icon: Fingerprint },
            { label: "Control mappings", href: "/trust-center", Icon: ShieldCheck },
            { label: "Book a demo", href: "/book-a-demo", Icon: Presentation },
          ]}
          stats={[
            { value: "7", label: "SIEM formats to export to" },
            { value: "11", label: "report types out of the box" },
          ]}
        />
      </div>

      <aside className="whyr-aside">When a vendor won&apos;t give you numbers, ask why.</aside>
    </section>
  );
}

/* ============================================================
   03 · the record
   A timeline, NOT a second counter grid — reason 2 already spent the
   page's budget for big numerals. Scale resolves as the timeline's
   endpoint, in a different visual language: the customers themselves.
   ============================================================ */

function ReasonRecord() {
  return (
    <section className="whyr-sec" id="reason-record">
      <Head kicker="The record" title="Not new here," em="and not new at this." />
      <p className="whyr-lead">
        Zero Trust became a category around us rather than the other way round. The dates matter because architecture
        decisions taken early are the ones that are expensive to reverse later.
      </p>

      <ol className="whyr-time">
        {TIMELINE.map((t, i) => (
          <li key={t.year} className={i === TIMELINE.length - 1 ? "is-last" : undefined}>
            <span className="whyr-time-mark" aria-hidden="true">
              <i />
            </span>
            <span className="whyr-time-y">{t.year}</span>
            <b>{t.title}</b>
            <span className="whyr-time-b">{t.body}</span>
          </li>
        ))}
      </ol>

      {/* 00ap IzLogoGrid REPLACES the marquee that closed this reason.
          Both are logo displays, so running them together would have
          been the same proof twice; the grid is the stronger of the two
          because its gaps stop it reading as a logo wall, and one cell
          is a copy strip set into the lattice rather than a mark. */}
      <div className="whyr-embed">
        <IzLogoGrid
          kicker="Where that has landed"
          title={["The estates that", "run on it."]}
          sub="Banks, insurers, manufacturers and IT services — the organisations whose access decisions are audited hardest. The architecture arguments above are what they bought."
          cta={{ label: "Read the case studies", href: "/case-studies" }}
        />
      </div>

      {/* …and the quotes, which the timeline and the lattice cannot give:
          the people who ran the migration, in their own words. A third
          visual language for one reason is deliberate — the section is
          making a record argument, and a record is dates, logos AND
          testimony. */}
      <div className="whyr-embed">
        <WallOfLove />
      </div>
    </section>
  );
}

/* ============================================================
   04 · the frameworks
   The claim is made by the layout — two columns, both full — so the
   copy stays short. Every badge's text comes from why-data.ts.
   ============================================================ */

function FrameworkList({ head, sub, items, accent }: { head: string; sub: string; items: Framework[]; accent?: boolean }) {
  return (
    <div className={`whyr-fw${accent ? " is-accent" : ""}`}>
      <div className="whyr-fw-h">
        <b>{head}</b>
        <span>{sub}</span>
      </div>
      <ul>
        {items.map((f) => (
          <li key={f.short}>
            <span className="whyr-fw-badge">{f.short}</span>
            <span className="whyr-fw-t">
              <b>{f.full}</b>
              <span>{f.claim}</span>
              {f.note && <i>{f.note}</i>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 00ao tab content: the three Indian regulators ----------
   The console skin, because what an auditor wants from this section is
   not a claim that we comply — it is the RECORD. Each tab shows the
   evidence the platform actually emits, and the two outcomes are the
   two things a reviewer checks: the control that applied, and the event
   that proves it fired.

   Sanitised demo payloads, same convention as the other consoles.
   Nothing here asserts certification — the claims stay at the level of
   "these controls map, this evidence exists", which is what the Trust
   Center link is for. */
const REGULATOR_TABS: IzTabSwitchTab[] = [
  {
    id: "dpdp",
    label: "DPDP",
    Icon: ShieldCheck,
    json: {
      outcomes: ["The control", "The evidence"],
      payloads: [
        `{
  "framework": "DPDP Act 2023",
  "principle": "purpose_limitation",
  "control": "access_scoped_to_role",
  "data_residency": "customer_environment",
  "vendor_copy_of_payload": false,
  "note": "Processing boundary stays yours"
}`,
        `{
  "event": "access.granted",
  "principal": "alen.joseph",
  "resource": "prod-bastion",
  "purpose": "it_operations",
  "payload_transited_vendor": false,
  "retained_by_instasafe": ["decision", "metadata"],
  "time": "2026-08-13T09:14:02.588Z"
}`,
      ],
    },
  },
  {
    id: "rbi",
    label: "RBI",
    Icon: Bank,
    json: {
      outcomes: ["The control", "The evidence"],
      payloads: [
        `{
  "framework": "RBI cyber security framework",
  "control": "privileged_access_review",
  "standing_privilege": false,
  "session_recording": "enabled",
  "mfa": "required",
  "review_cycle_days": 90
}`,
        `{
  "event": "session.recorded",
  "principal": "contractor.42",
  "resource": "core-banking-jump",
  "approval": "ticket CHG-8841",
  "expired_after_minutes": 45,
  "recording": "session-2f9a.mp4",
  "time": "2026-08-13T11:02:41.107Z"
}`,
      ],
    },
  },
  {
    id: "sebi",
    label: "SEBI · IRDAI",
    Icon: ChartLine,
    json: {
      outcomes: ["The control", "The evidence"],
      payloads: [
        `{
  "frameworks": ["SEBI CSCRF", "IRDAI guidelines"],
  "control": "segregation_of_access",
  "market_systems": "isolated_segment",
  "lateral_reachability": "none",
  "log_export": ["syslog", "cef", "leef"]
}`,
        `{
  "event": "access.denied",
  "principal": "analyst.09",
  "resource": "settlement-db",
  "reason": "outside_entitlement",
  "network_visible_to_principal": false,
  "exported_to": "siem",
  "time": "2026-08-13T14:38:55.902Z"
}`,
      ],
    },
  },
];

function ReasonFrameworks() {
  return (
    <section className="whyr-sec" id="reason-frameworks">
      <Head kicker="The frameworks" title="Both columns," em="filled." />
      <p className="whyr-lead">
        Indian regulators and global standards, from one platform. Most vendors are strong in one column and thin in the
        other — the combination is the part the market lacks.
      </p>

      {/* 00ao carries the three Indian regulators IN DEPTH, so the
          matrix below now shows only the global column. Running both
          would have listed DPDP, RBI and SEBI twice in one section,
          once as a badge and once as a tab — and the badge version
          would have been the weaker of the two.

          A custom `head` is passed, which also drops the component's
          default console header: it ships a "Star 2.4k" vanity count
          and a /docs link this site does not have. */}
      <div className="whyr-embed">
        <IzTabSwitch
          tabs={REGULATOR_TABS}
          initial={0}
          head={
            <>
              <h2 className="izts-title">
                What your <mark>auditor</mark> actually asks for
              </h2>
              <p className="izts-sub">
                Not a compliance badge — the control that applied and the event that proves it fired. Pick a regulator.
              </p>
            </>
          }
        />
      </div>

      {/* BOTH COLUMNS ARE BACK (user call, 2026-08-13). The India list
          was pulled out when the tab block landed, on the reasoning that
          DPDP/RBI/SEBI would then appear twice in one section. The
          side-by-side matrix is the section's actual argument — "both
          columns, filled" is what the heading says — so it returns, and
          the tabs stay above it as the depth behind the India side.
          Whether both survive is the user's next call. */}
      <div className="whyr-matrix">
        <FrameworkList head="India" sub="The regulators your auditor cites" items={INDIA_FRAMEWORKS} accent />
        <FrameworkList head="Global" sub="The standards your board cites" items={GLOBAL_FRAMEWORKS} />
      </div>

      <a className="whyr-cta" href="/trust-center">
        Control-by-control mappings in the Trust Center
        <ArrowRight size={15} weight="bold" />
      </a>
    </section>
  );
}

/* ============================================================
   The set
   ============================================================ */

export function WhyReasons() {
  return (
    <div className="whyr">
      <div className="iz-wrap whyr-body">
        <ReasonPath />
        <ReasonNumbers />
        <ReasonRecord />
        <ReasonFrameworks />
      </div>
    </div>
  );
}

/* re-exported for the page's own anchor list */
export { REASONS };
export type { ReasonKey };
