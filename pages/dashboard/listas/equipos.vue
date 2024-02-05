<template>
  <pre>
    {{ store.form }}
  </pre>
  <v-btn @click="store.obtenerDatos()">obtener</v-btn>
  <pre>
    {{ store.datos }}
  </pre>
</template>


<script setup>
import { useEquipos } from '~/stores/equipos';

const store = useEquipos()
</script>