import Link from "next/link";
import Image from "next/image";
import { BookOpen, Compass } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { TechIcon } from "@/components/ui/tech-icon";
import { ProjectCard } from "@/components/projects/project-card";
import { BlogCard } from "@/components/blog/blog-card";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { learningFocus, usageMeta } from "@/data/skills";
import { gallery } from "@/data/gallery";
import { getAllPosts } from "@/lib/blog";

const featuredTech: { id: string; name: string; iconKeys: string[]; usage: string }[] = [
  { id: "python", name: "Python", iconKeys: ["siPython"], usage: "frequent" },
  { id: "html", name: "HTML", iconKeys: ["siHtml5"], usage: "used" },
  { id: "css", name: "CSS", iconKeys: ["siCss3", "siCss"], usage: "used" },
  { id: "js", name: "JavaScript", iconKeys: ["siJavascript"], usage: "used" },
  { id: "ts", name: "TypeScript", iconKeys: ["siTypescript"], usage: "learning" },
  { id: "react", name: "React", iconKeys: ["siReact"], usage: "learning" },
  { id: "next", name: "Next.js", iconKeys: ["siNextdotjs"], usage: "learning" },
  { id: "git", name: "Git", iconKeys: ["siGit"], usage: "used" },
];

export default function HomePage() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const posts = getAllPosts().slice(0, 3);
  const recent = gallery.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="py-20" aria-labelledby="home-projects">
        <Container>
          <SectionHeading
            title="Selected projects"
            description="Real programs I have built while learning. Each one links to its repository."
            action={{ label: "All projects", href: "/projects" }}
          />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-20" aria-labelledby="home-about">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <h2 id="home-about" className="font-display text-2xl font-semibold sm:text-3xl">
              A developer who wants to understand the systems he builds
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted-foreground">{siteConfig.quote}</p>
            <p className="mt-4 leading-7 text-muted-foreground">
              I started with Python fundamentals in September 2025 and have moved from small scripts to graphical
              applications. Now I am learning web development and backend work.
            </p>
            <ButtonLink href="/about" variant="outline" className="mt-6">
              Read my story
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="home-tech">
        <Container>
          <SectionHeading
            title="Technologies"
            description="The labels show where I actually am with each one."
            action={{ label: "Full stack breakdown", href: "/stacks" }}
          />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {featuredTech.map((t) => (
              <li key={t.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                <TechIcon iconKeys={t.iconKeys} label={`${t.name} logo`} className="h-8 w-8 shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{usageMeta[t.usage].label}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-y border-border bg-card/40 py-20" aria-labelledby="home-learning">
        <Container>
          <SectionHeading title="Current learning focus" description="What I am working on or preparing to start." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {learningFocus.map((item) => (
              <li key={item.title} className="rounded-xl border border-border bg-card p-5">
                <Badge tone={item.status === "learning" ? "accent" : "outline"}>
                  {item.status === "learning" ? "Learning now" : "Planned"}
                </Badge>
                <h3 className="mt-3 font-display font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.note}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="home-blog">
        <Container>
          <SectionHeading title="Latest writing" action={{ label: "All posts", href: "/blog" }} />
          <div className="mt-10">
            {posts.length > 0 ? (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState icon={BookOpen} title="No posts published yet">
                I will write about what I build and learn here. Nothing has been published yet.
              </EmptyState>
            )}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-card/40 py-20" aria-labelledby="home-gallery">
        <Container>
          <SectionHeading title="From the gallery" action={{ label: "Open gallery", href: "/gallery" }} />
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {recent.map((e) => (
              <li key={e.id}>
                <Link href="/gallery" className="block overflow-hidden rounded-xl border border-border bg-card">
                  <div className="relative aspect-[4/3] bg-muted">
                    <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain p-3" />
                  </div>
                  <p className="p-4 text-sm font-medium">{e.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-24" aria-labelledby="home-contact">
        <Container className="text-center">
          <Compass className="mx-auto h-8 w-8 text-link" aria-hidden="true" />
          <h2 id="home-contact" className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Have something to build or learn together?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            I am open to collaborations, questions and entry-level opportunities.
          </p>
          <ButtonLink href="/contact" className="mt-8">
            Get in touch
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
