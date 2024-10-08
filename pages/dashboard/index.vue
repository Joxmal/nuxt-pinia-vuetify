<template>
  <v-card flat>
    <v-row justify="center" class="my-2">
      <v-btn-toggle border elevation="10" group tag="hola" density="comfortable" rounded="10" color="primary"
        mandatory="force" v-model="$storeUser.seleccionVistaIndex">
        <v-btn prepend-icon="mdi:list-status" :value="'E'"> <!-- Estatus -->
          ESTADISTICAS
        </v-btn>
        <v-btn :value="'AR'"><!-- Actividades -->
          <v-icon>mdi-multicast</v-icon>
          OPERATIVOS
        </v-btn>
        <v-btn :value="'PRO'"><!-- proyector -->
          <v-icon>mdi-projector</v-icon>
          PROYECTOR
        </v-btn>
      </v-btn-toggle>
    </v-row>
  </v-card>


  <v-card v-if="$storeUser.seleccionVistaIndex === 'E'" flat>
    <v-row>
      <v-col cols="12" md="6">
        <v-card height="450" class="mx-auto">
          <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
            Asistencias Totales
          </v-card-title>
          <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
          <ChartJsDoughnutPorcentaje class="pa-3" :view=viewCharts
            :chart-data="useEstadisticas().ListaTotalAsistencias !== 0 ? useEstadisticas().ListaTotalAsistencias : null" />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card height="450 " class="mx-auto pb-12">
          <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
            Asistencias Por Categoria
          </v-card-title>
          <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
          <ChartJsBar :view="viewCharts"
            :chart-data="useEstadisticas().totalAsistenciasCategorias !== 0 ? useEstadisticas().totalAsistenciasCategorias : null" />

        </v-card>
      </v-col>
    </v-row>
    <v-divider :thickness="3" class="text-blue border-opacity-100 my-5"></v-divider>

    <!-- v-if="$storeUser.$state.avatarRole === 'superUser'" -->
    <v-row>
      <v-col cols="12" md="12">
        <v-card height="450" class="mx-auto">
          <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
            Equipos Registrados
          </v-card-title>
          <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
          <ChartJsDoughnutPorcentaje class="pa-3" :view=viewCharts
            :chart-data="useEstadisticas().chartJSEquiposPorPiso !== 0 ? useEstadisticas().chartJSEquiposPorPiso : null" />
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <v-card flat v-if="$storeUser.seleccionVistaIndex === 'AR'">
    <LazyTheOperativosEspeciales />
  </v-card>

  <v-card flat v-if="$storeUser.seleccionVistaIndex === 'PRO'">
    <TheProyector />
  </v-card>

</template>

<script setup>
definePageMeta({
  middleware: 'autenticacion'
})
const $storeUser = useStoreConexion()

const viewCharts = ref(false)

onBeforeMount(async () => {
  await useEstadisticas().obtenerDatosReportes()
  await useEstadisticas().ordenar()
  await useEstadisticas().listaDeTrabajadores()
  await useEstadisticas().obtenerDatosEquipos()

  await useEstadisticas().obtenerResumenEquipos()
  viewCharts.value = true
})

</script>