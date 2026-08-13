import { ComponentsLab } from "@/components/components-lab/ComponentsLab";
import "@/components/home2/iz-system.css";
import "@/components/home2/home2.css";
import "@/components/home2/izgrid.css";
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
import "@/components/home2/iz-backdrops.css";
import "@/components/home2/izpanel.css";
import "@/components/home2/izsteprail.css";
import "@/components/home2/izusecase.css";
import "@/components/home2/izagentscene.css";
import "@/components/home2/izdevband.css";
import "@/components/home2/izvpnztna.css";
import "@/components/home2/izscoreprocess.css";
import "@/components/home2/signalgrid.css";
import "@/components/izpages/heroes/heroes.css";
import "@/components/izpages/pro/pro.css";
import "@/components/izpages/pro/sections.css";
import "@/components/izpages/pro/tabswitch.css";
import "@/components/izpages/pro/blocks.css";
import "@/components/izpages/pro/converge.css";
import "@/components/izpages/pro/outcomes.css";
import "@/components/home2/izproofgrid.css";
import "@/components/home2/iznewblocks.css";
import "@/components/home2/izpagekit.css";
import "@/components/home2/iztunnelcards.css";
import "@/components/home2/izfindtheflaw.css";
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
      {/* The two hand-vectorised SVGs (IMG-017 Governed City, IMG-089 ledger)
          were deleted on request — they didn't turn out well. The catalogue
          proper is a later, separate job. Until real assets arrive, the hero
          archetypes borrow an existing raster diagram so their visual slot is
          still demonstrable. Swap these for <Illustration> or <ThemedImage>
          the moment artwork lands in public/illustrations. */}
      <ComponentsLab
        illustrationSample={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/user_device_authentication_d.webp"
            alt="Placeholder diagram: a user device authenticating before access is granted"
            className="izc-illus-sample"
          />
        }
        illustrationCity={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/controller_gateway_communication_d.webp"
            alt="Placeholder diagram: controller and gateway exchanging access decisions"
            className="izc-illus-wide"
          />
        }
      />
    </div>
  );
}
