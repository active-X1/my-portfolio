import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Hourglass } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectTechnologyBars } from "@/components/projects/project-technology-bars";
import { ProjectCard } from "@/components/projects/project-card";
import { categoryMeta, getProject, projects, statusMeta } from "@/data/projects";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="mt-3 max-w-2xl leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const related = (project.related ?? [])
    .map((s) => getProject(s))
    .filter((p) => p !== undefined)
    .slice(0, 3);
  const hasCaseStudy = Boolean(project.decisions?.length || project.lessons?.length);
  const tags = [...project.languages, ...project.technologies];

  return (
    <Container className="py-12">
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All projects
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="outline">{categoryMeta[project.category].label}</Badge>
            <Badge tone={project.status === "completed" ? "success" : "accent"}>{statusMeta[project.status].label}</Badge>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-muted-foreground">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <ButtonLink href={project.github} external>
                GitHub repository
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            )}
            {project.live ? (
              <ButtonLink href={project.live} external variant="outline">
                Live demo
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonLink>
            ) : (
              <span className="inline-flex h-11 items-center rounded-lg border border-dashed border-border px-4 text-sm text-muted-foreground">
                No live deployment
              </span>
            )}
          </div>
        </div>

        {project.image && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-contain p-3"
            />
          </div>
        )}
      </div>

      {project.overview && <Block title="Overview">{project.overview}</Block>}

      {project.features && project.features.length > 0 && (
        <Block title="Main features">
          <BulletList items={project.features} />
        </Block>
      )}

      <Block title="Technology stack">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        ) : (
          <p>The stack for this project has not been finalised yet.</p>
        )}
        <div className="mt-6">
          <ProjectTechnologyBars breakdown={project.breakdown} basis={project.breakdownBasis} />
        </div>
      </Block>

      {project.classificationNote && (
        <Block title={`Why it is listed as ${categoryMeta[project.category].label.toLowerCase()}`}>
          {project.classificationNote}
        </Block>
      )}

      {project.problem && <Block title="Problem being solved">{project.problem}</Block>}
      {project.architecture && <Block title="Architecture overview">{project.architecture}</Block>}
      {project.contribution && <Block title="My contribution">{project.contribution}</Block>}
      {project.decisions && project.decisions.length > 0 && (
        <Block title="Engineering decisions">
          <BulletList items={project.decisions} />
        </Block>
      )}
      {project.lessons && project.lessons.length > 0 && (
        <Block title="Challenges and lessons learned">
          <BulletList items={project.lessons} />
        </Block>
      )}

      {!hasCaseStudy && (
        <div className="mt-12 flex max-w-2xl items-start gap-3 rounded-xl border border-dashed border-border bg-card/50 p-5">
          <Hourglass className="mt-0.5 h-5 w-5 shrink-0 text-link" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted-foreground">
            Engineering decisions, challenges and lessons learned are still to be written up for this project.
          </p>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-heading">
          <SectionHeading title="Related projects" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
