import { Container } from "./container";
import { SectionHeading } from "./section-heading";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-border">
      <Container className="py-7 sm:py-12 lg:py-16">
        <SectionHeading as="h1" title={title} description={description} />
      </Container>
    </div>
  );
}
