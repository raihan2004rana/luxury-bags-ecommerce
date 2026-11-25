import type { BrandAssetKey } from '@/config/assets';

export interface NavLinkItem {
  readonly label: string;
  readonly href: string;
  readonly description?: string;
}

export interface MegaMenuColumn {
  readonly heading: string;
  readonly items: readonly NavLinkItem[];
}

export interface MegaMenuConfig {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly columns: readonly MegaMenuColumn[];
  readonly featured: {
    readonly eyebrow: string;
    readonly title: string;
    readonly href: string;
    readonly assetKey: BrandAssetKey;
  };
}

export interface FooterColumn {
  readonly heading: string;
  readonly links: readonly NavLinkItem[];
}

export const ANNOUNCEMENTS: readonly string[] = [
  'Complimentary express international delivery & duties included across USA, UK, EU, Canada, Australia & Middle East',
  'Private Atelier Appointments — Discover the Autumn–Winter Architectural Leather Collection',
  'Every LŪMÉ silhouette is crafted in small numbered batches with traceable Italian calfskin',
] as const;

export const PRIMARY_NAVIGATION: readonly MegaMenuConfig[] = [
  {
    id: 'handbags',
    label: 'Handbags',
    href: '#handbags',
    columns: [
      {
        heading: 'By Silhouette',
        items: [
          { label: 'Top-Handle Bags', href: '#top-handle' },
          { label: 'Shoulder & Baguette', href: '#shoulder' },
          { label: 'Architectural Totes', href: '#totes' },
          { label: 'Crossbody & Mini', href: '#crossbody' },
          { label: 'Evening Clutches', href: '#evening' },
        ],
      },
      {
        heading: 'Signature Icons',
        items: [
          { label: 'Le Solène', href: '#le-solene' },
          { label: 'La Élan', href: '#la-elan' },
          { label: 'Le Valmont', href: '#le-valmont' },
          { label: 'Atelier Exclusives', href: '#exclusives' },
        ],
      },
      {
        heading: 'By Material',
        items: [
          { label: 'Box Calfskin', href: '#box-calfskin' },
          { label: 'Supple Grained Leather', href: '#grained' },
          { label: 'Nubuck & Suede', href: '#suede' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Signature Icon',
      title: 'Le Solène in Grained Calfskin',
      href: '#le-solene',
      assetKey: 'bagSatchelTaupe',
    },
  },
  {
    id: 'collections',
    label: 'Collections',
    href: '#collections',
    columns: [
      {
        heading: 'Seasonal Editions',
        items: [
          { label: 'Autumn — Winter 26', href: '#aw26' },
          { label: 'The Permanent Archive', href: '#archive' },
          { label: 'Resort Capsule', href: '#resort' },
        ],
      },
      {
        heading: 'Curated Stories',
        items: [
          { label: 'Quiet Luxury Essentials', href: '#quiet-luxury' },
          { label: 'Monochrome Study', href: '#monochrome' },
          { label: 'Travel & Weekenders', href: '#travel' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Editorial Campaign',
      title: 'Parisian Architectural Lines',
      href: '#aw26',
      assetKey: 'bagChainBlush',
    },
  },
  {
    id: 'savoir-faire',
    label: 'Savoir-Faire',
    href: '#savoir-faire',
    columns: [
      {
        heading: 'The Maison',
        items: [
          { label: 'Florentine & Parisian Ateliers', href: '#ateliers' },
          { label: 'Traceable Leather Provenance', href: '#provenance' },
          { label: 'Hardware & Brass Foundry', href: '#hardware' },
        ],
      },
      {
        heading: 'Care & Longevity',
        items: [
          { label: 'Leather Care Guide', href: '#care-guide' },
          { label: 'Lifetime Restoration', href: '#restoration' },
        ],
      },
    ],
    featured: {
      eyebrow: 'Craftsmanship',
      title: 'Saddle Stitching & Solid Brass',
      href: '#ateliers',
      assetKey: 'editorialCraftsmanship',
    },
  },
] as const;

export const SECONDARY_NAV_LINKS: readonly NavLinkItem[] = [
  { label: 'Boutiques', href: '#boutiques' },
  { label: 'Clienteling', href: '#clienteling' },
] as const;

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: 'Client Services',
    links: [
      { label: 'Private Concierge', href: '#concierge' },
      { label: 'International Shipping & Duties', href: '#shipping' },
      { label: 'Returns & Exchanges', href: '#returns' },
      { label: 'Care & Restoration', href: '#care' },
      { label: 'Track Your Order', href: '#orders' },
    ],
  },
  {
    heading: 'Maison LŪMÉ',
    links: [
      { label: 'Our Heritage', href: '#heritage' },
      { label: 'Savoir-Faire', href: '#savoir-faire' },
      { label: 'Traceable Materials', href: '#traceability' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press Inquiries', href: '#press' },
    ],
  },
  {
    heading: 'Global Salons',
    links: [
      { label: 'Paris — Rue Saint-Honoré', href: '#paris' },
      { label: 'London — Mount Street', href: '#london' },
      { label: 'New York — Madison Avenue', href: '#new-york' },
      { label: 'Dubai — DIFC Gate Village', href: '#dubai' },
      { label: 'Sydney — Castlereagh Street', href: '#sydney' },
    ],
  },
] as const;
