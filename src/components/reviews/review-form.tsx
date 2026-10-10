"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { reviewSchema, fieldErrors } from "@/lib/validation";
import { StarRatingInput } from "./star-rating-input";

type Status = "idle" | "submitting" | "success" | "error";

export function ReviewForm({
  projectOptions,
  backendConfigured,
}: {
  projectOptions: { slug: string; name: string }[];
  backendConfigured: boolean;
}) {
  const [values, setValues] = useState({ name: "", role: "", message: "", projectSlug: "", website: "" });
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = reviewSchema.safeParse({ ...values, rating });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, rating }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; fields?: Record<string, string> };
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", role: "", message: "", projectSlug: "", website: "" });
        setRating(0);
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFeedback(data.message ?? "Your review could not be submitted.");
      setStatus("error");
    } catch {
      setFeedback("The network request failed. Your review was not saved.");
      setStatus("error");
    }
  }

  if (!backendConfigured) {
    return (
      <div className="rounded-xl border border-border bg-card p-6" role="note">
        <p className="font-medium">Review submissions are not switched on yet</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          This form needs a database connection before it can save anything, so it is disabled rather than pretending to
          work. If you have worked with me, you can send feedback through the contact page for now.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-6" role="status">
        <p className="flex items-center gap-2 font-medium text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Review received
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Thank you. Your review is pending and will appear here once I have approved it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-xl border border-border bg-card p-6">
      <Field label="Name" htmlFor="review-name" error={errors.name}>
        <Input id="review-name" value={values.name} onChange={set("name")} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "review-name-error" : undefined} />
      </Field>
      <Field label="Role or organisation" hint="(optional)" htmlFor="review-role" error={errors.role}>
        <Input id="review-role" value={values.role} onChange={set("role")} autoComplete="organization-title" />
      </Field>
      <StarRatingInput value={rating} onChange={setRating} error={errors.rating} />
      <Field label="Project you worked on with me" hint="(optional)" htmlFor="review-project" error={errors.projectSlug}>
        <Select id="review-project" value={values.projectSlug} onChange={set("projectSlug")}>
          <option value="">Not about a specific project</option>
          {projectOptions.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Your feedback" htmlFor="review-message" error={errors.message}>
        <Textarea id="review-message" value={values.message} onChange={set("message")} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "review-message-error" : undefined} />
      </Field>

      {/* Honeypot: hidden from people, visible to bots. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input id="review-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      {status === "error" && (
        <p className="flex items-start gap-2 text-sm text-danger" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {feedback}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {status === "submitting" ? "Submitting" : "Submit review"}
      </Button>
      <p className="text-xs text-muted-foreground">Reviews are checked by me before they are published.</p>
    </form>
  );
}
