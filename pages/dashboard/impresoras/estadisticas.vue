<template>
    <div>
        <v-slide-x-transition group>
            <AlertWarning v-show="storeEstadisticas.eliminarExitoso === true" key="1"
            style="position: fixed; right: 20px; z-index: 20;" 
            mensaje="Eliminado con exito"
            />
            <AlertCargando v-show="storeEstadisticas.cargando === true" key="2"
            style="position: fixed; right: 20px ; z-index: 20; " 
            mensaje="Cargando"
            /> 
            <AlertSuccess v-show="storeEstadisticas.editarExitoso === true" key="3"
            style="position: fixed; right: 20px; z-index: 20;" 
            mensaje="Editado"
            icon="mdi-pencil-outline"
            /> 
            <AlertError v-show="storeEstadisticas.ocurrioUnError === true" key="4"
            style="position: fixed; right: 20px; z-index: 20;" 
            mensaje="ERROR"
            />
            <AlertSuccess v-show="storeEstadisticas.envioExitoso === true" key="5"
            style="position: fixed; right: 20px; z-index: 20;" 
            mensaje="Cargado con exito"
            />  
        </v-slide-x-transition>
    </div>

    <v-row  align="center" align-content="center" justify="center">
        <v-col   cols="10" sm="4" class="d-flex justify-center flex-column text-center pa-2 font-weight-black">
            <div style="border: 1px solid lightblue;" >
                <v-divider></v-divider>
                <v-sheet class="">
                  DESDE
                  <input class="" type="date" min="2023-01-01" max="2024-12-30" v-model="FiltroEstadisticas.rangoFechas.desde" >
                </v-sheet>
          
                <v-sheet class="">
                  HASTA
                  <input class="" type="date" min="2023-01-01" max="2024-12-30" v-model="FiltroEstadisticas.rangoFechas.hasta">
                </v-sheet>
            </div>
        </v-col>
    </v-row>
    <v-row align="center" align-content="center" justify="center">
        <v-col cols="12" sm="4">
            <v-btn color="primary" @click="storeEstadisticas.obtenerToonersRecargas()" width="100%" type="submit"  class="px-2">Buscar</v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
          <v-card height="700"  class="mx-auto">
            <v-card-title class=" text-center font-weight-black text-h5 text-secondary">
              Conteo de recargas
            </v-card-title>
            <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
            <ChartJsDoughnutPorcentaje
            :options="DefaultOptions"
            :chart-data="storeEstadisticas.DataDoughnut !== null  ? storeEstadisticas.DataDoughnut : null "
            :view="storeEstadisticas.DataDoughnut !== null ? true : false"/>
        </v-card>
        <v-divider :thickness="3" class="text-blue border-opacity-100"></v-divider>
          
        </v-col>
    </v-row>

</template>

<script setup>
import {useEstadisticasStore} from '~/stores/impresoras/estadisticas'
import {obtenerPrimerDiaMes,obtenerUltimoDiaMes} from "~/assets/funciones_reuzables/times"

definePageMeta({
  middleware:'autenticacion'
})
const storeEstadisticas = useEstadisticasStore()
const {FiltroEstadisticas} = storeToRefs(storeEstadisticas)

onBeforeMount(()=>{
    storeEstadisticas.FiltroEstadisticas.rangoFechas.desde = obtenerPrimerDiaMes()
    storeEstadisticas.FiltroEstadisticas.rangoFechas.hasta = obtenerUltimoDiaMes()
})

onMounted(async()=>{
    await storeEstadisticas.obtenerToonersRecargas()
})

const DefaultOptions = {
  layout:{
    padding:0,
  },
  responsive: true,
  maintainAspectRatio: false,
  pieceLabel: {
    mode: 'percentage'
  },
  plugins: {
    title: {
      display: true,
      // text: 'Custom Chart Title',
      padding: {top: 0, left: 0, right: 0, bottom: 10}
    },
    
    datalabels: {
      // Configuración específica del complemento
      anchor:'end',
      align:'end',
      formatter: ((value,ctx)=>{
              let totalSum = 0;
        const datasetData = ctx.dataset.data;

        // Verifica que datasetData sea un array válido y los valores sean numéricos
        for (let i = 0; i < datasetData.length; i++) {
          totalSum += parseInt(datasetData[i]) ;
 
        }
        const percentage = (value / totalSum) * 100;

        return `${percentage.toFixed(1)}%`;
      }),
      font: {
        weight: 'bold',
        size: 16
      }
    },

    legend: {
      display: true,
      position: 'bottom',

      
      labels:{
        color: 'hsla(218, 78%, 53%, 1)',
        padding:10,
        font: {
          size: 14,
          weight: "bold"
        },
        
      },
    },
    tooltip: {

    },
  },

}
</script>