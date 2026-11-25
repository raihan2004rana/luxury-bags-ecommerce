'use client';

import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Modal } from '@/components/ui/modal';
import type { BrandAsset } from '@/config/assets';
import { cn } from '@/lib/utils/cn';

export interface ProductGalleryProps {
  readonly assets: readonly BrandAsset[];
  readonly productName: string;
  readonly className?: string;
}

export function ProductGallery({ assets, productName, className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const safeAssets = assets.length > 0 ? assets : [];
  const activeAsset = safeAssets[activeIndex] ?? safeAssets[0];

  if (!activeAsset) {
    return null;
  }

  const goPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? safeAssets.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === safeAssets.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={cn('grid gap-4 lg:grid-cols-[84px_1fr]', className)}>
      {/* Desktop vertical thumbnail rail */}
      <div
        className="order-2 flex gap-2.5 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible"
        role="tablist"
        aria-label={`${productName} gallery thumbnails`}
      >
        {safeAssets.map((asset, index) => {
          const isSelected = index === activeIndex;
          return (
            <button
              key={asset.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`View image ${index + 1} of ${safeAssets.length}`}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'bg-champagne/40 relative aspect-[3/4] w-16 shrink-0 overflow-hidden border transition-opacity lg:w-full',
                isSelected
                  ? 'border-obsidian opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-90',
              )}
            >
              <Image src={asset.src} alt={asset.alt} fill sizes="84px" className="object-cover" />
            </button>
          );
        })}
      </div>

      {/* Primary stage */}
      <div className="bg-champagne/35 group relative order-1 aspect-[3/4] w-full overflow-hidden lg:order-2">
        <Image
          src={activeAsset.src}
          alt={activeAsset.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700"
        />

        {safeAssets.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous product image"
              className="bg-ivory/85 text-obsidian hover:bg-ivory absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next product image"
              className="bg-ivory/85 text-obsidian hover:bg-ivory absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.25} />
            </button>
          </>
        )}

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <span className="bg-ivory/90 text-obsidian px-2.5 py-1 text-[10px] tracking-[0.18em] tabular-nums">
            {activeIndex + 1} / {safeAssets.length}
          </span>
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label={`Inspect ${productName} in detail`}
            className="bg-ivory/90 text-obsidian hover:bg-ivory flex h-8 w-8 items-center justify-center transition-colors"
          >
            <Expand className="h-3.5 w-3.5" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <Modal
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        title={productName}
        description={activeAsset.alt}
        maxWidthClass="max-w-3xl"
      >
        <div className="bg-champagne/30 relative aspect-[3/4] max-h-[70vh] w-full overflow-hidden">
          <Image
            src={activeAsset.src}
            alt={activeAsset.alt}
            fill
            sizes="(max-width: 768px) 95vw, 700px"
            className="object-contain"
          />
        </div>
      </Modal>
    </div>
  );
}
