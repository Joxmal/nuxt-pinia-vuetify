<template>
  <v-app>
    <v-container class="d-flex justify-center">

        <AlertError 
        mensaje="error al iniciar sesión"
        class="d-flex rounded-pill " 
        style="position:fixed ;" v-if="store.errorInicio"/>
          <!-- login del sistema -->
        <Login/>
    </v-container>
  </v-app>
</template>
  
  
<script setup>
import {useStoreConexion} from '@/stores/useStoreConexion'
const store = useStoreConexion()

definePageMeta({
  middleware:'utenticado-en-login',
  layout:false,
})

</script>


<style>
a{
  color: blue;
}

*{
  scrollbar-color: #3f51b5 transparent !important;
  scrollbar-width: thin !important;
}
</style>