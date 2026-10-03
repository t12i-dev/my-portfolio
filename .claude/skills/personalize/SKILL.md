---
name: personalize
description: Replace the Magic Portfolio template identity (name, role, bio, socials, domain, avatar, SEO) with the owner's real details. Use when the user wants to make the site their own.
---

1. Ask the user (once, together) for: full name, role, email, IANA time zone, languages, `locale`, social links, short bio, work experience, studies, skills, production domain.
2. Edit `src/resources/content.tsx`: `person`, `social`, `newsletter`, `home`, `about` (intro, work experience, studies, technical skills), `blog`, `work`, `gallery`. Remove or rewrite placeholder text; set sections' `display: false` rather than leaving fake data.
3. Edit `src/resources/once-ui.config.ts`: `baseURL` to the real domain, `routes` to enable only wanted pages, `protectedRoutes` (remove the template demo entry), `mailchimp`.
4. Replace `public/images/avatar.jpg` and ask whether to replace gallery/og/project images (note them as placeholders otherwise).
5. Remove or replace the template sample posts and projects in `src/app/blog/posts` and `src/app/work/projects` once the user has real content.
6. Run the `check` skill, then summarize what changed and what still needs the user's input.
