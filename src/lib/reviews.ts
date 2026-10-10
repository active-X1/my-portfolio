import { staticReviews } from "@/data/reviews";
import type { Review } from "@/types";
import { getSupabaseConfig } from "./supabase";

interface ReviewRow {
  id: string;
  name: string;
  role: string | null;
  rating: number;
  message: string;
  project_slug: string | null;
  created_at: string;
}

/** Approved reviews only. Falls back to the hand-curated list when no backend is configured. */
export async function getApprovedReviews(): Promise<Review[]> {
  const cfg = getSupabaseConfig();
  let remote: Review[] = [];
  if (cfg) {
    try {
      const res = await fetch(
        `${cfg.url}/rest/v1/reviews?select=id,name,role,rating,message,project_slug,created_at&status=eq.approved&order=created_at.desc&limit=100`,
        {
          headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
          next: { revalidate: 300 },
        },
      );
      if (res.ok) {
        const rows = (await res.json()) as ReviewRow[];
        remote = rows.map((r) => ({
          id: r.id,
          name: r.name,
          role: r.role ?? undefined,
          rating: r.rating,
          message: r.message,
          date: r.created_at,
          projectSlug: r.project_slug ?? undefined,
        }));
      }
    } catch {
      // Reviews are optional content. A failed fetch should not break the page.
    }
  }
  return [...staticReviews, ...remote].sort((a, b) => b.date.localeCompare(a.date));
}

export interface RatingSummary {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
}

export function summarize(reviews: Review[]): RatingSummary | null {
  if (reviews.length === 0) return null;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as RatingSummary["distribution"];
  let total = 0;
  for (const r of reviews) {
    const k = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[k] += 1;
    total += r.rating;
  }
  return { count: reviews.length, average: total / reviews.length, distribution };
}
