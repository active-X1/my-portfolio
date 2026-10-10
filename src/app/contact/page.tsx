import type { Metadata } from "next";
import { ExternalLink, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialIcon } from "@/components/ui/social-icons";
import { siteConfig } from "@/data/site";
import { otherProfiles, socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Cyrus Akacha Cyprian about projects, collaboration and opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="For project ideas, collaboration, questions or opportunities. Use the form or reach me directly."
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />

        <aside aria-labelledby="direct-contact" className="space-y-8">
          <div>
            <h2 id="direct-contact" className="font-display text-xl font-semibold">
              Reach me directly
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted"
                >
                  <Mail className="h-5 w-5 text-link" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-medium">Email</span>
                    <span className="block text-sm text-muted-foreground">{siteConfig.email}</span>
                  </span>
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-muted"
                  >
                    <SocialIcon id={s.id} className="h-5 w-5 text-link" />
                    <span className="text-sm font-medium">{s.label}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold">Other profiles</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {otherProfiles.map((p) => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-link hover:underline">
                    {p.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Container>
    </>
  );
}
