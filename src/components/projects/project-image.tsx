import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/** Themed placeholder used until a real screenshot is set on the project. Works in both themes. */
export function ProjectPlaceholder({ name, label = "Project preview", className }: { name: string; label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} for ${name}`}
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-muted", className)}
    >
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="22" y="16" width="116" height="68" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1="22" y1="30" x2="138" y2="30" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <circle cx="32" cy="23" r="2.2" fill="hsl(var(--accent))" />
        <circle cx="40" cy="23" r="2.2" fill="hsl(var(--border))" />
        <circle cx="48" cy="23" r="2.2" fill="hsl(var(--border))" />
        <rect x="32" y="40" width="48" height="6" rx="3" fill="hsl(var(--border))" />
        <rect x="32" y="52" width="86" height="4" rx="2" fill="hsl(var(--border))" opacity="0.7" />
        <rect x="32" y="61" width="70" height="4" rx="2" fill="hsl(var(--border))" opacity="0.7" />
        <rect x="32" y="70" width="28" height="7" rx="3.5" fill="hsl(var(--accent))" opacity="0.85" />
      </svg>
      <span className="relative mt-auto mb-1.5 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/** Consistent 16:10 frame for every project: a real image when set, otherwise the placeholder. */
export function ProjectImage({
  project,
  sizes,
  priority = false,
  className,
}: {
  project: Pick<Project, "name" | "image">;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-muted", className)}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-1.5 sm:p-2"
        />
      ) : (
        <ProjectPlaceholder name={project.name} />
      )}
    </div>
  );
}
