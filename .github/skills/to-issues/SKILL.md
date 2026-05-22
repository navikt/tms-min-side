---
name: to-issues
description: Bryt ned plan, spec eller PRD til selvstendige GitHub-issues med tracer-bullet vertikale slices. Brukes når arbeid skal gjøres om til konkrete implementeringsoppgaver i issue-tracker.
---

# To issues

Bryt en plan, spec eller PRD ned til små, selvstendige GitHub-issues med vertikale tracer-bullet slices.

## Arbeidsflyt

### 1. Samle kontekst

Bruk det som allerede finnes i samtalen. Hvis brukeren peker til et eksisterende issue (`#123` eller URL), hent og les hele beskrivelsen og kommentarene før nedbrytning.

### 2. Forankre i repoet (ved behov)

Hvis konteksten er tynn, les relevant kode og dokumentasjon først. Bruk domeneord fra `docs/UBIQUITOUS_LANGUAGE.md` i titler og beskrivelser (f.eks. *Innbygger*, *Din oversikt*, *Varsel*, *Utkast*, *Ytelse*), og respekter føringer fra ADR-er og vertikal-slice-arkitektur.

### 3. Lag forslag til vertikale slices

Bryt arbeidet i **tynne, ende-til-ende slices** som går gjennom relevante lag (UI/SSR, API-kontrakt, backend-integrasjon, observability og evt. testverifisering), ikke horisontale lag-oppgaver.

Slices kan være:
- **AFK**: kan implementeres og merges uten menneskelig beslutning underveis
- **HITL**: krever beslutning, avklaring eller review fra menneske

<vertical-slice-rules>
- Hver slice skal levere en liten, men komplett verdi
- Hver slice skal være demo-/verifiserbar alene
- Foretrekk flere tynne slices fremfor få brede
- Foretrekk AFK over HITL når risiko og usikkerhet tillater det
</vertical-slice-rules>

### 4. Avklar med brukeren før oppretting

Presenter forslaget som nummerert liste. For hver slice:  
**Tittel**, **Type (AFK/HITL)**, **Avhenger av**, og **hvilken brukerhistorie/målbit** den dekker.

Be brukeren bekrefte:
- riktig granularitet (for grovt/for fint)
- riktige avhengigheter
- om noen slices bør splittes/slås sammen
- om AFK/HITL-markeringene er riktige

Iterer til brukeren godkjenner.

### 5. Opprett issues med repoets malstruktur

Dette repoet har maler i `.github/ISSUE_TEMPLATE/` (`feature`, `story`, `task`, `bug`, `epic`). Velg issue-type som passer slicen og bygg issue-body med seksjoner fra den aktuelle malen.

Minimum i hvert slice-issue:
- kort, tydelig ende-til-ende beskrivelse
- konkrete akseptansekriterier (checklist)
- avhengigheter (`Avhenger av #NNN` ved behov)
- epic-kobling (`Del av epic: #NNN` ved behov)

Opprett med `gh` (foretrukket i dette repoet):

```bash
gh api repos/navikt/tms-min-side/issues \
  -X POST \
  -f title="Kort, beskrivende tittel" \
  -f body="BODY" \
  -f type="Task" \
  --jq '.html_url'
```

Opprett alltid i avhengighetsrekkefølge (blokkerende issues først), slik at etterfølgende issues kan referere til faktiske issue-numre.

### 6. Etter oppretting

- Ikke lukk eller endre parent-issue uten eksplisitt beskjed.
- Hvis arbeidet tilhører en epic: legg sub-issues i epicen og koble avhengigheter.
- Hvis prosjektboard er konfigurert via issue-maler, følg samme prosjektflyt som i `issue-management`-skillen (`references/projects.md`).

## Issue-mal for vertikale slices

```markdown
## Beskrivelse
[Kort beskrivelse av slice-verdi ende-til-ende]

## Bakgrunn
[Hvorfor denne slicen trengs nå]

## Akseptansekriterier
- [ ] Kriterium 1
- [ ] Kriterium 2
- [ ] Kriterium 3

## Teknisk kontekst
[Relevante tjenester, kontrakter, observability-punkter, lenker]

## Avhengigheter
[Avhenger av #NNN] eller [Ingen - kan startes umiddelbart]

## Epic-kobling
[Del av epic: #NNN] (valgfritt)
```