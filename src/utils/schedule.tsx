import { Schedule } from '../types';

const customDayOrder = ['LU', 'MA', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'];

export const sortSchedulesByDay = (schedules: Schedule[]): Schedule[] => {
  return schedules.slice().sort((a, b) => {
    return customDayOrder.indexOf(a.day) - customDayOrder.indexOf(b.day);
  });
};


export const formatSchedule = (schedule: Schedule): Schedule => {
  const daysMapping: Record<string, string> = {
    MONDAY: 'LU',
    TUESDAY: 'MA',
    WEDNESDAY: 'MIÉ',
    THURSDAY: 'JUE',
    FRIDAY: 'VIE',
    SATURDAY: 'SÁB',
    SUNDAY: 'DOM',
  };

  const formattedDay = daysMapping[schedule.day] || schedule.day;
  const formatEntryTime = schedule.entryTime.slice(0, -3);
  const formatDepartureTime = schedule.departureTime.slice(0, -3);
  return {
    ...schedule,
    day: formattedDay,
    entryTime: formatEntryTime,
    departureTime: formatDepartureTime
  };
};
