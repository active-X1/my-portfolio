export type ProjectGroup = "web" | "desktop" | "automation-ai" | "interactive";

/** Share of a repository's code per language, as reported by GitHub. Not a skill measure. */
export interface LanguageShare {
  name: string;
  percent: number;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "cover" (default) fills the 16:9 frame. Use "contain" for small or unusually shaped screenshots. */
  fit?: "cover" | "contain";
}

export interface Project {
  slug: string;
  name: string;
  /** Longer official name when the display name is a product name. */
  alias?: string;
  /** One or two lines for cards. */
  summary: string;
  /** Overview paragraph for the case study. */
  description: string;
  group: ProjectGroup;
  featured?: boolean;
  /** Languages, frameworks, services and tools, in display order. */
  technologies: string[];
  /** GitHub language statistics. Omit when not available. */
  languageStats?: LanguageShare[];
  /** Real screenshot. Leave out to show the themed placeholder. */
  image?: ProjectImage;
  /** Additional screenshots for the case study. */
  screenshots?: ProjectImage[];
  github?: string;
  live?: string;
  problem?: string;
  features: string[];
  related?: string[];
}

export type Proficiency = "core" | "good";

export type FallbackIcon =
  | "database"
  | "monitor"
  | "file"
  | "braces"
  | "plug"
  | "terminal"
  | "sparkles"
  | "bot"
  | "cloud"
  | "code";

export interface Technology {
  id: string;
  name: string;
  /** simple-icons export names, tried in order. */
  iconKeys: string[];
  fallback?: FallbackIcon;
  /** Only set where I am confident: "core" or "good". Never invent one. */
  proficiency?: Proficiency;
  /** Names as they appear in project `technologies`, used to find the projects that use it. */
  projectKeys: string[];
  note?: string;
}

export interface TechCategory {
  id: string;
  name: string;
  items: Technology[];
}

export interface TimelineItem {
  /** Only set when the date is known and supported. */
  date?: string;
  title: string;
  description: string;
  status: "done" | "current" | "next";
}

export type GalleryCategory = "screenshots" | "milestones" | "setup" | "redesigns";

export interface GalleryEntry {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  image: ProjectImage;
  date?: string;
  projectSlug?: string;
  href?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: ProjectImage;
  skills: string[];
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  organization?: string;
  rating: number;
  message: string;
  date: string;
  projectSlug?: string;
}

export type BlogCategory =
  | "Engineering / Personal Journey"
  | "Engineering / Debugging"
  | "Python"
  | "Web Development"
  | "Backend Engineering"
  | "AI and Agentic Systems"
  | "Project Case Studies"
  | "Developer Journey";

export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  cover?: string;
  coverAlt?: string;
  /** Project slugs mentioned in the article. */
  projects: string[];
  readingMinutes: number;
  content: string;
}

export type SocialId = "github" | "linkedin" | "x" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}
