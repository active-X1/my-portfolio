import { cn } from "@/lib/utils";

/** Gains width and padding as the screen grows instead of simply stretching. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[88rem]", className)}>{children}</div>;
}
