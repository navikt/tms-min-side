import { logContentEvent } from "@src/shared/utils/client/umami";

interface Props {
  event: string;
  value: boolean;
}

const PersonalContentLogger = ({ event, value }: Props) => {
  setTimeout(() => {
    logContentEvent(event, value);
  }, 500);

  return null;
};

export default PersonalContentLogger;
