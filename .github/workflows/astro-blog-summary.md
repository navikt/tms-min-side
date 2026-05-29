---
on:
  schedule: "0 7 * * 1"
  workflow_dispatch:

engine:
  id: copilot
  model: claude-opus-4.6

network:
  allowed:
    - defaults
    - github
    - astro.build

safe-outputs:
  create-pull-request:
    title-prefix: "[astro] "
    labels: [astro, automated]
    reviewers: [navikt/copilot]
    draft: true
    allowed-files:
      - docs/news/articles/**
---

# Astro blog excerpt workflow

Scan https://astro.build/blog/ every Monday, find the newest blog post, and create a new excerpt file in `docs/news/articles/` when the post is newer than what already exists in the repo.

## What to do

1. Read the existing excerpt files in `docs/news/articles/` and find the most recent `date:` value in any frontmatter. This is the cutoff date — only create a new excerpt if the newest Astro post was published after this date.
2. Read `docs/news/articles/.newsignore` if it exists. Each line is a URL to skip.
3. Scan the Astro blog index at `https://astro.build/blog/` or its RSS feed and identify the newest post.
4. Fetch the full blog post URL to understand the announcement before summarizing it.
5. If the newest post is not already covered by an excerpt file and is not in `.newsignore`, create a new excerpt file for it.
6. If nothing new is found, call `noop` with a message like `No new Astro blog post found since [cutoff date]. Scanned astro.build/blog/.`

## Excerpt file format

Each excerpt is a markdown file with ONLY YAML frontmatter (no body content). Follow this exact format:

```markdown
---
title: "Title in Norwegian (bokmål)"
date: YYYY-MM-DD
category: copilot
excerpt: "One-sentence Norwegian summary of the announcement."
url: "https://..."
tags:
  - relevant-tag
---
```

## Rules

- **Language**: Title and excerpt in Norwegian bokmål. Use English tech terms where developers do, such as `PR`, `MCP`, `GA`, or `public preview`.
- **Filename**: Derive from the URL slug, for example `astro-6-4.md`. Keep it short and descriptive.
- **No duplicates**: If an excerpt file already exists for the URL, skip it.
- **Ignore list**: If the URL is listed in `.newsignore`, skip it.
- **Tags**: Use lowercase kebab-case and reuse existing tags when applicable.
- **Date**: Use the announcement date from the source, not today's date.
- **Scope**: Only create or modify files under `docs/news/articles/`.
