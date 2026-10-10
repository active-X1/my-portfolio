import { cn } from "@/lib/utils";

export function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2.8l2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.0l-5.56 2.92 1.06-6.2L3 9.33l6.22-.9L12 2.8z"
        fill={filled ? "hsl(var(--accent))" : "none"}
        stroke={filled ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Read-only rating: SVG stars plus the numeric value, e.g. "4/5". */
export function StarRating({ rating, className }: { rating: number; className?: string }) {
  const whole = Math.round(rating);
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon key={i} filled={i <= whole} className="h-4 w-4" />
        ))}
      </span>
      <span className="text-sm font-medium tabular-nums">{rating}/5</span>
    </div>
  );
}
