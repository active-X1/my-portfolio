"use client";

import { useMemo, useState } from "react";
import { Search, SearchX, RotateCcw } from "lucide-react";
import type { Project, ProjectCategory, ProjectStatus } from "@/types";
import { categoryMeta, statusMeta } from "@/data/projects";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

interface Props {
  projects: Project[];
  languages: string[];
  technologies: string[];
}

const categories: ProjectCategory[] = ["beginner", "intermediate", "advanced"];
const statuses = Object.keys(statusMeta) as ProjectStatus[];

export function ProjectExplorer({ projects, languages, technologies }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory | "all">("all");
  const [language, setLanguage] = useState("all");
  const [technology, setTechnology] = useState("all");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (language !== "all" && !p.languages.includes(language)) return false;
      if (technology !== "all" && !p.technologies.includes(technology)) return false;
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      return [p.name, p.description, ...p.languages, ...p.technologies].join(" ").toLowerCase().includes(q);
    });
  }, [projects, query, category, language, technology, status]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    for (const cat of categories) c[cat] = projects.filter((p) => p.category === cat).length;
    return c;
  }, [projects]);

  const hasFilters = query !== "" || category !== "all" || language !== "all" || technology !== "all" || status !== "all";

  function reset() {
    setQuery("");
    setCategory("all");
    setLanguage("all");
    setTechnology("all");
    setStatus("all");
  }

  const categoryIsEmpty = category !== "all" && counts[category] === 0;

  return (
    <div>
      <div role="group" aria-label="Project category" className="flex flex-wrap gap-2">
        {(["all", ...categories] as const).map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {c === "all" ? "All" : categoryMeta[c].label}
              <span className={cn("ml-2 tabular-nums", active ? "opacity-80" : "text-muted-foreground")}>{counts[c]}</span>
            </button>
          );
        })}
      </div>
      {category !== "all" && (
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{categoryMeta[category].description}</p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto] lg:items-end">
        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
          <label htmlFor="project-search" className="block text-sm font-medium">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, language or technology"
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="filter-language" className="block text-sm font-medium">
            Language
          </label>
          <Select id="filter-language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="all">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="filter-technology" className="block text-sm font-medium">
            Framework or tool
          </label>
          <Select id="filter-technology" value={technology} onChange={(e) => setTechnology(e.target.value)}>
            <option value="all">All technologies</option>
            {technologies.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="filter-status" className="block text-sm font-medium">
            Status
          </label>
          <Select id="filter-status" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus | "all")}>
            <option value="all">Any status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {statusMeta[s].label}
              </option>
            ))}
          </Select>
        </div>
        <Button variant="outline" onClick={reset} disabled={!hasFilters} className="sm:col-span-2 lg:col-span-1">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Reset
        </Button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" role="status" aria-live="polite">
        Showing {filtered.length} of {projects.length} {projects.length === 1 ? "project" : "projects"}
      </p>

      <div className="mt-4">
        {filtered.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={SearchX}
            title={categoryIsEmpty ? "Nothing in this category yet" : "No projects match"}
            action={
              hasFilters ? (
                <Button variant="outline" onClick={reset}>
                  Clear filters
                </Button>
              ) : undefined
            }
          >
            {categoryIsEmpty && category !== "all"
              ? categoryMeta[category].emptyMessage
              : "Try a different search term or remove a filter."}
          </EmptyState>
        )}
      </div>
    </div>
  );
}
