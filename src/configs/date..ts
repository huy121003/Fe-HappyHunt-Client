import dayjs from 'dayjs';

export const dayFormat = (date: string) => {
  return dayjs(date).format('DD MMM YYYY');
};
