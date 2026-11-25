# Server Services Layer

This directory contains `server-only` domain and third-party integration services introduced in upcoming phases:

- `db/` — MongoDB repository queries and indexing helpers
- `auth/` — Auth.js configuration and session adapters
- `payments/` — Stripe Checkout, PaymentIntents, and webhook verification
- `media/` — Cloudinary asset signing and upload orchestration
- `email/` — Resend transactional email dispatchers

Every module inside `src/services/` must declare `import 'server-only';` at the top.
