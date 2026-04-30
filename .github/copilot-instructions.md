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

### Vertikal slice-struktur

Kodebasen er organisert som vertikale slices. Hver feature er selvforsynt:

```
src/
├── features/<feature>/        # Én slice per seksjon på siden
│   ├── language/text.ts       # i18n-tekster co-lokert med featuren
│   ├── server/                # (valgfritt) SSR-utilities for denne featuren
│   ├── utils/                 # (valgfritt) klient-utilities for denne featuren
│   ├── urls.ts                # URL-definisjoner og audience
│   ├── types.ts               # TypeScript-typer
│   ├── *.astro                # Server-rendrede komponenter
│   └── *.tsx                  # Klient-interaktive React-komponenter
├── shared/                    # Delt infrastruktur brukt av flere features
│   ├── language/language.ts   # Language-type og getLanguage()
│   ├── feilmelding/           # Global feilmelding-komponent
│   ├── authentication/        # Auth-primitiver
│   └── legacy/                # Legacy-wrappers
├── utils/
│   ├── server/                # Delt SSR-infrastruktur: token, fetch, logger, environment, error
│   └── client/                # Delt browser-infrastruktur: amplitude, api, environment, faro
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

`src/store/store.ts` eksporterer `isErrorAtom`. Bruk `setIsError()` ved API-feil — `ClientError`-komponenten reagerer på denne.

## Viktige konvensjoner

### Path-aliaser (tsconfig)

```typescript
@features/*  → src/features/*
@shared/*    → src/shared/*
@hooks/*     → src/hooks/*
@utils/*     → src/utils/*
```

`Language`-typen og `getLanguage()` importeres fra `@shared/language/language`.

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

Language-tekster co-lokeres med featuren i `language/text.ts`:

```typescript
// src/features/<feature>/language/text.ts
export const text = {
  heading: { nb: "...", nn: "...", en: "..." },
};
```

Globale app-tekster (sidetitler o.l.) er delt og importeres fra relative stier til `src/shared/`.

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

