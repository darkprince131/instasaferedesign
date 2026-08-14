"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Books,
  CloudArrowUp,
  Fingerprint,
  Presentation,
  ShieldCheck,
  Trophy,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import { ConvergeFlow } from "@/components/home2/ConvergeFlow";
import { IzDevBand } from "@/components/home2/IzDevBand";
import { IzQuietBand } from "@/components/home2/IzQuestionBand";
import { IzStatRibbon } from "@/components/home2/IzStatRibbon";
import { IzLogoGrid, type IzLogoGridLogo } from "@/components/izpages/pro/IzLogoGrid";
import { WhyMatrix } from "./WhyMatrix";
import { WhySplitPlane } from "./WhySplitPlane";
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

      {/* No link under the quote. ConvergeFlow directly above already
          ends on "Take the data path apart" pointing at the same route,
          so the two sat a paragraph apart reading as the same button
          twice. The diagram's is the one that keeps it — it is attached
          to the thing it explains; this one was attached to a full stop. */}
      <blockquote className="whyr-quote">
        <span aria-hidden="true">“</span>
        We can&apos;t leak what we never carry.
      </blockquote>
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
          /* the component's default note reads "Trend shown is
             illustrative" — a disclaimer on the sparkline. Removed on
             the user's call; the line is texture, not a data claim. */
          note=""
        />
      </div>

      <aside className="whyr-aside">When a vendor won&apos;t give you numbers, ask why.</aside>
    </section>
  );
}

/* The recognition lattice, drawn from /public/logos/recognition —
   assembled from the marks the footer already ships so the two cannot
   disagree. Three awarding bodies and three G2 badges: G2 issues
   several, and showing more than three would make one review site
   two-thirds of the wall.

   Coordinates are sparser than the integrations set (six marks in a
   5x5, against ten) because there are fewer real assets and padding
   the grid with compliance seals would blur the point — ISO 27001 is
   a certification, not a recognition, and belongs in the footer's
   certification row rather than here. */
/* HEIGHTS ARE TUNED, NOT DEFAULTED. The component caps height at 34px,
   which is correct for the integrations set (wordmarks and square
   marks, 1:1 to 4:1). This set runs 4.40:1 down to 0.80:1 — Gartner is
   a wide wordmark, everything else is a portrait badge — and at a flat
   34px that rendered Gartner at 150x34 (5,100px² of ink) beside G2
   Users Love Us at 27x34 (918px²). Gartner read as the only logo
   present and the rest as specks.

   Each `h` below is sqrt(2200 / aspectRatio), so the marks carry
   roughly equal AREA rather than equal height. Measured ratios:
   gartner 4.40 · deloitte 1.00 · dsci 0.86 · G2 badges 0.89/0.89/0.80.
   Re-derive if the artwork is ever replaced. */
const RECOGNITION_LOGOS: IzLogoGridLogo[] = [
  { file: "gartner", label: "Gartner", lg: [1, 1], sm: [1, 1], span: 2, spanSm: 2, h: 22 },
  { file: "deloitte-fast50", ext: "png", label: "Deloitte Technology Fast 50", lg: [4, 1], sm: [3, 1], h: 47 },
  { file: "dsci", ext: "png", label: "DSCI Excellence Awards", lg: [2, 2], sm: [1, 2], h: 50 },
  // strip sits on row 3
  { file: "high-performer", ext: "webp", label: "G2 High Performer", lg: [1, 4], sm: [3, 2], h: 50 },
  { file: "momentum-leader", ext: "webp", label: "G2 Momentum Leader", lg: [3, 4], sm: [1, 4], h: 50 },
  { file: "users-love-us", ext: "webp", label: "G2 Users Love Us", lg: [5, 5], sm: [3, 4], h: 52 },
];

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

      {/* 00ap, now carrying RECOGNITION rather than integrations.

          The first attempt pointed this component at customers, which
          was wrong twice over: its lattice held integration marks, and
          InstaSafe names no customers anyway. Awards fix both. These
          are marks awarded TO us — no third party's consent is needed
          to say a body recognised you, which is exactly why this is
          the block that can ship while the customer wall waits.

          Logos are the same set the footer already carries, so the
          page and the footer cannot drift apart on what we claim.
          Note the mixed extensions: the G2 badges arrived as rasters
          and only one is a true vector.

          WallOfLove stays docked pending the customer-consent
          question — built and gated, not mounted. */}
      <div className="whyr-embed">
        <IzLogoGrid
          kicker="Recognition"
          title={["Judged by people", "who had no stake in it."]}
          sub="Analyst houses, industry bodies and the review sites where the scores come from customers rather than from us. Each one is an outside read of the same product this page describes."
          cta={{ label: "See every award and recognition", href: "/awards" }}
          dir="recognition"
          Icon={Trophy}
          logos={RECOGNITION_LOGOS}
          copy={{
            lead: "Recognised since 2018 —",
            accent: "by the analysts, and by the people",
            tail: "who actually run it.",
          }}
        />
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

function ReasonFrameworks() {
  return (
    <section className="whyr-sec" id="reason-frameworks">
      {/* No <Head> (user call, 2026-08-13). "The frameworks / Both
          columns, filled." sat directly above a tab block that carries
          its own h2 — two headings stacked before any content. The lead
          below still frames the section. */}
      <p className="whyr-lead">
        Indian regulators and global standards, from one platform. Most vendors are strong in one column and thin in the
        other — the combination is the part the market lacks.
      </p>

      {/* India and Global, side by side — the section's whole argument.
          The 00ao tab block that briefly sat above this is removed
          (user call, 2026-08-13): it restated the same three regulators
          the India column already lists, and carried a second h2 into a
          section that reads better without one. */}
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
      </div>

      {/* Storyboard 5.0 — the interstitial between reasons 1 and 2. It
          states the claim reason 2 then spends its whole grid proving,
          which is the only job an interstitial has. Full-bleed, so it
          sits outside the wrap. */}
      <IzQuietBand
        kicker="What that buys you"
        statement="A vendor breach"
        emphasis="is not"
        tail="your breach."
      />

      <div className="iz-wrap whyr-body">
        <ReasonNumbers />
      </div>

      {/* Storyboard 8.0 — the data ribbon. The storyboard specifies
          FilterStream; IzStatRibbon is the standard treatment for this
          slot site-wide (see its own header). Same three numbers the
          storyboard asks for. */}
      <IzStatRibbon
        items={[
          { value: "144", label: "named policy rules" },
          { value: "25", label: "device check types" },
          { value: "202", label: "event log types" },
        ]}
      />

      <div className="iz-wrap whyr-body">
        <ReasonRecord />
        <ReasonFrameworks />

        {/* Storyboard 10.0 — the comparison matrix. */}
        <section className="whyr-sec" id="matrix">
          <WhyMatrix />
        </section>

        {/* Storyboard 11.0 — the signature.

            The heading states the claim in the reader's terms rather
            than in ours: "no competitor can copy" is a sentence about
            the competition, and what a buyer needs to know is what
            happens to their data.

            The drawing was IzSplitPlane, a three-box flowchart that
            asserted the claim without showing anything. WhySplitPlane
            carries the approved isometric scene, and its own portrait
            drawing for phones — see that component's header for why
            the wide scene cannot simply be scaled down. */}
        <section className="whyr-sec whyr-sig" id="signature">
          <div className="whyr-head">
            <span className="iz-ey">The architecture</span>
            <h2>
              Your data never <em>travels through us.</em>
            </h2>
          </div>
          <p className="whyr-lead">
            Decisions come from us. Traffic never does. Everything above is a consequence of this one drawing.
          </p>
          <div className="whyr-sig-art">
            <WhySplitPlane />
          </div>
        </section>
      </div>
    </div>
  );
}

/* re-exported for the page's own anchor list */
export { REASONS };
export type { ReasonKey };

