import { useEffect } from "react";
import { postInnloggingsstatistikk } from "@utils/client/statistikk.ts";

export const useStatistikk = () => {
  useEffect(() => {
    postInnloggingsstatistikk();
  }, []);
};
