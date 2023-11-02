import "dayjs";
import "dayjs/locale/nb";
import dayjs from "dayjs";

dayjs.locale("nb");

export const formatDateMonth = (date: string) => dayjs(date).locale("nb").format("D. MMMM YYYY");
