#!/bin/bash
# PreToolUse hook for Bash tool — blocks git push unless prepare-push ran

COMMAND="$CLAUDE_BASH_COMMAND"

# Only intercept git push commands
if ! echo "$COMMAND" | grep -qE 'git\s+push'; then
  exit 0
fi

# Check for marker file (created by prepare-push skill)
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null | sed 's/[^a-zA-Z0-9._-]/-/g')
MARKER="/tmp/.prepare-push-passed-${BRANCH}"

if [ ! -f "$MARKER" ]; then
  echo "BLOCKED: Run /prepare-push before pushing"
  exit 2
fi

# Check marker is recent (< 10 minutes old)
if [ "$(uname)" = "Darwin" ]; then
  AGE=$(( $(date +%s) - $(stat -f %m "$MARKER") ))
else
  AGE=$(( $(date +%s) - $(stat -c %Y "$MARKER") ))
fi

if [ "$AGE" -gt 600 ]; then
  rm "$MARKER"
  echo "BLOCKED: Prepare-push marker expired (>10min). Run /prepare-push again"
  exit 2
fi

exit 0
