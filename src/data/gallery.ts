import type { GalleryEntry } from "@/types";

/** Labels for each gallery category. The gallery only shows filter buttons for categories that have entries. */
export const galleryCategories = {
  screenshots: "Screenshots",
  previews: "Project previews",
  milestones: "Milestones",
  setup: "Development setup",
  redesigns: "Redesigns",
} as const;

/**
 * One entry per project. Real screenshots are "screenshots"; projects that only have a placeholder are
 * "previews". When you get a real screenshot, switch the entry's image and category.
 */
export const gallery: GalleryEntry[] = [
  {
    id: "student-hub",
    title: "Student Hub",
    description: "The progressive web app for student collaboration and academic management.",
    category: "screenshots",
    image: {
      src: "/images/projects/student-hub.png",
      alt: "Screenshot of the Student Hub web application",
      width: 1348,
      height: 684,
    },
    projectSlug: "student-hub",
  },
  {
    id: "elite-ballers-fc",
    title: "Elite Ballers FC",
    description: "The football club management platform, live on Render.",
    category: "screenshots",
    image: {
      src: "/images/projects/elite-ballers.png",
      alt: "Screenshot of the Elite Ballers FC website",
      width: 1366,
      height: 768,
    },
    projectSlug: "elite-ballers-fc",
  },
  {
    id: "rock-paper-scissors",
    title: "Rock Paper Scissors",
    description: "The NiceGUI game with its responsive web interface.",
    category: "screenshots",
    image: {
      src: "/images/projects/rps.png",
      alt: "Screenshot of the Rock Paper Scissors game",
      width: 1366,
      height: 768,
    },
    projectSlug: "rock-paper-scissors",
  },
  {
    id: "aurora-2-number-calculator",
    title: "Aurora 2 Number Calculator",
    description: "The calculator with its aurora-inspired dark interface.",
    category: "screenshots",
    image: {
      src: "/images/projects/auroracalc.png",
      alt: "Screenshot of the Aurora 2 Number Calculator",
      width: 1366,
      height: 768,
    },
    projectSlug: "aurora-2-number-calculator",
  },
  {
    id: "brightness-controller",
    title: "Brightness Controller",
    description: "The CustomTkinter interface of the Brightness Controller.",
    category: "screenshots",
    image: {
      src: "/images/projects/brightness.png",
      alt: "Screenshot of the Brightness Controller interface",
      width: 495,
      height: 225,
      fit: "contain",
    },
    projectSlug: "brightness-controller",
  },
  {
    id: "campus-desk",
    title: "Campus Desk",
    description: "Preview placeholder. A real screenshot will replace it.",
    category: "previews",
    image: {
      src: "/images/projects/campus-desk-placeholder.svg",
      alt: "Placeholder preview for the Campus Desk project",
      width: 640,
      height: 360,
    },
    projectSlug: "campus-desk",
  },
  {
    id: "cyrusbot",
    title: "CyrusBot",
    description: "Preview placeholder. A real screenshot will replace it.",
    category: "previews",
    image: {
      src: "/images/projects/cyrusbot-placeholder.svg",
      alt: "Placeholder preview for the CyrusBot project",
      width: 640,
      height: 360,
    },
    projectSlug: "cyrusbot",
  },
  {
    id: "maths-frenzy",
    title: "Maths Frenzy",
    description: "Preview placeholder. A real screenshot will replace it.",
    category: "previews",
    image: {
      src: "/images/projects/maths-frenzy-placeholder.svg",
      alt: "Placeholder preview for the Maths Frenzy project",
      width: 640,
      height: 360,
    },
    projectSlug: "maths-frenzy",
  },
];
