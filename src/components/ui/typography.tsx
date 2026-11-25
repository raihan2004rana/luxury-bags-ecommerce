import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';
type HeadingScale = 'display-xl' | 'display-lg' | 'h1' | 'h2' | 'h3';

const SCALE_CLASSES: Record<HeadingScale, string> = {
  'display-xl': 'font-editorial text-4xl font-normal leading-[1.04] sm:text-6xl lg:text-7xl',
  'display-lg': 'font-editorial text-3xl font-normal leading-[1.08] sm:text-5xl lg:text-6xl',
  h1: 'font-editorial text-3xl font-normal leading-[1.12] sm:text-4xl',
  h2: 'font-editorial text-2xl font-normal leading-[1.15] sm:text-3xl',
  h3: 'font-editorial text-xl font-normal leading-[1.2] sm:text-2xl',
};

export interface EditorialHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  readonly as?: HeadingTag;
  readonly scale?: HeadingScale;
  readonly children: ReactNode;
}

export function EditorialHeading({
  as: Tag = 'h2',
  scale = 'h2',
  className,
  children,
  ...props
}: EditorialHeadingProps) {
  return (
    <Tag className={cn(SCALE_CLASSES[scale], 'text-obsidian', className)} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-taupe font-sans text-[11px] font-medium tracking-[0.24em] uppercase',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function LeadText({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-charcoal font-sans text-base leading-relaxed font-normal sm:text-lg',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
