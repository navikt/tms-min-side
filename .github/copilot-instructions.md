# Copilot Instructions — tms-min-side

Min side er en Astro SSR-app som komponerer personalisert innhold fra mange backend-tjenester og mikrofrontends for innloggede brukere på `/minside`.

## Build, test og lint

```bash
# Installer dependencies
pnpm install

# Lokal utvikling (starter mock + Astro samtidig)
pnpm run dev

# Kun app-server (forutsetter at mock allerede kjører)
pnpm run start

# Kun mock-server (Hono på :3000)
pnpm run mock

# Typecheck
pnpm run typecheck

# Build / preview
pnpm run build
pnpm run preview

# Lint/format (Biome)
pnpm exec biome check .
pnpm run format
```

Det finnes per nå ingen test-runner eller `test`-script i `package.json`, og ingen `*.test.ts(x)` i repoet. Single-test-kommando er derfor ikke tilgjengelig før et testoppsett legges til.

## Høynivåarkitektur

### Runtime-flyt (SSR + OBO + mikrofrontends)

1. `src/middleware.ts` validerer ID-porten-token via `@navikt/oasis` (utenom local/internal requests), setter `Astro.locals.token` og `Astro.locals.isSubstantial`.
2. Sider under `src/pages/[locale]/` renderer features server-side.
3. Hver feature henter data med `fetchData` eller HTML med `fetchMicrofrontend` fra `src/shared/utils/server/fetch.ts`, etter OBO-token fra `getOboToken` i `src/shared/utils/server/token.ts`.
4. Mikrofrontend-HTML injiseres med `<Fragment set:html={html} />` i `src/microfrontends/Microfrontend.astro`.

### Sidekomposisjon

`src/pages/[locale]/index.astro` setter sammen hovedsiden: personalia, alert island, din oversikt, utbetaling, innboks, dokumenter, aktuelt og innloggede tjenester. Flere tunge seksjoner bruker `server:defer` med fallback-komponenter for gradvis rendering.

### Layout, i18n og shared dependencies

- Base-layout (`src/layouts/base/Layout.astro`) henter dekoratør fra `@navikt/nav-dekoratoren-moduler/ssr`.
- Astro i18n er satt i `astro.config.mjs` med `defaultLocale: "nb"` og støttede språk `nb|nn|en`.
- Frontend bruker import map til delte React-avhengigheter fra NAV CDN; klient-bundle markerer React-pakker som external i Astro build hook.

### Infrastruktur-endepunkter

Health/metrics ligger på:

- `/minside/api/internal/isAlive`
- `/minside/api/internal/isReady`
- `/minside/api/internal/metrics`

## Nøkkelkonvensjoner

### Vertikale slices og delt kode

- Featurekode ligger i `src/features/<feature>/` (Astro/React-komponenter, tekster, typer, feature-interne utils).
- Kryss-feature infrastruktur/UI-primitiver ligger i `src/shared/`.
- Behold features uavhengige av hverandre; felles funksjonalitet flyttes til `shared`.

### Importer og alias

Bruk `@src/*` alias (fra `tsconfig.json`) i stedet for lange relative imports.

### Typiske feature-mønstre

- Språktekster co-lokeres i `*Text.ts` med `nb|nn|en`.
- Server-henting i `.astro` frontmatter følger mønster: `getAudience(...)` → `getOboToken(...)` → `fetchData(...)`/`fetchMicrofrontend(...)`.
- Ved feil: logg med `src/shared/utils/server/logger.ts` og render `ClientError` når seksjonen skal feiltolerere.

### Autentisering og tilgangsnivå

- `isLocal` (`NODE_ENV=development`) bypasser tokenvalidering.
- `isInternal` requests bypasser også validering (internal API endpoints).
- `Astro.locals.isSubstantial` styrer MinID-begrensninger (f.eks. `substantial-info` banner).

### Klientkomponenter

- Interaktive komponenter kjøres som `client:only="react"` når de ikke skal SSR-es (f.eks. `Feilmelding`, `Legacy`, `Observability`, `Authentication`).
- Global feiltilstand bruker nanostore i `src/shared/store/store.ts` (`isErrorAtom`, `setIsError`).

### Domeneord (ubiquitous language)

Bruk domeneord fra `docs/UBIQUITOUS_LANGUAGE.md` konsekvent. Viktig i praksis:

- Bruk **innbygger** (ikke "bruker/sluttbruker").
- Skill **varsel** (oppgave/beskjed) fra **melding** (innboksdialog).
- Bruk **sakstema** som kanonisk begrep der både "sakstema"/"temakode" finnes.

### Tilgjengelighet i TSX/JSX

Når du endrer `src/**/*.{tsx,jsx}`:

- Foretrekk Aksel-komponenter (`@navikt/ds-react`) fremfor custom div-baserte kontroller.
- Behold semantisk HTML og korrekt heading-hierarki.
- Ikke introduser ikonknapper uten tilgjengelig navn.
