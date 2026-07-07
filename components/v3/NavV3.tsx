"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  ArrowsClockwise,
  Article,
  Bank,
  BookOpen,
  Briefcase,
  CaretDown,
  Cloud,
  Compass,
  Cpu,
  EnvelopeSimple,
  Fingerprint,
  Funnel,
  GitBranch,
  GlobeSimple,
  Handshake,
  Key,
  Laptop,
  List,
  Lock,
  Newspaper,
  Prohibit,
  ShieldCheck,
  SignIn,
  Trophy,
  Truck,
  UsersThree,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "./ThemeToggle";

type Item = { title: string; desc?: string; href: string; Icon?: Icon };

/* ── PLATFORM (card grid) ── */
const platformPillars: Item[] = [
  { title: "ZTNA", desc: "Zero Trust network access — replace the VPN", href: "/zero-trust-network-access", Icon: Lock },
  { title: "Application Access", desc: "7 app types, agentless RDP/SSH/DB", href: "/zero-trust-application-access", Icon: AppWindow },
  { title: "Identity & Access (IAM)", desc: "8 auth profiles, directory sync, IdP", href: "/platform/iam", Icon: ShieldCheck },
  { title: "Multi-Factor Auth", desc: "6 MFA methods, push & biometric", href: "/multifactor-authentication", Icon: Fingerprint },
  { title: "Single Sign-On", desc: "One login across every app", href: "/zero-trust-features/single-sign-on", Icon: SignIn },
  { title: "Secure Browser", desc: "Hardened Chromium with built-in DLP", href: "/secure-enterprise-browser", Icon: GlobeSimple },
];
const platformWide: Item[] = [
  { title: "Privileged Access (PAM)", desc: "Record & govern every session", href: "/solutions/privileged-access-management", Icon: Key },
  { title: "Secure Web Gateway", desc: "Cloud web filtering, no appliance", href: "/solutions/instasafe-secure-web-gateway", Icon: Funnel },
  { title: "Data Loss Prevention", desc: "Stop data before it walks out", href: "/solutions/data-loss-prevention", Icon: Prohibit },
];

/* ── SOLUTIONS (use-case cards + industry list) ── */
const useCases: Item[] = [
  { title: "VPN Alternative", desc: "Retire the VPN, app by app", href: "/vpn-alternative", Icon: ArrowsClockwise },
  { title: "Secure Remote Access", desc: "Every worker, every device", href: "/secure-remote-access", Icon: Laptop },
  { title: "DevOps Access", desc: "Governed SSH, RDP & web", href: "/secure-devops-access", Icon: GitBranch },
  { title: "Cloud Applications", desc: "Extend zero trust to SaaS", href: "/secure-cloud-applications", Icon: Cloud },
];
const moreSolutions: Item[] = [
  { title: "Clientless / Agentless Access", href: "/clientless-remote-access" },
  { title: "Secure VoIP Access", href: "/secure-voip-access" },
  { title: "Domain Joining", href: "/domain-joining" },
  { title: "VDI Alternative", href: "/solutions/vdi-secure-digital-workspace" },
];
const industries: Item[] = [
  { title: "Banking & BFSI", href: "/case-studies/Zero-trust-for-banking", Icon: Bank },
  { title: "IT / ITES / BPM", href: "/case-studies/Zero-trust-for-IT-sector", Icon: Cpu },
  { title: "Logistics", href: "/case-studies/Zero-trust-for-logistics", Icon: Truck },
  { title: "Real Estate", href: "/case-studies/Zero-trust-for-real-estate", Icon: Bank },
  { title: "SAP Access", href: "/case-studies/Zero-trust-for-SAP-Access", Icon: AppWindow },
  { title: "ERP Access", href: "/case-studies/Zero-trust-for-ERP-Access", Icon: Cpu },
];

/* ── RESOURCES (explore cards + company + updates) ── */
const explore: Item[] = [
  { title: "What is Zero Trust?", desc: "The complete guide", href: "/what-is-zero-trust", Icon: Compass },
  { title: "Resource Center", desc: "Brochures, webinars, datasheets", href: "/resource-center", Icon: BookOpen },
];
const companyLinks: Item[] = [
  { title: "About", desc: "Company, values, and team", href: "/about-us", Icon: UsersThree },
  { title: "Careers", desc: "Join our global team", href: "/careers", Icon: Briefcase },
  { title: "Partners", desc: "Reseller, referral, MSSP", href: "/partners", Icon: Handshake },
  { title: "Contact", desc: "Reach support or sales", href: "/contact-us", Icon: EnvelopeSimple },
];
const updates: Item[] = [
  { title: "Blog", desc: "Insights and stories", href: "/blog", Icon: Article },
  { title: "Newsroom", desc: "Press and coverage", href: "/instasafe-newsroom", Icon: Newspaper },
  { title: "Awards", desc: "Recognition and timeline", href: "/awards", Icon: Trophy },
];

const directLinks: Item[] = [
  { title: "Why InstaSafe", href: "/why-instasafe-zero-trust" },
  { title: "Customers", href: "/case-studies" },
  { title: "Pricing", href: "/instasafe-zero-trust-pricing" },
];

type MenuKey = "Platform" | "Solutions" | "Resources";
const dropdowns: MenuKey[] = ["Platform", "Solutions", "Resources"];

/* ───────────────────────── card primitives ───────────────────────── */
function PillarCard({ it }: { it: Item }) {
  return (
    <a
      href={it.href}
      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[var(--surface-faint)]"
    >
      {it.Icon && (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-card)] bg-[var(--surface-faint)] text-[var(--accent-blue-light)] transition-colors group-hover:border-[var(--border-accent)]">
          <it.Icon size={18} weight="duotone" />
        </span>
      )}
      <div>
        <div className="text-sm font-semibold tracking-tight">{it.title}</div>
        {it.desc && <div className="mt-0.5 text-xs leading-snug text-[var(--text-secondary)]">{it.desc}</div>}
      </div>
    </a>
  );
}

function ListLink({ it }: { it: Item }) {
  return (
    <a
      href={it.href}
      className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-faint)] hover:text-[var(--text-primary)]"
    >
      {it.Icon && <it.Icon size={16} weight="duotone" className="shrink-0 text-[var(--accent-blue-light)]" />}
      <span>{it.title}</span>
    </a>
  );
}

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">
      {children}
    </div>
  );
}

/* ───────────────────────── mega panels ───────────────────────── */
function PlatformPanel() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="nav-panel mt-2 p-4">
        <div className="grid grid-cols-2 gap-1 lg:grid-cols-3">
          {platformPillars.map((it) => (
            <PillarCard key={it.title} it={it} />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-1 gap-1 border-t border-[var(--hairline)] pt-2 sm:grid-cols-3">
          {platformWide.map((it) => (
            <PillarCard key={it.title} it={it} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionsPanel() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="nav-panel mt-2 grid gap-4 p-4 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <ColHeading>By use case</ColHeading>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {useCases.map((it) => (
              <PillarCard key={it.title} it={it} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-2 gap-0.5 border-t border-[var(--hairline)] pt-2">
            {moreSolutions.map((it) => (
              <ListLink key={it.title} it={it} />
            ))}
          </div>
        </div>
        <div className="lg:border-l lg:border-[var(--hairline)] lg:pl-4">
          <ColHeading>By industry</ColHeading>
          <div className="grid grid-cols-1 gap-0.5">
            {industries.map((it) => (
              <ListLink key={it.title} it={it} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourcesPanel() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      <div className="nav-panel mt-2 grid gap-4 p-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <ColHeading>Explore</ColHeading>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {explore.map((it) => (
              <a
                key={it.title}
                href={it.href}
                className="group flex h-full flex-col justify-between rounded-xl border border-[var(--border-card)] bg-[var(--surface-faint)] p-4 transition-colors hover:border-[var(--border-accent)]"
              >
                {it.Icon && <it.Icon size={22} weight="duotone" className="text-[var(--accent-blue-light)]" />}
                <div className="mt-8">
                  <div className="text-sm font-semibold tracking-tight">{it.title}</div>
                  {it.desc && <div className="mt-0.5 text-xs text-[var(--text-secondary)]">{it.desc}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="lg:border-l lg:border-[var(--hairline)] lg:pl-4">
          <ColHeading>Company</ColHeading>
          <div className="grid grid-cols-1 gap-0.5">
            {companyLinks.map((it) => (
              <a
                key={it.title}
                href={it.href}
                className="group flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-faint)]"
              >
                {it.Icon && <it.Icon size={17} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />}
                <div>
                  <div className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">{it.title}</div>
                  {it.desc && <div className="text-xs text-[var(--text-secondary)]">{it.desc}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="lg:border-l lg:border-[var(--hairline)] lg:pl-4">
          <ColHeading>Updates</ColHeading>
          <div className="grid grid-cols-1 gap-0.5">
            {updates.map((it) => (
              <a
                key={it.title}
                href={it.href}
                className="group flex items-start gap-2.5 rounded-lg px-3 py-2 transition-colors hover:bg-[var(--surface-faint)]"
              >
                {it.Icon && <it.Icon size={17} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />}
                <div>
                  <div className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">{it.title}</div>
                  {it.desc && <div className="text-xs text-[var(--text-secondary)]">{it.desc}</div>}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── nav ───────────────────────── */
export function NavV3() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled || menu
            ? "border-b border-[var(--hairline)] bg-[var(--bg-base)]/80 backdrop-blur-xl"
            : "border-b border-transparent"
        )}
        onMouseLeave={() => setMenu(null)}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="/" className="flex items-center">
            <Logo height={28} />
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {dropdowns.map((item) => (
              <div key={item} onMouseEnter={() => setMenu(item)} className="relative">
                <button
                  className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors",
                    menu === item ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                >
                  {item}
                  <CaretDown className={cn("h-3.5 w-3.5 opacity-60 transition-transform", menu === item && "rotate-180")} />
                </button>
              </div>
            ))}
            {directLinks.map((l) => (
              <a
                key={l.title}
                href={l.href}
                onMouseEnter={() => setMenu(null)}
                className="rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {l.title}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/book-a-demo"
              className="hidden rounded-full bg-[var(--btn-bg)] px-5 py-2 text-sm font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Book a demo
            </a>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] transition-colors hover:bg-[var(--surface-faint)] lg:hidden"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </nav>

        {/* mega menu */}
        <AnimatePresence>
          {menu && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.16 }}
              onMouseEnter={() => setMenu(menu)}
              className="absolute inset-x-0 top-16 hidden lg:block"
            >
              {menu === "Platform" && <PlatformPanel />}
              {menu === "Solutions" && <SolutionsPanel />}
              {menu === "Resources" && <ResourcesPanel />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-[var(--bg-base)] lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <a href="/" onClick={() => setMobileOpen(false)}>
                <Logo height={28} />
              </a>
              <button
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--text-primary)] hover:bg-[var(--surface-faint)]"
              >
                <X size={22} weight="bold" />
              </button>
            </div>
            <div className="space-y-6 px-5 pb-24 pt-4">
              <MobileSection title="Platform" items={[...platformPillars, ...platformWide]} />
              <MobileSection title="Solutions" items={[...useCases, ...moreSolutions]} />
              <MobileSection title="Industries" items={industries} />
              <MobileSection title="Resources" items={[...explore, ...companyLinks, ...updates]} />
              <MobileSection title="More" items={directLinks} />
              <a
                href="/book-a-demo"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center rounded-full bg-[var(--btn-bg)] px-5 py-3 text-sm font-semibold text-[var(--btn-fg)]"
              >
                Book a demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSection({ title, items }: { title: string; items: Item[] }) {
  return (
    <div>
      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)]">{title}</div>
      <div className="grid grid-cols-1 gap-0.5">
        {items.map((it) => (
          <a
            key={it.title + it.href}
            href={it.href}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-[15px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-faint)] hover:text-[var(--text-primary)]"
          >
            {it.Icon && <it.Icon size={18} weight="duotone" className="shrink-0 text-[var(--accent-blue-light)]" />}
            {it.title}
          </a>
        ))}
      </div>
    </div>
  );
}
