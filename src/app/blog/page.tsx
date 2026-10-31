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
  const posts = getAllPosts();
  // With one or two articles every card is the same size; the latest only gets the wide layout once there are three or more.
  const useFeatured = posts.length > 2;
  const [latest, ...rest] = posts;
  return (
    <>
      <PageHeader title="Blog" description="Writing on what I build, what goes wrong and what I learn along the way." />
      <Container className="py-8 sm:py-12">
        {latest ? (
          <div className="space-y-6">
            {useFeatured && <BlogCard post={latest} layout="featured" />}
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {(useFeatured ? rest : posts).map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
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
