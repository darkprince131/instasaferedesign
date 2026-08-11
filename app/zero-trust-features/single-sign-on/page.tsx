import { izFontVars } from "@/lib/iz-fonts";
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/home2/chatfaq.css";
import "@/components/iz-fx/fx.css";
/* the answer strip, its illustration vocabulary, and the shared
   three-outcomes section */
import "@/components/home2/iznewblocks.css";
import "@/components/izoutcomes/illustrations.css";
import "@/components/izanswer/answers.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/izpages/sso/sso.css";
import "@/components/izpages/sso/oneloginrace.css";
import "@/components/izpages/sso/ssoflowdiagram.css";
import "@/components/izpages/sso/passwordfatigue.css";
import { SsoOrange } from "@/components/izpages/sso/SsoOrange";
import type { Metadata } from "next";

/* ============================================================
   Single Sign-On — orange `.iz` (Balanced) rebuild, pilot page
   for the v3→Balanced migration. The original blue v3 page is
   preserved, unlisted, at /v2/zero-trust-features/single-sign-on.
   Metadata below is unchanged from the previous version — SEO-locked.
   ============================================================ */

export const metadata: Metadata = {
  title: "Single Sign-On (SSO) — InstaSafe ZTNA",
  description:
    "One login, every app, zero password fatigue. SAML 2.0, OAuth and OpenID SSO with desktop SSO, directory sync and device authentication.",
  alternates: { canonical: "/zero-trust-features/single-sign-on" },
};

export default function SsoPage() {
  return (
    <div className={izFontVars}>
      <SsoOrange />
    </div>
  );
}
