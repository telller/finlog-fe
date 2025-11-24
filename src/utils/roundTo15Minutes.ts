import dayjs from 'dayjs';

export const roundTo15Minutes = (date?: string) => {
  const now = dayjs(date);
  const minutes = Math.floor(now.minute() / 15) * 15;
  return now.minute(minutes).second(0).millisecond(0);
};
