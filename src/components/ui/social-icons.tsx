import type { SocialId } from "@/types";
import { TechIcon } from "./tech-icon";

const keys: Record<Exclude<SocialId, "linkedin">, string[]> = {
  github: ["siGithub"],
  x: ["siX"],
  whatsapp: ["siWhatsapp"],
};

/** Simple outline LinkedIn mark drawn inline (the Simple Icons package no longer ships it). */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
      <path d="M8 10.5V16.5" />
      <circle cx="8" cy="7.6" r="0.6" fill="currentColor" />
      <path d="M12 16.5V10.5M12 13c0-1.6 1.1-2.5 2.5-2.5S17 11.4 17 13v3.5" />
    </svg>
  );
}

export function SocialIcon({ id, className = "h-5 w-5" }: { id: SocialId; className?: string }) {
  if (id === "linkedin") return <LinkedInMark className={className} />;
  return <TechIcon iconKeys={keys[id]} className={className} mono />;
}
