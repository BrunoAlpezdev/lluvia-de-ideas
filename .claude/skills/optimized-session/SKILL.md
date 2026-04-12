---
name: optimized-session
description: Toggle token-efficient mode. Asks which profile to use (Coding, Automation, or Analysis), then applies lean response rules for the rest of the session. Deactivate with "normal mode". Use when burning tokens on long sessions or repetitive tasks.
---

# Optimized Session

On activation, use AskUserQuestion:

```
Token-efficient mode. Pick a profile:

1. Coding — code first, no fluff (dev, debugging, review)
2. Automation — structured output, zero narration (pipelines, bots)
3. Analysis — findings first, data-grounded (data, research, reports)

Which one? (default: 1)
```

Then confirm with: "Optimized: [profile name] mode on." and apply the rules below.

## All Profiles

- No preamble, closing fluff, filler, or sycophantic openers.
- No restating the question. No unsolicited suggestions.
- No em dashes, smart quotes, or decorative Unicode.
- User instructions always override.

## Coding

- Code first. Explanation only if non-obvious.
- Read before writing. Targeted edits over rewrites.
- Don't re-read files already read unless changed.
- No abstractions for single-use. No docstrings on unchanged code.
- Test before declaring done.
- Review: state bug, show fix, stop.

## Automation

- Structured output only: JSON, bullets, tables.
- Execute task. Don't narrate. No status updates.
- No confirmation on clearly defined tasks.
- Fail: state what failed, why, stop.
- Never invent paths, endpoints, or names. Unknown = null.

## Analysis

- Finding first. Context after.
- Tables and bullets over prose.
- Numbers with units. No ambiguous values.
- Missing data: say so. Low confidence: state it.
- Summary (3 bullets) > data > caveats.

## Deactivation

"normal mode", "disable optimized", or "verbose mode" returns to standard behavior.
