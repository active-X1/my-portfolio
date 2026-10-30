import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { aboutParagraphs, interests } from "@/data/about";
import { socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "About",
  description:
    "Cyrus Akacha Cyprian is an emerging software developer building web, desktop and automation applications.",
};

export default function AboutPage() {
  const github = socials.find((s) => s.id === "github");
  return (
    <>
      <PageHeader title="About me" description={siteConfig.title} />
      <Container className="grid gap-10 py-8 sm:py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-fluid-lead text-muted-foreground">
          {aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}

          <figure className="border-l-2 border-accent pl-4 sm:pl-5">
            <blockquote className="text-lg leading-8 text-foreground sm:text-xl">{siteConfig.quote}</blockquote>
            <figcaption className="mt-3 text-sm">{siteConfig.tagline}</figcaption>
          </figure>

          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/projects">See my projects</ButtonLink>
            <ButtonLink href="/journey" variant="outline">
              Development journey
            </ButtonLink>
            {github && (
              <ButtonLink href={github.href} external variant="outline">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            )}
          </div>
        </div>

        <aside aria-labelledby="about-interests">
          <h2 id="about-interests" className="font-display text-lg font-semibold sm:text-xl">
            Current development interests
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 lg:grid-cols-1">
            {interests.map((i) => (
              <li key={i} className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm">
                {i}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </>
  );
}
