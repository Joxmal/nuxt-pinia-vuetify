<template>

    <v-btn @click="store.desconectar()">Desconectar</v-btn>


  <v-spacer/>
  <v-divider class="mt-10"></v-divider>

    <pre>
      {{ store.avatarImagen}}
  <v-divider class="mt-10"></v-divider>

      {{ store.avatarNombre}}

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