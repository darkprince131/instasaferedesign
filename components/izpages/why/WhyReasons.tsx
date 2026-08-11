"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, CloudArrowUp } from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import { IzLogoMarquee } from "@/components/home2/IzLogoMarquee";
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
   WhyReasons — the four reasons, as one numbered set.

   THE RAIL IS THE POINT. Four bands stacked with their own headings
   read as four unrelated sections; a sticky rail carrying 01–04 with
   the active one lit makes them a single argument you are moving
   through. It also gives sales a deep-link surface — every reason has
   a stable id, so "reason 4" is a URL you can paste into an email.

   EACH REASON GETS A DIFFERENT VISUAL LANGUAGE, deliberately. Reason
   2 is a number grid, so reason 3 must NOT be: two counter bands in a
   row and the page reads as a dump with both halves weakened. Three
   is a timeline resolving into a logo row.
   ============================================================ */

function useActiveReason() {
  const [active, setActive] = useState<ReasonKey>(REASONS[0].key);
  useEffect(() => {
    const read = () => {
      let best = REASONS[0].key;
      for (const r of REASONS) {
        const el = document.getElementById(`reason-${r.key}`);
        /* the last section whose top has crossed the reading line —
           true for sections of any length, unlike a mid-viewport band */
        if (el && el.getBoundingClientRect().top - 220 <= 0) best = r.key;
      }
      setActive((p) => (p === best ? p : best));
    };
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);
  return active;
}

function Rail({ active }: { active: ReasonKey }) {
  return (
    <nav className="whyr-rail" aria-label="The four reasons">
      <span className="whyr-rail-h">Why InstaSafe</span>
      <ol>
        {REASONS.map((r) => (
          <li key={r.key}>
            <a
              href={`#reason-${r.key}`}
              className={r.key === active ? "is-on" : undefined}
              aria-current={r.key === active ? "true" : undefined}
            >
              <b>{r.n}</b>
              <span>{r.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Head({ n, kicker, title, em }: { n: string; kicker: string; title: string; em?: string }) {
  return (
    <div className="whyr-head">
      <span className="whyr-n">{n}</span>
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
      <Head n="01" kicker="The data path" title="We are not" em="in it." />
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
      <Head n="02" kicker="The numbers" title="Every figure here has a page" em="behind it." />
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
      <Head n="03" kicker="The record" title="Not new here," em="and not new at this." />
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

      <div className="whyr-scale">
        <span className="whyr-scale-h">Where that has landed</span>
        <IzLogoMarquee />
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
      <Head n="04" kicker="The frameworks" title="Both columns," em="filled." />
      <p className="whyr-lead">
        Indian regulators and global standards, from one platform. Most vendors are strong in one column and thin in the
        other — the combination is the part the market lacks.
      </p>

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
  const active = useActiveReason();
  return (
    <div className="whyr">
      <div className="iz-wrap whyr-in">
        <Rail active={active} />
        <div className="whyr-body">
          <ReasonPath />
          <ReasonNumbers />
          <ReasonRecord />
          <ReasonFrameworks />
        </div>
      </div>
    </div>
  );
}

/* re-exported for the page's own anchor list */
export { REASONS };
export type { ReasonKey };
