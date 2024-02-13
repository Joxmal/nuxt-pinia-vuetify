<template>
  <Doughnut v-if="props.view" id="DoughnutJS"
    style="max-height: 400px;"
    :data="props.chartData" :options="props.options" :plugins="[ChartJSPluginDatalabels,doughnutLabel]" 
  />
</template>
  
<script setup>
  import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title  } from 'chart.js'
  import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels';
  // import ChartJSPluginDoughnutlabel from 'chartjs-plugin-doughnutlabel';
  import { Doughnut } from 'vue-chartjs'
  import { DefaultchartData,DefaultOptions } from '~/assets/chartConfig/doughnut'


  const doughnutLabel = {
  id: 'doughnutLabel',

  beforeDatasetsDraw(chart, args ,pluginOptions) {
    const { ctx, data } = chart;
    // console.log(data)
    const sumaTotalData = sumarArray(data.datasets[0].data)

    ctx.save(); 
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = 'rgba(54, 162, 235, 1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ctx.fillText(`${data.labels[0]}: ${data.datasets[0].data[0]}`, xCoor, yCoor);
    ctx.fillText(`${sumaTotalData}`, xCoor, yCoor);
  }
}


  ChartJS.register(ArcElement, Tooltip, Legend,Title),{
  id: 'DoughnutJS'
}
    



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

  function sumarArray(array){
  let suma = 0
  array.forEach(element => {
    suma += element
  });
  return suma
}


  const props = defineProps({
    chartData:{
    type: Object,
    default: DefaultchartData
  },
  options:{
    type: Object,
    default: DefaultOptions
  },
  view:{
    type:Boolean,
    default:false
  }
})
  </script>