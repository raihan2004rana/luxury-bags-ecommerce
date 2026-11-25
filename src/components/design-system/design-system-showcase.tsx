'use client';

import { ArrowRight, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { EditorialBlock } from '@/components/shared/editorial-block';
import { EmptyState } from '@/components/shared/empty-state';
import { ProductGallerySkeleton, ProductGridSkeleton } from '@/components/shared/loading-states';
import { NewsletterSection } from '@/components/shared/newsletter-section';
import { PriceDisplay } from '@/components/shared/price-display';
import { ProductCard, type ProductCardItem } from '@/components/shared/product-card';
import { ProductGallery } from '@/components/shared/product-gallery';
import { PromoBanner } from '@/components/shared/promo-banner';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/toast';
import { EditorialHeading, Eyebrow, LeadText } from '@/components/ui/typography';
import { brandAssets } from '@/config/assets';
import { INTERNATIONAL_REGIONS, type MarketRegion } from '@/config/site';

const COLOR_TOKENS = [
  { name: 'Ivory', hex: '#F7F4EF', role: 'Primary Canvas', darkText: true },
  { name: 'Champagne', hex: '#E7DED2', role: 'Secondary Surface', darkText: true },
  { name: 'Taupe', hex: '#A18A73', role: 'Muted Accent & Captions', darkText: true },
  { name: 'Espresso', hex: '#29251F', role: 'Warm Dark Accent', darkText: false },
  { name: 'Deep Black', hex: '#171717', role: 'Primary Ink & CTA', darkText: false },
] as const;

const SAMPLE_PRODUCTS: readonly ProductCardItem[] = [
  {
    id: 'prod-1',
    slug: 'le-solene-satchel',
    name: 'Le Solène Satchel',
    subtitle: 'Full-Grain Taupe Calfskin',
    priceMinor: 245_000,
    primaryAsset: brandAssets.bagSatchelTaupe,
    secondaryAsset: brandAssets.bagAtelierTote,
    badge: { label: 'New Arrival', tone: 'new-arrival' },
    swatches: [
      { name: 'Warm Taupe', hex: '#A18A73' },
      { name: 'Espresso', hex: '#29251F' },
      { name: 'Deep Black', hex: '#171717' },
    ],
  },
  {
    id: 'prod-2',
    slug: 'la-elan-top-handle',
    name: 'La Élan Top-Handle',
    subtitle: 'Supple Pebbled Calfskin · Brushed Brass',
    priceMinor: 289_000,
    primaryAsset: brandAssets.bagAtelierTote,
    secondaryAsset: brandAssets.bagSatchelTaupe,
    badge: { label: 'Atelier Exclusive', tone: 'atelier-exclusive' },
    swatches: [
      { name: 'Forest Petrol', hex: '#1A595F' },
      { name: 'Espresso', hex: '#29251F' },
    ],
  },
  {
    id: 'prod-3',
    slug: 'le-valmont-camera',
    name: 'Le Valmont Quilted',
    subtitle: 'Chevron Calfskin · Aged Gold Chain',
    priceMinor: 215_000,
    compareAtPriceMinor: 240_000,
    primaryAsset: brandAssets.bagCrossbodyQuilted,
    badge: { label: 'Limited Edition', tone: 'limited-edition' },
    swatches: [
      { name: 'Deep Black', hex: '#171717' },
      { name: 'Champagne', hex: '#E7DED2' },
    ],
  },
  {
    id: 'prod-4',
    slug: 'maison-tresse-tote',
    name: 'Maison Tressé',
    subtitle: 'Hand-Woven Italian Calfskin',
    priceMinor: 315_000,
    primaryAsset: brandAssets.editorialCraftsmanship,
    badge: { label: 'Pre-Order', tone: 'pre-order' },
    swatches: [
      { name: 'Saddle Cognac', hex: '#B96A3B' },
      { name: 'Taupe', hex: '#A18A73' },
    ],
  },
];

export function DesignSystemShowcase() {
  const { toast } = useToast();
  const [region, setRegion] = useState<MarketRegion>(
    INTERNATIONAL_REGIONS[4] ?? INTERNATIONAL_REGIONS[0]!,
  );
  const [bagItems, setBagItems] = useState<readonly ProductCardItem[]>([]);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [showSkeletonPreview, setShowSkeletonPreview] = useState(false);

  const handleQuickAdd = (product: ProductCardItem) => {
    setBagItems((prev) => [...prev, product]);
    toast({
      title: 'Added to Shopping Bag',
      description: `${product.name} — ${product.subtitle}`,
      tone: 'success',
    });
  };

  return (
    <div className="bg-ivory text-obsidian min-h-dvh">
      <AnnouncementBar />
      <SiteHeader
        bagCount={bagItems.length}
        activeRegion={region}
        onRegionChange={setRegion}
        onOpenBag={() => setBagDrawerOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main id="main-content">
        {/* Hero Intro */}
        <section className="border-border-subtle border-b px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[90rem]">
            <Breadcrumbs
              items={[
                { label: 'Maison', href: '/' },
                { label: 'Phase 02', href: '/design-system' },
                { label: 'Brand Design System' },
              ]}
            />
            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow>Phase 02 · Visual Identity &amp; Component System</Eyebrow>
                <EditorialHeading as="h1" scale="display-xl" className="mt-4">
                  Quiet Luxury Architecture for LŪMÉ
                </EditorialHeading>
              </div>
              <div className="lg:col-span-4">
                <LeadText>
                  Foundational tokens, editorial typography, and reusable interface primitives built
                  for international luxury clientele.
                </LeadText>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Color Palette & Typography */}
        <section className="mx-auto max-w-[90rem] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow>01 · Color Tokens</Eyebrow>
              <EditorialHeading as="h2" scale="h1" className="mt-3">
                Warm Mineral &amp; Espresso Palette
              </EditorialHeading>
              <p className="text-charcoal mt-3 text-sm leading-relaxed">
                Five core tones anchored in sunlit ivory and espresso, paired with subtle 1px
                hairlines instead of heavy drop shadows.
              </p>

              <div className="mt-8 grid gap-3">
                {COLOR_TOKENS.map((token) => (
                  <div
                    key={token.name}
                    className="border-border-subtle flex items-center justify-between border px-5 py-4"
                    style={{ backgroundColor: token.hex }}
                  >
                    <div>
                      <p
                        className={`text-xs font-medium tracking-[0.18em] uppercase ${
                          token.darkText ? 'text-obsidian' : 'text-ivory'
                        }`}
                      >
                        {token.name}
                      </p>
                      <p
                        className={`mt-0.5 text-xs ${
                          token.darkText ? 'text-charcoal' : 'text-champagne/80'
                        }`}
                      >
                        {token.role}
                      </p>
                    </div>
                    <span
                      className={`font-mono text-xs ${
                        token.darkText ? 'text-obsidian' : 'text-ivory'
                      }`}
                    >
                      {token.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <Eyebrow>02 · Typography System</Eyebrow>
              <EditorialHeading as="h2" scale="h1" className="mt-3">
                Editorial Serif &amp; Architectural Sans
              </EditorialHeading>

              <div className="border-border-subtle divide-border-subtle mt-8 divide-y border-y">
                <div className="py-6">
                  <p className="text-taupe text-[10px] tracking-[0.2em] uppercase">
                    Display XL · Cormorant Garamond
                  </p>
                  <p className="font-editorial mt-2 text-5xl sm:text-6xl">Sculpted in Silence</p>
                </div>
                <div className="py-6">
                  <p className="text-taupe text-[10px] tracking-[0.2em] uppercase">
                    Display L · Editorial Section Heading
                  </p>
                  <p className="font-editorial mt-2 text-4xl">
                    Florentine Saddle-Stitched Calfskin
                  </p>
                </div>
                <div className="py-6">
                  <p className="text-taupe text-[10px] tracking-[0.2em] uppercase">
                    Body &amp; Tabular Pricing · Plus Jakarta Sans
                  </p>
                  <p className="text-charcoal mt-2 max-w-xl text-sm leading-relaxed">
                    Every LŪMÉ silhouette balances structural poise with supple full-grain leather,
                    hand-painted edges, and solid brushed brass hardware.
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-6">
                    <PriceDisplay
                      amountMinor={245_000}
                      currency={region.currency}
                      showCurrencyCode
                      size="lg"
                    />
                    <PriceDisplay
                      amountMinor={215_000}
                      compareAtAmountMinor={240_000}
                      currency={region.currency}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Interactive Controls, Badges, Modals, Drawers & Toasts */}
        <section className="bg-alabaster border-border-subtle border-y px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[90rem]">
            <Eyebrow>03 · Primitives &amp; Interactive Surfaces</Eyebrow>
            <EditorialHeading as="h2" scale="h1" className="mt-3">
              Buttons, Badges, Overlays &amp; Feedback
            </EditorialHeading>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <p className="text-taupe mb-3 text-[10px] tracking-[0.2em] uppercase">
                    Button Hierarchy
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Acquire Piece</Button>
                    <Button variant="secondary">Client Services</Button>
                    <Button variant="outline">Explore Atelier</Button>
                    <Button variant="ghost">Details</Button>
                    <Button variant="link">Care Guide</Button>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <Button size="sm" variant="primary">
                      Small CTA
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      rightIcon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={1.25} />}
                    >
                      Large Editorial CTA
                    </Button>
                    <Button variant="primary" isLoading>
                      Processing
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-taupe mb-3 text-[10px] tracking-[0.2em] uppercase">
                    Product Badges
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge tone="new-arrival">New Arrival</Badge>
                    <Badge tone="atelier-exclusive">Atelier Exclusive</Badge>
                    <Badge tone="limited-edition">Limited Edition</Badge>
                    <Badge tone="pre-order">Pre-Order</Badge>
                    <Badge tone="sold-out">Waitlist Only</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-taupe mb-3 text-[10px] tracking-[0.2em] uppercase">
                    Interactive Overlays &amp; Toast Notifications
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={() => setBagDrawerOpen(true)}>
                      Open Bag Drawer ({bagItems.length})
                    </Button>
                    <Button variant="outline" onClick={() => setSearchModalOpen(true)}>
                      Open Search Modal
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() =>
                        toast({
                          title: 'Salon Appointment Noted',
                          description: `Private viewing queued for ${region.label}.`,
                          tone: 'default',
                        })
                      }
                    >
                      Trigger Toast
                    </Button>
                    <Button variant="ghost" onClick={() => setShowSkeletonPreview((prev) => !prev)}>
                      {showSkeletonPreview ? 'Show Live Cards' : 'Preview Loading States'}
                    </Button>
                  </div>
                </div>

                <div className="border-border-subtle bg-ivory flex items-center gap-4 border p-4">
                  <Spinner size="sm" />
                  <p className="text-charcoal text-xs">
                    Active international market:{' '}
                    <strong className="text-obsidian">{region.label}</strong> ({region.currency}) —{' '}
                    {region.shippingNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Product Cards & Loading States */}
        <section className="mx-auto max-w-[90rem] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <Eyebrow>04 · Product Cards &amp; Loading States</Eyebrow>
              <EditorialHeading as="h2" scale="h1" className="mt-3">
                Signature Handbag Grid
              </EditorialHeading>
            </div>
            <p className="text-taupe text-xs">
              Hover cards for secondary angle swap &amp; quick-add affordance.
            </p>
          </div>

          <div className="mt-10">
            {showSkeletonPreview ? (
              <div className="space-y-12">
                <ProductGridSkeleton count={4} />
                <ProductGallerySkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {SAMPLE_PRODUCTS.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, currency: region.currency }}
                    onQuickAdd={handleQuickAdd}
                    onToggleWishlist={(item) =>
                      toast({
                        title: 'Wishlist Updated',
                        description: item.name,
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 4. Product Gallery Preview */}
        <section className="border-border-subtle border-t px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[90rem]">
            <Eyebrow>05 · Product Image Gallery</Eyebrow>
            <EditorialHeading as="h2" scale="h1" className="mt-3">
              Multi-Angle Studio Inspection
            </EditorialHeading>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <ProductGallery
                  productName="Le Solène Satchel"
                  assets={[
                    brandAssets.bagSatchelTaupe,
                    brandAssets.bagAtelierTote,
                    brandAssets.bagCrossbodyQuilted,
                    brandAssets.editorialCraftsmanship,
                  ]}
                />
              </div>

              <div className="space-y-6 lg:col-span-5 lg:pt-4">
                <Badge tone="atelier-exclusive">Atelier Piece</Badge>
                <EditorialHeading as="h3" scale="display-lg">
                  Le Solène Satchel
                </EditorialHeading>
                <PriceDisplay
                  amountMinor={245_000}
                  currency={region.currency}
                  showCurrencyCode
                  size="lg"
                />
                <p className="text-charcoal text-sm leading-relaxed">
                  Structured architectural silhouette cut from supple full-grain calfskin, finished
                  with twin brushed brass buckles and hand-burnished edges. Click the expand icon on
                  the stage to inspect the lightbox modal.
                </p>

                <EmptyState
                  eyebrow="06 · Empty State Pattern"
                  icon={<Sparkles className="h-5 w-5" strokeWidth={1.25} />}
                  title="No Saved Monogram Preferences"
                  description="Client bespoke embossing preferences appear here once configured during private checkout."
                  actionLabel="Configure Preference"
                  onAction={() =>
                    toast({
                      title: 'Bespoke Monogramming',
                      description: 'Available on Le Solène & La Élan editions.',
                    })
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Editorial Content Block & Promotional Banners */}
        <section className="mx-auto max-w-[90rem] space-y-20 px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
          <div>
            <Eyebrow>07 · Editorial Content Block</Eyebrow>
            <EditorialBlock
              className="mt-6"
              eyebrow="Savoir-Faire"
              title="Architecture Meets Supple Craft"
              lead="Constructed over forty-two individual pattern pieces in our partner ateliers."
              body="Each handbag undergoes edge-by-edge hand painting, tonal linen saddle stitching, and custom solid brass casting designed to develop a subtle, luminous patina over decades."
              asset={brandAssets.bagChainBlush}
              ctaLabel="Discover the Atelier"
              ctaHref="#savoir-faire"
              details={[
                { label: 'Leather Origin', value: 'Tuscany & Auvergne' },
                { label: 'Hardware', value: 'Solid Brushed Brass' },
                { label: 'Stitching', value: 'Waxed Linen Thread' },
                { label: 'Batch Size', value: 'Numbered 150 Pieces' },
              ]}
            />
          </div>

          <div className="space-y-10">
            <Eyebrow>08 · Promotional Banners</Eyebrow>
            <PromoBanner
              variant="split"
              eyebrow="Autumn — Winter Capsule"
              title="The Nocturne Leather Edit"
              description="An intimate study in deep espresso, obsidian box calfskin, and sculptural proportions for day-to-evening poise."
              ctaLabel="View the Edit"
              ctaHref="#nocturne"
              asset={brandAssets.bagCrossbodyQuilted}
            />
            <PromoBanner
              variant="champagne-band"
              eyebrow="International Clienteling"
              title="Complimentary Global Express Delivery"
              description="Delivered duties-paid across the United States, United Kingdom, Canada, Australia, Europe, and the Middle East."
              ctaLabel="Shipping Concierge"
              ctaHref="#shipping"
            />
          </div>
        </section>

        {/* 6. Newsletter Section */}
        <NewsletterSection />
      </main>

      <SiteFooter activeRegion={region} onRegionChange={setRegion} />

      {/* Shopping Bag Drawer Demo */}
      <Drawer
        open={bagDrawerOpen}
        onClose={() => setBagDrawerOpen(false)}
        title={`Shopping Bag (${bagItems.length})`}
        footer={
          <div className="space-y-3">
            <p className="text-taupe text-xs">{region.shippingNote}</p>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                setBagDrawerOpen(false);
                toast({
                  title: 'Checkout Flows',
                  description: 'Stripe international checkout will be wired in upcoming phases.',
                });
              }}
            >
              Proceed to Checkout
            </Button>
          </div>
        }
      >
        {bagItems.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="h-5 w-5" strokeWidth={1.25} />}
            title="Your Bag Is Empty"
            description="Select Quick Add on any handbag card in the preview to test the bag drawer state."
            actionLabel="Return to Preview"
            onAction={() => setBagDrawerOpen(false)}
          />
        ) : (
          <ul className="divide-border-subtle divide-y">
            {bagItems.map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-editorial text-lg">{item.name}</p>
                  <p className="text-taupe text-xs">{item.subtitle}</p>
                </div>
                <PriceDisplay amountMinor={item.priceMinor} currency={region.currency} size="sm" />
              </li>
            ))}
          </ul>
        )}
      </Drawer>

      {/* Search Modal Demo */}
      <Modal
        open={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Search the Maison"
        description="Explore silhouettes, leather finishes, or seasonal editions."
      >
        <div className="border-border-strong flex items-center gap-3 border-b pb-3">
          <Search className="text-taupe h-4 w-4" strokeWidth={1.25} />
          <label htmlFor="design-system-search" className="sr-only">
            Search LŪMÉ catalog
          </label>
          <input
            id="design-system-search"
            type="search"
            placeholder="Le Solène, Box Calfskin, Clutch..."
            className="text-obsidian placeholder:text-taupe w-full bg-transparent text-sm focus:outline-none"
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Le Solène', 'Box Calfskin', 'Evening Clutches', 'Taupe'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setSearchModalOpen(false);
                toast({ title: 'Search Selected', description: term });
              }}
              className="border-border-subtle hover:border-obsidian text-charcoal border px-3 py-1.5 text-xs tracking-wide transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}
