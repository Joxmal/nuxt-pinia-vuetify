
//se utiliza para obtener la fecha que regresa la bd de pocketbase que pasa de iso a una que pueda leer el input tipo date
// una función reutilizable en JavaScript para convertir una fecha en formato UTC a un formato específico, como "YYYY-MM-DDTHH:MM":
export function convertirFechaUTC(fechaUTC) {
  const fecha = new Date(fechaUTC);
  const fechaLocal = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000)).toISOString().split('T')[0] + 'T' + new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000)).toISOString().split('T')[1].split('.')[0];
  return fechaLocal;
}

export function obtenerPrimerDiaMes(){
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  let mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
  mes = mes.toString().padStart(2, "0"); // pasar a 01 en caso de que sea 1
  const día = "01"
  const fechaFormateada = `${año}-${mes}-${día}`;
  return fechaFormateada
}
export function obtenerUltimoDiaMes(){
  const fechaActual = new Date();
  const año = fechaActual.getFullYear();
  let mes = fechaActual.getMonth() + 1; // Los meses se cuentan desde 0, por lo que se suma 1
  mes = mes.toString().padStart(2, "0"); // pasar a 01 en caso de que sea 1

  const últimoDía = new Date(año, mes, 0).getDate();
  const fechaFormateada = `${año}-${mes}-${últimoDía}`;

  return fechaFormateada
}