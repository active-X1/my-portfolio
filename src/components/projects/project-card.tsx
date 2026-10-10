import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Project } from "@/types";
import { categoryMeta, statusMeta } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ProjectTechnologyBars } from "./project-technology-bars";

export function ProjectCard({ project }: { project: Project }) {
  const tags = [...project.languages, ...project.technologies];
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[16/10] bg-muted">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <FolderGit2 className="h-10 w-10" aria-hidden="true" />
            <span className="sr-only">No screenshot yet</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="outline">{categoryMeta[project.category].label}</Badge>
          <Badge tone={project.status === "completed" ? "success" : "accent"}>{statusMeta[project.status].label}</Badge>
        </div>

        <h3 className="mt-3 font-display text-lg font-semibold">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex min-h-[1.75rem] flex-wrap gap-1.5">
          {tags.length > 0 ? (
            tags.map((t) => (
              <Badge key={t} tone="neutral">
                {t}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-muted-foreground">Stack to be confirmed</span>
          )}
        </div>

        <ProjectTechnologyBars breakdown={project.breakdown} basis={project.breakdownBasis} compact className="mt-4" />

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm font-medium">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-link hover:underline">
            View details
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              GitHub<span className="sr-only"> repository for {project.name} (opens in a new tab)</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              Live demo<span className="sr-only"> of {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
