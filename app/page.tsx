import { Home2 } from "@/components/home2/Home2";
import "@/components/home2/home2.css";
import "@/components/home2/capabilities.css";
import "@/components/home2/withwithout.css";
import { izFontVars } from "@/lib/iz-fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InstaSafe ZTNA — Stop Juggling Security Tools. Start Controlling Access.",
  description:
    "InstaSafe ZTNA replaces your VPN, unifies identity and MFA, secures databases and servers, records privileged sessions and protects every endpoint — from one console. From $2/user/month.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className={izFontVars}>
      <Home2 />
    </div>
  );
}
