import type { Metadata } from "next";
import { MessageSquareQuote } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewSummary } from "@/components/reviews/review-summary";
import { ReviewForm } from "@/components/reviews/review-form";
import { getApprovedReviews, summarize } from "@/lib/reviews";
import { isReviewBackendConfigured } from "@/lib/supabase";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Feedback from people who have worked with Cyrus Akacha Cyprian.",
};

export const revalidate = 300;

export default async function ReviewsPage() {
  const reviews = await getApprovedReviews();
  const summary = summarize(reviews);
  return (
    <>
      <PageHeader
        title="Reviews"
        description="Feedback from people I have actually worked with. Every review is checked by me before it is shown."
      />
      <Container className="space-y-16 py-12">
        {summary ? (
          <>
            <ReviewSummary summary={summary} />
            <ul className="grid gap-6 md:grid-cols-2">
              {reviews.map((r) => (
                <li key={r.id}>
                  <ReviewCard review={r} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <EmptyState icon={MessageSquareQuote} title="No reviews yet">
            I have not published any reviews, so there is no rating to show. If you have worked with me, you are welcome to leave
            one below.
          </EmptyState>
        )}

        <section aria-labelledby="leave-review" className="max-w-2xl">
          <SectionHeading title="Leave a review" description="Only share feedback from real work you did with me." />
          <div className="mt-8">
            <ReviewForm
              projectOptions={projects.map((p) => ({ slug: p.slug, name: p.name }))}
              backendConfigured={isReviewBackendConfigured()}
            />
          </div>
        </section>
      </Container>
    </>
  );
}
