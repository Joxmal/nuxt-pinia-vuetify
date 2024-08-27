<template>

<v-slide-y-transition>

  <v-card style="border: 2px solid rgb(15, 115, 246) !important; height: 334px;"   position="relative" class="rounded-lg pt-5" width="220">
    <v-card-title class="text-center">{{ props.tipoAsistencia }} </v-card-title>
    <MenuDropdown @editar="abrirDialogoEditar" @eliminar="store.eliminarReporte(props.idAsistencia)" @descripcion="abrirDialogoDescripsion" />
    <v-card-text class="d-flex ma-n2 flex-column justify-center" >

      <div  class="d-flex flex-wrap ga-1 justify-space-around font-weight-black">
        <v-card  border class="text-center pa-1">
          <div>{{ new Date(props.fechaEntrada).toLocaleDateString() }}</div>
          <div>{{ props.horaEntrada }}</div>
        </v-card>
        <v-card border class="text-center pa-1">
          <div>{{ new Date(props.fechaSalida).toLocaleDateString() }}</div>                  
          <div>{{ props.horaSalida }}</div>
        </v-card>
      </div>
      <div class="text-blue-darken-1 text-subtitle-1 font-weight-bold text-center py-2">
        {{props.departamento}}
      </div>
      <v-row class="d-flex flex-nowrap flex-column  justify-center ">
        <v-col
          cols="12"
          class="mx-auto text-center font-weight-black" 
        >
          {{ store.buscarNombrePorID(props.creador) }}
        </v-col>
        <v-btn size="x-small" icon="mdi-arrow-collapse-down" class="w-fit mx-auto text-center mt-n3 "></v-btn>
        <v-col
          cols="12" 
          class="mx-auto text-center mt-n3 font-weight-black" >
          {{ props.funcionario }}
        </v-col>
        <v-col
          cols="12" 
          class="mx-auto text-center mt-n3 font-weight-black" >
          <v-chip :class="props.status !== false ? 'text-success' : 'text-warning'" class="text-h6">
            {{ props.status === false ? 'EN CURSO' : 'FINALIZADO' }}
          </v-chip>
          <v-divider class="my-1"></v-divider>
          <v-chip v-if="props.item">
            {{ props.item}}
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</v-slide-y-transition>
</template>
  <script setup>
  import { useAsistenciasStore } from '~/stores/asistencias'

  const props = defineProps(['idAsistencia','departamento','fechaEntrada','fechaSalida','horaEntrada','horaSalida','tipoAsistencia','creador','funcionario','status','descripsion','item'])

  const store = useAsistenciasStore()

  function abrirDialogoDescripsion(){
    store.DialogoDescripsion(props.descripsion)
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

  function abrirDialogoEditar(){
    console.log('props:', props)

    store.DialogoDescripsion(props.descripsion)
    const element = document.getElementById('boton-dialogo')
    element.click()

    store.ID_asistencia_editar= props.idAsistencia
    store.modoEditar = true




    //cambiar formulario
    store.form.creador=props.creador
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

  }

  function recibe(valor){
    console.log(valor)
  }

  function convertDateFormatWithTimezone(dateString, offsetHours=-4) {
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
  </script>