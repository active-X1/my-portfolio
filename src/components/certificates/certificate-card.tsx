import Image from "next/image";
import { BadgeCheck, ExternalLink } from "lucide-react";
import type { Certificate } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function CertificateCard({ certificate: c }: { certificate: Certificate }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
      {c.image && (
        <div className="relative aspect-[4/3] bg-muted">
          <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 360px, 100vw" className="object-contain p-3" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{c.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {c.issuer}, <time dateTime={c.issued}>{formatDate(c.issued)}</time>
        </p>
        {c.credentialId && <p className="mt-2 font-mono text-xs text-muted-foreground">ID: {c.credentialId}</p>}
        {c.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {c.skills.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        )}
        {c.verifyUrl && (
          <a
            href={c.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-link hover:underline"
          >
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Verify credential
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}
