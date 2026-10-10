import { z } from "zod";

const clean = (s: string) => s.trim();

export const reviewSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Enter your name.").max(80)),
  role: z
    .string()
    .transform(clean)
    .pipe(z.string().max(100, "Keep this under 100 characters."))
    .optional()
    .transform((v) => (v ? v : undefined)),
  rating: z.number().int("Choose a whole number.").min(1, "Choose a rating.").max(5),
  message: z
    .string()
    .transform(clean)
    .pipe(z.string().min(20, "Write at least 20 characters.").max(1000, "Keep it under 1000 characters.")),
  projectSlug: z
    .string()
    .max(80)
    .optional()
    .transform((v) => (v ? v : undefined)),
  /** Honeypot. Real visitors never fill this in. */
  website: z.string().max(0).optional(),
});
export type ReviewInput = z.infer<typeof reviewSchema>;

export const inquiryTypes = [
  "Project collaboration",
  "Job or internship",
  "Question",
  "Feedback",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Enter your name.").max(80)),
  email: z.string().transform(clean).pipe(z.string().email("Enter a valid email address.").max(200)),
  inquiry: z.enum(inquiryTypes, { message: "Choose what this is about." }),
  message: z
    .string()
    .transform(clean)
    .pipe(z.string().min(10, "Write at least 10 characters.").max(3000, "Keep it under 3000 characters.")),
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
