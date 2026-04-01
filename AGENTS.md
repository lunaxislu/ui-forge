# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, and others) when working with code in this repository.

> For package boundaries, dependency rules, component maintenance workflow, ESLint/TypeScript config mappings, Prettier architecture, and Git workflow — see [docs/architecture.md](docs/architecture.md).

## Commands

```bash
# Development
pnpm dev                    # Start all packages in watch mode
pnpm build                  # Build all packages via Turbo

# Testing
pnpm test                   # Run all Vitest unit/component tests
pnpm test:watch             # Vitest in watch mode
pnpm test:e2e               # Run Playwright E2E tests (requires running dev server)

# Run a single test file
pnpm test apps/web/app/page.test.tsx
# Run tests matching a pattern
pnpm test -- --grep "renders"
# Run Playwright for a specific file
pnpm --filter web exec playwright test e2e/example.spec.ts

# Code quality
pnpm lint                   # ESLint across all packages
pnpm format                 # Prettier across all packages
pnpm typecheck              # TypeScript type checking across all packages
```

## Architecture

pnpm + Turbo monorepo. See [docs/architecture.md](docs/architecture.md) for detailed rules.

```
apps/web/               → Next.js reference/consumer app (Turbopack, Playwright e2e/)
packages/
  radix-ui/             → Radix-based component implementations
  base-ui/              → Base UI-based component implementations
  ui-shared/            → Primitive-agnostic utilities, hooks, shared styling
  eslint-config/        → Shared ESLint configs (base, next-js, react-internal)
  typescript-config/    → Shared TS configs (base, nextjs, react-library)
```

- Package boundaries and dependency placement → [docs/architecture.md](docs/architecture.md#dependency-placement-rules)
- shadcn CLI must be run from the owning package directory → [docs/architecture.md](docs/architecture.md#component-package-maintenance)
- Vitest (root) and Playwright (apps/web) are separate runners → [docs/architecture.md](docs/architecture.md#testing-architecture)

## Conventions

- **Commits:** Conventional Commits enforced via commitlint + Husky
- **Formatting:** Prettier — 4-space indent, 120 char line width, import sort, Tailwind class sort
- **Import order:** React → Next → third-party → `@workspace/*` → `@/` → relative
- **Node version:** 24.14.0 (`.nvmrc`)

## Known Exception

`packages/radix-ui/src/components/combobox.tsx` uses `@base-ui/react` — intentional exception, do not change.
