'use client';

import 'client-only';

import { useEffect, useState } from 'react';

/**
 * Returns `true` once the component has hydrated on the client.
 * Useful for avoiding hydration mismatches with browser-only APIs.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
