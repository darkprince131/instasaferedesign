import type { Spec } from "./IzQuickScan";

/* ============================================================
   quickscan.data.ts — one sheet per feature page.

   IzQuickScan is a working checklist: an evaluator ticks the rows
   their requirements list actually needs and pastes the selection
   into a ticket. That only works if the rows are about the page they
   are on. Shipping the platform-wide sheet on all four would mean
   somebody ticking database drivers on a page about fingerprints.

   ▸ EVERY VALUE HERE IS A CAPABILITY FACT ▸
   Counts of what the product does — methods, check types, protocols,
   identifiers. No customer counts, no device counts, no seat pricing.
   A spec sheet is exactly where a vanity number would look most at
   home and be least defensible.

   Numbers are carried from the pages themselves, so they stay
   consistent with what the copy above them already claims.
   ============================================================ */

export const MFA_SPECS: Spec[] = [
  { group: "Methods", label: "Factors", value: "6 — SMS OTP, Email OTP, TOTP, push, biometric, FIDO hardware key" },
  { group: "Methods", label: "Offline capable", value: "TOTP — a fresh code every 30s with no SMS, data or Wi-Fi" },
  { group: "Methods", label: "Push platforms", value: "Windows, Android, iOS; macOS and Linux get the OTP field directly" },
  { group: "Methods", label: "Biometric enrolment", value: "All ten fingers; face where the device supports it" },
  { group: "Coverage", label: "Web and SaaS", value: "SAML 2.0, OAuth 2.0, OpenID Connect — 800+ business applications" },
  { group: "Coverage", label: "Desktop login", value: "Windows domain and local logon, before sign-in rather than after" },
  { group: "Coverage", label: "Network equipment", value: "RADIUS and TACACS+ — router, switch, firewall, VPN concentrator" },
  { group: "Coverage", label: "Directory apps", value: "ADFS, LDAP and Kerberos, without modifying the application" },
  { group: "Policy", label: "Auth profiles", value: "8 — set globally, overridden per user or per group" },
  { group: "Policy", label: "Device binding", value: "Optional per profile: an approved device even with valid credentials" },
  { group: "Audit", label: "Record", value: "One login event per attempt — time, result, method, device, location" },
  { group: "Audit", label: "Frameworks", value: "GDPR, ISO 27001, SOC 2" },
];

export const POSTURE_SPECS: Spec[] = [
  { group: "Checks", label: "Check types", value: "25" },
  { group: "Checks", label: "Named rules", value: "144" },
  {
    group: "Checks",
    label: "Examples",
    value: "Disk encryption, antivirus, OS patch level, screen lock, secure boot, TPM, developer tools",
  },
  { group: "Checks", label: "Agentless signals", value: "4 from the browser — version, certificate, geo, network" },
  { group: "Platforms", label: "OS combinations", value: "1,500+ OS and device combinations" },
  { group: "Platforms", label: "Clients", value: "Windows, macOS, Linux; mobile apps; clientless browser mode" },
  { group: "Policy", label: "Profiles", value: "Per user group, with waivers named rather than silently skipped" },
  { group: "Policy", label: "Verdicts", value: "Allow, allow scoped, deny — with the rule that failed named" },
  { group: "Behaviour", label: "When it runs", value: "Before the connection, then continuously while the session is open" },
  { group: "Behaviour", label: "On failure", value: "Held until the device passes; the remediation is stated to the user" },
  { group: "Audit", label: "Record", value: "Posture result stored per connection and reportable per device" },
];

export const BINDING_SPECS: Spec[] = [
  { group: "Binding", label: "Bound to", value: "3 hardware identifiers — MAC address, serial number, hardware UUID" },
  { group: "Binding", label: "Proof", value: "A certificate issued against those identifiers, not a cookie or session token" },
  { group: "Binding", label: "Self-enrolment", value: "None. An administrator names the machine before a certificate is issued" },
  { group: "Binding", label: "Devices per user", value: "Set per user; a second machine is an approval, not a workaround" },
  { group: "Policy", label: "Enforcement", value: "Valid credentials on an unbound device are refused" },
  { group: "Policy", label: "Applies to", value: "Portal login, published applications and the network path beneath them" },
  { group: "Policy", label: "Combines with", value: "MFA and device posture on the same request" },
  { group: "Lifecycle", label: "Revocation", value: "One action ends the binding; the certificate stops answering immediately" },
  { group: "Lifecycle", label: "Lost or replaced", value: "Re-approve on the new machine; the old certificate is revoked, not reused" },
  { group: "Audit", label: "Record", value: "Which device, which certificate, which decision — per connection" },
  { group: "Audit", label: "Frameworks", value: "GDPR, ISO 27001, SOC 2" },
];
