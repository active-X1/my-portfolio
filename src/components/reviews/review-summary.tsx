import type { RatingSummary } from "@/lib/reviews";
import { StarRating } from "@/components/ui/star-rating";

export function ReviewSummary({ summary }: { summary: RatingSummary }) {
  const rounded = Math.round(summary.average * 10) / 10;
  return (
    <section aria-label="Rating summary" className="grid gap-8 rounded-xl border border-border bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center">
      <div>
        <p className="font-display text-5xl font-semibold tabular-nums">{rounded.toFixed(1)}</p>
        <StarRating rating={rounded} className="mt-2" />
        <p className="mt-1 text-sm text-muted-foreground">
          {summary.count} {summary.count === 1 ? "review" : "reviews"}
        </p>
      </div>
      <ul className="space-y-2">
        {([5, 4, 3, 2, 1] as const).map((n) => {
          const count = summary.distribution[n];
          const pct = (count / summary.count) * 100;
          return (
            <li key={n} className="grid grid-cols-[2.5rem_1fr_2rem] items-center gap-3 text-sm">
              <span className="tabular-nums">{n} star</span>
              <div className="h-2 overflow-hidden rounded-full bg-muted" role="meter" aria-label={`${n}-star reviews: ${count}`} aria-valuemin={0} aria-valuemax={summary.count} aria-valuenow={count}>
                <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-right tabular-nums text-muted-foreground">{count}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
