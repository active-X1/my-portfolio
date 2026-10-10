"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryCategory, GalleryEntry } from "@/types";
import { cn, formatDate } from "@/lib/utils";

export function GalleryGrid({
  entries,
  categories,
}: {
  entries: GalleryEntry[];
  categories: Record<GalleryCategory, string>;
}) {
  const used = (Object.keys(categories) as GalleryCategory[]).filter((c) => entries.some((e) => e.category === c));
  const [active, setActive] = useState<GalleryCategory | "all">("all");
  const visible = active === "all" ? entries : entries.filter((e) => e.category === active);

  return (
    <div>
      {used.length > 1 && (
        <div role="group" aria-label="Gallery category" className="mb-8 flex flex-wrap gap-2">
          {(["all", ...used] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={active === c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                active === c ? "border-accent bg-accent text-accent-foreground" : "border-border hover:bg-muted",
              )}
            >
              {c === "all" ? "All" : categories[c]}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((e) => (
          <li key={e.id}>
            <figure className="h-full overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-[4/3] bg-muted">
                <Image
                  src={e.image.src}
                  alt={e.image.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-3"
                />
              </div>
              <figcaption className="p-5">
                <p className="font-display font-semibold">{e.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{e.description}</p>
                <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{categories[e.category]}</span>
                  {e.date && <time dateTime={e.date}>{formatDate(e.date)}</time>}
                  {e.projectSlug && (
                    <Link href={`/projects/${e.projectSlug}`} className="text-link hover:underline">
                      View project
                    </Link>
                  )}
                  {e.href && (
                    <a href={e.href} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
                      External link<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
