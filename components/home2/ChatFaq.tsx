"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, ArrowRight } from "@phosphor-icons/react";

/* ============================================================
   C-new · Chat FAQ — FAQ as a live chat. Click a question and
   the "InstaSafe assistant" replies: a short typing indicator
   (3 bouncing dots, ~600ms) then the FULL answer bubble springs
   in — NOT a typewriter, so visitors read it instantly. Slight
   UI feedback everywhere (hover lift, active ring, online dot,
   spring-in). Auto-opens the first question when in view.
   Plain-language answers; no banned claims, no "i365".
   ============================================================ */

const TYPING_MS = 620;

interface QA { q: string; a: string; }
const FAQ: QA[] = [
  {
    q: "How is this different from a VPN?",
    a: "A VPN drops you onto the whole network, then trusts you. InstaSafe gives access to one specific app at a time — your network stays invisible, and every request is checked first.",
  },
  {
    q: "How long does it take to go live?",
    a: "Most teams are live in days, not months. Connect the identity provider you already use, point us at your apps, set your access rules — there are no appliances to rack.",
  },
  {
    q: "Do my apps stay exposed to the internet?",
    a: "No. Your apps sit behind InstaSafe with no inbound ports open. Attackers can't scan, find, or reach what they can't even see.",
  },
  {
    q: "Does it work for remote and third-party users?",
    a: "Yes. Employees, contractors and vendors all get the same secure, per-app access from any device, anywhere — with no network onboarding.",
  },
  {
    q: "Which identity providers do you support?",
    a: "The ones you already run — Entra ID (Azure AD), Okta, Google, and standard SAML / OIDC — so sign-in stays familiar for your people.",
  },
  {
    q: "How does device trust work?",
    a: "Before access we check the device — disk encryption, OS patch level, antivirus and more — and keep re-checking. Risky devices get limited access or are blocked.",
  },
];

const Avatar = ({ sm }: { sm?: boolean }) => (
  <span className={`cf-ava${sm ? " sm" : ""}`}>
    <ShieldCheck weight="fill" />
  </span>
);

export function ChatFaq() {
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [open, setOpen] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  function reveal(i: number) {
    if (timer.current) clearTimeout(timer.current);
    if (reduced) { setOpen(i); setTyping(false); return; }
    setOpen(i);
    setTyping(true);
    timer.current = setTimeout(() => setTyping(false), TYPING_MS);
  }

  function toggle(i: number) {
    if (open === i) {
      if (timer.current) clearTimeout(timer.current);
      setOpen(null);
      setTyping(false);
      return;
    }
    reveal(i);
  }

  // auto-open first question once in view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        reveal(0);
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); if (timer.current) clearTimeout(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="cf" ref={rootRef}>
      {/* LEFT — heading */}
      <div className="cf-left">
        <span className="cf-pill"><i /> FAQ</span>
        <h2 className="iz-h2">Frequently asked <em>questions</em>.</h2>
        <p className="cf-sub">Tap a question — our assistant answers on the spot. Still curious? A real human is one click away.</p>
        <a className="cf-cta" href="/contact-us">Talk to us <ArrowRight weight="bold" /></a>
      </div>

      {/* RIGHT — floating chat thread (no panel chrome) */}
      <div className="cf-right">
        <div className="cf-thread">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <div className="cf-item" key={i}>
                <button
                  className={`cf-q${isOpen ? " on" : ""}`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  {f.q}
                </button>

                {isOpen && (
                  <div className="cf-a-wrap">
                    <Avatar sm />
                    {typing ? (
                      <div className="cf-typing" aria-label="Assistant is typing">
                        <i /><i /><i />
                      </div>
                    ) : (
                      <div className="cf-a">{f.a}</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
