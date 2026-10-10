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
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <Tag
          className={cn(
            "font-display font-semibold tracking-tight",
            Tag === "h1" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
          )}
        >
          {title}
        </Tag>
        {description && <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>}
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
