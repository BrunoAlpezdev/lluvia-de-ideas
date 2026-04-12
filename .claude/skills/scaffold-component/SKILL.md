---
name: scaffold
description: Generate boilerplate for new components, pages, or types following Atomic Design conventions. Trigger on "create component", "scaffold", "new page", "new atom", "new molecule", "new organism".
---

# Scaffold Component

Ask the user:

```
What do you want to create?

1. Atom       — small reusable unit (src/components/atoms/)
2. Molecule   — composed from atoms (src/components/molecules/)
3. Organism   — complex composite (src/components/organisms/)
4. Page       — App Router page (src/app/)
5. Type       — TypeScript type definition (src/lib/types/)

Which one?
```

Then ask: component name.

## Before Generating

**Read 2-3 similar existing files** in the target directory to understand:
- Import paths and patterns
- Naming conventions
- Directory structure

Match the existing code exactly. Don't impose patterns from memory.

### Observed Conventions

- **Named exports only** — `export function ComponentName()`, never `export default`
- **Kebab-case filenames** — `cost-badge.tsx`, `idea-form-sheet.tsx`
- **Props as inline type or `interface`** — `{ costo }: { costo: Idea["costo"] }` or `interface Props {}`
- **`cn()` for class merging** — import from `@/lib/utils`
- **shadcn/ui imports** — from `@/components/ui/*`
- **Type imports** — `import type { Idea } from "@/lib/types/database"`
- **Path aliases** — always `@/*`, never relative `../`

## Generation

- Place files in the correct Atomic Design directory
- Filename in kebab-case matching the component name
- Use the project's actual imports, not generic ones
- Pages are Server Components by default — only add `"use client"` if needed

## After Generating

- Run the formatter on new files
- Tell the user what to add to the router (if page) or exports (if needed)
- Don't auto-add to routers or barrels without asking
