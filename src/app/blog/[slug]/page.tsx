import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlogCard } from "@/components/blog/blog-card";
import { ArticleBody } from "@/components/blog/article-body";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareArticle } from "@/components/blog/share-article";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ProjectCard } from "@/components/projects/project-card";
import { siteConfig } from "@/data/site";
import { getProject } from "@/data/projects";
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
  const description = post.excerpt || post.subtitle;
  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      publishedTime: post.date,
      authors: [siteConfig.name],
      images: post.cover ? [{ url: post.cover, width: 1600, height: 900, alt: post.coverAlt ?? post.title }] : undefined,
    },
    twitter: { card: post.cover ? "summary_large_image" : "summary", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const mentioned = post.projects.map((s) => getProject(s)).filter((p) => p !== undefined);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.subtitle,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name },
    image: post.cover ? `${siteConfig.url}${post.cover}` : undefined,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <>
      <ReadingProgress targetId="article-content" />
      <Container className="py-6 sm:py-10">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        <article className="mx-auto mt-6 max-w-3xl sm:mt-8">
          <header>
            <Badge tone="outline">{post.category}</Badge>
            <h1 className="mt-4 font-display text-fluid-h1 font-semibold">{post.title}</h1>
            {post.subtitle && <p className="mt-3 text-fluid-lead text-muted-foreground">{post.subtitle}</p>}
            <p className="mt-4 text-sm text-muted-foreground">
              By {siteConfig.name}
              <span aria-hidden="true"> &middot; </span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true"> &middot; </span>
              {post.readingMinutes} min read
            </p>
            <ShareButtons path={`/blog/${post.slug}`} title={post.title} className="mt-4" />
          </header>

          {post.cover && (
            <div className="relative mt-6 aspect-video overflow-hidden rounded-xl border border-border bg-muted sm:mt-8">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? ""}
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div id="article-content" className="mt-8 sm:mt-10">
            <ArticleBody content={post.content} />
          </div>

          <ShareArticle slug={post.slug} title={post.title} />

          {mentioned.length > 0 && (
            <section className="mt-12 border-t border-border pt-8 sm:mt-16" aria-labelledby="mentioned-heading">
              <h2 id="mentioned-heading" className="font-display text-xl font-semibold">
                Projects mentioned
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
                {mentioned.map((p) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-10">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-link hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </div>
        </article>

        {related.length > 0 && (
          <section className="mt-16" aria-labelledby="related-posts">
            <SectionHeading title="More posts" />
            <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
