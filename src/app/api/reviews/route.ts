import { NextResponse } from "next/server";
import { reviewSchema, fieldErrors } from "@/lib/validation";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { getSupabaseConfig } from "@/lib/supabase";
import { getProject } from "@/data/projects";

export async function POST(req: Request) {
  if (isRateLimited(`review:${clientKey(req)}`, 3, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited", message: "Too many submissions. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "The request could not be read." }, { status: 400 });
  }

  // Honeypot: pretend success so bots learn nothing, but store nothing.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 422 });
  }
  const { name, role, rating, message, projectSlug } = parsed.data;
  if (projectSlug && !getProject(projectSlug)) {
    return NextResponse.json({ error: "validation", fields: { projectSlug: "Choose a listed project." } }, { status: 422 });
  }

  const cfg = getSupabaseConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: "not_configured", message: "Review submissions are not set up on this site yet. Nothing was saved." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${cfg.url}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        apikey: cfg.key,
        Authorization: `Bearer ${cfg.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, role: role ?? null, rating, message, project_slug: projectSlug ?? null }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream", message: "Your review could not be saved. Please try again later." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream", message: "Your review could not be saved. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
