# Lluvia de Ideas

Business idea management app. Spanish-language UI for storing, organizing, and analyzing business ideas with status tracking, priority, cost estimates, and detailed breakdowns.

## Guiding Maxims

- **"Perfection is finally attained not when there is no longer anything to add, but when there is no longer anything to take away."** — Antoine de Saint-Exupéry
  - Favor simplicity over configurability
  - Remove optional parameters when sensible defaults exist
  - Be opinionated rather than flexible

- **Never lower the bar.** Never weaken thresholds, disable checks, relax lint rules, skip tests, or lower coverage limits to make something pass. If a check fails, fix the underlying code. The correct response to a failing quality gate is always to meet it, never to move it.

- **Never estimate effort or duration for human work.** Focus on what needs to be done, not how long it might take.

## Repository Structure

```
src/
  app/                        — Next.js App Router pages and layouts
    (protected)/              — Auth-gated routes (dashboard, ideas, desglose)
    auth/                     — Login page and OAuth callback
  components/
    atoms/                    — Smallest reusable units (badges, icons, avatar)
    molecules/                — Composed from atoms (row-actions, stat-item, user-nav)
    organisms/                — Complex composites (tables, forms, navbar, dialogs)
    ui/                       — shadcn/ui generated components (DO NOT EDIT MANUALLY)
  lib/
    supabase/                 — Supabase client/server/middleware helpers
    types/                    — TypeScript type definitions
    utils.ts                  — cn() utility for Tailwind class merging
  hooks/                      — Custom React hooks
  middleware.ts               — Supabase session refresh middleware
```

## Git Workflow

- **NEVER push directly to master** — always work on a feature branch and create a PR
- Prefer rebase: `git rebase master` or `git pull --rebase`
- **NEVER run `git push` directly** — always use the `prepare-push` skill first
- Before updating a PR, check its status (`gh pr view --json state`). If merged, create a new branch.

## Development Commands

```bash
pnpm install               # Install dependencies
pnpm dev                   # Start dev server (http://localhost:3000)
pnpm build                 # Production build
pnpm lint                  # ESLint (Next.js + TypeScript rules)
pnpm format                # Format all source files with Prettier
pnpm format:check          # Check formatting without writing
```

## Formatting

**Run the formatter after every file edit** — this is "format on save":

```bash
pnpm exec prettier --write <filepath>
```

The auto-format hook handles this automatically, but run it manually if needed.

## Code Quality Rules

### General

- Don't add features, refactor code, or make "improvements" beyond what was asked
- Don't add error handling for scenarios that can't happen
- Don't create helpers or abstractions for one-time operations
- Three similar lines of code is better than a premature abstraction
- Be careful not to introduce security vulnerabilities (XSS, injection, etc.)

### React

- **useEffect is only for external synchronization** — networks, browser APIs, timers
- **Prefer event handlers** — update state in response to user interactions, not useEffect
- **Avoid state derivation in useEffect** — calculate during render instead
- **Include all dependencies** — use `useCallback`/`useMemo` for objects/arrays/functions
- **Always provide cleanup** — return a function that undoes setup

### TypeScript

- Never use `any` — use `unknown` + type narrowing instead
- Use `@/*` path aliases (maps to `src/*`) — never relative paths like `../../../`
- Import types with `import type` when importing only types

### File Organization

- All source files ≤400 lines — split properly when exceeded
- Co-locate related code (component + its helpers in same directory)
- Filename convention: kebab-case (e.g., `cost-badge.tsx`, `idea-form-sheet.tsx`)

## Component Architecture (Atomic Design)

```
src/components/
  atoms/       — Smallest UI units. Single responsibility. No business logic.
  molecules/   — Composed from atoms. May have light interaction logic.
  organisms/   — Complex composites. May connect to data sources.
  ui/          — shadcn/ui generated. NEVER edit manually.
```

### Rules

- **Dependency direction:** atoms cannot import from molecules/organisms. Molecules can import atoms. Organisms can import both.
- **Named exports only** — `export function CostBadge()`, not `export default`
- **Props use `interface`** — define props inline or as `interface ComponentNameProps`
- **Use `cn()` for class merging** — import from `@/lib/utils`
- **shadcn/ui components are read-only** — regenerate via `pnpm dlx shadcn@latest add <component>`, never hand-edit
- **Server Components by default** — pages in `src/app/` are Server Components. Only add `"use client"` when needed for interactivity.

## Supabase Patterns

- **Server-side data fetching:** use `createClient()` from `@/lib/supabase/server`
- **Client-side data fetching:** use `createBrowserClient()` from `@/lib/supabase/client`
- **No direct `process.env` access** outside `lib/supabase/` — all Supabase config is centralized there
- **Auth middleware** in `src/middleware.ts` handles session refresh via `updateSession()`
- **Protected routes** live under `src/app/(protected)/` — the layout checks auth and redirects

## Domain Language

This is a Spanish-language app. Business types use Spanish terms:

- `Idea` — the core entity with fields: `nombre`, `idea`, `descripción`, `plan_de_negocio`, `estructura`, `planificacion`
- `costo` — cost level: Bajo / Medio / Alto
- `prioridad` — priority: Alta / Media / Baja
- `estado` — status: Idea / En análisis / En desarrollo / Descartada
- `mercado_objetivo`, `diferenciador_clave`, `competencia` — market analysis fields

Code identifiers mix Spanish domain terms with English patterns. This is intentional.

## Build/Test Hygiene

- **Never ignore errors, even if unrelated to your work** — always offer to fix them
- **Verify a clean starting point** before starting significant work
- **No errors are "acceptable"** — investigate and resolve every error
- **Never re-run a long command just to see different output** — write to a temp file and explore it
