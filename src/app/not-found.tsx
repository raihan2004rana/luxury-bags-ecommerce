import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-xl flex-col items-start justify-center px-6 py-24"
    >
      <p className="text-taupe text-xs tracking-[0.24em] uppercase">404</p>
      <h1 className="font-display mt-3 text-4xl font-medium">Page Not Found</h1>
      <p className="text-charcoal mt-3 text-sm leading-relaxed">
        The page you are looking for could not be located.
      </p>
      <Link
        href="/"
        className="bg-obsidian text-ivory hover:bg-charcoal mt-8 inline-block px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-colors"
      >
        Return Home
      </Link>
    </main>
  );
}
