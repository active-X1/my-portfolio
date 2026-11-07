import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";
import { groupMeta } from "@/data/projects";
import { cn } from "@/lib/utils";
import { LanguageStatsCompact } from "./project-language-stats";
import { ProjectProgress } from "./project-progress";
import { ProjectImage } from "./project-image";

const iconLink =
  "flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted sm:h-9 sm:w-9";

/**
 * Compact by default (built for a two-column phone grid) and roomier from the `sm` breakpoint up.
 * The `featured` layout turns horizontal on wide screens for the home page.
 */
export function ProjectCard({ project, layout = "compact" }: { project: Project; layout?: "compact" | "featured" }) {
  const featured = layout === "featured";
  const shown = project.technologies.slice(0, 5);
  const extra = project.technologies.length - shown.length;

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card sm:rounded-xl",
        featured && "md:flex-row",
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={cn("block shrink-0", featured && "md:w-[44%]")}
      >
        <ProjectImage
          project={project}
          sizes={
            featured
              ? "(min-width: 768px) 30vw, 50vw"
              : "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
          }
          className={cn(featured && "md:aspect-auto md:h-full md:min-h-[11rem]")}
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[11px] font-medium text-link sm:text-xs">{groupMeta[project.group].label}</p>
          <ProjectProgress percent={project.progress} label="sm" className="shrink-0" />
        </div>
        <h3 className="mt-0.5 font-display text-[0.9375rem] font-semibold leading-snug sm:text-lg">
          <Link href={`/projects/${project.slug}`} className="line-clamp-2 hover:underline">
            {project.name}
          </Link>
        </h3>
        <p
          className={cn(
            "mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground sm:line-clamp-3 sm:text-sm sm:leading-6",
            featured && "md:line-clamp-4",
          )}
        >
          {project.summary}
        </p>

        <ul className="mt-2 flex flex-wrap gap-1 sm:mt-3" aria-label="Technologies">
          {shown.map((t, i) => (
            <li
              key={t}
              className={cn(
                "rounded bg-muted px-1.5 py-0.5 text-[11px] font-medium leading-4 text-foreground/80 sm:text-xs",
                i >= 3 && "hidden sm:block",
              )}
            >
              {t}
            </li>
          ))}
          {project.technologies.length > 3 && (
            <li className="rounded px-1 py-0.5 text-[11px] leading-4 text-muted-foreground sm:hidden">
              +{project.technologies.length - 3}
            </li>
          )}
          {extra > 0 && (
            <li className="hidden rounded px-1 py-0.5 text-xs leading-4 text-muted-foreground sm:block">+{extra}</li>
          )}
        </ul>

        <LanguageStatsCompact stats={project.languageStats} className="mt-2.5 sm:mt-3" />

        <div className="mt-auto flex items-center justify-between gap-2 pt-2.5 sm:pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-medium text-link hover:underline sm:text-sm"
          >
            Details<span className="sr-only"> for {project.name}</span>
          </Link>
          <div className="flex items-center gap-1.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={iconLink}>
                <Github className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">GitHub repository for {project.name} (opens in a new tab)</span>
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={iconLink}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Live demo of {project.name} (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
