import type { TechCategory, Technology } from "@/types";

/**
 * Proficiency is only set where I am confident: Python and JavaScript are core,
 * React and TypeScript are good proficiency. Everything else is listed without a score.
 */
export const techCategories: TechCategory[] = [
  {
    id: "languages",
    name: "Programming languages & web technologies",
    items: [
      { id: "python", name: "Python", iconKeys: ["siPython"], proficiency: "core", projectKeys: ["Python"] },
      { id: "javascript", name: "JavaScript", iconKeys: ["siJavascript"], proficiency: "core", projectKeys: ["JavaScript"] },
      {
        id: "typescript",
        name: "TypeScript",
        iconKeys: ["siTypescript"],
        proficiency: "good",
        projectKeys: ["TypeScript"],
        note: "Used to build this portfolio.",
      },
      { id: "html5", name: "HTML5", iconKeys: ["siHtml5"], projectKeys: ["HTML"] },
      { id: "css3", name: "CSS3", iconKeys: ["siCss3", "siCss"], projectKeys: ["CSS"] },
      { id: "sql", name: "SQL / PLpgSQL", iconKeys: [], fallback: "database", projectKeys: ["PLpgSQL", "SQL"] },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & UI",
    items: [
      {
        id: "react",
        name: "React",
        iconKeys: ["siReact"],
        proficiency: "good",
        projectKeys: ["React"],
        note: "Used to build this portfolio.",
      },
      { id: "nicegui", name: "NiceGUI", iconKeys: [], fallback: "monitor", projectKeys: ["NiceGUI"] },
      { id: "tkinter", name: "Tkinter", iconKeys: [], fallback: "monitor", projectKeys: ["Tkinter"] },
      { id: "customtkinter", name: "CustomTkinter", iconKeys: [], fallback: "monitor", projectKeys: ["CustomTkinter"] },
      { id: "kivy", name: "Kivy", iconKeys: ["siKivy"], fallback: "monitor", projectKeys: ["Kivy"] },
    ],
  },
  {
    id: "backend",
    name: "Backend & frameworks",
    items: [
      { id: "nodejs", name: "Node.js", iconKeys: ["siNodedotjs"], projectKeys: ["Node.js"] },
      { id: "express", name: "Express.js", iconKeys: ["siExpress"], projectKeys: ["Express.js"] },
      { id: "flask", name: "Flask", iconKeys: ["siFlask"], projectKeys: ["Flask"] },
      { id: "fastapi", name: "FastAPI", iconKeys: ["siFastapi"], projectKeys: ["FastAPI"] },
    ],
  },
  {
    id: "data",
    name: "Databases & data handling",
    items: [
      { id: "postgresql", name: "PostgreSQL", iconKeys: ["siPostgresql"], projectKeys: ["PostgreSQL"] },
      { id: "sqlite", name: "SQLite", iconKeys: ["siSqlite"], projectKeys: ["SQLite"] },
      { id: "supabase", name: "Supabase", iconKeys: ["siSupabase"], projectKeys: ["Supabase"] },
      { id: "json", name: "JSON", iconKeys: ["siJson"], fallback: "braces", projectKeys: ["JSON"] },
      { id: "csv", name: "CSV", iconKeys: [], fallback: "file", projectKeys: ["CSV"] },
      { id: "dataclasses", name: "Dataclasses", iconKeys: [], fallback: "braces", projectKeys: ["Dataclasses"] },
    ],
  },
  {
    id: "apis",
    name: "APIs & integrations",
    items: [
      { id: "rest", name: "REST APIs", iconKeys: [], fallback: "plug", projectKeys: ["REST APIs"] },
      { id: "baileys", name: "Baileys", iconKeys: [], fallback: "bot", projectKeys: ["Baileys"] },
      { id: "openrouter", name: "OpenRouter", iconKeys: ["siOpenrouter"], fallback: "plug", projectKeys: ["OpenRouter"] },
    ],
  },
  {
    id: "testing",
    name: "Testing & utilities",
    items: [
      { id: "pytest", name: "pytest", iconKeys: ["siPytest"], fallback: "terminal", projectKeys: ["pytest"] },
      { id: "argparse", name: "argparse", iconKeys: [], fallback: "terminal", projectKeys: ["argparse"] },
    ],
  },
  {
    id: "tools",
    name: "Developer tools",
    items: [
      { id: "git", name: "Git", iconKeys: ["siGit"], projectKeys: [] },
      { id: "github", name: "GitHub", iconKeys: ["siGithub"], projectKeys: [] },
      { id: "vscode", name: "Visual Studio Code", iconKeys: ["siVisualstudiocode"], fallback: "code", projectKeys: [] },
    ],
  },
  {
    id: "ai",
    name: "AI-assisted development",
    items: [
      { id: "claude", name: "Claude", iconKeys: ["siClaude"], fallback: "sparkles", projectKeys: [] },
      { id: "chatgpt", name: "ChatGPT", iconKeys: [], fallback: "sparkles", projectKeys: [] },
      { id: "openai", name: "OpenAI", iconKeys: ["siOpenai"], fallback: "sparkles", projectKeys: [] },
    ],
  },
  {
    id: "deployment",
    name: "Deployment & hosting",
    items: [
      { id: "render", name: "Render", iconKeys: ["siRender"], fallback: "cloud", projectKeys: ["Render"] },
      { id: "vercel", name: "Vercel", iconKeys: ["siVercel"], fallback: "cloud", projectKeys: [] },
      { id: "ghpages", name: "GitHub Pages", iconKeys: ["siGithubpages"], fallback: "cloud", projectKeys: [] },
    ],
  },
];

export const allTechItems: Technology[] = techCategories.flatMap((c) => c.items);

export const coreTech = allTechItems.filter((t) => t.proficiency === "core");
export const goodTech = allTechItems.filter((t) => t.proficiency === "good");

export const proficiencyLabel = { core: "Core technology", good: "Good proficiency" } as const;
