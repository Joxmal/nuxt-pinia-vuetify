<template>
<v-menu
  min-width="200px"
  rounded>
  <template v-slot:activator="{ props }">
    <v-btn
      icon
      v-bind="props"
    >
      <v-avatar
        color="brown"
        size="large"
        :image="store.avatarImagen"
      >
      </v-avatar>
    </v-btn>
  </template>
 
  
  <v-card>
    <v-card-text>
      <div class="mx-auto text-center">
        <h3>{{ store.avatarNombre }}</h3>
        <p class="text-caption mt-1">
          {{ user.email }}
        </p>
        <v-divider class="my-3"></v-divider>
        <v-btn
          rounded
          variant="text"
        >
          Editar Cuenta (NO)
        </v-btn>
        <v-divider class="my-3"></v-divider>

        <v-btn
          rounded
          variant="text"
          @click="store.desconectar()"
        >
          Desconetar
        </v-btn>

        <v-divider class="my-3"></v-divider>
        
        <v-btn
          rounded
          variant="text"
          
        >
        <button-theme-changing class=""/>
      </v-btn>



      </div>
    </v-card-text>
  </v-card>
  hh
</v-menu>
</template>


<script setup>
import {useStoreConexion} from '~/stores/useStoreConexion'
const store = useStoreConexion()

const user = reactive({
  email: 'lorem@gmail.com',
})

</script>