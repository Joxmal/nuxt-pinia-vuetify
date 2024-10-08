<template>

  <v-card border elevation="20" class="d-flex flex-column justify-center">
    <v-icon class="mx-auto" size="300">mdi-projector</v-icon>
    <v-row>
      <v-col>
        <h1 class="text-center">
          {{ dataPosicionActual.departamento }}
          <hr>
          {{ dataPosicionActual.responsable }}
        </h1>
      </v-col>
    </v-row>

  </v-card>


</template>

<script setup lang="ts">
import { useProyectorStore } from '~/stores/proyector/proyectorStorage';

const storeProyector = useProyectorStore()

const dataPosicionActual = ref({
  departamento: '',
  responsable: ''
})

watch(
  () => storeProyector.ubicacionOficina,
  (newValue) => {
    if (storeProyector.ubicacionOficina) {
      dataPosicionActual.value.departamento = 'INFORMATICA'
      dataPosicionActual.value.responsable = '------'
    } else {
      if (!storeProyector.UbicacionActualProyector?.departamento) return
      dataPosicionActual.value.departamento = storeProyector.UbicacionActualProyector?.departamento
      dataPosicionActual.value.responsable = storeProyector.UbicacionActualProyector?.responsable
    }
  }, { immediate: true }
);

onMounted(async () => {
  await storeProyector.obtenerAsistencias()
})

</script>