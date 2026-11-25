import type { SupportedCurrency } from '@/config/site';
import { cn } from '@/lib/utils/cn';
import { formatPrice } from '@/lib/utils/format';

export interface PriceDisplayProps {
  readonly amountMinor: number;
  readonly compareAtAmountMinor?: number;
  readonly currency?: SupportedCurrency;
  readonly showCurrencyCode?: boolean;
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}

const SIZE_CLASSES = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base sm:text-lg',
} as const;

export function PriceDisplay({
  amountMinor,
  compareAtAmountMinor,
  currency = 'EUR',
  showCurrencyCode = false,
  size = 'md',
  className,
}: PriceDisplayProps) {
  const hasCompareAt =
    typeof compareAtAmountMinor === 'number' && compareAtAmountMinor > amountMinor;

  return (
    <div
      className={cn(
        'inline-flex items-baseline gap-2.5 font-sans tabular-nums',
        SIZE_CLASSES[size],
        className,
      )}
    >
      <span className="text-obsidian font-normal">
        {formatPrice(amountMinor, currency)}
        {showCurrencyCode ? ` ${currency}` : ''}
      </span>
      {hasCompareAt && (
        <span className="text-taupe decoration-taupe/70 line-through">
          {formatPrice(compareAtAmountMinor, currency)}
        </span>
      )}
    </div>
  );
}
