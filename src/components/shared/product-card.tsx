'use client';

import { Heart, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { PriceDisplay } from '@/components/shared/price-display';
import { Badge, type BadgeTone } from '@/components/ui/badge';
import type { BrandAsset } from '@/config/assets';
import type { SupportedCurrency } from '@/config/site';
import { cn } from '@/lib/utils/cn';

export interface ProductSwatch {
  readonly name: string;
  readonly hex: string;
}

export interface ProductCardItem {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly subtitle: string;
  readonly priceMinor: number;
  readonly compareAtPriceMinor?: number;
  readonly currency?: SupportedCurrency;
  readonly primaryAsset: BrandAsset;
  readonly secondaryAsset?: BrandAsset;
  readonly badge?: {
    readonly label: string;
    readonly tone?: BadgeTone;
  };
  readonly swatches?: readonly ProductSwatch[];
}

export interface ProductCardProps {
  readonly product: ProductCardItem;
  readonly onQuickAdd?: (product: ProductCardItem) => void;
  readonly onToggleWishlist?: (product: ProductCardItem) => void;
  readonly className?: string;
}

export function ProductCard({
  product,
  onQuickAdd,
  onToggleWishlist,
  className,
}: ProductCardProps) {
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  const handleWishlist = () => {
    setWishlisted((prev) => !prev);
    onToggleWishlist?.(product);
  };

  return (
    <article className={cn('group flex flex-col', className)}>
      <div className="bg-champagne/40 relative aspect-[3/4] w-full overflow-hidden">
        <Link
          href={`#${product.slug}`}
          className="block h-full w-full"
          aria-label={`View ${product.name} — ${product.subtitle}`}
        >
          <Image
            src={product.primaryAsset.src}
            alt={product.primaryAsset.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              'object-cover transition-opacity duration-500',
              product.secondaryAsset
                ? 'group-hover:opacity-0'
                : 'transition-transform duration-700 group-hover:scale-[1.02]',
            )}
          />
          {product.secondaryAsset && (
            <Image
              src={product.secondaryAsset.src}
              alt={product.secondaryAsset.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {product.badge && (
          <div className="pointer-events-none absolute top-3.5 left-3.5 z-10">
            <Badge tone={product.badge.tone}>{product.badge.label}</Badge>
          </div>
        )}

        {onToggleWishlist && (
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={wishlisted}
            className="bg-ivory/90 text-obsidian hover:bg-ivory absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center transition-colors"
          >
            <Heart
              className="h-3.5 w-3.5"
              strokeWidth={1.25}
              fill={wishlisted ? 'currentColor' : 'none'}
            />
          </button>
        )}

        {onQuickAdd && (
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-1 opacity-0 transition-all duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onQuickAdd(product)}
              className="bg-ivory/95 text-obsidian hover:bg-obsidian hover:text-ivory border-border-subtle flex h-10 w-full items-center justify-center gap-2 border text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-xs transition-colors"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>Quick Add</span>
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`#${product.slug}`}
            className="font-editorial text-obsidian hover:text-espresso text-xl leading-snug transition-colors"
          >
            {product.name}
          </Link>
          <PriceDisplay
            amountMinor={product.priceMinor}
            compareAtAmountMinor={product.compareAtPriceMinor}
            currency={product.currency}
            size="sm"
            className="shrink-0 pt-1"
          />
        </div>

        <p className="text-taupe text-xs tracking-wide">{product.subtitle}</p>

        {product.swatches && product.swatches.length > 0 && (
          <div
            className="mt-1.5 flex items-center gap-2"
            role="group"
            aria-label="Available leather finishes"
          >
            {product.swatches.map((swatch, index) => {
              const isActive = index === selectedSwatchIndex;
              return (
                <button
                  key={swatch.name}
                  type="button"
                  onClick={() => setSelectedSwatchIndex(index)}
                  aria-label={`${swatch.name} finish`}
                  aria-pressed={isActive}
                  title={swatch.name}
                  className={cn(
                    'h-3.5 w-3.5 rounded-full border p-[1px] transition-transform',
                    isActive ? 'border-obsidian scale-110' : 'border-border-strong',
                  )}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{ backgroundColor: swatch.hex }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
