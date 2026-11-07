import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const CIRCUMFERENCE = 2 * Math.PI * 9.5;

/**
 * Completion indicator. Finished projects get a round green button with a tick.
 * Projects still in progress get a clock-style ring filled to the completed share.
 */
export function ProjectProgress({
  percent = 100,
  size = "sm",
  label = "always",
  className,
}: {
  percent?: number;
  size?: "sm" | "lg";
  /** "sm" hides the text on phones to keep cards compact. */
  label?: "always" | "sm" | "none";
  className?: string;
}) {
  const complete = percent >= 100;
  const dim = size === "lg" ? "h-8 w-8" : "h-5 w-5 sm:h-6 sm:w-6";
  const text = complete ? "Complete" : `${Math.round(percent)}% complete`;
  const labelClass = label === "sm" ? "hidden sm:inline" : "";

  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {complete ? (
        <span
          role="img"
          aria-label={text}
          className={cn("flex shrink-0 items-center justify-center rounded-full bg-success text-background", dim)}
        >
          <Check className={size === "lg" ? "h-[18px] w-[18px]" : "h-3 w-3 sm:h-3.5 sm:w-3.5"} strokeWidth={3.5} aria-hidden="true" />
        </span>
      ) : (
        <svg viewBox="0 0 24 24" role="img" aria-label={text} className={cn("shrink-0", dim)}>
          <circle cx="12" cy="12" r="9.5" fill="none" stroke="hsl(var(--border))" strokeWidth="3" />
          <circle
            cx="12"
            cy="12"
            r="9.5"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(CIRCUMFERENCE * percent) / 100} ${CIRCUMFERENCE}`}
            transform="rotate(-90 12 12)"
          />
          <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.6" strokeLinecap="round">
            <line x1="12" y1="12" x2="12" y2="7.5" />
            <line x1="12" y1="12" x2="15.2" y2="12" />
          </g>
        </svg>
      )}
      {label !== "none" && (
        <span className={cn("text-xs font-medium sm:text-sm", complete ? "text-success" : "text-link", labelClass)}>{text}</span>
      )}
    </span>
  );
}
