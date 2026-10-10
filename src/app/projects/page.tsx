import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { getFacets, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Python and web projects by Cyrus Akacha Cyprian, grouped by experience level.",
};

export default function ProjectsPage() {
  const { languages, technologies } = getFacets(projects);
  return (
    <>
      <PageHeader
        title="Projects"
        description="Everything I have built, grouped by how far along the work is. Levels describe what the project demonstrates, not how impressive it sounds."
      />
      <Container className="py-12">
        <ProjectExplorer projects={projects} languages={languages} technologies={technologies} />
      </Container>
    </>
  );
}
