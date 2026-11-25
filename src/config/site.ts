export const SUPPORTED_CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY'] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

export const SUPPORTED_LOCALES = ['en', 'fr', 'it', 'ja'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export const siteConfig = {
  name: 'LŪMÉ',
  legalName: 'LŪMÉ Maison de Maroquinerie',
  tagline: 'Architectural Leather Goods & Artisanal Luxury Handbags',
  description:
    'LŪMÉ is an international luxury women’s handbag house crafted for enduring elegance, architectural precision, and global clientele.',
  defaultCurrency: 'EUR' as SupportedCurrency,
  defaultLocale: 'en' as SupportedLocale,
  supportedCurrencies: SUPPORTED_CURRENCIES,
  supportedLocales: SUPPORTED_LOCALES,
} as const;
