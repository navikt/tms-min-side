# Vertikal slice-arkitektur — tms-min-side

> ADR-light som dokumenterer arkitektur og navnekonvensjoner for vertikal slice-struktur (se epic #541).

---

## Bakgrunn

Kodebasen er organisert som en **vertikal slice-arkitektur**. All kode for én feature finnes på ett sted — slik at det er lett å forstå, endre og slette en feature. Kodebasen er migrert fra en horisontal, lagdelt struktur (med bl.a. `src/language/`) til denne strukturen.

---

## Directory-layout

```
src/
├── features/                    # Én mappe per feature-slice
│   ├── <feature>/
│   │   ├── <feature>Text.ts     # i18n-tekster for denne featuren (co-lokert, ikke i undermappe)
│   │   ├── <feature>Urls.ts     # URL-definisjoner og audience (inkl. local: "http://localhost:3000/...")
│   │   ├── <feature>Types.ts    # TypeScript-typer (valgfritt)
│   │   ├── utils/               # (valgfritt) feature-spesifikke utilities
│   │   ├── *.astro              # Server-rendrede komponenter
│   │   ├── *.tsx                # Klient-interaktive React-komponenter
│   │   └── *.module.css         # CSS Modules
│   │
│   ├── aktuelt/
│   ├── alert-island/
│   │   ├── utkast/
│   │   └── varsler/
│   ├── din-oversikt/
│   │   ├── assets/
│   │   ├── meldekort/
│   │   └── produktkort/
│   ├── dokumenter/
│   │   ├── dokument/
│   │   ├── fallback/
│   │   └── ingen/
│   ├── innboks/
│   │   └── fallback/
│   ├── innloggede-tjenester/
│   │   ├── link/
│   │   └── section/
│   ├── personalia/
│   ├── substantial-info/
│   ├── utbetaling/
│   │   ├── enkel/
│   │   ├── fallback/
│   │   ├── ingen/
│   │   ├── list/
│   │   ├── se-alle/
│   │   └── utils/
│   └── ux-signal/
│
├── shared/                      # Delt infrastruktur og UI-primitiver
│   ├── language/
│   │   └── language.ts          # Language-type og getLanguage()
│   ├── authentication/
│   ├── client-error/
│   ├── container/
│   ├── feilmelding/
│   ├── legacy/
│   └── obersvability/           # Observability: Faro, Amplitude (merk: typo i mappenavn)
│
├── utils/                       # Teknisk infrastruktur (ikke feature-logikk)
│   ├── server/                  # SSR-only: fetch.ts, token.ts, logger.ts, environment.ts, error.ts
│   └── client/                  # Browser-only: api.ts, environment.ts, umami.ts
│
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

Utils-mappen inneholder **ren teknisk infrastruktur** uten forretningslogikk:

- `server/`: SSR-utilities som er gjenbrukbare av mange features (`fetch`, `token`, `logger`, `environment`, `error`).
- `client/`: Browser-utilities som er gjenbrukbare av mange features (`api`, `environment`, `umami`).

Feature-spesifikk logikk (f.eks. `utbetaling/utils/`) ligger i respektive feature-slice.

---

## tsconfig path-alias-strategi

| Alias | Path | Status |
|-------|------|--------|
| `@features/*` | `src/features/*` | ✅ Definert — brukes for feature-imports |
| `@shared/*` | `src/shared/*` | ✅ Definert — brukes for delt infrastruktur |
| `@utils/*` | `src/utils/*` | ✅ Definert — brukes for teknisk infrastruktur |
| `@hooks/*` | `src/hooks/*` | ❌ Fjernet — `src/hooks/` eksisterer ikke |

---

## Navnekonvensjoner

| Hva | Konvensjon | Eksempel |
|-----|-----------|---------|
| Feature-mappe | `kebab-case` | `din-oversikt/`, `alert-island/` |
| Astro-komponent | `PascalCase.astro` | `DinOversikt.astro` |
| React-komponent | `PascalCase.tsx` | `Produktkort.tsx` |
| CSS Module | `PascalCase.module.css` | `DinOversikt.module.css` |
| Typer-fil | `<featureName>Types.ts` | `DinOversiktTypes.ts` |
| URL-fil | `<featureName>Urls.ts` | `utbetalingUrls.ts` |
| Language-fil | `<featureName>Text.ts` (co-lokert i feature-rot) | `dinOversiktText.ts` |
| Feature-spesifikk utils | `utils/<navn>.ts` | `utbetaling/utils/utbetalingUtils.ts` |

---

## Status

Migreringen til vertikal slice-arkitektur ble gjennomført som del av epic #541:

- **#543** ✅ Flytt feature-komponenter til `src/features/`
- **#544** ✅ Etabler `src/shared/`
- **#545** ✅ Co-locer language-filer
- **#546** ✅ Co-locer feature-spesifikke server-utilities
- **#547** ✅ Oppdater tsconfig path-aliaser
- **#548** ✅ Verifiser bygg og deploy
