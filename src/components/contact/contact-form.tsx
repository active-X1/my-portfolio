"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { contactSchema, fieldErrors, inquiryTypes } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", inquiry: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string; fields?: Record<string, string> };
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", inquiry: "", message: "", website: "" });
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFeedback(data.message ?? "Your message could not be sent.");
      setStatus("error");
    } catch {
      setFeedback("The network request failed. Your message was not sent.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-border bg-card p-6" role="status">
        <p className="flex items-center gap-2 font-medium text-success">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Message sent
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Thanks for reaching out. I will reply to the email address you gave.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-xl border border-border bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={errors.name}>
          <Input id="contact-name" value={values.name} onChange={set("name")} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={errors.email}>
          <Input id="contact-email" type="email" value={values.email} onChange={set("email")} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
        </Field>
      </div>
      <Field label="What is this about?" htmlFor="contact-inquiry" error={errors.inquiry}>
        <Select id="contact-inquiry" value={values.inquiry} onChange={set("inquiry")} required aria-invalid={Boolean(errors.inquiry)} aria-describedby={errors.inquiry ? "contact-inquiry-error" : undefined}>
          <option value="">Choose one</option>
          {inquiryTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Message" htmlFor="contact-message" error={errors.message}>
        <Textarea id="contact-message" value={values.message} onChange={set("message")} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} />
      </Field>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      {status === "error" && (
        <p className="flex items-start gap-2 text-sm text-danger" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {feedback} You can also reach me through the links beside this form.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {status === "submitting" ? "Sending" : "Send message"}
      </Button>
    </form>
  );
}
