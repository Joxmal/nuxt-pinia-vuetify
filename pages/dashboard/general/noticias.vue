<template>
  {{ useListasStore().listaCPU }} <br>
  {{ useListasStore().listaDepartamento }} <br>
  {{ useListasStore().listaImpresoras }} <br>
  {{ useListasStore().listaMonitor }} <br>
  {{ useListasStore().listaTarjetaMadre }} <br>
</template>
  
<script setup>

  definePageMeta({
    middleware:'autenticacion',
  })

//  console.log(useListasStore().listas[0].Departamentos)
onMounted(()=>{
  useListasStore().obtenerListas()
})



</script>