export const hasOppgaver = (oppgaver: number) => oppgaver > 0;

export const hasBeskjeder = (beskjeder: number) => beskjeder > 0;

export const hasVarsler = (varsler: number) => varsler > 0;

export const hasOppgaverAndBeskjeder = (oppgaver: number, beskjeder: number) => oppgaver > 0 && beskjeder > 0;

export const oppgaveSingular = (oppgaver: number) => oppgaver === 1;

export const beskjedSingular = (beskjeder: number) => beskjeder === 1;

export const buildText = (beskjeder: number, oppgaver: number, beskjedText:string, oppgaveText: string, ogText: string) => {
  if (hasOppgaverAndBeskjeder(oppgaver, beskjeder)) {
    return `${oppgaver} ${oppgaveText} ${ogText} ${beskjeder} ${beskjedText}`;
  }

  if (hasOppgaver(oppgaver)) {
    return `${oppgaver} ${oppgaveText}`;
  }

  if (hasBeskjeder(beskjeder)) {
    return `${beskjeder} ${beskjedText}`;
  }
}


