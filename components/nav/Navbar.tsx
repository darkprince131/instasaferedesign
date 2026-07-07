"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  CaretDown,
  Fingerprint,
  GlobeSimple,
  List,
  Lock,
  Monitor,
  ShieldCheck,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const platformPillars: { title: string; desc: string; Icon: Icon }[] = [
  { title: "ZTNA", desc: "Zero Trust network access", Icon: Lock },
  { title: "ZTAA", desc: "Application access across 7 app types", Icon: Monitor },
  { title: "IAM + MFA + SSO", desc: "8 auth profiles, 6 MFA methods", Icon: Fingerprint },
  { title: "Secure Browser", desc: "Agentless access, anywhere", Icon: GlobeSimple },
  { title: "Endpoint Controls", desc: "25 device checks, geofencing", Icon: ShieldCheck },
];

const solutions = [
  "VPN Alternative",
  "Secure Remote Access",
  "Cloud Security",
  "DevOps Security",
  "Database Security",
  "Government / On-Prem",
];

const navItems = ["Platform", "Solutions", "Why InstaSafe", "Resources"] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border-card)] bg-[var(--bg-base)]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="flex items-center">
          <Logo height={28} />
        </a>

        <div
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {navItems.map((item) => (
            <div key={item} onMouseEnter={() => setOpenMenu(item)} className="relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]">
                {item}
                <CaretDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>
          ))}
          <a
            href="#pricing"
            className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Pricing
          </a>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm">
            Book Demo
          </Button>
          <Button size="sm">Try Free →</Button>
        </div>

        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <List className="h-6 w-6" />
        </button>

        <AnimatePresence>
          {openMenu === "Platform" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="glass absolute left-1/2 top-14 w-[640px] -translate-x-1/2 p-3"
              onMouseEnter={() => setOpenMenu("Platform")}
            >
              <div className="grid grid-cols-2 gap-1">
                {platformPillars.map((p) => (
                  <a
                    key={p.title}
                    href="#platform"
                    className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--surface-faint)]"
                  >
                    <p.Icon size={22} weight="duotone" className="mt-0.5 text-[var(--accent-blue-light)]" />
                    <div>
                      <div className="text-sm font-semibold">{p.title}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{p.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
          {openMenu === "Solutions" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="glass absolute left-1/2 top-14 w-[420px] -translate-x-1/2 p-3"
              onMouseEnter={() => setOpenMenu("Solutions")}
            >
              <div className="grid grid-cols-2 gap-1">
                {solutions.map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-faint)] hover:text-[var(--text-primary)]"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg-base)] p-6 lg:hidden"
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="text-lg font-bold">
                Insta<span className="text-[var(--accent-blue-light)]">Safe</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {[...navItems, "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-[var(--hairline)] py-4 text-xl font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button variant="secondary" size="lg">
                Book Demo
              </Button>
              <Button size="lg">Try Free →</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
