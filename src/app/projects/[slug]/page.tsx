import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectImage, ProjectPlaceholder } from "@/components/projects/project-image";
import { LanguageStatsFull } from "@/components/projects/project-language-stats";
import { getProject, groupMeta, projects } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.summary };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 sm:mt-10">
      <h2 className="font-display text-lg font-semibold sm:text-xl">{title}</h2>
      <div className="mt-2 max-w-2xl leading-7 text-muted-foreground sm:mt-3">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = (project.related ?? [])
    .map((s) => getProject(s))
    .filter((p) => p !== undefined)
    .slice(0, 4);
  const screenshots = project.screenshots ?? [];

  return (
    <Container className="py-6 sm:py-10">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <header className="mt-4 max-w-3xl sm:mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="outline">{groupMeta[project.group].label}</Badge>
          {project.featured && <Badge tone="accent">Featured</Badge>}
        </div>
        <h1 className="mt-3 font-display text-fluid-h1 font-semibold">{project.name}</h1>
        {project.alias && <p className="mt-1 text-sm text-muted-foreground sm:text-base">{project.alias}</p>}
        <p className="mt-3 text-fluid-lead text-muted-foreground">{project.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
          {project.github && (
            <ButtonLink href={project.github} external size="sm" className="sm:h-11 sm:px-5">
              <Github className="h-4 w-4" aria-hidden="true" />
              Repository
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )}
          {project.live && (
            <ButtonLink href={project.live} external variant="outline" size="sm" className="sm:h-11 sm:px-5">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live demo
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          )}
        </div>
      </header>

      <div className="mt-6 grid gap-8 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <div className="overflow-hidden rounded-xl border border-border">
            <ProjectImage project={project} sizes="(min-width: 1024px) 60vw, 100vw" priority />
          </div>

          <Block title="Overview">{project.description}</Block>
          {project.problem && <Block title="Problem addressed">{project.problem}</Block>}

          <Block title="Main functionality">
            <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          <section className="mt-8 sm:mt-10" aria-labelledby="screens-heading">
            <h2 id="screens-heading" className="font-display text-lg font-semibold sm:text-xl">
              Screenshots
            </h2>
            {screenshots.length > 0 ? (
              <ul className={screenshots.length === 1 ? "mt-3 grid gap-3 sm:gap-4" : "mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4"}>
                {screenshots.map((s) => (
                  <li key={s.src}>
                    <a
                      href={s.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden rounded-lg border border-border transition-colors hover:border-accent"
                    >
                      <ProjectImage project={{ name: project.name, image: s }} sizes="(min-width: 1024px) 60vw, 100vw" />
                      <span className="sr-only">View full-size screenshot of {project.name} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:gap-4">
                  {[1, 2].map((n) => (
                    <li key={n} className="overflow-hidden rounded-lg border border-border">
                      <div className="aspect-video">
                        <ProjectPlaceholder name={`${project.name}, screen ${n}`} label="Screenshot coming soon" />
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-muted-foreground">Real screenshots of this project will be added here.</p>
              </>
            )}
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="stack-heading">
            <h2 id="stack-heading" className="font-display text-base font-semibold">
              Technology stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-md bg-muted px-2 py-1 text-xs font-medium sm:text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-xl border border-border bg-card p-4 sm:p-5" aria-labelledby="lang-heading">
            <h2 id="lang-heading" className="font-display text-base font-semibold">
              GitHub language statistics
            </h2>
            <LanguageStatsFull stats={project.languageStats} className="mt-3" />
          </section>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12 sm:mt-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-display text-fluid-h2 font-semibold">
            Related projects
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
