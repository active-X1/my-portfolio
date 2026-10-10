import type { TechShare } from "@/types";
import { cn } from "@/lib/utils";

const basisText = {
  estimate:
    "Estimated technology contribution. These percentages are my own estimates of how much each technology contributes to the project. They are not measured from the source code.",
  measured: "Measured share of the project's source code by language.",
};

interface Props {
  breakdown?: TechShare[];
  basis?: "estimate" | "measured";
  /** Compact mode is used on cards: top three entries and no explanation block. */
  compact?: boolean;
  className?: string;
}

export function ProjectTechnologyBars({ breakdown, basis = "estimate", compact = false, className }: Props) {
  if (!breakdown || breakdown.length === 0) {
    return (
      <p className={cn("text-xs text-muted-foreground", className)}>Technology breakdown not set yet.</p>
    );
  }
  const items = compact ? [...breakdown].sort((a, b) => b.percent - a.percent).slice(0, 3) : breakdown;

  return (
    <div className={className}>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.tech} className="grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3 text-sm sm:grid-cols-[7rem_1fr_3rem]">
            <span className="truncate">{item.tech}</span>
            <div
              role="meter"
              aria-label={`${item.tech}: ${item.percent}%`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={item.percent}
              className="h-2 overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full origin-left rounded-full bg-accent motion-safe:animate-bar-grow"
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <span className="text-right tabular-nums text-muted-foreground">{item.percent}%</span>
          </li>
        ))}
      </ul>
      {compact ? (
        <p className="mt-2 text-xs text-muted-foreground">{basis === "measured" ? "Measured" : "Estimated"} contribution</p>
      ) : (
        <details className="mt-3 text-sm text-muted-foreground">
          <summary className="cursor-pointer text-link">What do these percentages mean?</summary>
          <p className="mt-2 max-w-prose leading-6">{basisText[basis]}</p>
        </details>
      )}
    </div>
  );
}
