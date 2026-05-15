# AGENTS.md

## Project Overview

Storix is the Wify.my mobile-first story reader. It is a Next.js app deployed through OpenNext for Cloudflare, with story content stored as static JSON and generated long-story JSON.

Key paths:

- `src/app/`: Next.js App Router pages, layouts, loading states, metadata, robots, and sitemap.
- `src/components/`: Shared UI and client-side interactive components.
- `src/stories/`: Hand-authored story JSON files plus `longstories.json`.
- `src/longstories/`: Markdown-based long story workflow and loader.
- `scripts/build-longstories.ts`: Generates `src/stories/longstories.json`.
- `public/images/stories/`: Story poster assets.
- `docs/superpowers/`: Existing specs and implementation plans.

## Documentation Rules

Use Context7 MCP to fetch current documentation whenever the user asks about a library, framework, SDK, API, CLI tool, or cloud service, including React, Next.js, Tailwind CSS, Bun, Wrangler, OpenNext, Cloudflare, ESLint, and TypeScript.

Always start with `resolve-library-id` unless the user provides an exact `/org/project` library ID, then use `query-docs` with the full user question. Answer from the fetched docs.

Do not use Context7 for refactoring, writing scripts from scratch, debugging business logic, code review, or general programming concepts.

## Commands

Use Bun as the package manager and script runner.

- Install dependencies: `bun install`
- Start development server: `bun run dev`
- Generate long stories only: `bun run build:stories`
- Build production app: `bun run build`
- Start production server: `bun run start`
- Deploy to Cloudflare: `bun run deploy`
- Upload Cloudflare build: `bun run upload`
- Preview Cloudflare build: `bun run preview`
- Regenerate Cloudflare types: `bun run cf-typegen`

Note: `bun run dev`, `bun run build`, `bun run deploy`, `bun run upload`, and `bun run preview` all generate long stories before running their main task.

## Code Style

- Follow existing Next.js App Router conventions.
- Prefer TypeScript types from `src/types/index.ts`.
- Use the `@/` path alias for app imports when the surrounding code does.
- Keep components focused and consistent with the existing mobile-first, dark UI.
- Use `lucide-react` icons when adding icon controls.
- Use browser APIs only inside client components or guarded code paths.
- Keep localStorage access behind `typeof window !== 'undefined'` checks.
- Avoid unrelated refactors while making requested changes.

## Story Content Rules

Story JSON files must match the `Story` interface in `src/types/index.ts`.

For hand-authored JSON stories in `src/stories/`:

- Keep one story per JSON file.
- English is the ground truth for `title`, `description`, and `text`.
- Preserve Hindi or other localized content in `translations`.
- Keep IDs stable and unique.
- Keep `slug` URL-friendly and aligned with the file name.
- Put poster images under `public/images/stories/` and reference them as `/images/stories/name.png`.
- Register new hand-authored stories in `src/stories/index.ts`.

For long Markdown stories:

- Add story folders under `src/longstories/`.
- Add each story config to `src/longstories/index.ts`.
- Put public poster images in `public/images/stories/`.
- Run `bun run build:stories` after changing Markdown story content or configs.
- Do not hand-edit generated `src/stories/longstories.json` unless the task explicitly asks for generated output changes.

When generating story prose:

- Use emotional, addictive, simple language.
- Break long narrative into swipe-friendly parts.
- Maintain logical continuity from start to finish.
- Use cliffhangers deliberately, but avoid skipping story beats.

## Validation

Before finishing code changes, run the narrowest useful validation:

- Story/schema changes: `bun run build:stories` and `bunx tsc --noEmit`
- App/UI changes: `bun run build`
- Cloudflare deployment changes: `bun run preview` or `bun run deploy` when explicitly requested

The current `lint` script is `next lint`; verify it still works before relying on it because newer Next.js versions may not provide that command.

## Deployment Notes

- The app is private and proprietary.
- Cloudflare configuration lives in `wrangler.jsonc`, `open-next.config.ts`, and `cloudflare-env.d.ts`.
- Do not deploy, push, or commit unless the user asks for it.
- Do not modify `.dev.vars` or secrets unless the user explicitly asks.

## Git Hygiene

- Check `git status --short` before making broad edits.
- Do not revert user changes unless explicitly asked.
- Keep commits focused when the user asks for a commit.
- Avoid touching generated or build output directories such as `.next/`, `.open-next/`, `.wrangler/`, and `node_modules/`.
