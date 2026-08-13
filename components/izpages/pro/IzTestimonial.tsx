"use client";

import { ArrowUpRight } from "@phosphor-icons/react";

/* ============================================================
   IzTestimonial — TIER 2 SECTION  (lab 00ap)

   Centred customer quote: an oversized ghost quote mark behind the
   block, the customer's wordmark above it, the quote at reading
   size, attribution under that, a short accent rule, and a tinted
   strip that hands off to the full case study.

   Two things carry it, and both are easy to lose:
     - the quote mark is BEHIND and clipped, not an icon beside the
       text. It is texture, so it is `aria-hidden` and sized in the
       hundreds of px.
     - the hand-off strip is a separate tinted band, not a link at
       the end of the paragraph. It reads as "there is more", which
       is the job the whole section is doing.

   ⚠️ PLACEHOLDER CONTENT. The quote, the customer and the role are
   stand-ins so the component has a shape. Attribution is by ROLE
   and ORGANISATION ONLY — no invented person's name — because a
   fabricated human on a testimonial is a claim, not a lorem ipsum.
   Swap for a real, approved quote before this ships.
   ============================================================ */

export function IzTestimonial({
  customer = "Manufacturing group",
  quote = "We stopped managing a network and started managing access. The quarterly review went from a fortnight of screenshots to an afternoon of exports.",
  role = "Head of Infrastructure",
  org = "2,400 seats across 40 sites",
  strip = {
    text: "See how the group retired its VPN one application at a time.",
    label: "Read the case study",
    href: "/resource-center",
  },
}: {
  customer?: string;
  quote?: string;
  role?: string;
  org?: string;
  strip?: { text: string; label: string; href: string };
}) {
  return (
    <section className="izq iz-railed">
      <div className="iz-wrap izq-inner">
        {/* texture, not an icon — behind the block and clipped */}
        <span className="izq-mark" aria-hidden="true">
          &rdquo;
        </span>

        <span className="izq-logo">{customer}</span>

        <blockquote className="izq-quote">&ldquo;{quote}&rdquo;</blockquote>

        <div className="izq-who">
          <b>{role}</b>
          <span>{org}</span>
        </div>

        <span className="izq-rule" aria-hidden="true" />

        <div className="izq-strip">
          <p>{strip.text}</p>
          <a href={strip.href}>
            {strip.label}
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
