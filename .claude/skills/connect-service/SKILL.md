---
name: connect-service
description: Guide setup of MCP integrations with external services (issue trackers, CI/CD, error monitoring, docs, Slack, databases). Trigger on "connect to", "integrate with", "set up MCP", "add a tool".
---

# Connect External Service

Ask the user:

```
What do you want to connect Claude to?

1. Issue tracker (Linear, Jira, GitHub Issues)
2. CI/CD (Buildkite, GitHub Actions, CircleCI)
3. Error monitoring (Sentry, Bugsnag)
4. Documentation (Confluence, Notion)
5. Communication (Slack, email)
6. Database (read-only queries)
7. Other — describe what you need

Which one?
```

## For Each Type

1. **Check if an MCP server exists** at https://github.com/anthropics/mcp-servers or community repos
2. **Configure in settings.json:**
   ```json
   {
     "mcpServers": {
       "service": {
         "command": "npx",
         "args": ["@anthropic/mcp-service"],
         "env": { "API_KEY": "${SERVICE_API_KEY}" }
       }
     }
   }
   ```
3. **Set permissions** — start read-only:
   ```json
   { "permissions": { "allow": ["mcp__service__read_*"] } }
   ```
4. **Test** — run a simple read operation to verify connection
5. **Document** — add the integration to CLAUDE.md

## Safety Rules

- **Start read-only.** Add write access one tool at a time.
- **Never auto-send messages** to Slack/email. Draft and show first.
- **Never auto-create** issues or tickets without explicit permission.
- **Never give write access** to production databases.
- **Scope narrowly.** Only the tools/resources actually needed.
