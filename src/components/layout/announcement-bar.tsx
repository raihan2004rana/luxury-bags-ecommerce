'use client';

import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

import { ANNOUNCEMENTS } from '@/config/navigation';
import { cn } from '@/lib/utils/cn';

export interface AnnouncementBarProps {
  readonly messages?: readonly string[];
  readonly dismissible?: boolean;
  readonly className?: string;
}

export function AnnouncementBar({
  messages = ANNOUNCEMENTS,
  dismissible = true,
  className,
}: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  if (!visible || messages.length === 0) {
    return null;
  }

  const currentMessage = messages[index] ?? messages[0];

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      role="region"
      aria-label="Maison announcements"
      className={cn(
        'bg-espresso text-ivory border-obsidian/20 relative border-b px-4 py-2.5 text-[11px] tracking-[0.14em]',
        className,
      )}
    >
      <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4">
        <div className="hidden w-12 items-center gap-1 sm:flex">
          {messages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous announcement"
                className="text-champagne/80 hover:text-ivory p-1 transition-colors"
              >
                <ChevronLeft className="h-3 w-3" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next announcement"
                className="text-champagne/80 hover:text-ivory p-1 transition-colors"
              >
                <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </>
          )}
        </div>

        <p className="flex-1 text-center leading-snug uppercase">{currentMessage}</p>

        <div className="flex w-12 justify-end">
          {dismissible && (
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Dismiss announcement"
              className="text-champagne/80 hover:text-ivory p-1 transition-colors"
            >
              <X className="h-3 w-3" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
