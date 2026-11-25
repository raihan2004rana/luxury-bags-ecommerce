'use client';

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center px-6 py-24"
    >
      <p className="text-taupe text-xs tracking-[0.24em] uppercase">Error</p>
      <h1 className="font-display mt-3 text-4xl font-medium">Something unexpected occurred.</h1>
      <p className="text-charcoal mt-3 text-sm leading-relaxed">
        We were unable to complete your request. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-obsidian text-ivory hover:bg-charcoal mt-8 px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors"
      >
        Try Again
      </button>
    </main>
  );
}
