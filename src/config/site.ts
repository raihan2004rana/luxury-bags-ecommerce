export const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'CAD', 'AUD', 'AED'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const SUPPORTED_LOCALES = ['en', 'fr', 'it', 'ar'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export interface MarketRegion {
  readonly code: string;
  readonly label: string;
  readonly currency: SupportedCurrency;
  readonly locale: SupportedLocale;
  readonly shippingNote: string;
}

export const INTERNATIONAL_REGIONS: readonly MarketRegion[] = [
  {
    code: 'US',
    label: 'United States',
    currency: 'USD',
    locale: 'en',
    shippingNote: 'Complimentary express courier & duties included',
  },
  {
    code: 'GB',
    label: 'United Kingdom',
    currency: 'GBP',
    locale: 'en',
    shippingNote: 'Complimentary tracked next-day London & UK delivery',
  },
  {
    code: 'CA',
    label: 'Canada',
    currency: 'CAD',
    locale: 'en',
    shippingNote: 'Complimentary express delivery across Canada',
  },
  {
    code: 'AU',
    label: 'Australia',
    currency: 'AUD',
    locale: 'en',
    shippingNote: 'Complimentary DHL Express international courier',
  },
  {
    code: 'EU',
    label: 'Europe',
    currency: 'EUR',
    locale: 'fr',
    shippingNote: 'Complimentary atelier courier across the EU',
  },
  {
    code: 'AE',
    label: 'Middle East',
    currency: 'AED',
    locale: 'ar',
    shippingNote: 'Dedicated concierge delivery across UAE & GCC',
  },
] as const;

export const siteConfig = {
  name: 'LŪMÉ',
  legalName: 'LŪMÉ Maison de Maroquinerie',
  tagline: 'Architectural Leather Goods & Artisanal Luxury Handbags',
  description:
    'LŪMÉ is an international women’s luxury handbag house crafted for enduring elegance, architectural precision, and discerning clientele across North America, Europe, Australia, and the Middle East.',
  defaultCurrency: 'EUR' as SupportedCurrency,
  defaultLocale: 'en' as SupportedLocale,
  supportedCurrencies: SUPPORTED_CURRENCIES,
  supportedLocales: SUPPORTED_LOCALES,
  regions: INTERNATIONAL_REGIONS,
  conciergeEmail: 'concierge@lume-maison.com',
} as const;
