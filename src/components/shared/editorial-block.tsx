import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { EditorialHeading, Eyebrow, LeadText } from '@/components/ui/typography';
import type { BrandAsset } from '@/config/assets';
import { cn } from '@/lib/utils/cn';

export interface EditorialBlockProps {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly body: string;
  readonly asset: BrandAsset;
  readonly ctaLabel?: string;
  readonly ctaHref?: string;
  readonly reverse?: boolean;
  readonly details?: readonly { readonly label: string; readonly value: string }[];
  readonly className?: string;
}

export function EditorialBlock({
  eyebrow,
  title,
  lead,
  body,
  asset,
  ctaLabel,
  ctaHref,
  reverse = false,
  details,
  className,
}: EditorialBlockProps) {
  return (
    <article className={cn('grid items-center gap-10 lg:grid-cols-12 lg:gap-16', className)}>
      <div
        className={cn(
          'bg-champagne/35 relative aspect-[4/5] w-full overflow-hidden lg:col-span-6',
          reverse && 'lg:order-2',
        )}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          'flex flex-col items-start lg:col-span-6',
          reverse ? 'lg:order-1 lg:pr-8' : 'lg:pl-8',
        )}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
        <EditorialHeading as="h2" scale="display-lg" className="mt-3">
          {title}
        </EditorialHeading>
        <LeadText className="mt-5">{lead}</LeadText>
        <p className="text-charcoal/90 mt-4 max-w-xl text-sm leading-relaxed">{body}</p>

        {details && details.length > 0 && (
          <dl className="border-border-subtle mt-8 grid w-full max-w-lg grid-cols-2 gap-6 border-t pt-6">
            {details.map((item) => (
              <div key={item.label}>
                <dt className="text-taupe text-[10px] tracking-[0.2em] uppercase">{item.label}</dt>
                <dd className="text-obsidian mt-1 text-sm font-medium">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {ctaLabel && ctaHref && (
          <div className="mt-8">
            <Link href={ctaHref}>
              <Button variant="outline">{ctaLabel}</Button>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
