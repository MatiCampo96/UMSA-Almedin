export const formatDateHour = (date: string | null, time: string | null): string | null => {
    if (!date || !time) {
      return null;
    }
  
    // Combinar fecha y hora en el formato deseado
    const dateHour = `${date}T${time}`;
  
    return dateHour;
  };