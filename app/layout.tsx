import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/components/help/help-widget.css";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { CONSENT_MODE_DEFAULT_SNIPPET } from "@/components/consent/consent-mode";
import { IzHelpWidget } from "@/components/help/IzHelpWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

/* APEX, NOT WWW. The live sitemap — the record of what Google actually
   has indexed — lists every URL as https://instasafe.com/..., with no
   www. Canonicals, sitemap <loc>s and the robots Host must name the SAME
   host the index already uses, or every canonical on the site points at
   a hostname the index does not know: if www redirects to apex they all
   point at a redirect and Google is free to pick its own canonical, and
   if both resolve the equity splits across two hosts.

   IF DNS ACTUALLY SERVES www AS PRIMARY, this is the one line to flip —
   but flip it in all three files together (layout.tsx, sitemap.ts,
   robots.ts) or they will disagree. */
const SITE_URL = "https://instasafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "InstaSafe ZTNA — Zero Trust Access in One Console | VPN Alternative",
    template: "%s | InstaSafe",
  },
  description:
    "Replace your VPN with InstaSafe ZTNA: Zero Trust network access, MFA, SSO, database and server access, privileged session recording, and endpoint control from one console.",
  keywords: [
    "Zero Trust",
    "ZTNA",
    "VPN alternative",
    "MFA",
    "SSO",
    "secure remote access",
    "privileged access management",
    "InstaSafe",
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "InstaSafe Technologies" }],
  openGraph: {
    title: "InstaSafe ZTNA — Zero Trust Access in One Console",
    description:
      "8 auth profiles, 7 app types, 25 device checks and privileged session recording. One console, no VPN.",
    url: SITE_URL,
    siteName: "InstaSafe",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaSafe ZTNA — Zero Trust Access in One Console",
    description:
      "Replace the VPN. Unify identity, access, devices and audit in a single Zero Trust platform.",
  },
  /* robots.txt keeps crawlers off an internal review build; this keeps
     them off any single page of it that gets linked from somewhere they
     already crawl, which robots.txt cannot do. Set only by
     `npm run deploy:preview` — never by the production export. */
  robots:
    process.env.PREVIEW_NOINDEX === "1"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "InstaSafe Technologies",
      url: SITE_URL,
      description:
        "InstaSafe provides Zero Trust security: ZTNA, MFA, SSO and privileged access from one platform.",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-844-844-8548",
        contactType: "sales",
        email: "sales@instasafe.com",
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "InstaSafe ZTNA",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Windows, macOS, Linux, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "2",
        priceCurrency: "USD",
        description: "Zero Trust Platform, per user per month, billed annually",
      },
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
        {/* GOOGLE CONSENT MODE v2 DEFAULT — must stay HERE, in <head>, and
            must stay unconditional. It denies every Google consent signal
            before gtm.js exists; gtm.js is injected by next/script
            afterInteractive, i.e. long after this head script has run, so
            the ordering is structural rather than a race we hope to win.
            If the default were ever to land after gtm.js, Google would
            treat the visitor as legacy-untracked and the modeled counts
            for rejecting visitors would silently stop. Rationale and the
            snippet itself live in components/consent/consent-mode.ts. */}
        <script
          dangerouslySetInnerHTML={{ __html: CONSENT_MODE_DEFAULT_SNIPPET }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsentProvider>
          {/* SKIP LINK — WCAG 2.4.1. Every page opens with the same nav;
              without this a keyboard or screen-reader user tabs through
              all of it on every single page before reaching content.
              Visually hidden until focused (see globals `.skip-link`). */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {/* THE MAIN LANDMARK, added once here rather than in twelve page
              components. Audited: not one page had it, so "jump to main
              content" did nothing site-wide.

              The page shells render their own nav and footer INSIDE
              children, so both end up nested in <main>. `<nav>` keeps its
              role when nested; `<footer>` does NOT — it silently drops to
              generic. That is why IzFooter and IzFooterGrid now carry an
              explicit `role="contentinfo"`. Do not remove it. */}
          <main id="main">{children}</main>
          <IzHelpWidget />
        </ConsentProvider>
      </body>
    </html>
  );
}
