<template>
  <v-app>
    <v-container class="d-flex justify-center">

        <AlertError 
        mensaje="error al iniciar sesion"
        class="d-flex rounded-pill " 
        style="position:fixed ;" v-if="store.errorInicio"/>
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

::-webkit-scrollbar {
  width: 5px;
  height: 5px;               /* width of the entire scrollbar */
}

::-webkit-scrollbar-thumb {
  background-color: rgb(56, 255, 46);    /* color of the scroll thumb */
  border-radius: 20px;       /* roundness of the scroll thumb */  /* creates padding around scroll thumb */
}
</style>