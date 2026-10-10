import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "success" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-foreground/80",
  accent: "bg-accent/15 text-link",
  success: "bg-success/15 text-success",
  outline: "border border-border text-muted-foreground",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", tones[tone], className)}>
      {children}
    </span>
  );
}
