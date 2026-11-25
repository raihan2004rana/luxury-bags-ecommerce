import type { SupportedCurrency } from '@/config/site';

const CURRENCY_LOCALE_MAP: Record<SupportedCurrency, string> = {
  EUR: 'en-IE',
  USD: 'en-US',
  GBP: 'en-GB',
  CAD: 'en-CA',
  AUD: 'en-AU',
  AED: 'en-AE',
};

/**
 * Formats an integer minor currency amount (e.g., 245000 -> €2,450)
 * using tabular formatting appropriate for luxury retail pricing.
 */
export function formatPrice(
  amountMinor: number,
  currency: SupportedCurrency = 'EUR',
  options?: { readonly showDecimals?: boolean },
): string {
  const majorAmount = amountMinor / 100;
  const hasCents = amountMinor % 100 !== 0;
  const showDecimals = options?.showDecimals ?? hasCents;

  return new Intl.NumberFormat(CURRENCY_LOCALE_MAP[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(majorAmount);
}
