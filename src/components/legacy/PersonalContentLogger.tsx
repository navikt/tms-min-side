import { logContentEvent } from "@utils/client/amplitude";

interface Props {
  event: string;
  value: boolean;
}

const PersonalContentLogger = ({ event, value }: Props) => {
  logContentEvent(event, value);
  return null;
};

export default PersonalContentLogger;
