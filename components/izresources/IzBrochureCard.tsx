import { DownloadSimple, FilePdf } from "@phosphor-icons/react";
import { brochureHref, type Brochure } from "@/lib/resource-center";

/* ============================================================
   IzBrochureCard — one PDF on /resource-center.

   The whole card is a single anchor, same as IzBlogCard: there is one
   destination and adding a separate "download" button inside a
   clickable card only creates a nested-interactive trap.

   `download` is set deliberately. While SELF_HOSTED is false these
   files are cross-origin, so the attribute is advisory and the browser
   will navigate instead — which is fine, the PDF still opens. Once the
   assets are same-origin it starts behaving as a real save.
   ============================================================ */

export function IzBrochureCard({ item }: { item: Brochure }) {
  return (
    <li className="izrc-card izrc-card--doc">
      <a
        className="izrc-card-a"
        href={brochureHref(item)}
        download
        target="_blank"
        rel="noopener"
      >
        <span className="izrc-doc-ico" aria-hidden="true">
          <FilePdf weight="regular" />
        </span>

        <span className="izrc-meta">
          <span className="izrc-topic">{item.topic}</span>
          <span className="izrc-dim">
            PDF{item.pages ? ` · ~${item.pages} pp` : ""}
          </span>
        </span>

        <h3 className="izrc-title">{item.title}</h3>
        <p className="izrc-blurb">{item.blurb}</p>

        <span className="izrc-go">
          Download
          <DownloadSimple weight="bold" aria-hidden="true" />
        </span>
      </a>
    </li>
  );
}
