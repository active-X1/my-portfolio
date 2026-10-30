import type { TechCategory } from "@/types";
import { proficiencyLabel } from "@/data/technologies";
import { TechIcon } from "@/components/ui/tech-icon";

export function TechCategorySection({ category }: { category: TechCategory }) {
  return (
    <section aria-labelledby={`tech-${category.id}`}>
      <h2 id={`tech-${category.id}`} className="font-display text-lg font-semibold sm:text-xl">
        {category.name}
      </h2>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-6">
        {category.items.map((t) => (
          <li key={t.id} className="flex min-h-12 items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2">
            <TechIcon iconKeys={t.iconKeys} fallback={t.fallback} className="h-5 w-5 shrink-0" />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">{t.name}</span>
              {t.proficiency && <span className="block truncate text-[11px] text-link">{proficiencyLabel[t.proficiency]}</span>}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
