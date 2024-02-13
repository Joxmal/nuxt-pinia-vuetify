<template>
  <Bar v-if="props.view" :data="props.chartData" :options="props.options" />
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { defaultBarOption, defaultBarData } from '~/assets/chartConfig/bar';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
    chartData:{
    type: Object,
    default: defaultBarData
  },
  options:{
    type: Object,
    default: defaultBarOption
  },
  view:{
    type:Boolean,
    default:false
  }
})
</script>