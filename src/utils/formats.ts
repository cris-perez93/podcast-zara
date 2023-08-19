import { format } from "date-fns";

// funcion para limpiar el titulo de los episodios u otros datos
export const getCleanedTitle = (title: string) => {
  const startIndex = title.indexOf('"');
  const endIndex = title.lastIndexOf('"');
  if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
    return title.substring(startIndex + 1, endIndex);
  }
  return title;
};

// funcion para formatear la fecha de los episodios u otros datos
export const formatDateString = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "M/d/yyyy");
};

// funcion para formatear milisegundos a minutos y segundos de los episodios u otros datos
export const formatDuration = (durationInMillis: number) => {
  // formatear milisegundos a minutos y segundos u horas y minutos con date-fns
  const date = new Date(durationInMillis);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
};
