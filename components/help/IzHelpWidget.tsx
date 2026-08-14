"use client";

import { LogoMark } from "@/components/brand/Logo";
import { useConsent } from "@/components/consent/ConsentProvider";
import { ArrowUp, BookOpen, ChatCircleDots, LifebuoyIcon, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   IzHelpWidget — persistent bottom-right help launcher.

   Recreated from Fingerprint's site-wide widget: a circular brand
   button that opens a small card of "where do I go next" routes.

   Mounted once in app/layout.tsx so it is on EVERY page, which
   means it lives outside both scoped design systems (`.iz` and the
   v3 `globals.css` tokens). It therefore self-themes exactly the
   way consent.css does — its own `--help-*` properties, OS default
   via prefers-color-scheme, overridden by `html[data-theme]` — and
   hardcodes the brand accent. Never reference `--accent`/`--orange`
   here: those resolve to nothing outside `.iz`.

   Sits bottom-RIGHT; the DPDP consent banner is bottom-LEFT, and
   this is deliberately below the consent layer in z-index so a
   legally-required notice can never be covered.

   ▸ TO EDIT ◂ — change LINKS / PRIMARY below.
   Every destination here is a real, existing route or a verified
   address. Do not add an entry until its target actually exists.
   ============================================================ */

const LINKS = [
  {
    // NOTE: InstaSafe has no /docs route yet. Resource Center is the
    // closest real page — repoint if a docs site ships.
    label: "Read the docs",
    href: "/resource-center",
    Icon: BookOpen,
  },
  {
    label: "Talk to sales",
    href: "mailto:sales@instasafe.com",
    Icon: ChatCircleDots,
  },
  {
    label: "Contact support",
    href: "/contact-us",
    Icon: LifebuoyIcon,
  },
];

const PRIMARY = { label: "Book a demo", href: "/book-a-demo" };

/**
 * Resolves the theme the VISITOR is actually looking at.
 *
 * `html[data-theme]` alone is not enough: the Balanced pages keep their
 * theme on the `.iz` wrapper (`dark` | `paper`) and leave `html` at its
 * boot-script default, so a paper homepage would otherwise get a dark
 * widget floating over it. `.iz` wins when present; `html` is the
 * fallback for v3 and scaffold pages.
 */
function useEffectiveTheme(): "dark" | "light" {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const compute = () => {
      const iz = document.querySelector(".iz[data-theme]");
      const val = iz
        ? iz.getAttribute("data-theme")
        : document.documentElement.getAttribute("data-theme");
      setTheme(val === "paper" || val === "light" ? "light" : "dark");
    };
    compute();
    const mo = new MutationObserver(compute);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
      subtree: true,
    });
    return () => mo.disconnect();
  }, []);

  return theme;
}

export function IzHelpWidget() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const theme = useEffectiveTheme();
  const { bannerOpen } = useConsent();
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* close on Escape (returning focus to the launcher) and on outside click */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  /* move focus into the panel so keyboard users land on the first route */
  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  }, [open]);

  /* Back to top — appears once the reader is a screen and a half down,
     stacked directly above the launcher. These pages run long (the
     platform page is fifteen sections), and on a phone the alternative
     is a very long swipe back to the nav.

     `passive: true` because this listener runs on every scroll frame and
     never calls preventDefault; without it the browser has to wait for
     it before it can scroll. The threshold is read once per event and
     compared against current state, so setState is only called on the
     two frames where the answer actually changes. */
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 1.5;
      setShowTop((v) => (v === past ? v : past));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  /* Stay out of the way until the consent decision is made. On a phone the
     banner fills the bottom of the screen and the launcher lands directly on
     top of it — a required privacy notice must never be obscured. */
  if (bannerOpen) return null;

  return (
    <div className="izhw" data-help-theme={theme} ref={rootRef}>
      <div
        className="izhw-panel"
        id="iz-help-panel"
        ref={panelRef}
        role="dialog"
        aria-label="Need help?"
        hidden={!open}
      >
        <p className="izhw-title">
          <span aria-hidden="true">👋</span> Hi there! Need help?
        </p>
        <p className="izhw-sub">Get help with using InstaSafe.</p>

        <ul className="izhw-list">
          {LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} className="izhw-row">
                <Icon size={16} weight="duotone" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a href={PRIMARY.href} className="izhw-primary">
          {PRIMARY.label}
        </a>
      </div>

      {/* Hidden while the help panel is open: the panel already occupies
          the stack above the launcher, and a third object wedged between
          them reads as part of the card. */}
      {showTop && !open && (
        <button type="button" className="izhw-top" onClick={toTop} aria-label="Back to top">
          <ArrowUp size={18} weight="bold" aria-hidden="true" />
        </button>
      )}

      <button
        ref={btnRef}
        type="button"
        className="izhw-btn"
        aria-expanded={open}
        aria-controls="iz-help-panel"
        aria-label={open ? "Close help menu" : "Open help menu"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X size={22} weight="bold" aria-hidden="true" />
        ) : (
          <LogoMark size={30} forceTheme={theme} />
        )}
      </button>
    </div>
  );
}
