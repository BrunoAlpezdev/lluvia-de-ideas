#!/bin/bash
# PreToolUse hook for Bash tool
# Reads the command from $CLAUDE_BASH_COMMAND

COMMAND="$CLAUDE_BASH_COMMAND"

# ── Hard blocks (exit 2 = deny) ──────────────────────────

# Block pushes to main/master
if echo "$COMMAND" | grep -qE 'git\s+push.*\b(main|master)\b'; then
  echo "BLOCKED: Cannot push directly to main/master"
  exit 2
fi

# Block force push without lease
if echo "$COMMAND" | grep -qE 'git\s+push\s+--force\b' && \
   ! echo "$COMMAND" | grep -q 'force-with-lease'; then
  echo "BLOCKED: Use --force-with-lease instead of --force"
  exit 2
fi

# Block mass deletion
if echo "$COMMAND" | grep -qE 'rm\s+-rf\s+(/|~|\$HOME)'; then
  echo "BLOCKED: Refusing to delete system/home directories"
  exit 2
fi

# Block credential access
if echo "$COMMAND" | grep -qE '(cat|less|head|tail).*\.(env|pem|key|credential)'; then
  echo "BLOCKED: Cannot read credential files"
  exit 2
fi

# ── Soft blocks (exit 1 = ask user) ──────────────────────

# Destructive git operations
if echo "$COMMAND" | grep -qE 'git\s+(reset\s+--hard|clean\s+-f|checkout\s+--)'; then
  echo "WARNING: Destructive git operation — confirm with user"
  exit 1
fi

# Database drops
if echo "$COMMAND" | grep -qiE '(DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE)'; then
  echo "WARNING: Destructive database operation"
  exit 1
fi

# Destructive Supabase operations
if echo "$COMMAND" | grep -qiE 'supabase\s+(db\s+reset|migration\s+repair)'; then
  echo "WARNING: Destructive Supabase operation"
  exit 1
fi

exit 0
