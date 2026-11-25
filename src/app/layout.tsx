import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/plus-jakarta-sans';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { siteConfig } from '@/config/site';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#faf8f5',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang={siteConfig.defaultLocale}>
      <body className="bg-ivory text-obsidian font-sans antialiased">
        <a
          href="#main-content"
          className="focus:bg-obsidian focus:text-ivory sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
