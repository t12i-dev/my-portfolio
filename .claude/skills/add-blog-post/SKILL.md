---
name: add-blog-post
description: Create a new blog post as an MDX file in src/app/blog/posts. Use when the user wants to write or add a blog post.
---

1. Read one existing post in `src/app/blog/posts/` to confirm the current frontmatter shape.
2. Create `src/app/blog/posts/<kebab-case-slug>.mdx` (the file name becomes the URL `/blog/<slug>`).
3. Frontmatter: `title`, `summary`, `image` (path under `/images/...`, must exist in `public/`), `publishedAt` (YYYY-MM-DD, today unless told otherwise), `tag`, optional `subtitle`.
4. Body in Markdown/MDX, starting with `##` headings (the title is rendered from frontmatter).
5. Run `npm run build` to catch MDX errors. Do not invent image files; reuse existing ones or ask.
