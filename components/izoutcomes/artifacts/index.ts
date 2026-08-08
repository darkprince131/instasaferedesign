import type { ComponentType } from "react";
import type { ArtifactProps } from "./types";
import { LedgerPlate } from "./LedgerPlate";
import { ConcentricRings } from "./ConcentricRings";
import { BoundaryPlate } from "./BoundaryPlate";
import { StampRecord } from "./StampRecord";
import { ZtnaArchitecture } from "./ZtnaArchitecture";
import { ZtaaIdentity } from "./ZtaaIdentity";
import { IamDirectory } from "./IamDirectory";
import { SsoLogin } from "./SsoLogin";
import { MfaEngine } from "./MfaEngine";
import { DevicePosture } from "./DevicePosture";
import { EndpointControls } from "./EndpointControls";

/* The artifact registry.

   Twelve types exist in docs/three-outcomes-rule.md; four are built.
   Add the rest as their pages come up — and check the rule before
   picking one. The two constraints that matter:

     · the artifact depicts the NOUN the three outcomes share
     · never repeat a type within a cluster

   Seven of the twelve carry no connecting lines. Favour those: lines
   are what make every section read as the same flowchart. */
export const ARTIFACTS = {
  "ledger-plate": LedgerPlate, // T1 · removal, revocation
  "concentric-rings": ConcentricRings, // T2 · many inputs → one decision
  "boundary-plate": BoundaryPlate, // T4 · containment, blast radius
  "stamp-record": StampRecord, // T9 · proof, attribution, audit
  "ztna-architecture": ZtnaArchitecture, // per-page · the fork: granted vs unreachable
  "ztaa-identity": ZtaaIdentity, // per-page · one record feeding every session
  "iam-directory": IamDirectory, // per-page · sources converge, estate follows
  "sso-login": SsoLogin, // per-page · sprawl → one credential → every session
  "mfa-engine": MfaEngine, // per-page · every entry point, friction sized to risk
  "device-posture": DevicePosture, // per-page · signals in, three answers out
  "endpoint-controls": EndpointControls, // per-page · refused inside the session
} satisfies Record<string, ComponentType<ArtifactProps>>;

export type ArtifactSlug = keyof typeof ARTIFACTS;
export type { ArtifactProps };
