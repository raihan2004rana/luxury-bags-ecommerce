import { z } from 'zod';

import { SUPPORTED_CURRENCIES, SUPPORTED_LOCALES, siteConfig } from '@/config/site';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().trim().min(1).default(siteConfig.name),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEFAULT_CURRENCY: z.enum(SUPPORTED_CURRENCIES).default(siteConfig.defaultCurrency),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.enum(SUPPORTED_LOCALES).default(siteConfig.defaultLocale),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().trim().optional(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().trim().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

/**
 * Public, browser-safe environment configuration.
 * Only `NEXT_PUBLIC_*` variables are read here; private secrets are never exposed.
 */
export function getClientEnv(): ClientEnv {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || undefined,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || undefined,
    NEXT_PUBLIC_DEFAULT_CURRENCY: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || undefined,
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || undefined,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || undefined,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || undefined,
  });
}
