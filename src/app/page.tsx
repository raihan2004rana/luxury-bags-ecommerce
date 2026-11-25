import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-24"
    >
      <p className="text-taupe text-xs tracking-[0.28em] uppercase">
        Phase 01 · Architecture Foundation
      </p>
      <h1 className="font-display mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="text-charcoal mt-4 max-w-xl text-base leading-relaxed">
        {siteConfig.description}
      </p>
      <div className="border-border-subtle bg-alabaster mt-10 border p-6">
        <p className="text-obsidian text-sm font-medium">Core project scaffolding initialized.</p>
        <p className="text-taupe mt-1 text-sm">
          Storefront implementation begins in the next phase.
        </p>
      </div>
    </main>
  );
}
