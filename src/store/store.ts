import create from "zustand";
import { getLanguageFromUrl } from "../language/utils";
import { Locale } from "../hooks/useLanguage";

export interface StoreState {
  isError: boolean;
  language: Locale;
  setIsError: () => void;
  setLanguage: (locale: Locale) => void;
}

export const selectIsError = (state: StoreState) => state.isError;
export const selectLanguage = (state: StoreState) => state.language;
export const selectSetIsError = (state: StoreState) => state.setIsError;
export const selectSetLanguage = (state: StoreState) => state.setLanguage;

const actions = (set: any) => ({
  setLanguage: (locale: Locale) =>
    set({
      language: locale,
    }),
  setIsError: () =>
    set({
      isError: true,
    }),
});

const useStore = create<StoreState>((set) => ({
  language: getLanguageFromUrl(),
  isError: false,
  ...actions(set),
}));

export default useStore;
