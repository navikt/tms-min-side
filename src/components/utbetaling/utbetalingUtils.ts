import dayjs from "dayjs";
import "dayjs/locale/nb";
import type { Trekk, UnderYtelse } from "./utbetalingTypes";

function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}

export function summerTrekk(trekk: Trekk[]): number {
  return sum(trekk.map((trekkbelop) => trekkbelop.trekk_belop));
}

export function summerYtelser(ytelse: UnderYtelse[], trekk: Trekk[]): number {
  return summerTrekk(trekk) + summerBruttoYtelser(ytelse);
}

export function summerBruttoYtelser(ytelse: UnderYtelse[]): number {
  return sum(ytelse.map((underytelse) => underytelse.belop));
}

export const formatToReadableDate = (date: string) => {
  return dayjs(date).locale("nb").format("D. MMMM ");
};
