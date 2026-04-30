# Vertikal slice-arkitektur — tms-min-side

> ADR-light som dokumenterer target-arkitektur og navnekonvensjoner for omstrukturering til vertical slices (se epic #541).

---

## Bakgrunn

Kodebasen organiseres fra en horisontal, lagdelt struktur til en **vertikal slice-arkitektur**. I dag er feature-kode spredt over `src/language/`, `src/utils/` og `src/features/`. Målet er at all kode for én feature finnes på ett sted — slik at det er lett å forstå, endre og slette en feature.

---

## Target directory-layout

```
src/
├── features/                    # Én mappe per feature-slice
│   ├── <feature>/
│   │   ├── language/
│   │   │   └── aktueltText.ts          # i18n-tekster for denne featuren
│   │   ├── utils/               # (valgfritt) feature-spesifikke utilities
│   │   ├── aktueltTypes.ts             # TypeScript-typer
│   │   ├── aktueltUrls.ts              # URL-definisjoner og audience
│   │   ├── *.astro              # Server-rendrede komponenter
│   │   ├── *.tsx                # Klient-interaktive React-komponenter
│   │   └── *.module.css         # CSS Modules
│   │
│   ├── aktuelt/
│   ├── alert-island/
│   │   ├── utkast/
│   │   └── varsler/
│   ├── din-oversikt/
│   ├── dokumenter/
│   ├── innboks/
│   ├── innloggede-tjenester/
│   ├── personalia/
│   ├── substantial-info/
│   ├── utbetaling/
│   └── ux-signal/
│
├── shared/                      # Delt infrastruktur og UI-primitiver
│   ├── language/                # Delt i18n: Language-type, getLanguage(), globale tekster
│   │   ├── language.ts          # Language-type og getLanguage()
│   │   └── aktueltText.ts              # App-globale tekster (sidetitler, feilmelding)
│   ├── authentication/
│   ├── client-error/
│   ├── container/
│   ├── feilmelding/
│   ├── legacy/
│   └── observability/
│
├── utils/                       # Teknisk infrastruktur (ikke feature-logikk)
│   ├── server/                  # SSR-only: fetch, token, logger, environment, error
│   └── client/                  # Browser-only: amplitude, api, environment, faro
│
├── hooks/                       # Delte React-hooks
├── store/                       # Global state (nanostores)
├── microfrontends/              # Microfrontend-loader
├── middleware/                  # Astro middleware
├── layouts/                     # Astro layouts
└── pages/                       # Astro pages (ruting)
```

---

## Kriterier: «feature» vs. «shared»

### Feature (`src/features/<feature>/`)

En feature-slice er en **navngitt seksjon** som er synlig for innbyggeren på Min side. En feature:

- Representerer én avgrenset del av siden (f.eks. «Din oversikt», «Innboks», «Utbetaling»).
- Eier sine egne komponenter, typer, URL-definisjoner og språktekster.
- Kan ha interne sub-features (f.eks. `alert-island/utkast/` og `alert-island/varsler/`).
- Er ikke importert av andre features — features er ikke avhengige av hverandre.

### Shared (`src/shared/`)

Shared inneholder UI-primitiver og infrastruktur som **brukes av flere features** eller av layouts/pages:

- Generiske UI-komponenter (`Container`, `Feilmelding`, `ClientError`) som ikke tilhører én feature.
- Auth-primitiver (`Authentication`) brukt på tvers.
- Delt i18n-infrastruktur: `Language`-typen, `getLanguage()` og globale applikasjonsnivå-tekster.
- Tekniske wrappers uten domeneinnhold (`Legacy`, `Observability`).

### Utils (`src/utils/`)

Utils-mappen beholdes for **ren teknisk infrastruktur** uten forretningslogikk:

- `server/`: SSR-utilities som er gjenbrukbare av mange features (`fetch`, `token`, `logger`, `environment`, `error`).
- `client/`: Browser-utilities som er gjenbrukbare av mange features (`amplitude`, `api`, `environment`, `faro`).

Feature-spesifikk logikk (f.eks. `dinOversiktUtils.ts`, `dokumentUtils.ts`) flyttes inn i respektive feature-slice.

---

## Filer som skal flyttes

### `src/language/` → feature-slices og `src/shared/language/`

| Fra | Til |
|-----|-----|
| `src/language/language.ts` | `src/shared/language/language.ts` |
| `src/language/aktueltText.ts` | `src/shared/language/aktueltText.ts` |
| `src/language/aktuelt.ts` | `src/features/aktuelt/language/aktueltText.ts` |
| `src/language/dokumenter.ts` | `src/features/dokumenter/language/aktueltText.ts` |
| `src/language/feilmelding.ts` | `src/shared/feilmelding/language/aktueltText.ts` |
| `src/language/innboks.ts` | `src/features/innboks/language/aktueltText.ts` |
| `src/language/innloggedeTjenester.ts` | `src/features/innloggede-tjenester/language/aktueltText.ts` |
| `src/language/personalia.ts` | `src/features/personalia/language/aktueltText.ts` |
| `src/language/substantialInfo.ts` | `src/features/substantial-info/language/aktueltText.ts` |
| `src/language/utbetaling.ts` | `src/features/utbetaling/language/aktueltText.ts` |
| `src/language/utkast.ts` | `src/features/alert-island/utkast/language/aktueltText.ts` |
| `src/language/varslerText.ts` | `src/features/alert-island/varsler/language/aktueltText.ts` |

> **Merk:** `src/features/din-oversikt/language/aktueltText.ts` finnes allerede — dette mønsteret er etablert og skal brukes for alle features.

### `src/utils/` → feature-slices

| Fra | Til |
|-----|-----|
| `src/utils/server/dinOversiktUtils.ts` | `src/features/din-oversikt/utils/dinOversiktUtils.ts` |
| `src/utils/client/dokumentUtils.ts` | `src/features/dokumenter/utils/dokumentUtils.ts` |
| `src/utils/client/utbetaling.ts` | `src/features/utbetaling/utils/utbetaling.ts` |
| `src/utils/client/varslerText.ts` | `src/features/alert-island/varsler/utils/varslerText.ts` |

Øvrige filer i `src/utils/` er ren infrastruktur og **blir liggende**:

- `utils/server/`: `environment.ts`, `fetch.ts`, `logger.ts`, `token.ts`, `error.ts`
- `utils/client/`: `umami.ts`, `api.ts`, `environment.ts`, `faro/`

---

## tsconfig path-alias-strategi

| Alias | Path | Status |
|-------|------|--------|
| `@features/*` | `src/features/*` | ✅ Allerede definert — beholdes |
| `@shared/*` | `src/shared/*` | ✅ Allerede definert — beholdes |
| `@utils/*` | `src/utils/*` | ✅ Beholdes for teknisk infrastruktur |
| `@hooks/*` | `src/hooks/*` | ✅ Beholdes |
| `@language/*` | `src/language/*` | ⚠️ Fjernes etter at alle language-filer er co-lokert (se sub-issue #545 og #547) |

Etter fullført migrering vil `@language/*` fjernes og konsumenter oppdateres til direkte relativ import eller via `@features/<feature>/language/aktueltText.ts` / `@shared/language/`.

---

## Navnekonvensjoner

| Hva | Konvensjon | Eksempel |
|-----|-----------|---------|
| Feature-mappe | `kebab-case` | `din-oversikt/`, `alert-island/` |
| Astro-komponent | `PascalCase.astro` | `DinOversikt.astro` |
| React-komponent | `PascalCase.tsx` | `Produktkort.tsx` |
| CSS Module | `PascalCase.module.css` | `DinOversikt.module.css` |
| Typer-fil | `<feature>Types.ts` eller `aktueltTypes.ts` | `DinOversiktTypes.ts` |
| URL-fil | `<feature>Urls.ts` eller `aktueltUrls.ts` | `utbetalingUrls.ts` |
| Language-fil | `language/aktueltText.ts` | `din-oversikt/language/aktueltText.ts` |
| Feature-spesifikk utils | `utils/<navn>.ts` | `utils/dinOversiktUtils.ts` |

---

## Beslutning

Strukturen som er beskrevet i dette dokumentet er **target-tilstanden** som de øvrige sub-issues i epic #541 skal implementere:

- **#543** — Flytt feature-komponenter til `src/features/`
- **#544** — Etabler `src/shared/` (dette dokumentet)
- **#545** — Co-locer language-filer
- **#546** — Co-locer feature-spesifikke server-utilities
- **#547** — Oppdater tsconfig path-aliaser
- **#548** — Verifiser bygg og deploy
