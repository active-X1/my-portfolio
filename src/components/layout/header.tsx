"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { contactNav, moreNav, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const linkClass = (active: boolean) =>
  cn(
    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
    active ? "text-foreground" : "text-muted-foreground",
  );

export function Header() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const moreActive = moreNav.some((n) => isActive(pathname, n.href));

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={linkClass(active)}>
                {item.label}
                {active && <span className="mt-0.5 block h-0.5 rounded-full bg-accent" aria-hidden="true" />}
              </Link>
            );
          })}

          <div ref={moreRef} className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              aria-controls="more-menu"
              onClick={() => setMoreOpen((o) => !o)}
              className={cn(linkClass(moreActive), "inline-flex items-center gap-1")}
            >
              More
              <ChevronDown className={cn("h-4 w-4 transition-transform", moreOpen && "rotate-180")} aria-hidden="true" />
            </button>
            {moreOpen && (
              <ul
                id="more-menu"
                className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-card p-2 shadow-lg"
              >
                {moreNav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn("block rounded-lg px-3 py-2.5 hover:bg-muted", active && "bg-muted")}
                      >
                        <span className="block text-sm font-medium">{item.label}</span>
                        {item.description && (
                          <span className="block text-xs text-muted-foreground">{item.description}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={contactNav.href}
            aria-current={isActive(pathname, contactNav.href) ? "page" : undefined}
            className="hidden h-10 items-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted lg:inline-flex"
          >
            {contactNav.label}
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
