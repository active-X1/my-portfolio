"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2, Mail, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Draft {
  name: string;
  email: string;
  message: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  draft?: Draft;
}

type View = "chat" | "email";
type SendState = "idle" | "sending" | "sent" | "error";

const suggestions = ["What has Cyrus built?", "Which technologies does he use?", "Send Cyrus a message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

const fieldClass =
  "w-full rounded-lg border border-border bg-background px-3 text-base placeholder:text-muted-foreground/70 sm:text-sm";

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Matches web addresses, email addresses and Cyrus's own phone number (in the common ways it is written). */
function buildTokenRegex(phone: string) {
  const tail = phone.replace(/\D/g, "").slice(-10);
  const variants =
    tail.length === 10
      ? [phone, phone.replace(/\s+/g, ""), `0${tail}`, `+234${tail}`, `234${tail}`, `+234 ${tail.slice(0, 3)} ${tail.slice(3, 6)} ${tail.slice(6)}`]
      : [];
  const phonePart = [...new Set(variants)]
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join("|");
  return new RegExp(
    `(https?:\\/\\/[^\\s<>"')]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}${phonePart ? `|${phonePart}` : ""})`,
    "g",
  );
}

const linkClass = "font-medium text-link underline underline-offset-2 [overflow-wrap:anywhere] hover:no-underline";

/** Turns plain text into text with clickable links, emails and phone numbers. Never injects HTML. */
function linkify(text: string, regex: RegExp, phone: string, onInternal: () => void): ReactNode[] {
  const tail = phone.replace(/\D/g, "").slice(-10);
  return text.split(regex).map((part, i) => {
    if (i % 2 === 0) return part;

    if (/^https?:\/\//i.test(part)) {
      const trailing = part.match(/[.,;:!?]+$/)?.[0] ?? "";
      const address = trailing ? part.slice(0, -trailing.length) : part;
      let node: ReactNode = (
        <a href={address} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {address}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      );
      try {
        const url = new URL(address);
        if (typeof window !== "undefined" && url.origin === window.location.origin) {
          node = (
            <Link href={`${url.pathname}${url.search}${url.hash}`} onClick={onInternal} className={linkClass}>
              {address}
            </Link>
          );
        }
      } catch {
        // Not a parseable address: keep it as a normal external link.
      }
      return (
        <Fragment key={i}>
          {node}
          {trailing}
        </Fragment>
      );
    }

    if (part.includes("@")) {
      return (
        <a key={i} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      );
    }

    const clean = part.replace(/[^\d+]/g, "");
    const href = clean.startsWith("+") ? clean : clean.startsWith("234") ? `+${clean}` : `+234${tail}`;
    return (
      <a key={i} href={`tel:${href}`} className={linkClass}>
        {part}
      </a>
    );
  });
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
  const [view, setView] = useState<View>("chat");
  const [bubble, setBubble] = useState<"hidden" | "shown" | "fading">("hidden");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Draft>({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof Draft, string>>>({});
  const [sendState, setSendState] = useState<SendState>("idle");
  const [sendNote, setSendNote] = useState("");

  const tokenRegex = useMemo(() => buildTokenRegex(phone), [phone]);
  // Close the panel after following an on-site link on small screens so the page underneath is visible.
  const onInternalLink = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  };
  const nextId = useRef(1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const formNameRef = useRef<HTMLInputElement>(null);

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
    if (!open) return;
    setBubble("hidden");
    if (view === "chat") inputRef.current?.focus();
    else formNameRef.current?.focus();
  }, [open, view]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function openEmail(draft?: Draft) {
    setForm((f) => draft ?? f);
    setFormErrors({});
    setSendState("idle");
    setSendNote("");
    setView("email");
    setOpen(true);
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
      const data = (await res.json().catch(() => ({}))) as { reply?: string; message?: string; draft?: Draft };
      const reply =
        res.ok && data.reply
          ? data.reply
          : (data.message ?? `Something went wrong. You can reach Cyrus at ${email} or on ${phone}.`);
      setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: reply, draft: res.ok ? data.draft : undefined }]);
    } catch {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", content: `I couldn't connect just now. You can reach Cyrus at ${email} or on ${phone}.` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (sendState === "sending") return;
    const errors: Partial<Record<keyof Draft, string>> = {};
    if (form.name.trim().length < 2) errors.name = "Enter your name.";
    if (!emailPattern.test(form.email.trim())) errors.email = "Enter a valid email address.";
    const len = form.message.trim().length;
    if (len < 10) errors.message = "Write at least 10 characters.";
    if (len > 1500) errors.message = "Keep it under 1500 characters.";
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSendState("sending");
    setSendNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          inquiry: "Something else",
          message: `Sent through the portfolio assistant.\n\n${form.message}`,
          website: "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      if (res.ok) {
        setSendState("sent");
        setMessages((m) => [...m, { id: nextId.current++, role: "assistant", content: "Your message has been sent to Cyrus. He can reply to the email address you gave." }]);
        setForm({ name: "", email: "", message: "" });
        return;
      }
      setSendNote(data.message ?? "Your message could not be sent.");
      setSendState("error");
    } catch {
      setSendNote("The network request failed. Your message was not sent.");
      setSendState("error");
    }
  }

  const setField = (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-20 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label={view === "chat" ? "Ask about Cyrus" : "Send Cyrus a message"}
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
          className="pointer-events-auto flex max-h-[min(36rem,calc(100dvh-6.5rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl motion-safe:animate-pop-in sm:w-[24rem]"
        >
          <div className="flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-2.5 sm:px-4 sm:py-3">
            {view === "chat" ? (
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <RobotFace className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold leading-tight">Ask about Cyrus</p>
                  <p className="truncate text-[11px] leading-tight text-muted-foreground">AI assistant. It only knows about Cyrus.</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setView("chat")}
                className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to chat
              </button>
            )}
            <div className="flex shrink-0 items-center gap-1">
              {view === "chat" && (
                <button
                  type="button"
                  onClick={() => openEmail()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-link hover:bg-muted"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email Cyrus
                </button>
              )}
              <button
                type="button"
                onClick={close}
                aria-label="Close assistant"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {view === "chat" ? (
            <>
              <div role="log" aria-live="polite" aria-label="Conversation" className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
                {!configured && (
                  <p className="rounded-lg bg-muted px-3 py-2 text-sm leading-6 text-muted-foreground">
                    The AI chat isn&apos;t switched on yet. You can still use &ldquo;Email Cyrus&rdquo; above, or reach him at{" "}
                    {linkify(`${email} or on ${phone}.`, tokenRegex, phone, onInternalLink)}
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
                  <div key={m.id} className={cn("flex flex-col gap-2", m.role === "user" ? "items-end" : "items-start")}>
                    <p
                      className={cn(
                        "max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-6",
                        m.role === "user" ? "bg-accent text-accent-foreground" : "bg-muted text-foreground",
                      )}
                    >
                      {m.role === "assistant" ? linkify(m.content, tokenRegex, phone, onInternalLink) : m.content}
                    </p>
                    {m.draft && (
                      <div className="w-full max-w-[92%] rounded-xl border border-border p-3 text-sm">
                        <p className="font-medium">Draft email to Cyrus</p>
                        <p className="mt-1 line-clamp-3 break-words text-muted-foreground">{m.draft.message}</p>
                        <button
                          type="button"
                          onClick={() => openEmail(m.draft)}
                          className="mt-2.5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3 text-sm font-medium text-accent-foreground hover:bg-accent/90"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          Review and send
                        </button>
                      </div>
                    )}
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
                className="flex shrink-0 items-center gap-2 border-t border-border p-3"
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
                  placeholder={configured ? "Ask about Cyrus" : "AI chat not available yet"}
                  className={cn(fieldClass, "h-11 min-w-0 flex-1 disabled:opacity-60")}
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
            </>
          ) : sendState === "sent" ? (
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 text-center" role="status">
              <CheckCircle2 className="mx-auto h-8 w-8 text-success" aria-hidden="true" />
              <p className="mt-3 font-medium">Message sent</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">Cyrus will reply to the email address you gave.</p>
              <button
                type="button"
                onClick={() => setView("chat")}
                className="mt-4 inline-flex h-10 items-center rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted"
              >
                Back to chat
              </button>
            </div>
          ) : (
            <form onSubmit={submitEmail} noValidate className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground">
                This goes straight to Cyrus&apos;s inbox. Check it, then press Send.
              </p>
              <div>
                <label htmlFor="assistant-name" className="mb-1 block text-sm font-medium">
                  Your name
                </label>
                <input
                  ref={formNameRef}
                  id="assistant-name"
                  value={form.name}
                  onChange={setField("name")}
                  autoComplete="name"
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? "assistant-name-error" : undefined}
                  className={cn(fieldClass, "h-11")}
                />
                {formErrors.name && (
                  <p id="assistant-name-error" className="mt-1 text-xs text-danger" role="alert">
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="assistant-email" className="mb-1 block text-sm font-medium">
                  Your email
                </label>
                <input
                  id="assistant-email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  autoComplete="email"
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? "assistant-email-error" : undefined}
                  className={cn(fieldClass, "h-11")}
                />
                {formErrors.email && (
                  <p id="assistant-email-error" className="mt-1 text-xs text-danger" role="alert">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="assistant-message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="assistant-message"
                  value={form.message}
                  onChange={setField("message")}
                  rows={5}
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? "assistant-message-error" : undefined}
                  className={cn(fieldClass, "min-h-28 py-2.5")}
                />
                {formErrors.message && (
                  <p id="assistant-message-error" className="mt-1 text-xs text-danger" role="alert">
                    {formErrors.message}
                  </p>
                )}
              </div>
              {sendState === "error" && (
                <p className="text-sm leading-5 text-danger" role="alert">
                  {sendNote} You can also reach Cyrus at {linkify(`${email} or on ${phone}.`, tokenRegex, phone, onInternalLink)}
                </p>
              )}
              <button
                type="submit"
                disabled={sendState === "sending"}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-medium text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
              >
                {sendState === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                {sendState === "sending" ? "Sending" : "Send message"}
              </button>
            </form>
          )}
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
        onClick={() => {
          setView("chat");
          setOpen((o) => !o);
        }}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Ask the assistant about Cyrus"}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground opacity-60 shadow-lg transition-[opacity,transform] duration-200 hover:scale-105 hover:opacity-100 focus-visible:opacity-100 active:scale-95 active:opacity-100 aria-expanded:opacity-100 motion-safe:animate-wobble motion-reduce:transition-none"
      >
        <RobotFace className="h-8 w-8" />
      </button>
    </div>
  );
}
