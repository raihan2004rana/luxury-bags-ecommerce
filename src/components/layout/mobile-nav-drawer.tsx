'use client';

import { ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Drawer } from '@/components/ui/drawer';
import { PRIMARY_NAVIGATION, SECONDARY_NAV_LINKS } from '@/config/navigation';
import { INTERNATIONAL_REGIONS, type MarketRegion } from '@/config/site';
import { cn } from '@/lib/utils/cn';

export interface MobileNavDrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly activeRegion: MarketRegion;
  readonly onSelectRegion: (region: MarketRegion) => void;
}

export function MobileNavDrawer({
  open,
  onClose,
  activeRegion,
  onSelectRegion,
}: MobileNavDrawerProps) {
  const [expandedId, setExpandedId] = useState<string | null>(PRIMARY_NAVIGATION[0]?.id ?? null);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Menu"
      side="left"
      widthClass="max-w-sm"
      footer={
        <div className="space-y-3">
          <div className="text-taupe flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
            <Globe className="h-3.5 w-3.5" strokeWidth={1.25} />
            <span>Region &amp; Currency</span>
          </div>
          <label htmlFor="mobile-region-select" className="sr-only">
            Select shipping region and currency
          </label>
          <select
            id="mobile-region-select"
            value={activeRegion.code}
            onChange={(event) => {
              const found = INTERNATIONAL_REGIONS.find(
                (region) => region.code === event.target.value,
              );
              if (found) {
                onSelectRegion(found);
              }
            }}
            className="bg-ivory border-border-strong text-obsidian h-10 w-full rounded-none border px-3 text-xs tracking-wide"
          >
            {INTERNATIONAL_REGIONS.map((region) => (
              <option key={region.code} value={region.code}>
                {region.label} ({region.currency})
              </option>
            ))}
          </select>
        </div>
      }
    >
      <nav aria-label="Mobile navigation" className="divide-border-subtle divide-y">
        {PRIMARY_NAVIGATION.map((section) => {
          const isOpen = expandedId === section.id;
          return (
            <div key={section.id} className="py-4">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setExpandedId(isOpen ? null : section.id)}
                className="flex w-full items-center justify-between py-1 text-left"
              >
                <span className="font-editorial text-obsidian text-2xl">{section.label}</span>
                <ChevronDown
                  className={cn(
                    'text-taupe h-4 w-4 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  strokeWidth={1.25}
                />
              </button>

              {isOpen && (
                <div className="mt-4 space-y-5 pl-1">
                  {section.columns.map((col) => (
                    <div key={col.heading}>
                      <p className="text-taupe text-[10px] tracking-[0.2em] uppercase">
                        {col.heading}
                      </p>
                      <ul className="mt-2 space-y-2">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className="text-charcoal hover:text-obsidian block py-0.5 text-sm"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div className="space-y-3 pt-6">
          {SECONDARY_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="text-obsidian block text-xs tracking-[0.2em] uppercase"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </Drawer>
  );
}
