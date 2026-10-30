import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { allTechnologies, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web, desktop, automation and interactive applications built by Cyrus Akacha Cyprian.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Web platforms, desktop applications, automation and interactive apps."
      />
      <Container className="py-5 sm:py-10">
        <ProjectExplorer projects={projects} technologies={allTechnologies(projects)} />
      </Container>
    </>
  );
}
