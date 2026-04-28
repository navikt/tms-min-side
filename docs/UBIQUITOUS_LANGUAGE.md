# Allment Språk — tms-min-side

> Kanonisk terminologi for «Min side»-portalen. Bruk disse termene konsekvent i kode, PR-beskrivelser, designspesifikasjoner og samtaler med domeneeksperter.

---

## Innbygger og autentisering

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Innbygger** | En person som er logget inn på Min side og bruker Nav sine digitale tjenester | Bruker, sluttbruker, borger |
| **MinID** | Innloggingsmetode som gir lavt sikkerhetsnivå (`idporten-loa-substantial`) | Substantial, lav innlogging |
| **Høyt sikkerhetsnivå** | Innlogging med BankID, Buypass eller Commfides (`idporten-loa-high`) som gir tilgang til alt innhold | High level, fullinnlogging |
| **Substantial-innlogging** | Tilstand der innbygger er logget inn med MinID og *ikke* har tilgang til alle tjenester | Lavt nivå, begrenset tilgang |
| **Stepup** | Tilbud om å oppgradere til høyt sikkerhetsnivå fra en substantial-sesjon | Oppgradering, re-innlogging |

## Siden og dens seksjoner

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Min side** | Innbyggerens personlige portal hos Nav — applikasjonens navn og primære domene | My page, portalen |
| **Din oversikt** | Seksjon som viser innbyggerens aktive ytelser som produktkort, meldekort og microfrontends | Oversiktssiden, dashboard |
| **Innloggede tjenester** | Seksjon med lenker til Nav-tjenester gruppert etter temaområde | Tjenesteoversikt, lenkeliste |
| **Aktuelt** | Seksjon med dynamisk foreslått innhold som kan være relevant for innbyggeren | Anbefalt, forslag |
| **Personalia** | Seksjon som viser innbyggerens navn og personopplysninger | Profil, brukerinfo |

## Varsler

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Varsel** | Overordnet begrep for en melding til innbyggeren — dekker både oppgaver og beskjeder | Notifikasjon, alert, notification |
| **Oppgave** | Et varsel som krever handling fra innbyggeren (f.eks. «last opp dokumentasjon») | Task, to-do, påminnelse |
| **Beskjed** | Et informativt varsel som ikke krever direkte handling (f.eks. «saken din er oppdatert») | Melding, info-varsel |
| **Varsler-siden** | Dedikert side som viser alle aktive varsler for innbyggeren | Notifikasjonssenter |
| **Tidligere varsler** | Side som viser inaktive/arkiverte varsler | Varselhistorikk |

## Innboks

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Innboks** | Seksjon og side for skriftlig dialog mellom innbygger og Nav | Meldingssenter, postkasse |
| **Melding** | En enkelt kommunikasjonsenhet i innboksen — fra telefon/chat/«Skriv til oss» | Beskjed *(i innboks-kontekst)*, brev |
| **Samtalereferater** | Oppsummering av dialog på telefon eller i chat, lagret i innboksen | Logg, notat |

> ⚠️ **Merk:** «Beskjed» brukes i varselkontekst for et informativt varsel. «Melding» brukes i innboks-kontekst for dialog. Bruk aldri «beskjed» om innboks-innhold.

## Ytelser og produktkort

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Ytelse** | En Nav-stønad eller tjeneste innbyggeren mottar eller har søkt på (dagpenger, pensjon osv.) | Produkt, stønad *(i kode)* |
| **Produktkort** | Et kort i «Din oversikt» som representerer en aktiv ytelse for innbyggeren | Ytelseskort, saksflise |
| **Sakstema** | Trebokstavskode som identifiserer ytelsestypen (f.eks. `DAG`, `PEN`, `SYK`) | Temakode, kategorikode |
| **Meldekort** | Skjema dagpengemottakere sender periodisk for å bekrefte arbeidssøkerstatus | Rapporteringskort |
| **Microfrontend** | En selvstendig mini-applikasjon lastet inn i Min side fra et annet team | Widget, innebygd app |

Kjente sakstemaer:

| Sakstema | Ytelse |
|---|---|
| `DAG` | Dagpenger |
| `FOR` | Foreldrepenger / svangerskapspenger |
| `HJE` | Hjelpemidler |
| `KOM` | Økonomisk sosialhjelp |
| `PEN` | Pensjon |
| `SYK` / `SYM` | Sykefravær |
| `UFO` | Uføretrygd |

## Utbetalinger

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Utbetaling** | En konkret pengeoverføring fra Nav til innbyggerens konto | Betaling, transaksjon |
| **Siste utbetaling** | Den seneste registrerte utbetalingen | Forrige utbetaling |
| **Neste utbetaling** | En kommende planlagt utbetaling | Fremtidig utbetaling |

## Dokumenter

| Term | Definisjon | Aliaser som bør unngås |
|---|---|---|
| **Dokument** | En fil tilknyttet innbyggerens sak hos Nav | Fil, vedlegg |
| **Journalpost** | En registrert arkivpost som kan inneholde ett eller flere dokumenter | Arkivoppføring, saksinnlegg |
| **Dokumentarkiv** | Komplett oversikt over alle journalpostene til innbyggeren | Arkiv, dokumentliste |
| **Avsender / Mottaker** | Part som sendte eller mottok et dokument i en journalpost | Fra / Til |

---

## Relasjoner

- En **Innbygger** har null eller flere aktive **Ytelser**, representert som **Produktkort** i **Din oversikt**.
- En **Ytelse** identifiseres med ett **Sakstema** og kan gi opphav til **Utbetalinger** og **Dokumenter**.
- En **Innbygger** kan motta **Varsler** av typene **Oppgave** og **Beskjed**; de vises samlet på **Varsler-siden**.
- **Meldinger** i **Innboksen** er atskilt fra **Varsler** — de representerer dialog, ikke handlingspunkter.
- En **Microfrontend** kan vises i **Din oversikt** (aktiv sak) eller i **Aktuelt** (relevant tilbud).
- En **Substantial-innlogging** begrenser tilgang til visse seksjoner; **Stepup** oppgraderer til **Høyt sikkerhetsnivå**.

---

## Eksempeldialog

> **Dev:** «Skal vi vise alle **varsler** i **innboksen**, eller er det separate konsepter?»

> **Domeneekspert:** «Helt separate. En **oppgave** eller **beskjed** er et **varsel** — noe Nav proaktivt sender til innbyggeren. **Innboksen** er dialog: **meldinger** innbyggeren har skrevet eller mottatt via telefon, chat og Skriv til oss. De vises aldri på samme sted.»

> **Dev:** «Greit. Og hvis en innbygger er logget inn med **MinID** — ser de **produktkort** i **Din oversikt**?»

> **Domeneekspert:** «Nei. **Substantial-innlogging** gir ikke tilgang til **Din oversikt** med **produktkort**. Vi viser **Stepup**-banneret og oppfordrer til å logge inn med BankID for å se aktive **ytelser**.»

> **Dev:** «Hva med **Aktuelt**-seksjonen — er det også blokkert?»

> **Domeneekspert:** «**Aktuelt** vises uavhengig av nivå, siden det bare er forslag og ikke sensitiv saksinformasjon. Det er **produktkort**, **meldekort** og detaljerte **dokumenter** som krever **høyt sikkerhetsnivå**.»

---

## Flaggede tvetydigheter

- **«Varsel» vs «Beskjed» vs «Melding»**: Alle tre brukes i dagligtale om «noe Nav sender deg», men de er distinkte: **Varsel** er overordnet (inkl. **Oppgave** og **Beskjed**); **Melding** tilhører **Innboks**. Ikke bruk «melding» som synonym for varsel i kode eller design.

- **«Produkt» vs «Ytelse»**: Kodebasen bruker `produktkort`, `produktnavn` og `ProduktProperties`, men det faktiske domeneordet er **ytelse**. Nye komponenter bør bruke `ytelse` i variabelnavn der det er mulig for å nærme seg domenespråket.

- **«Sakstema» vs «Temakode»**: Begge brukes i koden (`temakode` i `DokumentType`, `sakstema` i `getProduktkortList`). Kanonisk term: **sakstema**. Bruk `sakstema` konsekvent.

- **`isSubstantial`**: Variabelnavnet i koden er misvisende — det betyr reelt sett «begrenset tilgang». Unngå å bruke dette som brukervendt tekst. Bruk **MinID-innlogging** for å kommunisere tilstanden til brukeren.
