import type { LanguageGroup } from "@/types";
import { sortSkills } from "@/data/skills";
import { TechIcon } from "@/components/ui/tech-icon";
import { SkillUsageBar } from "./skill-usage-bar";

export function LanguageStackSection({ group }: { group: LanguageGroup }) {
  const skills = sortSkills(group.skills);
  const projectCount = new Set(group.skills.flatMap((s) => s.projects)).size;
  return (
    <section aria-labelledby={`stack-${group.id}`} id={group.id} className="scroll-mt-24">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-card">
          <TechIcon iconKeys={group.iconKeys} label={`${group.name} logo`} className="h-8 w-8" />
        </span>
        <div>
          <h2 id={`stack-${group.id}`} className="font-display text-2xl font-semibold">
            {group.name}
          </h2>
          <p className="mt-1 max-w-2xl text-muted-foreground">{group.summary}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {projectCount > 0
              ? `Used in ${projectCount} ${projectCount === 1 ? "project" : "projects"} listed here.`
              : "Not yet used in a listed project."}
          </p>
        </div>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <SkillUsageBar key={s.id} skill={s} />
        ))}
      </ul>
    </section>
  );
}
