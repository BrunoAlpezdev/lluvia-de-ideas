---
name: merge-conflicts
description: Resolve complex git merge conflicts safely without losing work. Use when git merge or rebase has produced conflicts, when conflict markers (<<<<<<) are present in files, when the user mentions merge conflicts, or when git status shows unmerged paths.
---

# Merge Conflicts

Systematic conflict resolution without losing work.

## Step 1: List Conflicted Files

```bash
git diff --name-only --diff-filter=U
```

## Step 2: Categorize Each Conflict

| Category   | Description                               | Resolution                    |
| ---------- | ----------------------------------------- | ----------------------------- |
| Trivial    | Only one side changed meaningfully        | Take the meaningful side      |
| One-side   | Both touched the file, different sections | Keep both                     |
| Combinable | Same section, compatible changes          | Combine manually              |
| Semantic   | Same section, incompatible logic          | Requires understanding intent |

## Step 3: Resolve Incrementally

For each file:

1. Read both sides of every conflict marker
2. Determine category
3. Apply resolution
4. `git add <file>` immediately
5. Move to next file

**Never resolve all files then add them all.** Incremental add lets you verify each.

## Step 4: Special Files

- **Lock files** (pnpm-lock.yaml): Delete and regenerate with `pnpm install`
- **Generated code** (shadcn/ui components in `src/components/ui/`): Delete and regenerate with `pnpm dlx shadcn@latest add <component>`
- **Supabase migrations** (`supabase/migrations/`): Never merge conflicting migrations — create a new migration that achieves the combined result

## Step 5: Verify

```bash
# No remaining conflict markers
grep -rn "<<<<<<" . --include="*.ts" --include="*.tsx"

# Builds
pnpm build
```

Tests: not yet configured. When a test framework is added, also run `pnpm test` here.

## Principles

1. **Understand before resolving** — read both sides
2. **Never lose work** — when in doubt, keep both and refactor after
3. **Regenerate, don't resolve** — for generated/lock/migration files
4. **Verify the merge** — build after resolving
