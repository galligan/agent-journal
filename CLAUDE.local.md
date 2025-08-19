# CLAUDE.local.md

## Product Development Workflow

- Primary development workflow happens through GitHub Issues
- Create new issues in GitHub for all features, bugs, and enhancements using appropriate labels
- Reference GitHub issue numbers when creating branches (e.g., `2-feature-name`)
- Use PR title format: `type(scope): description (#issue)` (e.g., `feat(journal): add semantic search (#2)`)
- Link branches and PRs to specific GitHub issues to maintain traceability

### PR and Issue Management Best Practices

**PR Title Format:**
- `type(scope): description (#issue-number)`
- Examples: `feat(build): migrate to bun runtime (#3)`, `fix(search): handle empty query results (#5)`

**PR Body Format:**
```markdown
## Summary
Brief description of changes

## Changes
- List of key changes
- Another change

## Testing
- [ ] Tests pass
- [ ] Manual testing completed

Closes #issue-number
```

**Issue Title Format:**
- `action: description` (e.g., `feat: add semantic search`, `fix: handle edge case in embeddings`)
- Use clear, actionable titles that describe the outcome

**Auto-Closing Issues:**
- Use `Closes #123`, `Fixes #123`, or `Resolves #123` in PR body
- Reference related issues with `Related to #123` or `See #123`

**Cross-References:**
- In issues: Reference PRs with `#pr-number`  
- In PRs: Reference issues with `#issue-number`
- Use GitHub's linking keywords for automatic management

### GitHub Issue Creation Variables

**Required:**
- `owner` - Repository owner (`galligan`)
- `repo` - Repository name (`agent-journal`)
- `title` - Issue title

**Optional but Recommended:**
- `body` - Markdown description with details
- `labels` - Array of label names from available labels
- `assignees` - Array of usernames to assign
- `milestone` - Milestone number

**Available Labels:**
- bug, documentation, duplicate, enhancement, good first issue, help wanted, invalid, question, wontfix

**Issue Response Format:**
- `id` - Internal GitHub ID (e.g., 3332051147)
- `number` - Issue number (e.g., 2, used as `2-title` for branches)
- `html_url` - Direct GitHub URL
- `state` - Current state (open/closed)
- `created_at`/`updated_at` - ISO timestamps
- `labels` - Array of applied labels with metadata

## Tools

- `github` - MCP server for managing GitHub issues and repositories.
  - Repository: `galligan/agent-journal`


- Never use clock time (hours/days/weeks) to define the time it would take to work on a project, task, etc. Use t-shirt sizes only.
- Any PR should be posted to `galligan/agent-journal` and not the `upstream` remote unless otherwise directed to.