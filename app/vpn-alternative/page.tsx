import { VpnPage } from "@/components/izpages/vpn/VpnPage";
import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izvpnztna.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/vpn/vpn.css";

/* SEO-locked: /vpn-alternative is an existing live URL and was served
   until now through the [...slug] catch-all from lib/site.ts. Title
   and description are byte-identical to that registry entry — the
   same convention /platform, /solutions and the ZTNA page document
   for their own migrations — so promoting it to a bespoke build costs
   the URL none of its equity. Only the rendering below is new. */
export const metadata: Metadata = {
  title: "VPN Alternative — Replace Your VPN with Zero Trust",
  description:
    "VPNs grant network-wide trust, expose ports and slow your team down. InstaSafe ZTNA replaces them with app-level zero trust — faster, invisible and fully audited.",
  alternates: { canonical: "/vpn-alternative" },
};

/* VpnPage owns the `.iz` wrapper and the theme toggle state (IzNav
   needs both), so this route stays a thin server component around it. */
export default function Page() {
  return <VpnPage />;
}
