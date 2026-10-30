import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { TechFeatureCard } from "@/components/technologies/tech-feature-card";
import { TechCategorySection } from "@/components/technologies/tech-category-section";
import { coreTech, goodTech, techCategories } from "@/data/technologies";

export const metadata: Metadata = {
  title: "Technologies",
  description: "The languages, frameworks, databases and tools Cyrus Akacha Cyprian works with.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        title="Technologies"
        description="Python and JavaScript are the core of my work. React and TypeScript are where I have good proficiency. The rest is the toolkit I build with."
      />
      <Container className="space-y-10 py-8 sm:space-y-14 sm:py-12">
        <section aria-labelledby="core-heading">
          <h2 id="core-heading" className="font-display text-fluid-h2 font-semibold">
            Core technologies
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {coreTech.map((t) => (
              <li key={t.id}>
                <TechFeatureCard tech={t} emphasis="core" />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="good-heading">
          <h2 id="good-heading" className="font-display text-fluid-h2 font-semibold">
            Good proficiency
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {goodTech.map((t) => (
              <li key={t.id}>
                <TechFeatureCard tech={t} emphasis="good" />
              </li>
            ))}
          </ul>
        </section>

        <div className="flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-card p-4" role="note">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-link" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted-foreground">
            I only attach a proficiency label where I am confident in it. Other technologies are listed without a score. The
            language percentages on project pages come from GitHub and measure code in a repository, not skill.
          </p>
        </div>

        <div className="space-y-9 sm:space-y-12">
          {techCategories.map((c) => (
            <TechCategorySection key={c.id} category={c} />
          ))}
        </div>
      </Container>
    </>
  );
}
