<template>

<v-slide-y-transition>

  <v-card style="border: 2px solid rgb(15, 115, 246) !important; height: 334px;"   position="relative" class="rounded-lg pt-5" width="220">
    <v-card-title class="text-center">{{ props.tipoAsistencia }} </v-card-title>
    <MenuDropdown 
      @editar="abrirDialogoEditar(props)" 
      @eliminar="store.eliminarReporte(props.idAsistencia)" 
      @descripcion="abrirDialogoDescripsion(props)" 
    />
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
  import { abrirDialogoDescripsion, abrirDialogoEditar } from '~/utils/asistencia/asistencia';

  const props = defineProps(['idAsistencia','departamento','fechaEntrada','fechaSalida','horaEntrada','horaSalida','tipoAsistencia','creador','funcionario','status','descripsion','item'])

  const store = useAsistenciasStore()
  </script>