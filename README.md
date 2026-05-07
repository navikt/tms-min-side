# Min side

[![Deploy main](https://github.com/navikt/tms-min-side/actions/workflows/deploy-main.yaml/badge.svg)](https://github.com/navikt/tms-min-side/actions/workflows/deploy-main.yaml)
![Astro](https://img.shields.io/badge/Astro-6-orange?logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Biome](https://img.shields.io/badge/Biome-2-60a5fa?logo=biome&logoColor=white)

Astro SSR-app som setter sammen personalisert innhold fra mikrofrontends for innloggede brukere på nav.no/minside. Appen er en container: den henter HTML fra andre teams mikrofrontends server-side og setter dem inn i siden.

## Formål

Min side er inngangsporten for innloggede brukere på nav.no. Den viser:

- personalia og varsler øverst
- aktive saker, ytelser og utkast i «Din oversikt»
- siste utbetalinger
- siste dokumenter og innboks
- innloggede tjenester og lenker

Siden tilpasses innloggingsnivå: brukere med MinID (substantial-innlogging) får et begrenset utvalg.

## Miljø

| Miljø | URL |
|-------|-----|
| Produksjon | [www.nav.no/minside](https://www.nav.no/minside) |
| Intern (dev) | [www.intern.nav.no/minside](https://www.intern.nav.no/minside) |
| Lokalt | http://localhost:4321/minside |

## Arkitektur

Appen henter HTML fra mikrofrontends server-side via OBO-token (TokenX) og setter HTML-en direkte inn i siden. Auth skjer via ID-porten og Wonderwall (Nais-sidecar).

```mermaid
flowchart LR
    Bruker -->|ID-porten/Wonderwall| App["tms-min-side\nAstro SSR"]
    App -->|TokenX OBO| Selector["tms-mikrofrontend-selector\n(din-oversikt, aktuelt)"]
    App -->|TokenX OBO| Proxy["tms-min-side-proxy\n(personalia)"]
    App -->|TokenX OBO| Varsel["tms-varsel-api"]
    App -->|TokenX OBO| Utkast["tms-utkast"]
    App -->|TokenX OBO| Dokumenter["mine-saker-api"]
    App -->|TokenX OBO| Utbetaling["tms-utbetalingsoversikt-api"]
    App -->|TokenX OBO| Mikrofronter["20+ mikrofrontends\nfra andre team"]
    App --> Bruker
```

Kodebasen bruker vertikal slice-arkitektur: all kode for én feature samles under `src/features/<feature>/`.

## Utvikling

Kjør `pnpm run` for å se alle tilgjengelige kommandoer. Lokalt kjøres appen på `http://localhost:4321/minside`. Mock-serveren erstatter alle backend-APIer og kjøres på port 3000.

## Les mer

- [Vertikal slice-arkitektur](docs/VERTICAL_SLICE_ARCHITECTURE.md)
- [Ubiquitous language](docs/UBIQUITOUS_LANGUAGE.md)

## Henvendelser

Spørsmål til koden eller prosjektet kan stilles som issues her på GitHub.

For Nav-ansatte: send interne henvendelser på Slack i kanalen #team-minside.

