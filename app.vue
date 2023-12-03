<template>
  <div>
    <NuxtWelcome />
  </div>

  <v-btn @click="store.saludo()">sdsds</v-btn>
</template>


<script setup>
import { useConexionStore } from './stores/conexion';
const runtimeConfig = useRuntimeConfig()

console.log(runtimeConfig.public.POCKETBASE_URL)


const store = useConexionStore()




</script>