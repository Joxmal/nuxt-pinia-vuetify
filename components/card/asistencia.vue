<template>
<v-card  :title="props.tipoAsistencia" position="relative" class="" max-width="230">
  <MenuDropdown @editar="recibe" @eliminar="recibe" @descripcion="abrirDialogoDescripsion" />
  <v-card-text class="d-flex flex-column justify-center" >



    <div  class="d-flex flex-wrap ga-1 justify-space-around font-weight-black">
      <v-card border class="text-center pa-1">
        <div>{{ fechaEntrada }}</div>
        <div>{{ horaEntrada }}</div>
      </v-card>
      <v-card border class="text-center pa-1">
        <div>{{ props.fechaSalida }}</div>                  
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
        {{ props.creador }}
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
        <v-chip :class="props.status !== 'En Curso' ? 'text-success' : 'text-warning'" class="text-h6">
          {{ props.status }}
        </v-chip>
        <v-divider></v-divider>
        <v-chip v-if="props.item">
          {{ props.item }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>

</template>
  <script setup>
  import { useAsistenciasStore } from '~/stores/asistencias'

  const props = defineProps(['departamento','fechaEntrada','fechaSalida','horaEntrada','horaSalida','tipoAsistencia','creador','funcionario','status','descripsion','item'])

  const store = useAsistenciasStore()

  function abrirDialogoDescripsion(){
    store.DialogoDescripsion(props.descripsion)
    const element = document.getElementById('boton-descripsion')
    element.click()
  }

  function recibe(valor){
    console.log(valor)
  }
    const messages = [
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple-lighten-1',
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
      },
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple-lighten-1',
      },
    ]
  </script>