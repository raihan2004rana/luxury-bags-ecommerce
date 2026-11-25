import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { EditorialHeading, Eyebrow } from '@/components/ui/typography';
import { cn } from '@/lib/utils/cn';

export interface EmptyStateProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: ReactNode;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly className?: string;
}

export function EmptyState({
  eyebrow,
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'border-border-subtle bg-alabaster flex flex-col items-center justify-center border px-6 py-16 text-center sm:px-12',
        className,
      )}
    >
      {icon && <div className="text-taupe mb-4">{icon}</div>}
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <EditorialHeading as="h3" scale="h2" className={cn(eyebrow ? 'mt-2' : '')}>
        {title}
      </EditorialHeading>
      <p className="text-charcoal mt-3 max-w-md text-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="md" onClick={onAction} className="mt-7">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
