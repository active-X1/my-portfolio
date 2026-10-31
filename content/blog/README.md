# Blog content

Each `.md` file in this folder is one article. The **file name is its permanent URL**: `my-post.md` is published at
`/blog/my-post`. Use lower-case words joined by hyphens (the build stops with a clear error otherwise) and never reuse a name.
Files that start with `_` and this README are ignored. Start from `_post-template.md`.

Published so far:
- `beyond-writing-code.md` -> /blog/beyond-writing-code
- `debugging-taught-me-software-engineering.md` -> /blog/debugging-taught-me-software-engineering

Front matter: `title`, `date`, `category`, `excerpt` (required); `subtitle`, `cover`, `coverAlt`, `projects` (project slugs shown under
the article), `draft: true` (optional). Newest `date` is listed first; add a time (for example `2026-11-02T09:00:00Z`) to order two
posts published on the same day.

Adding an article needs only a new file here (plus its cover image in `public/images/blog/`). The blog page, article page,
share buttons, metadata and sitemap all pick it up automatically.
