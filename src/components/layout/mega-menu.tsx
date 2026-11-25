'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { brandAssets } from '@/config/assets';
import type { MegaMenuConfig } from '@/config/navigation';

export interface MegaMenuProps {
  readonly menu: MegaMenuConfig | null;
  readonly onClose: () => void;
}

export function MegaMenu({ menu, onClose }: MegaMenuProps) {
  const featuredAsset = menu ? brandAssets[menu.featured.assetKey] : null;

  return (
    <AnimatePresence>
      {menu && featuredAsset && (
        <motion.div
          key={menu.id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="bg-ivory border-border-subtle absolute inset-x-0 top-full z-40 border-b"
          onMouseLeave={onClose}
        >
          <div className="mx-auto grid max-w-[90rem] gap-10 px-6 py-10 sm:px-10 lg:grid-cols-12 lg:px-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
              {menu.columns.map((column) => (
                <div key={column.heading}>
                  <p className="text-taupe text-[10px] font-medium tracking-[0.24em] uppercase">
                    {column.heading}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {column.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="text-obsidian hover:text-taupe text-sm transition-colors duration-150"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-border-subtle border-l pl-8 lg:col-span-4">
              <Link href={menu.featured.href} onClick={onClose} className="group block">
                <div className="bg-champagne/40 relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={featuredAsset.src}
                    alt={featuredAsset.alt}
                    fill
                    sizes="360px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-taupe mt-3.5 text-[10px] tracking-[0.22em] uppercase">
                  {menu.featured.eyebrow}
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <p className="font-editorial text-obsidian text-xl">{menu.featured.title}</p>
                  <ArrowRight
                    className="text-obsidian h-4 w-4 transition-transform group-hover:translate-x-1"
                    strokeWidth={1.25}
                  />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
