import Image from "next/image";
import type { Project, ProjectImage as ProjectImageData } from "@/types";
import { cn } from "@/lib/utils";

/** Classes that make an image fill a 16:9 frame without stretching. Screenshots are cropped from the bottom;
 *  images marked fit: "contain" are shown whole on a muted background. */
export function imageFitClass(image: Pick<ProjectImageData, "fit">): string {
  return image.fit === "contain" ? "object-contain p-2 sm:p-3" : "object-cover object-top";
}

/** Themed placeholder used until a real screenshot is set on the project. Works in both themes. */
export function ProjectPlaceholder({ name, label = "Project preview", className }: { name: string; label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} for ${name}`}
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-muted", className)}
    >
      <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <rect x="24" y="12" width="112" height="66" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1="24" y1="25" x2="136" y2="25" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <circle cx="34" cy="18.5" r="2.2" fill="hsl(var(--accent))" />
        <circle cx="42" cy="18.5" r="2.2" fill="hsl(var(--border))" />
        <circle cx="50" cy="18.5" r="2.2" fill="hsl(var(--border))" />
        <rect x="34" y="35" width="48" height="6" rx="3" fill="hsl(var(--border))" />
        <rect x="34" y="46" width="86" height="4" rx="2" fill="hsl(var(--border))" opacity="0.7" />
        <rect x="34" y="55" width="70" height="4" rx="2" fill="hsl(var(--border))" opacity="0.7" />
        <rect x="34" y="64" width="28" height="7" rx="3.5" fill="hsl(var(--accent))" opacity="0.85" />
      </svg>
      <span className="relative mt-auto mb-1.5 rounded-full bg-background/80 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

/** Consistent 16:9 frame for every project: the real image when set, otherwise the placeholder. */
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
    <div className={cn("relative aspect-video overflow-hidden bg-muted", className)}>
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageFitClass(project.image)}
        />
      ) : (
        <ProjectPlaceholder name={project.name} />
      )}
    </div>
  );
}
