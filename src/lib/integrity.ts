import { projects } from "@/data/projects";
import { gallery } from "@/data/gallery";

/** Fails the build when content data is inconsistent (bad percentages, broken slugs). */
export function assertDataIntegrity() {
  const slugs = new Set<string>();
  for (const p of projects) {
    if (slugs.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
    slugs.add(p.slug);
    if (p.languageStats) {
      const total = p.languageStats.reduce((sum, l) => sum + l.percent, 0);
      if (Math.abs(total - 100) > 0.05) {
        throw new Error(`Project "${p.slug}" language statistics total ${total}%, expected 100%.`);
      }
    }
  }
  for (const p of projects) {
    for (const r of p.related ?? []) {
      if (!slugs.has(r)) throw new Error(`Project "${p.slug}" lists unknown related slug "${r}".`);
    }
  }
  for (const e of gallery) {
    if (e.projectSlug && !slugs.has(e.projectSlug)) {
      throw new Error(`Gallery entry "${e.id}" lists unknown project "${e.projectSlug}".`);
    }
  }
}
