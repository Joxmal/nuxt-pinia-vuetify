<template>
  <pre>
    {{ storeToonersRecargas.resultado }}
  </pre>


  <v-btn @click="storeToonersRecargas.obtenerToonersRecargas()"> +</v-btn>
</template>

<script setup>
import {useToonersRecargasStore} from '~/stores/impresoras/toonerRecargas'
const storeToonersRecargas = useToonersRecargasStore()

</script>