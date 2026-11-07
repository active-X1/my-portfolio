"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export interface LightboxItem {
  src: string;
  alt: string;
  width: number;
  height: number;
  fit?: "cover" | "contain";
  title: string;
  /** Short description shown under the image. */
  caption: string;
}

/**
 * Pop-up image viewer on the current page. Built on the native <dialog> element, so focus is
 * trapped, Escape closes it and focus returns to the thumbnail that opened it.
 * Click outside the card, use the close button, or use the arrows / arrow keys to move between images.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const previousOverflow = useRef("");
  const item = index === null ? undefined : items[index];
  const many = items.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) {
      previousOverflow.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      dialog.showModal();
    } else if (index === null && dialog.open) {
      dialog.close();
    }
  }, [index]);

  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflow.current;
    },
    [],
  );

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  return (
    <dialog
      ref={ref}
      aria-label={item ? `${item.title}: image viewer` : "Image viewer"}
      onClose={() => {
        document.body.style.overflow = previousOverflow.current;
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="m-auto w-[min(96vw,60rem)] max-w-none rounded-xl border border-border bg-card p-0 text-foreground backdrop:bg-black/75 open:flex open:max-h-[92dvh] open:flex-col"
    >
      {item && (
        <>
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-3">
            <h2 className="min-w-0 truncate font-display text-base font-semibold">{item.title}</h2>
            <div className="flex shrink-0 items-center gap-2">
              {many && index !== null && (
                <span className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
                  {index + 1} / {items.length}
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close image viewer"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-auto bg-muted p-2 sm:p-4">
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes="(min-width: 960px) 56rem, 96vw"
              className="mx-auto h-auto max-h-[64dvh] w-full rounded-md object-contain"
              style={item.fit === "contain" ? { maxWidth: item.width * 1.5 } : undefined}
            />
          </div>

          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-4 py-3">
            <p className="min-w-0 text-sm leading-6 text-muted-foreground">{item.caption}</p>
            {many && (
              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </dialog>
  );
}
