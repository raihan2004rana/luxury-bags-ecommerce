'use client';

import { Globe, Menu, Search, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { MegaMenu } from '@/components/layout/mega-menu';
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer';
import { type MegaMenuConfig, PRIMARY_NAVIGATION, SECONDARY_NAV_LINKS } from '@/config/navigation';
import { INTERNATIONAL_REGIONS, type MarketRegion, siteConfig } from '@/config/site';
import { cn } from '@/lib/utils/cn';

export interface SiteHeaderProps {
  readonly bagCount?: number;
  readonly activeRegion?: MarketRegion;
  readonly onRegionChange?: (region: MarketRegion) => void;
  readonly onOpenBag?: () => void;
  readonly onOpenSearch?: () => void;
}

export function SiteHeader({
  bagCount = 0,
  activeRegion,
  onRegionChange,
  onOpenBag,
  onOpenSearch,
}: SiteHeaderProps) {
  const [internalRegion, setInternalRegion] = useState<MarketRegion>(
    INTERNATIONAL_REGIONS[4] ?? INTERNATIONAL_REGIONS[0]!,
  );
  const [activeMenu, setActiveMenu] = useState<MegaMenuConfig | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const currentRegion = activeRegion ?? internalRegion;
  const handleSelectRegion = (region: MarketRegion) => {
    setInternalRegion(region);
    onRegionChange?.(region);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setActiveMenu(null)}
        className="bg-ivory/95 border-border-subtle sticky top-0 z-30 border-b backdrop-blur-sm"
      >
        <div className="mx-auto grid h-16 max-w-[90rem] grid-cols-3 items-center px-4 sm:h-20 sm:px-8 lg:px-12">
          {/* Left Zone: Mobile Trigger / Desktop Primary Navigation */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="text-obsidian -ml-2 p-2 lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>

            <nav aria-label="Primary navigation" className="hidden items-center gap-7 lg:flex">
              {PRIMARY_NAVIGATION.map((item) => {
                const isActive = activeMenu?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-expanded={isActive}
                    onMouseEnter={() => setActiveMenu(item)}
                    onClick={() => setActiveMenu(isActive ? null : item)}
                    className={cn(
                      'border-b py-1 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors',
                      isActive
                        ? 'border-obsidian text-obsidian'
                        : 'text-charcoal hover:text-obsidian border-transparent',
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center Zone: Brand Wordmark */}
          <div className="flex justify-center">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="font-editorial text-obsidian text-2xl font-normal tracking-[0.26em] sm:text-3xl"
            >
              {siteConfig.name}
            </Link>
          </div>

          {/* Right Zone: Secondary Links, Region, Search, Account, Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <div className="hidden items-center gap-6 xl:flex">
              {SECONDARY_NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-charcoal hover:text-obsidian text-[11px] tracking-[0.18em] uppercase transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-1.5 sm:flex">
              <Globe className="text-taupe h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
              <label htmlFor="header-region-select" className="sr-only">
                Select shipping region and currency
              </label>
              <select
                id="header-region-select"
                value={currentRegion.code}
                onChange={(event) => {
                  const found = INTERNATIONAL_REGIONS.find(
                    (region) => region.code === event.target.value,
                  );
                  if (found) {
                    handleSelectRegion(found);
                  }
                }}
                className="text-obsidian bg-transparent text-[11px] tracking-[0.14em] uppercase focus:outline-none"
              >
                {INTERNATIONAL_REGIONS.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.code} · {region.currency}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="text-obsidian hover:text-taupe p-1.5 transition-colors"
            >
              <Search className="h-4 w-4" strokeWidth={1.25} />
            </button>

            <Link
              href="#account"
              aria-label="Client account"
              className="text-obsidian hover:text-taupe hidden p-1.5 transition-colors sm:inline-flex"
            >
              <User className="h-4 w-4" strokeWidth={1.25} />
            </Link>

            <button
              type="button"
              onClick={onOpenBag}
              aria-label={`Shopping bag (${bagCount} items)`}
              className="text-obsidian hover:text-taupe relative inline-flex items-center gap-1.5 p-1.5 transition-colors"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
              <span className="text-[11px] tracking-[0.1em] tabular-nums">{bagCount}</span>
            </button>
          </div>
        </div>

        <MegaMenu menu={activeMenu} onClose={() => setActiveMenu(null)} />
      </header>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeRegion={currentRegion}
        onSelectRegion={handleSelectRegion}
      />
    </>
  );
}
