import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  as?: "h1" | "h2";
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeading({ title, description, as: Tag = "h2", action, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <Tag
          className={cn(
            "font-display font-semibold tracking-tight",
            Tag === "h1" ? "text-fluid-h1" : "text-fluid-h2",
          )}
        >
          {title}
        </Tag>
        {description && <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:text-base sm:leading-7">{description}</p>}
      </div>
      {action && (
        <Link href={action.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-link hover:underline">
          {action.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
