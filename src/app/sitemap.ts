import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/stacks", "/blog", "/gallery", "/certificates", "/reviews", "/contact"];
  return [
    ...staticRoutes.map((r) => ({ url: `${siteConfig.url}${r}` })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/projects/${p.slug}` })),
    ...getAllPosts().map((p) => ({ url: `${siteConfig.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
