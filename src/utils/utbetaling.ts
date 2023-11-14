import dayjs from "dayjs";
import "dayjs/locale/nb";

export const formatToReadableDate = (date: string) => {
  return dayjs(date).locale("nb").format("D. MMMM ");
};
