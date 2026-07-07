// Sanitized sample data for marketing dashboard graphics.
// No real IPs, emails, domains or customer device names.

export const KPIS = {
  onlineGateways: { current: 4, total: 4 },
  onlineUsers: { current: 1247, total: 1423 },
  subscription: { current: 1423, total: 2000 },
  renewal: "30 Sep 2026",
};

// 24h access activity (allowed vs denied) — values for an animated area chart.
export const ACCESS_ACTIVITY = [
  18, 24, 16, 12, 9, 14, 28, 46, 72, 88, 96, 82, 90, 104, 98, 86, 94, 110, 120, 102, 78, 54, 40, 30,
];

export const BLOCKED_SERVICES = [
  { name: "Unmanaged RDP", count: 142 },
  { name: "Legacy SMB", count: 98 },
  { name: "Public DNS", count: 73 },
  { name: "Tor exit", count: 41 },
  { name: "Outdated TLS", count: 27 },
];

export const MANUFACTURERS = [
  { name: "Dell", count: 219, color: "#3B82F6" },
  { name: "HP", count: 143, color: "#8B5CF6" },
  { name: "Apple", count: 134, color: "#14B8A6" },
  { name: "Lenovo", count: 56, color: "#F59E0B" },
  { name: "ASUSTeK", count: 50, color: "#EF4444" },
  { name: "realme", count: 33, color: "#22C55E" },
  { name: "vivo", count: 33, color: "#EC4899" },
  { name: "Others", count: 107, color: "#64748B" },
];

export const OS_BREAKDOWN = [
  { name: "Windows", count: 412, color: "#3B82F6" },
  { name: "macOS", count: 168, color: "#14B8A6" },
  { name: "Android", count: 121, color: "#22C55E" },
  { name: "iOS", count: 58, color: "#8B5CF6" },
  { name: "Linux", count: 16, color: "#F59E0B" },
];

export const DEVICE_STATUS = [
  { name: "Enabled", count: 691, color: "#22C55E" },
  { name: "Pending", count: 62, color: "#F59E0B" },
  { name: "Suspended", count: 22, color: "#EF4444" },
];

export type OsIcon = "windows" | "apple" | "android" | "linux";
export type DeviceStatus = "Enabled" | "Pending-Approval" | "Suspended";

export const DEVICES: {
  name: string;
  os: string;
  osIcon: OsIcon;
  mac: string;
  status: DeviceStatus;
  registered: string;
}[] = [
  { name: "mac-workstation-01", os: "macOS 26.4", osIcon: "apple", mac: "cc:08:fa:••:••:d9", status: "Enabled", registered: "2026-05-12" },
  { name: "win-laptop-44", os: "Windows 11 Pro", osIcon: "windows", mac: "74:78:27:••:••:1a", status: "Pending-Approval", registered: "2026-04-22" },
  { name: "ios-device-11", os: "iOS 26.2", osIcon: "apple", mac: "—", status: "Enabled", registered: "2026-01-20" },
  { name: "android-field-08", os: "Android 14", osIcon: "android", mac: "02:00:••:••:••:00", status: "Suspended", registered: "2026-02-18" },
  { name: "win-kiosk-12", os: "Windows 10 Pro", osIcon: "windows", mac: "9c:b6:d0:••:••:7e", status: "Enabled", registered: "2026-03-09" },
  { name: "linux-build-03", os: "Ubuntu 24.04", osIcon: "linux", mac: "00:1b:44:••:••:c2", status: "Enabled", registered: "2026-05-30" },
];

export const DEVICE_CHECKS = [
  { name: "AntiVirus active", status: "pass" },
  { name: "Firewall enabled", status: "pass" },
  { name: "BitLocker encryption", status: "pass" },
  { name: "OS version ≥ Win 11", status: "pass" },
  { name: "Domain joined", status: "pass" },
  { name: "MDM enrolled (Intune)", status: "pass" },
  { name: "Screen lock policy", status: "pass" },
  { name: "No risky processes", status: "pass" },
];

export const GEOFENCES = [
  { name: "Bengaluru HQ", lat: 12.97, lng: 77.63, radius: 3000 },
  { name: "Bhubaneswar Office", lat: 20.29, lng: 85.82, radius: 100 },
  { name: "PGCIL Site", lat: 28.47, lng: 77.07, radius: 10000 },
];

export const ACCESS_LOG = [
  { user: "user.01", app: "Database", status: "allowed", time: "now" },
  { user: "user.02", app: "SSH · server-a", status: "allowed", time: "2m" },
  { user: "unknown-device", app: "RDP · host-b", status: "denied", time: "3m" },
  { user: "user.03", app: "Web app", status: "allowed", time: "5m" },
  { user: "external-ip", app: "File share", status: "denied", time: "6m" },
];
