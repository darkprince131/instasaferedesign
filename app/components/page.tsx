import { ComponentsLab } from "@/components/components-lab/ComponentsLab";
import "@/components/home2/home2.css";
import "@/components/home2/capabilities.css";
import "@/components/home2/withwithout.css";
import "@/components/home2/zerotrustflow.css";
import "@/components/home2/bookcard.css";
import "@/components/home2/consolerow.css";
import "@/components/home2/izconsole.css";
import "@/components/home2/problemsolution.css";
import "@/components/home2/qatriptych.css";
import "@/components/home2/featurehub.css";
import "@/components/home2/walloflove.css";
import "@/components/home2/unification.css";
import "@/components/home2/izappwindow.css";
import "@/components/home2/liveactivity.css";
import "@/components/home2/splitshowcase.css";
import "@/components/home2/chatfaq.css";
import "@/components/home2/scrollsteps.css";
import "@/components/home2/threatradar.css";
import "@/components/home2/filterstream.css";
import "@/components/home2/aggregatestack.css";
import "@/components/home2/userjourney.css";
import "@/components/home2/impactgraph.css";
import "@/components/home2/convergeflow.css";
import "@/components/home2/industrysearch.css";
import "@/components/home2/featuresplit.css";
import "@/components/home2/gridcards.css";
import "@/components/home2/accesspipeline.css";
import "@/components/home2/accordionshowcase.css";
import "@/components/home2/prosestack.css";
import "@/components/home2/ratingbar.css";
import "@/components/components-lab/lab.css";
import { izFontVars } from "@/lib/iz-fonts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Component Lab — InstaSafe ZTNA",
  description: "Gallery of reusable website components in the Balanced design language, in Dark and Paper themes.",
  robots: { index: false, follow: false },
};

export default function ComponentsPage() {
  return (
    <div className={izFontVars}>
      <ComponentsLab />
    </div>
  );
}
