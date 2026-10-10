export type ProjectCategory = "beginner" | "intermediate" | "advanced";
export type ProjectStatus = "completed" | "in-progress" | "prototype" | "archived";

export interface TechShare {
  tech: string;
  percent: number;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  category: ProjectCategory;
  /** Why the project sits in this category. Shown on the detail page. */
  classificationNote?: string;
  status: ProjectStatus;
  featured?: boolean;
  /** Programming languages used. Leave empty when not confirmed. */
  languages: string[];
  /** Frameworks, libraries and tools used. */
  technologies: string[];
  /** Must total 100 when present. See `breakdownBasis`. */
  breakdown?: TechShare[];
  breakdownBasis?: "estimate" | "measured";
  image?: ProjectImage;
  github?: string;
  live?: string;
  overview?: string;
  problem?: string;
  features?: string[];
  architecture?: string;
  contribution?: string;
  decisions?: string[];
  lessons?: string[];
  related?: string[];
}

export type UsageLevel = "frequent" | "used" | "learning" | "planned";

export interface Skill {
  id: string;
  name: string;
  description: string;
  usage: UsageLevel;
  /** Self-assessed 0-100. Omit for skills not yet started. */
  percent?: number;
  usedFor: string;
  /** Project slugs. */
  projects: string[];
  activeStack: boolean;
  docsUrl?: string;
}

export interface LanguageGroup {
  id: string;
  name: string;
  /** simple-icons export names, tried in order. */
  iconKeys: string[];
  summary: string;
  skills: Skill[];
}

export interface LearningItem {
  title: string;
  status: "learning" | "planned";
  note: string;
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
  | "Python"
  | "Web Development"
  | "Backend Engineering"
  | "AI and Agentic Systems"
  | "Project Case Studies"
  | "Developer Journey";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: BlogCategory;
  excerpt: string;
  cover?: string;
  readingMinutes: number;
  content: string;
}

export type SocialId = "github" | "linkedin" | "x" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  label: string;
  href: string;
}
