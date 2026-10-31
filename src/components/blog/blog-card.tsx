import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post, layout = "standard" }: { post: BlogPost; layout?: "standard" | "featured" }) {
  const featured = layout === "featured";
  const href = `/blog/${post.slug}`;
  return (
    <article className={cn("flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card", featured && "md:flex-row")}>
      {post.cover && (
        <Link href={href} tabIndex={-1} aria-hidden="true" className={cn("block shrink-0", featured && "md:w-[48%]")}>
          <div className={cn("relative aspect-video bg-muted", featured && "md:aspect-auto md:h-full md:min-h-[14rem]")}>
            <Image
              src={post.cover}
              alt=""
              fill
              sizes={featured ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
        </Link>
      )}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <Badge tone="outline" className="self-start">
          {post.category}
        </Badge>
        <h2 className={cn("mt-3 font-display font-semibold leading-snug", featured ? "text-fluid-h2" : "text-lg")}>
          <Link href={href} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <p className="text-xs text-muted-foreground sm:text-sm">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true"> &middot; </span>
            {post.readingMinutes} min read
          </p>
          <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-link hover:underline">
            Read more<span className="sr-only">: {post.title}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
