export const siteConfig = {
  name: "Cyrus Akacha Cyprian",
  shortName: "Cyrus",
  title: "Software Developer | Python | React | TypeScript | Full-Stack Application Development",
  metaTitle: "Software Developer",
  description:
    "Portfolio of Cyrus Akacha Cyprian, an emerging software developer building web, desktop and automation applications with Python, JavaScript, React and TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
