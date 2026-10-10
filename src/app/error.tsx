"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="py-28 text-center">
      <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        This page failed to load. Try again, and if it keeps happening, contact me.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </Container>
  );
}
