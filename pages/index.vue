<template>
    <v-btn @click="store.inciarSesion(credenciales)">sdsds</v-btn>
</template>
  
  
<script setup>
import { useConexionStore } from '@/stores/conexion';
const store = useConexionStore()


 const credenciales =reactive({
   user:'joxmal',
   password:'12345678'
 })
</script>