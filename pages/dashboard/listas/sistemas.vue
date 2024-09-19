<template>
    <v-row  justify="center" class="my-2">
    <v-btn-toggle border elevation="10" group tag="hola" @update:model-value="console.log($event)" density="comfortable" rounded="10" color="primary" mandatory="force" v-model="view">
      <v-btn  
        :value="'E'"> <!-- Estatus -->
        <v-icon>mdi:list-status</v-icon>
        Estatus
      </v-btn>
      <v-btn 
        :value="'A'"><!-- Actividades -->
        <v-icon>mdi-multicast</v-icon>
        Actividades
      </v-btn>
      <v-btn 
        :value="'S'"> <!-- sistemas -->
        <v-icon>carbon:ibm-engineering-systems-design-rhapsody</v-icon>
        Sistemas
      </v-btn>
    </v-btn-toggle>
  </v-row>


    <ActividadesCardAreasSistemas v-if="view === 'S'"/>
    <ActividadesCardAreas v-if="view === 'A'"/>
    <SistemasEstatusCreate v-if="view === 'E'" />
</template>

<script setup>

const view = ref(null)




</script>