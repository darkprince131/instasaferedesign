import { izFontVars } from "@/lib/iz-fonts";
import type { Metadata } from "next";
import { FlowPreview } from "./FlowPreview";
import "@/components/home2/home2.css";
import "@/components/home2/zerotrustflow.css";

export const metadata: Metadata = {
  title: "Zero Trust Flow — preview",
  robots: { index: false, follow: false },
};

export default function FlowPreviewPage() {
  return (
    <div className={izFontVars}>
      <FlowPreview />
    </div>
  );
}
