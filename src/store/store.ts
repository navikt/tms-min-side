import { atom } from "nanostores";
import { Dokument } from "@components/oversikt/microfrontendTypes.tsx";

export const isErrorAtom = atom<boolean>(false);
export const dokumenterAtom = atom<Dokument[]>([]);
export const dokumenterLoading = atom<boolean>(true);
export const dokumenterError = atom<boolean>(false);

export function setIsError() {
  isErrorAtom.set(true);
}

export function setDokumenter(dokumenter: Dokument[]) {
  dokumenterAtom.set(dokumenter);
}

export function setDokumenterLoading(state: boolean) {
  dokumenterLoading.set(state);
}

export function setDokumenterError() {
  dokumenterError.set(true);
}