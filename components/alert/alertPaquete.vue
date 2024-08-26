<template>
    <div>
  <v-slide-x-transition group>
    <AlertWarning v-show="props.eliminarExitoso === true" key="1"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Eliminado con exito"
    />
    <AlertCargando v-show="props.cargando === true" key="2"
      style="position: fixed; right: 20px ; z-index: 20; " 
      mensaje="Cargando"
    /> 
    <AlertSuccess v-show="props.editarExitoso === true" key="3"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Editado"
      icon="mdi-pencil-outline"
    /> 
    <AlertError v-show="props.ocurrioUnError === true" key="4"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="ERROR"
    />
    <AlertSuccess v-show="props.envioExitoso === true" key="5"
      style="position: fixed; right: 20px; z-index: 20;" 
      mensaje="Cargado con exito"
    />  
  </v-slide-x-transition>
</div>
</template>

<script setup lang="ts">
// Definición de propiedades
const props = defineProps({
    eliminarExitoso: {
        type: Boolean,
        default: false
    },
    cargando: {
        type: Boolean,
        default: false
    },
    ocurrioUnError: {
        type: Boolean,
        default: false
    },
    envioExitoso: {
        type: Boolean,
        default: false
    },
    editarExitoso: {
        type: Boolean,
        default: false
    },
});

</script>