# Copilot Instructions — tms-min-side

Min side er en **Astro SSR-applikasjon** som er en container for mikrofrontends. Den henter personalisert innhold fra backend-tjenester via OBO-token exchange og setter det sammen til én side for innloggede brukere på nav.no.

## Kommandoer

```bash
# Lokal utvikling — begge må kjøre samtidig
pnpm run dev        # Astro dev-server på http://localhost:4321/minside (alias: pnpm start)
pnpm run mock       # Hono mock-server på port 3000 (erstatter backend-APIer lokalt)

# Bygg og forhåndsvis
pnpm run build
pnpm run preview    # Kjør prod-build lokalt (node ./dist/server/entry.mjs)

# Formatering (kjøres automatisk av husky pre-commit)
pnpm run prettier
```

Det finnes ingen `test`-script i `package.json`.

## Arkitektur

### Vertikal slice-struktur

Kodebasen er organisert som vertikale slices. Hver feature er selvforsynt:

```
src/
├── features/                  # Én slice per seksjon på siden
│   ├── aktuelt/
│   ├── alert-island/
│   ├── din-oversikt/
│   ├── dokumenter/
│   ├── innboks/
│   ├── innloggede-tjenester/
│   ├── personalia/
│   ├── substantial-info/
│   ├── utbetaling/
│   └── ux-signal/
│       ├── <Feature>Text.ts   # i18n-tekster co-lokert med featuren
│       ├── <Feature>Urls.ts   # URL-definisjoner og audience (inkl. local: "http://localhost:3000/...")
│       ├── <Feature>Types.ts  # TypeScript-typer
│       ├── *.astro            # Server-rendrede komponenter
│       └── *.tsx              # Klient-interaktive React-komponenter
├── shared/                    # Delt infrastruktur brukt av flere features
│   ├── authentication/        # Auth-primitiver
│   ├── client-error/          # ClientError-komponent
│   ├── container/             # Layout-container
│   ├── feilmelding/           # Global feilmelding-komponent
│   ├── legacy/                # Legacy-wrappers
│   ├── obersvability/         # Observability (Faro, Amplitude)
│   └── store/
│       └── store.ts           # Nanostores global state
├── utils/
│   ├── server/                # Delt SSR-infrastruktur: token.ts, fetch.ts, logger.ts, environment.ts, error.ts, language.ts
│   └── client/                # Delt browser-infrastruktur: api.ts, environment.ts, umami.ts
├── microfrontends/            # Microfrontend-loader
├── middleware/                # Token-validering
├── layouts/                   # Astro layouts
└── pages/[lang]/              # Routing: nb (default), nn, en
```

### Mikrofrontend-container

`tms-min-side` henter HTML fra mikrofrontends server-side og setter den inn direkte i siden. Hvert mikrofrontend-kall bruker OBO-token (TokenX) for autentisering.

```
Browser → Astro SSR → getOboToken(token, audience)
                    → fetchHtml(oboToken, url)
                    → <Fragment set:html={html} />
```

Mikrofrontend-metadata (url, appname, namespace, fallback) kommer fra `tms-mikrofrontend-selector`.

### Auth-flyt

- **ID-porten + Wonderwall** håndterer innlogging (sidecar i Nais)
- Middleware (`src/middleware/index.ts`) validerer token via `@navikt/oasis`
- Validert token lagres i `Astro.locals.token`
- `isLocal` (`NODE_ENV === "development"`) hopper over validering og returnerer fake token
- `Astro.locals.isSubstantial` settes til `true` for MinID-innlogging (begrenset tilgang)

### Komponentstruktur

| Type | Når | Eksempel |
|------|-----|---------|
| `.astro` | Server-rendered, data-fetching i frontmatter | `DinOversikt.astro`, `Microfrontend.astro` |
| `.tsx` | Client-interaktive React-komponenter | `Produktkort.tsx`, `ClientError.tsx` |
| `client:only="react"` | Komponenter som ikke skal SSR | `Feilmelding`, `Observability`, `Legacy` |
| `server:defer` | Utsatt SSR med fallback-slot | `<DinOversikt server:defer>` |

### Nanostores (global state)

`src/shared/store/store.ts` eksporterer `isErrorAtom`. Bruk `setIsError()` ved API-feil — `ClientError`-komponenten reagerer på denne.

## Viktige konvensjoner

### Path-aliaser (tsconfig)

```typescript
@features/*  → src/features/*
@shared/*    → src/shared/*
@utils/*     → src/utils/*
```

`Language`-typen og `getLanguage()` importeres fra `@utils/server/language`.

### OBO-token-mønster

```typescript
const audience = getAudience("appname", "namespace"); // default namespace: "min-side"
const oboToken = await getOboToken(Astro.locals.token, audience);
const data = await fetchData(oboToken, url);
```

### Feilhåndtering i `.astro`-komponenter

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

### i18n-mønster

Language-tekster co-lokeres med featuren i `<Feature>Text.ts` (navnekonvensjon varierer per feature):

```typescript
// src/features/<feature>/<Feature>Text.ts
export const text = {
  heading: { nb: "...", nn: "...", en: "..." },
};
```

Globale app-tekster (sidetitler o.l.) er delt og importeres fra relative stier til `src/shared/`.

### CSS

Bruk CSS Modules (`.module.css`) for komponent-spesifikke stiler. Globale stiler i `src/layouts/`.

### Mock-server

`mock/server.ts` er en Hono-server som etterligner alle backend-APIer lokalt. Legg til nye endepunkter her med tilhørende JSON-data i `mock/data/`. Serveren kjører på port 3000 (standardport for `@hono/node-server`).

Hver feature definerer sin lokale URL direkte i sin `*Urls.ts`:

```typescript
// src/features/<feature>/<Feature>Urls.ts
export const url = {
  local: "http://localhost:3000/<path>",
  prod: "https://<tjeneste>.intern.nav.no/<path>",
};
```

## Nais-konfigurasjon

- **Namespace**: `min-side`, **Team**: `min-side`
- **Auth**: `idporten.enabled: true` + `tokenx.enabled: true`
- **Base path**: `/minside`
- **Health**: `/minside/api/internal/isAlive` og `/minside/api/internal/isReady`
- **Metrics**: `/minside/api/internal/metrics` (Prometheus)
- **CDN**: Static assets deployes til `https://cdn.nav.no/min-side/tms-min-side`
- Legg til nye mikrofrontend-tjenester i `accessPolicy.outbound.rules` i `nais/*/nais.yaml`

## Deploy

- **main** → automatisk deploy til prod-gcp (`deploy-main.yaml`)
- **manuell** → dev-gcp via `workflow_dispatch` (`deploy-dev.yaml`)
- Build krever `ASTRO_KEY`-secret og `NAIS_WORKLOAD_IDENTITY_PROVIDER`

