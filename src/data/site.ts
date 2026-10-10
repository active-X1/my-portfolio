export const siteConfig = {
  name: "Cyrus Akacha Cyprian",
  shortName: "Cyrus",
  title: "Software Developer | Python & Full-Stack Development",
  description:
    "Portfolio of Cyrus Akacha Cyprian, a developer exploring Python, full-stack engineering, automation and agentic AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /** Taken from the original portfolio. Change it here if it is no longer correct. */
  email: "cyrusakacha@gmail.com",
  availability: {
    show: true,
    label: "Open to collaborations, learning opportunities and entry-level roles",
  },
  /** "dark" always starts dark. "system" follows the visitor's OS when nothing is saved. */
  themeDefault: "dark" as "dark" | "system",
  tagline: "Build with purpose. Learn continuously. Turn ideas into working software.",
  quote:
    "I don't just want to write code. I want to understand the systems I build and create software that works.",
  headline: "Building Practical Software. Growing Into What's Next.",
  intro:
    "I'm Cyrus Akacha Cyprian, a developer exploring Python, full-stack engineering, automation, and agentic AI. I build practical applications, learn through real projects, and continuously improve how I design and engineer software.",
  portrait: {
    src: "/images/profile.jpg",
    alt: "Portrait of Cyrus Akacha Cyprian",
    width: 1024,
    height: 1171,
  },
};
