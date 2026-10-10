import { projects } from "@/data/projects";
import { languageGroups } from "@/data/skills";
import { gallery } from "@/data/gallery";

/** Fails the build when content data is inconsistent (bad percentages, broken slugs). */
export function assertDataIntegrity() {
  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
    slugs.add(p.slug);
    if (p.breakdown) {
      const total = p.breakdown.reduce((sum, b) => sum + b.percent, 0);
      if (total !== 100) {
        throw new Error(`Project "${p.slug}" breakdown totals ${total}%, expected 100%.`);
      }
    }
  }
  for (const p of projects) {
    for (const r of p.related ?? []) {
      if (!slugs.has(r)) throw new Error(`Project "${p.slug}" lists unknown related slug "${r}".`);
    }
  }
  for (const g of languageGroups) {
    for (const s of g.skills) {
      if (s.percent !== undefined && (s.percent < 0 || s.percent > 100)) {
        throw new Error(`Skill "${s.id}" has percent outside 0-100.`);
      }
      for (const slug of s.projects) {
        if (!slugs.has(slug)) throw new Error(`Skill "${s.id}" lists unknown project "${slug}".`);
      }
    }
  }
  for (const e of gallery) {
    if (e.projectSlug && !slugs.has(e.projectSlug)) {
      throw new Error(`Gallery entry "${e.id}" lists unknown project "${e.projectSlug}".`);
    }
  }
}
