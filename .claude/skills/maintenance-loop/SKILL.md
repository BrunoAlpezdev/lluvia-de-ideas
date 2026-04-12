---
name: maintenance-loop
description: Set up recurring automated maintenance tasks. Supports stale branch cleanup, dependency audits, test health checks, error monitoring, and code quality ratchets. Trigger on "set up a loop", "recurring task", "nightly check", "automated maintenance".
---

# Maintenance Loop

Ask the user:

```
What kind of recurring task?

1. Stale branch cleanup — delete merged branches
2. Dependency audit — check for outdated/vulnerable packages
3. Test health — run tests, report failures and flaky tests
4. Error monitoring — review recent errors and triage
5. Code quality — lint violations, coverage, missing tests
6. Custom — describe what you want

Which one?
```

## For Each Type

### Stale Branch Cleanup
- List branches with last commit date
- Check if PRs are merged (compare against `master`)
- Report what would be deleted
- Delete after user confirmation

### Dependency Audit
```bash
pnpm audit        # vulnerabilities
pnpm outdated     # version freshness
```
Categorize: critical (security) vs major vs minor. Report with recommendations.

### Test Health
Not yet configured — activate this pattern when a test framework (vitest or similar) is added.

When active:
- Run full test suite, capture output
- Compare to last known good run
- Report new failures, duration regressions
- Flag source changes without test updates

### Error Monitoring
Requires MCP integration with an error tracking service (Sentry, Bugsnag, etc.). Not yet configured.

When active:
- Fetch recent errors
- Deduplicate, assess severity
- Recommend: fix now / create ticket / ignore

### Code Quality
- Run `pnpm lint`, compare to baseline
- Find new files missing tests
- Report regressions only (not total violations)

### Custom
Interview: what to check, what's good vs bad, what action to take, how often.

## Scheduling

```bash
# Interactive loop (Claude self-paces)
/loop check test health and report

# Fixed interval
/loop 1h check build status

# Remote schedule (runs without session)
/schedule create --cron "0 2 * * *" --prompt "Nightly error review"
```
