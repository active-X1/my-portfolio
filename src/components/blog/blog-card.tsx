import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {post.cover && (
        <div className="relative aspect-[16/9] bg-muted">
          <Image src={post.cover} alt="" fill sizes="(min-width: 1024px) 360px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <Badge tone="outline" className="self-start">
          {post.category}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
