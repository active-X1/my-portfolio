import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogCard } from "@/components/blog/blog-card";
import { formatDate } from "@/lib/utils";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt || undefined };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post);

  return (
    <Container className="py-12">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All posts
      </Link>
      <article className="mt-8">
        <header className="max-w-3xl">
          <Badge tone="outline">{post.category}</Badge>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
          </p>
        </header>
        <div className="prose-content mt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-20" aria-labelledby="related-posts">
          <SectionHeading title="More posts" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <BlogCard post={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
