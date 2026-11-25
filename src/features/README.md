# Feature Modules

Domain-driven feature slices will live here as the platform is built:

- `auth/` — Authentication & session UI/actions
- `catalog/` — Luxury handbag collections, products, variants, and filtering
- `cart/` — Persistent shopping bag state and synchronization
- `checkout/` — International shipping, currency, and Stripe payment flow
- `orders/` — Order confirmation, history, and fulfillment tracking
- `account/` — Client profile, saved addresses, and wishlist

Each feature slice owns its domain-specific components, hooks, actions, and client helpers while sharing foundational primitives from `src/lib/`, `src/components/`, `src/models/`, and `src/services/`.
