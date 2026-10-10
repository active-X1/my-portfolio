"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "@/components/ui/star-rating";

/** Accessible 1-5 selector built on native radio inputs. Only integers 1 to 5 can be chosen. */
export function StarRatingInput({
  value,
  onChange,
  error,
}: {
  value: number;
  onChange: (n: number) => void;
  error?: string;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium">Rating</legend>
      <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="relative">
            <input
              type="radio"
              id={`rating-${n}`}
              name="rating"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="peer sr-only"
              aria-describedby={error ? "rating-error" : undefined}
            />
            <label
              htmlFor={`rating-${n}`}
              onMouseEnter={() => setHover(n)}
              className={cn(
                "block cursor-pointer rounded-md p-1 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[hsl(var(--link))]",
              )}
            >
              <StarIcon filled={n <= shown} className="h-8 w-8" />
              <span className="sr-only">
                {n} {n === 1 ? "star" : "stars"}
              </span>
            </label>
          </span>
        ))}
        <span className="ml-3 text-sm tabular-nums text-muted-foreground" aria-live="polite">
          {value > 0 ? `${value}/5` : "Not rated"}
        </span>
      </div>
      {error && (
        <p id="rating-error" className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
