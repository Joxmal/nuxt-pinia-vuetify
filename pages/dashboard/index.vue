<template>

  aqui debe de ir las noticias

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