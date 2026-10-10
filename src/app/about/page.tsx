import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/data/site";
import { timeline } from "@/data/timeline";
import { learningFocus } from "@/data/skills";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "How Cyrus Akacha Cyprian went from Python fundamentals to building larger applications.",
};

const statusLabel = { done: "Done", current: "In progress", next: "Up next" } as const;

export default function AboutPage() {
  const github = socials.find((s) => s.id === "github");
  return (
    <>
      <PageHeader title="About me" description="Where I started, what I have built and where I am heading." />
      <Container className="grid gap-16 py-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="max-w-2xl space-y-6 text-lg leading-8 text-muted-foreground">
          <p>
            I am {siteConfig.name}, a growing software developer. I began with Python fundamentals in September 2025 and
            learned by building practical projects: calculators, a maths game and a desktop utility.
          </p>
          <p>
            Over time I moved from procedural scripts to object-oriented code and graphical interfaces with Tkinter. I am now
            adding web development, APIs and backend frameworks to that foundation, and I plan to build an agentic AI system
            with tool calling and multi-step workflows.
          </p>
          <p>
            I care about software that solves real problems, not only interfaces that look good. That is why I want to learn
            both the frontend and the backend, and why I would rather understand how a system works than copy a pattern.
          </p>
          <p>I also plan to study Computer Science at university.</p>

          <figure className="border-l-2 border-accent pl-5">
            <blockquote className="text-xl leading-8 text-foreground">{siteConfig.quote}</blockquote>
            <figcaption className="mt-3 text-sm">{siteConfig.tagline}</figcaption>
          </figure>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/projects">See my projects</ButtonLink>
            {github && (
              <ButtonLink href={github.href} external variant="outline">
                GitHub profile<span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            )}
          </div>
        </div>

        <aside aria-labelledby="about-goals">
          <h2 id="about-goals" className="font-display text-xl font-semibold">
            Current learning goals
          </h2>
          <ul className="mt-5 space-y-4">
            {learningFocus.map((l) => (
              <li key={l.title} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{l.title}</p>
                  <Badge tone={l.status === "learning" ? "accent" : "outline"}>
                    {l.status === "learning" ? "Learning" : "Planned"}
                  </Badge>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{l.note}</p>
              </li>
            ))}
          </ul>
        </aside>
      </Container>

      <section className="border-t border-border bg-card/40 py-16" aria-labelledby="timeline-heading">
        <Container>
          <SectionHeading title="Development journey" description="I only add a date when I can stand behind it." />
          <ol className="mt-10 max-w-2xl border-l border-border">
            {timeline.map((item) => (
              <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
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
                  <h3 className="font-display font-semibold">{item.title}</h3>
                  <Badge tone={item.status === "done" ? "success" : item.status === "current" ? "accent" : "outline"}>
                    {statusLabel[item.status]}
                  </Badge>
                </div>
                {item.date && <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>}
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="py-16">
        <SectionHeading title="Projects behind the story" />
        <ul className="mt-6 flex flex-wrap gap-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link href={`/projects/${p.slug}`} className="inline-block rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
