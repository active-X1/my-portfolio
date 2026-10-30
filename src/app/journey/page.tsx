import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Development journey",
  description: "How Cyrus Akacha Cyprian's work has grown from Python programs to web platforms and automation.",
};

const statusLabel = { done: "Built", current: "Ongoing", next: "Up next" } as const;

export default function JourneyPage() {
  return (
    <>
      <PageHeader
        title="Development journey"
        description="The kinds of software I have built so far, grouped by theme rather than by exact date."
      />
      <Container className="py-8 sm:py-12">
        <ol className="max-w-2xl border-l border-border">
          {timeline.map((item) => (
            <li key={item.title} className="relative pb-8 pl-6 last:pb-0 sm:pb-10 sm:pl-8">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2",
                  item.status === "done" && "border-accent bg-accent",
                  item.status === "current" && "border-accent bg-background",
                  item.status === "next" && "border-border bg-background",
                )}
              />
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-base font-semibold sm:text-lg">{item.title}</h2>
                <Badge tone={item.status === "done" ? "success" : item.status === "current" ? "accent" : "outline"}>
                  {statusLabel[item.status]}
                </Badge>
              </div>
              {item.date && <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>}
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/projects">See the projects</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Get in touch
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
