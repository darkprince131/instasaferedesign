import { Logo } from "@/components/brand/Logo";
import { ConsentTrigger } from "@/components/consent/ConsentTrigger";

/* ============================================================
   IzFooter — extracted from Home2.tsx (static, no state) so
   every migrated `.iz` page gets the real footer for free.
   No visual change versus the inline version in Home2.
   ============================================================ */

export function IzFooter() {
  return (
    <footer role="contentinfo" className="iz-foot">
      <div className="iz-wrap">
        <div className="iz-foot-grid">
          <div>
            <a href="/" className="iz-mark">
              <Logo height={24} />
              <span className="iz-tag">ZTNA</span>
            </a>
            <p className="iz-dim" style={{ fontSize: 14, marginTop: 14, maxWidth: "30ch" }}>
              Unified Zero Trust access for the modern enterprise.
            </p>
          </div>
          <div>
            <h4>Platform</h4>
            <a href="/zero-trust-network-access">ZTNA</a>
            <a href="/zero-trust-application-access">ZTAA</a>
            <a href="/platform/iam">Identity</a>
            <a href="/multifactor-authentication">MFA</a>
          </div>
          <div>
            <h4>Solutions</h4>
            <a href="/vpn-alternative">VPN Alternative</a>
            <a href="/secure-remote-access">Remote Access</a>
            <a href="/secure-devops-access">DevOps</a>
            <a href="/secure-cloud-applications">Cloud Apps</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/about-us">About</a>
            <a href="/careers">Careers</a>
            <a href="/partners">Partners</a>
            <a href="/contact-us">Contact</a>
          </div>
          <div>
            <h4>Resources</h4>
            <a href="/what-is-zero-trust">What is Zero Trust</a>
            <a href="/blog">Blog</a>
            <a href="/resource-center">Resource Center</a>
            <a href="/awards">Awards</a>
          </div>
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
