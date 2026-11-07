import { siteConfig } from "./site";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
}

/**
 * Shown on /faq, added to the AI assistant's knowledge, and published as FAQ structured data.
 * Answers are built from the site's own details so they stay accurate. Keep answers factual.
 */
export const faqs: FaqItem[] = [
  {
    id: "what-does-he-build",
    question: "What kind of software does Cyrus build?",
    answer:
      "Cyrus builds web, desktop and automation applications. His projects include Student Hub, a progressive web app for a Computer Science department; Elite Ballers FC, a football club management platform; Campus Desk, a cross-platform student management system; CyrusBot, a WhatsApp automation platform; and Python desktop and interactive apps such as Maths Frenzy.",
    links: [{ label: "See all projects", href: "/projects" }],
  },
  {
    id: "technologies",
    question: "Which technologies does he work with?",
    answer:
      "Python and JavaScript are his core technologies, and he has good proficiency in React and TypeScript. He also works with Node.js, Express.js, PostgreSQL, Supabase, SQLite, Tkinter, CustomTkinter and NiceGUI.",
    links: [{ label: "View technologies", href: "/technologies" }],
  },
  {
    id: "contact",
    question: "Is Cyrus open to working together, and how can I reach him?",
    answer: `${siteConfig.availability.label}. You can email him at ${siteConfig.email}, call or message him on WhatsApp at ${siteConfig.phone}, or use the contact form.`,
    links: [{ label: "Open the contact page", href: "/contact" }],
  },
];
