import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/data/site";
import { allNav } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/social-links";
import { Container } from "@/components/ui/container";
import { CurrentYear } from "./current-year";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{siteConfig.tagline}</p>
          <SocialLinks className="mt-5" />
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {allNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-border">
        <Container className="flex flex-col items-start justify-between gap-3 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center">
          <p>
            &copy; <CurrentYear /> {siteConfig.name}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="hover:text-foreground">
              Get in touch
            </Link>
            <a href="#top" className="inline-flex items-center gap-1.5 hover:text-foreground">
              Back to top
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
