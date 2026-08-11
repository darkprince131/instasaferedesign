"use client";

import { ExplodedLaptop } from "@/components/iz-fx/ExplodedLaptop";

/* ============================================================
   The disassembly — the posture page's centrepiece.

   Head block, then the posture variant of <ExplodedLaptop /> (the
   scroll-scrubbed blueprint: the laptop opens, explodes, and eight
   CHECK FAMILY clusters interrogate its layers), then the policy
   closing block and the stat strip.

   The laptop sits OUTSIDE .iz-wrap on purpose: the 1800-wide sheet
   wants the full column, and the pin needs to own its own scroll
   run. Copy per the section brief; heading echoes the page H1 as
   the anchor of the experience — deliberate, per that brief.
   ============================================================ */

export function PostureDisassembly() {
  return (
    <section className="pos-sec pos-dis" id="disassembly">
      <div className="iz-wrap">
        <div className="pos-head">
          <span className="iz-ey">Device posture check</span>
          <h2>
            The user checked out. <em>Is the laptop lying?</em>
          </h2>
          <p>
            Authentication answers whether the person is who they claim. It says nothing about the machine in their
            hands. A perfectly valid login from a device with disabled antivirus, an unencrypted disk and six months of
            missing patches is a breach that simply hasn&rsquo;t finished happening yet.
          </p>
          <p>
            Before an application becomes reachable, InstaSafe takes the device apart and reads its actual state —
            then does it again, continuously, for as long as the session lasts.
          </p>
          <p className="pos-dis-cue" aria-hidden="true">
            Scroll to disassemble ↓
          </p>
        </div>
      </div>

      <ExplodedLaptop variant="posture" />

      <div className="iz-wrap pos-dis-close">
        <p>
          Every check above is a condition you can write policy against. Combine them into named rules per user group —
          Windows&nbsp;11 with current patches, BitLocker on, and antivirus definitions under seven days old, <em>or no
          connection</em>. Fail mid-session and the response is yours to define: step-up MFA, restricted access, alert,
          or disconnect.
        </p>
        <p>Nothing here is inferred. Each result is recorded as an event and exportable to your SIEM.</p>
        <ul className="pos-dis-stats">
          <li>25+ check types</li>
          <li>144 named rules</li>
          <li>1,500+ OS/device combinations</li>
          <li>Windows · macOS · Linux</li>
        </ul>
      </div>
    </section>
  );
}
