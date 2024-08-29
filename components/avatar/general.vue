<template>
  <v-menu :close-on-content-click="false" min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="large" :image="store.avatarImagen">
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
          <v-btn rounded variant="text">
            Editar Cuenta (NO)
          </v-btn>
          <v-divider class="my-3"></v-divider>

          <v-btn rounded variant="text" @click="store.desconectar()">
            Desconectar
          </v-btn>

          <v-divider class="my-3"></v-divider>

          <v-btn rounded class="pointer">
            <button-theme-changing />
          </v-btn>



        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>


<script setup>
import { useStoreConexion } from '~/stores/useStoreConexion'

import { useTheme } from 'vuetify'
import { usePersistStore } from "~/stores/PersistStore";

const store = useStoreConexion()
const storePersistent = usePersistStore()
const theme = useTheme()


const user = reactive({
  email: 'lorem@gmail.com',
})

function toggleTheme() {
  storePersistent.preferences.modoOscuro
    ? theme.global.name.value = 'myCustomDARKTheme'
    : theme.global.name.value = 'customLightTheme'
}

onMounted(() => {
  toggleTheme()
})

watch(() => storePersistent.preferences.modoOscuro, (newValue) => {
  toggleTheme()
}, { deep: true });
</script>


<style scoped>
.pointer:hover{
  cursor: pointer !important;
}

</style>