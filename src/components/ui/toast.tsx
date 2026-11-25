'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info, X } from 'lucide-react';
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { cn } from '@/lib/utils/cn';

export type ToastTone = 'default' | 'success' | 'error';

export interface ToastInput {
  readonly title: string;
  readonly description?: string;
  readonly tone?: ToastTone;
  readonly durationMs?: number;
}

interface ToastRecord extends ToastInput {
  readonly id: string;
}

interface ToastContextValue {
  readonly toast: (input: ToastInput) => void;
  readonly dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { readonly children: ReactNode }) {
  const [items, setItems] = useState<readonly ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    ({ durationMs = 4500, ...input }: ToastInput) => {
      const id = crypto.randomUUID();
      setItems((current) => [...current.slice(-2), { ...input, id }]);

      window.setTimeout(() => {
        dismiss(id);
      }, durationMs);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2.5 sm:right-6 sm:bottom-6"
      >
        <AnimatePresence>
          {items.map((item) => {
            const tone = item.tone ?? 'default';
            return (
              <motion.div
                key={item.id}
                role="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'pointer-events-auto flex items-start justify-between gap-4 border px-5 py-4',
                  tone === 'error'
                    ? 'border-burgundy/40 bg-alabaster text-obsidian'
                    : 'border-espresso bg-obsidian text-ivory',
                )}
              >
                <div className="flex items-start gap-3">
                  {tone === 'success' ? (
                    <Check className="text-champagne mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                  ) : (
                    <Info
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        tone === 'error' ? 'text-burgundy' : 'text-champagne',
                      )}
                      strokeWidth={1.5}
                    />
                  )}
                  <div>
                    <p className="text-xs font-medium tracking-[0.14em] uppercase">{item.title}</p>
                    {item.description && (
                      <p
                        className={cn(
                          'mt-1 text-xs leading-relaxed',
                          tone === 'error' ? 'text-charcoal' : 'text-champagne/90',
                        )}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  aria-label="Dismiss notification"
                  className={cn(
                    '-mr-1 p-1 transition-opacity hover:opacity-75',
                    tone === 'error' ? 'text-obsidian' : 'text-ivory',
                  )}
                >
                  <X className="h-3.5 w-3.5" strokeWidth={1.25} />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider.');
  }
  return ctx;
}
