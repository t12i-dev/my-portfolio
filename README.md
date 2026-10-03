# Portfolio

Personal portfolio built with Next.js, MDX and the Once UI design system, based on the [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) template.

## Requirements

- Node.js 18.17 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

If you use password-protected pages, copy `.env.example` to `.env.local` and set `PAGE_ACCESS_PASSWORD`.

## Edit the site

| What | Where |
| --- | --- |
| Name, role, bio, social links, About, Gallery text | `src/resources/content.tsx` |
| Site URL, enabled pages, theme, fonts, protected routes | `src/resources/once-ui.config.ts` |
| Avatar, gallery photos, project images | `public/images/` |
| Blog posts | `src/app/blog/posts/*.mdx` |
| Projects / case studies | `src/app/work/projects/*.mdx` |

- **Add a gallery photo:** put the image in `public/images/gallery/` and add an entry to `gallery.images` in `content.tsx`.
- **Add a blog post or project:** create a new `.mdx` file in the folder above. The file name becomes the URL.
- **Hide a page:** set it to `false` in `routes` in `once-ui.config.ts`.
- **Set the real domain:** change `baseURL` in `once-ui.config.ts` (used for SEO, sitemap, RSS and OG images).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also checks types and MDX) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run lint |
| `npm run biome-write` | Format code with Biome |

## Deploy

Push the repository to GitHub and import it in [Vercel](https://vercel.com/new). Set `PAGE_ACCESS_PASSWORD` in the project's environment variables if you use protected pages.

## License

The template is distributed under CC BY-NC 4.0: attribution is required and commercial use is not allowed. See `LICENSE`.
