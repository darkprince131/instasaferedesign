"use client";

import { MechanismEmblem } from "@/components/dev/MechanismEmblem";

/* ============================================================
   IzMechanismBand — the engine, stated as an object.

   Sits DIRECTLY UNDER IzTrustEngine (user call, 2026-08-14). It used
   to be the pre-footer banner, fifteen sections below the row it is
   about, where the two read as unrelated banners that happen to share
   a subject. Against the decision layer they are one argument: that
   row shows the engine as a console making a call, this shows it as a
   single movement — same claim, two registers, one after the other.

   WHY IT STAYS QUIET
     - no primary button. One ghost link out to the deep-dive; the
       demand for the demo is made once, in IzFinalCta, not twice.
     - no numbers. Every figure on this page is already stated
       exactly once above (hub rule), and IzTrustEngine immediately
       above states 21/12/4; a banner that restates them reads as the
       page not trusting its own first pass.
     - hairline top and bottom, no panel, no fill. It is a seam.

   The emblem's own tokens follow `[data-theme]` on the page root
   (see mechanism-emblem.css), so nothing here sets a colour. Size
   is CSS, not the `size` prop — the prop only fixes the intrinsic
   ratio the SVG scales inside.
   ============================================================ */

export function IzMechanismBand() {
  return (
    <section className="izmb" aria-labelledby="izmb-h">
      <div className="iz-wrap izmb-wrap">
        <div className="izmb-art" aria-hidden="true">
          <MechanismEmblem className="izmb-emblem" size={400} beat={1.2} />
        </div>

        <div className="izmb-body">
          <p className="izmb-ey">
            The engine
            <i aria-hidden="true">_</i>
          </p>
          <h2 className="izmb-h" id="izmb-h">
            One movement, <em>checked on every beat</em>.
          </h2>
          <p className="izmb-sub">
            Identity, device, location, time and risk are not five products taking turns. They are one
            movement, evaluated together, on every request — and the whole of it runs from one console.
          </p>
          <p className="izmb-meta">
            <span>identity</span>
            <span>device</span>
            <span>location</span>
            <span>time</span>
            <span>risk</span>
          </p>
          <a className="izmb-link" href="/platform/trust-engine">
            Inside the Trust Engine
            <i aria-hidden="true">→</i>
          </a>
        </div>
      </div>
    </section>
  );
}
