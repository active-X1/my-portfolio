import Image from "next/image";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

export function Hero() {
  const { portrait } = siteConfig;
  return (
    <section aria-labelledby="hero-heading" className="border-b border-border">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
        <div className="motion-safe:animate-rise-in">
          {siteConfig.availability.show && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              {siteConfig.availability.label}
            </p>
          )}
          <p className="mt-6 font-display text-lg font-medium text-link">{siteConfig.name}</p>
          <h1 id="hero-heading" className="mt-2 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.headline}
          </h1>
          <p className="mt-3 text-base font-medium text-muted-foreground">{siteConfig.title}</p>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">{siteConfig.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects">Explore my projects</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact me
            </ButtonLink>
          </div>
          <SocialLinks className="mt-8" />
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border border-accent/60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
