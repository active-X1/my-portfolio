import type { LanguageShare } from "@/types";
import { formatPercent } from "@/data/projects";
import { cn } from "@/lib/utils";

const segmentTone = ["bg-accent", "bg-accent/60", "bg-accent/35", "bg-foreground/25", "bg-foreground/15"];

const explanation =
  "These percentages are the share of code in the repository by language, as reported by GitHub. They describe the codebase, not my proficiency in any language.";

function summaryLabel(stats: LanguageShare[]) {
  return `GitHub language statistics: ${stats.map((s) => `${s.name} ${formatPercent(s.percent)}`).join(", ")}`;
}

/** Compact segmented bar for cards. */
export function LanguageStatsCompact({ stats, className }: { stats?: LanguageShare[]; className?: string }) {
  if (!stats || stats.length === 0) {
    return <p className={cn("text-[11px] text-muted-foreground", className)}>No language statistics</p>;
  }
  const top = stats[0];
  return (
    <div className={className}>
      <div role="img" aria-label={summaryLabel(stats)} className="flex h-1.5 gap-px overflow-hidden rounded-full bg-muted">
        {stats.map((s, i) => (
          <span key={s.name} className={segmentTone[Math.min(i, segmentTone.length - 1)]} style={{ width: `${s.percent}%` }} />
        ))}
      </div>
      <p className="mt-1 truncate text-[11px] text-muted-foreground">
        {top.name} {formatPercent(top.percent)}
        {stats.length > 1 && ` · +${stats.length - 1} more`}
      </p>
    </div>
  );
}

/** Full distribution with one labelled bar per language, for project pages. */
export function LanguageStatsFull({ stats, className }: { stats?: LanguageShare[]; className?: string }) {
  if (!stats || stats.length === 0) {
    return <p className={cn("text-sm text-muted-foreground", className)}>Language statistics are not available for this repository.</p>;
  }
  return (
    <div className={className}>
      <div role="img" aria-label={summaryLabel(stats)} className="flex h-2.5 gap-px overflow-hidden rounded-full bg-muted">
        {stats.map((s, i) => (
          <span key={s.name} className={segmentTone[Math.min(i, segmentTone.length - 1)]} style={{ width: `${s.percent}%` }} />
        ))}
      </div>
      <ul className="mt-4 space-y-2.5">
        {stats.map((s, i) => (
          <li key={s.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-sm">
            <span className={cn("h-2.5 w-2.5 rounded-full", segmentTone[Math.min(i, segmentTone.length - 1)])} aria-hidden="true" />
            <span>{s.name}</span>
            <span className="tabular-nums text-muted-foreground">{formatPercent(s.percent)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">{explanation}</p>
    </div>
  );
}
