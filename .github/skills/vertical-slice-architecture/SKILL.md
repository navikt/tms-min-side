---
name: vertical-slice-architecture
description: Refaktorer en Astro SSR-applikasjon fra tradisjonell lagdelt filstruktur til vertikal slice-arkitektur — én slice per feature med co-lokert logikk, tekster, typer og URLer
license: MIT
metadata:
  domain: architecture
  tags: astro refactoring vertical-slice architecture modernization
---

# Vertical Slice Refactoring — Astro SSR

Flytt en Astro-applikasjon fra tradisjonell lagdelt struktur (alle komponenter i `components/`, alle typer i `types/`, osv.) til vertikal slice-arkitektur der hver feature er selvforsynt.

## Vertikal slice vs. tradisjonell struktur

### ❌ Tradisjonell lagdelt struktur

```
src/
├── components/
│   ├── Utbetaling.astro
│   ├── Dokumenter.astro
│   └── Innboks.astro
├── types/
│   ├── utbetaling.ts
│   ├── dokumenter.ts
│   └── innboks.ts
├── utils/
│   ├── utbetalingUtils.ts
│   └── dokumenterUtils.ts
├── i18n/
│   ├── utbetalingText.ts
│   └── dokumenterText.ts
└── pages/
    └── index.astro
```

### ✅ Vertikal slice-struktur

```
src/
├── features/
│   ├── utbetaling/
│   │   ├── Utbetaling.astro        # Hovedkomponent — data-fetching i frontmatter
│   │   ├── utbetalingTypes.ts      # TypeScript-typer
│   │   ├── utbetalingText.ts       # i18n-tekster (nb/nn/en)
│   │   ├── utbetalingUrls.ts       # URL-definisjoner (local + prod)
│   │   ├── utbetalingUtils.ts      # Feature-spesifikk logikk
│   │   ├── Utbetaling.module.css   # Scoped CSS
│   │   ├── enkel/                  # Sub-variant
│   │   │   └── EnkelUtbetaling.astro
│   │   ├── list/
│   │   │   └── UtbetalingList.astro
│   │   ├── ingen/
│   │   │   └── IngenUtbetaling.astro
│   │   └── fallback/
│   │       └── UtbetalingFallback.astro
│   └── dokumenter/
│       └── ...
├── shared/                         # Kun delt infrastruktur
│   ├── authentication/
│   ├── client-error/
│   └── store/
└── utils/
    ├── server/                     # fetch.ts, token.ts, logger.ts
    └── client/                     # api.ts, environment.ts
```

## Workflow

1. **Identifiser features** — kartlegg uavhengige seksjoner på siden
2. **Kartlegg avhengigheter** — hva er feature-spesifikt vs. ekte delt kode?
3. **Lag slice-mappe** — én mappe per feature under `src/features/`
4. **Flytt og tilpass** — følg navnekonvensjonene under
5. **Oppdater imports** — bruk path-aliaser (`@features/*`, `@shared/*`, `@utils/*`)
6. **Verifiser** — kjør bygg og sjekk at siden fungerer

## Steg 1: Identifiser features

En feature er en **selvstendig seksjon** på siden med egne data, tekster og visning.

Tegn på at noe er én feature:
- Har egne API-kall / datakilde
- Har egne i18n-tekster
- Kan feil-håndteres uavhengig
- Vil utvikles og deployes separat

Tegn på at noe hører til `shared/`:
- Brukes av 3+ features uten modifikasjon
- Er infrastruktur (auth, logging, error-handling)
- Er et layout-primitivt (container, grid)

## Steg 2: Navnekonvensjoner per slice

```
src/features/<feature-navn>/
├── <Feature>.astro           # PascalCase — hovedkomponent
├── <feature>Types.ts         # camelCase — TypeScript-typer
├── <feature>Text.ts          # camelCase — i18n-tekster
├── <feature>Urls.ts          # camelCase — URL-definisjoner
├── <feature>Utils.ts         # camelCase — pure functions
├── <Feature>.module.css      # PascalCase — CSS Modules
└── <sub-variant>/            # kebab-case — sub-komponenter
    └── <SubVariant>.astro
```

## Steg 3: Mønster per filtype

### `<feature>Text.ts` — i18n co-lokert med feature

```typescript
// src/features/utbetaling/utbetalingText.ts
export const text = {
  tittel: {
    nb: "Utbetalinger",
    nn: "Utbetalingar",
    en: "Payments",
  },
  ingen: {
    nb: "Du har ingen nye utbetalinger de siste tre månedene",
    nn: "Du har ingen nye utbetalingar dei siste tre månadene",
    en: "You have no new payments in the last three months",
  },
} as const;
```

### `<feature>Types.ts` — typer co-lokert med feature

```typescript
// src/features/utbetaling/utbetalingTypes.ts
export type UtbetalingData = {
  utbetaling: number;
  dato: string;
  ytelse: string;
  id: string;
};

export type Utbetaling = {
  sisteUtbetaling: UtbetalingData | null;
  kommende: UtbetalingData | null;
};
```

### `<feature>Urls.ts` — URL-definisjoner med local + prod

```typescript
// src/features/utbetaling/utbetalingUrls.ts
import { isProduction } from "@utils/server/environment";

export const utbetalingUrl = isProduction
  ? "https://tms-utbetalingsoversikt-api.intern.nav.no/api/utbetaling"
  : "http://localhost:3000/utbetaling";
```

Alternativt med `astro:env/server` (anbefalt for secrets/config):

```typescript
// src/features/utbetaling/utbetalingUrls.ts
// URL defineres som env-variabel i astro.config.mjs:
// UTBETALINGSOVERSIKT_API_URL
// og brukes direkte i .astro-komponenten via import { ... } from "astro:env/server"
```

### `<Feature>.astro` — data-fetching i frontmatter, rendering i template

```astro
---
// src/features/utbetaling/Utbetaling.astro
import { UTBETALINGSOVERSIKT_API_URL } from "astro:env/server";
import ClientError from "@shared/client-error/ClientError";
import { fetchData } from "@utils/server/fetch";
import type { Language } from "@utils/server/language";
import logger from "@utils/server/logger";
import { getAudience, getOboToken } from "@utils/server/token";
import type { Utbetaling } from "./utbetalingTypes";
import EnkelUtbetaling from "./enkel/EnkelUtbetaling.astro";
import IngenUtbetaling from "./ingen/IngenUtbetaling.astro";
import styles from "./Utbetaling.module.css";

const audience = getAudience("tms-utbetalingsoversikt-api");
const oboToken = await getOboToken(Astro.locals.token, audience);

let data: Utbetaling = { sisteUtbetaling: null, kommende: null };
let isError = false;

try {
  data = await fetchData(oboToken, UTBETALINGSOVERSIKT_API_URL);
} catch (error: any) {
  logger.error(`Fetching utbetaling failed. ${error.message}`);
  isError = true;
}

const language = Astro.currentLocale as Language;
---

{isError && <ClientError client:only="react" />}
<div class={styles.container}>
  {data.sisteUtbetaling
    ? <EnkelUtbetaling utbetaling={data.sisteUtbetaling} language={language} />
    : <IngenUtbetaling language={language} />
  }
</div>
```

## Steg 4: Flytt kode — sjekkliste per fil

Gå gjennom hver fil og klassifiser:

| Filtype | Flyttes til |
|---------|------------|
| Komponent brukt av én feature | `src/features/<feature>/` |
| Komponent brukt av 2 features | Vurder `src/features/<feature>/` i den som eier den logisk |
| Komponent brukt av 3+ features | `src/shared/` |
| Typer for én feature | `src/features/<feature>/<feature>Types.ts` |
| i18n-tekster for én feature | `src/features/<feature>/<feature>Text.ts` |
| URL-logikk for én feature | `src/features/<feature>/<feature>Urls.ts` |
| Pure utils for én feature | `src/features/<feature>/<feature>Utils.ts` |
| Auth-primitiver | `src/shared/authentication/` eller `src/utils/server/token.ts` |
| Fetch/HTTP-primitiver | `src/utils/server/fetch.ts` |
| Global state | `src/shared/store/store.ts` |

## Steg 5: Oppdater imports med path-aliaser

Konfigurer path-aliaser i `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@features/*": ["src/features/*"],
      "@shared/*":   ["src/shared/*"],
      "@utils/*":    ["src/utils/*"]
    }
  }
}
```

Og i `astro.config.mjs`:

```typescript
import { defineConfig } from "astro/config";
import path from "path";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "@features": path.resolve("./src/features"),
        "@shared":   path.resolve("./src/shared"),
        "@utils":    path.resolve("./src/utils"),
      },
    },
  },
});
```

Erstatt relative imports med aliaser:

```typescript
// ❌ Før
import { text } from "../../i18n/utbetalingText";
import type { Utbetaling } from "../../../types/utbetaling";
import { fetchData } from "../../../../utils/fetch";

// ✅ Etter
import { text } from "./utbetalingText";           // Co-lokert — relativ import er OK
import type { Utbetaling } from "./utbetalingTypes"; // Co-lokert — relativ import er OK
import { fetchData } from "@utils/server/fetch";   // Delt infrastruktur — alias
```

> **Regel:** Innen en slice brukes relative imports. Til `shared/` og `utils/` brukes aliaser.

## Steg 6: Sub-varianter og fallbacks

Strukturer sub-komponenter som undermapper:

```
src/features/dokumenter/
├── Dokumenter.astro           # Hoved — fetcher data og velger variant
├── dokumenterText.ts
├── dokumenterTypes.ts
├── Dokumenter.module.css
├── dokument/                  # Én dokument-rad
│   ├── Dokument.astro
│   └── dokumentUtils.ts
├── fallback/                  # Feilstatus
│   └── DokumenterFallback.astro
└── ingen/                     # Tom tilstand
    └── IngenDokumenter.astro
```

Hoved-komponenten velger hvilken variant som vises:

```astro
---
// Dokumenter.astro — velger variant basert på data
---
{isError && <DokumenterFallback language={language} />}
{!isError && data.length === 0 && <IngenDokumenter language={language} />}
{!isError && data.length > 0 && data.map(d => <Dokument dokument={d} language={language} />)}
```

## Steg 7: Mock-server per feature

Legg til feature-endepunkter i `mock/server.ts`:

```typescript
// mock/server.ts
import { Hono } from "hono";
import utbetalingData from "./data/utbetaling.json";
import dokumenterData from "./data/dokumenter.json";

const app = new Hono();

// Utbetaling
app.get("/utbetaling", (c) => c.json(utbetalingData));

// Dokumenter
app.get("/dokumenter", (c) => c.json(dokumenterData));

export default app;
```

Local URL refereres direkte i `<feature>Urls.ts` eller som env-variabel.

## Steg 8: Verifiser refaktoreringen

```bash
# Kjør bygg — fanger import-feil og type-feil
pnpm run build

# Kjør dev-server og mock-server i parallell
pnpm run dev &
pnpm run mock &

# Sjekk at siden fungerer i nettleseren
open http://localhost:4321/minside
```

Sjekkliste etter refaktorering:

- [ ] Bygget passerer uten feil (`pnpm run build`)
- [ ] Alle features vises korrekt lokalt
- [ ] Ingen direkte cross-feature imports (kun via `@shared/` eller `@utils/`)
- [ ] Navnekonvensjoner følges konsekvent
- [ ] CSS Modules brukes for feature-spesifikke stiler
- [ ] Path-aliaser brukes for imports til `shared/` og `utils/`
- [ ] Mock-server har endepunkter for alle features

## Vanlige feil

| Feil | Symptom | Fix |
|------|---------|-----|
| Feature importerer direkte fra annen feature | Tett kobling, vanskelig å endre | Flytt delt kode til `shared/` |
| Delt kode kopieres inn i to features | Drift mellom kopiene | Legg i `shared/` med en gang |
| For store slices | Feature-mappa vokser ukontrollert | Del opp i sub-features (undermapper) |
| For små slices | Overhead uten gevinst | Én fil trenger ikke egen mappe |
| `astro:env` brukes i `.ts`-filer | Compile error | Kun i `.astro`-filer — send URL som prop |
| Relativ import til `shared/` fra feature | Skjult avhengighet | Bruk `@shared/`-alias |

## Boundaries

### ✅ Always

- Hold én feature per mappe — aldri bland features i samme mappe
- Co-loker alt som tilhører en feature: typer, tekster, URLer, utils
- Bruk CSS Modules for komponent-spesifikke stiler
- Gjør `shared/` til en bevisst beslutning — ikke et søppelsted

### ⚠️ Ask First

- Splitt én stor eksisterende feature i to — kan påvirke andre team
- Flytt kode som er i aktiv utvikling av andre på teamet

### 🚫 Never

- La en feature importere direkte fra en annen feature
- Legg forretningslogikk i `shared/` — kun infrastruktur hører hjemme der
- Bruk `astro:env/server` utenfor `.astro`-filer
- Logg PII (fnr, navn, adresse) i noen av lagene
