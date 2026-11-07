import type { Project, ProjectGroup } from "@/types";

export const groupMeta: Record<ProjectGroup, { label: string }> = {
  web: { label: "Web Applications" },
  desktop: { label: "Desktop Applications" },
  "automation-ai": { label: "Automation & AI" },
  interactive: { label: "Interactive Applications" },
};

/**
 * `languageStats` are the repository language percentages reported by GitHub.
 * They describe code in the repository, not personal proficiency.
 * Each set must total 100 (checked at build time in lib/integrity.ts).
 * Replace `image` with a real screenshot whenever you have one.
 */
export const projects: Project[] = [
  {
    slug: "student-hub",
    name: "Student Hub",
    progress: 80,
    summary: "Progressive web app for student collaboration and academic management.",
    description:
      "A progressive web application for student collaboration and academic management within a Computer Science department.",
    group: "web",
    featured: true,
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "PostgreSQL"],
    languageStats: [
      { name: "JavaScript", percent: 86.2 },
      { name: "CSS", percent: 8.4 },
      { name: "HTML", percent: 4.1 },
      { name: "PLpgSQL", percent: 1.3 },
    ],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/student-hub-placeholder.svg",
      alt: "Placeholder preview for the Student Hub project",
      width: 640,
      height: 360,
    },
    screenshots: [
      {
        src: "/images/projects/student-hub.png",
        alt: "Screenshot of the Student Hub web application",
        width: 1348,
        height: 684,
      caption: "The Student Hub progressive web app for student collaboration and academic management.",
      },
    ],
    github: "https://github.com/active-X1/student-hub",
    problem:
      "Students in a department need one place to follow academic announcements, read department feeds and manage assignments.",
    features: [
      "Student authentication",
      "Academic announcements",
      "Department feeds",
      "Hashtag-based feed search",
      "Private assignments",
      "Department-published assignments",
      "Administrative dashboard",
      "Progressive Web App architecture",
    ],
    related: ["elite-ballers-fc", "campus-desk", "cyrusbot"],
  },
  {
    slug: "elite-ballers-fc",
    name: "Elite Ballers FC",
    summary: "Mobile-first football club management platform with an admin dashboard.",
    description:
      "A mobile-first football club management platform built with HTML, CSS, JavaScript and Supabase.",
    group: "web",
    featured: true,
    technologies: ["HTML", "CSS", "JavaScript", "Supabase", "PostgreSQL", "Render"],
    languageStats: [
      { name: "HTML", percent: 56.6 },
      { name: "CSS", percent: 23.4 },
      { name: "JavaScript", percent: 15 },
      { name: "PLpgSQL", percent: 5 },
    ],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/elite-ballers-fc-placeholder.svg",
      alt: "Placeholder preview for the Elite Ballers FC project",
      width: 640,
      height: 360,
    },
    screenshots: [
      {
        src: "/images/projects/elite-ballers.png",
        alt: "Screenshot of the Elite Ballers FC website",
        width: 1366,
        height: 768,
      caption: "The Elite Ballers FC football club management platform, live on Render.",
      },
    ],
    github: "https://github.com/active-X1/elite_ballers_fc",
    live: "https://elite-ballers-fc.onrender.com/",
    problem:
      "A football club needs one place to manage its players, fixtures, results, news and weekly dues, with a secure area for administrators.",
    features: [
      "Player management",
      "Fixtures",
      "Match results",
      "Club news",
      "Photo galleries",
      "Weekly dues tracking",
      "Secure administrative dashboard",
      "Supabase authentication",
      "Database and storage integration",
    ],
    related: ["student-hub", "campus-desk", "cyrusbot"],
  },
  {
    slug: "campus-desk",
    name: "Campus Desk",
    alias: "Student Management System",
    summary: "Python student management system with desktop, mobile, web and terminal interfaces.",
    description:
      "A Python-based cross-platform student management system supporting desktop, mobile, web and terminal interfaces.",
    group: "desktop",
    technologies: ["Python", "SQLite", "CSV"],
    languageStats: [{ name: "Python", percent: 100 }],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/campus-desk-placeholder.svg",
      alt: "Placeholder preview for the Campus Desk project",
      width: 640,
      height: 360,
    },
    github: "https://github.com/active-X1/Student-Management-System",
    problem:
      "Schools and departments need to keep student records organised, searchable and exportable, on whichever device is at hand.",
    features: [
      "Student records management",
      "Analytics",
      "Search and sorting",
      "CSV export",
      "SQLite storage",
      "Multiple application interfaces",
    ],
    related: ["student-hub", "aurora-2-number-calculator", "rock-paper-scissors"],
  },
  {
    slug: "cyrusbot",
    name: "CyrusBot",
    summary: "Modular WhatsApp automation platform built with Node.js and Baileys.",
    description: "A modular WhatsApp automation platform built with Node.js and Baileys.",
    group: "automation-ai",
    technologies: ["JavaScript", "Node.js", "Baileys", "OpenRouter", "HTML"],
    languageStats: [
      { name: "JavaScript", percent: 93.3 },
      { name: "HTML", percent: 6.7 },
    ],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/cyrusbot-placeholder.svg",
      alt: "Placeholder preview for the CyrusBot project",
      width: 640,
      height: 360,
    },
    github: "https://github.com/active-X1/CyrusBot",
    problem: "Automating conversations, group management and utilities on WhatsApp from one modular bot.",
    features: [
      "AI-powered conversations",
      "Group moderation",
      "Encryption utilities",
      "Image generation",
      "Interactive games",
      "Custom commands",
      "QR-code authentication",
      "Pairing-code authentication",
    ],
    related: ["student-hub", "elite-ballers-fc", "rock-paper-scissors"],
  },
  {
    slug: "rock-paper-scissors",
    name: "Rock Paper Scissors",
    summary: "NiceGUI game with a responsive web interface and terminal gameplay.",
    description:
      "A Python game built with NiceGUI featuring a responsive web interface and terminal gameplay.",
    group: "interactive",
    technologies: ["Python", "NiceGUI", "SVG"],
    languageStats: [{ name: "Python", percent: 100 }],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/rock-paper-scissors-placeholder.svg",
      alt: "Placeholder preview for the Rock Paper Scissors project",
      width: 640,
      height: 360,
    },
    screenshots: [
      {
        src: "/images/projects/rps.png",
        alt: "Screenshot of the Rock Paper Scissors game",
        width: 1366,
        height: 768,
      caption: "The Rock Paper Scissors game and its responsive NiceGUI web interface.",
      },
    ],
    github: "https://github.com/active-X1/Rock-paper-scissors",
    features: [
      "Interactive gameplay",
      "Live score tracking",
      "Win streaks",
      "Keyboard shortcuts",
      "Round history",
      "Custom SVG artwork",
      "Terminal gameplay",
    ],
    related: ["maths-frenzy", "aurora-2-number-calculator", "campus-desk"],
  },
  {
    slug: "maths-frenzy",
    name: "Maths Frenzy",
    summary: "Timed mental-maths game and calculator with terminal, desktop and web interfaces.",
    description:
      "A fast-paced mental-maths game and calculator, in your terminal, on your desktop, or in your browser. Beat the clock: 20 questions, 20 seconds each, three difficulty levels and four operations. It includes a safe built-in calculator, and one game engine powers all three interfaces.",
    group: "interactive",
    technologies: ["Python", "Tkinter", "NiceGUI"],
    languageStats: [{ name: "Python", percent: 100 }],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/maths-frenzy-placeholder.svg",
      alt: "Placeholder preview for the Maths Frenzy project",
      width: 640,
      height: 360,
    },
    github: "https://github.com/active-X1/Maths-Frenzy",
    problem: "Practising quick mental arithmetic with a game that adds time pressure.",
    features: [
      "Timed challenges: 20 questions, 20 seconds each",
      "Three difficulty levels",
      "Four arithmetic operations",
      "Score tracking",
      "Safe built-in calculator",
      "One game engine shared by every interface",
      "Terminal interface",
      "Desktop interface (Tkinter)",
      "Web interface (NiceGUI)",
    ],
    related: ["rock-paper-scissors", "campus-desk", "aurora-2-number-calculator"],
  },
  {
    slug: "aurora-2-number-calculator",
    name: "Aurora 2 Number Calculator",
    summary: "Python calculator with an aurora-inspired dark interface.",
    description: "A Python calculator featuring an aurora-inspired dark interface.",
    group: "desktop",
    technologies: ["Python", "Tkinter"],
    languageStats: [{ name: "Python", percent: 100 }],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/aurora-2-number-calculator-placeholder.svg",
      alt: "Placeholder preview for the Aurora 2 Number Calculator project",
      width: 640,
      height: 360,
    },
    screenshots: [
      {
        src: "/images/projects/auroracalc.png",
        alt: "Screenshot of the Aurora 2 Number Calculator",
        width: 1366,
        height: 768,
      caption: "The Aurora 2 Number Calculator and its aurora-inspired dark interface.",
      },
    ],
    github: "https://github.com/active-X1/Aurora-2-num-calc",
    features: [
      "Six arithmetic operations",
      "Precise decimal calculations",
      "Calculation history",
      "Keyboard shortcuts",
      "Interactive terminal mode",
      "No third-party runtime dependencies",
    ],
    related: ["brightness-controller", "rock-paper-scissors", "campus-desk"],
  },
  {
    slug: "brightness-controller",
    name: "Brightness Controller",
    summary: "Lightweight Python desktop app for screen brightness, built with CustomTkinter.",
    description:
      "A lightweight Python desktop application for controlling screen brightness through a clean CustomTkinter interface.",
    group: "desktop",
    technologies: ["Python", "CustomTkinter", "screen_brightness_control"],
    languageStats: [{ name: "Python", percent: 100 }],
    // Card and project-page image: a themed placeholder. Real screenshots go in `screenshots` below.
    image: {
      src: "/images/projects/brightness-controller-placeholder.svg",
      alt: "Placeholder preview for the Brightness Controller project",
      width: 640,
      height: 360,
    },
    screenshots: [
      {
        src: "/images/projects/brightness.png",
        alt: "Screenshot of the Brightness Controller interface",
        width: 495,
        height: 225,
      caption: "The CustomTkinter interface of the Brightness Controller.",
        fit: "contain",
      },
    ],
    github: "https://github.com/active-X1/brightness_controller",
    features: [
      "Brightness adjustment slider",
      "Current brightness display",
      "Monitor brightness integration",
      "Theme switching",
      "About dialog",
    ],
    related: ["aurora-2-number-calculator", "campus-desk", "rock-paper-scissors"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function allTechnologies(list: Project[]): string[] {
  return [...new Set(list.flatMap((p) => p.technologies))].sort((a, b) => a.localeCompare(b));
}

export function formatPercent(n: number): string {
  return `${Number.isInteger(n) ? n : n.toFixed(1)}%`;
}
