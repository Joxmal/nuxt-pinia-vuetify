<template>

  <div > 
     <div class="text-primary-lighten-1">text color</div>

    <div class="text-primary-darken-1">text color</div>

    <div class="text-primary-darken-2">text color</div>

    <div>---</div>

    <div class="text-secondary-lighten-1">text color</div>
    <div class="text-secondary-darken-1">text color</div>

  
    <div class="text-secondary-darken-3">text color</div>
    <div class="text-secondary-darken-4">text color</div>
    <div class="text-secondary-darken-5">text color</div>
    <div>---</div>
    <div class="text-colorLink">text color link</div>  
  </div>

</template>
  
  
<script setup>
import { useStoreConexion } from '@/stores/useStoreConexion';

const store = useStoreConexion()

 const credenciales =reactive({
   user:'joxmal',
   password:'12345678'
 })

 function stadoConexion(){
  console.log(store.pb_Valid)
 }

definePageMeta({
    middleware:'autenticacion'
})

</script>