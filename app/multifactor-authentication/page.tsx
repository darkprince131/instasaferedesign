import { MfaPage } from "@/components/izpages/mfa/MfaPage";

import type { Metadata } from "next";

/* .iz design system — order matters: system tokens, then base, then
   page-specific sheets. */
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/izlogomarquee.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/home2/izfootergrid.css";
import "@/components/izpages/mfa/mfa.css";
/* order matters: the six methods run on the C38 triptych and only
   ship the deltas, so qatriptych.css has to land first */
import "@/components/home2/qatriptych.css";
import "@/components/izpages/mfa/mfamethods.css";
import "@/components/home2/consolerow.css";
import "@/components/izpages/mfa/mfaapplies.css";
import "@/components/izpages/mfa/mfanetworkhub.css";

/* SEO-locked: this URL carries the equity of the live page. Metadata
   is unchanged from the v3 build this replaced. */
export const metadata: Metadata = {
  title: "Multi-Factor Authentication (MFA) — InstaSafe",
  description:
    "Adaptive multi-factor authentication from InstaSafe: SMS, email, TOTP, push approval, biometrics and FIDO2 hardware keys. Try the interactive login demo — no account needed.",
  alternates: { canonical: "/multifactor-authentication" },
};

/* MfaPage owns the `.iz` wrapper and the theme toggle state (IzNav needs
   both), so this route stays a thin server component around it. */
export default function Page() {
  return <MfaPage />;
}
