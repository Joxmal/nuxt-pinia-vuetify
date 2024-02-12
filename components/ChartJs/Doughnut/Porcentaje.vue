<template>
    <Doughnut
    :data="props.chartData" :options="props.options" />
</template>
  
<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
  import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';
  import { Doughnut } from 'vue-chartjs'
  import { DefaultchartData,DefaultOptions } from '~/assets/chartConfig/doughnut'
  
  ChartJS.register(ArcElement, Tooltip, Legend,ChartJSPluginDatalabels,Title)
    



  // const chartData = computed(() => {
  //   return {
  //     labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  //     datasets: [
  //       {
  //         backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
  //         data: [40, 20, 80, 10],
  
  //       }
  //     ]
  //   };
  // });

  const props = defineProps({
    chartData:{
    type: Object,
    default: DefaultchartData
  },
  options:{
    type: Object,
    default: DefaultOptions
  }
})
  </script>