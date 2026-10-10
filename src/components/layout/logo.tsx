import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Cyrus Akacha Cyprian, home">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-md bg-accent font-mono text-sm font-bold text-accent-foreground"
      >
        {"{c}"}
      </span>
      <span className="font-display text-base font-semibold tracking-tight">Cyrus Akacha</span>
    </Link>
  );
}
