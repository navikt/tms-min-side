---
name: ubiquitous-language
description: Ekstraher et DDD-stilet allment-språk-glossar fra den gjeldende samtalen, flagg tvetydigheter og foreslå kanoniske termer. Lagrer til UBIQUITOUS_LANGUAGE.md. Bruk når brukeren ønsker å definere domenebegreper, bygge et glossar, stramme inn terminologi, lage et allment språk, eller nevner "domenemodell" eller "DDD".
disable-model-invocation: true
---

# Allment Språk (Ubiquitous Language)

Ekstraher og formaliser domeneterminologi fra den gjeldende samtalen til et konsistent glossar, lagret i en lokal fil.

## Prosess

1. **Skann samtalen** etter domenerelevante substantiver, verb og konsepter
2. **Identifiser problemer**:
    - Samme ord brukt om ulike konsepter (tvetydighet)
    - Ulike ord brukt om samme konsept (synonymer)
    - Vage eller overbelastede termer
3. **Foreslå et kanonisk glossar** med tydelige termbeslutninger
4. **Skriv til `docs/UBIQUITOUS_LANGUAGE.md`** i arbeidsmappen med formatet nedenfor
5. **Gi et sammendrag** direkte i samtalen

## Utdataformat

Skriv en `UBIQUITOUS_LANGUAGE.md`-fil med denne strukturen:

```md
# Allment Språk

## Ordrelivssyklus

| Term        | Definisjon                                                    | Aliaser som bør unngås |
| ----------- | ------------------------------------------------------------- | ---------------------- |
| **Ordre**   | En kundes forespørsel om å kjøpe én eller flere varer         | Kjøp, transaksjon      |
| **Faktura** | En betalingsforespørsel sendt til kunden etter levering       | Regning, betalingskrav |

## Aktører

| Term        | Definisjon                                         | Aliaser som bør unngås  |
| ----------- | -------------------------------------------------- | ----------------------- |
| **Kunde**   | En person eller organisasjon som legger inn ordrer | Klient, kjøper, konto   |
| **Bruker**  | En autentiseringsidentitet i systemet              | Innlogging, konto       |

## Relasjoner

- En **Faktura** tilhører nøyaktig én **Kunde**
- En **Ordre** produserer én eller flere **Fakturaer**

## Eksempeldialog

> **Dev:** «Når en **Kunde** legger inn en **Ordre**, oppretter vi **Fakturaen** umiddelbart?»
> **Domeneekspert:** «Nei — en **Faktura** genereres først når en **Levering** er bekreftet. En enkelt **Ordre** kan produsere flere **Fakturaer** hvis varer sendes i separate **Forsendelser**.»
> **Dev:** «Så hvis en **Forsendelse** kanselleres før utsending, finnes det ingen **Faktura** for den?»
> **Domeneekspert:** «Nøyaktig. **Faktura**-livssyklusen er knyttet til **Leveringen**, ikke **Ordren**.»

## Flaggede tvetydigheter

- «konto» ble brukt om både **Kunde** og **Bruker** — dette er distinkte konsepter: en **Kunde** legger inn ordrer, mens en **Bruker** er en autentiseringsidentitet som kan, men ikke nødvendigvis, representere en **Kunde**.
```

## Regler

- **Vær tydelig.** Når flere ord finnes for samme konsept, velg det beste og list de andre som aliaser som bør unngås.
- **Flagg konflikter eksplisitt.** Hvis en term brukes tvetydig i samtalen, påpek dette i «Flaggede tvetydigheter» med en klar anbefaling.
- **Inkluder kun termer relevante for domeneeksperter.** Hopp over modul- eller klassenavn med mindre de har betydning i domenespråket.
- **Hold definisjoner presise.** Maks én setning. Definer hva det ER, ikke hva det gjør.
- **Vis relasjoner.** Bruk fete termnavn og uttrykk kardinalitet der det er åpenbart.
- **Inkluder kun domenetermer.** Hopp over generiske programmeringskonsepter (array, funksjon, endepunkt) med mindre de har domenespesifikk betydning.
- **Grupper termer i flere tabeller** når naturlige klynger fremkommer (f.eks. etter underdomene, livssyklus eller aktør). Hver gruppe får sin egen overskrift og tabell. Hvis alle termer tilhører ett sammenhengende domene, er én tabell fin — ikke tving grupperinger.
- **Skriv en eksempeldialog.** En kort samtale (3–5 utvekslinger) mellom en dev og en domeneekspert som viser hvordan termene samhandler naturlig. Dialogen skal tydeliggjøre grenser mellom relaterte konsepter og vise termer brukt presist.

<example>

## Eksempeldialog

> **Dev:** «Hvordan tester jeg **synk-tjenesten** uten Docker?»

> **Domeneekspert:** «Bruk **filsystemlaget** i stedet for **Docker-laget**. Det implementerer samme **Sandbox-tjeneste**-grensesnitt, men bruker en lokal mappe som **sandkasse**.»

> **Dev:** «Så **sync-in** oppretter fortsatt et **bundt** og pakker det ut?»

> **Domeneekspert:** «Nøyaktig. **Synk-tjenesten** vet ikke hvilket lag den snakker med. Den kaller `exec` og `copyIn` — **filsystemlaget** kjører bare disse som lokale skallkommandoer.»

</example>

## Kjøring på nytt

Når skillen startes på nytt i samme samtale:

1. Les eksisterende `docs/UBIQUITOUS_LANGUAGE.md`
2. Ta med nye termer fra påfølgende diskusjon
3. Oppdater definisjoner hvis forståelsen har utviklet seg
4. Flagg eventuelle nye tvetydigheter på nytt
5. Skriv eksempeldialogen på nytt for å inkludere nye termer