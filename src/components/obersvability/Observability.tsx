import { useFaro } from "@hooks/useFaro.ts";
import { useStatistikk } from "@hooks/useStatistikk.ts";

const Observability = () => {
  useFaro();
  useStatistikk();

  return null;
};

export default Observability;
