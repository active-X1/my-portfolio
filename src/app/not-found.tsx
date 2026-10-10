import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">This page does not exist</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        The link may be wrong or the page may have moved. Try the project list or head back home.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/projects" variant="outline">
          View projects
        </ButtonLink>
      </div>
    </Container>
  );
}
