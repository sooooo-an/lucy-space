import dayjs from "dayjs";
import { format } from "timeago.js";

export const parseDate = (date: string) => {
  const weekAgo = new Date().getTime() - 1000 * 60 * 60 * 24 * 7;
  const isRangeWeek = weekAgo < new Date(date).getTime();

  return isRangeWeek ? format(date) : dayjs(date).format("YYYY-MM-DD");
};
