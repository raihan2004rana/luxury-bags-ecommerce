import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-champagne/70 animate-pulse rounded-none', className)}
      {...props}
    />
  );
}

export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
}: {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly label?: string;
  readonly className?: string;
}) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-7 w-7' : 'h-5 w-5';

  return (
    <span
      role="status"
      aria-label={label}
      className={cn('inline-flex items-center gap-2', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'border-taupe/35 border-t-obsidian animate-spin rounded-full border',
          sizeClass,
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
