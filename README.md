# UIForge

`uiforge` is the UI workspace inside `ui-foundry`.

It is a `pnpm` + `turbo` monorepo that separates:

- a reference app
- a Radix-based component package
- a Base UI-based component package
- a shared package for primitive-agnostic utilities and styling infrastructure

## Workspace Structure

```txt
apps/
  web/
packages/
  radix-ui/
  base-ui/
  ui-shared/
  eslint-config/
  typescript-config/
```

## Package Roles

### `apps/web`

- reference and consumer app
- imports from workspace packages
- is not the source of truth for shared UI code
- may contain app-local components when they do not need to be shared with `radix-ui` or `base-ui`

### `@workspace/radix-ui`

- Radix-based component package
- maintained in the `packages/radix-ui` package context
- component updates are run against that package's `components.json`

### `@workspace/base-ui`

- Base UI-based component package
- maintained in the `packages/base-ui` package context
- component updates are run against that package's `components.json`

### `@workspace/ui-shared`

- primitive-agnostic shared utilities
- shared styling infrastructure owner
- stores the shared `lib` and `hooks` targets referenced by package `components.json` files
- is the shared destination for shadcn CLI-generated `lib` and `hooks` outputs used by `radix-ui` and `base-ui`
- does not own primitive-specific component logic

## Import Examples

```tsx
import { Drawer } from "@workspace/base-ui/components/drawer"
import { Button } from "@workspace/radix-ui/components/button"
import { cn } from "@workspace/ui-shared/lib/utils"
```

## Component Update Examples

Run component and package-library updates in the owning package context.

`radix-ui`:

```bash
pnpm dlx shadcn@latest add button --cwd packages/radix-ui
pnpm dlx shadcn@latest add --all --cwd packages/radix-ui
```

`base-ui`:

```bash
pnpm dlx shadcn@latest add button --cwd packages/base-ui
pnpm dlx shadcn@latest add --all --cwd packages/base-ui
```

Library updates should follow the same ownership rule:

- update Radix-side package libraries from `packages/radix-ui`
- update Base UI-side package libraries from `packages/base-ui`

## Testing Notes

Vitest is configured at the repository root and collects tests from both `apps/*` and `packages/*`.
Playwright end-to-end testing is owned by `apps/web`.

## Architecture Notes

The detailed architecture, package boundaries, styling ownership, and package maintenance rules are documented in [`docs/architecture.md`](docs/architecture.md).
