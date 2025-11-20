import dayjs from 'dayjs';

export function formatDateLabel(date: string | Date) {
  const d = dayjs(date);
  const now = dayjs();

  if (d.isSame(now, 'day')) {
    return 'Сьогодні';
  }

  if (d.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Вчора';
  }

  if (d.isSame(now, 'week')) {
    return 'Цей тиждень';
  }

  if (d.isSame(now.subtract(1, 'week'), 'week')) {
    return 'Минулий тиждень';
  }

  if (d.isSame(now, 'month')) {
    return 'Цей місяць';
  }

  if (d.isSame(now.subtract(1, 'month'), 'month')) {
    return 'Минулий місяць';
  }

  if (d.isSame(now, 'year')) {
    return 'Цей рік';
  }

  return d.format('DD.MM HH:mm');
}
