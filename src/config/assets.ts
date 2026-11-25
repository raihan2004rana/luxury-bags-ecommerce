export type AssetCategory = 'product' | 'editorial' | 'banner';

export interface BrandAsset {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly category: AssetCategory;
  readonly objectPosition?: string;
}

/**
 * Centralized asset manifest for LŪMÉ.
 * Placeholder editorial photography is stored under `public/images/` and can be
 * swapped cleanly to Cloudinary delivery URLs in Phase 03+ without touching UI components.
 */
export const brandAssets = {
  bagSatchelTaupe: {
    id: 'lume-bag-satchel-taupe',
    src: '/images/bag-espresso-front.jpg',
    alt: 'LŪMÉ Le Solène structured grained calfskin top-handle satchel with twin brass buckles',
    width: 1200,
    height: 800,
    category: 'product',
    objectPosition: 'center',
  },
  bagAtelierTote: {
    id: 'lume-bag-atelier-tote',
    src: '/images/bag-atelier-tote.jpg',
    alt: 'LŪMÉ La Élan grained leather flap handbag with brushed gold clasp',
    width: 1200,
    height: 1500,
    category: 'product',
    objectPosition: 'center',
  },
  bagCrossbodyQuilted: {
    id: 'lume-bag-crossbody-quilted',
    src: '/images/bag-espresso-side.jpg',
    alt: 'LŪMÉ Le Valmont black calfskin shoulder silhouette with brushed brass chain strap',
    width: 1200,
    height: 800,
    category: 'product',
    objectPosition: 'center',
  },
  bagChainBlush: {
    id: 'lume-bag-chain-blush',
    src: '/images/editorial-campaign.jpg',
    alt: 'LŪMÉ monochrome editorial portrait holding an architectural leather clutch',
    width: 1200,
    height: 1800,
    category: 'editorial',
    objectPosition: 'center',
  },
  bagStudioCrimson: {
    id: 'lume-bag-studio-structured',
    src: '/images/bag-taupe-shoulder.jpg',
    alt: 'LŪMÉ botanical capsule hand-printed calfskin top-handle handbag',
    width: 1200,
    height: 1800,
    category: 'product',
    objectPosition: 'center',
  },
  editorialCraftsmanship: {
    id: 'lume-editorial-craftsmanship',
    src: '/images/editorial-craftsmanship.jpg',
    alt: 'Woven artisanal leather top-handle handbag featuring hand-finished edge piping',
    width: 1200,
    height: 1600,
    category: 'editorial',
    objectPosition: 'center',
  },
} as const satisfies Record<string, BrandAsset>;

export type BrandAssetKey = keyof typeof brandAssets;
