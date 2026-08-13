import { izFontVars } from "@/lib/iz-fonts";
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
import "@/components/iz-fx/fx.css";
import "@/components/izpages/sso/sso.css";
import "@/components/izpages/sso/oneloginrace.css";
import "@/components/izpages/sso/ssorace.css";
import { SsoRacePage } from "@/components/izpages/sso/SsoRacePage";
import type { Metadata } from "next";

/* ============================================================
   /zero-trust-features/single-sign-on/login-race

   A NEW url, nested under the SSO page it belongs to. Nothing in the
   live sitemap is touched or reused — the SEO-locked paths listed in
   lib/site.ts keep their exact shapes, and this sits below one of
   them rather than beside it, so the parentage is legible to both a
   crawler and a person reading the address bar.

   Canonical points at itself. The race is genuinely its own content
   (a demo plus the method behind its two numbers), not a duplicate
   fragment of the SSO page, so conceding canonical to the parent
   would be telling Google to drop the only page this asset lives on.
   ============================================================ */

export const metadata: Metadata = {
  title: "One login beats six — the SSO login race | InstaSafe",
  description:
    "Six application logins timed side by side against one, password-reset detour included. Watch the race and read exactly how the two numbers were arrived at.",
  alternates: { canonical: "/zero-trust-features/single-sign-on/login-race" },
};

export default function LoginRacePage() {
  return (
    <div className={izFontVars}>
      <SsoRacePage />
    </div>
  );
}
