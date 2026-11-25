import type { Metadata } from 'next';

import { DesignSystemShowcase } from '@/components/design-system/design-system-showcase';

export const metadata: Metadata = {
  title: 'Brand Design System',
  description:
    'LŪMÉ visual identity, color tokens, editorial typography, and reusable luxury UI primitives.',
};

export default function DesignSystemPage() {
  return <DesignSystemShowcase />;
}
