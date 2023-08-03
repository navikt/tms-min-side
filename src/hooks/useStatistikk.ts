import { useEffect } from "react";
import { postInnloggingsstatistikk } from "../utils/api.client";

export const useStatistikk = () => {
  useEffect(() => {
    postInnloggingsstatistikk();
  }, []);
};
