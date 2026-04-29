# Copilot Instructions — tms-min-side

Min side er en **Astro SSR-applikasjon** som er en container for mikrofrontends. Den henter personalisert innhold fra backend-tjenester via OBO-token exchange og setter det sammen til én side for innloggede brukere på nav.no.

## Kommandoer

```bash
# Lokal utvikling — begge må kjøre samtidig
pnpm run dev        # Astro dev-server på http://localhost:4321/minside
pnpm run mock       # Hono mock-server (erstatter backend-APIer lokalt)

# Bygg og forhåndsvis
pnpm run build
pnpm run preview    # Kjør prod-build lokalt

# Formatering (kjøres automatisk av husky pre-commit)
pnpm run prettier
```

Det finnes ingen `test`-script i `package.json`.

## Arkitektur

### Mikrofrontend-container

`tms-min-side` henter HTML fra mikrofrontends server-side (SSR) og setter den inn direkte i siden. Hvert mikrofrontend-kall bruker OBO-token (TokenX) for autentisering mot den aktuelle tjenesten.

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

### Komponentstruktur

| Type | Når | Eksempel |
|------|-----|---------|
| `.astro` | Server-rendered, data-fetching i frontmatter | `DinOversikt.astro`, `Microfrontend.astro` |
| `.tsx` | Client-interaktive React-komponenter | `Produktkort.tsx`, `ClientError.tsx` |
| `client:only="react"` | Komponenter som ikke skal SSR | `Feilmelding`, `Observability`, `Legacy` |
| `server:defer` | Utsatt SSR med fallback-slot | `<DinOversikt server:defer>` |

### Sidestruktur og i18n

Sider ligger under `src/pages/[lang]/` — `lang` er `nb` (default), `nn` eller `en`. `getLanguage(url)` henter språk fra URL-path. All brukervendt tekst ligger i `src/language/` eller per-komponent `language/text.ts`.

### Nanostores (global state)

`src/store/store.ts` eksporterer `isErrorAtom`. Bruk `setIsError()` ved API-feil — `ClientError`-komponenten reagerer på denne.

## Viktige konvensjoner

### Path-aliaser (tsconfig)

```typescript
@components/*  → src/components/*
@hooks/*       → src/hooks/*
@language/*    → src/language/*
@utils/*       → src/utils/*
```

### Server vs. klient utilities

- `@utils/server/` — kun SSR: `token.ts`, `fetch.ts`, `logger.ts`, `environment.ts`
- `@utils/client/` — kun browser: `api.ts`, `environment.ts`, `amplitude.ts`

`isLocal` fra `@utils/server/environment.ts` brukes til å detektere lokal kjøring. Bruk `!import.meta.env.SSR`-guard i klient-utilities.

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

### CSS

Bruk CSS Modules (`.module.css`) for komponent-spesifikke stiler. Globale stiler i `src/layouts/`.

### Mock-server

`mock/server.ts` er en Hono-server som etterligner alle backend-APIer lokalt. Legg til nye endepunkter her med tilhørende JSON-data i `mock/data/`. Serveren kjører på port 3000, Astro proxier mot den.

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
