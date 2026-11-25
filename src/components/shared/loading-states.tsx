import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils/cn';

export function ProductCardSkeleton({ className }: { readonly className?: string }) {
  return (
    <div className={cn('flex flex-col', className)} aria-hidden="true">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="mt-4 flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-14" />
      </div>
      <Skeleton className="mt-2 h-3.5 w-32" />
      <div className="mt-3 flex gap-2">
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
        <Skeleton className="h-3.5 w-3.5 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { readonly count?: number }) {
  return (
    <div
      role="status"
      aria-label="Loading collection"
      className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      <span className="sr-only">Loading luxury handbag collection...</span>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ProductGallerySkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading product gallery"
      className="grid gap-4 lg:grid-cols-[84px_1fr]"
    >
      <span className="sr-only">Loading product photography...</span>
      <div className="order-2 flex gap-2.5 lg:order-1 lg:flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[3/4] w-16 lg:w-full" />
        ))}
      </div>
      <Skeleton className="order-1 aspect-[3/4] w-full lg:order-2" />
    </div>
  );
}
