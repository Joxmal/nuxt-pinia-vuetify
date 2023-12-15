<template>
    
    <v-alert
      color="#C51162"
      icon="mdi-alert-decagram"
      border
      :density="'compact'"
    >
      {{ mensaje }}
    </v-alert>
</template>


<script setup>

const props = defineProps(['mensaje'])
</script>