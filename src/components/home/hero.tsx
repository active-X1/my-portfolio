import Image from "next/image";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";

export function Hero() {
  const { portrait } = siteConfig;
  return (
    <section aria-labelledby="hero-heading" className="border-b border-border">
      <Container className="grid items-center gap-8 py-8 sm:py-12 md:grid-cols-[1.3fr_1fr] md:gap-10 lg:gap-16 lg:py-20">
        <div className="motion-safe:animate-rise-in">
          {siteConfig.availability.show && (
            <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground sm:text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-success" aria-hidden="true" />
              {siteConfig.availability.label}
            </p>
          )}
          <p className="mt-5 font-display text-base font-medium text-link sm:text-lg">{siteConfig.name}</p>
          <h1 id="hero-heading" className="mt-1.5 font-display text-fluid-display font-semibold">
            {siteConfig.headline}
          </h1>
          <p className="mt-2.5 text-sm font-medium text-muted-foreground sm:text-base">{siteConfig.title}</p>
          <p className="mt-4 max-w-xl text-fluid-lead text-muted-foreground">{siteConfig.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/projects">Explore my projects</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact me
            </ButtonLink>
          </div>
          <SocialLinks className="mt-6" />
        </div>

        <div className="mx-auto w-full max-w-[13rem] sm:max-w-[16rem] md:max-w-none">
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-full w-full rounded-2xl border border-accent/60 sm:-bottom-4 sm:-right-4" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 34vw, 256px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
