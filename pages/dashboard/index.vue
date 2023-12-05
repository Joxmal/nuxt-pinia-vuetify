<template>
    <v-btn @click="store.inciarSesion(credenciales)">conectar</v-btn>
    <v-spacer/>
    <v-btn @click="store.desconectar()">Desconectar</v-btn>
    <v-spacer/>

    <v-btn @click="stadoConexion">consosola</v-btn>
    <v-divider></v-divider>
    <v-btn @click="store2.IniciarSesion()">estado2</v-btn>
  offset-lg10
    <pre>
      {{ store.estadoUsuario}}

    </pre>
    
</template>
  
  
<script setup>
import { useStoreConexion } from '@/stores/useStoreConexion';
import { useStoreIniciarSesionPrueba } from '@/stores/useStoreIniciarSesionPrueba';
const store = useStoreConexion()
const store2 = useStoreIniciarSesionPrueba()



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