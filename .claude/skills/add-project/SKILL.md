---
name: add-project
description: Create a new project/case study as an MDX file in src/app/work/projects. Use when the user wants to add a project to their portfolio.
---

1. Read one existing file in `src/app/work/projects/` to confirm the frontmatter shape.
2. Create `src/app/work/projects/<kebab-case-slug>.mdx` (file name = URL `/work/<slug>`).
3. Frontmatter: `title`, `publishedAt` (YYYY-MM-DD), `summary`, `images` (list of paths under `/images/projects/...`; add files to `public/images/projects/` or reuse existing ones), optional `link`.
4. Body: problem, approach, outcome, with `##` headings.
5. To password-protect it, add `"/work/<slug>": true` to `protectedRoutes` in `src/resources/once-ui.config.ts`.
6. Run `npm run build` to verify.
