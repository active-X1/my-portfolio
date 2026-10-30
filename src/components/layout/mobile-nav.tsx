"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { allNav, contactNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

const INERT_IDS = ["main-content", "site-footer"];

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastToggle = useRef(0);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  function onToggle() {
    // Ignore a second event fired within a few milliseconds (double taps, touch + click).
    const now = Date.now();
    if (now - lastToggle.current < 200) return;
    lastToggle.current = now;
    setOpen((o) => !o);
  }

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when the layout switches to the desktop navigation.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const inerted = INERT_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    inerted.forEach((el) => el.setAttribute("inert", ""));
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close(true);
        return;
      }
      if (e.key !== "Tab") return;
      // Keep Tab inside the toggle and the menu links while the menu is open.
      const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
      const stops = [toggleRef.current, ...links].filter((el): el is HTMLElement => el !== null);
      if (stops.length === 0) return;
      const index = stops.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (index <= 0 ? stops.length - 1 : index - 1) : index === stops.length - 1 ? 0 : index + 1;
      e.preventDefault();
      stops[next].focus();
    };

    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      close();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.body.style.overflow = previousOverflow;
      inerted.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  const bar = "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none";

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={onToggle}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className={cn(
          "relative flex h-11 w-11 items-center justify-center rounded-lg border transition-colors active:scale-95 motion-reduce:active:scale-100",
          open
            ? "border-accent bg-muted text-foreground"
            : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <span className="relative block h-4 w-5" aria-hidden="true">
          <span className={cn(bar, "top-0", open && "top-[7px] rotate-45")} />
          <span className={cn(bar, "top-[7px]", open && "opacity-0")} />
          <span className={cn(bar, "top-[14px]", open && "top-[7px] -rotate-45")} />
        </span>
      </button>

      {/* Rendered in a portal: the header's backdrop blur would otherwise trap a fixed panel inside the header. */}
      {open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto overscroll-contain border-t border-border bg-background motion-safe:animate-menu-in"
          >
            <nav aria-label="Mobile" className="mx-auto w-full max-w-lg px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
              <ul className="space-y-0.5">
                {allNav
                  .filter((item) => item.href !== contactNav.href)
                  .map((item) => {
                    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium active:bg-muted",
                            active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                          {active && <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
              <Link
                href={contactNav.href}
                className="mt-4 flex min-h-12 items-center justify-center rounded-lg bg-accent px-4 text-base font-medium text-accent-foreground active:opacity-90"
              >
                {contactNav.label}
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  );
}
