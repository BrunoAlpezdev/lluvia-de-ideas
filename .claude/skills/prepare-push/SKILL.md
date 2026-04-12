---
name: prepare-push
description: Prepare changes for push and PR. Run before every `git push` to ensure code quality. Detects what changed, runs formatting, linting, and build. Drafts or updates the PR description. Trigger on "prepare push", "ready to push", "push", or before any git push command.
---

# Prepare Push

Run targeted quality checks and prepare PR description before pushing.

```bash
REPO_ROOT=$(git rev-parse --show-toplevel)
```

## Step 0: Check for Merged PR

```bash
PR_STATE=$(gh pr view --json state -q '.state' 2>/dev/null)
if [ "$PR_STATE" = "MERGED" ]; then
  echo "PR for this branch is already MERGED. Create a new branch."
fi
```

If merged: STOP. Do not push.

## Step 1: Rebase on Target Branch

```bash
TARGET_BRANCH="master"
PR_BASE=$(gh pr view --json baseRefName -q '.baseRefName' 2>/dev/null)
[ -n "$PR_BASE" ] && TARGET_BRANCH="$PR_BASE"

git fetch origin "$TARGET_BRANCH"
git rebase "origin/$TARGET_BRANCH"
```

If rebase fails: abort, report conflicts, stop.

## Step 2: Detect What Changed

Only check unpushed commits (already-pushed files were validated on prior push):

```bash
UPSTREAM=$(git rev-parse --abbrev-ref @{u} 2>/dev/null)
if [ -n "$UPSTREAM" ]; then
  CHANGED_FILES=$(git diff --name-only "$UPSTREAM"...HEAD)
else
  CHANGED_FILES=$(git diff --name-only master...HEAD)
fi
```

## Step 3: Format Changed Files

```bash
pnpm exec prettier --write <changed-files>
```

Stage formatting changes. If formatting produced changes, commit: `"format: normalize code"`.

## Step 4: Run Checks

Run sequentially:

**Lint:**
```bash
pnpm lint
```

**Build:**
```bash
pnpm build
```

**Tests:** SKIPPED (no test framework configured)

## Step 5: Report Results

```
## Push Readiness
- [PASS/FAIL] Formatting
- [PASS/FAIL] Lint
- [PASS/FAIL] Build
- [SKIPPED] Tests (no test framework)
```

## Step 6: PR Description

Check if PR exists: `gh pr view --json number,title,body 2>/dev/null`

If no PR: draft title + body for the user.
If PR exists: check if description needs updating.

Format:
```markdown
## Summary
<1-3 bullet points>

## Test plan
- [ ] <specific things to verify>
```

## Step 7: Push

```bash
# First push:
git push -u origin HEAD
# Subsequent (fast-forward):
git push
# After rebase (diverged):
git push --force-with-lease
```

## What NOT to Do

- Do not run checks for unchanged areas
- Do not block on warnings — only errors
- Do not re-run long commands to see different output — write to temp file
