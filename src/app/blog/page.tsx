import type { Metadata } from "next";
import { PenLine } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { BlogCard } from "@/components/blog/blog-card";
import { blogCategories, getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on software engineering, projects and lessons learned by Cyrus Akacha Cyprian.",
};

export default function BlogPage() {
  const [latest, ...rest] = getAllPosts();
  return (
    <>
      <PageHeader title="Blog" description="Writing on what I build, what goes wrong and what I learn along the way." />
      <Container className="py-8 sm:py-12">
        {latest ? (
          <div className="space-y-6">
            <BlogCard post={latest} layout="featured" />
            {rest.length > 0 && (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <BlogCard post={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
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
