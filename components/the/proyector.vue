<template>
  <div v-show="false">
    {{ storeProyector.UbicacionActualProyector }}
  </div>



  <v-card position="relative" border elevation="20" class="d-flex flex-column justify-center">

    <v-icon :class="dataPosicionActual.classText" class="mx-auto pulsing-button" size="300">{{ dataPosicionActual.icon
      }}</v-icon>
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
  responsable: '',
  tlf: 0,
  classText: '',
  icon: ''
})

onMounted(async () => {
  await storeProyector.obtenerAsistencias();
  await observarCambio(); // Call after fetching data
});


async function observarCambio() {
  console.log('Observing change...');
  console.log('ubicacionOficina:', storeProyector.ubicacionOficina);
  console.log('UbicacionActualProyector:', storeProyector.UbicacionActualProyector);

  if (storeProyector.ubicacionOficina) {
    dataPosicionActual.value.departamento = 'INFORMATICA';
    dataPosicionActual.value.responsable = '------';
    dataPosicionActual.value.classText = 'text-success';
    dataPosicionActual.value.icon = 'mdi-projector';

  } else {
    if (!storeProyector.UbicacionActualProyector?.departamento) return;
    dataPosicionActual.value.departamento = storeProyector.UbicacionActualProyector?.departamento;
    dataPosicionActual.value.responsable = `${storeProyector.UbicacionActualProyector?.responsable} \n tlf: ${storeProyector.UbicacionActualProyector?.tlf} `;
    dataPosicionActual.value.tlf = storeProyector.UbicacionActualProyector?.tlf;
    dataPosicionActual.value.classText = 'text-red';
    dataPosicionActual.value.icon = 'mdi-projector-off';




  }
}

watch(
  () => storeProyector.UbicacionActualProyector,
  (newValue) => {
    observarCambio();
  },
  { immediate: true } // This will call the watcher immediately on mount
);

</script>

<style scoped>
.pulsing-button {

  animation: pulse 5s infinite;
  /* Animación continua desde el inicio */
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
    /* Aumenta el tamaño al 110% */
  }

  100% {
    transform: scale(1);
  }
}
</style>