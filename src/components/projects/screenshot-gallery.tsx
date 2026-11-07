"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Lightbox, type LightboxItem } from "@/components/ui/image-lightbox";
import { cn } from "@/lib/utils";
import { ProjectImage } from "./project-image";

/** Screenshot thumbnails that open in a pop-up on the same page, with a short description under the image. */
export function ScreenshotGallery({ items, className }: { items: LightboxItem[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <ul className={cn("grid gap-3 sm:gap-4", items.length > 1 && "sm:grid-cols-2", className)}>
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="group relative block w-full overflow-hidden rounded-lg border border-border text-left transition-colors hover:border-accent"
            >
              <ProjectImage project={{ name: item.title, image: item }} sizes="(min-width: 1024px) 60vw, 100vw" />
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-md bg-background/85 text-foreground shadow"
              >
                <Maximize2 className="h-4 w-4" />
              </span>
              <span className="sr-only">View larger: {item.alt}</span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={index} onIndexChange={setIndex} onClose={() => setIndex(null)} />
    </>
  );
}
