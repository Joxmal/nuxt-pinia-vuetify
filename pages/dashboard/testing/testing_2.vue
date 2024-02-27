<template>

  <div class="d-flex  flex-wrap ga-2">
    <v-card border="success md" class="flex-1-1" elevation="10" v-for="(archivo,index) in archivos" :key="index">
      <v-card-title class="text-center">{{archivo.departamento}}</v-card-title>
      <v-card-subtitle class="text-center" >
        {{new Date(archivo.created).toLocaleDateString('es-ES',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text class="text-center">{{archivo.razon}}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn :href="archivo.documento" class="mx-auto" color="green" variant="flat" density="compact">Descargar</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>


<script setup>
import {useTest1Store} from '~/stores/test/test_1'
definePageMeta({
  middleware:'autenticacion'
})

const store = useTest1Store()


const archivos = ref()

onBeforeMount(async()=>{
  archivos.value = await store.verArchivos()
})
</script>