export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8" role="status" aria-live="polite">
      <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
      <div className="mt-5 h-4 w-full max-w-xl animate-pulse rounded bg-muted" />
      <span className="sr-only">Loading</span>
    </div>
  );
}
