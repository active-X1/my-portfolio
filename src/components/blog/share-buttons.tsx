"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "failed";

/** Old-browser fallback for copying text when the Clipboard API is unavailable. */
function legacyCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  if (!ok) throw new Error("copy failed");
}

const buttonClass =
  "inline-flex h-10 items-center gap-2 rounded-lg border border-border px-3.5 text-sm font-medium transition-colors hover:bg-muted active:bg-muted";

/**
 * Copy link and native share. The link is built from the page the visitor is on plus the
 * article's own path, so it always points to that exact article on whatever domain they are using.
 */
export function ShareButtons({ path, title, className }: { path: string; title: string; className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const [canShare, setCanShare] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
    return () => window.clearTimeout(timer.current);
  }, []);

  const articleUrl = () => new URL(path, window.location.origin).toString();

  function flash(next: CopyState) {
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2500);
  }

  async function copy() {
    const url = articleUrl();
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else legacyCopy(url);
      flash("copied");
    } catch {
      try {
        legacyCopy(url);
        flash("copied");
      } catch {
        flash("failed");
      }
    }
  }

  async function share() {
    try {
      await navigator.share({ title, text: title, url: articleUrl() });
    } catch (error) {
      // Closing the share sheet is not an error. Anything else falls back to copying the link.
      if (error instanceof DOMException && error.name === "AbortError") return;
      void copy();
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <button type="button" onClick={copy} className={buttonClass}>
        {state === "copied" ? <Check className="h-4 w-4 text-success" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        {state === "copied" ? "Link copied" : "Copy link"}
      </button>
      {canShare && (
        <button type="button" onClick={share} className={buttonClass}>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share
        </button>
      )}
      <span role="status" aria-live="polite" className={cn("text-sm", state === "failed" ? "text-danger" : "sr-only")}>
        {state === "copied" && "Article link copied to the clipboard."}
        {state === "failed" && "Could not copy. Copy the address from your browser instead."}
      </span>
    </div>
  );
}
