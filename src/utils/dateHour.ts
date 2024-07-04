import { addDays, parseISO, formatISO } from 'date-fns';

export const formatDateHour = (date: string | null, time: string | null): string | null => {
  if (!date || !time) {
    return null;
  }

  // Sumar un día a la fecha
  const parsedDate = parseISO(date);
  const nextDay = addDays(parsedDate, 1);

  // Combinar fecha y hora en el formato deseado
  const dateHour = formatISO(nextDay, { representation: 'date' }) + `T${time}`;

  return dateHour;
};
