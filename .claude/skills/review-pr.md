---
name: review-pr
description: Review pull requests for code quality, patterns, and potential issues. Analyzes diffs, checks for coding standards, and provides actionable feedback with severity scoring. Trigger on "/review-pr", "review this PR", or "review PR #N".
---

# Review PR

Structured code review with severity-based filtering.

## Step 1: Get the Diff

```bash
# Current branch PR
gh pr diff

# Specific PR number
gh pr diff <number>
```

## Step 2: Read Every Changed File

Read the full file for each changed file — not just the diff. Context matters.

## Step 3: Review Checklist

For each changed file, check:

**Correctness:**

- Logic errors, off-by-one, null handling
- Race conditions in async code
- Missing error handling at system boundaries

**Architecture:**

- Does the component sit at the correct atomic level? (atom vs molecule vs organism)
- Atoms must NOT import from molecules or organisms
- Respects the server/client component boundary (`"use client"` only when needed)
- Is the code in the right directory?

**Conventions:**

- Named exports (not default exports)
- Kebab-case filenames
- `cn()` for Tailwind class merging
- `@/*` path aliases (never relative `../`)
- `import type` for type-only imports

**Supabase:**

- Server-side data access uses `createClient()` from `@/lib/supabase/server`
- Client-side uses `createBrowserClient()` from `@/lib/supabase/client`
- No direct `process.env` access outside `lib/supabase/`
- Auth checks present in protected routes

**shadcn/ui:**

- No hand-edits to files in `src/components/ui/`
- Custom styling goes in wrapper components (atoms/molecules)

**Security:**

- No Supabase keys or secrets exposed in client code
- No hardcoded credentials
- Input validation at system boundaries
- No XSS/injection vectors

## Step 4: Score Each Finding

| Score | Meaning                                      | Report?          |
| ----- | -------------------------------------------- | ---------------- |
| 1-3   | Nitpick, personal preference                 | No               |
| 4-5   | Could be better, minor improvement           | Only if pattern  |
| 6-7   | Should fix — bug risk, convention violation  | Yes              |
| 8-9   | Must fix — logic error, security issue       | Yes              |
| 10    | Critical — data loss, security vulnerability | Yes, block merge |

**Only report findings 6+.** Low-severity noise makes people ignore reviews.

## Step 5: Format Output

```markdown
Changes reviewed: <one-line summary of what the PR does>

[7] Short title of finding
File.tsx:42 — detailed explanation with fix suggestion.

[6] Another finding
File.tsx:108 — explanation.

LGTM otherwise. <one sentence of positive feedback>
```

## Re-Review

When called with "re-review" or previous feedback:

- Mark addressed issues as fixed
- Verify fixes are correct
- Only report new issues or regressions
- End with LGTM if all issues addressed
