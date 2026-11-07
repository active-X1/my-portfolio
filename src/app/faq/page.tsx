import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { faqs } from "@/data/faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Cyrus Akacha Cyprian, his projects, technologies and how to contact him.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <PageHeader title="Frequently asked questions" description="Quick answers about Cyrus and his work." />
      <Container className="py-8 sm:py-12">
        <ul className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => (
            <li key={f.id}>
              <details open={i === 0} className="group rounded-xl border border-border bg-card">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-display text-base font-semibold sm:px-5 sm:text-lg [&::-webkit-details-marker]:hidden">
                  {f.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-border px-4 py-4 sm:px-5">
                  <p className="leading-7 text-muted-foreground">{f.answer}</p>
                  {f.links && (
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {f.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="text-sm font-medium text-link hover:underline">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-3xl text-sm text-muted-foreground">
          Something else on your mind? Ask the assistant in the corner, or{" "}
          <Link href="/contact" className="text-link hover:underline">
            get in touch
          </Link>
          .
        </p>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
