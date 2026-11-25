'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

import { ToastProvider } from '@/components/ui/toast';

export function AppProviders({ children }: { readonly children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>{children}</ToastProvider>
    </MotionConfig>
  );
}
