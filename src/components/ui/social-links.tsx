import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";
import { SocialIcon } from "./social-icons";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <SocialIcon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}
