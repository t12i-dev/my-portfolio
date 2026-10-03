---
name: check
description: Verify the project builds and lints cleanly. Use after making changes and before reporting work as done.
---

1. Run `npm run build` and report any type, MDX, or Next errors with file and line.
2. Run `npm run lint` and report findings.
3. If formatting is off in files you changed, run `npx @biomejs/biome format --write <files>` on those files only.
4. Report results faithfully; if something fails, say so and show the output.
