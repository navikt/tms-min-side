# tms-min-side

Astro 7 SSR app that composes Min side (`nav.no/minside`) from features and server-fetched microfrontends. React 19, Aksel 8 (`--ax-*` tokens), TypeScript 6, pnpm 10, Node 24.

## Commands

- Install: `pnpm install`. The `@navikt` packages need a GitHub token with `read:packages` in `~/.npmrc`; if install fails on auth, stop and ask.
- Dev: `pnpm run dev`. Mocks run inside it through `@navikt/astro-mocks` (data in `src/mocks/`); there is no separate mock server.
- Before you say a change is done: `pnpm run verify` (unit tests in `test/unit`).
- When a page or visible text changed: `pnpm run test:e2e`. The Playwright specs in `test/integration` assert on visible text. Needs `pnpm exec playwright install chromium` once.
- `pnpm run typecheck` currently crashes on main while loading `@astrojs/check`. Do not fix it as part of other work.

## Rules

- Use the `astro` skill before editing `.astro`, `.tsx`, `.ts` or `.css` files. If `/astro` or `/commit` is missing, tell the developer to trust this folder in Copilot CLI and start a new session.
- Ask first before changing authentication (`src/middleware.ts`, `@navikt/astro-auth`), OBO token exchange (`getOboToken`, `Astro.locals.token`), `astro.config.mjs`, or anything that logs personal data, and before adding a dependency.
- Features live in `src/features/<feature>/` and do not import from each other. Shared code goes in `src/shared/`. See `docs/VERTICAL_SLICE_ARCHITECTURE.md`.
- Import with the `@src/*` alias.
- Use the domain terms in `docs/UBIQUITOUS_LANGUAGE.md` (Innbygger, Varsel, Utkast, Ytelse) in names and text.
- The Dockerfile uses a moving major tag on purpose; do not pin a SHA. `deploy-main.yaml` redeploys every Monday.
