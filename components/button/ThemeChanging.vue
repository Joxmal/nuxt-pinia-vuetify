<template>
    <label for="switch" >
        <v-switch
            id="switch"
          hide-details
          density="compact"
          v-model="storePersistent.preferences.modoOscuro"
          base-color="primary"
          :color="storePersistent.preferences.modoOscuro != false ? 'secondary' : 'red'"
        >
          <template v-slot:prepend>
            <label for="switch">
              <v-icon>mdi mdi-white-balance-sunny</v-icon>
            </label>
          </template>
        
          <template v-slot:append>
            <label for="switch">
              <v-icon>mdi-weather-night</v-icon>
            </label>
          </template>
        </v-switch>

    </label>
</template>
  
<script setup>

import { usePersistStore } from "~/stores/PersistStore"; 

const storePersistent = usePersistStore()


</script>
