"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

/* ============================================================
   SsoProtocolSlider — "Standard protocols" as a slider.

   The protocols used to be one cell in a grid of six reading "SAML
   2.0, OAuth, OpenID Connect — IdP- and SP-initiated". That sentence
   is the single most load-bearing fact on this page for a technical
   reader and it was the same size as everything else.

   A slider, specifically, because the list is long and the reader
   only cares about one entry — theirs. A grid of eight forces
   everyone to scan eight; a track lets them find SAML, read it, and
   leave. It is also honest about length: the scrollbar says "there
   are more of these" without printing all of them at once.

   ▸ IT IS A REAL SCROLLER ◂
   Native overflow with scroll-snap, not a transform carousel. That
   buys touch drag, trackpad swipe, keyboard scrolling, and
   find-in-page for free, and the arrows are a convenience on top
   rather than the only way through. `scrollend` keeps the arrows'
   disabled state honest without polling.
   ============================================================ */

type Protocol = {
  name: string;
  tag: string;
  body: string;
  /** what InstaSafe does with it, in the fewest possible words */
  role: string;
};

const PROTOCOLS: Protocol[] = [
  {
    name: "SAML 2.0",
    tag: "Web SSO",
    body: "The assertion most business SaaS speaks. InstaSafe runs it in both directions — as your identity provider, or as a service provider federating to the one you already have.",
    role: "IdP and SP initiated",
  },
  {
    name: "OAuth 2.0",
    tag: "Delegated access",
    body: "Authorises an application to act with a scoped token instead of handing it a password. The scope is the point: an integration gets what it needs and nothing adjacent.",
    role: "Scoped tokens",
  },
  {
    name: "OpenID Connect",
    tag: "Identity layer",
    body: "OAuth with an identity claim on top, which is what modern applications actually ask for. Same single login, expressed in the format the newer half of your estate expects.",
    role: "ID tokens on OAuth",
  },
  {
    name: "RADIUS",
    tag: "Network access",
    body: "The protocol your switches, wireless controllers and older VPN concentrators already talk. It means the network gear can ask the same identity a browser does.",
    role: "Network device auth",
  },
  {
    name: "TACACS+",
    tag: "Device administration",
    body: "Separates authentication from authorisation and accounting, which is why network teams keep it for administrative logins to routers and firewalls.",
    role: "Per-command control",
  },
  {
    name: "Kerberos",
    tag: "Desktop SSO",
    body: "The Windows domain login your people already completed this morning. Desktop SSO means that ticket carries into the portal — no second prompt at the start of the day.",
    role: "Domain ticket reuse",
  },
  {
    name: "FIDO2 / WebAuthn",
    tag: "Phishing-resistant",
    body: "Hardware keys and platform biometrics, bound to the origin. A credential that cannot be replayed on a lookalike domain, because the browser refuses to offer it there.",
    role: "Hardware-backed factor",
  },
  {
    name: "LDAP",
    tag: "Directory",
    body: "Reads the groups you already maintain in Active Directory or an LDAP server, so entitlement stays where your joiners-movers-leavers process already lives.",
    role: "Group source of truth",
  },
];

export function SsoProtocolSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  /* Step by one card, whatever a card currently measures — reading the
     live width beats hardcoding it, because the card is fluid. */
  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ssps-card");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <div className="ssps">
      <div className="ssps-top">
        <span className="ssps-count">
          {PROTOCOLS.length} protocols · one login
        </span>
        <span className="ssps-arrows">
          <button
            type="button"
            className="ssps-arrow"
            onClick={() => nudge(-1)}
            disabled={edge.start}
            aria-label="Previous protocol"
          >
            <ArrowLeft weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="ssps-arrow"
            onClick={() => nudge(1)}
            disabled={edge.end}
            aria-label="Next protocol"
          >
            <ArrowRight weight="bold" aria-hidden="true" />
          </button>
        </span>
      </div>

      <div className="ssps-track" ref={trackRef} tabIndex={0} role="group" aria-label="Supported authentication protocols">
        {PROTOCOLS.map((p) => (
          <article className="ssps-card" key={p.name}>
            <span className="ssps-tag">{p.tag}</span>
            <h3 className="ssps-name">{p.name}</h3>
            <p className="ssps-body">{p.body}</p>
            <span className="ssps-role">{p.role}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
