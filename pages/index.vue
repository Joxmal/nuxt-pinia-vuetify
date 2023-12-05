<template>
  <v-app>
    <v-container class="d-flex justify-center">

        <AlertError class="d-flex rounded-pill " style="position:fixed ;" v-if="store.errorInicio"/>
        <Login/>

    </v-container>
  </v-app>
</template>
  
  
<script setup>
import {useStoreConexion} from '@/stores/useStoreConexion'
const store = useStoreConexion()

definePageMeta({
  middleware:'utenticado-en-login',
  layout:false
})

</script>