import { NextResponse } from "next/server";
import { z } from "zod";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { buildSystemPrompt, contactLine, emailTool } from "@/lib/assistant";
import { siteConfig } from "@/data/site";

const bodySchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(1500) }))
    .min(1)
    .max(12),
});

const draftSchema = z.object({
  sender_name: z.string().trim().min(2).max(80),
  sender_email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(1500),
});

interface OpenRouterResponse {
  choices?: {
    message?: {
      content?: string | null;
      tool_calls?: { function?: { name?: string; arguments?: string } }[];
    };
  }[];
}

const upstreamError = () =>
  NextResponse.json({ error: "upstream", message: `I couldn't get an answer just now. ${contactLine()}` }, { status: 502 });

export async function POST(req: Request) {
  if (isRateLimited(`chat:${clientKey(req)}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "rate_limited", message: `That's a lot of questions in a short time. Please try again in a few minutes. ${contactLine()}` },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "The request could not be read." }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success || parsed.data.messages[parsed.data.messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "validation", message: "Please send a short question." }, { status: 422 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: `The assistant isn't switched on yet. ${contactLine()}` },
      { status: 503 },
    );
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteConfig.url,
        "X-Title": "Cyrus portfolio assistant",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: buildSystemPrompt() }, ...parsed.data.messages.slice(-8)],
        tools: [emailTool],
        tool_choice: "auto",
        max_tokens: 400,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return upstreamError();

    const data = (await res.json()) as OpenRouterResponse;
    const message = data.choices?.[0]?.message;
    const text = message?.content?.trim() ?? "";

    // The model asked to draft an email. We never send it here: the visitor reviews and presses Send.
    const call = message?.tool_calls?.find((c) => c.function?.name === emailTool.function.name);
    if (call?.function?.arguments) {
      try {
        const draft = draftSchema.safeParse(JSON.parse(call.function.arguments));
        if (draft.success) {
          return NextResponse.json({
            reply: text || "I've drafted your message to Cyrus. Check it below, edit anything you like, then press Send.",
            draft: { name: draft.data.sender_name, email: draft.data.sender_email, message: draft.data.message },
          });
        }
      } catch {
        // Fall through to the generic reply below.
      }
      return NextResponse.json({
        reply: text || "I need your name, a valid email address and a message (at least a sentence) to draft that email.",
      });
    }

    if (!text) return upstreamError();
    return NextResponse.json({ reply: text.slice(0, 1200) });
  } catch {
    return upstreamError();
  }
}
