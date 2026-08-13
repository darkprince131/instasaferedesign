import { Briefcase, Handshake, Robot, MagnifyingGlass } from "@phosphor-icons/react";

import type { IzUseCase } from "@/components/home2/IzUseCaseSwitch";

/* ============================================================
   ztaa-people.ts — the four people behind "Same portal. Very
   different people."

   IzUseCaseSwitch ships four generic cases (unmanaged devices, VPN
   replacement, third-party access, impossible travel). Those are
   use-case CATEGORIES, and this section's heading promises people —
   so it listed one thing and said another. These four are people, and
   each panel answers the one question the heading raises: what is
   actually in this person's portal, and what is not.

   The rows are deliberately the SAME FOUR FIELDS in every case —
   what they see, what they may do, how long it lasts, what the
   network looks like to them. Varying the fields per person would let
   each case pick its own flattering ones; holding them fixed is what
   makes the four comparable, which is the entire point of a switcher.

   `tone: "allow"` is used only where the value is the security
   outcome, not merely a fact. "None" against standing access is an
   outcome. "Two systems" is a fact.
   ============================================================ */

export const ZTAA_PEOPLE: IzUseCase[] = [
  {
    id: "employee",
    title: "Employee",
    desc: "The whole toolkit behind one login — every application their role lists, on a managed laptop, with no VPN client and no network to land on.",
    Icon: Briefcase,
    art: "laptop",
    headline: { label: "Portal", value: "alen.joseph@veno.co.in" },
    score: { label: "Apps listed", value: "14" },
    rows: [
      { label: "Sees", value: "Every app their role lists" },
      { label: "May do", value: "Full use, clipboard both ways" },
      { label: "Lasts", value: "Working hours, re-checked per session" },
      { label: "Network", value: "Never reachable", tone: "allow" },
    ],
  },
  {
    id: "contractor",
    title: "Contractor",
    desc: "Two systems, recorded, until the contract ends. Their own unmanaged laptop is fine, because the session controls do the work the device cannot be trusted to do.",
    Icon: Handshake,
    art: "browser",
    headline: { label: "Portal", value: "contractor.42 · external" },
    score: { label: "Apps listed", value: "2" },
    rows: [
      { label: "Sees", value: "Two systems. Nothing else exists" },
      { label: "May do", value: "Read and edit, no download", tone: "accent" },
      { label: "Lasts", value: "Until the contract end date", tone: "allow" },
      { label: "Network", value: "Never reachable", tone: "allow" },
    ],
  },
  {
    id: "service",
    title: "Service account",
    desc: "A build runner with a certificate and no human behind it. Scoped to the one endpoint it automates, with no interactive session to hijack.",
    Icon: Robot,
    art: "server",
    headline: { label: "Identity", value: "svc-runner · certificate" },
    score: { label: "Apps listed", value: "1" },
    rows: [
      { label: "Sees", value: "One endpoint, one scope" },
      { label: "May do", value: "repos:read" },
      { label: "Lasts", value: "Token lifetime, rotated" },
      { label: "Network", value: "Never reachable", tone: "allow" },
    ],
  },
  {
    id: "auditor",
    title: "Auditor",
    desc: "Read-only for the length of the review, with every action already recorded — so the evidence they came for is the evidence of their own visit too.",
    Icon: MagnifyingGlass,
    art: "phone",
    headline: { label: "Grant", value: "review_q3 · time-boxed" },
    score: { label: "Expires in", value: "42m" },
    rows: [
      { label: "Sees", value: "The records in scope" },
      { label: "May do", value: "Read only", tone: "accent" },
      { label: "Lasts", value: "42 minutes, then nothing", tone: "allow" },
      { label: "Network", value: "Never reachable", tone: "allow" },
    ],
  },
];
