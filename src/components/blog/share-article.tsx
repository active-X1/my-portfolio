import { siteConfig } from "@/data/site";
import { SocialIcon } from "@/components/ui/social-icons";
import type { SocialId } from "@/types";
import { ShareButtons } from "./share-buttons";

/** Full share block shown at the end of an article. */
export function ShareArticle({ slug, title }: { slug: string; title: string }) {
  const path = `/blog/${slug}`;
  const url = `${siteConfig.url}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const targets: { id: SocialId; label: string; href: string }[] = [
    { id: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { id: "x", label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { id: "linkedin", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  return (
    <section aria-labelledby="share-heading" className="mt-12 rounded-xl border border-border bg-card p-4 sm:p-5">
      <h2 id="share-heading" className="font-display text-lg font-semibold">
        Share this article
      </h2>
      <p className="mt-1 break-all text-sm text-muted-foreground">{url}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        <ShareButtons path={path} title={title} />
        <ul className="flex items-center gap-2" aria-label="Share on">
          {targets.map((t) => (
            <li key={t.id}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <SocialIcon id={t.id} />
                <span className="sr-only">Share on {t.label} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
