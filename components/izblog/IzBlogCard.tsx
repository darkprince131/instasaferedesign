import { ArrowUpRight } from "@phosphor-icons/react";
import type { BlogCard } from "@/lib/ghost";

/* ============================================================
   IzBlogCard — one post on /blog.

   The card is a link OFF this site: posts still live on Ghost at
   instasafe.com/blog/<slug>/ and this phase does not rebuild them. That
   is why the affordance is an outbound arrow and the whole card is one
   anchor rather than a title link with a separate CTA — there is only
   ever one destination.

   `feature_image` is used exactly as Ghost returns it — a plain <img>,
   no next/image, no proxy, no size rewriting. Ghost serves these from
   its own /content/images/size/wNNNN/ paths and this phase does not
   take ownership of that pipeline.
   ============================================================ */

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : DATE_FMT.format(d);
}

export function IzBlogCard({ post }: { post: BlogCard }) {
  const date = formatDate(post.publishedAt);
  const topic = post.tags[0];

  return (
    <li className="izbl-card">
      <a className="izbl-card-a" href={post.url}>
        {post.image && (
          <span className="izbl-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.imageAlt ?? ""}
              loading="lazy"
              decoding="async"
            />
          </span>
        )}

        <span className="izbl-meta">
          <span className="izbl-date">{date}</span>
          {topic && <span className="izbl-topic">{topic.name}</span>}
        </span>

        <h3 className="izbl-title">{post.title}</h3>
        {post.excerpt && <p className="izbl-excerpt">{post.excerpt}</p>}

        <span className="izbl-go">
          Read on the blog
          <ArrowUpRight weight="bold" aria-hidden="true" />
        </span>
      </a>
    </li>
  );
}
