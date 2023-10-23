import { useEffect } from "react";
import { postInnloggingsstatistikk } from "../utils/statistikk.ts";

export const useStatistikk = () => {
  useEffect(() => {
    postInnloggingsstatistikk();
  }, []);
};
