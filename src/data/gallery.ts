import type { GalleryEntry } from "@/types";

export const galleryCategories = {
  screenshots: "Screenshots",
  milestones: "Milestones",
  setup: "Development setup",
  redesigns: "Redesigns",
} as const;

/** Add real screenshots here as you take them. Project placeholders are not listed. */
export const gallery: GalleryEntry[] = [
  {
    id: "brightness-controller-ui",
    title: "Brightness Controller interface",
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
];
