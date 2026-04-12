#!/bin/bash
# PreToolUse hook for Edit|Write tools
# Reads the target file from $CLAUDE_FILE_PATH

FILE="$CLAUDE_FILE_PATH"

# Block lock files
if echo "$FILE" | grep -qE '(pnpm-lock\.yaml|yarn\.lock|package-lock\.json)'; then
  echo "BLOCKED: Cannot edit lock files — run pnpm install instead"
  exit 2
fi

# Block .env files
if echo "$FILE" | grep -qE '\.env(\.|$)'; then
  echo "BLOCKED: Cannot edit .env files — contains secrets"
  exit 2
fi

# Block shadcn/ui generated components
if echo "$FILE" | grep -qE 'src/components/ui/'; then
  echo "BLOCKED: shadcn/ui components are generated. Use 'pnpm dlx shadcn@latest add <component>' to regenerate"
  exit 2
fi

exit 0
