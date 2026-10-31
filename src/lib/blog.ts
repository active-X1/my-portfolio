import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogCategory, BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const blogCategories: BlogCategory[] = [
  "Engineering / Personal Journey",
  "Engineering / Debugging",
  "Python",
  "Web Development",
  "Backend Engineering",
  "AI and Agentic Systems",
  "Project Case Studies",
  "Developer Journey",
];

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readPost(file: string): BlogPost | null {
  const slug = file.replace(/\.mdx?$/, "");
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Blog file "${file}" must be lower-case words joined by hyphens: it becomes the permanent URL /blog/${slug}.`);
  }
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;
  if (!data.title || !data.date || !data.category) return null;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    slug,
    title: String(data.title),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    date,
    category: data.category as BlogCategory,
    excerpt: String(data.excerpt ?? ""),
    cover: data.cover ? String(data.cover) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    projects: Array.isArray(data.projects) ? data.projects.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .map(readPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
  // Each article's slug is its permanent URL, so it must be unique (.md and .mdx share a namespace).
  const seen = new Set<string>();
  for (const p of posts) {
    if (seen.has(p.slug)) throw new Error(`Duplicate blog slug: ${p.slug}`);
    seen.add(p.slug);
  }
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, limit);
}
