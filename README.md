# LŪMÉ — International Luxury Handbag E-Commerce Platform

Production-oriented foundation for **LŪMÉ**, an international women's luxury handbag house built with Next.js App Router, TypeScript, Tailwind CSS, and MongoDB.

---

## Technology Stack

- **Framework:** Next.js 15 (App Router, React 19, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB Native Driver
- **Validation:** Zod
- **Planned Integrations (Phase 02+):** Auth.js, Stripe, Cloudinary, Resend, React Hook Form, Framer Motion
- **Deployment & SCM:** Vercel & GitHub

---

## Project Architecture

```text
.
├── public/                     # Static assets (brand marks, editorial media, favicons)
├── src/
│   ├── app/                    # Next.js App Router routes, layouts, metadata, API handlers
│   │   ├── api/health/         # Service & database readiness endpoint
│   │   ├── error.tsx           # Route error boundary
│   │   ├── globals.css         # Tailwind v4 entry & LŪMÉ design tokens
│   │   ├── layout.tsx          # Root layout, self-hosted typography, accessibility skip-link
│   │   ├── not-found.tsx       # 404 boundary
│   │   └── page.tsx            # Foundation placeholder page
│   ├── components/             # Shared, domain-agnostic UI components
│   │   ├── ui/                 # Base primitives (buttons, inputs, modals)
│   │   ├── layout/             # Header, footer, navigation shells
│   │   └── shared/             # Cross-cutting presentation helpers
│   ├── features/               # Feature-based domain modules (catalog, cart, checkout, auth, orders, account)
│   ├── lib/                    # Core infrastructure utilities
│   │   ├── api/                # API response builders, AppError hierarchy, route handler wrapper
│   │   ├── db/                 # Centralized MongoDB connection & pool singleton
│   │   ├── env/                # Strict server/client environment validation boundaries
│   │   └── utils/              # Pure helpers (`cn`, formatting, etc.)
│   ├── services/               # Server-only domain & external service adapters
│   ├── models/                 # MongoDB collection registry & document interfaces
│   ├── hooks/                  # Client-only custom React hooks (`use-*`)
│   ├── types/                  # Shared TypeScript interfaces and API contracts
│   ├── validations/            # Reusable Zod input/query schemas
│   └── config/                 # Site metadata, supported currencies/locales, constants
├── .env.example                # Safe environment variable template (no real secrets)
├── eslint.config.mjs           # ESLint flat config (Next.js + TypeScript)
├── next.config.ts              # Next.js config (Cloudinary remotePatterns, security headers)
├── postcss.config.mjs          # PostCSS Tailwind v4 plugin
└── tsconfig.json               # Strict TypeScript compiler options & path aliases
```

---

## Server & Client Boundaries

1. **Server-only enforcement:** Modules in `src/lib/db/`, `src/lib/env/server.ts`, `src/lib/api/`, and `src/services/` import `'server-only'`. Importing them inside a `'use client'` module fails at build time.
2. **Client-only enforcement:** Browser-only hooks (e.g., `src/hooks/use-mounted.ts`) import `'client-only'` and declare `'use client'`.
3. **Environment isolation:** Only `NEXT_PUBLIC_*` variables are exposed via `src/lib/env/client.ts`. All credentials (`MONGODB_URI`, `AUTH_SECRET`, `STRIPE_SECRET_KEY`, `CLOUDINARY_API_SECRET`, `RESEND_API_KEY`) are read strictly via `src/lib/env/server.ts`.

---

## Naming Conventions

| Artifact                   | Convention                     | Example                                   |
| -------------------------- | ------------------------------ | ----------------------------------------- |
| Files & folders            | `kebab-case`                   | `src/lib/api/errors.ts`, `use-mounted.ts` |
| React components & classes | `PascalCase`                   | `HomePage`, `AppError`, `NotFoundError`   |
| Types & interfaces         | `PascalCase`                   | `ApiSuccessResponse`, `BaseDocument`      |
| Functions & hooks          | `camelCase` (`use*` for hooks) | `getDatabase`, `apiSuccess`, `useMounted` |
| Constants & env vars       | `UPPER_SNAKE_CASE`             | `COLLECTION_NAMES`, `MONGODB_URI`         |

---

## Getting Started

### Prerequisites

- Node.js `>= 22`
- pnpm `>= 10`
- A MongoDB Atlas or local MongoDB instance (optional for initial boot; required for database queries)

### Local Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your local environment file from the template:

   ```bash
   cp .env.example .env.local
   ```

3. Populate `.env.local` with your development credentials (never commit `.env.local`).

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Visit `http://localhost:3000` and `http://localhost:3000/api/health`.

---

## Available Scripts

| Command             | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `pnpm dev`          | Run Next.js development server with Turbopack        |
| `pnpm build`        | Build production bundle                              |
| `pnpm start`        | Start production server                              |
| `pnpm lint`         | Run ESLint across the repository                     |
| `pnpm lint:fix`     | Auto-fix ESLint issues                               |
| `pnpm typecheck`    | Run strict TypeScript type checking (`tsc --noEmit`) |
| `pnpm format`       | Format codebase with Prettier                        |
| `pnpm format:check` | Verify Prettier formatting                           |

---

## Deployment Notes (Vercel)

- Configure all variables listed in `.env.example` inside Vercel Project Settings -> Environment Variables.
- `src/lib/db/mongodb.ts` manages a single pooled `MongoClient` per runtime instance with bounded pool sizing (`maxPoolSize: 10`) suited for serverless execution.
