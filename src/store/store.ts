import { atom } from "nanostores";

export const isErrorAtom = atom<boolean>(false);

export function setIsError() {
  isErrorAtom.set(true);
}
