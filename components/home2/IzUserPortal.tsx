"use client";

import { useState } from "react";
import { Laptop, ArrowRight, Clock, SquaresFour, DownloadSimple, House, type Icon } from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import { IZ_USERS, IzAvatar, type IzUser } from "./izUsers";

/* ============================================================
   IzUserPortal — the OTHER console. Everything else on this site
   shows the admin's view; this is what the person actually signing
   in sees, which is the whole point of ZTAA: they get a page of
   applications, not a network.

   Same window chrome and the same token vocabulary as IzAppWindow
   (00k) so the two read as one product seen from two seats, but a
   deliberately different shape — apps first and large, everything
   else demoted to a strip. An end user does not open this to read
   a device inventory.

   The user switcher is the argument, not decoration: the three
   people carry different entitlements, so changing the person
   changes the applications, the network resources, the device and
   the history together. Nothing here is a static screenshot.
   ============================================================ */

type NavItem = { id: string; label: string; icon: Icon };
const NAV: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: House },
  { id: "applications", label: "Applications", icon: SquaresFour },
  { id: "downloads", label: "Downloads", icon: DownloadSimple },
];

function AppTile({ logo, name, kind }: { logo: string; name: string; kind: string }) {
  return (
    <a className="iup-app" href="#" onClick={(e) => e.preventDefault()}>
      <span className="iup-app-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/logos/integrations/${logo}.svg`} alt="" loading="lazy" decoding="async" />
      </span>
      <span className="iup-app-text">
        <span className="iup-app-name">{name}</span>
        <span className="iup-app-kind">{kind}</span>
      </span>
      <span className="iup-app-go" aria-hidden="true">
        <ArrowRight weight="bold" />
      </span>
    </a>
  );
}

export function IzUserPortal() {
  const [userId, setUserId] = useState(IZ_USERS[0].id);
  const user = (IZ_USERS.find((u) => u.id === userId) ?? IZ_USERS[0]) as IzUser;

  return (
    <div className="iup">
      {/* window chrome — same family as the admin console */}
      <div className="iup-titlebar">
        <span className="iup-dots">
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
        </span>
        <span className="iup-win-title">
          {/* the product's own window chrome carries the mark, not a
              stand-in shield */}
          <LogoMark size={15} />
          InstaSafe Access Portal
        </span>
        <span className="iup-session">
          <Clock weight="fill" />
          02:58:57
        </span>
      </div>

      <div className="iup-body">
        <nav className="iup-sidebar" aria-label="Portal navigation">
          <span className="iup-tenant">Veno</span>
          <ul>
            {NAV.map(({ id, label, icon: I }, i) => (
              <li key={id}>
                <span className={i === 0 ? "iup-nav on" : "iup-nav"}>
                  <I weight={i === 0 ? "fill" : "regular"} />
                  {/* The label needs its own element: below 620px the
                      sidebar collapses to a 52px icon rail and the CSS
                      hides `.iup-nav span`. As a bare text node it stayed
                      visible and spilled straight out of the rail. */}
                  <span>{label}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="iup-me">
            <IzAvatar user={user} size={26} />
            <span className="iup-me-text">
              <span className="iup-me-name">{user.name}</span>
              <span className="iup-me-role">{user.group}</span>
            </span>
          </div>
        </nav>

        <div className="iup-content">
          {/* who am I — the switcher */}
          <div className="iup-switch" role="tablist" aria-label="Signed in as">
            <span className="iup-switch-lbl">signed in as</span>
            {IZ_USERS.map((u) => (
              <button
                key={u.id}
                role="tab"
                aria-selected={u.id === userId}
                className={u.id === userId ? "iup-who on" : "iup-who"}
                onClick={() => setUserId(u.id)}
              >
                <IzAvatar user={u} size={22} />
                <span>{u.name}</span>
              </button>
            ))}
          </div>

          {/* applications — the reason the page exists, so it gets the room */}
          <div className="iup-sec">
            <div className="iup-sec-h">
              <span className="iup-sec-t">Your applications</span>
              <span className="iup-count">{user.webApps.length}</span>
              <span className="iup-sec-note">granted by group · {user.group}</span>
            </div>
            <div className="iup-app-grid">
              {user.webApps.map((a) => (
                <AppTile key={a.name} {...a} />
              ))}
            </div>
          </div>

          {/* network resources — same grant model, no browser involved */}
          <div className="iup-sec">
            <div className="iup-sec-h">
              <span className="iup-sec-t">Network resources</span>
              <span className="iup-count">{user.netApps.length}</span>
            </div>
            <div className="iup-net">
              {user.netApps.map((n) => (
                <span className="iup-net-row" key={n.name}>
                  <span className="iup-net-name">{n.name}</span>
                  <span className="iup-net-kind">{n.kind}</span>
                  <span className="iup-net-state">tunnel on demand</span>
                </span>
              ))}
            </div>
          </div>

          <div className="iup-strip">
            <div className="iup-device">
              <span className="iup-strip-lbl">
                <Laptop weight="regular" /> This device
              </span>
              <span className="iup-dev-host">{user.device.host}</span>
              <span className="iup-dev-meta">
                {user.device.make} {user.device.model} · {user.device.os}
              </span>
              <span className="iup-pill ok">enrolled · posture pass</span>
            </div>
            <div className="iup-recent">
              <span className="iup-strip-lbl">Recently opened</span>
              {user.recent.map((r) => (
                <span className="iup-rec-row" key={r.app + r.at}>
                  <span className="iup-rec-app">{r.app}</span>
                  <span className="iup-rec-at">{r.at}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
