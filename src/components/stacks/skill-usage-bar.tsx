import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Skill } from "@/types";
import { usageMeta } from "@/data/skills";
import { getProject } from "@/data/projects";
import { Badge } from "@/components/ui/badge";

const usageTone = { frequent: "success", used: "neutral", learning: "accent", planned: "outline" } as const;

export function SkillUsageBar({ skill }: { skill: Skill }) {
  const projects = skill.projects.map((slug) => getProject(slug)).filter((p) => p !== undefined);
  return (
    <li className="rounded-xl border border-border bg-card">
      <details className="group">
        <summary className="cursor-pointer list-none p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-display text-base font-semibold">{skill.name}</h4>
            <Badge tone={usageTone[skill.usage]}>{usageMeta[skill.usage].label}</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{skill.description}</p>

          {skill.percent !== undefined ? (
            <div className="mt-3 grid grid-cols-[1fr_3rem] items-center gap-3">
              <div
                role="meter"
                aria-label={`${skill.name} self-assessed usage: ${skill.percent}%`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={skill.percent}
                className="h-2 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full origin-left rounded-full bg-accent motion-safe:animate-bar-grow"
                  style={{ width: `${skill.percent}%` }}
                />
              </div>
              <span className="text-right text-sm tabular-nums text-muted-foreground">{skill.percent}%</span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Not started yet, so there is no usage figure.</p>
          )}
          <span className="mt-3 inline-block text-xs text-link group-open:hidden">Show details</span>
          <span className="mt-3 hidden text-xs text-link group-open:inline-block">Hide details</span>
        </summary>

        <div className="space-y-3 border-t border-border p-4 text-sm sm:p-5">
          <p>
            <span className="font-medium">How I use it: </span>
            <span className="text-muted-foreground">{skill.usedFor}</span>
          </p>
          <p>
            <span className="font-medium">In my active stack: </span>
            <span className="text-muted-foreground">{skill.activeStack ? "Yes" : "Not yet"}</span>
          </p>
          <div>
            <span className="font-medium">Projects: </span>
            {projects.length > 0 ? (
              <span className="inline-flex flex-wrap gap-x-3 gap-y-1">
                {projects.map((p) => (
                  <Link key={p.slug} href={`/projects/${p.slug}`} className="text-link hover:underline">
                    {p.name}
                  </Link>
                ))}
              </span>
            ) : (
              <span className="text-muted-foreground">None yet</span>
            )}
          </div>
          {skill.docsUrl && (
            <a
              href={skill.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-link hover:underline"
            >
              Documentation
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </details>
    </li>
  );
}
