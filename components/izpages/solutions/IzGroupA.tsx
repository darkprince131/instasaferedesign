"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import "./groupa.css";

/* ============================================================
   Group A — "replacing something".

   THE MECHANIC IS 00j's: an OFF→ON toggle where the argument is what
   DISAPPEARS. Group A's whole claim is the stack you stop running, so
   the visual is that stack being removed rather than a diagram of what
   replaces it.

   It is not literally `WithWithout`. That component is a 900×320
   network scene — user, gateway, three exposed apps — with its six
   layers welded into the SVG. Reusing it here would have meant
   gutting the drawing and leaving the homepage version to be rebuilt
   later. Same mechanic, same toggle vocabulary, different subject.

   THE TWO CARDS SHARE THIS TOGGLE. VPN Alternative and VDI Alternative
   are one argument seen from two sides — a hardware bill answering an
   access-control question — so they sit either side of the stack and
   move with it rather than carrying toggles of their own.
   ============================================================ */

type Layer = { name: string; tag: string };

/* what you run today. The tag is the recurring cost, which is the
   part the lead is actually about. */
const LAYERS: Layer[] = [
  { name: "VPN concentrator", tag: "HA pair · annual renewal" },
  { name: "Jump box", tag: "patch cycle" },
  { name: "VDI broker", tag: "per-seat licences" },
  { name: "Hypervisor hosts", tag: "capex refresh" },
  { name: "Session host pool", tag: "capacity planning" },
  { name: "Per-seat VDI licences", tag: "annual renewal" },
];

const AFTER: Layer = { name: "InstaSafe access layer", tag: "configuration" };

/* Per the v1 release plan, only five children ship. VPN Alternative is
   one of them; VDI Alternative is not, so it renders as text with no
   arrow — absent reads cleaner than disabled. */
type Card = { title: string; body: string; href?: string };
const CARDS: Card[] = [
  {
    title: "VPN Alternative",
    body: "Retire the concentrator without a flag day. InstaSafe runs alongside the VPN through migration, one application group at a time.",
    href: "/vpn-alternative",
  },
  {
    title: "VDI Alternative",
    body: "You bought virtual desktops to keep data off unmanaged machines. That's an access control problem solved with a hardware bill.",
  },
];

export function IzGroupA() {
  const [on, setOn] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  /* Plays itself once on first view, like 00j — the removal is the
     argument and a visitor who never touches the toggle should still
     see it happen. Reduced motion skips straight to the end state. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      played.current = true;
      return;
    }
    if (!("IntersectionObserver" in window)) {
      setOn(true);
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    const obs = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting && !played.current) {
          played.current = true;
          t = setTimeout(() => setOn(true), 900);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  const choose = (v: boolean) => {
    played.current = true;
    setOn(v);
  };

  return (
    <section className="iz-section ga" id="group-a" ref={rootRef}>
      <div className="iz-wrap">
        <div className="ga-head">
          <span className="iz-ey">Replacing something</span>
          <h2 className="iz-h2">
            You have a tool in place. It works, mostly, and it&apos;s the reason a quarter of your budget is a{" "}
            <em>renewal</em>.
          </h2>
        </div>

        <div className={`ga-stage${on ? " is-on" : ""}`}>
          <Card card={CARDS[0]} />

          <div className="ga-mid">
            <div className="ga-toggle" role="group" aria-label="Before or after InstaSafe">
              <button type="button" className={!on ? "is-sel" : undefined} aria-pressed={!on} onClick={() => choose(false)}>
                what you run today
              </button>
              <button type="button" className={on ? "is-sel" : undefined} aria-pressed={on} onClick={() => choose(true)}>
                after
              </button>
            </div>

            <div className="ga-stack">
              {LAYERS.map((l, i) => (
                <div
                  className="ga-layer"
                  key={l.name}
                  /* top-down at 80ms — the stack unbuilds in the order
                     it was built, which is why the stagger is not
                     reversed on the way out */
                  style={{ ["--i" as string]: i }}
                >
                  <span className="ga-layer-n">{l.name}</span>
                  <span className="ga-layer-t">{l.tag}</span>
                </div>
              ))}

              <div className="ga-after" aria-hidden={!on}>
                <span className="ga-layer-n">{AFTER.name}</span>
                <span className="ga-layer-t">{AFTER.tag}</span>
              </div>
            </div>

            <p className="ga-count" aria-live="polite">
              <b>6</b> things to renew
              <span className="ga-count-arrow" aria-hidden="true">
                →
              </span>
              <b className="is-after">1</b>
            </p>
          </div>

          <Card card={CARDS[1]} />
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: Card }) {
  const inner = (
    <>
      <span className="ga-card-t">
        {card.title}
        {card.href && <ArrowRight size={14} weight="bold" aria-hidden="true" />}
      </span>
      <span className="ga-card-b">{card.body}</span>
    </>
  );
  if (!card.href) return <div className="ga-card is-flat">{inner}</div>;
  return (
    <a className="ga-card" href={card.href}>
      {inner}
    </a>
  );
}
