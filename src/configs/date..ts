import dayjs from "dayjs";

export const dayFormat = (date: string) => {
  return dayjs(date).format("DD MMM YYYY");
};

import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const timeSendMessage = (date: string) => {
  const messageTime = dayjs(date);

  if (messageTime.isToday()) {
    return `${messageTime.format("HH:mm")} Today`;
  }

  if (messageTime.isYesterday()) {
    return `${messageTime.format("HH:mm")} Yesterday`;
  }

  return messageTime.format("HH:mm DD/MM/YYYY");
};
