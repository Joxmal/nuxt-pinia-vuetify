export function convertDateFormatWithTimezone(dateString, offsetHours=-4) {
    // Parsea la fecha
    const date = new Date(dateString);

    // Ajusta la hora según el desplazamiento de la zona horaria
    const adjustedDate = new Date(date.getTime() + (offsetHours * 60 * 60 * 1000));

    // Obtiene la fecha y hora en formato ISO
    const isoString = adjustedDate.toISOString();

    // Extrae la fecha y hora hasta los minutos
    const convertedString = isoString.slice(0, 16);

    return convertedString;
  }


export function obtenerHora(item) {
  const date = new Date(item);
  let horas = date.getHours();
  let minutos = date.getMinutes();
  return `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;
}