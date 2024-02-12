<template>
  <div>
    <ChartJsDoughnutPorcentaje
    />
  </div>

<pre>
  {{ useEstadisticas().listaReportes }}
</pre>
</template>

<script setup>

onMounted(()=>{
  useEstadisticas().obtenerDatosReportes()
})
</script>