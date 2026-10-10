import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: Request) {
  if (isRateLimited(`contact:${clientKey(req)}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "rate_limited", message: "Too many messages. Try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "The request could not be read." }, { status: 400 });
  }

  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: unknown }).website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "not_configured", message: "Message delivery is not set up on this site yet. Your message was not sent." },
      { status: 503 },
    );
  }

  const { name, email, inquiry, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${inquiry} from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${inquiry}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "upstream", message: "Your message could not be sent. Please try again later." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "upstream", message: "Your message could not be sent. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
