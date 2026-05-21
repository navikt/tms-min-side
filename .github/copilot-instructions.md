# Copilot Instructions — tms-min-side

Min side er en Astro SSR-container som setter sammen personalisert innhold fra mange backend-/mikrofrontend-tjenester for innloggede brukere på `nav.no/minside`.

## Build, test og lint

```bash
# Lokal utvikling
pnpm run dev        # starter både mock-server (port 3000) og Astro dev-server
pnpm run start      # kun Astro dev-server
pnpm run mock       # kun Hono mock-server

# Bygg, kjør og typecheck
pnpm run build
pnpm run preview
pnpm run typecheck

# Formatering/lint
pnpm run format
pnpm exec biome check .         # tilsvarer lint/check i CI/pre-commit
```

Teststatus nå:

- Det finnes ingen `test`-script i `package.json`.
- Det finnes ingen `*.test.*`/`*.spec.*`-filer i repo per nå.
- Enkelt-testkjøring er derfor ikke tilgjengelig før testoppsett er lagt til.

## Høy-nivå arkitektur

### 1. Sidekomponering og render-strategi

`src/pages/[locale]/index.astro` orkestrerer hele siden ved å compose features under `src/features/*`.

- Tunge seksjoner rendres med `server:defer` og fallback-slots (f.eks. Utbetaling/Innboks/Dokumenter).
- Interaktive islands rendres med `client:only="react"` (f.eks. Feilmelding, Legacy, Observability).
- For MinID/`isSubstantial` vises `substantial-info`-banner, mens sensitiv oversiktsdata begrenses.

### 2. Mikrofrontend-flyt (kjerneflyt)

Mikrofrontend-innhold hentes server-side som HTML og injiseres direkte:

1. `getAudience(app, namespace?)` bygger audience (`cluster:namespace:app`).
2. `getOboToken(Astro.locals.token, audience)` gjør TokenX OBO exchange.
3. `fetchMicrofrontend(oboToken, url)` henter HTML.
4. `<Fragment set:html={html} />` renderer responsen.

Dette ligger i `src/microfrontends/Microfrontend.astro`, med fallback-kall hvis første fetch feiler.

### 3. Auth/middleware

- Middleware ligger i `src/middleware.ts` (ikke i en mappe).
- Token valideres med `@navikt/oasis`; ved manglende/ugyldig token redirectes til `/minside/oauth2/login`.
- Ved lokal kjøring (`NODE_ENV=development`) hoppes tokenvalidering over.
- Validert token settes i `Astro.locals.token`; MinID-status settes i `Astro.locals.isSubstantial`.

### 4. Layout/dekoratør og i18n

- `src/layouts/base/Layout.astro` henter NAV-dekoratør server-side og injiserer head/header/footer/scripts.
- React/ReactDOM leveres via import map fra CDN (`tms-shared-dependencies`), ikke bundlede kopier.
- Astro i18n er konfigurert i `astro.config.mjs` med `nb` som default og locales `nb/nn/en`.

## Nøkkelkonvensjoner i denne kodebasen

### Vertikal slice + shared-grenser

- Feature-domene ligger under `src/features/<feature>/` med co-lokerte tekster/typer/URLs/komponenter.
- Delte primitive/infrastruktur ligger under `src/shared/*`.
- Følg skillet i `docs/VERTICAL_SLICE_ARCHITECTURE.md`: features skal ikke krysse-importere hverandre.

### Importer og aliases

- Bruk `@src/*` alias (fra `tsconfig.json`) for interne imports.
- Ikke introduser nye aliaser uten å oppdatere tsconfig og eksisterende mønster.

### Datahenting i Astro-komponenter

Følg etablert mønster i SSR-komponenter:

```astro
let isError = false;
try {
  data = await fetchData(oboToken, url);
} catch (error) {
  logger.error(`...`);
  isError = true;
}
---
{isError && <ClientError client:only="react" />}
```

`fetchData` kaster `MultiStatusError` for 207; features som støtter partial data håndterer dette eksplisitt (se `DinOversikt.astro`).

### Miljøspesifikke URL-er

- Endepunkter settes via `astro:env/server` (defaults peker til mock lokalt).
- Flere features har egne URL-/lenkefiler med `prod`/`dev`/`local`-varianter.
- Ved nye backend-kall: oppdater både env-schema (`astro.config.mjs`) og `mock/server.ts`.

### Terminologi (domeneord)

Bruk begreper fra `docs/UBIQUITOUS_LANGUAGE.md` konsekvent i navn/tekster:

- `Innbygger`, `Din oversikt`, `Alert island`, `Varsel` (ikke bland med `Melding` fra Innboks-kontekst), `Utkast`, `Ytelse`.

### Instruksjonsfiler som gjelder ved endringer

- React/TSX: følg `.github/instructions/accessibility.instructions.md` (Aksel-komponenter + semantikk).
- Testfiler: følg `.github/instructions/testing*.instructions.md`.
- Workflows: følg `.github/instructions/github-actions.instructions.md`.
- Dockerfile: følg `.github/instructions/docker.instructions.md`.
