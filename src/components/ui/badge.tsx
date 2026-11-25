import type { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils/cn';

export type BadgeTone =
  'default' | 'new-arrival' | 'limited-edition' | 'atelier-exclusive' | 'pre-order' | 'sold-out';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  readonly tone?: BadgeTone;
}

const TONE_CLASSES: Record<BadgeTone, string> = {
  default: 'bg-champagne/90 text-obsidian',
  'new-arrival': 'bg-alabaster/95 text-obsidian border border-border-subtle',
  'limited-edition': 'bg-espresso text-ivory',
  'atelier-exclusive': 'bg-obsidian text-ivory',
  'pre-order': 'bg-taupe/20 text-espresso border border-taupe/40',
  'sold-out': 'bg-burgundy/10 text-burgundy border border-burgundy/25',
};

export function Badge({ tone = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-none px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase',
        TONE_CLASSES[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
