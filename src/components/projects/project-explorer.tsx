"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import type { Project, ProjectGroup } from "@/types";
import { groupMeta } from "@/data/projects";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

type Tab = "all" | "featured" | ProjectGroup;

const groupOrder: ProjectGroup[] = ["web", "desktop", "automation-ai", "interactive"];

const tabLabel: Record<Tab, string> = {
  all: "All",
  featured: "Featured",
  web: groupMeta.web.label,
  desktop: groupMeta.desktop.label,
  "automation-ai": groupMeta["automation-ai"].label,
  interactive: groupMeta.interactive.label,
};

export function ProjectExplorer({ projects, technologies }: { projects: Project[]; technologies: string[] }) {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [technology, setTechnology] = useState("all");

  const tabs: Tab[] = useMemo(
    () => ["all", "featured", ...groupOrder.filter((g) => projects.some((p) => p.group === g))],
    [projects],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length, featured: projects.filter((p) => p.featured).length };
    for (const g of groupOrder) c[g] = projects.filter((p) => p.group === g).length;
    return c;
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects
      .filter((p) => {
        if (tab === "featured" && !p.featured) return false;
        if (tab !== "all" && tab !== "featured" && p.group !== tab) return false;
        if (technology !== "all" && !p.technologies.includes(technology)) return false;
        if (!q) return true;
        return [p.name, p.alias ?? "", p.summary, ...p.technologies].join(" ").toLowerCase().includes(q);
      })
      .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [projects, query, tab, technology]);

  const hasFilters = query !== "" || tab !== "all" || technology !== "all";

  function reset() {
    setQuery("");
    setTab("all");
    setTechnology("all");
  }

  return (
    <div>
      <div
        role="group"
        aria-label="Project category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {tabs.map((t) => {
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => setTab(t)}
              className={cn(
                "inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-lg border px-3 text-sm font-medium transition-colors sm:h-10 sm:px-4",
                active ? "border-accent bg-accent text-accent-foreground" : "border-border hover:bg-muted",
              )}
            >
              {tabLabel[t]}
              <span className={cn("ml-1.5 tabular-nums", active ? "opacity-80" : "text-muted-foreground")}>{counts[t]}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto] gap-2 sm:mt-5 sm:grid-cols-[1fr_14rem] sm:gap-3">
        <div className="relative">
          <label htmlFor="project-search" className="sr-only">
            Search projects
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="project-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="h-10 pl-9 sm:h-11"
          />
        </div>
        <div>
          <label htmlFor="filter-technology" className="sr-only">
            Filter by technology
          </label>
          <Select
            id="filter-technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="h-10 w-[9.5rem] sm:h-11 sm:w-full"
          >
            <option value="all">All technologies</option>
            {technologies.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground sm:mt-4">
        <p role="status" aria-live="polite">
          Showing {filtered.length} of {projects.length} projects
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="font-medium text-link hover:underline">
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-3 sm:mt-4">
        {filtered.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
            {filtered.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            icon={SearchX}
            title="No projects match"
            action={
              <Button variant="outline" onClick={reset}>
                Clear filters
              </Button>
            }
          >
            Try a different search term or remove a filter.
          </EmptyState>
        )}
      </div>
    </div>
  );
}
