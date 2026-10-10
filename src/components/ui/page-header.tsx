import { Container } from "./container";
import { SectionHeading } from "./section-heading";

export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="border-b border-border">
      <Container className="py-14 sm:py-20">
        <SectionHeading as="h1" title={title} description={description} />
      </Container>
    </div>
  );
}
