import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { BlogCard } from "@/components/blog/blog-card";
import { blogCategories, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing, project logs and lessons learned by Cyrus Akacha Cyprian.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHeader
        title="Blog"
        description="Tutorials, project logs and lessons from building software. I only publish what I have actually written."
      />
      <Container className="py-12">
        {posts.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState icon={PenLine} title="The first post is on its way">
            Nothing has been published yet. When I write, it will cover {blogCategories.slice(0, 3).join(", ").toLowerCase()} and my
            developer journey.
          </EmptyState>
        )}
      </Container>
    </>
  );
}
