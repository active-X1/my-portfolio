import type { TimelineItem } from "@/types";

/** Only dates that appear in my original portfolio are filled in. Add more as they are known. */
export const timeline: TimelineItem[] = [
  {
    date: "September 2025",
    title: "Started programming and finished secondary school",
    description: "Began learning Python fundamentals and building small practical programs.",
    status: "done",
  },
  {
    title: "Calculators in Python",
    description:
      "Built the Two Number Calculator and the 0-9 Digit Calculator, moving from scripts to Tkinter interfaces.",
    status: "done",
  },
  {
    title: "Maths Frenzy and Brightness Controller",
    description: "Built a game with difficulty levels and a desktop utility with a custom-styled interface.",
    status: "done",
  },
  {
    title: "School Portal",
    description: "Started a student management system and academic portal. About 10% complete.",
    status: "current",
  },
  {
    title: "Portfolio rebuild with Next.js and TypeScript",
    description: "Moving from a single HTML page to a multi-page, typed application.",
    status: "current",
  },
  {
    title: "Backend frameworks, bots and agentic AI",
    description: "Django, Flask or FastAPI, then bots, then an agentic system with tool calling.",
    status: "next",
  },
];
