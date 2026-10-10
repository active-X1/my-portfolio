import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { LanguageStackSection } from "@/components/stacks/language-stack-section";
import { languageGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Stacks",
  description: "The languages and tools Cyrus Akacha Cyprian uses, is learning or plans to learn, with honest usage levels.",
};

export default function StacksPage() {
  return (
    <>
      <PageHeader
        title="Stacks"
        description="The languages and tools I use, organised by ecosystem. Frequently used skills come first, then everything else A to Z."
      />
      <Container className="py-12">
        <div className="flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-card p-5" role="note">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-link" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted-foreground">
            The percentages are my own self-assessment of practical usage or familiarity. They are not a test result or an
            objective measure of ability. Skills I am still learning have low values, and skills I have not started have no
            value at all.
          </p>
        </div>

        <nav aria-label="Jump to a language" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {languageGroups.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="inline-block rounded-lg border border-border px-3.5 py-1.5 text-sm hover:bg-muted">
                  {g.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-14 space-y-20">
          {languageGroups.map((g) => (
            <LanguageStackSection key={g.id} group={g} />
          ))}
        </div>
      </Container>
    </>
  );
}
