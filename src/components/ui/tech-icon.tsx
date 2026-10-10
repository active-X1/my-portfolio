import * as simpleIcons from "simple-icons";
import { Code2 } from "lucide-react";

interface SimpleIcon {
  title: string;
  hex: string;
  path: string;
}

const lib = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

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
 * current text colour so they stay visible on the dark theme.
 */
export function TechIcon({
  iconKeys,
  label,
  className = "h-7 w-7",
  mono = false,
}: {
  iconKeys: string[];
  label?: string;
  className?: string;
  mono?: boolean;
}) {
  const icon = iconKeys.map((k) => lib[k]).find((i): i is SimpleIcon => Boolean(i));
  if (!icon) return <Code2 className={className} aria-hidden="true" />;
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
