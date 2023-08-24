import { Heading } from "@navikt/ds-react/cjs/typography/Heading.js";
import { BodyShort } from "@navikt/ds-react/cjs/typography/BodyShort.js";
import InnloggedeTjensterSection from "./InnloggedeTjensterSection";
import { hjelpemidlerLenker, jobbLenker, personopplysningLenker, annetLenker } from "./innloggedeTjenesterUrls";
import type { Language } from "../../language/language";
import { text } from "./innloggedeTjenesterText";
import styles from "./InnloggedeTjenester.module.css";

interface Props {
  language: Language;
}

const InnloggedeTjenester = ({ language }: Props) => {
  const isEnglish = language === "en";

  return (
    <div className={styles.container}>
      <Heading level="2" size="small" className={styles.tittel}>{text.innloggedeTjenesterTittel[language]}</Heading>
      {isEnglish ? <BodyShort size="medium" className={styles.disclaimer}>{text.alleTjenesterDisclaimer[language]}</BodyShort> : null}
      <nav className={styles.contentContainer}>
        <div className={styles.listColumn}>
          <InnloggedeTjensterSection tittel={text.jobbOgOppfolgingTittel[language]} liste={jobbLenker} language={language} />
          <InnloggedeTjensterSection tittel={text.DinOversikt[language]} liste={hjelpemidlerLenker} language={language} />
        </div>
        <div className={styles.listColumn}>
          <InnloggedeTjensterSection tittel={text.personopplysningTittel[language]} liste={personopplysningLenker} language={language} />
          <InnloggedeTjensterSection tittel={text.annetTittel[language]} liste={annetLenker} language={language} />
        </div>
      </nav>
    </div>
  );
};

export default InnloggedeTjenester;
