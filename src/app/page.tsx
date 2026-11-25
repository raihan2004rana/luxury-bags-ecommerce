import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { EditorialHeading, Eyebrow } from '@/components/ui/typography';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-24"
    >
      <Eyebrow>Phase 02 · Luxury Brand Design System</Eyebrow>
      <EditorialHeading as="h1" scale="display-xl" className="mt-4">
        {siteConfig.name}
      </EditorialHeading>
      <p className="text-charcoal mt-4 max-w-xl text-base leading-relaxed">
        {siteConfig.description}
      </p>
      <div className="border-border-subtle bg-champagne/40 mt-10 flex flex-col items-start justify-between gap-6 border p-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-obsidian text-sm font-medium">
            Design Tokens &amp; Core UI System Ready
          </p>
          <p className="text-charcoal mt-1 text-sm">
            Inspect the responsive component library before storefront assembly.
          </p>
        </div>
        <Link href="/design-system" className="shrink-0">
          <Button
            variant="primary"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />}
          >
            View Design System
          </Button>
        </Link>
      </div>
    </main>
  );
}
