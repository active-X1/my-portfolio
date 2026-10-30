import * as simpleIcons from "simple-icons";
import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Database,
  FileSpreadsheet,
  Monitor,
  Plug,
  Sparkles,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import type { FallbackIcon } from "@/types";

interface SimpleIcon {
  title: string;
  hex: string;
  path: string;
}

const lib = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

const fallbackIcons: Record<FallbackIcon, LucideIcon> = {
  database: Database,
  monitor: Monitor,
  file: FileSpreadsheet,
  braces: Braces,
  plug: Plug,
  terminal: SquareTerminal,
  sparkles: Sparkles,
  bot: Bot,
  cloud: Cloud,
  code: Code2,
};

function isDark(hex: string): boolean {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.35;
}

/**
 * Authentic brand logos from the Simple Icons package (server component only,
 * so the icon library never ships to the browser). Very dark logos fall back to the
 * current text colour so they stay visible on the dark theme. Technologies without an
 * official logo use a neutral Lucide icon instead.
 */
export function TechIcon({
  iconKeys,
  fallback = "code",
  label,
  className = "h-7 w-7",
  mono = false,
}: {
  iconKeys: string[];
  fallback?: FallbackIcon;
  label?: string;
  className?: string;
  mono?: boolean;
}) {
  const icon = iconKeys.map((k) => lib[k]).find((i): i is SimpleIcon => Boolean(i));
  if (!icon) {
    const Fallback = fallbackIcons[fallback];
    return <Fallback className={className} aria-hidden="true" />;
  }
  const fill = mono || isDark(icon.hex) ? "currentColor" : `#${icon.hex}`;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={fill}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={icon.path} />
    </svg>
  );
}
