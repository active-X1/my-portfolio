"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = ["What has Cyrus built?", "Which technologies does he use?", "How can I contact him?"];

/** A cheerful little robot face. Eyes blink; the whole button wobbles now and then (motion-safe only). */
function RobotFace({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <line x1="16" y1="3.5" x2="16" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="3.2" r="1.9" fill="currentColor" />
      <rect x="5" y="8" width="22" height="18" rx="6" stroke="currentColor" strokeWidth="2" />
      <g className="origin-center motion-safe:animate-blink" style={{ transformBox: "fill-box" }}>
        <circle cx="12" cy="16" r="2.1" fill="currentColor" />
        <circle cx="20" cy="16" r="2.1" fill="currentColor" />
      </g>
      <path d="M11.5 21c1.4 1.5 7.6 1.5 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AssistantWidget({
  configured,
  email,
  phone,
}: {
  configured: boolean;
  email: string;
  phone: string;
}) {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState<"hidden" | "shown" | "fading">("hidden");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  // Greeting bubble: once per visit, visible for 3 seconds, then fades out.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("assistant-greeted") === "1";
      if (!seen) sessionStorage.setItem("assistant-greeted", "1");
    } catch {
      // Storage can be blocked. Showing the greeting once per page load is fine.
    }
    if (seen) return;
    const show = window.setTimeout(() => setBubble("shown"), 900);
    const fade = window.setTimeout(() => setBubble("fading"), 900 + 3000);
    const hide = window.setTimeout(() => setBubble("hidden"), 900 + 3000 + 600);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(fade);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setBubble("hidden");
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  async function send(text: string) {
    const content = text.trim().slice(0, 500);
    if (!content || loading) return;
    const userMsg: Message = { id: nextId.current++, role: "user", content };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-8).map(({ role, content: c }) => ({ role, content: c })) }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; message?: string };
      const reply =
        res.ok && data.reply
          ? data.reply
          : (data.message ?? `Something went wrong. You can reach Cyrus at ${email} or on ${phone}.`);
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", content: `I couldn't connect just now. You can reach Cyrus at ${email} or on ${phone}.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-20 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Ask about Cyrus"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="pointer-events-auto flex max-h-[min(34rem,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl motion-safe:animate-pop-in sm:w-[24rem]"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <RobotFace className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold leading-tight">Ask about Cyrus</p>
                <p className="text-[11px] leading-tight text-muted-foreground">AI assistant. It only knows about Cyrus.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close assistant"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div role="log" aria-live="polite" aria-label="Conversation" className="min-h-[11rem] flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
            {!configured && (
              <p className="rounded-lg bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
                The assistant isn&apos;t switched on yet. You can reach Cyrus at {email} or on {phone}.
              </p>
            )}
            {messages.length === 0 && configured && (
              <div>
                <p className="text-sm leading-6 text-muted-foreground">
                  Hi! I know about Cyrus and his projects. Ask me anything about him. If I don&apos;t know, I&apos;ll give you his email and phone number.
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-border px-3 py-1.5 text-left text-xs font-medium hover:bg-muted"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <p
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-6",
                    m.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground",
                  )}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {loading && (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Thinking
              </p>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <label htmlFor="assistant-input" className="sr-only">
              Your question about Cyrus
            </label>
            <input
              ref={inputRef}
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              autoComplete="off"
              disabled={!configured}
              placeholder={configured ? "Ask about Cyrus" : "Not available yet"}
              className="h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-base placeholder:text-muted-foreground/70 disabled:opacity-60 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!configured || loading || input.trim() === ""}
              aria-label="Send question"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      {!open && bubble !== "hidden" && (
        <p
          aria-hidden="true"
          className={cn(
            "relative max-w-[15rem] rounded-2xl rounded-br-sm border border-border bg-card px-3.5 py-2.5 text-sm leading-5 shadow-lg transition-opacity duration-500",
            bubble === "fading" ? "opacity-0" : "opacity-100",
          )}
        >
          Hi! I know about Cyrus and his projects. Ask me anything about him.
        </p>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask the assistant about Cyrus"}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 motion-safe:animate-wobble motion-reduce:transition-none"
      >
        <RobotFace className="h-8 w-8" />
      </button>
    </div>
  );
}
