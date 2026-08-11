"use client";

import { useState, type ComponentType } from "react";
import { IzJson } from "./IzPanel";
import { IzAnswerArt } from "@/components/izanswer/IzAnswerArt";

/* ============================================================
   00au · IzAnswerStrip — replaces the 1–4 paragraph "Plain answer"
   block that opens ~41 Content Master pages.

   Answer line, three mono facts, expander. The paragraphs stay in
   the DOM — they just stop being the first thing anyone sees.

   THE RIGHT-HAND SLOT IS NOT A DECORATIVE GRAPHIC. It is a typed
   proof slot, and every type contains a refusal: something granted
   next to something denied. A chart shows volume over time; an
   answer needs one decision, once. That mismatch is what made the
   old version read as filler.

     proof  — copy left, typed proof slot right (platform-deep pages)
     ledger — copy left, grant/deny ledger right (the workhorse)
     band   — full width, zero graphics (light + industry pages)

   ▸ TO EDIT ◂ pass `slot` for variant proof; it falls back to the
   band layout when a page has no artifact worth showing.
   ============================================================ */

export type Fact = { n: string; text: string };

export type TermLine = { cmd: string } | { out: string; tone?: "ok" | "no" | "dim" };

export type Slot =
  | { kind: "terminal"; title: string; badge?: string; lines: TermLine[] }
  | { kind: "json"; title: string; src: string }
  | { kind: "grant-deny"; grantHead: string; denyHead: string; grant: string[]; deny: string[] }
  | { kind: "posture"; head: string; rows: { label: string; ok: boolean; detail?: string }[] }
  /* An explainer illustration — the "what is X?" picture. Unlike the
     typed proof slots above it carries no refusal of its own, because
     the illustration contains one: see components/izanswer/. Pass the
     component, not an element, so the strip owns the reveal wrapper. */
  | { kind: "art"; art: ComponentType };

export type Point = { title: string; body: string };

type Props = {
  variant?: "proof" | "ledger" | "band";
  /** mono kicker above the heading, rendered after a `>_` */
  eyebrow?: string;
  /** THE section heading — every plain-answer block gets one: an
      impactful statement or the question the block answers
      ("What is ZTNA?"). Spans the full width above both columns so
      the section is titled before the reader picks a column. */
  heading?: string;
  headingEmphasis?: string;
  /** heading; wrap the accented word in `emphasis` instead of markup */
  question?: string;
  emphasis?: string;
  questionTail?: string;
  answer: string;
  /** the mono number strip — terse proof */
  facts?: Fact[];
  /** the checked list — title + explanation per point. Carries the weight
      of a long "Plain answer" without reading as a wall of paragraphs. */
  points?: Point[];
  long?: string[];
  slot?: Slot;
  /** variant proof: the three-up strip under a terminal slot */
  stats?: { n: string; label: string }[];
  /** variant band: three columns of number + explanation */
  columns?: { n: string; text: string }[];
  ctas?: { label: string; href: string; primary?: boolean }[];
  className?: string;
};

function Expander({ long }: { long: string[] }) {
  const [open, setOpen] = useState(false);
  if (!long.length) return null;
  return (
    <div className="izans-long">
      <button type="button" className="izans-summary" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        the long version
        <i aria-hidden="true">{open ? "–" : "+"}</i>
      </button>
      {open && (
        <div className="izans-long-body">
          {long.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function ProofSlot({ slot }: { slot: Slot }) {
  if (slot.kind === "art") {
    const Art = slot.art;
    return (
      <IzAnswerArt>
        <Art />
      </IzAnswerArt>
    );
  }
  if (slot.kind === "terminal") {
    return (
      <div className="izans-term">
        <div className="izans-term-bar">
          <span className="izans-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="izans-term-t">{slot.title}</span>
          {slot.badge && <span className="izans-term-r">{slot.badge}</span>}
        </div>
        <pre className="izans-term-b">
          {slot.lines.map((l, i) =>
            "cmd" in l ? (
              <span key={i} className="izans-l">
                <span className="d">$</span> <span className="c">{l.cmd}</span>
                {"\n"}
              </span>
            ) : (
              <span key={i} className={`izans-l ${l.tone ?? "dim"}`}>
                {l.tone === "ok" ? "→ " : l.tone === "no" ? "→ " : "→ "}
                {l.out}
                {"\n"}
              </span>
            ),
          )}
          <span className="izans-cursor" aria-hidden="true" />
        </pre>
      </div>
    );
  }

  if (slot.kind === "json") {
    return (
      <div className="izans-term">
        <div className="izans-term-bar">
          <span className="izans-term-t">{slot.title}</span>
        </div>
        <div className="izans-json">
          <IzJson src={slot.src} />
        </div>
      </div>
    );
  }

  if (slot.kind === "posture") {
    return (
      <div className="izans-posture">
        <div className="izans-term-bar">
          <span className="izans-term-t">{slot.head}</span>
        </div>
        <ul>
          {slot.rows.map((r) => (
            <li key={r.label} className={r.ok ? "ok" : "no"}>
              <i aria-hidden="true">{r.ok ? "✓" : "✕"}</i>
              <span>{r.label}</span>
              {r.detail && <em>{r.detail}</em>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* grant-deny */
  return (
    <div className="izans-gd">
      <div className="izans-gd-col">
        <div className="izans-gd-h y">{slot.grantHead}</div>
        <ul>
          {slot.grant.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
      <div className="izans-gd-col">
        <div className="izans-gd-h n">{slot.denyHead}</div>
        <ul>
          {slot.deny.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IzAnswerStrip({
  variant = "proof",
  eyebrow,
  heading,
  headingEmphasis,
  question,
  emphasis,
  questionTail,
  answer,
  facts = [],
  points = [],
  long = [],
  slot,
  stats,
  columns,
  ctas = [],
  className,
}: Props) {
  const root = className ? `izans izans--${variant} ${className}` : `izans izans--${variant}`;

  /* ---------------- band: full width, no graphic ---------------- */
  if (variant === "band" || (!slot && variant !== "ledger")) {
    return (
      <div className={`${root} izans-band`}>
        {question && (
          <h3 className="izans-h">
            {question} {emphasis && <em>{emphasis}</em>} {questionTail}
          </h3>
        )}
        <p className="izans-answer izans-answer--lg">{answer}</p>
        {columns && columns.length > 0 && (
          <div className="izans-bcols">
            {columns.map((c) => (
              <div key={c.n} className="izans-bcol">
                <b>{c.n}</b>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        )}
        {facts.length > 0 && !columns && (
          <div className="izans-facts">
            {facts.map((f) => (
              <div key={f.text} className="izans-fact">
                <b>{f.n}</b>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        )}
        <Expander long={long} />
      </div>
    );
  }

  /* ---------------- proof / ledger: two columns ----------------
     The visual column is STICKY and the copy scrolls past it. That is
     the whole point of this layout: a long plain-language answer stops
     reading as a wall because a piece of live product sits beside it the
     entire time. DOM order stays semantic — heading first — and CSS
     `order` moves the visual to the left on desktop. */
  return (
    <div className={root}>
      {heading && (
        <h2 className="izans-heading">
          {heading}
          {headingEmphasis && <em> {headingEmphasis}</em>}
        </h2>
      )}

      <div className="izans-copy">
        {eyebrow && (
          <p className="izans-eyebrow">
            <span aria-hidden="true">&gt;_ </span>
            {eyebrow}
          </p>
        )}
        {question && (
          <h3 className="izans-h">
            {question} {emphasis && <em>{emphasis}</em>} {questionTail}
          </h3>
        )}
        <p className="izans-answer">{answer}</p>

        {facts.length > 0 && (
          <div className="izans-facts">
            {facts.map((f) => (
              <div key={f.text} className="izans-fact">
                <b>{f.n}</b>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        )}

        {points.length > 0 && (
          <ul className="izans-points">
            {points.map((p) => (
              <li key={p.title}>
                <span className="izans-check" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
                    <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.3" />
                    <path
                      d="M6.4 10.3l2.5 2.4 4.7-5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div>
                  <b>{p.title}</b>
                  <span>{p.body}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <Expander long={long} />

        {ctas.length > 0 && (
          <div className="izans-ctas">
            {ctas.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className={`iz-btn ${c.primary ? "iz-btn-pri" : "iz-btn-ghost"}`}
              >
                {c.label}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="izans-slot">
        <div className="izans-sticky">
          {slot && <ProofSlot slot={slot} />}
          {/* the number strip belongs to any slot that PROVED something
              above it — the terminal and the explainer both do */}
          {(slot?.kind === "terminal" || slot?.kind === "art") && stats && stats.length > 0 && (
            <div className="izans-stats">
              {stats.map((s) => (
                <div key={s.label} className="izans-stat">
                  <b>{s.n}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
