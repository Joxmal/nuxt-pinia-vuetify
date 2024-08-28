// utils.js
import { useAsistenciasStore } from '~/stores/asistencias'
const store = useAsistenciasStore()
import { convertDateFormatWithTimezone } from '../time';

export function abrirDialogoEditar(props) {

  console.log('props:', props);

  const element = document.getElementById('boton-dialogo');
  element.click();

  store.ID_asistencia_editar = props.idAsistencia;
  store.modoEditar = true;

  // Cambiar formulario
  store.form.creador = props.creador;
  store.form.item = props.item;
  store.form.tipoReporte = props.tipoAsistencia;
  store.form.departamento = props.departamento;
  store.form.funcionario = props.funcionario;
  store.form.horaEntrada = props.horaEntrada;
  store.form.horaSalida = props.horaSalida;
  store.form.fechaEntrada = convertDateFormatWithTimezone(props.fechaEntrada);
  store.form.fechaSalida = convertDateFormatWithTimezone(props.fechaSalida);
  store.form.descripsion = props.descripsion;
  store.form.status = props.status;

}

export function abrirDialogoDescripsion(props){
  const element = document.getElementById('boton-descripsion')
  element.click()

  store.form.item = props.item
  store.form.tipoReporte = props.tipoAsistencia
  store.form.departamento = props.departamento
  store.form.funcionario = props.funcionario
  store.form.horaEntrada = props.horaEntrada
  store.form.horaSalida = props.horaSalida
  store.form.fechaEntrada = convertDateFormatWithTimezone(props.fechaEntrada)
  store.form.fechaSalida = convertDateFormatWithTimezone(props.fechaSalida)
  store.form.descripsion = props.descripsion
  store.form.status = props.status

  store.ID_asistencia_editar= props.idAsistencia
  

  store.nombreCardAsistencia = store.buscarNombrePorID(props.creador)

}