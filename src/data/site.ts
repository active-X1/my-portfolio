/**
 * The single place the site's public URL is decided. Always returns a valid absolute origin
 * (for example https://example.com), so it is safe to pass to `new URL()`.
 *
 * Order: NEXT_PUBLIC_SITE_URL, then Vercel's production URL, then Vercel's deployment URL, then localhost.
 * Values without a protocol (Vercel supplies its own that way, and so can a hand-typed variable) get https://.
 */
function resolveSiteUrl(): string {
  const fallback = "http://localhost:3000";
  const raw = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    ""
  ).trim();
  if (!raw) return fallback;
  const isLocal = /^(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(raw);
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `${isLocal ? "http" : "https"}://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: "Cyrus Akacha Cyprian",
  shortName: "Cyrus",
  title: "Software Developer | Python | React | TypeScript | Full-Stack Application Development",
  metaTitle: "Software Developer",
  description:
    "Portfolio of Cyrus Akacha Cyprian, an emerging software developer building web, desktop and automation applications with Python, JavaScript, React and TypeScript.",
  url: resolveSiteUrl(),
  /** Taken from the original portfolio. Change it here if it is no longer correct. */
  email: "cyrusakacha@gmail.com",
  /** Shown by the assistant when it cannot answer a question. */
  phone: "08066761823",
  phoneDisplay: "+234 806 676 1823",
  availability: {
    show: true,
    label: "Open to collaborations, learning opportunities and entry-level roles",
  },
  /** "dark" always starts dark. "system" follows the visitor's OS when nothing is saved. */
  themeDefault: "dark" as "dark" | "system",
  tagline: "Build with purpose. Learn continuously. Turn ideas into working software.",
  quote:
    "I don't just want to write code. I want to understand the systems I build and create software that works.",
  headline: "Practical software, built from idea to deployment.",
  intro:
    "I'm Cyrus Akacha Cyprian, an emerging software developer building web, desktop and automation applications with Python, JavaScript, React and TypeScript. I like taking ideas beyond prototypes and understanding the systems I build.",
  portrait: {
    src: "/images/profile.jpg",
    alt: "Portrait of Cyrus Akacha Cyprian",
    width: 1024,
    height: 1171,
  },
};
