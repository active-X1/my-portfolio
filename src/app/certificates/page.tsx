import type { Metadata } from "next";
import { Award } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ButtonLink } from "@/components/ui/button";
import { CertificateCard } from "@/components/certificates/certificate-card";
import { certificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Verified certificates and qualifications earned by Cyrus Akacha Cyprian.",
};

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        title="Certificates"
        description="Qualifications I have earned and can verify. This page grows as I do."
      />
      <Container className="py-12">
        {certificates.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((c) => (
              <li key={c.id}>
                <CertificateCard certificate={c} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={Award}
            title="Learning by building, certificates to follow"
            action={<ButtonLink href="/projects" variant="outline">See what I have built</ButtonLink>}
          >
            I am early in my journey and have no certificates to show yet. I will add each one here with a verification link
            once I have earned it. Until then, my projects are the best evidence of what I can do.
          </EmptyState>
        )}
      </Container>
    </>
  );
}
