import { Logo } from "@/components/brand/Logo";
import { ConsentTrigger } from "@/components/consent/ConsentTrigger";
import { FOOTER_COLUMNS } from "./iz-footer-data";

/* ============================================================
   IzFooter — extracted from Home2.tsx (static, no state) so
   every migrated `.iz` page gets the real footer for free.

   It used to hold its own hand-written four-link columns, a
   shortened echo of the homepage footer. That was survivable while
   the mega-menu carried four panes; with the nav cut back to
   Platform alone it was not, because this footer is on every page
   that is not the homepage and it was the only navigation there.
   Both footers now render the same iz-footer-data columns.
   ============================================================ */

export function IzFooter() {
  return (
    <footer role="contentinfo" className="iz-foot">
      <div className="iz-wrap">
        <div className="iz-foot-grid" style={{ ["--izf-cols" as string]: FOOTER_COLUMNS.length }}>
          <div>
            <a href="/" className="iz-mark">
              <Logo height={24} />
              <span className="iz-tag">ZTNA</span>
            </a>
            <p className="iz-dim" style={{ fontSize: 14, marginTop: 14, maxWidth: "30ch" }}>
              Unified Zero Trust access for the modern enterprise.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.head}>
              <h4>{col.head}</h4>
              {col.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="iz-foot-badges">
          <span>Gartner</span>
          <span>Deloitte Fast 50</span>
          <span>DSCI</span>
          <span>G2 High Performer</span>
          <span>NIST 800-207</span>
        </div>
        <div className="iz-foot-copy">
          © 2026 InstaSafe Technologies Pvt. Ltd. · Bengaluru · USA · Germany
          <span aria-hidden="true"> · </span>
          <ConsentTrigger />
        </div>
      </div>
    </footer>
  );
}
