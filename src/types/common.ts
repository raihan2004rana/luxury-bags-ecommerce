import type { SupportedCurrency, SupportedLocale } from '@/config/site';

export type EntityId = string;
export type ISODateString = string;

export type CurrencyCode = SupportedCurrency;
export type LocaleCode = SupportedLocale;

export interface LocalizedText {
  readonly en: string;
  readonly fr?: string;
  readonly it?: string;
  readonly ja?: string;
}

export interface MoneyAmount {
  /** Minor currency unit (e.g., cents) to avoid floating-point rounding issues. */
  readonly amountMinor: number;
  readonly currency: CurrencyCode;
}
