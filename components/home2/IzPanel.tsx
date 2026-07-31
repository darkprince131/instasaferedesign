"use client";

import { useMemo } from "react";
import { Gear, DotsThree, X, Check } from "@phosphor-icons/react";

/* ============================================================
   IzPanel — TIER 1 VISUAL: the inspector panel  (lab 00ae)

   Rebuilt after frame-by-frame analysis of the
   /returning-user-experience/ recording, because the note was that
   theirs looks sleek and ours didn't. The difference is five small
   things, all of which are in here:

     1. The chrome is MONOSPACE, uppercase, letter-spaced. Not a
        title bar with sentence-case text.
     2. The state control is a real TOGGLE SWITCH — accent fill with
        a checked knob — not tabs and not a segmented control. It
        reads as "this thing is switched on", which is the message.
     3. Muted window affordances top-right (gear / kebab / close).
        They do nothing. They exist so it reads as a real tool.
     4. The payload is allowed to OVERFLOW horizontally with a
        visible thin scrollbar, instead of being wrapped or clipped.
        Real consoles overflow; tidied ones look like marketing.
     5. A footer meta strip: a mono status word on the left, the
        target on the right. It grounds the panel and gives the eye
        a bottom edge that isn't just a border.

   Colour: keys take --tx, strings take --accent, true/false take
   --allow/--deny, numbers take --tx-dim. Their version uses a blue
   for numbers; we don't have one and inventing a hex to match a
   competitor is how a design system rots.

   Exports:
     IzPanel   — the shell (toggle + chrome + body + footer strip)
     IzJson    — the syntax-coloured payload, usable on its own
     IzToggle  — the switch, usable on its own
   ============================================================ */

/* ---------- JSON highlighter ----------
   Deliberately regex-based and tiny: payloads are authored in our own
   source, never user input, so a real tokenizer would be dead weight.
   Shared by IzSignalGrid so the two consoles can never drift apart. */
export function IzJson({ src, className = "" }: { src: string; className?: string }) {
  const parts = useMemo(() => {
    const out: { t: string; c: string }[] = [];
    const re = /("(?:[^"\\]|\\.)*"\s*:)|("(?:[^"\\]|\\.)*")|(\btrue\b|\bfalse\b|\bnull\b)|(-?\d+(?:\.\d+)?)/g;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src))) {
      if (m.index > last) out.push({ t: src.slice(last, m.index), c: "p" });
      if (m[1]) out.push({ t: m[1], c: "k" });
      else if (m[2]) out.push({ t: m[2], c: "s" });
      else if (m[3]) out.push({ t: m[3], c: m[3] === "true" ? "b-t" : "b-f" });
      else out.push({ t: m[4], c: "n" });
      last = re.lastIndex;
    }
    if (last < src.length) out.push({ t: src.slice(last), c: "p" });
    return out;
  }, [src]);

  return (
    <pre className={`izp-json ${className}`}>
      <code>
        {parts.map((p, i) => (
          <span key={i} className={`izp-j-${p.c}`}>
            {p.t}
          </span>
        ))}
      </code>
    </pre>
  );
}

/* ---------- the switch ---------- */
export function IzToggle({
  on,
  label,
  onChange,
}: {
  on: boolean;
  label: string;
  onChange?: (next: boolean) => void;
}) {
  const interactive = typeof onChange === "function";
  return (
    <span className="izp-toggle-wrap">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`izp-toggle ${on ? "on" : ""}`}
        // When there's no handler this is decoration inside a scripted
        // scene, so keep it out of the tab order rather than offering a
        // control that does nothing.
        tabIndex={interactive ? 0 : -1}
        disabled={!interactive}
        onClick={interactive ? () => onChange!(!on) : undefined}
      >
        <span className="izp-knob">{on && <Check weight="bold" aria-hidden="true" />}</span>
      </button>
      <span className={`izp-toggle-label ${on ? "on" : ""}`}>{label}</span>
    </span>
  );
}

/* ---------- the shell ---------- */
export function IzPanel({
  toggle,
  title,
  type,
  chrome = true,
  footerLeft,
  footerRight,
  actions,
  children,
  className = "",
}: {
  /** state switch in the header — the sleek version of a tab bar */
  toggle?: { on: boolean; label: string; onChange?: (next: boolean) => void };
  /** plain header text, when there's no toggle */
  title?: string;
  /** small type badge beside the title, e.g. "object" */
  type?: string;
  /** the muted gear / kebab / close affordances */
  chrome?: boolean;
  footerLeft?: string;
  footerRight?: string;
  /** anything extra in the header's right side, placed before the chrome */
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`izp ${className}`}>
      <div className="izp-head">
        <span className="izp-head-l">
          {toggle ? (
            <IzToggle on={toggle.on} label={toggle.label} onChange={toggle.onChange} />
          ) : (
            <>
              <span className="izp-title">{title}</span>
              {type && (
                <span className="izp-type" aria-label={`Type: ${type}`}>
                  {type}
                </span>
              )}
            </>
          )}
        </span>

        <span className="izp-head-r">
          {actions}
          {chrome && (
            <span className="izp-chrome" aria-hidden="true">
              <Gear />
              <DotsThree weight="bold" />
              <X />
            </span>
          )}
        </span>
      </div>

      <div className="izp-body">{children}</div>

      {(footerLeft || footerRight) && (
        <div className="izp-foot">
          <span>{footerLeft}</span>
          <span>{footerRight}</span>
        </div>
      )}
    </div>
  );
}
