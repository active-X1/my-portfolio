import Link from "next/link";
import type { Technology } from "@/types";
import { proficiencyLabel } from "@/data/technologies";
import { projects } from "@/data/projects";
import { TechIcon } from "@/components/ui/tech-icon";
import { cn } from "@/lib/utils";

export function projectsUsing(tech: Technology) {
  return projects.filter((p) => p.technologies.some((t) => tech.projectKeys.includes(t)));
}

/** Large card for the technologies I want to emphasise (core and good proficiency). */
export function TechFeatureCard({ tech, emphasis }: { tech: Technology; emphasis: "core" | "good" }) {
  const used = projectsUsing(tech);
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-xl border bg-card p-4 sm:p-6",
        emphasis === "core" ? "border-accent/60" : "border-border",
      )}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted sm:h-14 sm:w-14">
          <TechIcon iconKeys={tech.iconKeys} fallback={tech.fallback} label={`${tech.name} logo`} className="h-7 w-7 sm:h-8 sm:w-8" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold sm:text-xl">{tech.name}</h3>
          {tech.proficiency && <p className="text-sm text-link">{proficiencyLabel[tech.proficiency]}</p>}
        </div>
      </div>
      <div className="mt-4 text-sm leading-6 text-muted-foreground">
        {used.length > 0 ? (
          <p>
            Used in{" "}
            {used.map((p, i) => (
              <span key={p.slug}>
                {i > 0 && (i === used.length - 1 ? " and " : ", ")}
                <Link href={`/projects/${p.slug}`} className="text-foreground underline decoration-border underline-offset-4 hover:decoration-accent">
                  {p.name}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : (
          tech.note && <p>{tech.note}</p>
        )}
        {used.length > 0 && tech.note && <p className="mt-1">{tech.note}</p>}
      </div>
    </article>
  );
}
