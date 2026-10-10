import Link from "next/link";
import type { Review } from "@/types";
import { getProject } from "@/data/projects";
import { formatDate } from "@/lib/utils";
import { StarRating } from "@/components/ui/star-rating";

export function ReviewCard({ review }: { review: Review }) {
  const project = review.projectSlug ? getProject(review.projectSlug) : undefined;
  const byline = [review.role, review.organization].filter(Boolean).join(", ");
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
      <StarRating rating={review.rating} />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-7">{review.message}</blockquote>
      <footer className="mt-5 border-t border-border pt-4 text-sm">
        <p className="font-medium">{review.name}</p>
        {byline && <p className="text-muted-foreground">{byline}</p>}
        <p className="mt-1 text-muted-foreground">
          <time dateTime={review.date}>{formatDate(review.date)}</time>
          {project && (
            <>
              {" "}
              on{" "}
              <Link href={`/projects/${project.slug}`} className="text-link hover:underline">
                {project.name}
              </Link>
            </>
          )}
        </p>
      </footer>
    </article>
  );
}
