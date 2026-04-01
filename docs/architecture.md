# UIForge Architecture

This document explains the current architecture of `uiforge`.

Its purpose is to help a developer or coding agent quickly understand:

- why the repository is split into multiple packages
- what each package owns
- where component and dependency changes belong
- how package-local component updates are expected to be run

It documents the current structure. It is not a task list or roadmap.

## Architecture Overview

`uiforge` is a `pnpm` + `turbo` monorepo with one consumer app and several workspace packages.

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

The split between `radix-ui`, `base-ui`, and `ui-shared` is intentional.

- `radix-ui` owns the Radix-based component package
- `base-ui` owns the Base UI-based component package
- `ui-shared` owns primitive-agnostic shared utilities and shared styling infrastructure

This structure should remain explicit. The repository should not collapse these responsibilities back into a single UI package.

## Package Responsibilities

### `apps/web`

`apps/web` is the reference and consumer app.

- It consumes workspace packages.
- It does not own shared UI source of truth.
- It exists to exercise and integrate the package outputs.
- It may still contain app-local components when those components do not need to be shared with `radix-ui` or `base-ui`.

### `packages/radix-ui`

`packages/radix-ui` is the Radix-based component package.

- It owns Radix-based component implementations.
- It is maintained in its own package context.
- Component additions and updates should be run against `packages/radix-ui`.
- Package-local runtime logic that is tied to the Radix implementation belongs here.

### `packages/base-ui`

`packages/base-ui` is the Base UI-based component package.

- It owns Base UI-based component implementations.
- It is maintained in its own package context.
- Component additions and updates should be run against `packages/base-ui`.
- Package-local runtime logic that is tied to the Base UI implementation belongs here.

### `packages/ui-shared`

`packages/ui-shared` is the shared package.

- It owns primitive-agnostic utilities.
- It owns shared styling infrastructure.
- It stores the shared `lib` and `hooks` targets referenced by package `components.json` files.
- It is the shared destination for shadcn CLI-generated `lib` and `hooks` outputs used by `radix-ui` and `base-ui`.
- It should stay focused on shared concerns.
- Primitive-specific component logic does not belong here.

## Styling Architecture

Shared styling infrastructure is intentionally owned by `ui-shared`.

Current shared styling entrypoints:

- `@workspace/ui-shared/globals.css`
- `@workspace/ui-shared/postcss.config`

This ownership exists to keep the app and component packages structurally decoupled from a single primitive implementation.

In practice, this means:

- `apps/web` consumes shared styling from `ui-shared`
- `radix-ui` and `base-ui` also point to shared styling infrastructure
- primitive packages do not act as the long-term owner of global style infrastructure

The goal of this decision is architectural neutrality. Shared styling belongs to the neutral package, not to `radix-ui` or `base-ui`.

## Dependency Placement Rules

Dependencies should follow ownership, not convenience.

### Put shared dependencies in `ui-shared`

Examples:

- primitive-agnostic utilities
- shared styling infrastructure
- shared Tailwind and PostCSS support
- shared `lib` and `hooks` support referenced by package `components.json` files

### Keep primitive-specific dependencies in the owning package

Examples:

- Radix-specific runtime and component logic in `radix-ui`
- Base UI-specific runtime and component logic in `base-ui`

### Dependency rule of thumb

If a package imports a library directly in its own source code, that package should own the dependency directly.

Depending on `@workspace/ui-shared` means the package may use what `ui-shared` exports. It does not mean that every transitive dependency inside `ui-shared` becomes a direct dependency for other packages.

In this repository, `ui-shared` is not a generic dumping ground for unrelated shared code. It is the shared home for the `lib` and `hooks` targets referenced by the package `components.json` files, along with the shared styling infrastructure those packages consume.

## Component Package Maintenance

`radix-ui` and `base-ui` are both maintained as package-local component packages through their own `components.json` files.

The distinction between them is not the maintenance workflow. The distinction is the primitive layer each package is built around.

- `radix-ui` is the Radix-based package
- `base-ui` is the Base UI-based package

When a package-specific library or component set needs updating, perform the update in the owning package directory.

- update `radix-ui` from `packages/radix-ui`
- update `base-ui` from `packages/base-ui`

`apps/web` is not the maintenance context for either component package.

This rule applies to both:

- component additions or refreshes through shadcn CLI
- package-library updates for the primitive stack owned by that package

In practice:

- update Radix-side libraries from `packages/radix-ui`
- update Base UI-side libraries from `packages/base-ui`

### shadcn CLI examples

Run package updates against the package that owns the components.

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

These commands are examples of package ownership and maintenance context. They are not a roadmap or recommendation sequence.

## Testing Architecture

Testing is split by test type.

### Vitest

Vitest is configured at the workspace root.

- run unit and component tests from the repository root
- collect tests from both `apps/*` and `packages/*`
- keep global test setup in the root Vitest configuration

This keeps test execution consistent across the monorepo while avoiding duplicated runner configuration in each workspace.

Workspace-specific test helpers should remain in the owning workspace.

- app-specific render helpers belong in `apps/web`
- package-specific test helpers belong in the owning package

Root-level test utilities should stay limited to helpers that are genuinely shared across both apps and packages.

### Playwright

Playwright is owned by `apps/web`.

- keep the Playwright configuration in `apps/web`
- keep end-to-end tests in `apps/web/e2e`
- use Playwright to validate consumer-app behavior, not package-internal implementation details

This keeps browser-based testing aligned with the actual app integration surface while allowing Vitest to remain the shared runner for lower-level tests.

## Tooling Configuration

### ESLint

Each workspace uses a preset from `@workspace/eslint-config`.

| Workspace | Preset |
|-----------|--------|
| `packages/radix-ui` | `react-internal` |
| `packages/base-ui` | `react-internal` |
| `packages/ui-shared` | `react-internal` |
| `apps/web` | `next-js` |

The `base` preset is available for non-React contexts. Do not mix presets across the wrong workspace type.

### TypeScript

Each workspace extends a config from `@workspace/typescript-config`.

| Workspace | Config |
|-----------|--------|
| `packages/radix-ui` | `react-library.json` |
| `packages/base-ui` | `react-library.json` |
| `packages/ui-shared` | `react-library.json` |
| `apps/web` | `nextjs.json` |
| root `tsconfig.json` | `base.json` |

### Prettier and Tailwind Class Sorting

Prettier is configured at the repository root with two plugins:

- `@ianvs/prettier-plugin-sort-imports` — enforces the import order defined in `.prettierrc`
- `prettier-plugin-tailwindcss` — sorts Tailwind utility classes

The Tailwind class sorter is configured with:

```json
"tailwindStylesheet": "packages/ui-shared/src/styles/globals.css",
"tailwindFunctions": ["cn", "cva"]
```

This means the class sort order for all packages is determined by `packages/ui-shared/src/styles/globals.css`. This is a deliberate extension of the `ui-shared` styling ownership model — even the formatter enforces the shared style contract.

When adding new Tailwind utilities or layers to the shared stylesheet, be aware that it affects class ordering across the entire repository.

## Git Workflow

Commits are enforced through Husky and commitlint.

- **Husky** runs the commitlint check as a commit-msg hook
- **commitlint** uses `@commitlint/config-conventional`
- All commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) format

Common prefixes: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `build:`, `ci:`

Commits that do not follow the convention will be rejected at the hook stage.

## Turbo Pipeline

Tasks are defined in `turbo.json`. Key behaviors:

| Task | Caching | Notes |
|------|---------|-------|
| `build` | Yes | Depends on `^build` (upstream first); outputs `.next/**` |
| `lint` | Yes | Depends on `^lint` |
| `format` | Yes | Depends on `^format` |
| `typecheck` | Yes | Depends on `^typecheck` |
| `test` | Yes | Depends on `^test` |
| `test:e2e` | **No** | Always runs; reads `CI` env variable |
| `dev` | **No** | Persistent mode |

`test:e2e` is never cached. Every invocation runs the full Playwright suite against the running dev server.

## Known Exceptions

### `combobox.tsx` uses `@base-ui/react` in the Radix package

- `packages/radix-ui/src/components/combobox.tsx` uses `@base-ui/react`

This is a documented exception to the general package-boundary rule. It should be understood as a current allowed exception, not as the default model for package ownership.
