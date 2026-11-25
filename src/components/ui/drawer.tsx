'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { type ReactNode, useEffect, useId } from 'react';

import { cn } from '@/lib/utils/cn';

export interface DrawerProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title: string;
  readonly side?: 'left' | 'right';
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly widthClass?: string;
}

export function Drawer({
  open,
  onClose,
  title,
  side = 'right',
  children,
  footer,
  widthClass = 'max-w-md',
}: DrawerProps) {
  const titleId = useId();
  const isRight = side === 'right';

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-50 flex"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="bg-obsidian/40 fixed inset-0 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              'bg-ivory border-border-subtle relative z-10 flex h-full w-full flex-col',
              isRight ? 'ml-auto border-l' : 'mr-auto border-r',
              widthClass,
            )}
          >
            <div className="border-border-subtle flex items-center justify-between border-b px-6 py-5">
              <h2 id={titleId} className="text-xs font-medium tracking-[0.22em] uppercase">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close drawer"
                className="text-charcoal hover:text-obsidian -mr-2 p-2 transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            {footer && (
              <div className="border-border-subtle bg-alabaster border-t px-6 py-5">{footer}</div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
