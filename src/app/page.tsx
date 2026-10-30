import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { TechIcon } from "@/components/ui/tech-icon";
import { ProjectCard } from "@/components/projects/project-card";
import { siteConfig } from "@/data/site";
import { aboutParagraphs, interests } from "@/data/about";
import { projects } from "@/data/projects";
import { allTechItems, proficiencyLabel } from "@/data/technologies";

const homeTechIds = ["python", "javascript", "react", "typescript", "nodejs", "postgresql", "supabase", "html5", "css3", "git"];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured).slice(0, 4);
  const tech = homeTechIds
    .map((id) => allTechItems.find((t) => t.id === id))
    .filter((t) => t !== undefined);

  return (
    <>
      <Hero />

      <section className="py-10 sm:py-16" aria-labelledby="home-featured">
        <Container>
          <SectionHeading
            title="Featured projects"
            description="Database-backed web applications built and deployed end to end."
            action={{ label: "All projects", href: "/projects" }}
          />
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:gap-6">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} layout="featured" />
              </li>
            ))}
          </ul>
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 md:grid-cols-4 lg:gap-6">
            {more.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-10 sm:py-16" aria-labelledby="home-about">
        <Container className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
          <h2 id="home-about" className="font-display text-fluid-h2 font-semibold">
            Building software I can explain end to end
          </h2>
          <div>
            <p className="text-fluid-lead text-muted-foreground">{aboutParagraphs[0]}</p>
            <p className="mt-3 text-fluid-lead text-muted-foreground">{aboutParagraphs[3]}</p>
            <p className="mt-4 border-l-2 border-accent pl-4 text-sm leading-6 text-foreground/90 sm:text-base">{siteConfig.quote}</p>
            <ButtonLink href="/about" variant="outline" className="mt-5">
              More about me
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-16" aria-labelledby="home-tech">
        <Container>
          <SectionHeading
            title="Technologies"
            description="Python and JavaScript at the core, React and TypeScript with good proficiency."
            action={{ label: "All technologies", href: "/technologies" }}
          />
          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
            {tech.map((t) => (
              <li key={t.id} className="flex min-h-14 items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5">
                <TechIcon iconKeys={t.iconKeys} fallback={t.fallback} label={`${t.name} logo`} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{t.name}</span>
                  {t.proficiency && <span className="block truncate text-[11px] text-link sm:text-xs">{proficiencyLabel[t.proficiency]}</span>}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-border bg-card/40 py-10 sm:py-16" aria-labelledby="home-interests">
        <Container>
          <SectionHeading title="Current development interests" />
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            {interests.map((i) => (
              <li key={i} className="rounded-lg border border-border bg-card px-3 py-2 text-sm sm:px-4">
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            See how this grew on the{" "}
            <Link href="/journey" className="text-link hover:underline">
              development journey
            </Link>{" "}
            page.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-24" aria-labelledby="home-contact">
        <Container className="text-center">
          <h2 id="home-contact" className="font-display text-fluid-h1 font-semibold">
            Have something to build?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            I am open to collaborations, questions and entry-level opportunities.
          </p>
          <ButtonLink href="/contact" className="mt-6">
            Get in touch
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
