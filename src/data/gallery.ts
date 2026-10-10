import type { GalleryEntry } from "@/types";

export const galleryCategories = {
  screenshots: "Screenshots",
  milestones: "Milestones",
  setup: "Development setup",
  redesigns: "Redesigns",
} as const;

export const gallery: GalleryEntry[] = [
  {
    id: "brightness-controller-ui",
    title: "Brightness Controller interface",
    description: "The custom-styled Tkinter interface of the Brightness Controller.",
    category: "screenshots",
    image: {
      src: "/images/projects/brightness.jpg",
      alt: "Screenshot of the Brightness Controller interface",
      width: 495,
      height: 225,
    },
    projectSlug: "brightness-controller",
  },
  {
    id: "maths-frenzy-ui",
    title: "Maths Frenzy",
    description: "The maths game with its difficulty levels.",
    category: "screenshots",
    image: {
      src: "/images/projects/maths-frenzy.png",
      alt: "Screenshot of the Maths Frenzy game",
      width: 594,
      height: 430,
    },
    projectSlug: "maths-frenzy",
  },
  {
    id: "two-number-calculator-ui",
    title: "Two Number Calculator",
    description: "The Tkinter version of the two-number calculator.",
    category: "screenshots",
    image: {
      src: "/images/projects/two-number-calculator.png",
      alt: "Screenshot of the Two Number Calculator interface",
      width: 594,
      height: 420,
    },
    projectSlug: "two-number-calculator",
  },
  {
    id: "digit-calculator-ui",
    title: "0-9 Digit Calculator",
    description: "The digit calculator interface.",
    category: "screenshots",
    image: {
      src: "/images/projects/calculator-09.png",
      alt: "Screenshot of the 0-9 Digit Calculator interface",
      width: 321,
      height: 218,
    },
    projectSlug: "digit-calculator-0-9",
  },
];
