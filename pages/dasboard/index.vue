<template>
    <v-btn @click="store.saludo()">sdsds</v-btn>
</template>
  
  
<script setup>
import { useConexionStore } from '@/stores/conexion';

const store = useConexionStore()

</script>