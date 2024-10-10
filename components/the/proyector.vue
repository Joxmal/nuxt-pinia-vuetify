<template>
  <div v-show="false">
    {{ storeProyector.UbicacionActualProyector }}
  </div>

  <dialog-general-simple name-boton="Historial" :ocultar-boton="false">
    <template #contenido>
      <v-timeline class="bg-primary opacity-80" align="start" side="end">
        <v-timeline-item v-for="proyector in storeProyector.getProyectorDto.slice(0, 10)"
          :dot-color="proyector.actual ? 'success' : 'error'" size="small">
          {{ console.log("proyector", proyector) }}
          <div class="d-flex">
            <strong class="me-4">{{ new Date(proyector.fecha_salida).toLocaleDateString() }}</strong>
            <div>
              <strong>{{ proyector.departamento }}</strong>
              <div class="text-body2">
                {{ proyector.responsable }} | tlf: {{ proyector.tlf }}
              </div>
              <div class="text-body2">
                {{ proyector.descripsion }}
              </div>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </template>
  </dialog-general-simple>

  <v-card position="relative" border elevation="20" class="d-flex flex-column justify-center">

    <v-btn to="/dashboard/reportes/proyector" elevation="10" color="primary" variant="tonal"> Cargar Data</v-btn>
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

  <hr>


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