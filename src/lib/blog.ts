import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogCategory, BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const blogCategories: BlogCategory[] = [
  "Python",
  "Web Development",
  "Backend Engineering",
  "AI and Agentic Systems",
  "Project Case Studies",
  "Developer Journey",
];

function readPost(file: string): BlogPost | null {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;
  if (!data.title || !data.date || !data.category) return null;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
  return {
    slug,
    title: String(data.title),
    date,
    category: data.category as BlogCategory,
    excerpt: String(data.excerpt ?? ""),
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f) && !f.startsWith("_") && f.toLowerCase() !== "readme.md")
    .map(readPost)
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
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
