import type { Project, ProjectCategory, ProjectStatus } from "@/types";

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; description: string; emptyMessage: string }
> = {
  beginner: {
    label: "Beginner",
    description: "Early learning projects: small Python programs, calculators and utilities.",
    emptyMessage: "No beginner projects match.",
  },
  intermediate: {
    label: "Intermediate",
    description: "Applications with a graphical interface, more structure or several modules.",
    emptyMessage: "No intermediate projects match.",
  },
  advanced: {
    label: "Advanced / Flagship",
    description:
      "Substantial multi-component systems: full-stack apps, meaningful bots, working AI systems.",
    emptyMessage:
      "There are no flagship projects yet. I only list a project here once it is built and its complexity can be explained honestly. School Portal and an agentic AI system are the candidates.",
  },
};

export const statusMeta: Record<ProjectStatus, { label: string }> = {
  completed: { label: "Completed" },
  "in-progress": { label: "In progress" },
  prototype: { label: "Prototype" },
  archived: { label: "Archived" },
};

/**
 * Percentages in `breakdown` are my own estimates unless `breakdownBasis` is "measured".
 * Each breakdown must total exactly 100 (checked at build time in lib/integrity.ts).
 */
export const projects: Project[] = [
  {
    slug: "digit-calculator-0-9",
    name: "0-9 Digit Calculator",
    description: "A calculator with a full set of digit keys, built with a Tkinter interface.",
    category: "beginner",
    classificationNote:
      "A single-purpose utility app: early work in event handling and building a desktop interface.",
    status: "completed",
    featured: true,
    languages: ["Python"],
    technologies: ["Tkinter"],
    breakdown: [{ tech: "Python", percent: 100 }],
    breakdownBasis: "estimate",
    image: {
      src: "/images/projects/calculator-09.png",
      alt: "Screenshot of the 0-9 Digit Calculator interface",
      width: 321,
      height: 218,
    },
    github: "https://github.com/active-X1/0-9-digit-cal",
    overview: "A desktop calculator with a Tkinter interface covering the digits 0 to 9.",
    features: ["Digit keys from 0 to 9", "Graphical interface built with Tkinter"],
    related: ["two-number-calculator", "brightness-controller"],
  },
  {
    slug: "two-number-calculator",
    name: "Two Number Calculator",
    description: "A Tkinter calculator for arithmetic operations on two numbers.",
    category: "beginner",
    classificationNote: "One of my first programs, later rebuilt with a graphical interface.",
    status: "completed",
    languages: ["Python"],
    technologies: ["Tkinter"],
    breakdown: [{ tech: "Python", percent: 100 }],
    breakdownBasis: "estimate",
    image: {
      src: "/images/projects/two-number-calculator.png",
      alt: "Screenshot of the Two Number Calculator interface",
      width: 594,
      height: 420,
    },
    github: "https://github.com/active-X1/Tkinter-two-number-calculator-",
    overview: "A desktop calculator that performs operations on two numbers.",
    features: ["Operations on two numbers", "Graphical interface built with Tkinter"],
    related: ["digit-calculator-0-9", "maths-frenzy"],
  },
  {
    slug: "maths-frenzy",
    name: "Maths Frenzy",
    description: "An interactive maths game with multiple difficulty levels.",
    category: "intermediate",
    classificationNote:
      "A game with state, scoring and several difficulty levels, more involved than a one-screen utility.",
    status: "completed",
    featured: true,
    languages: ["Python"],
    technologies: [],
    breakdown: [{ tech: "Python", percent: 100 }],
    breakdownBasis: "estimate",
    image: {
      src: "/images/projects/maths-frenzy.png",
      alt: "Screenshot of the Maths Frenzy game",
      width: 594,
      height: 430,
    },
    github: "https://github.com/active-X1/Maths-Frenzy",
    overview: "An interactive maths game that offers several difficulty levels.",
    features: ["Interactive maths gameplay", "Multiple difficulty levels"],
    related: ["two-number-calculator", "brightness-controller"],
  },
  {
    slug: "brightness-controller",
    name: "Brightness Controller",
    description: "A Tkinter app for controlling screen brightness, with a polished interface.",
    category: "intermediate",
    classificationNote:
      "A desktop utility with a custom-styled interface that talks to the system rather than only doing calculations.",
    status: "completed",
    featured: true,
    languages: ["Python"],
    technologies: ["Tkinter"],
    breakdown: [{ tech: "Python", percent: 100 }],
    breakdownBasis: "estimate",
    image: {
      src: "/images/projects/brightness.jpg",
      alt: "Screenshot of the Brightness Controller interface",
      width: 495,
      height: 225,
    },
    github: "https://github.com/active-x1/brightness_controller",
    overview: "A desktop app for adjusting screen brightness, with a custom-styled Tkinter interface.",
    features: ["Screen brightness control", "Custom-styled Tkinter interface"],
    related: ["digit-calculator-0-9", "maths-frenzy"],
  },
  {
    slug: "school-portal",
    name: "School Portal",
    description: "A student management system and academic portal, in early development.",
    category: "intermediate",
    classificationNote:
      "Planned as a multi-module system, but only about 10% built, so it is not listed as advanced yet.",
    status: "in-progress",
    languages: [],
    technologies: [],
    github: "https://github.com/active-X1/School-Portal",
    overview:
      "A student management system and academic portal. It is roughly 10% complete and the technology stack has not been finalised.",
    related: ["brightness-controller", "maths-frenzy"],
  },
  {
    slug: "elite-ballers-fc",
    name: "Elite Ballers FC",
    description: "A football club website that gives the club a dedicated online presence.",
    category: "intermediate",
    classificationNote:
      "Listed as intermediate because it is a deployed website with a hosted data service behind it. It may move up once its architecture is documented from the source.",
    status: "completed",
    languages: ["HTML", "CSS", "JavaScript"],
    technologies: ["Supabase", "Render"],
    // Replace with a real screenshot later: put the file in public/images/projects/ and update `src`.
    image: {
      src: "/images/projects/elite-ballers-fc-placeholder.svg",
      alt: "Placeholder preview for the Elite Ballers FC project",
      width: 640,
      height: 400,
    },
    github: "https://github.com/active-X1/elite_ballers_fc",
    live: "https://elite-ballers-fc.onrender.com",
    overview:
      "Elite Ballers FC is a football club website. It presents the club's identity, information and activities on a dedicated web platform, and it is deployed online on Render.",
    problem:
      "The club needed an online presence of its own: a place to present who it is and what it does, reachable from anywhere.",
    features: [
      "A dedicated online presence for the football club",
      "Club identity and information presented on the website",
      "Live deployment on Render",
    ],
    architecture:
      "A website built with HTML, CSS and JavaScript, using Supabase for application data and backend integration, and deployed on Render. A fuller architecture write-up will follow once it is documented from the source.",
    contribution:
      "I built this as a personal development project. I was responsible for building and improving the website, working with its codebase, integrating the technologies it uses and preparing it for deployment.",
    related: ["school-portal", "maths-frenzy"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFacets(list: Project[]) {
  const languages = [...new Set(list.flatMap((p) => p.languages))].sort((a, b) => a.localeCompare(b));
  const technologies = [...new Set(list.flatMap((p) => p.technologies))].sort((a, b) =>
    a.localeCompare(b),
  );
  return { languages, technologies };
}
