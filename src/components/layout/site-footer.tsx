'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';

import { FOOTER_COLUMNS } from '@/config/navigation';
import { INTERNATIONAL_REGIONS, type MarketRegion, siteConfig } from '@/config/site';

export interface SiteFooterProps {
  readonly activeRegion?: MarketRegion;
  readonly onRegionChange?: (region: MarketRegion) => void;
}

export function SiteFooter({ activeRegion, onRegionChange }: SiteFooterProps) {
  const currentRegion = activeRegion ?? INTERNATIONAL_REGIONS[4] ?? INTERNATIONAL_REGIONS[0]!;

  return (
    <footer className="bg-obsidian text-ivory">
      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-editorial text-3xl tracking-[0.26em]">{siteConfig.name}</p>
            <p className="text-champagne/80 mt-4 max-w-sm text-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="mt-8 max-w-xs space-y-2">
              <div className="text-taupe flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
                <Globe className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                <span>Shipping Destination &amp; Currency</span>
              </div>
              <label htmlFor="footer-region-select" className="sr-only">
                Select shipping destination and currency
              </label>
              <select
                id="footer-region-select"
                value={currentRegion.code}
                onChange={(event) => {
                  const found = INTERNATIONAL_REGIONS.find(
                    (region) => region.code === event.target.value,
                  );
                  if (found && onRegionChange) {
                    onRegionChange(found);
                  }
                }}
                className="bg-espresso border-taupe/40 text-ivory h-10 w-full rounded-none border px-3 text-xs tracking-wide focus:outline-none"
              >
                {INTERNATIONAL_REGIONS.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.label} — {region.currency}
                  </option>
                ))}
              </select>
              <p className="text-champagne/65 text-[11px]">{currentRegion.shippingNote}</p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className="text-taupe text-[10px] font-medium tracking-[0.24em] uppercase">
                  {column.heading}
                </p>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-champagne/85 hover:text-ivory text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-espresso text-champagne/60 mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-xs sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="#privacy" className="hover:text-ivory transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-ivory transition-colors">
              Terms of Sale
            </Link>
            <Link href="#accessibility" className="hover:text-ivory transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
