# Magic Portfolio

Personal portfolio built on the Magic Portfolio template: Next.js 16 (App Router), React 19, TypeScript, MDX, and the Once UI design system (`@once-ui-system/core`). Upstream: https://github.com/once-ui-system/magic-portfolio. Docs: https://docs.once-ui.com/docs/magic-portfolio/quick-start

@.agents

## Commands
- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build; run it to verify type and MDX errors before finishing work
- `npm run lint` — Next lint
- `npm run biome-write` — format with Biome (2 spaces, double quotes, 100 cols)
- No test suite. Verify changes with `npm run build` and by viewing the page in dev.

## Where things live
- `src/resources/content.tsx` — **single source of truth for text**: `person`, `social`, `newsletter`, `home`, `about`, `blog`, `work`, `gallery`. Most personalization happens here.
- `src/resources/once-ui.config.ts` — `baseURL`, enabled `routes`, `display` toggles, `protectedRoutes`, fonts, theme/style, effects, Mailchimp, social sharing, schema.
- `src/resources/custom.css`, `icons.ts` — extra CSS, icon registry (add icons here before using by name).
- `src/app/blog/posts/*.mdx` — blog posts; `src/app/work/projects/*.mdx` — project case studies. File name = URL slug.
- `src/app/{about,work,blog,gallery}/page.tsx`, `src/app/[slug]` dynamic pages, `src/app/api/*` (auth, RSS, OG image).
- `src/components/` — app components (barrel export in `index.ts`); `src/types/` — config and content types.
- `public/images/` — avatar, gallery, og, projects. Reference as `/images/...`.

## Conventions
- Follow the Once UI rules imported above: `<Column>/<Row>/<Grid>` instead of `<div>`, design-token props instead of hex colors, no Tailwind.
- Use the `@/` alias for imports from `src`.
- Content changes go in `content.tsx` / MDX, not hardcoded in components.
- MDX frontmatter:
  - Blog: `title`, `summary`, `image`, `publishedAt` (YYYY-MM-DD), `tag`, optional `subtitle`.
  - Project: `title`, `publishedAt`, `summary`, `images` (list of `/images/projects/...`), optional `link`.
  Copy an existing file for the exact shape.
- Disabling a page: set it to `false` in `routes` in `once-ui.config.ts`.
- Password-protected pages: list paths in `protectedRoutes`; the password is `PAGE_ACCESS_PASSWORD` in `.env.local` (never commit it).
- The demo domain `https://demo.magic-portfolio.com` in `baseURL` must be replaced with the real domain (affects SEO, sitemap, RSS, OG).

## Workflow
- Make focused changes; don't reformat unrelated files.
- Don't edit `.next/`, `node_modules/`, or `package-lock.json` by hand.
- `@once-ui-system/core` is pinned to `latest`; if a component's API is unclear, read its types in `node_modules/@once-ui-system/core` rather than guessing.
- Commit only when asked. Branch off `main` for changes.

## Project skills (`.claude/skills/`)
- `/personalize` — replace template identity (name, bio, socials, domain, avatar)
- `/add-blog-post`, `/add-project` — scaffold MDX content
- `/check` — build + lint verification

## Motion (gallery)
- GSAP 3 + ScrollTrigger + Lenis, scoped to /gallery only (Lenis is mounted in the gallery page, not the root layout).
- Animate transform/opacity only. Always use `gsap.context()` cleanup. Respect `prefers-prefers-reduced-motion`; disable parallax under 768px.
- Marquee is pure CSS (`marqueeScroll` keyframes in `src/resources/custom.css`).
- Motion copy lives in `content.tsx`, not in components.