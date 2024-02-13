<template>
  <v-row >
    <v-col cols="12" md="6">
      <v-card height="450"   class="mx-auto">
        <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
          Asistencias Totaltes
        </v-card-title>
        <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
        <ChartJsDoughnutPorcentaje
        class="pa-3"
        :view= viewCharts
        :chart-data="useEstadisticas().ListaTotalAsistencias !== 0 ? useEstadisticas().ListaTotalAsistencias : null  " />
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <v-card height="450 "  class="mx-auto pb-12">
        <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
          Asistencias Por Categoria
        </v-card-title>
        <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
        <ChartJsBar :view="true"/>

      </v-card>
    </v-col>

    
  </v-row>


</template>

<script setup>
definePageMeta({
    middleware:'autenticacion'
})

const viewCharts = ref(false)


function sumarArray(array){
  let suma = 0
  array.forEach(element => {
    suma += element
  });
  return suma
}

onBeforeMount(async()=>{
  await useEstadisticas().obtenerDatosReportes()
  await useEstadisticas().ordenar()
  
  await useEstadisticas().listaDeTrabajadores()
  viewCharts.value = true
})

onMounted(async () => {

})
</script>