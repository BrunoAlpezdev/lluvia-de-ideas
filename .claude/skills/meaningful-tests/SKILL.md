---
name: meaningful-tests
description: Quality gate for tests. Trigger PROACTIVELY when writing, reviewing, or modifying test files (.test.ts, .test.tsx). Ensures tests are meaningful and catch real bugs. Also trigger when reviewing PRs that include test changes.
---

# Meaningful Tests

Ensure every test actually tests something.

## Test Quality Rules

### Naming

Tests describe behavior + condition:

- "returns empty array when no items match filter"
- "shows error banner when API returns 403"
- NOT: "test computeTotal", "handles edge case", "works correctly"

### One Act Per Test

Each `it()` block has exactly one action under test. Multiple actions → multiple tests.

### Anti-Patterns to Reject

**Shadow reimplementation** — test rewrites production logic to compute expected value:

```tsx
// REJECT: reimplements the function
const expected = items.reduce((s, i) => s + i.price, 0);
expect(computeTotal(items)).toBe(expected);

// ACCEPT: literal expected value
expect(computeTotal([{ price: 10 }, { price: 20 }])).toBe(30);
```

**Tautological tests** — assertions that always pass:

```tsx
// REJECT: container is always truthy
expect(container).toBeTruthy();
```

**Over-mocking** — mocking what you're testing:

```tsx
// REJECT: tests the mock, not the code
vi.mock("./computeTotal");
expect(computeTotal).toHaveBeenCalled();
```

**Implementation testing** — testing internal state instead of behavior:

```tsx
// REJECT: tests state
expect(component.state.isOpen).toBe(true);

// ACCEPT: tests observable behavior
expect(screen.getByTestId("dropdown")).toBeVisible();
```

## Supabase Testing

- Mock `createClient()` (server) and `createBrowserClient()` (client) — never hit real Supabase in tests
- Test data access patterns (row-level security behavior) separately from UI
- Use realistic Spanish domain data: `{ nombre: "Cafetería artesanal", costo: "Medio", prioridad: "Alta", estado: "En análisis" }`

## Checklist

When writing or reviewing tests:

- [ ] Name describes behavior + condition
- [ ] No shadow reimplementation
- [ ] No tautological assertions
- [ ] One Act per test
- [ ] Uses stable selectors (data-testid), not text matching
- [ ] Supabase clients are mocked, not real
- [ ] Test data uses realistic Spanish domain terms
