import { NextResponse } from "next/server";
import { z } from "zod";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { buildSystemPrompt, contactLine } from "@/lib/assistant";
import { siteConfig } from "@/data/site";

const bodySchema = z.object({
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(600) }))
    .min(1)
    .max(12),
});

interface OpenRouterResponse {
  choices?: { message?: { content?: string } }[];
}

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
        max_tokens: 350,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "upstream", message: `I couldn't get an answer just now. ${contactLine()}` },
        { status: 502 },
      );
    }
    const data = (await res.json()) as OpenRouterResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "upstream", message: `I couldn't get an answer just now. ${contactLine()}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ reply: reply.slice(0, 1200) });
  } catch {
    return NextResponse.json(
      { error: "upstream", message: `I couldn't get an answer just now. ${contactLine()}` },
      { status: 502 },
    );
  }
}
