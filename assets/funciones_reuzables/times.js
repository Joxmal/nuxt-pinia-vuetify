
//se utiliza para obtener la fecha que regresa la bd de pocketbase que pasa de iso a una que pueda leer el input tipo date
// una función reutilizable en JavaScript para convertir una fecha en formato UTC a un formato específico, como "YYYY-MM-DDTHH:MM":
export function convertirFechaUTC(fechaUTC) {
  const fecha = new Date(fechaUTC);
  const fechaLocal = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000)).toISOString().split('T')[0] + 'T' + new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000)).toISOString().split('T')[1].split('.')[0];
  return fechaLocal;
}