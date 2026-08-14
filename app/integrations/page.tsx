import { izFontVars } from "@/lib/iz-fonts";
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/integrations/integrations.css";
import { IntegrationsPage } from "@/components/izpages/integrations/IntegrationsPage";
import type { Metadata } from "next";

/* ============================================================
   /integrations — a NEW url.

   Nothing in the live sitemap covers this, and nothing SEO-locked is
   touched: the closest existing pages are the nine
   /solutions/secure-access-for-* entries, which are per-application
   deep dives rather than a catalogue. This is the index they have
   never had.
   ============================================================ */

export const metadata: Metadata = {
  title: "Integrations — InstaSafe ZTNA",
  description:
    "InstaSafe integrates with the identity, cloud, endpoint, DevOps and SIEM tools you already run — plus 800+ SAML, OAuth and OpenID Connect applications.",
  alternates: { canonical: "/integrations" },
};

export default function Page() {
  return (
    <div className={izFontVars}>
      <IntegrationsPage />
    </div>
  );
}
