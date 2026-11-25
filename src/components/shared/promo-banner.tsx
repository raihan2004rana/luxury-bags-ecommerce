import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { EditorialHeading, Eyebrow } from '@/components/ui/typography';
import type { BrandAsset } from '@/config/assets';
import { cn } from '@/lib/utils/cn';

export interface PromoBannerProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly asset?: BrandAsset;
  readonly variant?: 'split' | 'champagne-band';
  readonly className?: string;
}

export function PromoBanner({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  asset,
  variant = 'split',
  className,
}: PromoBannerProps) {
  if (variant === 'champagne-band') {
    return (
      <section
        className={cn(
          'bg-champagne border-border-subtle border-y px-6 py-14 sm:px-10 lg:px-16 lg:py-20',
          className,
        )}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow className="text-espresso">{eyebrow}</Eyebrow>
            <EditorialHeading as="h2" scale="display-lg" className="mt-3">
              {title}
            </EditorialHeading>
            <p className="text-charcoal mt-4 text-sm leading-relaxed sm:text-base">{description}</p>
          </div>
          <Link href={ctaHref} className="shrink-0">
            <Button
              variant="primary"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />}
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn('bg-espresso text-ivory grid overflow-hidden lg:grid-cols-12', className)}
    >
      <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-6 lg:p-16">
        <div>
          <Eyebrow className="text-champagne/80">{eyebrow}</Eyebrow>
          <EditorialHeading as="h2" scale="display-lg" className="text-ivory mt-4">
            {title}
          </EditorialHeading>
          <p className="text-champagne/85 mt-5 max-w-md text-sm leading-relaxed sm:text-base">
            {description}
          </p>
        </div>
        <div className="mt-10">
          <Link href={ctaHref}>
            <Button
              variant="secondary"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />}
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>

      {asset && (
        <div className="relative min-h-[340px] lg:col-span-6 lg:min-h-[480px]">
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  );
}
